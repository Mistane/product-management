//----------------------init perm data--------------------------------
const data = document.querySelector("div[data]");
if (data) {
  const records = JSON.parse(data.getAttribute("data"));
  const rows = document.querySelectorAll("[data-name]");
  rows.forEach((row) => {
    if (row.getAttribute("data-name") != "") {
      row.querySelectorAll("input").forEach((input, index) => {
        const idx = index;
        records.forEach((data, index) => {
          if (
            data.permissions.indexOf(row.getAttribute("data-name")) != -1 &&
            idx == index
          ) {
            input.checked = true;
          }
        });
      });
    }
  });
}
//----------------perm edit----------------------------------
const permissionsTable = document.querySelector("[permissions-table]");
if (permissionsTable) {
  const records = JSON.parse(data.getAttribute("data"));
  const btnSubmit = document.querySelector("[edit-perm-btn]");
  const permissions = [];
  const rows = permissionsTable.querySelectorAll("[data-name]");
  rows.forEach((row) => {
    if (row.getAttribute("data-name") == "") {
      //push id vo permissions
      row.querySelectorAll("input").forEach((input, idx) =>
        permissions.push({
          id: input.value,
          permissions: records[idx].permissions || [],
        }),
      );
    } else {
      row.querySelectorAll("input").forEach((col, index) => {
        const perm = row.getAttribute("data-name");
        col.addEventListener("click", (e) => {
          //Kiem tra xem da co quyen trong permissions hay chua
          let isAdded = permissions[index].permissions.find(
            (permission) => perm == permission,
          );
          if (isAdded) {
            //Neu co roi thi se xoa do nguoi dung da nhan xoa
            const tmp = permissions[index].permissions;
            const idx = tmp.indexOf(perm);
            tmp.splice(idx, 1);
            permissions[index].permissions = tmp;
          } else {
            permissions[index].permissions.push(perm);
          }
        });
      });
    }
  });
  btnSubmit.addEventListener("click", (e) => {
    console.log(permissions);
    const permissionsEditForm = document.querySelector(
      "[permissions-edit-form]",
    );
    if (permissionsEditForm) {
      permissionsEditForm.querySelector("input").value =
        JSON.stringify(permissions);
      permissionsEditForm.submit();
    }
  });
}
//------------------------------------------------------------------
//
