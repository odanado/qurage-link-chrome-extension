function injectScript(file: any, node: string) {
  const tagetTag = document.getElementsByTagName(node)[0];
  const scriptTag = document.createElement("script");
  scriptTag.setAttribute("type", "text/javascript");
  scriptTag.setAttribute("src", file);
  return tagetTag.appendChild(scriptTag);
}

injectScript(chrome.extension.getURL("/inpage.js"), "body");
