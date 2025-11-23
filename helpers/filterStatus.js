module.exports = (query) => {
  let filterStatus = [
    {
      name: "Tat ca",
      status: "",
      class: "",
    },

    {
      name: "Hoat dong",
      status: "active",
      class: "",
    },

    {
      name: "Dung hoat dong",
      status: "inactive",
      class: "",
    },
  ];
  const status = query.status;
  if (status) {
    const idx = filterStatus.findIndex((item) => {
      return item.status === status;
    });
    filterStatus[idx].class = "active";
  } else {
    const idx = filterStatus.findIndex((item) => {
      return item.status === "";
    });
    filterStatus[idx].class = "active";
  }
  return filterStatus;
};
