let regex = new RegExp('[“\"]?alt[- ]right[\"”]?', 'gi');

function replaceText (node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }

    if (node.textContent.search(regex) >= 0) {
      node.textContent = node.textContent.replace(regex, 'Neo-Nazis');
    }
  }
  else {
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i]);
    }
  }
}

replaceText(document.body);
