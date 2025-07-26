const replacementMap = {
  "Connections": "Friends",
  "Connection": "Friend",
  "Connect": "Add Friend",
  "Disconnect": "Unfriend",
  "Connection Request": "Friend Request",
  "Accept Connection": "Accept Friend Request",
  "Decline Connection": "Decline Friend Request"
};

function replaceTextContent(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let replaced = node.nodeValue;
    for (const [original, replacement] of Object.entries(replacementMap)) {
      const regex = new RegExp(`\\b${original}\\b`, "g");
      replaced = replaced.replace(regex, replacement);
    }
    if (replaced !== node.nodeValue) {
      node.nodeValue = replaced;
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const child of node.childNodes) {
      replaceTextContent(child);
    }
  }
}

function observeAndReplace() {
  replaceTextContent(document.body);

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(node => {
        replaceTextContent(node);
      });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

observeAndReplace();
