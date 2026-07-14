const messagesEl = document.getElementById("messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const statusDot = document.getElementById("status-dot");

let threadId = null;
let isLoading = false;

function addMessage(text, role) {
  const wrapper = document.createElement("div");
  wrapper.className = `flex ${role === "user" ? "justify-end" : "justify-start"}`;

  const bubble = document.createElement("div");
  bubble.className =
    role === "user"
      ? "bg-brand-orange text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[80%] text-sm leading-relaxed"
      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[80%] text-sm leading-relaxed";

  bubble.textContent = text;
  wrapper.appendChild(bubble);
  messagesEl.appendChild(wrapper);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTyping() {
  const wrapper = document.createElement("div");
  wrapper.className = "flex justify-start";
  wrapper.id = "typing-indicator";

  const bubble = document.createElement("div");
  bubble.className =
    "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-2xl rounded-tl-sm px-5 py-3 text-sm flex gap-1.5 items-center";
  bubble.innerHTML =
    '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';

  wrapper.appendChild(bubble);
  messagesEl.appendChild(wrapper);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

function setLoading(state) {
  isLoading = state;
  sendBtn.disabled = state;
  statusDot.className = state
    ? "ml-auto w-3 h-3 rounded-full bg-yellow-500"
    : "ml-auto w-3 h-3 rounded-full bg-green-500";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text || isLoading) return;

  addMessage(text, "user");
  input.value = "";
  setLoading(true);
  showTyping();

  document.getElementById("suggestions").classList.add("hidden");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, threadId }),
    });

    const data = await res.json();

    removeTyping();

    if (!res.ok) {
      addMessage("Erro: " + (data.error || "Não foi possível conectar."), "assistant");
    } else {
      threadId = data.threadId;
      addMessage(data.reply, "assistant");
    }
  } catch (err) {
    removeTyping();
    addMessage("Erro de conexão. Tente novamente.", "assistant");
  } finally {
    setLoading(false);
    input.focus();
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    form.dispatchEvent(new Event("submit"));
  }
});

function sendSuggestion(btn) {
  if (isLoading) return;
  input.value = btn.textContent.trim();
  form.dispatchEvent(new Event("submit"));
}
