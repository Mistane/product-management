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
