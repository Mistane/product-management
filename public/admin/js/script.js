//------------------xu li phan loc danh sach------------------------------
const buttons = document.querySelectorAll("[button-status]");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const status = button.getAttribute("button-status");
    const url = new URL(window.location.href);
    if (status) {
      url.searchParams.set("status", status);
    } else {
      url.searchParams.delete("status");
    }
    window.location.href = url;
  });
});
