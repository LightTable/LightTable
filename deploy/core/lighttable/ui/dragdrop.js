function initSortable(window) {
  var dragging, placeholders = [];
  var dom = lt.util.dom;
  var placeholder = dom.make('<li class="sortable-placeholder">')[0];
  var sortable = function(me, options) {
    var index, items = dom.children(me);

    if (options.connectWith) {
      var is = dom.$$(options.connectWith);
      for(var i in is) {
        is[i].sortConnect = options.connectWith;
      }
    }

    function dragStart(e) {
      dragging = this;
      dom.add_class(me, "dragging");
      //placeholder = dom.make(dragging.outerHTML)[0];
      dom.css(placeholder, {"height": dom.height(dragging) + "px",
                            "width": dom.width(dragging) + "px"});
      index = dom.index(this);
      dom.add_class(dragging, "sortable-dragging");
      //dom.css(dragging, {opacity: 0});
    }

    function dragEnd(e) {
      if (!dragging) {
        return;
      }
      dom.remove_class(me, "dragging");
      dom.remove_class(dragging, "sortable-dragging");
      dom.css(dragging, {"display":"",
                         "opacity": ""})
      if(dom.parent(dragging) != dom.parent(placeholder)) {
        //we've moved to a new sortable
        dom.after(placeholder, dragging);
        dom.remove(placeholder);
        dom.trigger(dom.parent(dragging), "moved", dragging);
        dragging = null;
        return;
      }
      dom.after(placeholder, dragging);
      dom.remove(placeholder);
      if (index != dom.index(dragging)) {
        dom.trigger(dom.parent(dragging), "sortupdate", dom.children(dom.parent(dragging)));
      }
      dragging = null;
    }

    function dragOver(e) {
      if(!dragging) {
        return false;
      }
      dom.css(dragging, {"display": "none"});

      if(this === me && dom.parent(placeholder) != me) {
        dom.append(me, placeholder);
        return false;
      }

      if (dom.parent(dragging) != dom.parent(this) && dom.parent(dragging).sortConnect !== dom.parent(this).sortConnect) {
        return true;
      }
      if (e.type == 'drop') {
        e.stopPropagation();
        dom.trigger(dragging, "dragend");
        return false;
      }
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (dom.parent(this) == me) {
        if(dom.index(placeholder) < dom.index(this)) {
          dom.after(this, placeholder);
        } else {
          dom.before(this, placeholder);
        }
      } else if (this != placeholder && dom.parent(this) != me) {
        dom.append(this, placeholder);
      }
      return false;
    }

    for(var i = 0; i < items.length; i++) {
      dom.on(items[i], "dragstart", dragStart);
      dom.on(items[i], "dragover", dragOver);
      dom.on(items[i], "drop", dragOver);
      dom.on(items[i], "dragenter", dragOver);
      dom.on(items[i], "dragend", dragEnd);
    }

    dom.on(me, "dragover", dragOver);
    dom.on(me, "drop", dragOver);
    dom.on(me, "dragenter", dragOver);

  };

  window.sortable = sortable;
};
window.sortable = function() {};

