export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const body = await req.json();

  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: `நீங்கள் லக்ஷ்மி — GrievanceQ AI உதவியாளர். எப்போதும் தமிழிலேயே பதில் சொல்லுங்கள். குடிமக்களின் சாலை, குப்பை, விளக்கு, தண்ணீர் புகார்களுக்கு உதவுங்கள்.`,
      messages: body.messages,
    }),
  });

  const data = await anthropicRes.json();

  return new Response(JSON.stringify(data), {
    status: anthropicRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
