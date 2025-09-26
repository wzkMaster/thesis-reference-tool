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

// 中文标点符号转英文标点符号
function convertPunctuation(text) {
  return text
    .replace(/，/g, ', ')  // 中文逗号转英文逗号+空格
    .replace(/－/g, '- ')  // 中文分隔符转英文分隔符+空格
    .replace(/—/g, '- ')  // 中文破折号转英文连字符+空格
    .replace(/：/g, ': ')  // 中文冒号转英文冒号+空格
    .replace(/；/g, '; ')  // 中文分号转英文分号+空格
    .replace(/。/g, '. ')  // 中文句号转英文句号+空格
    .replace(/？/g, '? ')  // 中文问号转英文问号+空格
    .replace(/！/g, '! '); // 中文感叹号转英文感叹号+空格
}

function sortReferences() {
  const rawInput = document.getElementById("ref-list").value;
  
  // 处理包含HTTP链接的参考文献格式
  // 按行分割，但需要合并被分割的HTTP链接
  const lines = rawInput.split("\n");
  const input = [];
  let currentRef = "";
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 如果当前行为空，跳过
    if (!line) {
      if (currentRef) {
        input.push(currentRef);
        currentRef = "";
      }
      continue;
    }
    
    // 如果当前行以HTTP开头，说明是上一行的续行
    if (line.startsWith("http")) {
      currentRef += " " + line;
    } else {
      // 如果已有当前参考文献，先保存它
      if (currentRef) {
        input.push(currentRef);
      }
      // 开始新的参考文献
      currentRef = line;
    }
  }
  
  // 处理最后一个参考文献
  if (currentRef) {
    input.push(currentRef);
  }
  
  // 过滤空项
  const filteredInput = input.filter((item) => item.trim());

  // const isSort = document.getElementById("sort").checked;

  // 根据作者字顺排序
  // if (isSort) {
  //   input.sort((a, b) =>
  //     a
  //       .replace(/^\[\d+\]\s*/, "")
  //       .localeCompare(b.replace(/^\[\d+\]\s*/, ""), "zh-Hans-CN", {
  //         sensitivity: "accent",
  //       })
  //   );
  // }

  // 检查是否需要转换标点符号
  const convertPunctuationEnabled = document.getElementById("convert-punctuation").checked;

  // 去除原序号，添加正确的新序号
  const r = filteredInput.map((item, index) => {
    if (item) {
      let processedItem = item.trim().replace(/^\[\d+\]\s*/, "");
      
      // 如果启用了标点符号转换，则转换标点符号
      if (convertPunctuationEnabled) {
        processedItem = convertPunctuation(processedItem);
      }
      
      return `[${index + 1}] ${processedItem}`;
    }
  });

  // 输出到页面
  const refOutput = document.getElementById("ref-output");
  refOutput.textContent = r.join("\n");
}
