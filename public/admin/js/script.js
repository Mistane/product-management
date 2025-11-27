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
//--------------------------------------------------------------------------

//-------------------xu li phan tim kiem-----------------------------------
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector("#form-search input").value;
    let url = new URL(window.location.href);
    if (input) {
      url.searchParams.set("keyword", input);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url;
  });
}
//---------------------------------------------------------------------------

//------------------xu li phan pagination------------------------------------
const buttonPagination = document.querySelectorAll("[button-pagination]");
buttonPagination.forEach((button) => {
  button.addEventListener("click", (e) => {
    const currentPage = button.getAttribute("button-pagination");

    const url = new URL(window.location.href);
    if (currentPage) {
      url.searchParams.set("page", currentPage);
    } else url.searchParams.delete("page");
    window.location.href = url;
  });
});
//-------------------------------

//---------------close alert-------------
const alertMsg = document.querySelector("[show-alert]");
if (alertMsg) {
  const time = parseInt(alertMsg.getAttribute("data-time"));
  setTimeout(() => {
    alertMsg.classList.add("alert-hidden");
  }, time);

  const delMsgBtn = alertMsg.querySelector("span");
  if (delMsgBtn) {
    delMsgBtn.addEventListener("click", (e) => {
      alertMsg.classList.add("alert-hidden");
    });
  }
}
//-----------------------------------------

//----------preview image--------------------
const previewImageInput = document.querySelector("[preview-image-input]");
console.log(previewImageInput);
if (previewImageInput) {
  previewImageInput.addEventListener("change", (e) => {
    const previewSection = document.querySelector("[preview-image]");
    const image = e.target.files[0];
    previewSection.src = URL.createObjectURL(image);

    console.log(previewSection);
  });
}
