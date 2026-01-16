import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(express.static("public"));

let memory = [];

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  memory.push({ role: "user", content: userMessage });
  if (memory.length > 10) memory.shift();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a friendly AI assistant.
You chat like a human.
You give advice.
You answer questions.
You understand and reply in all languages.
`
        },
        ...memory
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  memory.push({ role: "assistant", content[array] reply });
  res.json({ reply });
});

app.listen(3000, () => {
  console.log("AI Assistant running on port 3000");
});
