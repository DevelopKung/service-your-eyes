module.exports = {
  findAll: async (req, res) => {
    let list_menu = [{
      menu_type: "menu",
      title: "ปฏิทิน",
      menu_code: "calendar",
      route: "/",
      icon: " mdi-calendar-clock-outline",
    },
    {
      menu_type: "menu",
      title: "ข้อมูล",
      menu_code: "booking",
      route: "/booking",
      icon: "mdi-pencil-plus-outline",
    },
    {
      menu_type: "menu",
      title: "รายการ",
      menu_code: "lists",
      route: "/lists",
      icon: "mdi-tag-plus-outline",
    },
    {
      menu_type: "menu",
      title: "รายจ่าย",
      menu_code: "expenses",
      route: "/expenses",
      icon: "mdi-trending-down",
    }]

    res.status(200).send({ status: true, data: list_menu });
  }
}