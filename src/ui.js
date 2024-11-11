import Swal from "sweetalert2";

export async function create_ui(item) {
  const name = item.name;
  let count = item.count;
  const { value } = await Swal.fire({
    title: "游戏助手",
    input: "text",
    inputLabel: name,
    inputValue: count,
    inputPlaceholder: "请输入数量",
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputValidator: (value) => {
      if (!value) {
        return "请输入数量";
      }
      if (isNaN(value)) {
        return "请输入数字";
      }
      if (value < 0) {
        return "请输入正数";
      }
      return "";
    },
  });

  if (value) {
    item.count = value;
  }
}
