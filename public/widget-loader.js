/**
 * leobChat Widget Loader
 * Cole este script no seu site para adicionar o chat flutuante.
 */
(function () {
  var CHAT_URL = "https://leobchat.vercel.app/widget.html";

  var css = "\n\
    #leobchat-fab {\n\
      position: fixed;\n\
      bottom: 24px;\n\
      right: 24px;\n\
      width: 56px;\n\
      height: 56px;\n\
      border-radius: 50%;\n\
      background: #d88800;\n\
      border: none;\n\
      cursor: pointer;\n\
      box-shadow: 0 4px 20px rgba(216, 136, 0, 0.4);\n\
      z-index: 99999;\n\
      transition: transform 0.3s, box-shadow 0.3s;\n\
      display: flex;\n\
      align-items: center;\n\
      justify-content: center;\n\
    }\n\
    #leobchat-fab:hover {\n\
      transform: scale(1.1);\n\
      box-shadow: 0 6px 28px rgba(216, 136, 0, 0.55);\n\
    }\n\
    #leobchat-fab svg {\n\
      width: 26px;\n\
      height: 26px;\n\
      fill: white;\n\
      transition: transform 0.3s;\n\
    }\n\
    #leobchat-fab.open svg {\n\
      transform: rotate(45deg);\n\
    }\n\
    #leobchat-panel {\n\
      position: fixed;\n\
      bottom: 92px;\n\
      right: 24px;\n\
      width: 380px;\n\
      height: 560px;\n\
      max-height: calc(100vh - 120px);\n\
      max-width: calc(100vw - 48px);\n\
      border-radius: 20px;\n\
      overflow: hidden;\n\
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.25);\n\
      z-index: 99998;\n\
      opacity: 0;\n\
      transform: translateY(20px) scale(0.95);\n\
      pointer-events: none;\n\
      transition: opacity 0.3s, transform 0.3s;\n\
    }\n\
    #leobchat-panel.visible {\n\
      opacity: 1;\n\
      transform: translateY(0) scale(1);\n\
      pointer-events: auto;\n\
    }\n\
    #leobchat-panel iframe {\n\
      width: 100%;\n\
      height: 100%;\n\
      border: none;\n\
    }\n\
    @media (max-width: 480px) {\n\
      #leobchat-panel {\n\
        width: calc(100vw - 16px);\n\
        height: calc(100vh - 100px);\n\
        bottom: 80px;\n\
        right: 8px;\n\
        border-radius: 14px;\n\
      }\n\
      #leobchat-fab {\n\
        bottom: 16px;\n\
        right: 16px;\n\
      }\n\
    }\n\
  ";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var fab = document.createElement("button");
  fab.id = "leobchat-fab";
  fab.setAttribute("aria-label", "Abrir chat");
  fab.innerHTML =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>';

  var panel = document.createElement("div");
  panel.id = "leobchat-panel";
  panel.innerHTML = "<iframe src='" + CHAT_URL + "' loading='lazy'></iframe>";

  document.body.appendChild(panel);
  document.body.appendChild(fab);

  fab.addEventListener("click", function () {
    var isOpen = panel.classList.toggle("visible");
    fab.classList.toggle("open", isOpen);
    fab.setAttribute("aria-label", isOpen ? "Fechar chat" : "Abrir chat");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("visible")) {
      panel.classList.remove("visible");
      fab.classList.remove("open");
      fab.setAttribute("aria-label", "Abrir chat");
    }
  });
})();
