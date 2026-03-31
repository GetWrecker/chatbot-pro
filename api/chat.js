const OpenAI = require('openai');
const PAUL_DATA = require('../config.js');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const birthDate = new Date(PAUL_DATA.dob);
  const age = Math.floor((new Date() - birthDate) / (31557600000));

  const systemPrompt = `You are the AI Assistant for ${PAUL_DATA.fullName}. 
  Info: Age ${age}, Education: ${PAUL_DATA.education.college}, Roles: ${PAUL_DATA.roles.join(", ")}, 
  Skills: ${PAUL_DATA.skills}, Experience: ${PAUL_DATA.experience}, Hobby: ${PAUL_DATA.hobby}, 
  Health: ${PAUL_DATA.healthStatus}. 
  If the info is not here, say it is confidential or not about Paul. Be brief.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
    });

    const aiReply = completion.choices[0].message.content;
    res.status(200).json({ reply: aiReply });
  } catch (error) {
    res.status(500).json({ reply: "I'm having trouble connecting. Please check your API Key." });
  }
};
