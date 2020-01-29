CodeMirror.positionHint = function(cm, hints, from) {
  hints.classList.add("CodeMirror-hints");

  // If we're at the edge of the screen, then we want the menu to appear on the left of the cursor.
  var pos = cm.cursorCoords(from);
  var left = pos.left, top = pos.bottom, below = true;
  hints.style.left = left + "px";
  hints.style.bottom = "";
  hints.style.top = top + "px";
  // If we're at the edge of the screen, then we want the menu to appear on the left of the cursor.
  var winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
  var winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
  var box = hints.getBoundingClientRect();
  var overlapX = box.right - winW, overlapY = box.bottom - winH;
  if (overlapX > 0) {
    if (box.right - box.left > winW) {
      hints.style.width = (winW - 5) + "px";
      overlapX -= (box.right - box.left) - winW;
    }
    hints.style.left = (left = pos.left - overlapX) + "px";
  }
  if (overlapY > 0) {
    var height = box.bottom - box.top;
    if (box.top - (pos.bottom - pos.top) - height > 0) {
      overlapY = height + (pos.bottom - pos.top);
      below = false;
      hints.style.top = "";
      hints.style.bottom = winH - pos.top + 5 + "px";
    } else if (height > winH) {
      hints.style.height = (winH - 5) + "px";
      overlapY -= height - winH;
      hints.style.top = (top = pos.bottom - overlapY) + "px";
    }
  }
  document.body.appendChild(hints);
};

CodeMirror.ensureHintVisible = function(cm, hints, node) {
  if (node.offsetTop < hints.scrollTop)
    hints.scrollTop = node.offsetTop - 3;
  else if (node.offsetTop + node.offsetHeight > hints.scrollTop + hints.clientHeight)
    hints.scrollTop = node.offsetTop + node.offsetHeight - hints.clientHeight + 3;
};
