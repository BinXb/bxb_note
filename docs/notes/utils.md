<!-- 常用工具笔记 -->

# utils.tool 工具类

`检查浏览器版本 - getBroswerV`

```js
export function getBroswerV() {
  var sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/edge\/([\d.]+)/))
    ? (sys.edge = s[1])
    : (s = ua.match(/rv:([\d.]+)\) like gecko/))
    ? (sys.ie = s[1])
    : (s = ua.match(/msie ([\d.]+)/))
    ? (sys.ie = s[1])
    : (s = ua.match(/firefox\/([\d.]+)/))
    ? (sys.firefox = s[1])
    : (s = ua.match(/chrome\/([\d.]+)/))
    ? (sys.chrome = s[1])
    : (s = ua.match(/opera.([\d.]+)/))
    ? (sys.opera = s[1])
    : (s = ua.match(/360se\/([\d.]+)/))
    ? (sys.thsse = s[1])
    : (s = ua.match(/version\/([\d.]+).*safari/))
    ? (sys.safari = s[1])
    : 0;

  if (sys.edge) return { broswer: "Edge", version: sys.edge };
  if (sys.ie) return { broswer: "IE", version: sys.ie };
  if (sys.firefox) return { broswer: "Firefox", version: sys.firefox };
  if (sys.chrome) return { broswer: "Chrome", version: sys.chrome };
  if (sys.opera) return { broswer: "Opera", version: sys.opera };
  if (sys.safari) return { broswer: "Safari", version: sys.safari };
  if (sys.thsse) return { broswer: "360se", version: sys.thsse };

  return { broswer: "", version: "0" };
}
```

`js将文本复制到剪切板`

```js
function copyToClipboard(textToCopy) {
  // navigator clipboard 需要https等安全上下文
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard 向剪贴板写文本
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // 创建text area
    let box = document.getElementById("ocr_pic_container");
    let textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    console.log(box, textArea.value);
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = "absolute";
    textArea.style.opacity = 0;
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    box.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // 执行复制命令并移除文本框
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
},
```
