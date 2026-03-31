const OpenAI = require('openai');
const PAUL_DATA = require('../config.js');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { message } = req.body;

  // Age Calculation
  const birthDate = new Date(PAUL_DATA.dob);
  const age = Math.floor((new Date() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));

  const systemPrompt = `
    You are the AI Portfolio Assistant for ${PAUL_DATA.fullName}.
    
    PERSONAL INFO:
    - Name: ${PAUL_DATA.fullName}
    - Age: ${age}
    - Roles: ${PAUL_DATA.roles.join(", ")}
    - Education: College: ${PAUL_DATA.education.college}, HS: ${PAUL_DATA.education.highSchool}, Elem: ${PAUL_DATA.education.elementary}
    - Experience: ${PAUL_DATA.experience}
    - Skills: Support (${PAUL_DATA.skills.support.join(", ")}), Tech (${PAUL_DATA.skills.tech.join(", ")}), Creative (${PAUL_DATA.skills.creative.join(", ")})
    - Health: ${PAUL_DATA.healthStatus}
    - Hobby: ${PAUL_DATA.hobby}
    - Strengths: ${PAUL_DATA.capabilities.join(", ")}

    INSTRUCTIONS:
    1. Answer questions based ONLY on the data above. 
    2. If someone asks for information not listed here, respond with: "That information is either confidential or outside the scope of my current knowledge regarding Paul."
    3. Be professional, concise, and helpful.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
