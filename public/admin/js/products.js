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
//--------------------------------------------------------

//--------------change multi product status
const formChangeMulti = document.querySelector("#form-change-multi");
const input = formChangeMulti.querySelector("[name='ids']");
const checkboxAll = document.querySelector("[name='checkall']");
const checkboxes = document.querySelectorAll("[name='check']");

checkboxAll.addEventListener("click", () => {
  checkboxes.forEach((checkbox) => (checkbox.checked = checkboxAll.checked));
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const boxChecked = document.querySelectorAll(
      "[name='check']:checked",
    ).length;
    const boxCount = checkboxes.length;

    checkboxAll.checked = boxChecked == boxCount;
  });
});

formChangeMulti.addEventListener("submit", (e) => {
  e.preventDefault();
  const boxChecked = document.querySelectorAll("[name='check']:checked");
  const option = document.querySelector("#select-options").value;
  if (boxChecked.length > 0) {
    if (option && option === "delete-all") {
      const isConfirm = confirm("Ban chac chan muon xoa cac san pham nay ?");
      if (!isConfirm) return;
    }
    let ids = [];
    boxChecked.forEach((box) => {
      ids.push(box.value);
    });
    input.value = ids.join(",");
    formChangeMulti.submit();
  }
});
//-------------------------------------------------------------

//--------------delete product---------------------------------

const deleteBtns = document.querySelectorAll("[button-delete]");
const formDelete = document.querySelector("#form-delete-product");
if (formDelete) {
  deleteBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const isConfirm = confirm("Ban co chac chan muon xoa san pham ?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        let action = formDelete.getAttribute("data-path");
        action += `/${id}?_method=DELETE`;
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}
