const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let memory = [];

app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  memory.push({ role: "user", content: userMessage });

  // Simple AI logic (abhi basic, baad me smart banayenge)
  let reply = "Mujhe samajh aa raha hai 🙂";

  if (userMessage.toLowerCase().includes("hello")) {
    reply = "Hello! Main tumhara AI assistant hoon 🤖";
  } else if (userMessage.toLowerCase().includes("help")) {
    reply = "Bilkul! Batao, main kaise madad kar sakta hoon?";
  } else if (userMessage.toLowerCase().includes("sad")) {
    reply = "Main yahin hoon ❤️ sab theek ho jayega.";
  }

  memory.push({ role: "assistant", content: reply });

  res.json({ reply });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
