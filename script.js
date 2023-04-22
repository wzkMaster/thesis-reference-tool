function openReadme() {
  window.open(
    "https://github.com/wzkMaster/thesis-reference-tool/blob/main/README.md",
    "_blank"
  );
}

// 复制排序后的参考文献列表到剪贴板
function copyText() {
  const refOutput = document.getElementById("ref-output");
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
  const input = document
    .getElementById("ref-list")
    .value.split("\n")
    .filter((item) => item);

  const isSort = document.getElementById("sort").checked;

  // 根据作者字顺排序
  if (isSort) {
    input.sort((a, b) =>
      a
        .replace(/^\[\d+\]\s*/, "")
        .localeCompare(b.replace(/^\[\d+\]\s*/, ""), "zh-Hans-CN", {
          sensitivity: "accent",
        })
    );
  }

  // 去除原序号，添加正确的新序号
  const r = input.map((item, index) => {
    if (item) {
      return `[${index + 1}] ${item.trim().replace(/^\[\d+\]\s*/, "")}`;
    }
  });

  // 输出到页面
  const refOutput = document.getElementById("ref-output");
  refOutput.textContent = r.join("\n");
}
