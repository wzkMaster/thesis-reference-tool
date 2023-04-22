function openReadme() {
  window.open(
    "https://github.com/wzkMaster/thesis-reference-tool/blob/main/README.md",
    "_blank"
  );
}

// 复制排序后的参考文献列表到剪贴板
function copyText() {
  var refOutput = document.getElementById("ref-output");
  // 复制文本到剪贴板
  navigator.clipboard.writeText(refOutput.textContent).then(
    function () {
      alert("复制成功！");
    },
    function () {
      alert("复制失败！");
    }
  );
}

function sortReferences() {
  var input = document
    .getElementById("ref-list")
    .value.split("\n")
    .filter((item) => item);

  var isSort = document.getElementById("sort").checked;

  if (isSort) {
    input.sort((a, b) => {
      const regExp = /[\u4e00-\u9fa5]|[a-zA-Z]/;
      const ac = a.match(regExp);
      const bc = b.match(regExp);
      if (ac && bc) {
        return getStroke(ac[0]) - getStroke(bc[0]);
      }
      if (ac) {
        return -1;
      }
      return 1;
    });
  }

  var r = input.map((item, index) => {
    if (item) {
      return `[${index + 1}] ${item.trim().replace(/^\[\d+\]\s*/, "")}`;
    }
  });

  console.log(r);

  var refOutput = document.getElementById("ref-output");
  refOutput.textContent = r.join("\n");
}
