async function sendMessage() {
  const input = document.getElementById("input");
  const message = input.value;

  if (!message) return;

  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += `<p><b>You:</b> ${message}</p>`;

  input.value = "";

  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  messagesDiv.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
    }
