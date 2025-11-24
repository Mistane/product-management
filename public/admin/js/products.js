//-------------change product status------------------
const formChangeStatus = document.querySelector("#form-change-status");
const statusButtons = document.querySelectorAll("[button-change-status]");
if (statusButtons.length > 0) {
  statusButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const status = btn.getAttribute("data-status");
      const id = btn.getAttribute("data-id");
      if (status && id) {
        let path = formChangeStatus.getAttribute("data-path");
        console.log(path);
        path += `/${status}/${id}?_method=PATCH`;
        formChangeStatus.action = path;
        formChangeStatus.submit();
      }
    });
  });
}
