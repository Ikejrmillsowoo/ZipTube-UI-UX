const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatOutput = document.getElementById('chatOutput');

// Replace this with your actual API key — or load from your backend securely
const API_KEY = "YOUR_OPENAI_API_KEY"; // ⚠️ Never expose real keys in production!

sendBtn.addEventListener('click', async () => {
  const message = userInput.value.trim();
  if (!message) return;

  chatOutput.innerHTML = "<p><em>Thinking...</em></p>";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or gpt-4
        messages: [{ role: "user", content: message }],
        temperature: 0.7
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response";

    chatOutput.innerHTML = `<p><strong>ChatGPT:</strong> ${reply}</p>`;
  } catch (error) {
    console.error("Error:", error);
    chatOutput.innerHTML = `<p style="color:red;">Error talking to ChatGPT.</p>`;
  }
});
