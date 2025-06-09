// const sendBtn = document.getElementById('sendBtn');
// const userInput = document.getElementById('userInput');
// const chatOutput = document.getElementById('chatOutput');

// // Replace this with your actual API key — or load from your backend securely
//  // ⚠️ Never expose real keys in production!

// sendBtn.addEventListener('click', async () => {
//   const message = userInput.value.trim();
//   console.log(message)
//   if (!message) return;

//   chatOutput.innerHTML = "<p><em>Thinking...</em></p>"; 

//   try {
//     const response = await fetch("http://localhost:8080/api/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${API_KEY}`,
//       },
//       body: JSON.stringify({
//         // model: "gpt-3.5-turbo", // or gpt-4
//         // messages: [{ role: "user", content: message }],
//         content: message 
//         // temperature: 0.7
//       }),
//     });

//     const data = await response.json();
//     const reply = data.choices?.[0]?.message?.content || "No response";

//     chatOutput.innerHTML = `<p><strong>ChatGPT:</strong> ${reply}</p>`;
//   } catch (error) {
//     console.error("Error:", error);
//     chatOutput.innerHTML = `<p style="color:red;">Error talking to ChatGPT.</p>`;
//   }
// });

// async function getVideoSuggestions() {
//   const prompt = document.getElementById("keywordInput").value;

//   const response = await fetch("/api/chat/suggestions", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ prompt })
//   });

//   const urls = await response.json();
//   const list = document.getElementById("videoResults");
//   list.innerHTML = "";
//   urls.forEach(url => {
//     const li = document.createElement("li");
//     li.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
//     list.appendChild(li);
//   });
// }

const API_URL = `http://localhost:8080`;

window.closeAIInsights = function () {
  document.getElementById("aiInsightsPanel").style.display = "none";
};

function showAIInsightsPanel() {
  document.getElementById("aiInsightsPanel").style.display = "block";
}



export async function submitAISearch(prompt) {
  
  //const prompt = document.getElementById("aiPromptInput").value;
  const resultsList = document.getElementById("resultsList");
  const panel = document.getElementById("aiInsightsPanel");
  // panel.style.display = "block";
  // resultsList.innerHTML = "<li class='list-group-item bg-dark text-light'>Loading educational suggestions...</li>";
  // showAIInsightsPanel()
   resultsList.innerHTML = "<li>Loading educational suggestions...</li>";

  try {
    const response = await fetch(`${API_URL}/api/chat/suggestions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt })
    });

    if (!response.ok) {
      resultsList.innerHTML = `<li>Server returned ${response.status}. Please try again.</li>`;
      return;
    }

    const bullets = await response.json(); // Already an array of strings
    resultsList.innerHTML = "";

    bullets.forEach(line => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.style.backgroundColor = "#212429"
      li.style.color = "whiteSmoke"
      li.style.fontSize = "2rem"
      li.style.textDecoration = "none"
      li.style.border = "none";
      // Match: "Some fact – [Link Text](https://example.com)"
      const match = line.match(/^(.*?)\s*[-–]\s*\[(.*?)\]\((.*?)\)/);
      if (match) {
        const factText = match[1].trim();
        const linkText = match[2].trim();
        const url = match[3].trim();

        li.innerHTML = `${factText} – <a href="${url}" target="_blank">${linkText}</a>`;

      } else {
        // Fallback if format doesn't match
        li.textContent = line;
      }

      resultsList.appendChild(li);
    });

  } catch (error) {
    console.error("Error:", error);
    resultsList.innerHTML = "<li>Something went wrong. Please try again later.</li>";
  }
}
