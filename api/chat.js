export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

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
      system: 'நீங்கள் லக்ஷ்மி — GrievanceQ AI உதவியாளர். எப்போதும் தமிழிலேயே பதில் சொல்லுங்கள்.',
      messages: messages,
    }),
  });

  const data = await anthropicRes.json();
  return res.status(anthropicRes.status).json(data);
}
