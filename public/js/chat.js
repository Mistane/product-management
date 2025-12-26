import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
const formSendData = document.querySelector("#form-send-msg");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = formSendData.querySelector("input[name='content']");
    const content = input.value;
    const userId = formSendData.getAttribute("data-userId");
    if (content) {
      const data = {
        user_id: userId,
        content: content,
      };
      socket.emit("CLIENT_SEND_MESSAGE", data);
      input.value = "";
    }
  });
}

const userId = formSendData.getAttribute("data-userId");
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const chatBody = document.querySelector(".chat .inner-body");
  const div = document.createElement("div");
  let html = ``;
  const flag = data.user_id == userId;
  div.classList.add("inner-outgoing");
  if (!flag) {
    html = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.remove("inner-outgoing");
    div.classList.add("inner-incoming");
  }

  div.innerHTML = `
	    ${html}
	    <div class="inner-content">${data.content}</div>
	`;
  chatBody.appendChild(div);
  const bodyChat = document.querySelector(".chat .inner-body");
  if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
  }
});
//-----------------scroll chat to bottm------------------
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
//----------------------------------------------------------

//--------------emoji----------------------------------
const button = document.querySelector(".chat .inner-form span");
const tooltip = document.querySelector(".tooltip");
Popper.createPopper(button, tooltip);

button.addEventListener("click", (e) => {
  tooltip.classList.toggle("shown");
});
