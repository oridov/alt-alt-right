let regex = new RegExp('[“\"]?alt[- ]right[\"”]?', 'gi');

function replaceText (node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }

    node.textContent = node.textContent.replace(regex, 'Neo-Nazis');
  }
  else {
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i]);
    }
  }
}

replaceText(document.body);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      // This DOM change was new nodes being added. Run our substitution
      // algorithm on each newly added node.
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        replaceText(newNode);
      }
    }
  });
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
