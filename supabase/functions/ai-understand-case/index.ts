import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text, language, location, photoAttached, model } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'GEMINI_API_KEY secret is missing in Supabase Vault.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Recommended Flash models according to Google API
    const modelsToTry = [
      'gemini-3.6-flash',
      'gemini-3.5-flash',
      'gemini-flash-latest',
      model || 'gemini-2.5-flash',
    ];

    const prompt = `You are an expert agricultural AI assistant for Indian farmers.
Structure the following farmer query into strict JSON:
Farmer Query: "${text}"
Language: "${language || 'en'}"
Location: "${location || 'Nashik'}"

Respond ONLY with valid JSON in this format:
{
  "crop": "Tomato",
  "problemCategory": "Plant Pathology & Pest Control",
  "symptoms": ["Leaf Curling", "Visible Pest Infestation"],
  "environmentFactors": ["High Temperature", "Humidity / Recent Rainfall"],
  "location": "${location || 'Nashik'}",
  "urgency": "Normal",
  "confidence": 0.95,
  "additionalQuestions": ["Are insect spots visible on leaf undersides?"]
}`;

    let lastError = null;

    for (const geminiModel of modelsToTry) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        });

        const data = await res.json();
        if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          let jsonText = data.candidates[0].content.parts[0].text;
          jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(jsonText);
          parsed.modelUsed = geminiModel;
          parsed.isLiveProvider = true;

          return new Response(JSON.stringify(parsed), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          });
        } else {
          lastError = { geminiModel, status: res.status, data };
        }
      } catch (e) {
        lastError = { geminiModel, error: e.message };
      }
    }

    return new Response(
      JSON.stringify({ status: 'gemini_error', details: lastError }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ status: 'exception', message: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  }
});
