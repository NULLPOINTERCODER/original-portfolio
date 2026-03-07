export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const targetUrl = 'https://api.codolio.com/profile?userKey=V_Patel';
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ success: false, error: 'Codolio API failed', details: text });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, payload: data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
