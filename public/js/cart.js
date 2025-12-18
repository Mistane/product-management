const checkAll = document.querySelector("#checkAllItem");
const form = document.querySelector("#form-select");
const inputField = form.querySelector("input");
const btnSubmit = document.querySelector("#btn-submit");
if (checkAll) {
  const checkboxes = document.querySelectorAll("input[data-id]");
  const checkChecked = document.querySelectorAll("input[data-id]:checked");
  checkAll.checked = checkChecked.length == checkboxes.length;
  checkAll.addEventListener("change", (e) => {
    checkboxes.forEach((input) => {
      input.checked = checkAll.checked;
    });
  });
  checkboxes.forEach((input) => {
    input.addEventListener("change", (e) => {
      const checkChecked = document.querySelectorAll("input[data-id]:checked");
      checkAll.checked = checkChecked.length == checkboxes.length;
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ids = [];
  const checkChecked = document.querySelectorAll("input[data-id]:checked");
  checkChecked.forEach((input) => ids.push(input.getAttribute("data-id")));
  inputField.value = ids.join("-");
  form.submit();
});

//--------------Doi so luong----------------------------
const inputsQuantity = document.querySelectorAll("[name='quantity']");
if (inputsQuantity) {
  inputsQuantity.forEach((input) => {
    input.addEventListener("change", (e) => {
      const productId = input.getAttribute("data-id");
      const quantity = input.value;
      window.location.href = `/cart/update/${productId}/${quantity}`;
    });
  });
}
