(function() {
    //Modifiers in this order: Shift-, Cmd-, Ctrl-, and Alt-
    CodeMirror.keyMap.subpar = {
        "Backspace"      : function(cm) {subpar.core.backward_delete(cm)},
        "Delete"         : function(cm) {subpar.core.forward_delete(cm)},
        "Ctrl-D"         : function(cm) {subpar.core.forward_delete(cm)},

        "Shift-9"        : function(cm) {subpar.core.open_expression(cm,"()")},
        "["              : function(cm) {subpar.core.open_expression(cm,"[]")},
        "Shift-["        : function(cm) {subpar.core.open_expression(cm,"{}")},

        "Shift-0"        : function(cm) {subpar.core.close_expression(cm,")")},
        "]"              : function(cm) {subpar.core.close_expression(cm,"]")},
        "Shift-]"        : function(cm) {subpar.core.close_expression(cm,"}")},

        "Shift-'"        : function(cm) {subpar.core.double_quote(cm)},

/*
        "Ctrl-Alt-F"     : function(cm) {subpar.core.forward(cm)},
        "Ctrl-Alt-B"     : function(cm) {subpar.core.backward(cm)},
        "Ctrl-Alt-U"     : function(cm) {subpar.core.backward_up(cm)},
        "Ctrl-Alt-D"     : function(cm) {subpar.core.forward_down(cm)},
        "Ctrl-Alt-P"     : function(cm) {subpar.core.backward_down(cm)},
        "Ctrl-Alt-N"     : function(cm) {subpar.core.forward_up(cm)},// doesn't work for chrome on windows

        "Shift-Ctrl-["   : function(cm) {subpar.core.backward_barf(cm)},
        "Ctrl-Alt-Right" : function(cm) {subpar.core.backward_barf(cm)},
        "Ctrl-]"         : function(cm) {subpar.core.backward_barf(cm)},

        "Shift-Ctrl-]"   : function(cm) {subpar.core.forward_barf(cm)},
        "Ctrl-Left"      : function(cm) {subpar.core.forward_barf(cm)},

        "Shift-Ctrl-9"   : function(cm) {subpar.core.backward_slurp(cm)},
        "Ctrl-Alt-Left"  : function(cm) {subpar.core.backward_slurp(cm)},
        "Ctrl-["         : function(cm) {subpar.core.backward_slurp(cm)},

        "Shift-Ctrl-0"   : function(cm) {subpar.core.forward_slurp(cm)},// todo key combination didn't work in chrome on windows
        "Ctrl-Right"     : function(cm) {subpar.core.forward_slurp(cm)},

        //todo add padding space if necessary for all splices
        "Alt-Up"         : function(cm) {subpar.core.splice_delete_backward(cm)},
        "Alt-Down"       : function(cm) {subpar.core.splice_delete_forward(cm)},
        "Alt-S"          : function(cm) {subpar.core.splice(cm)},
        //todo wrap expression in round, square, curly.
        "Ctrl-Alt-\\"    : function(cm) {subpar.core.indent_selection(cm)},
*/
        style: "fat-cursor",
        fallthrough: ["default"] // not sure if this is right
    };

})();
