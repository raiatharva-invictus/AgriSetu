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
        JSON.stringify({ error: 'GEMINI_API_KEY secret is not set in Supabase Vault.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const geminiModel = model || 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;

    const prompt = `You are an expert agricultural AI assistant for Indian farmers.
Structure the following farmer query into strict JSON:
Farmer Query: "${text}"
Language: "${language || 'en'}"
Location: "${location || 'Nashik'}"

Respond ONLY with valid JSON in this format:
{
  "crop": "<Crop Name e.g. Tomato, Cotton, Wheat, Rice, Chilli>",
  "problemCategory": "<Category e.g. Plant Pathology & Pest Control, Soil Science, Irrigation>",
  "symptoms": ["<Symptom 1>", "<Symptom 2>"],
  "environmentFactors": ["<Factor 1>", "<Factor 2>"],
  "location": "<Location>",
  "urgency": "<Normal or High>",
  "confidence": 0.92,
  "additionalQuestions": ["<Clarifying Question>"]
}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: 'application/json' },
      }),
    });

    const data = await res.json();
    let jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const parsed = JSON.parse(jsonText);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
