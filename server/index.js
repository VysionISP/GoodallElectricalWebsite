// Goodall Electrical — enquiry relay server
//
// Receives the contact form's POST /api/enquiry submission and forwards it
// to Fergus as a new Enquiry. The Fergus Personal Access Token lives only
// here, as a server-side environment variable — it is never sent to the
// browser and never committed to the repo. See README.md for setup.

require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 3001;
const FERGUS_PAT = process.env.FERGUS_PAT;
const FERGUS_API_BASE_URL = process.env.FERGUS_API_BASE_URL || 'https://api.fergus.com';

if (!FERGUS_PAT) {
  console.error('FERGUS_PAT is not set. Set it as an environment variable before starting the server.');
  process.exit(1);
}

const app = express();
app.use(express.json());

app.post('/api/enquiry', async (req, res) => {
  const { name, phone, email, service, message } = req.body || {};

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const description = service
    ? `Service required: ${service}\n\n${message}`
    : message;

  try {
    const fergusRes = await fetch(`${FERGUS_API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FERGUS_PAT}`
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber: phone,
        description,
        source: 'Website Contact Form'
      })
    });

    if (!fergusRes.ok) {
      const body = await fergusRes.text();
      console.error('Fergus API error', fergusRes.status, body);
      return res.status(502).json({ error: 'Failed to submit enquiry to Fergus.' });
    }

    const data = await fergusRes.json();
    return res.status(201).json({ ok: true, id: data && data.data && data.data.id });
  } catch (err) {
    console.error('Error calling Fergus API', err);
    return res.status(502).json({ error: 'Failed to submit enquiry to Fergus.' });
  }
});

app.listen(PORT, () => {
  console.log(`Enquiry relay server listening on port ${PORT}`);
});
