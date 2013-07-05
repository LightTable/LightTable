var COMPILED = false;
var goog = goog || {};
goog.global = this;
goog.DEBUG = true;
goog.LOCALE = "en";
goog.provide = function(name) {
  if(!COMPILED) {
    if(goog.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
    delete goog.implicitNamespaces_[name];
    var namespace = name;
    while(namespace = namespace.substring(0, namespace.lastIndexOf("."))) {
      if(goog.getObjectByName(namespace)) {
        break
      }
      goog.implicitNamespaces_[namespace] = true
    }
  }
  goog.exportPath_(name)
};
goog.setTestOnly = function(opt_message) {
  if(COMPILED && !goog.DEBUG) {
    opt_message = opt_message || "";
    throw Error("Importing test-only code into non-debug environment" + opt_message ? ": " + opt_message : ".");
  }
};
if(!COMPILED) {
  goog.isProvided_ = function(name) {
    return!goog.implicitNamespaces_[name] && !!goog.getObjectByName(name)
  };
  goog.implicitNamespaces_ = {}
}
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split(".");
  var cur = opt_objectToExportTo || goog.global;
  if(!(parts[0] in cur) && cur.execScript) {
    cur.execScript("var " + parts[0])
  }
  for(var part;parts.length && (part = parts.shift());) {
    if(!parts.length && goog.isDef(opt_object)) {
      cur[part] = opt_object
    }else {
      if(cur[part]) {
        cur = cur[part]
      }else {
        cur = cur[part] = {}
      }
    }
  }
};
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || goog.global;
  for(var part;part = parts.shift();) {
    if(goog.isDefAndNotNull(cur[part])) {
      cur = cur[part]
    }else {
      return null
    }
  }
  return cur
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for(var x in obj) {
    global[x] = obj[x]
  }
};
goog.addDependency = function(relPath, provides, requires) {
  if(!COMPILED) {
    var provide, require;
    var path = relPath.replace(/\\/g, "/");
    var deps = goog.dependencies_;
    for(var i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path;
      if(!(path in deps.pathToNames)) {
        deps.pathToNames[path] = {}
      }
      deps.pathToNames[path][provide] = true
    }
    for(var j = 0;require = requires[j];j++) {
      if(!(path in deps.requires)) {
        deps.requires[path] = {}
      }
      deps.requires[path][require] = true
    }
  }
};
goog.ENABLE_DEBUG_LOADER = true;
goog.require = function(name) {
  if(!COMPILED) {
    if(goog.isProvided_(name)) {
      return
    }
    if(goog.ENABLE_DEBUG_LOADER) {
      var path = goog.getPathFromDeps_(name);
      if(path) {
        goog.included_[path] = true;
        goog.writeScripts_();
        return
      }
    }
    var errorMessage = "goog.require could not find: " + name;
    if(goog.global.console) {
      goog.global.console["error"](errorMessage)
    }
    throw Error(errorMessage);
  }
};
goog.basePath = "";
goog.global.CLOSURE_BASE_PATH;
goog.global.CLOSURE_NO_DEPS;
goog.global.CLOSURE_IMPORT_SCRIPT;
goog.nullFunction = function() {
};
goog.identityFunction = function(var_args) {
  return arguments[0]
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    return ctor.instance_ || (ctor.instance_ = new ctor)
  }
};
if(!COMPILED && goog.ENABLE_DEBUG_LOADER) {
  goog.included_ = {};
  goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}};
  goog.inHtmlDocument_ = function() {
    var doc = goog.global.document;
    return typeof doc != "undefined" && "write" in doc
  };
  goog.findBasePath_ = function() {
    if(goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
      return
    }else {
      if(!goog.inHtmlDocument_()) {
        return
      }
    }
    var doc = goog.global.document;
    var scripts = doc.getElementsByTagName("script");
    for(var i = scripts.length - 1;i >= 0;--i) {
      var src = scripts[i].src;
      var qmark = src.lastIndexOf("?");
      var l = qmark == -1 ? src.length : qmark;
      if(src.substr(l - 7, 7) == "base.js") {
        goog.basePath = src.substr(0, l - 7);
        return
      }
    }
  };
  goog.importScript_ = function(src) {
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    if(!goog.dependencies_.written[src] && importScript(src)) {
      goog.dependencies_.written[src] = true
    }
  };
  goog.writeScriptTag_ = function(src) {
    if(goog.inHtmlDocument_()) {
      var doc = goog.global.document;
      doc.write('<script type="text/javascript" src="' + src + '"></' + "script>");
      return true
    }else {
      return false
    }
  };
  goog.writeScripts_ = function() {
    var scripts = [];
    var seenScript = {};
    var deps = goog.dependencies_;
    function visitNode(path) {
      if(path in deps.written) {
        return
      }
      if(path in deps.visited) {
        if(!(path in seenScript)) {
          seenScript[path] = true;
          scripts.push(path)
        }
        return
      }
      deps.visited[path] = true;
      if(path in deps.requires) {
        for(var requireName in deps.requires[path]) {
          if(!goog.isProvided_(requireName)) {
            if(requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName])
            }else {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      if(!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path)
      }
    }
    for(var path in goog.included_) {
      if(!deps.written[path]) {
        visitNode(path)
      }
    }
    for(var i = 0;i < scripts.length;i++) {
      if(scripts[i]) {
        goog.importScript_(goog.basePath + scripts[i])
      }else {
        throw Error("Undefined script input");
      }
    }
  };
  goog.getPathFromDeps_ = function(rule) {
    if(rule in goog.dependencies_.nameToPath) {
      return goog.dependencies_.nameToPath[rule]
    }else {
      return null
    }
  };
  goog.findBasePath_();
  if(!goog.global.CLOSURE_NO_DEPS) {
    goog.importScript_(goog.basePath + "deps.js")
  }
}
goog.typeOf = function(value) {
  var s = typeof value;
  if(s == "object") {
    if(value) {
      if(value instanceof Array) {
        return"array"
      }else {
        if(value instanceof Object) {
          return s
        }
      }
      var className = Object.prototype.toString.call(value);
      if(className == "[object Window]") {
        return"object"
      }
      if(className == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(className == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(s == "function" && typeof value.call == "undefined") {
      return"object"
    }
  }
  return s
};
goog.propertyIsEnumerableCustom_ = function(object, propName) {
  if(propName in object) {
    for(var key in object) {
      if(key == propName && Object.prototype.hasOwnProperty.call(object, propName)) {
        return true
      }
    }
  }
  return false
};
goog.propertyIsEnumerable_ = function(object, propName) {
  if(object instanceof Object) {
    return Object.prototype.propertyIsEnumerable.call(object, propName)
  }else {
    return goog.propertyIsEnumerableCustom_(object, propName)
  }
};
goog.isDef = function(val) {
  return val !== undefined
};
goog.isNull = function(val) {
  return val === null
};
goog.isDefAndNotNull = function(val) {
  return val != null
};
goog.isArray = function(val) {
  return goog.typeOf(val) == "array"
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number"
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function"
};
goog.isString = function(val) {
  return typeof val == "string"
};
goog.isBoolean = function(val) {
  return typeof val == "boolean"
};
goog.isNumber = function(val) {
  return typeof val == "number"
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == "function"
};
goog.isObject = function(val) {
  var type = goog.typeOf(val);
  return type == "object" || type == "array" || type == "function"
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(obj) {
  if("removeAttribute" in obj) {
    obj.removeAttribute(goog.UID_PROPERTY_)
  }
  try {
    delete obj[goog.UID_PROPERTY_]
  }catch(ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.cloneObject(obj[key])
    }
    return clone
  }
  return obj
};
Object.prototype.clone;
goog.bindNative_ = function(fn, selfObj, var_args) {
  return fn.call.apply(fn.bind, arguments)
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if(!fn) {
    throw new Error;
  }
  if(arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs)
    }
  }else {
    return function() {
      return fn.apply(selfObj, arguments)
    }
  }
};
goog.bind = function(fn, selfObj, var_args) {
  if(Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1) {
    goog.bind = goog.bindNative_
  }else {
    goog.bind = goog.bindJs_
  }
  return goog.bind.apply(null, arguments)
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = Array.prototype.slice.call(arguments);
    newArgs.unshift.apply(newArgs, args);
    return fn.apply(this, newArgs)
  }
};
goog.mixin = function(target, source) {
  for(var x in source) {
    target[x] = source[x]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(script) {
  if(goog.global.execScript) {
    goog.global.execScript(script, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if(typeof goog.global["_et_"] != "undefined") {
          delete goog.global["_et_"];
          goog.evalWorksForGlobals_ = true
        }else {
          goog.evalWorksForGlobals_ = false
        }
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(script)
      }else {
        var doc = goog.global.document;
        var scriptElt = doc.createElement("script");
        scriptElt.type = "text/javascript";
        scriptElt.defer = false;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.cssNameMapping_;
goog.cssNameMappingStyle_;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split("-");
    var mapped = [];
    for(var i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]))
    }
    return mapped.join("-")
  };
  var rename;
  if(goog.cssNameMapping_) {
    rename = goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts
  }else {
    rename = function(a) {
      return a
    }
  }
  if(opt_modifier) {
    return className + "-" + rename(opt_modifier)
  }else {
    return rename(className)
  }
};
goog.setCssNameMapping = function(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style
};
goog.global.CLOSURE_CSS_NAME_MAPPING;
if(!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
  goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING
}
goog.getMsg = function(str, opt_values) {
  var values = opt_values || {};
  for(var key in values) {
    var value = ("" + values[key]).replace(/\$/g, "$$$$");
    str = str.replace(new RegExp("\\{\\$" + key + "\\}", "gi"), value)
  }
  return str
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo)
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if(caller.superClass_) {
    return caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1))
  }
  var args = Array.prototype.slice.call(arguments, 2);
  var foundCaller = false;
  for(var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if(ctor.prototype[opt_methodName] === caller) {
      foundCaller = true
    }else {
      if(foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args)
      }
    }
  }
  if(me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args)
  }else {
    throw Error("goog.base called from a method of one name " + "to a method of a different name");
  }
};
goog.scope = function(fn) {
  fn.call(goog.global)
};
goog.provide("goog.string");
goog.provide("goog.string.Unicode");
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(str, prefix) {
  return str.lastIndexOf(prefix, 0) == 0
};
goog.string.endsWith = function(str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l
};
goog.string.caseInsensitiveStartsWith = function(str, prefix) {
  return goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length)) == 0
};
goog.string.caseInsensitiveEndsWith = function(str, suffix) {
  return goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length)) == 0
};
goog.string.subs = function(str, var_args) {
  for(var i = 1;i < arguments.length;i++) {
    var replacement = String(arguments[i]).replace(/\$/g, "$$$$");
    str = str.replace(/\%s/, replacement)
  }
  return str
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(str) {
  return/^[\s\xa0]*$/.test(str)
};
goog.string.isEmptySafe = function(str) {
  return goog.string.isEmpty(goog.string.makeSafe(str))
};
goog.string.isBreakingWhitespace = function(str) {
  return!/[^\t\n\r ]/.test(str)
};
goog.string.isAlpha = function(str) {
  return!/[^a-zA-Z]/.test(str)
};
goog.string.isNumeric = function(str) {
  return!/[^0-9]/.test(str)
};
goog.string.isAlphaNumeric = function(str) {
  return!/[^a-zA-Z0-9]/.test(str)
};
goog.string.isSpace = function(ch) {
  return ch == " "
};
goog.string.isUnicodeChar = function(ch) {
  return ch.length == 1 && ch >= " " && ch <= "~" || ch >= "\u0080" && ch <= "\ufffd"
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(str) {
  return str.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(str1, str2) {
  var test1 = String(str1).toLowerCase();
  var test2 = String(str2).toLowerCase();
  if(test1 < test2) {
    return-1
  }else {
    if(test1 == test2) {
      return 0
    }else {
      return 1
    }
  }
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(str1, str2) {
  if(str1 == str2) {
    return 0
  }
  if(!str1) {
    return-1
  }
  if(!str2) {
    return 1
  }
  var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var count = Math.min(tokens1.length, tokens2.length);
  for(var i = 0;i < count;i++) {
    var a = tokens1[i];
    var b = tokens2[i];
    if(a != b) {
      var num1 = parseInt(a, 10);
      if(!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if(!isNaN(num2) && num1 - num2) {
          return num1 - num2
        }
      }
      return a < b ? -1 : 1
    }
  }
  if(tokens1.length != tokens2.length) {
    return tokens1.length - tokens2.length
  }
  return str1 < str2 ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(str) {
  str = String(str);
  if(!goog.string.encodeUriRegExp_.test(str)) {
    return encodeURIComponent(str)
  }
  return str
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  if(opt_isLikelyToContainHtmlChars) {
    return str.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }else {
    if(!goog.string.allRe_.test(str)) {
      return str
    }
    if(str.indexOf("&") != -1) {
      str = str.replace(goog.string.amperRe_, "&amp;")
    }
    if(str.indexOf("<") != -1) {
      str = str.replace(goog.string.ltRe_, "&lt;")
    }
    if(str.indexOf(">") != -1) {
      str = str.replace(goog.string.gtRe_, "&gt;")
    }
    if(str.indexOf('"') != -1) {
      str = str.replace(goog.string.quotRe_, "&quot;")
    }
    return str
  }
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(str) {
  if(goog.string.contains(str, "&")) {
    if("document" in goog.global) {
      return goog.string.unescapeEntitiesUsingDom_(str)
    }else {
      return goog.string.unescapePureXmlEntities_(str)
    }
  }
  return str
};
goog.string.unescapeEntitiesUsingDom_ = function(str) {
  var seen = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  var div = document.createElement("div");
  return str.replace(goog.string.HTML_ENTITY_PATTERN_, function(s, entity) {
    var value = seen[s];
    if(value) {
      return value
    }
    if(entity.charAt(0) == "#") {
      var n = Number("0" + entity.substr(1));
      if(!isNaN(n)) {
        value = String.fromCharCode(n)
      }
    }
    if(!value) {
      div.innerHTML = s + " ";
      value = div.firstChild.nodeValue.slice(0, -1)
    }
    return seen[s] = value
  })
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if(entity.charAt(0) == "#") {
          var n = Number("0" + entity.substr(1));
          if(!isNaN(n)) {
            return String.fromCharCode(n)
          }
        }
        return s
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml)
};
goog.string.stripQuotes = function(str, quoteChars) {
  var length = quoteChars.length;
  for(var i = 0;i < length;i++) {
    var quoteChar = length == 1 ? quoteChars : quoteChars.charAt(i);
    if(str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1)
    }
  }
  return str
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  if(opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str)
  }
  if(str.length > chars) {
    str = str.substring(0, chars - 3) + "..."
  }
  if(opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str)
  }
  return str
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  if(opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str)
  }
  if(opt_trailingChars && str.length > chars) {
    if(opt_trailingChars > chars) {
      opt_trailingChars = chars
    }
    var endPoint = str.length - opt_trailingChars;
    var startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint)
  }else {
    if(str.length > chars) {
      var half = Math.floor(chars / 2);
      var endPos = str.length - half;
      half += chars % 2;
      str = str.substring(0, half) + "..." + str.substring(endPos)
    }
  }
  if(opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str)
  }
  return str
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(s) {
  s = String(s);
  if(s.quote) {
    return s.quote()
  }else {
    var sb = ['"'];
    for(var i = 0;i < s.length;i++) {
      var ch = s.charAt(i);
      var cc = ch.charCodeAt(0);
      sb[i + 1] = goog.string.specialEscapeChars_[ch] || (cc > 31 && cc < 127 ? ch : goog.string.escapeChar(ch))
    }
    sb.push('"');
    return sb.join("")
  }
};
goog.string.escapeString = function(str) {
  var sb = [];
  for(var i = 0;i < str.length;i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i))
  }
  return sb.join("")
};
goog.string.escapeChar = function(c) {
  if(c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c]
  }
  if(c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c]
  }
  var rv = c;
  var cc = c.charCodeAt(0);
  if(cc > 31 && cc < 127) {
    rv = c
  }else {
    if(cc < 256) {
      rv = "\\x";
      if(cc < 16 || cc > 256) {
        rv += "0"
      }
    }else {
      rv = "\\u";
      if(cc < 4096) {
        rv += "0"
      }
    }
    rv += cc.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[c] = rv
};
goog.string.toMap = function(s) {
  var rv = {};
  for(var i = 0;i < s.length;i++) {
    rv[s.charAt(i)] = true
  }
  return rv
};
goog.string.contains = function(s, ss) {
  return s.indexOf(ss) != -1
};
goog.string.removeAt = function(s, index, stringLength) {
  var resultStr = s;
  if(index >= 0 && index < s.length && stringLength > 0) {
    resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength)
  }
  return resultStr
};
goog.string.remove = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "")
};
goog.string.removeAll = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "")
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(string, length) {
  return(new Array(length + 1)).join(string)
};
goog.string.padNumber = function(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num);
  var index = s.indexOf(".");
  if(index == -1) {
    index = s.length
  }
  return goog.string.repeat("0", Math.max(0, length - index)) + s
};
goog.string.makeSafe = function(obj) {
  return obj == null ? "" : String(obj)
};
goog.string.buildString = function(var_args) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  var x = 2147483648;
  return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(version1, version2) {
  var order = 0;
  var v1Subs = goog.string.trim(String(version1)).split(".");
  var v2Subs = goog.string.trim(String(version2)).split(".");
  var subCount = Math.max(v1Subs.length, v2Subs.length);
  for(var subIdx = 0;order == 0 && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "";
    var v2Sub = v2Subs[subIdx] || "";
    var v1CompParser = new RegExp("(\\d*)(\\D*)", "g");
    var v2CompParser = new RegExp("(\\d*)(\\D*)", "g");
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""];
      var v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if(v1Comp[0].length == 0 && v2Comp[0].length == 0) {
        break
      }
      var v1CompNum = v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10);
      var v2CompNum = v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10);
      order = goog.string.compareElements_(v1CompNum, v2CompNum) || goog.string.compareElements_(v1Comp[2].length == 0, v2Comp[2].length == 0) || goog.string.compareElements_(v1Comp[2], v2Comp[2])
    }while(order == 0)
  }
  return order
};
goog.string.compareElements_ = function(left, right) {
  if(left < right) {
    return-1
  }else {
    if(left > right) {
      return 1
    }
  }
  return 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(str) {
  var result = 0;
  for(var i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i);
    result %= goog.string.HASHCODE_MAX_
  }
  return result
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(str) {
  var num = Number(str);
  if(num == 0 && goog.string.isEmpty(str)) {
    return NaN
  }
  return num
};
goog.string.toCamelCaseCache_ = {};
goog.string.toCamelCase = function(str) {
  return goog.string.toCamelCaseCache_[str] || (goog.string.toCamelCaseCache_[str] = String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase()
  }))
};
goog.string.toSelectorCaseCache_ = {};
goog.string.toSelectorCase = function(str) {
  return goog.string.toSelectorCaseCache_[str] || (goog.string.toSelectorCaseCache_[str] = String(str).replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.provide("goog.debug.Error");
goog.debug.Error = function(opt_msg) {
  this.stack = (new Error).stack || "";
  if(opt_msg) {
    this.message = String(opt_msg)
  }
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.provide("goog.asserts");
goog.provide("goog.asserts.AssertionError");
goog.require("goog.debug.Error");
goog.require("goog.string");
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(messagePattern, messageArgs) {
  messageArgs.unshift(messagePattern);
  goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
  messageArgs.shift();
  this.messagePattern = messagePattern
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if(givenMessage) {
    message += ": " + givenMessage;
    var args = givenArgs
  }else {
    if(defaultMessage) {
      message += ": " + defaultMessage;
      args = defaultArgs
    }
  }
  throw new goog.asserts.AssertionError("" + message, args || []);
};
goog.asserts.assert = function(condition, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !condition) {
    goog.asserts.doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return condition
};
goog.asserts.fail = function(opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value)) {
    goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertString = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isString(value)) {
    goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertFunction = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value)) {
    goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertObject = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isObject(value)) {
    goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertArray = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isArray(value)) {
    goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertBoolean = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value)) {
    goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertInstanceof = function(value, type, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !(value instanceof type)) {
    goog.asserts.doAssertFailure_("instanceof check failed.", null, opt_message, Array.prototype.slice.call(arguments, 3))
  }
};
goog.provide("goog.array");
goog.provide("goog.array.ArrayLike");
goog.require("goog.asserts");
goog.NATIVE_ARRAY_PROTOTYPES = true;
goog.array.ArrayLike;
goog.array.peek = function(array) {
  return array[array.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? 0 : opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1) {
      return-1
    }
    return arr.indexOf(obj, fromIndex)
  }
  for(var i = fromIndex;i < arr.length;i++) {
    if(i in arr && arr[i] === obj) {
      return i
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  if(fromIndex < 0) {
    fromIndex = Math.max(0, arr.length + fromIndex)
  }
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1) {
      return-1
    }
    return arr.lastIndexOf(obj, fromIndex)
  }
  for(var i = fromIndex;i >= 0;i--) {
    if(i in arr && arr[i] === obj) {
      return i
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      f.call(opt_obj, arr2[i], i, arr)
    }
  }
};
goog.array.forEachRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = l - 1;i >= 0;--i) {
    if(i in arr2) {
      f.call(opt_obj, arr2[i], i, arr)
    }
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      var val = arr2[i];
      if(f.call(opt_obj, val, i, arr)) {
        res[resLength++] = val
      }
    }
  }
  return res
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = new Array(l);
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      res[i] = f.call(opt_obj, arr2[i], i, arr)
    }
  }
  return res
};
goog.array.reduce = function(arr, f, val, opt_obj) {
  if(arr.reduce) {
    if(opt_obj) {
      return arr.reduce(goog.bind(f, opt_obj), val)
    }else {
      return arr.reduce(f, val)
    }
  }
  var rval = val;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.reduceRight = function(arr, f, val, opt_obj) {
  if(arr.reduceRight) {
    if(opt_obj) {
      return arr.reduceRight(goog.bind(f, opt_obj), val)
    }else {
      return arr.reduceRight(f, val)
    }
  }
  var rval = val;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return true
    }
  }
  return false
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return false
    }
  }
  return true
};
goog.array.find = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndex = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i
    }
  }
  return-1
};
goog.array.findRight = function(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndexRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = l - 1;i >= 0;i--) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i
    }
  }
  return-1
};
goog.array.contains = function(arr, obj) {
  return goog.array.indexOf(arr, obj) >= 0
};
goog.array.isEmpty = function(arr) {
  return arr.length == 0
};
goog.array.clear = function(arr) {
  if(!goog.isArray(arr)) {
    for(var i = arr.length - 1;i >= 0;i--) {
      delete arr[i]
    }
  }
  arr.length = 0
};
goog.array.insert = function(arr, obj) {
  if(!goog.array.contains(arr, obj)) {
    arr.push(obj)
  }
};
goog.array.insertAt = function(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj)
};
goog.array.insertArrayAt = function(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd)
};
goog.array.insertBefore = function(arr, obj, opt_obj2) {
  var i;
  if(arguments.length == 2 || (i = goog.array.indexOf(arr, opt_obj2)) < 0) {
    arr.push(obj)
  }else {
    goog.array.insertAt(arr, obj, i)
  }
};
goog.array.remove = function(arr, obj) {
  var i = goog.array.indexOf(arr, obj);
  var rv;
  if(rv = i >= 0) {
    goog.array.removeAt(arr, i)
  }
  return rv
};
goog.array.removeAt = function(arr, i) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length == 1
};
goog.array.removeIf = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  if(i >= 0) {
    goog.array.removeAt(arr, i);
    return true
  }
  return false
};
goog.array.concat = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function(arr) {
  if(goog.isArray(arr)) {
    return goog.array.concat(arr)
  }else {
    var rv = [];
    for(var i = 0, len = arr.length;i < len;i++) {
      rv[i] = arr[i]
    }
    return rv
  }
};
goog.array.toArray = function(object) {
  if(goog.isArray(object)) {
    return goog.array.concat(object)
  }
  return goog.array.clone(object)
};
goog.array.extend = function(arr1, var_args) {
  for(var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i];
    var isArrayLike;
    if(goog.isArray(arr2) || (isArrayLike = goog.isArrayLike(arr2)) && arr2.hasOwnProperty("callee")) {
      arr1.push.apply(arr1, arr2)
    }else {
      if(isArrayLike) {
        var len1 = arr1.length;
        var len2 = arr2.length;
        for(var j = 0;j < len2;j++) {
          arr1[len1 + j] = arr2[j]
        }
      }else {
        arr1.push(arr2)
      }
    }
  }
};
goog.array.splice = function(arr, index, howMany, var_args) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1))
};
goog.array.slice = function(arr, start, opt_end) {
  goog.asserts.assert(arr.length != null);
  if(arguments.length <= 2) {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start)
  }else {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end)
  }
};
goog.array.removeDuplicates = function(arr, opt_rv) {
  var returnArray = opt_rv || arr;
  var seen = {}, cursorInsert = 0, cursorRead = 0;
  while(cursorRead < arr.length) {
    var current = arr[cursorRead++];
    var key = goog.isObject(current) ? "o" + goog.getUid(current) : (typeof current).charAt(0) + current;
    if(!Object.prototype.hasOwnProperty.call(seen, key)) {
      seen[key] = true;
      returnArray[cursorInsert++] = current
    }
  }
  returnArray.length = cursorInsert
};
goog.array.binarySearch = function(arr, target, opt_compareFn) {
  return goog.array.binarySearch_(arr, opt_compareFn || goog.array.defaultCompare, false, target)
};
goog.array.binarySelect = function(arr, evaluator, opt_obj) {
  return goog.array.binarySearch_(arr, evaluator, true, undefined, opt_obj)
};
goog.array.binarySearch_ = function(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  var left = 0;
  var right = arr.length;
  var found;
  while(left < right) {
    var middle = left + right >> 1;
    var compareResult;
    if(isEvaluator) {
      compareResult = compareFn.call(opt_selfObj, arr[middle], middle, arr)
    }else {
      compareResult = compareFn(opt_target, arr[middle])
    }
    if(compareResult > 0) {
      left = middle + 1
    }else {
      right = middle;
      found = !compareResult
    }
  }
  return found ? left : ~left
};
goog.array.sort = function(arr, opt_compareFn) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.sort.call(arr, opt_compareFn || goog.array.defaultCompare)
};
goog.array.stableSort = function(arr, opt_compareFn) {
  for(var i = 0;i < arr.length;i++) {
    arr[i] = {index:i, value:arr[i]}
  }
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index
  }
  goog.array.sort(arr, stableCompareFn);
  for(var i = 0;i < arr.length;i++) {
    arr[i] = arr[i].value
  }
};
goog.array.sortObjectsByKey = function(arr, key, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return compare(a[key], b[key])
  })
};
goog.array.isSorted = function(arr, opt_compareFn, opt_strict) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  for(var i = 1;i < arr.length;i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if(compareResult > 0 || compareResult == 0 && opt_strict) {
      return false
    }
  }
  return true
};
goog.array.equals = function(arr1, arr2, opt_equalsFn) {
  if(!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return false
  }
  var l = arr1.length;
  var equalsFn = opt_equalsFn || goog.array.defaultCompareEquality;
  for(var i = 0;i < l;i++) {
    if(!equalsFn(arr1[i], arr2[i])) {
      return false
    }
  }
  return true
};
goog.array.compare = function(arr1, arr2, opt_equalsFn) {
  return goog.array.equals(arr1, arr2, opt_equalsFn)
};
goog.array.compare3 = function(arr1, arr2, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  var l = Math.min(arr1.length, arr2.length);
  for(var i = 0;i < l;i++) {
    var result = compare(arr1[i], arr2[i]);
    if(result != 0) {
      return result
    }
  }
  return goog.array.defaultCompare(arr1.length, arr2.length)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  if(index < 0) {
    goog.array.insertAt(array, value, -(index + 1));
    return true
  }
  return false
};
goog.array.binaryRemove = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return index >= 0 ? goog.array.removeAt(array, index) : false
};
goog.array.bucket = function(array, sorter) {
  var buckets = {};
  for(var i = 0;i < array.length;i++) {
    var value = array[i];
    var key = sorter(value, i, array);
    if(goog.isDef(key)) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value)
    }
  }
  return buckets
};
goog.array.repeat = function(value, n) {
  var array = [];
  for(var i = 0;i < n;i++) {
    array[i] = value
  }
  return array
};
goog.array.flatten = function(var_args) {
  var result = [];
  for(var i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    if(goog.isArray(element)) {
      result.push.apply(result, goog.array.flatten.apply(null, element))
    }else {
      result.push(element)
    }
  }
  return result
};
goog.array.rotate = function(array, n) {
  goog.asserts.assert(array.length != null);
  if(array.length) {
    n %= array.length;
    if(n > 0) {
      goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n))
    }else {
      if(n < 0) {
        goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n))
      }
    }
  }
  return array
};
goog.array.zip = function(var_args) {
  if(!arguments.length) {
    return[]
  }
  var result = [];
  for(var i = 0;true;i++) {
    var value = [];
    for(var j = 0;j < arguments.length;j++) {
      var arr = arguments[j];
      if(i >= arr.length) {
        return result
      }
      value.push(arr[i])
    }
    result.push(value)
  }
};
goog.array.shuffle = function(arr, opt_randFn) {
  var randFn = opt_randFn || Math.random;
  for(var i = arr.length - 1;i > 0;i--) {
    var j = Math.floor(randFn() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp
  }
};
goog.provide("goog.object");
goog.object.forEach = function(obj, f, opt_obj) {
  for(var key in obj) {
    f.call(opt_obj, obj[key], key, obj)
  }
};
goog.object.filter = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj) {
    if(f.call(opt_obj, obj[key], key, obj)) {
      res[key] = obj[key]
    }
  }
  return res
};
goog.object.map = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj) {
    res[key] = f.call(opt_obj, obj[key], key, obj)
  }
  return res
};
goog.object.some = function(obj, f, opt_obj) {
  for(var key in obj) {
    if(f.call(opt_obj, obj[key], key, obj)) {
      return true
    }
  }
  return false
};
goog.object.every = function(obj, f, opt_obj) {
  for(var key in obj) {
    if(!f.call(opt_obj, obj[key], key, obj)) {
      return false
    }
  }
  return true
};
goog.object.getCount = function(obj) {
  var rv = 0;
  for(var key in obj) {
    rv++
  }
  return rv
};
goog.object.getAnyKey = function(obj) {
  for(var key in obj) {
    return key
  }
};
goog.object.getAnyValue = function(obj) {
  for(var key in obj) {
    return obj[key]
  }
};
goog.object.contains = function(obj, val) {
  return goog.object.containsValue(obj, val)
};
goog.object.getValues = function(obj) {
  var res = [];
  var i = 0;
  for(var key in obj) {
    res[i++] = obj[key]
  }
  return res
};
goog.object.getKeys = function(obj) {
  var res = [];
  var i = 0;
  for(var key in obj) {
    res[i++] = key
  }
  return res
};
goog.object.getValueByKeys = function(obj, var_args) {
  var isArrayLike = goog.isArrayLike(var_args);
  var keys = isArrayLike ? var_args : arguments;
  for(var i = isArrayLike ? 0 : 1;i < keys.length;i++) {
    obj = obj[keys[i]];
    if(!goog.isDef(obj)) {
      break
    }
  }
  return obj
};
goog.object.containsKey = function(obj, key) {
  return key in obj
};
goog.object.containsValue = function(obj, val) {
  for(var key in obj) {
    if(obj[key] == val) {
      return true
    }
  }
  return false
};
goog.object.findKey = function(obj, f, opt_this) {
  for(var key in obj) {
    if(f.call(opt_this, obj[key], key, obj)) {
      return key
    }
  }
  return undefined
};
goog.object.findValue = function(obj, f, opt_this) {
  var key = goog.object.findKey(obj, f, opt_this);
  return key && obj[key]
};
goog.object.isEmpty = function(obj) {
  for(var key in obj) {
    return false
  }
  return true
};
goog.object.clear = function(obj) {
  for(var i in obj) {
    delete obj[i]
  }
};
goog.object.remove = function(obj, key) {
  var rv;
  if(rv = key in obj) {
    delete obj[key]
  }
  return rv
};
goog.object.add = function(obj, key, val) {
  if(key in obj) {
    throw Error('The object already contains the key "' + key + '"');
  }
  goog.object.set(obj, key, val)
};
goog.object.get = function(obj, key, opt_val) {
  if(key in obj) {
    return obj[key]
  }
  return opt_val
};
goog.object.set = function(obj, key, value) {
  obj[key] = value
};
goog.object.setIfUndefined = function(obj, key, value) {
  return key in obj ? obj[key] : obj[key] = value
};
goog.object.clone = function(obj) {
  var res = {};
  for(var key in obj) {
    res[key] = obj[key]
  }
  return res
};
goog.object.unsafeClone = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.object.unsafeClone(obj[key])
    }
    return clone
  }
  return obj
};
goog.object.transpose = function(obj) {
  var transposed = {};
  for(var key in obj) {
    transposed[obj[key]] = key
  }
  return transposed
};
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.object.extend = function(target, var_args) {
  var key, source;
  for(var i = 1;i < arguments.length;i++) {
    source = arguments[i];
    for(key in source) {
      target[key] = source[key]
    }
    for(var j = 0;j < goog.object.PROTOTYPE_FIELDS_.length;j++) {
      key = goog.object.PROTOTYPE_FIELDS_[j];
      if(Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }
};
goog.object.create = function(var_args) {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(argLength % 2) {
    throw Error("Uneven number of arguments");
  }
  var rv = {};
  for(var i = 0;i < argLength;i += 2) {
    rv[arguments[i]] = arguments[i + 1]
  }
  return rv
};
goog.object.createSet = function(var_args) {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  var rv = {};
  for(var i = 0;i < argLength;i++) {
    rv[arguments[i]] = true
  }
  return rv
};
goog.provide("goog.string.format");
goog.require("goog.string");
goog.string.format = function(formatString, var_args) {
  var args = Array.prototype.slice.call(arguments);
  var template = args.shift();
  if(typeof template == "undefined") {
    throw Error("[goog.string.format] Template required");
  }
  var formatRe = /%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g;
  function replacerDemuxer(match, flags, width, dotp, precision, type, offset, wholeString) {
    if(type == "%") {
      return"%"
    }
    var value = args.shift();
    if(typeof value == "undefined") {
      throw Error("[goog.string.format] Not enough arguments");
    }
    arguments[0] = value;
    return goog.string.format.demuxes_[type].apply(null, arguments)
  }
  return template.replace(formatRe, replacerDemuxer)
};
goog.string.format.demuxes_ = {};
goog.string.format.demuxes_["s"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  var replacement = value;
  if(isNaN(width) || width == "" || replacement.length >= width) {
    return replacement
  }
  if(flags.indexOf("-", 0) > -1) {
    replacement = replacement + goog.string.repeat(" ", width - replacement.length)
  }else {
    replacement = goog.string.repeat(" ", width - replacement.length) + replacement
  }
  return replacement
};
goog.string.format.demuxes_["f"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  var replacement = value.toString();
  if(!(isNaN(precision) || precision == "")) {
    replacement = value.toFixed(precision)
  }
  var sign;
  if(value < 0) {
    sign = "-"
  }else {
    if(flags.indexOf("+") >= 0) {
      sign = "+"
    }else {
      if(flags.indexOf(" ") >= 0) {
        sign = " "
      }else {
        sign = ""
      }
    }
  }
  if(value >= 0) {
    replacement = sign + replacement
  }
  if(isNaN(width) || replacement.length >= width) {
    return replacement
  }
  replacement = isNaN(precision) ? Math.abs(value).toString() : Math.abs(value).toFixed(precision);
  var padCount = width - replacement.length - sign.length;
  if(flags.indexOf("-", 0) >= 0) {
    replacement = sign + replacement + goog.string.repeat(" ", padCount)
  }else {
    var paddingChar = flags.indexOf("0", 0) >= 0 ? "0" : " ";
    replacement = sign + goog.string.repeat(paddingChar, padCount) + replacement
  }
  return replacement
};
goog.string.format.demuxes_["d"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  return goog.string.format.demuxes_["f"](parseInt(value, 10), flags, width, dotp, 0, type, offset, wholeString)
};
goog.string.format.demuxes_["i"] = goog.string.format.demuxes_["d"];
goog.string.format.demuxes_["u"] = goog.string.format.demuxes_["d"];
goog.provide("goog.userAgent.jscript");
goog.require("goog.string");
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = false;
goog.userAgent.jscript.init_ = function() {
  var hasScriptEngine = "ScriptEngine" in goog.global;
  goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = hasScriptEngine && goog.global["ScriptEngine"]() == "JScript";
  goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global["ScriptEngineMajorVersion"]() + "." + goog.global["ScriptEngineMinorVersion"]() + "." + goog.global["ScriptEngineBuildVersion"]() : "0"
};
if(!goog.userAgent.jscript.ASSUME_NO_JSCRIPT) {
  goog.userAgent.jscript.init_()
}
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? false : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(version) {
  return goog.string.compareVersions(goog.userAgent.jscript.VERSION, version) >= 0
};
goog.provide("goog.string.StringBuffer");
goog.require("goog.userAgent.jscript");
goog.string.StringBuffer = function(opt_a1, var_args) {
  this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "";
  if(opt_a1 != null) {
    this.append.apply(this, arguments)
  }
};
goog.string.StringBuffer.prototype.set = function(s) {
  this.clear();
  this.append(s)
};
if(goog.userAgent.jscript.HAS_JSCRIPT) {
  goog.string.StringBuffer.prototype.bufferLength_ = 0;
  goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
    if(opt_a2 == null) {
      this.buffer_[this.bufferLength_++] = a1
    }else {
      this.buffer_.push.apply(this.buffer_, arguments);
      this.bufferLength_ = this.buffer_.length
    }
    return this
  }
}else {
  goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
    this.buffer_ += a1;
    if(opt_a2 != null) {
      for(var i = 1;i < arguments.length;i++) {
        this.buffer_ += arguments[i]
      }
    }
    return this
  }
}
goog.string.StringBuffer.prototype.clear = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    this.buffer_.length = 0;
    this.bufferLength_ = 0
  }else {
    this.buffer_ = ""
  }
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.toString().length
};
goog.string.StringBuffer.prototype.toString = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    var str = this.buffer_.join("");
    this.clear();
    if(str) {
      this.append(str)
    }
    return str
  }else {
    return this.buffer_
  }
};
goog.provide("cljs.core");
goog.require("goog.array");
goog.require("goog.object");
goog.require("goog.string.format");
goog.require("goog.string.StringBuffer");
goog.require("goog.string");
cljs.core._STAR_unchecked_if_STAR_ = false;
cljs.core._STAR_print_fn_STAR_ = function _STAR_print_fn_STAR_(_) {
  throw new Error("No *print-fn* fn set for evaluation environment");
};
cljs.core.truth_ = function truth_(x) {
  return x != null && x !== false
};
cljs.core.type_satisfies_ = function type_satisfies_(p, x) {
  var x__7364 = x == null ? null : x;
  if(p[goog.typeOf(x__7364)]) {
    return true
  }else {
    if(p["_"]) {
      return true
    }else {
      if("\ufdd0'else") {
        return false
      }else {
        return null
      }
    }
  }
};
cljs.core.is_proto_ = function is_proto_(x) {
  return x.constructor.prototype === x
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = function missing_protocol(proto, obj) {
  return Error(["No protocol method ", proto, " defined for type ", goog.typeOf(obj), ": ", obj].join(""))
};
cljs.core.aclone = function aclone(array_like) {
  return array_like.slice()
};
cljs.core.array = function array(var_args) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.make_array = function() {
  var make_array = null;
  var make_array__1 = function(size) {
    return new Array(size)
  };
  var make_array__2 = function(type, size) {
    return make_array.call(null, size)
  };
  make_array = function(type, size) {
    switch(arguments.length) {
      case 1:
        return make_array__1.call(this, type);
      case 2:
        return make_array__2.call(this, type, size)
    }
    throw"Invalid arity: " + arguments.length;
  };
  make_array.cljs$lang$arity$1 = make_array__1;
  make_array.cljs$lang$arity$2 = make_array__2;
  return make_array
}();
cljs.core.aget = function() {
  var aget = null;
  var aget__2 = function(array, i) {
    return array[i]
  };
  var aget__3 = function() {
    var G__7365__delegate = function(array, i, idxs) {
      return cljs.core.apply.call(null, aget, aget.call(null, array, i), idxs)
    };
    var G__7365 = function(array, i, var_args) {
      var idxs = null;
      if(goog.isDef(var_args)) {
        idxs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7365__delegate.call(this, array, i, idxs)
    };
    G__7365.cljs$lang$maxFixedArity = 2;
    G__7365.cljs$lang$applyTo = function(arglist__7366) {
      var array = cljs.core.first(arglist__7366);
      var i = cljs.core.first(cljs.core.next(arglist__7366));
      var idxs = cljs.core.rest(cljs.core.next(arglist__7366));
      return G__7365__delegate(array, i, idxs)
    };
    G__7365.cljs$lang$arity$variadic = G__7365__delegate;
    return G__7365
  }();
  aget = function(array, i, var_args) {
    var idxs = var_args;
    switch(arguments.length) {
      case 2:
        return aget__2.call(this, array, i);
      default:
        return aget__3.cljs$lang$arity$variadic(array, i, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  aget.cljs$lang$maxFixedArity = 2;
  aget.cljs$lang$applyTo = aget__3.cljs$lang$applyTo;
  aget.cljs$lang$arity$2 = aget__2;
  aget.cljs$lang$arity$variadic = aget__3.cljs$lang$arity$variadic;
  return aget
}();
cljs.core.aset = function aset(array, i, val) {
  return array[i] = val
};
cljs.core.alength = function alength(array) {
  return array.length
};
cljs.core.into_array = function() {
  var into_array = null;
  var into_array__1 = function(aseq) {
    return into_array.call(null, null, aseq)
  };
  var into_array__2 = function(type, aseq) {
    return cljs.core.reduce.call(null, function(a, x) {
      a.push(x);
      return a
    }, [], aseq)
  };
  into_array = function(type, aseq) {
    switch(arguments.length) {
      case 1:
        return into_array__1.call(this, type);
      case 2:
        return into_array__2.call(this, type, aseq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  into_array.cljs$lang$arity$1 = into_array__1;
  into_array.cljs$lang$arity$2 = into_array__2;
  return into_array
}();
cljs.core.IFn = {};
cljs.core._invoke = function() {
  var _invoke = null;
  var _invoke__1 = function(this$) {
    if(function() {
      var and__3822__auto____7451 = this$;
      if(and__3822__auto____7451) {
        return this$.cljs$core$IFn$_invoke$arity$1
      }else {
        return and__3822__auto____7451
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$1(this$)
    }else {
      var x__2363__auto____7452 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7453 = cljs.core._invoke[goog.typeOf(x__2363__auto____7452)];
        if(or__3824__auto____7453) {
          return or__3824__auto____7453
        }else {
          var or__3824__auto____7454 = cljs.core._invoke["_"];
          if(or__3824__auto____7454) {
            return or__3824__auto____7454
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$)
    }
  };
  var _invoke__2 = function(this$, a) {
    if(function() {
      var and__3822__auto____7455 = this$;
      if(and__3822__auto____7455) {
        return this$.cljs$core$IFn$_invoke$arity$2
      }else {
        return and__3822__auto____7455
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$2(this$, a)
    }else {
      var x__2363__auto____7456 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7457 = cljs.core._invoke[goog.typeOf(x__2363__auto____7456)];
        if(or__3824__auto____7457) {
          return or__3824__auto____7457
        }else {
          var or__3824__auto____7458 = cljs.core._invoke["_"];
          if(or__3824__auto____7458) {
            return or__3824__auto____7458
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a)
    }
  };
  var _invoke__3 = function(this$, a, b) {
    if(function() {
      var and__3822__auto____7459 = this$;
      if(and__3822__auto____7459) {
        return this$.cljs$core$IFn$_invoke$arity$3
      }else {
        return and__3822__auto____7459
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$3(this$, a, b)
    }else {
      var x__2363__auto____7460 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7461 = cljs.core._invoke[goog.typeOf(x__2363__auto____7460)];
        if(or__3824__auto____7461) {
          return or__3824__auto____7461
        }else {
          var or__3824__auto____7462 = cljs.core._invoke["_"];
          if(or__3824__auto____7462) {
            return or__3824__auto____7462
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b)
    }
  };
  var _invoke__4 = function(this$, a, b, c) {
    if(function() {
      var and__3822__auto____7463 = this$;
      if(and__3822__auto____7463) {
        return this$.cljs$core$IFn$_invoke$arity$4
      }else {
        return and__3822__auto____7463
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$4(this$, a, b, c)
    }else {
      var x__2363__auto____7464 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7465 = cljs.core._invoke[goog.typeOf(x__2363__auto____7464)];
        if(or__3824__auto____7465) {
          return or__3824__auto____7465
        }else {
          var or__3824__auto____7466 = cljs.core._invoke["_"];
          if(or__3824__auto____7466) {
            return or__3824__auto____7466
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c)
    }
  };
  var _invoke__5 = function(this$, a, b, c, d) {
    if(function() {
      var and__3822__auto____7467 = this$;
      if(and__3822__auto____7467) {
        return this$.cljs$core$IFn$_invoke$arity$5
      }else {
        return and__3822__auto____7467
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$5(this$, a, b, c, d)
    }else {
      var x__2363__auto____7468 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7469 = cljs.core._invoke[goog.typeOf(x__2363__auto____7468)];
        if(or__3824__auto____7469) {
          return or__3824__auto____7469
        }else {
          var or__3824__auto____7470 = cljs.core._invoke["_"];
          if(or__3824__auto____7470) {
            return or__3824__auto____7470
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d)
    }
  };
  var _invoke__6 = function(this$, a, b, c, d, e) {
    if(function() {
      var and__3822__auto____7471 = this$;
      if(and__3822__auto____7471) {
        return this$.cljs$core$IFn$_invoke$arity$6
      }else {
        return and__3822__auto____7471
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$6(this$, a, b, c, d, e)
    }else {
      var x__2363__auto____7472 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7473 = cljs.core._invoke[goog.typeOf(x__2363__auto____7472)];
        if(or__3824__auto____7473) {
          return or__3824__auto____7473
        }else {
          var or__3824__auto____7474 = cljs.core._invoke["_"];
          if(or__3824__auto____7474) {
            return or__3824__auto____7474
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e)
    }
  };
  var _invoke__7 = function(this$, a, b, c, d, e, f) {
    if(function() {
      var and__3822__auto____7475 = this$;
      if(and__3822__auto____7475) {
        return this$.cljs$core$IFn$_invoke$arity$7
      }else {
        return and__3822__auto____7475
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$7(this$, a, b, c, d, e, f)
    }else {
      var x__2363__auto____7476 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7477 = cljs.core._invoke[goog.typeOf(x__2363__auto____7476)];
        if(or__3824__auto____7477) {
          return or__3824__auto____7477
        }else {
          var or__3824__auto____7478 = cljs.core._invoke["_"];
          if(or__3824__auto____7478) {
            return or__3824__auto____7478
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f)
    }
  };
  var _invoke__8 = function(this$, a, b, c, d, e, f, g) {
    if(function() {
      var and__3822__auto____7479 = this$;
      if(and__3822__auto____7479) {
        return this$.cljs$core$IFn$_invoke$arity$8
      }else {
        return and__3822__auto____7479
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$8(this$, a, b, c, d, e, f, g)
    }else {
      var x__2363__auto____7480 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7481 = cljs.core._invoke[goog.typeOf(x__2363__auto____7480)];
        if(or__3824__auto____7481) {
          return or__3824__auto____7481
        }else {
          var or__3824__auto____7482 = cljs.core._invoke["_"];
          if(or__3824__auto____7482) {
            return or__3824__auto____7482
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g)
    }
  };
  var _invoke__9 = function(this$, a, b, c, d, e, f, g, h) {
    if(function() {
      var and__3822__auto____7483 = this$;
      if(and__3822__auto____7483) {
        return this$.cljs$core$IFn$_invoke$arity$9
      }else {
        return and__3822__auto____7483
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$9(this$, a, b, c, d, e, f, g, h)
    }else {
      var x__2363__auto____7484 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7485 = cljs.core._invoke[goog.typeOf(x__2363__auto____7484)];
        if(or__3824__auto____7485) {
          return or__3824__auto____7485
        }else {
          var or__3824__auto____7486 = cljs.core._invoke["_"];
          if(or__3824__auto____7486) {
            return or__3824__auto____7486
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h)
    }
  };
  var _invoke__10 = function(this$, a, b, c, d, e, f, g, h, i) {
    if(function() {
      var and__3822__auto____7487 = this$;
      if(and__3822__auto____7487) {
        return this$.cljs$core$IFn$_invoke$arity$10
      }else {
        return and__3822__auto____7487
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$10(this$, a, b, c, d, e, f, g, h, i)
    }else {
      var x__2363__auto____7488 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7489 = cljs.core._invoke[goog.typeOf(x__2363__auto____7488)];
        if(or__3824__auto____7489) {
          return or__3824__auto____7489
        }else {
          var or__3824__auto____7490 = cljs.core._invoke["_"];
          if(or__3824__auto____7490) {
            return or__3824__auto____7490
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i)
    }
  };
  var _invoke__11 = function(this$, a, b, c, d, e, f, g, h, i, j) {
    if(function() {
      var and__3822__auto____7491 = this$;
      if(and__3822__auto____7491) {
        return this$.cljs$core$IFn$_invoke$arity$11
      }else {
        return and__3822__auto____7491
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$11(this$, a, b, c, d, e, f, g, h, i, j)
    }else {
      var x__2363__auto____7492 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7493 = cljs.core._invoke[goog.typeOf(x__2363__auto____7492)];
        if(or__3824__auto____7493) {
          return or__3824__auto____7493
        }else {
          var or__3824__auto____7494 = cljs.core._invoke["_"];
          if(or__3824__auto____7494) {
            return or__3824__auto____7494
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j)
    }
  };
  var _invoke__12 = function(this$, a, b, c, d, e, f, g, h, i, j, k) {
    if(function() {
      var and__3822__auto____7495 = this$;
      if(and__3822__auto____7495) {
        return this$.cljs$core$IFn$_invoke$arity$12
      }else {
        return and__3822__auto____7495
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$12(this$, a, b, c, d, e, f, g, h, i, j, k)
    }else {
      var x__2363__auto____7496 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7497 = cljs.core._invoke[goog.typeOf(x__2363__auto____7496)];
        if(or__3824__auto____7497) {
          return or__3824__auto____7497
        }else {
          var or__3824__auto____7498 = cljs.core._invoke["_"];
          if(or__3824__auto____7498) {
            return or__3824__auto____7498
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k)
    }
  };
  var _invoke__13 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l) {
    if(function() {
      var and__3822__auto____7499 = this$;
      if(and__3822__auto____7499) {
        return this$.cljs$core$IFn$_invoke$arity$13
      }else {
        return and__3822__auto____7499
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$13(this$, a, b, c, d, e, f, g, h, i, j, k, l)
    }else {
      var x__2363__auto____7500 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7501 = cljs.core._invoke[goog.typeOf(x__2363__auto____7500)];
        if(or__3824__auto____7501) {
          return or__3824__auto____7501
        }else {
          var or__3824__auto____7502 = cljs.core._invoke["_"];
          if(or__3824__auto____7502) {
            return or__3824__auto____7502
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l)
    }
  };
  var _invoke__14 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m) {
    if(function() {
      var and__3822__auto____7503 = this$;
      if(and__3822__auto____7503) {
        return this$.cljs$core$IFn$_invoke$arity$14
      }else {
        return and__3822__auto____7503
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$14(this$, a, b, c, d, e, f, g, h, i, j, k, l, m)
    }else {
      var x__2363__auto____7504 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7505 = cljs.core._invoke[goog.typeOf(x__2363__auto____7504)];
        if(or__3824__auto____7505) {
          return or__3824__auto____7505
        }else {
          var or__3824__auto____7506 = cljs.core._invoke["_"];
          if(or__3824__auto____7506) {
            return or__3824__auto____7506
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m)
    }
  };
  var _invoke__15 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    if(function() {
      var and__3822__auto____7507 = this$;
      if(and__3822__auto____7507) {
        return this$.cljs$core$IFn$_invoke$arity$15
      }else {
        return and__3822__auto____7507
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$15(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n)
    }else {
      var x__2363__auto____7508 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7509 = cljs.core._invoke[goog.typeOf(x__2363__auto____7508)];
        if(or__3824__auto____7509) {
          return or__3824__auto____7509
        }else {
          var or__3824__auto____7510 = cljs.core._invoke["_"];
          if(or__3824__auto____7510) {
            return or__3824__auto____7510
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n)
    }
  };
  var _invoke__16 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    if(function() {
      var and__3822__auto____7511 = this$;
      if(and__3822__auto____7511) {
        return this$.cljs$core$IFn$_invoke$arity$16
      }else {
        return and__3822__auto____7511
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$16(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
    }else {
      var x__2363__auto____7512 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7513 = cljs.core._invoke[goog.typeOf(x__2363__auto____7512)];
        if(or__3824__auto____7513) {
          return or__3824__auto____7513
        }else {
          var or__3824__auto____7514 = cljs.core._invoke["_"];
          if(or__3824__auto____7514) {
            return or__3824__auto____7514
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
    }
  };
  var _invoke__17 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    if(function() {
      var and__3822__auto____7515 = this$;
      if(and__3822__auto____7515) {
        return this$.cljs$core$IFn$_invoke$arity$17
      }else {
        return and__3822__auto____7515
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$17(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
    }else {
      var x__2363__auto____7516 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7517 = cljs.core._invoke[goog.typeOf(x__2363__auto____7516)];
        if(or__3824__auto____7517) {
          return or__3824__auto____7517
        }else {
          var or__3824__auto____7518 = cljs.core._invoke["_"];
          if(or__3824__auto____7518) {
            return or__3824__auto____7518
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
    }
  };
  var _invoke__18 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    if(function() {
      var and__3822__auto____7519 = this$;
      if(and__3822__auto____7519) {
        return this$.cljs$core$IFn$_invoke$arity$18
      }else {
        return and__3822__auto____7519
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$18(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q)
    }else {
      var x__2363__auto____7520 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7521 = cljs.core._invoke[goog.typeOf(x__2363__auto____7520)];
        if(or__3824__auto____7521) {
          return or__3824__auto____7521
        }else {
          var or__3824__auto____7522 = cljs.core._invoke["_"];
          if(or__3824__auto____7522) {
            return or__3824__auto____7522
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q)
    }
  };
  var _invoke__19 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s) {
    if(function() {
      var and__3822__auto____7523 = this$;
      if(and__3822__auto____7523) {
        return this$.cljs$core$IFn$_invoke$arity$19
      }else {
        return and__3822__auto____7523
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$19(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s)
    }else {
      var x__2363__auto____7524 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7525 = cljs.core._invoke[goog.typeOf(x__2363__auto____7524)];
        if(or__3824__auto____7525) {
          return or__3824__auto____7525
        }else {
          var or__3824__auto____7526 = cljs.core._invoke["_"];
          if(or__3824__auto____7526) {
            return or__3824__auto____7526
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s)
    }
  };
  var _invoke__20 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t) {
    if(function() {
      var and__3822__auto____7527 = this$;
      if(and__3822__auto____7527) {
        return this$.cljs$core$IFn$_invoke$arity$20
      }else {
        return and__3822__auto____7527
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$20(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t)
    }else {
      var x__2363__auto____7528 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7529 = cljs.core._invoke[goog.typeOf(x__2363__auto____7528)];
        if(or__3824__auto____7529) {
          return or__3824__auto____7529
        }else {
          var or__3824__auto____7530 = cljs.core._invoke["_"];
          if(or__3824__auto____7530) {
            return or__3824__auto____7530
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t)
    }
  };
  var _invoke__21 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest) {
    if(function() {
      var and__3822__auto____7531 = this$;
      if(and__3822__auto____7531) {
        return this$.cljs$core$IFn$_invoke$arity$21
      }else {
        return and__3822__auto____7531
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$21(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }else {
      var x__2363__auto____7532 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____7533 = cljs.core._invoke[goog.typeOf(x__2363__auto____7532)];
        if(or__3824__auto____7533) {
          return or__3824__auto____7533
        }else {
          var or__3824__auto____7534 = cljs.core._invoke["_"];
          if(or__3824__auto____7534) {
            return or__3824__auto____7534
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }
  };
  _invoke = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest) {
    switch(arguments.length) {
      case 1:
        return _invoke__1.call(this, this$);
      case 2:
        return _invoke__2.call(this, this$, a);
      case 3:
        return _invoke__3.call(this, this$, a, b);
      case 4:
        return _invoke__4.call(this, this$, a, b, c);
      case 5:
        return _invoke__5.call(this, this$, a, b, c, d);
      case 6:
        return _invoke__6.call(this, this$, a, b, c, d, e);
      case 7:
        return _invoke__7.call(this, this$, a, b, c, d, e, f);
      case 8:
        return _invoke__8.call(this, this$, a, b, c, d, e, f, g);
      case 9:
        return _invoke__9.call(this, this$, a, b, c, d, e, f, g, h);
      case 10:
        return _invoke__10.call(this, this$, a, b, c, d, e, f, g, h, i);
      case 11:
        return _invoke__11.call(this, this$, a, b, c, d, e, f, g, h, i, j);
      case 12:
        return _invoke__12.call(this, this$, a, b, c, d, e, f, g, h, i, j, k);
      case 13:
        return _invoke__13.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l);
      case 14:
        return _invoke__14.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m);
      case 15:
        return _invoke__15.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n);
      case 16:
        return _invoke__16.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
      case 17:
        return _invoke__17.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
      case 18:
        return _invoke__18.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q);
      case 19:
        return _invoke__19.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s);
      case 20:
        return _invoke__20.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t);
      case 21:
        return _invoke__21.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _invoke.cljs$lang$arity$1 = _invoke__1;
  _invoke.cljs$lang$arity$2 = _invoke__2;
  _invoke.cljs$lang$arity$3 = _invoke__3;
  _invoke.cljs$lang$arity$4 = _invoke__4;
  _invoke.cljs$lang$arity$5 = _invoke__5;
  _invoke.cljs$lang$arity$6 = _invoke__6;
  _invoke.cljs$lang$arity$7 = _invoke__7;
  _invoke.cljs$lang$arity$8 = _invoke__8;
  _invoke.cljs$lang$arity$9 = _invoke__9;
  _invoke.cljs$lang$arity$10 = _invoke__10;
  _invoke.cljs$lang$arity$11 = _invoke__11;
  _invoke.cljs$lang$arity$12 = _invoke__12;
  _invoke.cljs$lang$arity$13 = _invoke__13;
  _invoke.cljs$lang$arity$14 = _invoke__14;
  _invoke.cljs$lang$arity$15 = _invoke__15;
  _invoke.cljs$lang$arity$16 = _invoke__16;
  _invoke.cljs$lang$arity$17 = _invoke__17;
  _invoke.cljs$lang$arity$18 = _invoke__18;
  _invoke.cljs$lang$arity$19 = _invoke__19;
  _invoke.cljs$lang$arity$20 = _invoke__20;
  _invoke.cljs$lang$arity$21 = _invoke__21;
  return _invoke
}();
cljs.core.ICounted = {};
cljs.core._count = function _count(coll) {
  if(function() {
    var and__3822__auto____7539 = coll;
    if(and__3822__auto____7539) {
      return coll.cljs$core$ICounted$_count$arity$1
    }else {
      return and__3822__auto____7539
    }
  }()) {
    return coll.cljs$core$ICounted$_count$arity$1(coll)
  }else {
    var x__2363__auto____7540 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7541 = cljs.core._count[goog.typeOf(x__2363__auto____7540)];
      if(or__3824__auto____7541) {
        return or__3824__auto____7541
      }else {
        var or__3824__auto____7542 = cljs.core._count["_"];
        if(or__3824__auto____7542) {
          return or__3824__auto____7542
        }else {
          throw cljs.core.missing_protocol.call(null, "ICounted.-count", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function _empty(coll) {
  if(function() {
    var and__3822__auto____7547 = coll;
    if(and__3822__auto____7547) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1
    }else {
      return and__3822__auto____7547
    }
  }()) {
    return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
  }else {
    var x__2363__auto____7548 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7549 = cljs.core._empty[goog.typeOf(x__2363__auto____7548)];
      if(or__3824__auto____7549) {
        return or__3824__auto____7549
      }else {
        var or__3824__auto____7550 = cljs.core._empty["_"];
        if(or__3824__auto____7550) {
          return or__3824__auto____7550
        }else {
          throw cljs.core.missing_protocol.call(null, "IEmptyableCollection.-empty", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ICollection = {};
cljs.core._conj = function _conj(coll, o) {
  if(function() {
    var and__3822__auto____7555 = coll;
    if(and__3822__auto____7555) {
      return coll.cljs$core$ICollection$_conj$arity$2
    }else {
      return and__3822__auto____7555
    }
  }()) {
    return coll.cljs$core$ICollection$_conj$arity$2(coll, o)
  }else {
    var x__2363__auto____7556 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7557 = cljs.core._conj[goog.typeOf(x__2363__auto____7556)];
      if(or__3824__auto____7557) {
        return or__3824__auto____7557
      }else {
        var or__3824__auto____7558 = cljs.core._conj["_"];
        if(or__3824__auto____7558) {
          return or__3824__auto____7558
        }else {
          throw cljs.core.missing_protocol.call(null, "ICollection.-conj", coll);
        }
      }
    }().call(null, coll, o)
  }
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var _nth = null;
  var _nth__2 = function(coll, n) {
    if(function() {
      var and__3822__auto____7567 = coll;
      if(and__3822__auto____7567) {
        return coll.cljs$core$IIndexed$_nth$arity$2
      }else {
        return and__3822__auto____7567
      }
    }()) {
      return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
    }else {
      var x__2363__auto____7568 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____7569 = cljs.core._nth[goog.typeOf(x__2363__auto____7568)];
        if(or__3824__auto____7569) {
          return or__3824__auto____7569
        }else {
          var or__3824__auto____7570 = cljs.core._nth["_"];
          if(or__3824__auto____7570) {
            return or__3824__auto____7570
          }else {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", coll);
          }
        }
      }().call(null, coll, n)
    }
  };
  var _nth__3 = function(coll, n, not_found) {
    if(function() {
      var and__3822__auto____7571 = coll;
      if(and__3822__auto____7571) {
        return coll.cljs$core$IIndexed$_nth$arity$3
      }else {
        return and__3822__auto____7571
      }
    }()) {
      return coll.cljs$core$IIndexed$_nth$arity$3(coll, n, not_found)
    }else {
      var x__2363__auto____7572 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____7573 = cljs.core._nth[goog.typeOf(x__2363__auto____7572)];
        if(or__3824__auto____7573) {
          return or__3824__auto____7573
        }else {
          var or__3824__auto____7574 = cljs.core._nth["_"];
          if(or__3824__auto____7574) {
            return or__3824__auto____7574
          }else {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", coll);
          }
        }
      }().call(null, coll, n, not_found)
    }
  };
  _nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return _nth__2.call(this, coll, n);
      case 3:
        return _nth__3.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _nth.cljs$lang$arity$2 = _nth__2;
  _nth.cljs$lang$arity$3 = _nth__3;
  return _nth
}();
cljs.core.ASeq = {};
cljs.core.ISeq = {};
cljs.core._first = function _first(coll) {
  if(function() {
    var and__3822__auto____7579 = coll;
    if(and__3822__auto____7579) {
      return coll.cljs$core$ISeq$_first$arity$1
    }else {
      return and__3822__auto____7579
    }
  }()) {
    return coll.cljs$core$ISeq$_first$arity$1(coll)
  }else {
    var x__2363__auto____7580 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7581 = cljs.core._first[goog.typeOf(x__2363__auto____7580)];
      if(or__3824__auto____7581) {
        return or__3824__auto____7581
      }else {
        var or__3824__auto____7582 = cljs.core._first["_"];
        if(or__3824__auto____7582) {
          return or__3824__auto____7582
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeq.-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._rest = function _rest(coll) {
  if(function() {
    var and__3822__auto____7587 = coll;
    if(and__3822__auto____7587) {
      return coll.cljs$core$ISeq$_rest$arity$1
    }else {
      return and__3822__auto____7587
    }
  }()) {
    return coll.cljs$core$ISeq$_rest$arity$1(coll)
  }else {
    var x__2363__auto____7588 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7589 = cljs.core._rest[goog.typeOf(x__2363__auto____7588)];
      if(or__3824__auto____7589) {
        return or__3824__auto____7589
      }else {
        var or__3824__auto____7590 = cljs.core._rest["_"];
        if(or__3824__auto____7590) {
          return or__3824__auto____7590
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeq.-rest", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.INext = {};
cljs.core._next = function _next(coll) {
  if(function() {
    var and__3822__auto____7595 = coll;
    if(and__3822__auto____7595) {
      return coll.cljs$core$INext$_next$arity$1
    }else {
      return and__3822__auto____7595
    }
  }()) {
    return coll.cljs$core$INext$_next$arity$1(coll)
  }else {
    var x__2363__auto____7596 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7597 = cljs.core._next[goog.typeOf(x__2363__auto____7596)];
      if(or__3824__auto____7597) {
        return or__3824__auto____7597
      }else {
        var or__3824__auto____7598 = cljs.core._next["_"];
        if(or__3824__auto____7598) {
          return or__3824__auto____7598
        }else {
          throw cljs.core.missing_protocol.call(null, "INext.-next", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var _lookup = null;
  var _lookup__2 = function(o, k) {
    if(function() {
      var and__3822__auto____7607 = o;
      if(and__3822__auto____7607) {
        return o.cljs$core$ILookup$_lookup$arity$2
      }else {
        return and__3822__auto____7607
      }
    }()) {
      return o.cljs$core$ILookup$_lookup$arity$2(o, k)
    }else {
      var x__2363__auto____7608 = o == null ? null : o;
      return function() {
        var or__3824__auto____7609 = cljs.core._lookup[goog.typeOf(x__2363__auto____7608)];
        if(or__3824__auto____7609) {
          return or__3824__auto____7609
        }else {
          var or__3824__auto____7610 = cljs.core._lookup["_"];
          if(or__3824__auto____7610) {
            return or__3824__auto____7610
          }else {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", o);
          }
        }
      }().call(null, o, k)
    }
  };
  var _lookup__3 = function(o, k, not_found) {
    if(function() {
      var and__3822__auto____7611 = o;
      if(and__3822__auto____7611) {
        return o.cljs$core$ILookup$_lookup$arity$3
      }else {
        return and__3822__auto____7611
      }
    }()) {
      return o.cljs$core$ILookup$_lookup$arity$3(o, k, not_found)
    }else {
      var x__2363__auto____7612 = o == null ? null : o;
      return function() {
        var or__3824__auto____7613 = cljs.core._lookup[goog.typeOf(x__2363__auto____7612)];
        if(or__3824__auto____7613) {
          return or__3824__auto____7613
        }else {
          var or__3824__auto____7614 = cljs.core._lookup["_"];
          if(or__3824__auto____7614) {
            return or__3824__auto____7614
          }else {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", o);
          }
        }
      }().call(null, o, k, not_found)
    }
  };
  _lookup = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return _lookup__2.call(this, o, k);
      case 3:
        return _lookup__3.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _lookup.cljs$lang$arity$2 = _lookup__2;
  _lookup.cljs$lang$arity$3 = _lookup__3;
  return _lookup
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function _contains_key_QMARK_(coll, k) {
  if(function() {
    var and__3822__auto____7619 = coll;
    if(and__3822__auto____7619) {
      return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2
    }else {
      return and__3822__auto____7619
    }
  }()) {
    return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(coll, k)
  }else {
    var x__2363__auto____7620 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7621 = cljs.core._contains_key_QMARK_[goog.typeOf(x__2363__auto____7620)];
      if(or__3824__auto____7621) {
        return or__3824__auto____7621
      }else {
        var or__3824__auto____7622 = cljs.core._contains_key_QMARK_["_"];
        if(or__3824__auto____7622) {
          return or__3824__auto____7622
        }else {
          throw cljs.core.missing_protocol.call(null, "IAssociative.-contains-key?", coll);
        }
      }
    }().call(null, coll, k)
  }
};
cljs.core._assoc = function _assoc(coll, k, v) {
  if(function() {
    var and__3822__auto____7627 = coll;
    if(and__3822__auto____7627) {
      return coll.cljs$core$IAssociative$_assoc$arity$3
    }else {
      return and__3822__auto____7627
    }
  }()) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, k, v)
  }else {
    var x__2363__auto____7628 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7629 = cljs.core._assoc[goog.typeOf(x__2363__auto____7628)];
      if(or__3824__auto____7629) {
        return or__3824__auto____7629
      }else {
        var or__3824__auto____7630 = cljs.core._assoc["_"];
        if(or__3824__auto____7630) {
          return or__3824__auto____7630
        }else {
          throw cljs.core.missing_protocol.call(null, "IAssociative.-assoc", coll);
        }
      }
    }().call(null, coll, k, v)
  }
};
cljs.core.IMap = {};
cljs.core._dissoc = function _dissoc(coll, k) {
  if(function() {
    var and__3822__auto____7635 = coll;
    if(and__3822__auto____7635) {
      return coll.cljs$core$IMap$_dissoc$arity$2
    }else {
      return and__3822__auto____7635
    }
  }()) {
    return coll.cljs$core$IMap$_dissoc$arity$2(coll, k)
  }else {
    var x__2363__auto____7636 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7637 = cljs.core._dissoc[goog.typeOf(x__2363__auto____7636)];
      if(or__3824__auto____7637) {
        return or__3824__auto____7637
      }else {
        var or__3824__auto____7638 = cljs.core._dissoc["_"];
        if(or__3824__auto____7638) {
          return or__3824__auto____7638
        }else {
          throw cljs.core.missing_protocol.call(null, "IMap.-dissoc", coll);
        }
      }
    }().call(null, coll, k)
  }
};
cljs.core.IMapEntry = {};
cljs.core._key = function _key(coll) {
  if(function() {
    var and__3822__auto____7643 = coll;
    if(and__3822__auto____7643) {
      return coll.cljs$core$IMapEntry$_key$arity$1
    }else {
      return and__3822__auto____7643
    }
  }()) {
    return coll.cljs$core$IMapEntry$_key$arity$1(coll)
  }else {
    var x__2363__auto____7644 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7645 = cljs.core._key[goog.typeOf(x__2363__auto____7644)];
      if(or__3824__auto____7645) {
        return or__3824__auto____7645
      }else {
        var or__3824__auto____7646 = cljs.core._key["_"];
        if(or__3824__auto____7646) {
          return or__3824__auto____7646
        }else {
          throw cljs.core.missing_protocol.call(null, "IMapEntry.-key", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._val = function _val(coll) {
  if(function() {
    var and__3822__auto____7651 = coll;
    if(and__3822__auto____7651) {
      return coll.cljs$core$IMapEntry$_val$arity$1
    }else {
      return and__3822__auto____7651
    }
  }()) {
    return coll.cljs$core$IMapEntry$_val$arity$1(coll)
  }else {
    var x__2363__auto____7652 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7653 = cljs.core._val[goog.typeOf(x__2363__auto____7652)];
      if(or__3824__auto____7653) {
        return or__3824__auto____7653
      }else {
        var or__3824__auto____7654 = cljs.core._val["_"];
        if(or__3824__auto____7654) {
          return or__3824__auto____7654
        }else {
          throw cljs.core.missing_protocol.call(null, "IMapEntry.-val", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ISet = {};
cljs.core._disjoin = function _disjoin(coll, v) {
  if(function() {
    var and__3822__auto____7659 = coll;
    if(and__3822__auto____7659) {
      return coll.cljs$core$ISet$_disjoin$arity$2
    }else {
      return and__3822__auto____7659
    }
  }()) {
    return coll.cljs$core$ISet$_disjoin$arity$2(coll, v)
  }else {
    var x__2363__auto____7660 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7661 = cljs.core._disjoin[goog.typeOf(x__2363__auto____7660)];
      if(or__3824__auto____7661) {
        return or__3824__auto____7661
      }else {
        var or__3824__auto____7662 = cljs.core._disjoin["_"];
        if(or__3824__auto____7662) {
          return or__3824__auto____7662
        }else {
          throw cljs.core.missing_protocol.call(null, "ISet.-disjoin", coll);
        }
      }
    }().call(null, coll, v)
  }
};
cljs.core.IStack = {};
cljs.core._peek = function _peek(coll) {
  if(function() {
    var and__3822__auto____7667 = coll;
    if(and__3822__auto____7667) {
      return coll.cljs$core$IStack$_peek$arity$1
    }else {
      return and__3822__auto____7667
    }
  }()) {
    return coll.cljs$core$IStack$_peek$arity$1(coll)
  }else {
    var x__2363__auto____7668 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7669 = cljs.core._peek[goog.typeOf(x__2363__auto____7668)];
      if(or__3824__auto____7669) {
        return or__3824__auto____7669
      }else {
        var or__3824__auto____7670 = cljs.core._peek["_"];
        if(or__3824__auto____7670) {
          return or__3824__auto____7670
        }else {
          throw cljs.core.missing_protocol.call(null, "IStack.-peek", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._pop = function _pop(coll) {
  if(function() {
    var and__3822__auto____7675 = coll;
    if(and__3822__auto____7675) {
      return coll.cljs$core$IStack$_pop$arity$1
    }else {
      return and__3822__auto____7675
    }
  }()) {
    return coll.cljs$core$IStack$_pop$arity$1(coll)
  }else {
    var x__2363__auto____7676 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7677 = cljs.core._pop[goog.typeOf(x__2363__auto____7676)];
      if(or__3824__auto____7677) {
        return or__3824__auto____7677
      }else {
        var or__3824__auto____7678 = cljs.core._pop["_"];
        if(or__3824__auto____7678) {
          return or__3824__auto____7678
        }else {
          throw cljs.core.missing_protocol.call(null, "IStack.-pop", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IVector = {};
cljs.core._assoc_n = function _assoc_n(coll, n, val) {
  if(function() {
    var and__3822__auto____7683 = coll;
    if(and__3822__auto____7683) {
      return coll.cljs$core$IVector$_assoc_n$arity$3
    }else {
      return and__3822__auto____7683
    }
  }()) {
    return coll.cljs$core$IVector$_assoc_n$arity$3(coll, n, val)
  }else {
    var x__2363__auto____7684 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7685 = cljs.core._assoc_n[goog.typeOf(x__2363__auto____7684)];
      if(or__3824__auto____7685) {
        return or__3824__auto____7685
      }else {
        var or__3824__auto____7686 = cljs.core._assoc_n["_"];
        if(or__3824__auto____7686) {
          return or__3824__auto____7686
        }else {
          throw cljs.core.missing_protocol.call(null, "IVector.-assoc-n", coll);
        }
      }
    }().call(null, coll, n, val)
  }
};
cljs.core.IDeref = {};
cljs.core._deref = function _deref(o) {
  if(function() {
    var and__3822__auto____7691 = o;
    if(and__3822__auto____7691) {
      return o.cljs$core$IDeref$_deref$arity$1
    }else {
      return and__3822__auto____7691
    }
  }()) {
    return o.cljs$core$IDeref$_deref$arity$1(o)
  }else {
    var x__2363__auto____7692 = o == null ? null : o;
    return function() {
      var or__3824__auto____7693 = cljs.core._deref[goog.typeOf(x__2363__auto____7692)];
      if(or__3824__auto____7693) {
        return or__3824__auto____7693
      }else {
        var or__3824__auto____7694 = cljs.core._deref["_"];
        if(or__3824__auto____7694) {
          return or__3824__auto____7694
        }else {
          throw cljs.core.missing_protocol.call(null, "IDeref.-deref", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function _deref_with_timeout(o, msec, timeout_val) {
  if(function() {
    var and__3822__auto____7699 = o;
    if(and__3822__auto____7699) {
      return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3
    }else {
      return and__3822__auto____7699
    }
  }()) {
    return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(o, msec, timeout_val)
  }else {
    var x__2363__auto____7700 = o == null ? null : o;
    return function() {
      var or__3824__auto____7701 = cljs.core._deref_with_timeout[goog.typeOf(x__2363__auto____7700)];
      if(or__3824__auto____7701) {
        return or__3824__auto____7701
      }else {
        var or__3824__auto____7702 = cljs.core._deref_with_timeout["_"];
        if(or__3824__auto____7702) {
          return or__3824__auto____7702
        }else {
          throw cljs.core.missing_protocol.call(null, "IDerefWithTimeout.-deref-with-timeout", o);
        }
      }
    }().call(null, o, msec, timeout_val)
  }
};
cljs.core.IMeta = {};
cljs.core._meta = function _meta(o) {
  if(function() {
    var and__3822__auto____7707 = o;
    if(and__3822__auto____7707) {
      return o.cljs$core$IMeta$_meta$arity$1
    }else {
      return and__3822__auto____7707
    }
  }()) {
    return o.cljs$core$IMeta$_meta$arity$1(o)
  }else {
    var x__2363__auto____7708 = o == null ? null : o;
    return function() {
      var or__3824__auto____7709 = cljs.core._meta[goog.typeOf(x__2363__auto____7708)];
      if(or__3824__auto____7709) {
        return or__3824__auto____7709
      }else {
        var or__3824__auto____7710 = cljs.core._meta["_"];
        if(or__3824__auto____7710) {
          return or__3824__auto____7710
        }else {
          throw cljs.core.missing_protocol.call(null, "IMeta.-meta", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function _with_meta(o, meta) {
  if(function() {
    var and__3822__auto____7715 = o;
    if(and__3822__auto____7715) {
      return o.cljs$core$IWithMeta$_with_meta$arity$2
    }else {
      return and__3822__auto____7715
    }
  }()) {
    return o.cljs$core$IWithMeta$_with_meta$arity$2(o, meta)
  }else {
    var x__2363__auto____7716 = o == null ? null : o;
    return function() {
      var or__3824__auto____7717 = cljs.core._with_meta[goog.typeOf(x__2363__auto____7716)];
      if(or__3824__auto____7717) {
        return or__3824__auto____7717
      }else {
        var or__3824__auto____7718 = cljs.core._with_meta["_"];
        if(or__3824__auto____7718) {
          return or__3824__auto____7718
        }else {
          throw cljs.core.missing_protocol.call(null, "IWithMeta.-with-meta", o);
        }
      }
    }().call(null, o, meta)
  }
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var _reduce = null;
  var _reduce__2 = function(coll, f) {
    if(function() {
      var and__3822__auto____7727 = coll;
      if(and__3822__auto____7727) {
        return coll.cljs$core$IReduce$_reduce$arity$2
      }else {
        return and__3822__auto____7727
      }
    }()) {
      return coll.cljs$core$IReduce$_reduce$arity$2(coll, f)
    }else {
      var x__2363__auto____7728 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____7729 = cljs.core._reduce[goog.typeOf(x__2363__auto____7728)];
        if(or__3824__auto____7729) {
          return or__3824__auto____7729
        }else {
          var or__3824__auto____7730 = cljs.core._reduce["_"];
          if(or__3824__auto____7730) {
            return or__3824__auto____7730
          }else {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", coll);
          }
        }
      }().call(null, coll, f)
    }
  };
  var _reduce__3 = function(coll, f, start) {
    if(function() {
      var and__3822__auto____7731 = coll;
      if(and__3822__auto____7731) {
        return coll.cljs$core$IReduce$_reduce$arity$3
      }else {
        return and__3822__auto____7731
      }
    }()) {
      return coll.cljs$core$IReduce$_reduce$arity$3(coll, f, start)
    }else {
      var x__2363__auto____7732 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____7733 = cljs.core._reduce[goog.typeOf(x__2363__auto____7732)];
        if(or__3824__auto____7733) {
          return or__3824__auto____7733
        }else {
          var or__3824__auto____7734 = cljs.core._reduce["_"];
          if(or__3824__auto____7734) {
            return or__3824__auto____7734
          }else {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", coll);
          }
        }
      }().call(null, coll, f, start)
    }
  };
  _reduce = function(coll, f, start) {
    switch(arguments.length) {
      case 2:
        return _reduce__2.call(this, coll, f);
      case 3:
        return _reduce__3.call(this, coll, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _reduce.cljs$lang$arity$2 = _reduce__2;
  _reduce.cljs$lang$arity$3 = _reduce__3;
  return _reduce
}();
cljs.core.IKVReduce = {};
cljs.core._kv_reduce = function _kv_reduce(coll, f, init) {
  if(function() {
    var and__3822__auto____7739 = coll;
    if(and__3822__auto____7739) {
      return coll.cljs$core$IKVReduce$_kv_reduce$arity$3
    }else {
      return and__3822__auto____7739
    }
  }()) {
    return coll.cljs$core$IKVReduce$_kv_reduce$arity$3(coll, f, init)
  }else {
    var x__2363__auto____7740 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7741 = cljs.core._kv_reduce[goog.typeOf(x__2363__auto____7740)];
      if(or__3824__auto____7741) {
        return or__3824__auto____7741
      }else {
        var or__3824__auto____7742 = cljs.core._kv_reduce["_"];
        if(or__3824__auto____7742) {
          return or__3824__auto____7742
        }else {
          throw cljs.core.missing_protocol.call(null, "IKVReduce.-kv-reduce", coll);
        }
      }
    }().call(null, coll, f, init)
  }
};
cljs.core.IEquiv = {};
cljs.core._equiv = function _equiv(o, other) {
  if(function() {
    var and__3822__auto____7747 = o;
    if(and__3822__auto____7747) {
      return o.cljs$core$IEquiv$_equiv$arity$2
    }else {
      return and__3822__auto____7747
    }
  }()) {
    return o.cljs$core$IEquiv$_equiv$arity$2(o, other)
  }else {
    var x__2363__auto____7748 = o == null ? null : o;
    return function() {
      var or__3824__auto____7749 = cljs.core._equiv[goog.typeOf(x__2363__auto____7748)];
      if(or__3824__auto____7749) {
        return or__3824__auto____7749
      }else {
        var or__3824__auto____7750 = cljs.core._equiv["_"];
        if(or__3824__auto____7750) {
          return or__3824__auto____7750
        }else {
          throw cljs.core.missing_protocol.call(null, "IEquiv.-equiv", o);
        }
      }
    }().call(null, o, other)
  }
};
cljs.core.IHash = {};
cljs.core._hash = function _hash(o) {
  if(function() {
    var and__3822__auto____7755 = o;
    if(and__3822__auto____7755) {
      return o.cljs$core$IHash$_hash$arity$1
    }else {
      return and__3822__auto____7755
    }
  }()) {
    return o.cljs$core$IHash$_hash$arity$1(o)
  }else {
    var x__2363__auto____7756 = o == null ? null : o;
    return function() {
      var or__3824__auto____7757 = cljs.core._hash[goog.typeOf(x__2363__auto____7756)];
      if(or__3824__auto____7757) {
        return or__3824__auto____7757
      }else {
        var or__3824__auto____7758 = cljs.core._hash["_"];
        if(or__3824__auto____7758) {
          return or__3824__auto____7758
        }else {
          throw cljs.core.missing_protocol.call(null, "IHash.-hash", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.ISeqable = {};
cljs.core._seq = function _seq(o) {
  if(function() {
    var and__3822__auto____7763 = o;
    if(and__3822__auto____7763) {
      return o.cljs$core$ISeqable$_seq$arity$1
    }else {
      return and__3822__auto____7763
    }
  }()) {
    return o.cljs$core$ISeqable$_seq$arity$1(o)
  }else {
    var x__2363__auto____7764 = o == null ? null : o;
    return function() {
      var or__3824__auto____7765 = cljs.core._seq[goog.typeOf(x__2363__auto____7764)];
      if(or__3824__auto____7765) {
        return or__3824__auto____7765
      }else {
        var or__3824__auto____7766 = cljs.core._seq["_"];
        if(or__3824__auto____7766) {
          return or__3824__auto____7766
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeqable.-seq", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.ISequential = {};
cljs.core.IList = {};
cljs.core.IRecord = {};
cljs.core.IReversible = {};
cljs.core._rseq = function _rseq(coll) {
  if(function() {
    var and__3822__auto____7771 = coll;
    if(and__3822__auto____7771) {
      return coll.cljs$core$IReversible$_rseq$arity$1
    }else {
      return and__3822__auto____7771
    }
  }()) {
    return coll.cljs$core$IReversible$_rseq$arity$1(coll)
  }else {
    var x__2363__auto____7772 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7773 = cljs.core._rseq[goog.typeOf(x__2363__auto____7772)];
      if(or__3824__auto____7773) {
        return or__3824__auto____7773
      }else {
        var or__3824__auto____7774 = cljs.core._rseq["_"];
        if(or__3824__auto____7774) {
          return or__3824__auto____7774
        }else {
          throw cljs.core.missing_protocol.call(null, "IReversible.-rseq", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ISorted = {};
cljs.core._sorted_seq = function _sorted_seq(coll, ascending_QMARK_) {
  if(function() {
    var and__3822__auto____7779 = coll;
    if(and__3822__auto____7779) {
      return coll.cljs$core$ISorted$_sorted_seq$arity$2
    }else {
      return and__3822__auto____7779
    }
  }()) {
    return coll.cljs$core$ISorted$_sorted_seq$arity$2(coll, ascending_QMARK_)
  }else {
    var x__2363__auto____7780 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7781 = cljs.core._sorted_seq[goog.typeOf(x__2363__auto____7780)];
      if(or__3824__auto____7781) {
        return or__3824__auto____7781
      }else {
        var or__3824__auto____7782 = cljs.core._sorted_seq["_"];
        if(or__3824__auto____7782) {
          return or__3824__auto____7782
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq", coll);
        }
      }
    }().call(null, coll, ascending_QMARK_)
  }
};
cljs.core._sorted_seq_from = function _sorted_seq_from(coll, k, ascending_QMARK_) {
  if(function() {
    var and__3822__auto____7787 = coll;
    if(and__3822__auto____7787) {
      return coll.cljs$core$ISorted$_sorted_seq_from$arity$3
    }else {
      return and__3822__auto____7787
    }
  }()) {
    return coll.cljs$core$ISorted$_sorted_seq_from$arity$3(coll, k, ascending_QMARK_)
  }else {
    var x__2363__auto____7788 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7789 = cljs.core._sorted_seq_from[goog.typeOf(x__2363__auto____7788)];
      if(or__3824__auto____7789) {
        return or__3824__auto____7789
      }else {
        var or__3824__auto____7790 = cljs.core._sorted_seq_from["_"];
        if(or__3824__auto____7790) {
          return or__3824__auto____7790
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq-from", coll);
        }
      }
    }().call(null, coll, k, ascending_QMARK_)
  }
};
cljs.core._entry_key = function _entry_key(coll, entry) {
  if(function() {
    var and__3822__auto____7795 = coll;
    if(and__3822__auto____7795) {
      return coll.cljs$core$ISorted$_entry_key$arity$2
    }else {
      return and__3822__auto____7795
    }
  }()) {
    return coll.cljs$core$ISorted$_entry_key$arity$2(coll, entry)
  }else {
    var x__2363__auto____7796 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7797 = cljs.core._entry_key[goog.typeOf(x__2363__auto____7796)];
      if(or__3824__auto____7797) {
        return or__3824__auto____7797
      }else {
        var or__3824__auto____7798 = cljs.core._entry_key["_"];
        if(or__3824__auto____7798) {
          return or__3824__auto____7798
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-entry-key", coll);
        }
      }
    }().call(null, coll, entry)
  }
};
cljs.core._comparator = function _comparator(coll) {
  if(function() {
    var and__3822__auto____7803 = coll;
    if(and__3822__auto____7803) {
      return coll.cljs$core$ISorted$_comparator$arity$1
    }else {
      return and__3822__auto____7803
    }
  }()) {
    return coll.cljs$core$ISorted$_comparator$arity$1(coll)
  }else {
    var x__2363__auto____7804 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7805 = cljs.core._comparator[goog.typeOf(x__2363__auto____7804)];
      if(or__3824__auto____7805) {
        return or__3824__auto____7805
      }else {
        var or__3824__auto____7806 = cljs.core._comparator["_"];
        if(or__3824__auto____7806) {
          return or__3824__auto____7806
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-comparator", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IPrintable = {};
cljs.core._pr_seq = function _pr_seq(o, opts) {
  if(function() {
    var and__3822__auto____7811 = o;
    if(and__3822__auto____7811) {
      return o.cljs$core$IPrintable$_pr_seq$arity$2
    }else {
      return and__3822__auto____7811
    }
  }()) {
    return o.cljs$core$IPrintable$_pr_seq$arity$2(o, opts)
  }else {
    var x__2363__auto____7812 = o == null ? null : o;
    return function() {
      var or__3824__auto____7813 = cljs.core._pr_seq[goog.typeOf(x__2363__auto____7812)];
      if(or__3824__auto____7813) {
        return or__3824__auto____7813
      }else {
        var or__3824__auto____7814 = cljs.core._pr_seq["_"];
        if(or__3824__auto____7814) {
          return or__3824__auto____7814
        }else {
          throw cljs.core.missing_protocol.call(null, "IPrintable.-pr-seq", o);
        }
      }
    }().call(null, o, opts)
  }
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function _realized_QMARK_(d) {
  if(function() {
    var and__3822__auto____7819 = d;
    if(and__3822__auto____7819) {
      return d.cljs$core$IPending$_realized_QMARK_$arity$1
    }else {
      return and__3822__auto____7819
    }
  }()) {
    return d.cljs$core$IPending$_realized_QMARK_$arity$1(d)
  }else {
    var x__2363__auto____7820 = d == null ? null : d;
    return function() {
      var or__3824__auto____7821 = cljs.core._realized_QMARK_[goog.typeOf(x__2363__auto____7820)];
      if(or__3824__auto____7821) {
        return or__3824__auto____7821
      }else {
        var or__3824__auto____7822 = cljs.core._realized_QMARK_["_"];
        if(or__3824__auto____7822) {
          return or__3824__auto____7822
        }else {
          throw cljs.core.missing_protocol.call(null, "IPending.-realized?", d);
        }
      }
    }().call(null, d)
  }
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function _notify_watches(this$, oldval, newval) {
  if(function() {
    var and__3822__auto____7827 = this$;
    if(and__3822__auto____7827) {
      return this$.cljs$core$IWatchable$_notify_watches$arity$3
    }else {
      return and__3822__auto____7827
    }
  }()) {
    return this$.cljs$core$IWatchable$_notify_watches$arity$3(this$, oldval, newval)
  }else {
    var x__2363__auto____7828 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____7829 = cljs.core._notify_watches[goog.typeOf(x__2363__auto____7828)];
      if(or__3824__auto____7829) {
        return or__3824__auto____7829
      }else {
        var or__3824__auto____7830 = cljs.core._notify_watches["_"];
        if(or__3824__auto____7830) {
          return or__3824__auto____7830
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-notify-watches", this$);
        }
      }
    }().call(null, this$, oldval, newval)
  }
};
cljs.core._add_watch = function _add_watch(this$, key, f) {
  if(function() {
    var and__3822__auto____7835 = this$;
    if(and__3822__auto____7835) {
      return this$.cljs$core$IWatchable$_add_watch$arity$3
    }else {
      return and__3822__auto____7835
    }
  }()) {
    return this$.cljs$core$IWatchable$_add_watch$arity$3(this$, key, f)
  }else {
    var x__2363__auto____7836 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____7837 = cljs.core._add_watch[goog.typeOf(x__2363__auto____7836)];
      if(or__3824__auto____7837) {
        return or__3824__auto____7837
      }else {
        var or__3824__auto____7838 = cljs.core._add_watch["_"];
        if(or__3824__auto____7838) {
          return or__3824__auto____7838
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-add-watch", this$);
        }
      }
    }().call(null, this$, key, f)
  }
};
cljs.core._remove_watch = function _remove_watch(this$, key) {
  if(function() {
    var and__3822__auto____7843 = this$;
    if(and__3822__auto____7843) {
      return this$.cljs$core$IWatchable$_remove_watch$arity$2
    }else {
      return and__3822__auto____7843
    }
  }()) {
    return this$.cljs$core$IWatchable$_remove_watch$arity$2(this$, key)
  }else {
    var x__2363__auto____7844 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____7845 = cljs.core._remove_watch[goog.typeOf(x__2363__auto____7844)];
      if(or__3824__auto____7845) {
        return or__3824__auto____7845
      }else {
        var or__3824__auto____7846 = cljs.core._remove_watch["_"];
        if(or__3824__auto____7846) {
          return or__3824__auto____7846
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-remove-watch", this$);
        }
      }
    }().call(null, this$, key)
  }
};
cljs.core.IEditableCollection = {};
cljs.core._as_transient = function _as_transient(coll) {
  if(function() {
    var and__3822__auto____7851 = coll;
    if(and__3822__auto____7851) {
      return coll.cljs$core$IEditableCollection$_as_transient$arity$1
    }else {
      return and__3822__auto____7851
    }
  }()) {
    return coll.cljs$core$IEditableCollection$_as_transient$arity$1(coll)
  }else {
    var x__2363__auto____7852 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7853 = cljs.core._as_transient[goog.typeOf(x__2363__auto____7852)];
      if(or__3824__auto____7853) {
        return or__3824__auto____7853
      }else {
        var or__3824__auto____7854 = cljs.core._as_transient["_"];
        if(or__3824__auto____7854) {
          return or__3824__auto____7854
        }else {
          throw cljs.core.missing_protocol.call(null, "IEditableCollection.-as-transient", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ITransientCollection = {};
cljs.core._conj_BANG_ = function _conj_BANG_(tcoll, val) {
  if(function() {
    var and__3822__auto____7859 = tcoll;
    if(and__3822__auto____7859) {
      return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2
    }else {
      return and__3822__auto____7859
    }
  }()) {
    return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll, val)
  }else {
    var x__2363__auto____7860 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____7861 = cljs.core._conj_BANG_[goog.typeOf(x__2363__auto____7860)];
      if(or__3824__auto____7861) {
        return or__3824__auto____7861
      }else {
        var or__3824__auto____7862 = cljs.core._conj_BANG_["_"];
        if(or__3824__auto____7862) {
          return or__3824__auto____7862
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientCollection.-conj!", tcoll);
        }
      }
    }().call(null, tcoll, val)
  }
};
cljs.core._persistent_BANG_ = function _persistent_BANG_(tcoll) {
  if(function() {
    var and__3822__auto____7867 = tcoll;
    if(and__3822__auto____7867) {
      return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1
    }else {
      return and__3822__auto____7867
    }
  }()) {
    return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(tcoll)
  }else {
    var x__2363__auto____7868 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____7869 = cljs.core._persistent_BANG_[goog.typeOf(x__2363__auto____7868)];
      if(or__3824__auto____7869) {
        return or__3824__auto____7869
      }else {
        var or__3824__auto____7870 = cljs.core._persistent_BANG_["_"];
        if(or__3824__auto____7870) {
          return or__3824__auto____7870
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientCollection.-persistent!", tcoll);
        }
      }
    }().call(null, tcoll)
  }
};
cljs.core.ITransientAssociative = {};
cljs.core._assoc_BANG_ = function _assoc_BANG_(tcoll, key, val) {
  if(function() {
    var and__3822__auto____7875 = tcoll;
    if(and__3822__auto____7875) {
      return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3
    }else {
      return and__3822__auto____7875
    }
  }()) {
    return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll, key, val)
  }else {
    var x__2363__auto____7876 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____7877 = cljs.core._assoc_BANG_[goog.typeOf(x__2363__auto____7876)];
      if(or__3824__auto____7877) {
        return or__3824__auto____7877
      }else {
        var or__3824__auto____7878 = cljs.core._assoc_BANG_["_"];
        if(or__3824__auto____7878) {
          return or__3824__auto____7878
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientAssociative.-assoc!", tcoll);
        }
      }
    }().call(null, tcoll, key, val)
  }
};
cljs.core.ITransientMap = {};
cljs.core._dissoc_BANG_ = function _dissoc_BANG_(tcoll, key) {
  if(function() {
    var and__3822__auto____7883 = tcoll;
    if(and__3822__auto____7883) {
      return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2
    }else {
      return and__3822__auto____7883
    }
  }()) {
    return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(tcoll, key)
  }else {
    var x__2363__auto____7884 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____7885 = cljs.core._dissoc_BANG_[goog.typeOf(x__2363__auto____7884)];
      if(or__3824__auto____7885) {
        return or__3824__auto____7885
      }else {
        var or__3824__auto____7886 = cljs.core._dissoc_BANG_["_"];
        if(or__3824__auto____7886) {
          return or__3824__auto____7886
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientMap.-dissoc!", tcoll);
        }
      }
    }().call(null, tcoll, key)
  }
};
cljs.core.ITransientVector = {};
cljs.core._assoc_n_BANG_ = function _assoc_n_BANG_(tcoll, n, val) {
  if(function() {
    var and__3822__auto____7891 = tcoll;
    if(and__3822__auto____7891) {
      return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3
    }else {
      return and__3822__auto____7891
    }
  }()) {
    return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll, n, val)
  }else {
    var x__2363__auto____7892 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____7893 = cljs.core._assoc_n_BANG_[goog.typeOf(x__2363__auto____7892)];
      if(or__3824__auto____7893) {
        return or__3824__auto____7893
      }else {
        var or__3824__auto____7894 = cljs.core._assoc_n_BANG_["_"];
        if(or__3824__auto____7894) {
          return or__3824__auto____7894
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientVector.-assoc-n!", tcoll);
        }
      }
    }().call(null, tcoll, n, val)
  }
};
cljs.core._pop_BANG_ = function _pop_BANG_(tcoll) {
  if(function() {
    var and__3822__auto____7899 = tcoll;
    if(and__3822__auto____7899) {
      return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1
    }else {
      return and__3822__auto____7899
    }
  }()) {
    return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1(tcoll)
  }else {
    var x__2363__auto____7900 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____7901 = cljs.core._pop_BANG_[goog.typeOf(x__2363__auto____7900)];
      if(or__3824__auto____7901) {
        return or__3824__auto____7901
      }else {
        var or__3824__auto____7902 = cljs.core._pop_BANG_["_"];
        if(or__3824__auto____7902) {
          return or__3824__auto____7902
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientVector.-pop!", tcoll);
        }
      }
    }().call(null, tcoll)
  }
};
cljs.core.ITransientSet = {};
cljs.core._disjoin_BANG_ = function _disjoin_BANG_(tcoll, v) {
  if(function() {
    var and__3822__auto____7907 = tcoll;
    if(and__3822__auto____7907) {
      return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2
    }else {
      return and__3822__auto____7907
    }
  }()) {
    return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(tcoll, v)
  }else {
    var x__2363__auto____7908 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____7909 = cljs.core._disjoin_BANG_[goog.typeOf(x__2363__auto____7908)];
      if(or__3824__auto____7909) {
        return or__3824__auto____7909
      }else {
        var or__3824__auto____7910 = cljs.core._disjoin_BANG_["_"];
        if(or__3824__auto____7910) {
          return or__3824__auto____7910
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientSet.-disjoin!", tcoll);
        }
      }
    }().call(null, tcoll, v)
  }
};
cljs.core.IComparable = {};
cljs.core._compare = function _compare(x, y) {
  if(function() {
    var and__3822__auto____7915 = x;
    if(and__3822__auto____7915) {
      return x.cljs$core$IComparable$_compare$arity$2
    }else {
      return and__3822__auto____7915
    }
  }()) {
    return x.cljs$core$IComparable$_compare$arity$2(x, y)
  }else {
    var x__2363__auto____7916 = x == null ? null : x;
    return function() {
      var or__3824__auto____7917 = cljs.core._compare[goog.typeOf(x__2363__auto____7916)];
      if(or__3824__auto____7917) {
        return or__3824__auto____7917
      }else {
        var or__3824__auto____7918 = cljs.core._compare["_"];
        if(or__3824__auto____7918) {
          return or__3824__auto____7918
        }else {
          throw cljs.core.missing_protocol.call(null, "IComparable.-compare", x);
        }
      }
    }().call(null, x, y)
  }
};
cljs.core.IChunk = {};
cljs.core._drop_first = function _drop_first(coll) {
  if(function() {
    var and__3822__auto____7923 = coll;
    if(and__3822__auto____7923) {
      return coll.cljs$core$IChunk$_drop_first$arity$1
    }else {
      return and__3822__auto____7923
    }
  }()) {
    return coll.cljs$core$IChunk$_drop_first$arity$1(coll)
  }else {
    var x__2363__auto____7924 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7925 = cljs.core._drop_first[goog.typeOf(x__2363__auto____7924)];
      if(or__3824__auto____7925) {
        return or__3824__auto____7925
      }else {
        var or__3824__auto____7926 = cljs.core._drop_first["_"];
        if(or__3824__auto____7926) {
          return or__3824__auto____7926
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunk.-drop-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IChunkedSeq = {};
cljs.core._chunked_first = function _chunked_first(coll) {
  if(function() {
    var and__3822__auto____7931 = coll;
    if(and__3822__auto____7931) {
      return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1
    }else {
      return and__3822__auto____7931
    }
  }()) {
    return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1(coll)
  }else {
    var x__2363__auto____7932 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7933 = cljs.core._chunked_first[goog.typeOf(x__2363__auto____7932)];
      if(or__3824__auto____7933) {
        return or__3824__auto____7933
      }else {
        var or__3824__auto____7934 = cljs.core._chunked_first["_"];
        if(or__3824__auto____7934) {
          return or__3824__auto____7934
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunkedSeq.-chunked-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._chunked_rest = function _chunked_rest(coll) {
  if(function() {
    var and__3822__auto____7939 = coll;
    if(and__3822__auto____7939) {
      return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1
    }else {
      return and__3822__auto____7939
    }
  }()) {
    return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll)
  }else {
    var x__2363__auto____7940 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7941 = cljs.core._chunked_rest[goog.typeOf(x__2363__auto____7940)];
      if(or__3824__auto____7941) {
        return or__3824__auto____7941
      }else {
        var or__3824__auto____7942 = cljs.core._chunked_rest["_"];
        if(or__3824__auto____7942) {
          return or__3824__auto____7942
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunkedSeq.-chunked-rest", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IChunkedNext = {};
cljs.core._chunked_next = function _chunked_next(coll) {
  if(function() {
    var and__3822__auto____7947 = coll;
    if(and__3822__auto____7947) {
      return coll.cljs$core$IChunkedNext$_chunked_next$arity$1
    }else {
      return and__3822__auto____7947
    }
  }()) {
    return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll)
  }else {
    var x__2363__auto____7948 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____7949 = cljs.core._chunked_next[goog.typeOf(x__2363__auto____7948)];
      if(or__3824__auto____7949) {
        return or__3824__auto____7949
      }else {
        var or__3824__auto____7950 = cljs.core._chunked_next["_"];
        if(or__3824__auto____7950) {
          return or__3824__auto____7950
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunkedNext.-chunked-next", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.identical_QMARK_ = function identical_QMARK_(x, y) {
  return x === y
};
cljs.core._EQ_ = function() {
  var _EQ_ = null;
  var _EQ___1 = function(x) {
    return true
  };
  var _EQ___2 = function(x, y) {
    var or__3824__auto____7952 = x === y;
    if(or__3824__auto____7952) {
      return or__3824__auto____7952
    }else {
      return cljs.core._equiv.call(null, x, y)
    }
  };
  var _EQ___3 = function() {
    var G__7953__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_EQ_.call(null, x, y))) {
          if(cljs.core.next.call(null, more)) {
            var G__7954 = y;
            var G__7955 = cljs.core.first.call(null, more);
            var G__7956 = cljs.core.next.call(null, more);
            x = G__7954;
            y = G__7955;
            more = G__7956;
            continue
          }else {
            return _EQ_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__7953 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7953__delegate.call(this, x, y, more)
    };
    G__7953.cljs$lang$maxFixedArity = 2;
    G__7953.cljs$lang$applyTo = function(arglist__7957) {
      var x = cljs.core.first(arglist__7957);
      var y = cljs.core.first(cljs.core.next(arglist__7957));
      var more = cljs.core.rest(cljs.core.next(arglist__7957));
      return G__7953__delegate(x, y, more)
    };
    G__7953.cljs$lang$arity$variadic = G__7953__delegate;
    return G__7953
  }();
  _EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _EQ___1.call(this, x);
      case 2:
        return _EQ___2.call(this, x, y);
      default:
        return _EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _EQ_.cljs$lang$maxFixedArity = 2;
  _EQ_.cljs$lang$applyTo = _EQ___3.cljs$lang$applyTo;
  _EQ_.cljs$lang$arity$1 = _EQ___1;
  _EQ_.cljs$lang$arity$2 = _EQ___2;
  _EQ_.cljs$lang$arity$variadic = _EQ___3.cljs$lang$arity$variadic;
  return _EQ_
}();
cljs.core.nil_QMARK_ = function nil_QMARK_(x) {
  return x == null
};
cljs.core.type = function type(x) {
  if(x == null) {
    return null
  }else {
    return x.constructor
  }
};
cljs.core.instance_QMARK_ = function instance_QMARK_(t, o) {
  return o instanceof t
};
cljs.core.IHash["null"] = true;
cljs.core._hash["null"] = function(o) {
  return 0
};
cljs.core.ILookup["null"] = true;
cljs.core._lookup["null"] = function() {
  var G__7958 = null;
  var G__7958__2 = function(o, k) {
    return null
  };
  var G__7958__3 = function(o, k, not_found) {
    return not_found
  };
  G__7958 = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7958__2.call(this, o, k);
      case 3:
        return G__7958__3.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7958
}();
cljs.core.IAssociative["null"] = true;
cljs.core._assoc["null"] = function(_, k, v) {
  return cljs.core.hash_map.call(null, k, v)
};
cljs.core.INext["null"] = true;
cljs.core._next["null"] = function(_) {
  return null
};
cljs.core.ICollection["null"] = true;
cljs.core._conj["null"] = function(_, o) {
  return cljs.core.list.call(null, o)
};
cljs.core.IReduce["null"] = true;
cljs.core._reduce["null"] = function() {
  var G__7959 = null;
  var G__7959__2 = function(_, f) {
    return f.call(null)
  };
  var G__7959__3 = function(_, f, start) {
    return start
  };
  G__7959 = function(_, f, start) {
    switch(arguments.length) {
      case 2:
        return G__7959__2.call(this, _, f);
      case 3:
        return G__7959__3.call(this, _, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7959
}();
cljs.core.IPrintable["null"] = true;
cljs.core._pr_seq["null"] = function(o) {
  return cljs.core.list.call(null, "nil")
};
cljs.core.ISet["null"] = true;
cljs.core._disjoin["null"] = function(_, v) {
  return null
};
cljs.core.ICounted["null"] = true;
cljs.core._count["null"] = function(_) {
  return 0
};
cljs.core.IStack["null"] = true;
cljs.core._peek["null"] = function(_) {
  return null
};
cljs.core._pop["null"] = function(_) {
  return null
};
cljs.core.ISeq["null"] = true;
cljs.core._first["null"] = function(_) {
  return null
};
cljs.core._rest["null"] = function(_) {
  return cljs.core.list.call(null)
};
cljs.core.IEquiv["null"] = true;
cljs.core._equiv["null"] = function(_, o) {
  return o == null
};
cljs.core.IWithMeta["null"] = true;
cljs.core._with_meta["null"] = function(_, meta) {
  return null
};
cljs.core.IMeta["null"] = true;
cljs.core._meta["null"] = function(_) {
  return null
};
cljs.core.IIndexed["null"] = true;
cljs.core._nth["null"] = function() {
  var G__7960 = null;
  var G__7960__2 = function(_, n) {
    return null
  };
  var G__7960__3 = function(_, n, not_found) {
    return not_found
  };
  G__7960 = function(_, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7960__2.call(this, _, n);
      case 3:
        return G__7960__3.call(this, _, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7960
}();
cljs.core.IEmptyableCollection["null"] = true;
cljs.core._empty["null"] = function(_) {
  return null
};
cljs.core.IMap["null"] = true;
cljs.core._dissoc["null"] = function(_, k) {
  return null
};
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(o, other) {
  var and__3822__auto____7961 = cljs.core.instance_QMARK_.call(null, Date, other);
  if(and__3822__auto____7961) {
    return o.toString() === other.toString()
  }else {
    return and__3822__auto____7961
  }
};
cljs.core.IHash["number"] = true;
cljs.core._hash["number"] = function(o) {
  return o
};
cljs.core.IEquiv["number"] = true;
cljs.core._equiv["number"] = function(x, o) {
  return x === o
};
cljs.core.IHash["boolean"] = true;
cljs.core._hash["boolean"] = function(o) {
  if(o === true) {
    return 1
  }else {
    return 0
  }
};
cljs.core.IHash["_"] = true;
cljs.core._hash["_"] = function(o) {
  return goog.getUid(o)
};
cljs.core.inc = function inc(x) {
  return x + 1
};
cljs.core.ci_reduce = function() {
  var ci_reduce = null;
  var ci_reduce__2 = function(cicoll, f) {
    var cnt__7974 = cljs.core._count.call(null, cicoll);
    if(cnt__7974 === 0) {
      return f.call(null)
    }else {
      var val__7975 = cljs.core._nth.call(null, cicoll, 0);
      var n__7976 = 1;
      while(true) {
        if(n__7976 < cnt__7974) {
          var nval__7977 = f.call(null, val__7975, cljs.core._nth.call(null, cicoll, n__7976));
          if(cljs.core.reduced_QMARK_.call(null, nval__7977)) {
            return cljs.core.deref.call(null, nval__7977)
          }else {
            var G__7986 = nval__7977;
            var G__7987 = n__7976 + 1;
            val__7975 = G__7986;
            n__7976 = G__7987;
            continue
          }
        }else {
          return val__7975
        }
        break
      }
    }
  };
  var ci_reduce__3 = function(cicoll, f, val) {
    var cnt__7978 = cljs.core._count.call(null, cicoll);
    var val__7979 = val;
    var n__7980 = 0;
    while(true) {
      if(n__7980 < cnt__7978) {
        var nval__7981 = f.call(null, val__7979, cljs.core._nth.call(null, cicoll, n__7980));
        if(cljs.core.reduced_QMARK_.call(null, nval__7981)) {
          return cljs.core.deref.call(null, nval__7981)
        }else {
          var G__7988 = nval__7981;
          var G__7989 = n__7980 + 1;
          val__7979 = G__7988;
          n__7980 = G__7989;
          continue
        }
      }else {
        return val__7979
      }
      break
    }
  };
  var ci_reduce__4 = function(cicoll, f, val, idx) {
    var cnt__7982 = cljs.core._count.call(null, cicoll);
    var val__7983 = val;
    var n__7984 = idx;
    while(true) {
      if(n__7984 < cnt__7982) {
        var nval__7985 = f.call(null, val__7983, cljs.core._nth.call(null, cicoll, n__7984));
        if(cljs.core.reduced_QMARK_.call(null, nval__7985)) {
          return cljs.core.deref.call(null, nval__7985)
        }else {
          var G__7990 = nval__7985;
          var G__7991 = n__7984 + 1;
          val__7983 = G__7990;
          n__7984 = G__7991;
          continue
        }
      }else {
        return val__7983
      }
      break
    }
  };
  ci_reduce = function(cicoll, f, val, idx) {
    switch(arguments.length) {
      case 2:
        return ci_reduce__2.call(this, cicoll, f);
      case 3:
        return ci_reduce__3.call(this, cicoll, f, val);
      case 4:
        return ci_reduce__4.call(this, cicoll, f, val, idx)
    }
    throw"Invalid arity: " + arguments.length;
  };
  ci_reduce.cljs$lang$arity$2 = ci_reduce__2;
  ci_reduce.cljs$lang$arity$3 = ci_reduce__3;
  ci_reduce.cljs$lang$arity$4 = ci_reduce__4;
  return ci_reduce
}();
cljs.core.array_reduce = function() {
  var array_reduce = null;
  var array_reduce__2 = function(arr, f) {
    var cnt__8004 = arr.length;
    if(arr.length === 0) {
      return f.call(null)
    }else {
      var val__8005 = arr[0];
      var n__8006 = 1;
      while(true) {
        if(n__8006 < cnt__8004) {
          var nval__8007 = f.call(null, val__8005, arr[n__8006]);
          if(cljs.core.reduced_QMARK_.call(null, nval__8007)) {
            return cljs.core.deref.call(null, nval__8007)
          }else {
            var G__8016 = nval__8007;
            var G__8017 = n__8006 + 1;
            val__8005 = G__8016;
            n__8006 = G__8017;
            continue
          }
        }else {
          return val__8005
        }
        break
      }
    }
  };
  var array_reduce__3 = function(arr, f, val) {
    var cnt__8008 = arr.length;
    var val__8009 = val;
    var n__8010 = 0;
    while(true) {
      if(n__8010 < cnt__8008) {
        var nval__8011 = f.call(null, val__8009, arr[n__8010]);
        if(cljs.core.reduced_QMARK_.call(null, nval__8011)) {
          return cljs.core.deref.call(null, nval__8011)
        }else {
          var G__8018 = nval__8011;
          var G__8019 = n__8010 + 1;
          val__8009 = G__8018;
          n__8010 = G__8019;
          continue
        }
      }else {
        return val__8009
      }
      break
    }
  };
  var array_reduce__4 = function(arr, f, val, idx) {
    var cnt__8012 = arr.length;
    var val__8013 = val;
    var n__8014 = idx;
    while(true) {
      if(n__8014 < cnt__8012) {
        var nval__8015 = f.call(null, val__8013, arr[n__8014]);
        if(cljs.core.reduced_QMARK_.call(null, nval__8015)) {
          return cljs.core.deref.call(null, nval__8015)
        }else {
          var G__8020 = nval__8015;
          var G__8021 = n__8014 + 1;
          val__8013 = G__8020;
          n__8014 = G__8021;
          continue
        }
      }else {
        return val__8013
      }
      break
    }
  };
  array_reduce = function(arr, f, val, idx) {
    switch(arguments.length) {
      case 2:
        return array_reduce__2.call(this, arr, f);
      case 3:
        return array_reduce__3.call(this, arr, f, val);
      case 4:
        return array_reduce__4.call(this, arr, f, val, idx)
    }
    throw"Invalid arity: " + arguments.length;
  };
  array_reduce.cljs$lang$arity$2 = array_reduce__2;
  array_reduce.cljs$lang$arity$3 = array_reduce__3;
  array_reduce.cljs$lang$arity$4 = array_reduce__4;
  return array_reduce
}();
cljs.core.IndexedSeq = function(a, i) {
  this.a = a;
  this.i = i;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 166199546
};
cljs.core.IndexedSeq.cljs$lang$type = true;
cljs.core.IndexedSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/IndexedSeq")
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8022 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = function(_) {
  var this__8023 = this;
  if(this__8023.i + 1 < this__8023.a.length) {
    return new cljs.core.IndexedSeq(this__8023.a, this__8023.i + 1)
  }else {
    return null
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8024 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__8025 = this;
  var c__8026 = coll.cljs$core$ICounted$_count$arity$1(coll);
  if(c__8026 > 0) {
    return new cljs.core.RSeq(coll, c__8026 - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.IndexedSeq.prototype.toString = function() {
  var this__8027 = this;
  var this__8028 = this;
  return cljs.core.pr_str.call(null, this__8028)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__8029 = this;
  if(cljs.core.counted_QMARK_.call(null, this__8029.a)) {
    return cljs.core.ci_reduce.call(null, this__8029.a, f, this__8029.a[this__8029.i], this__8029.i + 1)
  }else {
    return cljs.core.ci_reduce.call(null, coll, f, this__8029.a[this__8029.i], 0)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__8030 = this;
  if(cljs.core.counted_QMARK_.call(null, this__8030.a)) {
    return cljs.core.ci_reduce.call(null, this__8030.a, f, start, this__8030.i)
  }else {
    return cljs.core.ci_reduce.call(null, coll, f, start, 0)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__8031 = this;
  return this$
};
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__8032 = this;
  return this__8032.a.length - this__8032.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(_) {
  var this__8033 = this;
  return this__8033.a[this__8033.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(_) {
  var this__8034 = this;
  if(this__8034.i + 1 < this__8034.a.length) {
    return new cljs.core.IndexedSeq(this__8034.a, this__8034.i + 1)
  }else {
    return cljs.core.list.call(null)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8035 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8036 = this;
  var i__8037 = n + this__8036.i;
  if(i__8037 < this__8036.a.length) {
    return this__8036.a[i__8037]
  }else {
    return null
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8038 = this;
  var i__8039 = n + this__8038.i;
  if(i__8039 < this__8038.a.length) {
    return this__8038.a[i__8039]
  }else {
    return not_found
  }
};
cljs.core.IndexedSeq;
cljs.core.prim_seq = function() {
  var prim_seq = null;
  var prim_seq__1 = function(prim) {
    return prim_seq.call(null, prim, 0)
  };
  var prim_seq__2 = function(prim, i) {
    if(prim.length === 0) {
      return null
    }else {
      return new cljs.core.IndexedSeq(prim, i)
    }
  };
  prim_seq = function(prim, i) {
    switch(arguments.length) {
      case 1:
        return prim_seq__1.call(this, prim);
      case 2:
        return prim_seq__2.call(this, prim, i)
    }
    throw"Invalid arity: " + arguments.length;
  };
  prim_seq.cljs$lang$arity$1 = prim_seq__1;
  prim_seq.cljs$lang$arity$2 = prim_seq__2;
  return prim_seq
}();
cljs.core.array_seq = function() {
  var array_seq = null;
  var array_seq__1 = function(array) {
    return cljs.core.prim_seq.call(null, array, 0)
  };
  var array_seq__2 = function(array, i) {
    return cljs.core.prim_seq.call(null, array, i)
  };
  array_seq = function(array, i) {
    switch(arguments.length) {
      case 1:
        return array_seq__1.call(this, array);
      case 2:
        return array_seq__2.call(this, array, i)
    }
    throw"Invalid arity: " + arguments.length;
  };
  array_seq.cljs$lang$arity$1 = array_seq__1;
  array_seq.cljs$lang$arity$2 = array_seq__2;
  return array_seq
}();
cljs.core.IReduce["array"] = true;
cljs.core._reduce["array"] = function() {
  var G__8040 = null;
  var G__8040__2 = function(array, f) {
    return cljs.core.ci_reduce.call(null, array, f)
  };
  var G__8040__3 = function(array, f, start) {
    return cljs.core.ci_reduce.call(null, array, f, start)
  };
  G__8040 = function(array, f, start) {
    switch(arguments.length) {
      case 2:
        return G__8040__2.call(this, array, f);
      case 3:
        return G__8040__3.call(this, array, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8040
}();
cljs.core.ILookup["array"] = true;
cljs.core._lookup["array"] = function() {
  var G__8041 = null;
  var G__8041__2 = function(array, k) {
    return array[k]
  };
  var G__8041__3 = function(array, k, not_found) {
    return cljs.core._nth.call(null, array, k, not_found)
  };
  G__8041 = function(array, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8041__2.call(this, array, k);
      case 3:
        return G__8041__3.call(this, array, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8041
}();
cljs.core.IIndexed["array"] = true;
cljs.core._nth["array"] = function() {
  var G__8042 = null;
  var G__8042__2 = function(array, n) {
    if(n < array.length) {
      return array[n]
    }else {
      return null
    }
  };
  var G__8042__3 = function(array, n, not_found) {
    if(n < array.length) {
      return array[n]
    }else {
      return not_found
    }
  };
  G__8042 = function(array, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8042__2.call(this, array, n);
      case 3:
        return G__8042__3.call(this, array, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8042
}();
cljs.core.ICounted["array"] = true;
cljs.core._count["array"] = function(a) {
  return a.length
};
cljs.core.ISeqable["array"] = true;
cljs.core._seq["array"] = function(array) {
  return cljs.core.array_seq.call(null, array, 0)
};
cljs.core.RSeq = function(ci, i, meta) {
  this.ci = ci;
  this.i = i;
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850570
};
cljs.core.RSeq.cljs$lang$type = true;
cljs.core.RSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/RSeq")
};
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8043 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8044 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.RSeq.prototype.toString = function() {
  var this__8045 = this;
  var this__8046 = this;
  return cljs.core.pr_str.call(null, this__8046)
};
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8047 = this;
  return coll
};
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8048 = this;
  return this__8048.i + 1
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8049 = this;
  return cljs.core._nth.call(null, this__8049.ci, this__8049.i)
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8050 = this;
  if(this__8050.i > 0) {
    return new cljs.core.RSeq(this__8050.ci, this__8050.i - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8051 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, new_meta) {
  var this__8052 = this;
  return new cljs.core.RSeq(this__8052.ci, this__8052.i, new_meta)
};
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8053 = this;
  return this__8053.meta
};
cljs.core.RSeq;
cljs.core.seq = function seq(coll) {
  if(coll == null) {
    return null
  }else {
    if(function() {
      var G__8057__8058 = coll;
      if(G__8057__8058) {
        if(function() {
          var or__3824__auto____8059 = G__8057__8058.cljs$lang$protocol_mask$partition0$ & 32;
          if(or__3824__auto____8059) {
            return or__3824__auto____8059
          }else {
            return G__8057__8058.cljs$core$ASeq$
          }
        }()) {
          return true
        }else {
          if(!G__8057__8058.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ASeq, G__8057__8058)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ASeq, G__8057__8058)
      }
    }()) {
      return coll
    }else {
      return cljs.core._seq.call(null, coll)
    }
  }
};
cljs.core.first = function first(coll) {
  if(coll == null) {
    return null
  }else {
    if(function() {
      var G__8064__8065 = coll;
      if(G__8064__8065) {
        if(function() {
          var or__3824__auto____8066 = G__8064__8065.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____8066) {
            return or__3824__auto____8066
          }else {
            return G__8064__8065.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__8064__8065.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__8064__8065)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__8064__8065)
      }
    }()) {
      return cljs.core._first.call(null, coll)
    }else {
      var s__8067 = cljs.core.seq.call(null, coll);
      if(s__8067 == null) {
        return null
      }else {
        return cljs.core._first.call(null, s__8067)
      }
    }
  }
};
cljs.core.rest = function rest(coll) {
  if(!(coll == null)) {
    if(function() {
      var G__8072__8073 = coll;
      if(G__8072__8073) {
        if(function() {
          var or__3824__auto____8074 = G__8072__8073.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____8074) {
            return or__3824__auto____8074
          }else {
            return G__8072__8073.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__8072__8073.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__8072__8073)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__8072__8073)
      }
    }()) {
      return cljs.core._rest.call(null, coll)
    }else {
      var s__8075 = cljs.core.seq.call(null, coll);
      if(!(s__8075 == null)) {
        return cljs.core._rest.call(null, s__8075)
      }else {
        return cljs.core.List.EMPTY
      }
    }
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.next = function next(coll) {
  if(coll == null) {
    return null
  }else {
    if(function() {
      var G__8079__8080 = coll;
      if(G__8079__8080) {
        if(function() {
          var or__3824__auto____8081 = G__8079__8080.cljs$lang$protocol_mask$partition0$ & 128;
          if(or__3824__auto____8081) {
            return or__3824__auto____8081
          }else {
            return G__8079__8080.cljs$core$INext$
          }
        }()) {
          return true
        }else {
          if(!G__8079__8080.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.INext, G__8079__8080)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.INext, G__8079__8080)
      }
    }()) {
      return cljs.core._next.call(null, coll)
    }else {
      return cljs.core.seq.call(null, cljs.core.rest.call(null, coll))
    }
  }
};
cljs.core.second = function second(coll) {
  return cljs.core.first.call(null, cljs.core.next.call(null, coll))
};
cljs.core.ffirst = function ffirst(coll) {
  return cljs.core.first.call(null, cljs.core.first.call(null, coll))
};
cljs.core.nfirst = function nfirst(coll) {
  return cljs.core.next.call(null, cljs.core.first.call(null, coll))
};
cljs.core.fnext = function fnext(coll) {
  return cljs.core.first.call(null, cljs.core.next.call(null, coll))
};
cljs.core.nnext = function nnext(coll) {
  return cljs.core.next.call(null, cljs.core.next.call(null, coll))
};
cljs.core.last = function last(s) {
  while(true) {
    var sn__8083 = cljs.core.next.call(null, s);
    if(!(sn__8083 == null)) {
      var G__8084 = sn__8083;
      s = G__8084;
      continue
    }else {
      return cljs.core.first.call(null, s)
    }
    break
  }
};
cljs.core.IEquiv["_"] = true;
cljs.core._equiv["_"] = function(x, o) {
  return x === o
};
cljs.core.not = function not(x) {
  if(cljs.core.truth_(x)) {
    return false
  }else {
    return true
  }
};
cljs.core.conj = function() {
  var conj = null;
  var conj__2 = function(coll, x) {
    return cljs.core._conj.call(null, coll, x)
  };
  var conj__3 = function() {
    var G__8085__delegate = function(coll, x, xs) {
      while(true) {
        if(cljs.core.truth_(xs)) {
          var G__8086 = conj.call(null, coll, x);
          var G__8087 = cljs.core.first.call(null, xs);
          var G__8088 = cljs.core.next.call(null, xs);
          coll = G__8086;
          x = G__8087;
          xs = G__8088;
          continue
        }else {
          return conj.call(null, coll, x)
        }
        break
      }
    };
    var G__8085 = function(coll, x, var_args) {
      var xs = null;
      if(goog.isDef(var_args)) {
        xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8085__delegate.call(this, coll, x, xs)
    };
    G__8085.cljs$lang$maxFixedArity = 2;
    G__8085.cljs$lang$applyTo = function(arglist__8089) {
      var coll = cljs.core.first(arglist__8089);
      var x = cljs.core.first(cljs.core.next(arglist__8089));
      var xs = cljs.core.rest(cljs.core.next(arglist__8089));
      return G__8085__delegate(coll, x, xs)
    };
    G__8085.cljs$lang$arity$variadic = G__8085__delegate;
    return G__8085
  }();
  conj = function(coll, x, var_args) {
    var xs = var_args;
    switch(arguments.length) {
      case 2:
        return conj__2.call(this, coll, x);
      default:
        return conj__3.cljs$lang$arity$variadic(coll, x, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  conj.cljs$lang$maxFixedArity = 2;
  conj.cljs$lang$applyTo = conj__3.cljs$lang$applyTo;
  conj.cljs$lang$arity$2 = conj__2;
  conj.cljs$lang$arity$variadic = conj__3.cljs$lang$arity$variadic;
  return conj
}();
cljs.core.empty = function empty(coll) {
  return cljs.core._empty.call(null, coll)
};
cljs.core.accumulating_seq_count = function accumulating_seq_count(coll) {
  var s__8092 = cljs.core.seq.call(null, coll);
  var acc__8093 = 0;
  while(true) {
    if(cljs.core.counted_QMARK_.call(null, s__8092)) {
      return acc__8093 + cljs.core._count.call(null, s__8092)
    }else {
      var G__8094 = cljs.core.next.call(null, s__8092);
      var G__8095 = acc__8093 + 1;
      s__8092 = G__8094;
      acc__8093 = G__8095;
      continue
    }
    break
  }
};
cljs.core.count = function count(coll) {
  if(cljs.core.counted_QMARK_.call(null, coll)) {
    return cljs.core._count.call(null, coll)
  }else {
    return cljs.core.accumulating_seq_count.call(null, coll)
  }
};
cljs.core.linear_traversal_nth = function() {
  var linear_traversal_nth = null;
  var linear_traversal_nth__2 = function(coll, n) {
    if(coll == null) {
      throw new Error("Index out of bounds");
    }else {
      if(n === 0) {
        if(cljs.core.seq.call(null, coll)) {
          return cljs.core.first.call(null, coll)
        }else {
          throw new Error("Index out of bounds");
        }
      }else {
        if(cljs.core.indexed_QMARK_.call(null, coll)) {
          return cljs.core._nth.call(null, coll, n)
        }else {
          if(cljs.core.seq.call(null, coll)) {
            return linear_traversal_nth.call(null, cljs.core.next.call(null, coll), n - 1)
          }else {
            if("\ufdd0'else") {
              throw new Error("Index out of bounds");
            }else {
              return null
            }
          }
        }
      }
    }
  };
  var linear_traversal_nth__3 = function(coll, n, not_found) {
    if(coll == null) {
      return not_found
    }else {
      if(n === 0) {
        if(cljs.core.seq.call(null, coll)) {
          return cljs.core.first.call(null, coll)
        }else {
          return not_found
        }
      }else {
        if(cljs.core.indexed_QMARK_.call(null, coll)) {
          return cljs.core._nth.call(null, coll, n, not_found)
        }else {
          if(cljs.core.seq.call(null, coll)) {
            return linear_traversal_nth.call(null, cljs.core.next.call(null, coll), n - 1, not_found)
          }else {
            if("\ufdd0'else") {
              return not_found
            }else {
              return null
            }
          }
        }
      }
    }
  };
  linear_traversal_nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return linear_traversal_nth__2.call(this, coll, n);
      case 3:
        return linear_traversal_nth__3.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  linear_traversal_nth.cljs$lang$arity$2 = linear_traversal_nth__2;
  linear_traversal_nth.cljs$lang$arity$3 = linear_traversal_nth__3;
  return linear_traversal_nth
}();
cljs.core.nth = function() {
  var nth = null;
  var nth__2 = function(coll, n) {
    if(coll == null) {
      return null
    }else {
      if(function() {
        var G__8102__8103 = coll;
        if(G__8102__8103) {
          if(function() {
            var or__3824__auto____8104 = G__8102__8103.cljs$lang$protocol_mask$partition0$ & 16;
            if(or__3824__auto____8104) {
              return or__3824__auto____8104
            }else {
              return G__8102__8103.cljs$core$IIndexed$
            }
          }()) {
            return true
          }else {
            if(!G__8102__8103.cljs$lang$protocol_mask$partition0$) {
              return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__8102__8103)
            }else {
              return false
            }
          }
        }else {
          return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__8102__8103)
        }
      }()) {
        return cljs.core._nth.call(null, coll, Math.floor(n))
      }else {
        return cljs.core.linear_traversal_nth.call(null, coll, Math.floor(n))
      }
    }
  };
  var nth__3 = function(coll, n, not_found) {
    if(!(coll == null)) {
      if(function() {
        var G__8105__8106 = coll;
        if(G__8105__8106) {
          if(function() {
            var or__3824__auto____8107 = G__8105__8106.cljs$lang$protocol_mask$partition0$ & 16;
            if(or__3824__auto____8107) {
              return or__3824__auto____8107
            }else {
              return G__8105__8106.cljs$core$IIndexed$
            }
          }()) {
            return true
          }else {
            if(!G__8105__8106.cljs$lang$protocol_mask$partition0$) {
              return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__8105__8106)
            }else {
              return false
            }
          }
        }else {
          return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__8105__8106)
        }
      }()) {
        return cljs.core._nth.call(null, coll, Math.floor(n), not_found)
      }else {
        return cljs.core.linear_traversal_nth.call(null, coll, Math.floor(n), not_found)
      }
    }else {
      return not_found
    }
  };
  nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return nth__2.call(this, coll, n);
      case 3:
        return nth__3.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  nth.cljs$lang$arity$2 = nth__2;
  nth.cljs$lang$arity$3 = nth__3;
  return nth
}();
cljs.core.get = function() {
  var get = null;
  var get__2 = function(o, k) {
    return cljs.core._lookup.call(null, o, k)
  };
  var get__3 = function(o, k, not_found) {
    return cljs.core._lookup.call(null, o, k, not_found)
  };
  get = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return get__2.call(this, o, k);
      case 3:
        return get__3.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  get.cljs$lang$arity$2 = get__2;
  get.cljs$lang$arity$3 = get__3;
  return get
}();
cljs.core.assoc = function() {
  var assoc = null;
  var assoc__3 = function(coll, k, v) {
    return cljs.core._assoc.call(null, coll, k, v)
  };
  var assoc__4 = function() {
    var G__8110__delegate = function(coll, k, v, kvs) {
      while(true) {
        var ret__8109 = assoc.call(null, coll, k, v);
        if(cljs.core.truth_(kvs)) {
          var G__8111 = ret__8109;
          var G__8112 = cljs.core.first.call(null, kvs);
          var G__8113 = cljs.core.second.call(null, kvs);
          var G__8114 = cljs.core.nnext.call(null, kvs);
          coll = G__8111;
          k = G__8112;
          v = G__8113;
          kvs = G__8114;
          continue
        }else {
          return ret__8109
        }
        break
      }
    };
    var G__8110 = function(coll, k, v, var_args) {
      var kvs = null;
      if(goog.isDef(var_args)) {
        kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__8110__delegate.call(this, coll, k, v, kvs)
    };
    G__8110.cljs$lang$maxFixedArity = 3;
    G__8110.cljs$lang$applyTo = function(arglist__8115) {
      var coll = cljs.core.first(arglist__8115);
      var k = cljs.core.first(cljs.core.next(arglist__8115));
      var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8115)));
      var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8115)));
      return G__8110__delegate(coll, k, v, kvs)
    };
    G__8110.cljs$lang$arity$variadic = G__8110__delegate;
    return G__8110
  }();
  assoc = function(coll, k, v, var_args) {
    var kvs = var_args;
    switch(arguments.length) {
      case 3:
        return assoc__3.call(this, coll, k, v);
      default:
        return assoc__4.cljs$lang$arity$variadic(coll, k, v, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  assoc.cljs$lang$maxFixedArity = 3;
  assoc.cljs$lang$applyTo = assoc__4.cljs$lang$applyTo;
  assoc.cljs$lang$arity$3 = assoc__3;
  assoc.cljs$lang$arity$variadic = assoc__4.cljs$lang$arity$variadic;
  return assoc
}();
cljs.core.dissoc = function() {
  var dissoc = null;
  var dissoc__1 = function(coll) {
    return coll
  };
  var dissoc__2 = function(coll, k) {
    return cljs.core._dissoc.call(null, coll, k)
  };
  var dissoc__3 = function() {
    var G__8118__delegate = function(coll, k, ks) {
      while(true) {
        var ret__8117 = dissoc.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__8119 = ret__8117;
          var G__8120 = cljs.core.first.call(null, ks);
          var G__8121 = cljs.core.next.call(null, ks);
          coll = G__8119;
          k = G__8120;
          ks = G__8121;
          continue
        }else {
          return ret__8117
        }
        break
      }
    };
    var G__8118 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8118__delegate.call(this, coll, k, ks)
    };
    G__8118.cljs$lang$maxFixedArity = 2;
    G__8118.cljs$lang$applyTo = function(arglist__8122) {
      var coll = cljs.core.first(arglist__8122);
      var k = cljs.core.first(cljs.core.next(arglist__8122));
      var ks = cljs.core.rest(cljs.core.next(arglist__8122));
      return G__8118__delegate(coll, k, ks)
    };
    G__8118.cljs$lang$arity$variadic = G__8118__delegate;
    return G__8118
  }();
  dissoc = function(coll, k, var_args) {
    var ks = var_args;
    switch(arguments.length) {
      case 1:
        return dissoc__1.call(this, coll);
      case 2:
        return dissoc__2.call(this, coll, k);
      default:
        return dissoc__3.cljs$lang$arity$variadic(coll, k, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  dissoc.cljs$lang$maxFixedArity = 2;
  dissoc.cljs$lang$applyTo = dissoc__3.cljs$lang$applyTo;
  dissoc.cljs$lang$arity$1 = dissoc__1;
  dissoc.cljs$lang$arity$2 = dissoc__2;
  dissoc.cljs$lang$arity$variadic = dissoc__3.cljs$lang$arity$variadic;
  return dissoc
}();
cljs.core.with_meta = function with_meta(o, meta) {
  return cljs.core._with_meta.call(null, o, meta)
};
cljs.core.meta = function meta(o) {
  if(function() {
    var G__8126__8127 = o;
    if(G__8126__8127) {
      if(function() {
        var or__3824__auto____8128 = G__8126__8127.cljs$lang$protocol_mask$partition0$ & 131072;
        if(or__3824__auto____8128) {
          return or__3824__auto____8128
        }else {
          return G__8126__8127.cljs$core$IMeta$
        }
      }()) {
        return true
      }else {
        if(!G__8126__8127.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__8126__8127)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__8126__8127)
    }
  }()) {
    return cljs.core._meta.call(null, o)
  }else {
    return null
  }
};
cljs.core.peek = function peek(coll) {
  return cljs.core._peek.call(null, coll)
};
cljs.core.pop = function pop(coll) {
  return cljs.core._pop.call(null, coll)
};
cljs.core.disj = function() {
  var disj = null;
  var disj__1 = function(coll) {
    return coll
  };
  var disj__2 = function(coll, k) {
    return cljs.core._disjoin.call(null, coll, k)
  };
  var disj__3 = function() {
    var G__8131__delegate = function(coll, k, ks) {
      while(true) {
        var ret__8130 = disj.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__8132 = ret__8130;
          var G__8133 = cljs.core.first.call(null, ks);
          var G__8134 = cljs.core.next.call(null, ks);
          coll = G__8132;
          k = G__8133;
          ks = G__8134;
          continue
        }else {
          return ret__8130
        }
        break
      }
    };
    var G__8131 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8131__delegate.call(this, coll, k, ks)
    };
    G__8131.cljs$lang$maxFixedArity = 2;
    G__8131.cljs$lang$applyTo = function(arglist__8135) {
      var coll = cljs.core.first(arglist__8135);
      var k = cljs.core.first(cljs.core.next(arglist__8135));
      var ks = cljs.core.rest(cljs.core.next(arglist__8135));
      return G__8131__delegate(coll, k, ks)
    };
    G__8131.cljs$lang$arity$variadic = G__8131__delegate;
    return G__8131
  }();
  disj = function(coll, k, var_args) {
    var ks = var_args;
    switch(arguments.length) {
      case 1:
        return disj__1.call(this, coll);
      case 2:
        return disj__2.call(this, coll, k);
      default:
        return disj__3.cljs$lang$arity$variadic(coll, k, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  disj.cljs$lang$maxFixedArity = 2;
  disj.cljs$lang$applyTo = disj__3.cljs$lang$applyTo;
  disj.cljs$lang$arity$1 = disj__1;
  disj.cljs$lang$arity$2 = disj__2;
  disj.cljs$lang$arity$variadic = disj__3.cljs$lang$arity$variadic;
  return disj
}();
cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
cljs.core.add_to_string_hash_cache = function add_to_string_hash_cache(k) {
  var h__8137 = goog.string.hashCode(k);
  cljs.core.string_hash_cache[k] = h__8137;
  cljs.core.string_hash_cache_count = cljs.core.string_hash_cache_count + 1;
  return h__8137
};
cljs.core.check_string_hash_cache = function check_string_hash_cache(k) {
  if(cljs.core.string_hash_cache_count > 255) {
    cljs.core.string_hash_cache = {};
    cljs.core.string_hash_cache_count = 0
  }else {
  }
  var h__8139 = cljs.core.string_hash_cache[k];
  if(!(h__8139 == null)) {
    return h__8139
  }else {
    return cljs.core.add_to_string_hash_cache.call(null, k)
  }
};
cljs.core.hash = function() {
  var hash = null;
  var hash__1 = function(o) {
    return hash.call(null, o, true)
  };
  var hash__2 = function(o, check_cache) {
    if(function() {
      var and__3822__auto____8141 = goog.isString(o);
      if(and__3822__auto____8141) {
        return check_cache
      }else {
        return and__3822__auto____8141
      }
    }()) {
      return cljs.core.check_string_hash_cache.call(null, o)
    }else {
      return cljs.core._hash.call(null, o)
    }
  };
  hash = function(o, check_cache) {
    switch(arguments.length) {
      case 1:
        return hash__1.call(this, o);
      case 2:
        return hash__2.call(this, o, check_cache)
    }
    throw"Invalid arity: " + arguments.length;
  };
  hash.cljs$lang$arity$1 = hash__1;
  hash.cljs$lang$arity$2 = hash__2;
  return hash
}();
cljs.core.empty_QMARK_ = function empty_QMARK_(coll) {
  return cljs.core.not.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.coll_QMARK_ = function coll_QMARK_(x) {
  if(x == null) {
    return false
  }else {
    var G__8145__8146 = x;
    if(G__8145__8146) {
      if(function() {
        var or__3824__auto____8147 = G__8145__8146.cljs$lang$protocol_mask$partition0$ & 8;
        if(or__3824__auto____8147) {
          return or__3824__auto____8147
        }else {
          return G__8145__8146.cljs$core$ICollection$
        }
      }()) {
        return true
      }else {
        if(!G__8145__8146.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ICollection, G__8145__8146)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ICollection, G__8145__8146)
    }
  }
};
cljs.core.set_QMARK_ = function set_QMARK_(x) {
  if(x == null) {
    return false
  }else {
    var G__8151__8152 = x;
    if(G__8151__8152) {
      if(function() {
        var or__3824__auto____8153 = G__8151__8152.cljs$lang$protocol_mask$partition0$ & 4096;
        if(or__3824__auto____8153) {
          return or__3824__auto____8153
        }else {
          return G__8151__8152.cljs$core$ISet$
        }
      }()) {
        return true
      }else {
        if(!G__8151__8152.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ISet, G__8151__8152)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISet, G__8151__8152)
    }
  }
};
cljs.core.associative_QMARK_ = function associative_QMARK_(x) {
  var G__8157__8158 = x;
  if(G__8157__8158) {
    if(function() {
      var or__3824__auto____8159 = G__8157__8158.cljs$lang$protocol_mask$partition0$ & 512;
      if(or__3824__auto____8159) {
        return or__3824__auto____8159
      }else {
        return G__8157__8158.cljs$core$IAssociative$
      }
    }()) {
      return true
    }else {
      if(!G__8157__8158.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, G__8157__8158)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, G__8157__8158)
  }
};
cljs.core.sequential_QMARK_ = function sequential_QMARK_(x) {
  var G__8163__8164 = x;
  if(G__8163__8164) {
    if(function() {
      var or__3824__auto____8165 = G__8163__8164.cljs$lang$protocol_mask$partition0$ & 16777216;
      if(or__3824__auto____8165) {
        return or__3824__auto____8165
      }else {
        return G__8163__8164.cljs$core$ISequential$
      }
    }()) {
      return true
    }else {
      if(!G__8163__8164.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISequential, G__8163__8164)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ISequential, G__8163__8164)
  }
};
cljs.core.counted_QMARK_ = function counted_QMARK_(x) {
  var G__8169__8170 = x;
  if(G__8169__8170) {
    if(function() {
      var or__3824__auto____8171 = G__8169__8170.cljs$lang$protocol_mask$partition0$ & 2;
      if(or__3824__auto____8171) {
        return or__3824__auto____8171
      }else {
        return G__8169__8170.cljs$core$ICounted$
      }
    }()) {
      return true
    }else {
      if(!G__8169__8170.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ICounted, G__8169__8170)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ICounted, G__8169__8170)
  }
};
cljs.core.indexed_QMARK_ = function indexed_QMARK_(x) {
  var G__8175__8176 = x;
  if(G__8175__8176) {
    if(function() {
      var or__3824__auto____8177 = G__8175__8176.cljs$lang$protocol_mask$partition0$ & 16;
      if(or__3824__auto____8177) {
        return or__3824__auto____8177
      }else {
        return G__8175__8176.cljs$core$IIndexed$
      }
    }()) {
      return true
    }else {
      if(!G__8175__8176.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__8175__8176)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__8175__8176)
  }
};
cljs.core.reduceable_QMARK_ = function reduceable_QMARK_(x) {
  var G__8181__8182 = x;
  if(G__8181__8182) {
    if(function() {
      var or__3824__auto____8183 = G__8181__8182.cljs$lang$protocol_mask$partition0$ & 524288;
      if(or__3824__auto____8183) {
        return or__3824__auto____8183
      }else {
        return G__8181__8182.cljs$core$IReduce$
      }
    }()) {
      return true
    }else {
      if(!G__8181__8182.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__8181__8182)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__8181__8182)
  }
};
cljs.core.map_QMARK_ = function map_QMARK_(x) {
  if(x == null) {
    return false
  }else {
    var G__8187__8188 = x;
    if(G__8187__8188) {
      if(function() {
        var or__3824__auto____8189 = G__8187__8188.cljs$lang$protocol_mask$partition0$ & 1024;
        if(or__3824__auto____8189) {
          return or__3824__auto____8189
        }else {
          return G__8187__8188.cljs$core$IMap$
        }
      }()) {
        return true
      }else {
        if(!G__8187__8188.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IMap, G__8187__8188)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMap, G__8187__8188)
    }
  }
};
cljs.core.vector_QMARK_ = function vector_QMARK_(x) {
  var G__8193__8194 = x;
  if(G__8193__8194) {
    if(function() {
      var or__3824__auto____8195 = G__8193__8194.cljs$lang$protocol_mask$partition0$ & 16384;
      if(or__3824__auto____8195) {
        return or__3824__auto____8195
      }else {
        return G__8193__8194.cljs$core$IVector$
      }
    }()) {
      return true
    }else {
      if(!G__8193__8194.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IVector, G__8193__8194)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IVector, G__8193__8194)
  }
};
cljs.core.chunked_seq_QMARK_ = function chunked_seq_QMARK_(x) {
  var G__8199__8200 = x;
  if(G__8199__8200) {
    if(cljs.core.truth_(function() {
      var or__3824__auto____8201 = null;
      if(cljs.core.truth_(or__3824__auto____8201)) {
        return or__3824__auto____8201
      }else {
        return G__8199__8200.cljs$core$IChunkedSeq$
      }
    }())) {
      return true
    }else {
      if(!G__8199__8200.cljs$lang$protocol_mask$partition$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedSeq, G__8199__8200)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedSeq, G__8199__8200)
  }
};
cljs.core.js_obj = function() {
  var js_obj = null;
  var js_obj__0 = function() {
    return{}
  };
  var js_obj__1 = function() {
    var G__8202__delegate = function(keyvals) {
      return cljs.core.apply.call(null, goog.object.create, keyvals)
    };
    var G__8202 = function(var_args) {
      var keyvals = null;
      if(goog.isDef(var_args)) {
        keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__8202__delegate.call(this, keyvals)
    };
    G__8202.cljs$lang$maxFixedArity = 0;
    G__8202.cljs$lang$applyTo = function(arglist__8203) {
      var keyvals = cljs.core.seq(arglist__8203);
      return G__8202__delegate(keyvals)
    };
    G__8202.cljs$lang$arity$variadic = G__8202__delegate;
    return G__8202
  }();
  js_obj = function(var_args) {
    var keyvals = var_args;
    switch(arguments.length) {
      case 0:
        return js_obj__0.call(this);
      default:
        return js_obj__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw"Invalid arity: " + arguments.length;
  };
  js_obj.cljs$lang$maxFixedArity = 0;
  js_obj.cljs$lang$applyTo = js_obj__1.cljs$lang$applyTo;
  js_obj.cljs$lang$arity$0 = js_obj__0;
  js_obj.cljs$lang$arity$variadic = js_obj__1.cljs$lang$arity$variadic;
  return js_obj
}();
cljs.core.js_keys = function js_keys(obj) {
  var keys__8205 = [];
  goog.object.forEach(obj, function(val, key, obj) {
    return keys__8205.push(key)
  });
  return keys__8205
};
cljs.core.js_delete = function js_delete(obj, key) {
  return delete obj[key]
};
cljs.core.array_copy = function array_copy(from, i, to, j, len) {
  var i__8209 = i;
  var j__8210 = j;
  var len__8211 = len;
  while(true) {
    if(len__8211 === 0) {
      return to
    }else {
      to[j__8210] = from[i__8209];
      var G__8212 = i__8209 + 1;
      var G__8213 = j__8210 + 1;
      var G__8214 = len__8211 - 1;
      i__8209 = G__8212;
      j__8210 = G__8213;
      len__8211 = G__8214;
      continue
    }
    break
  }
};
cljs.core.array_copy_downward = function array_copy_downward(from, i, to, j, len) {
  var i__8218 = i + (len - 1);
  var j__8219 = j + (len - 1);
  var len__8220 = len;
  while(true) {
    if(len__8220 === 0) {
      return to
    }else {
      to[j__8219] = from[i__8218];
      var G__8221 = i__8218 - 1;
      var G__8222 = j__8219 - 1;
      var G__8223 = len__8220 - 1;
      i__8218 = G__8221;
      j__8219 = G__8222;
      len__8220 = G__8223;
      continue
    }
    break
  }
};
cljs.core.lookup_sentinel = {};
cljs.core.false_QMARK_ = function false_QMARK_(x) {
  return x === false
};
cljs.core.true_QMARK_ = function true_QMARK_(x) {
  return x === true
};
cljs.core.undefined_QMARK_ = function undefined_QMARK_(x) {
  return void 0 === x
};
cljs.core.seq_QMARK_ = function seq_QMARK_(s) {
  if(s == null) {
    return false
  }else {
    var G__8227__8228 = s;
    if(G__8227__8228) {
      if(function() {
        var or__3824__auto____8229 = G__8227__8228.cljs$lang$protocol_mask$partition0$ & 64;
        if(or__3824__auto____8229) {
          return or__3824__auto____8229
        }else {
          return G__8227__8228.cljs$core$ISeq$
        }
      }()) {
        return true
      }else {
        if(!G__8227__8228.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__8227__8228)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__8227__8228)
    }
  }
};
cljs.core.seqable_QMARK_ = function seqable_QMARK_(s) {
  var G__8233__8234 = s;
  if(G__8233__8234) {
    if(function() {
      var or__3824__auto____8235 = G__8233__8234.cljs$lang$protocol_mask$partition0$ & 8388608;
      if(or__3824__auto____8235) {
        return or__3824__auto____8235
      }else {
        return G__8233__8234.cljs$core$ISeqable$
      }
    }()) {
      return true
    }else {
      if(!G__8233__8234.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, G__8233__8234)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, G__8233__8234)
  }
};
cljs.core.boolean$ = function boolean$(x) {
  if(cljs.core.truth_(x)) {
    return true
  }else {
    return false
  }
};
cljs.core.string_QMARK_ = function string_QMARK_(x) {
  var and__3822__auto____8238 = goog.isString(x);
  if(and__3822__auto____8238) {
    return!function() {
      var or__3824__auto____8239 = x.charAt(0) === "\ufdd0";
      if(or__3824__auto____8239) {
        return or__3824__auto____8239
      }else {
        return x.charAt(0) === "\ufdd1"
      }
    }()
  }else {
    return and__3822__auto____8238
  }
};
cljs.core.keyword_QMARK_ = function keyword_QMARK_(x) {
  var and__3822__auto____8241 = goog.isString(x);
  if(and__3822__auto____8241) {
    return x.charAt(0) === "\ufdd0"
  }else {
    return and__3822__auto____8241
  }
};
cljs.core.symbol_QMARK_ = function symbol_QMARK_(x) {
  var and__3822__auto____8243 = goog.isString(x);
  if(and__3822__auto____8243) {
    return x.charAt(0) === "\ufdd1"
  }else {
    return and__3822__auto____8243
  }
};
cljs.core.number_QMARK_ = function number_QMARK_(n) {
  return goog.isNumber(n)
};
cljs.core.fn_QMARK_ = function fn_QMARK_(f) {
  return goog.isFunction(f)
};
cljs.core.ifn_QMARK_ = function ifn_QMARK_(f) {
  var or__3824__auto____8248 = cljs.core.fn_QMARK_.call(null, f);
  if(or__3824__auto____8248) {
    return or__3824__auto____8248
  }else {
    var G__8249__8250 = f;
    if(G__8249__8250) {
      if(function() {
        var or__3824__auto____8251 = G__8249__8250.cljs$lang$protocol_mask$partition0$ & 1;
        if(or__3824__auto____8251) {
          return or__3824__auto____8251
        }else {
          return G__8249__8250.cljs$core$IFn$
        }
      }()) {
        return true
      }else {
        if(!G__8249__8250.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IFn, G__8249__8250)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IFn, G__8249__8250)
    }
  }
};
cljs.core.integer_QMARK_ = function integer_QMARK_(n) {
  var and__3822__auto____8253 = cljs.core.number_QMARK_.call(null, n);
  if(and__3822__auto____8253) {
    return n == n.toFixed()
  }else {
    return and__3822__auto____8253
  }
};
cljs.core.contains_QMARK_ = function contains_QMARK_(coll, v) {
  if(cljs.core._lookup.call(null, coll, v, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
    return false
  }else {
    return true
  }
};
cljs.core.find = function find(coll, k) {
  if(cljs.core.truth_(function() {
    var and__3822__auto____8256 = coll;
    if(cljs.core.truth_(and__3822__auto____8256)) {
      var and__3822__auto____8257 = cljs.core.associative_QMARK_.call(null, coll);
      if(and__3822__auto____8257) {
        return cljs.core.contains_QMARK_.call(null, coll, k)
      }else {
        return and__3822__auto____8257
      }
    }else {
      return and__3822__auto____8256
    }
  }())) {
    return cljs.core.PersistentVector.fromArray([k, cljs.core._lookup.call(null, coll, k)], true)
  }else {
    return null
  }
};
cljs.core.distinct_QMARK_ = function() {
  var distinct_QMARK_ = null;
  var distinct_QMARK___1 = function(x) {
    return true
  };
  var distinct_QMARK___2 = function(x, y) {
    return!cljs.core._EQ_.call(null, x, y)
  };
  var distinct_QMARK___3 = function() {
    var G__8266__delegate = function(x, y, more) {
      if(!cljs.core._EQ_.call(null, x, y)) {
        var s__8262 = cljs.core.PersistentHashSet.fromArray([y, x]);
        var xs__8263 = more;
        while(true) {
          var x__8264 = cljs.core.first.call(null, xs__8263);
          var etc__8265 = cljs.core.next.call(null, xs__8263);
          if(cljs.core.truth_(xs__8263)) {
            if(cljs.core.contains_QMARK_.call(null, s__8262, x__8264)) {
              return false
            }else {
              var G__8267 = cljs.core.conj.call(null, s__8262, x__8264);
              var G__8268 = etc__8265;
              s__8262 = G__8267;
              xs__8263 = G__8268;
              continue
            }
          }else {
            return true
          }
          break
        }
      }else {
        return false
      }
    };
    var G__8266 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8266__delegate.call(this, x, y, more)
    };
    G__8266.cljs$lang$maxFixedArity = 2;
    G__8266.cljs$lang$applyTo = function(arglist__8269) {
      var x = cljs.core.first(arglist__8269);
      var y = cljs.core.first(cljs.core.next(arglist__8269));
      var more = cljs.core.rest(cljs.core.next(arglist__8269));
      return G__8266__delegate(x, y, more)
    };
    G__8266.cljs$lang$arity$variadic = G__8266__delegate;
    return G__8266
  }();
  distinct_QMARK_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return distinct_QMARK___1.call(this, x);
      case 2:
        return distinct_QMARK___2.call(this, x, y);
      default:
        return distinct_QMARK___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  distinct_QMARK_.cljs$lang$maxFixedArity = 2;
  distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___3.cljs$lang$applyTo;
  distinct_QMARK_.cljs$lang$arity$1 = distinct_QMARK___1;
  distinct_QMARK_.cljs$lang$arity$2 = distinct_QMARK___2;
  distinct_QMARK_.cljs$lang$arity$variadic = distinct_QMARK___3.cljs$lang$arity$variadic;
  return distinct_QMARK_
}();
cljs.core.compare = function compare(x, y) {
  if(x === y) {
    return 0
  }else {
    if(x == null) {
      return-1
    }else {
      if(y == null) {
        return 1
      }else {
        if(cljs.core.type.call(null, x) === cljs.core.type.call(null, y)) {
          if(function() {
            var G__8273__8274 = x;
            if(G__8273__8274) {
              if(cljs.core.truth_(function() {
                var or__3824__auto____8275 = null;
                if(cljs.core.truth_(or__3824__auto____8275)) {
                  return or__3824__auto____8275
                }else {
                  return G__8273__8274.cljs$core$IComparable$
                }
              }())) {
                return true
              }else {
                if(!G__8273__8274.cljs$lang$protocol_mask$partition$) {
                  return cljs.core.type_satisfies_.call(null, cljs.core.IComparable, G__8273__8274)
                }else {
                  return false
                }
              }
            }else {
              return cljs.core.type_satisfies_.call(null, cljs.core.IComparable, G__8273__8274)
            }
          }()) {
            return cljs.core._compare.call(null, x, y)
          }else {
            return goog.array.defaultCompare(x, y)
          }
        }else {
          if("\ufdd0'else") {
            throw new Error("compare on non-nil objects of different types");
          }else {
            return null
          }
        }
      }
    }
  }
};
cljs.core.compare_indexed = function() {
  var compare_indexed = null;
  var compare_indexed__2 = function(xs, ys) {
    var xl__8280 = cljs.core.count.call(null, xs);
    var yl__8281 = cljs.core.count.call(null, ys);
    if(xl__8280 < yl__8281) {
      return-1
    }else {
      if(xl__8280 > yl__8281) {
        return 1
      }else {
        if("\ufdd0'else") {
          return compare_indexed.call(null, xs, ys, xl__8280, 0)
        }else {
          return null
        }
      }
    }
  };
  var compare_indexed__4 = function(xs, ys, len, n) {
    while(true) {
      var d__8282 = cljs.core.compare.call(null, cljs.core.nth.call(null, xs, n), cljs.core.nth.call(null, ys, n));
      if(function() {
        var and__3822__auto____8283 = d__8282 === 0;
        if(and__3822__auto____8283) {
          return n + 1 < len
        }else {
          return and__3822__auto____8283
        }
      }()) {
        var G__8284 = xs;
        var G__8285 = ys;
        var G__8286 = len;
        var G__8287 = n + 1;
        xs = G__8284;
        ys = G__8285;
        len = G__8286;
        n = G__8287;
        continue
      }else {
        return d__8282
      }
      break
    }
  };
  compare_indexed = function(xs, ys, len, n) {
    switch(arguments.length) {
      case 2:
        return compare_indexed__2.call(this, xs, ys);
      case 4:
        return compare_indexed__4.call(this, xs, ys, len, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  compare_indexed.cljs$lang$arity$2 = compare_indexed__2;
  compare_indexed.cljs$lang$arity$4 = compare_indexed__4;
  return compare_indexed
}();
cljs.core.fn__GT_comparator = function fn__GT_comparator(f) {
  if(cljs.core._EQ_.call(null, f, cljs.core.compare)) {
    return cljs.core.compare
  }else {
    return function(x, y) {
      var r__8289 = f.call(null, x, y);
      if(cljs.core.number_QMARK_.call(null, r__8289)) {
        return r__8289
      }else {
        if(cljs.core.truth_(r__8289)) {
          return-1
        }else {
          if(cljs.core.truth_(f.call(null, y, x))) {
            return 1
          }else {
            return 0
          }
        }
      }
    }
  }
};
cljs.core.sort = function() {
  var sort = null;
  var sort__1 = function(coll) {
    return sort.call(null, cljs.core.compare, coll)
  };
  var sort__2 = function(comp, coll) {
    if(cljs.core.seq.call(null, coll)) {
      var a__8291 = cljs.core.to_array.call(null, coll);
      goog.array.stableSort(a__8291, cljs.core.fn__GT_comparator.call(null, comp));
      return cljs.core.seq.call(null, a__8291)
    }else {
      return cljs.core.List.EMPTY
    }
  };
  sort = function(comp, coll) {
    switch(arguments.length) {
      case 1:
        return sort__1.call(this, comp);
      case 2:
        return sort__2.call(this, comp, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  sort.cljs$lang$arity$1 = sort__1;
  sort.cljs$lang$arity$2 = sort__2;
  return sort
}();
cljs.core.sort_by = function() {
  var sort_by = null;
  var sort_by__2 = function(keyfn, coll) {
    return sort_by.call(null, keyfn, cljs.core.compare, coll)
  };
  var sort_by__3 = function(keyfn, comp, coll) {
    return cljs.core.sort.call(null, function(x, y) {
      return cljs.core.fn__GT_comparator.call(null, comp).call(null, keyfn.call(null, x), keyfn.call(null, y))
    }, coll)
  };
  sort_by = function(keyfn, comp, coll) {
    switch(arguments.length) {
      case 2:
        return sort_by__2.call(this, keyfn, comp);
      case 3:
        return sort_by__3.call(this, keyfn, comp, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  sort_by.cljs$lang$arity$2 = sort_by__2;
  sort_by.cljs$lang$arity$3 = sort_by__3;
  return sort_by
}();
cljs.core.seq_reduce = function() {
  var seq_reduce = null;
  var seq_reduce__2 = function(f, coll) {
    var temp__3971__auto____8297 = cljs.core.seq.call(null, coll);
    if(temp__3971__auto____8297) {
      var s__8298 = temp__3971__auto____8297;
      return cljs.core.reduce.call(null, f, cljs.core.first.call(null, s__8298), cljs.core.next.call(null, s__8298))
    }else {
      return f.call(null)
    }
  };
  var seq_reduce__3 = function(f, val, coll) {
    var val__8299 = val;
    var coll__8300 = cljs.core.seq.call(null, coll);
    while(true) {
      if(coll__8300) {
        var nval__8301 = f.call(null, val__8299, cljs.core.first.call(null, coll__8300));
        if(cljs.core.reduced_QMARK_.call(null, nval__8301)) {
          return cljs.core.deref.call(null, nval__8301)
        }else {
          var G__8302 = nval__8301;
          var G__8303 = cljs.core.next.call(null, coll__8300);
          val__8299 = G__8302;
          coll__8300 = G__8303;
          continue
        }
      }else {
        return val__8299
      }
      break
    }
  };
  seq_reduce = function(f, val, coll) {
    switch(arguments.length) {
      case 2:
        return seq_reduce__2.call(this, f, val);
      case 3:
        return seq_reduce__3.call(this, f, val, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  seq_reduce.cljs$lang$arity$2 = seq_reduce__2;
  seq_reduce.cljs$lang$arity$3 = seq_reduce__3;
  return seq_reduce
}();
cljs.core.shuffle = function shuffle(coll) {
  var a__8305 = cljs.core.to_array.call(null, coll);
  goog.array.shuffle(a__8305);
  return cljs.core.vec.call(null, a__8305)
};
cljs.core.reduce = function() {
  var reduce = null;
  var reduce__2 = function(f, coll) {
    if(function() {
      var G__8312__8313 = coll;
      if(G__8312__8313) {
        if(function() {
          var or__3824__auto____8314 = G__8312__8313.cljs$lang$protocol_mask$partition0$ & 524288;
          if(or__3824__auto____8314) {
            return or__3824__auto____8314
          }else {
            return G__8312__8313.cljs$core$IReduce$
          }
        }()) {
          return true
        }else {
          if(!G__8312__8313.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__8312__8313)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__8312__8313)
      }
    }()) {
      return cljs.core._reduce.call(null, coll, f)
    }else {
      return cljs.core.seq_reduce.call(null, f, coll)
    }
  };
  var reduce__3 = function(f, val, coll) {
    if(function() {
      var G__8315__8316 = coll;
      if(G__8315__8316) {
        if(function() {
          var or__3824__auto____8317 = G__8315__8316.cljs$lang$protocol_mask$partition0$ & 524288;
          if(or__3824__auto____8317) {
            return or__3824__auto____8317
          }else {
            return G__8315__8316.cljs$core$IReduce$
          }
        }()) {
          return true
        }else {
          if(!G__8315__8316.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__8315__8316)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__8315__8316)
      }
    }()) {
      return cljs.core._reduce.call(null, coll, f, val)
    }else {
      return cljs.core.seq_reduce.call(null, f, val, coll)
    }
  };
  reduce = function(f, val, coll) {
    switch(arguments.length) {
      case 2:
        return reduce__2.call(this, f, val);
      case 3:
        return reduce__3.call(this, f, val, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  reduce.cljs$lang$arity$2 = reduce__2;
  reduce.cljs$lang$arity$3 = reduce__3;
  return reduce
}();
cljs.core.reduce_kv = function reduce_kv(f, init, coll) {
  return cljs.core._kv_reduce.call(null, coll, f, init)
};
cljs.core.Reduced = function(val) {
  this.val = val;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32768
};
cljs.core.Reduced.cljs$lang$type = true;
cljs.core.Reduced.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Reduced")
};
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = function(o) {
  var this__8318 = this;
  return this__8318.val
};
cljs.core.Reduced;
cljs.core.reduced_QMARK_ = function reduced_QMARK_(r) {
  return cljs.core.instance_QMARK_.call(null, cljs.core.Reduced, r)
};
cljs.core.reduced = function reduced(x) {
  return new cljs.core.Reduced(x)
};
cljs.core._PLUS_ = function() {
  var _PLUS_ = null;
  var _PLUS___0 = function() {
    return 0
  };
  var _PLUS___1 = function(x) {
    return x
  };
  var _PLUS___2 = function(x, y) {
    return x + y
  };
  var _PLUS___3 = function() {
    var G__8319__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _PLUS_, x + y, more)
    };
    var G__8319 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8319__delegate.call(this, x, y, more)
    };
    G__8319.cljs$lang$maxFixedArity = 2;
    G__8319.cljs$lang$applyTo = function(arglist__8320) {
      var x = cljs.core.first(arglist__8320);
      var y = cljs.core.first(cljs.core.next(arglist__8320));
      var more = cljs.core.rest(cljs.core.next(arglist__8320));
      return G__8319__delegate(x, y, more)
    };
    G__8319.cljs$lang$arity$variadic = G__8319__delegate;
    return G__8319
  }();
  _PLUS_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 0:
        return _PLUS___0.call(this);
      case 1:
        return _PLUS___1.call(this, x);
      case 2:
        return _PLUS___2.call(this, x, y);
      default:
        return _PLUS___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _PLUS_.cljs$lang$maxFixedArity = 2;
  _PLUS_.cljs$lang$applyTo = _PLUS___3.cljs$lang$applyTo;
  _PLUS_.cljs$lang$arity$0 = _PLUS___0;
  _PLUS_.cljs$lang$arity$1 = _PLUS___1;
  _PLUS_.cljs$lang$arity$2 = _PLUS___2;
  _PLUS_.cljs$lang$arity$variadic = _PLUS___3.cljs$lang$arity$variadic;
  return _PLUS_
}();
cljs.core._ = function() {
  var _ = null;
  var ___1 = function(x) {
    return-x
  };
  var ___2 = function(x, y) {
    return x - y
  };
  var ___3 = function() {
    var G__8321__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _, x - y, more)
    };
    var G__8321 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8321__delegate.call(this, x, y, more)
    };
    G__8321.cljs$lang$maxFixedArity = 2;
    G__8321.cljs$lang$applyTo = function(arglist__8322) {
      var x = cljs.core.first(arglist__8322);
      var y = cljs.core.first(cljs.core.next(arglist__8322));
      var more = cljs.core.rest(cljs.core.next(arglist__8322));
      return G__8321__delegate(x, y, more)
    };
    G__8321.cljs$lang$arity$variadic = G__8321__delegate;
    return G__8321
  }();
  _ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return ___1.call(this, x);
      case 2:
        return ___2.call(this, x, y);
      default:
        return ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _.cljs$lang$maxFixedArity = 2;
  _.cljs$lang$applyTo = ___3.cljs$lang$applyTo;
  _.cljs$lang$arity$1 = ___1;
  _.cljs$lang$arity$2 = ___2;
  _.cljs$lang$arity$variadic = ___3.cljs$lang$arity$variadic;
  return _
}();
cljs.core._STAR_ = function() {
  var _STAR_ = null;
  var _STAR___0 = function() {
    return 1
  };
  var _STAR___1 = function(x) {
    return x
  };
  var _STAR___2 = function(x, y) {
    return x * y
  };
  var _STAR___3 = function() {
    var G__8323__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _STAR_, x * y, more)
    };
    var G__8323 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8323__delegate.call(this, x, y, more)
    };
    G__8323.cljs$lang$maxFixedArity = 2;
    G__8323.cljs$lang$applyTo = function(arglist__8324) {
      var x = cljs.core.first(arglist__8324);
      var y = cljs.core.first(cljs.core.next(arglist__8324));
      var more = cljs.core.rest(cljs.core.next(arglist__8324));
      return G__8323__delegate(x, y, more)
    };
    G__8323.cljs$lang$arity$variadic = G__8323__delegate;
    return G__8323
  }();
  _STAR_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 0:
        return _STAR___0.call(this);
      case 1:
        return _STAR___1.call(this, x);
      case 2:
        return _STAR___2.call(this, x, y);
      default:
        return _STAR___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _STAR_.cljs$lang$maxFixedArity = 2;
  _STAR_.cljs$lang$applyTo = _STAR___3.cljs$lang$applyTo;
  _STAR_.cljs$lang$arity$0 = _STAR___0;
  _STAR_.cljs$lang$arity$1 = _STAR___1;
  _STAR_.cljs$lang$arity$2 = _STAR___2;
  _STAR_.cljs$lang$arity$variadic = _STAR___3.cljs$lang$arity$variadic;
  return _STAR_
}();
cljs.core._SLASH_ = function() {
  var _SLASH_ = null;
  var _SLASH___1 = function(x) {
    return _SLASH_.call(null, 1, x)
  };
  var _SLASH___2 = function(x, y) {
    return x / y
  };
  var _SLASH___3 = function() {
    var G__8325__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _SLASH_, _SLASH_.call(null, x, y), more)
    };
    var G__8325 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8325__delegate.call(this, x, y, more)
    };
    G__8325.cljs$lang$maxFixedArity = 2;
    G__8325.cljs$lang$applyTo = function(arglist__8326) {
      var x = cljs.core.first(arglist__8326);
      var y = cljs.core.first(cljs.core.next(arglist__8326));
      var more = cljs.core.rest(cljs.core.next(arglist__8326));
      return G__8325__delegate(x, y, more)
    };
    G__8325.cljs$lang$arity$variadic = G__8325__delegate;
    return G__8325
  }();
  _SLASH_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _SLASH___1.call(this, x);
      case 2:
        return _SLASH___2.call(this, x, y);
      default:
        return _SLASH___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _SLASH_.cljs$lang$maxFixedArity = 2;
  _SLASH_.cljs$lang$applyTo = _SLASH___3.cljs$lang$applyTo;
  _SLASH_.cljs$lang$arity$1 = _SLASH___1;
  _SLASH_.cljs$lang$arity$2 = _SLASH___2;
  _SLASH_.cljs$lang$arity$variadic = _SLASH___3.cljs$lang$arity$variadic;
  return _SLASH_
}();
cljs.core._LT_ = function() {
  var _LT_ = null;
  var _LT___1 = function(x) {
    return true
  };
  var _LT___2 = function(x, y) {
    return x < y
  };
  var _LT___3 = function() {
    var G__8327__delegate = function(x, y, more) {
      while(true) {
        if(x < y) {
          if(cljs.core.next.call(null, more)) {
            var G__8328 = y;
            var G__8329 = cljs.core.first.call(null, more);
            var G__8330 = cljs.core.next.call(null, more);
            x = G__8328;
            y = G__8329;
            more = G__8330;
            continue
          }else {
            return y < cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__8327 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8327__delegate.call(this, x, y, more)
    };
    G__8327.cljs$lang$maxFixedArity = 2;
    G__8327.cljs$lang$applyTo = function(arglist__8331) {
      var x = cljs.core.first(arglist__8331);
      var y = cljs.core.first(cljs.core.next(arglist__8331));
      var more = cljs.core.rest(cljs.core.next(arglist__8331));
      return G__8327__delegate(x, y, more)
    };
    G__8327.cljs$lang$arity$variadic = G__8327__delegate;
    return G__8327
  }();
  _LT_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _LT___1.call(this, x);
      case 2:
        return _LT___2.call(this, x, y);
      default:
        return _LT___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _LT_.cljs$lang$maxFixedArity = 2;
  _LT_.cljs$lang$applyTo = _LT___3.cljs$lang$applyTo;
  _LT_.cljs$lang$arity$1 = _LT___1;
  _LT_.cljs$lang$arity$2 = _LT___2;
  _LT_.cljs$lang$arity$variadic = _LT___3.cljs$lang$arity$variadic;
  return _LT_
}();
cljs.core._LT__EQ_ = function() {
  var _LT__EQ_ = null;
  var _LT__EQ___1 = function(x) {
    return true
  };
  var _LT__EQ___2 = function(x, y) {
    return x <= y
  };
  var _LT__EQ___3 = function() {
    var G__8332__delegate = function(x, y, more) {
      while(true) {
        if(x <= y) {
          if(cljs.core.next.call(null, more)) {
            var G__8333 = y;
            var G__8334 = cljs.core.first.call(null, more);
            var G__8335 = cljs.core.next.call(null, more);
            x = G__8333;
            y = G__8334;
            more = G__8335;
            continue
          }else {
            return y <= cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__8332 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8332__delegate.call(this, x, y, more)
    };
    G__8332.cljs$lang$maxFixedArity = 2;
    G__8332.cljs$lang$applyTo = function(arglist__8336) {
      var x = cljs.core.first(arglist__8336);
      var y = cljs.core.first(cljs.core.next(arglist__8336));
      var more = cljs.core.rest(cljs.core.next(arglist__8336));
      return G__8332__delegate(x, y, more)
    };
    G__8332.cljs$lang$arity$variadic = G__8332__delegate;
    return G__8332
  }();
  _LT__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _LT__EQ___1.call(this, x);
      case 2:
        return _LT__EQ___2.call(this, x, y);
      default:
        return _LT__EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _LT__EQ_.cljs$lang$maxFixedArity = 2;
  _LT__EQ_.cljs$lang$applyTo = _LT__EQ___3.cljs$lang$applyTo;
  _LT__EQ_.cljs$lang$arity$1 = _LT__EQ___1;
  _LT__EQ_.cljs$lang$arity$2 = _LT__EQ___2;
  _LT__EQ_.cljs$lang$arity$variadic = _LT__EQ___3.cljs$lang$arity$variadic;
  return _LT__EQ_
}();
cljs.core._GT_ = function() {
  var _GT_ = null;
  var _GT___1 = function(x) {
    return true
  };
  var _GT___2 = function(x, y) {
    return x > y
  };
  var _GT___3 = function() {
    var G__8337__delegate = function(x, y, more) {
      while(true) {
        if(x > y) {
          if(cljs.core.next.call(null, more)) {
            var G__8338 = y;
            var G__8339 = cljs.core.first.call(null, more);
            var G__8340 = cljs.core.next.call(null, more);
            x = G__8338;
            y = G__8339;
            more = G__8340;
            continue
          }else {
            return y > cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__8337 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8337__delegate.call(this, x, y, more)
    };
    G__8337.cljs$lang$maxFixedArity = 2;
    G__8337.cljs$lang$applyTo = function(arglist__8341) {
      var x = cljs.core.first(arglist__8341);
      var y = cljs.core.first(cljs.core.next(arglist__8341));
      var more = cljs.core.rest(cljs.core.next(arglist__8341));
      return G__8337__delegate(x, y, more)
    };
    G__8337.cljs$lang$arity$variadic = G__8337__delegate;
    return G__8337
  }();
  _GT_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _GT___1.call(this, x);
      case 2:
        return _GT___2.call(this, x, y);
      default:
        return _GT___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _GT_.cljs$lang$maxFixedArity = 2;
  _GT_.cljs$lang$applyTo = _GT___3.cljs$lang$applyTo;
  _GT_.cljs$lang$arity$1 = _GT___1;
  _GT_.cljs$lang$arity$2 = _GT___2;
  _GT_.cljs$lang$arity$variadic = _GT___3.cljs$lang$arity$variadic;
  return _GT_
}();
cljs.core._GT__EQ_ = function() {
  var _GT__EQ_ = null;
  var _GT__EQ___1 = function(x) {
    return true
  };
  var _GT__EQ___2 = function(x, y) {
    return x >= y
  };
  var _GT__EQ___3 = function() {
    var G__8342__delegate = function(x, y, more) {
      while(true) {
        if(x >= y) {
          if(cljs.core.next.call(null, more)) {
            var G__8343 = y;
            var G__8344 = cljs.core.first.call(null, more);
            var G__8345 = cljs.core.next.call(null, more);
            x = G__8343;
            y = G__8344;
            more = G__8345;
            continue
          }else {
            return y >= cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__8342 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8342__delegate.call(this, x, y, more)
    };
    G__8342.cljs$lang$maxFixedArity = 2;
    G__8342.cljs$lang$applyTo = function(arglist__8346) {
      var x = cljs.core.first(arglist__8346);
      var y = cljs.core.first(cljs.core.next(arglist__8346));
      var more = cljs.core.rest(cljs.core.next(arglist__8346));
      return G__8342__delegate(x, y, more)
    };
    G__8342.cljs$lang$arity$variadic = G__8342__delegate;
    return G__8342
  }();
  _GT__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _GT__EQ___1.call(this, x);
      case 2:
        return _GT__EQ___2.call(this, x, y);
      default:
        return _GT__EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _GT__EQ_.cljs$lang$maxFixedArity = 2;
  _GT__EQ_.cljs$lang$applyTo = _GT__EQ___3.cljs$lang$applyTo;
  _GT__EQ_.cljs$lang$arity$1 = _GT__EQ___1;
  _GT__EQ_.cljs$lang$arity$2 = _GT__EQ___2;
  _GT__EQ_.cljs$lang$arity$variadic = _GT__EQ___3.cljs$lang$arity$variadic;
  return _GT__EQ_
}();
cljs.core.dec = function dec(x) {
  return x - 1
};
cljs.core.max = function() {
  var max = null;
  var max__1 = function(x) {
    return x
  };
  var max__2 = function(x, y) {
    return x > y ? x : y
  };
  var max__3 = function() {
    var G__8347__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, max, x > y ? x : y, more)
    };
    var G__8347 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8347__delegate.call(this, x, y, more)
    };
    G__8347.cljs$lang$maxFixedArity = 2;
    G__8347.cljs$lang$applyTo = function(arglist__8348) {
      var x = cljs.core.first(arglist__8348);
      var y = cljs.core.first(cljs.core.next(arglist__8348));
      var more = cljs.core.rest(cljs.core.next(arglist__8348));
      return G__8347__delegate(x, y, more)
    };
    G__8347.cljs$lang$arity$variadic = G__8347__delegate;
    return G__8347
  }();
  max = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return max__1.call(this, x);
      case 2:
        return max__2.call(this, x, y);
      default:
        return max__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  max.cljs$lang$maxFixedArity = 2;
  max.cljs$lang$applyTo = max__3.cljs$lang$applyTo;
  max.cljs$lang$arity$1 = max__1;
  max.cljs$lang$arity$2 = max__2;
  max.cljs$lang$arity$variadic = max__3.cljs$lang$arity$variadic;
  return max
}();
cljs.core.min = function() {
  var min = null;
  var min__1 = function(x) {
    return x
  };
  var min__2 = function(x, y) {
    return x < y ? x : y
  };
  var min__3 = function() {
    var G__8349__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, min, x < y ? x : y, more)
    };
    var G__8349 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8349__delegate.call(this, x, y, more)
    };
    G__8349.cljs$lang$maxFixedArity = 2;
    G__8349.cljs$lang$applyTo = function(arglist__8350) {
      var x = cljs.core.first(arglist__8350);
      var y = cljs.core.first(cljs.core.next(arglist__8350));
      var more = cljs.core.rest(cljs.core.next(arglist__8350));
      return G__8349__delegate(x, y, more)
    };
    G__8349.cljs$lang$arity$variadic = G__8349__delegate;
    return G__8349
  }();
  min = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return min__1.call(this, x);
      case 2:
        return min__2.call(this, x, y);
      default:
        return min__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  min.cljs$lang$maxFixedArity = 2;
  min.cljs$lang$applyTo = min__3.cljs$lang$applyTo;
  min.cljs$lang$arity$1 = min__1;
  min.cljs$lang$arity$2 = min__2;
  min.cljs$lang$arity$variadic = min__3.cljs$lang$arity$variadic;
  return min
}();
cljs.core.fix = function fix(q) {
  if(q >= 0) {
    return Math.floor.call(null, q)
  }else {
    return Math.ceil.call(null, q)
  }
};
cljs.core.int$ = function int$(x) {
  return cljs.core.fix.call(null, x)
};
cljs.core.long$ = function long$(x) {
  return cljs.core.fix.call(null, x)
};
cljs.core.mod = function mod(n, d) {
  return n % d
};
cljs.core.quot = function quot(n, d) {
  var rem__8352 = n % d;
  return cljs.core.fix.call(null, (n - rem__8352) / d)
};
cljs.core.rem = function rem(n, d) {
  var q__8354 = cljs.core.quot.call(null, n, d);
  return n - d * q__8354
};
cljs.core.rand = function() {
  var rand = null;
  var rand__0 = function() {
    return Math.random.call(null)
  };
  var rand__1 = function(n) {
    return n * rand.call(null)
  };
  rand = function(n) {
    switch(arguments.length) {
      case 0:
        return rand__0.call(this);
      case 1:
        return rand__1.call(this, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  rand.cljs$lang$arity$0 = rand__0;
  rand.cljs$lang$arity$1 = rand__1;
  return rand
}();
cljs.core.rand_int = function rand_int(n) {
  return cljs.core.fix.call(null, cljs.core.rand.call(null, n))
};
cljs.core.bit_xor = function bit_xor(x, y) {
  return x ^ y
};
cljs.core.bit_and = function bit_and(x, y) {
  return x & y
};
cljs.core.bit_or = function bit_or(x, y) {
  return x | y
};
cljs.core.bit_and_not = function bit_and_not(x, y) {
  return x & ~y
};
cljs.core.bit_clear = function bit_clear(x, n) {
  return x & ~(1 << n)
};
cljs.core.bit_flip = function bit_flip(x, n) {
  return x ^ 1 << n
};
cljs.core.bit_not = function bit_not(x) {
  return~x
};
cljs.core.bit_set = function bit_set(x, n) {
  return x | 1 << n
};
cljs.core.bit_test = function bit_test(x, n) {
  return(x & 1 << n) != 0
};
cljs.core.bit_shift_left = function bit_shift_left(x, n) {
  return x << n
};
cljs.core.bit_shift_right = function bit_shift_right(x, n) {
  return x >> n
};
cljs.core.bit_shift_right_zero_fill = function bit_shift_right_zero_fill(x, n) {
  return x >>> n
};
cljs.core.bit_count = function bit_count(v) {
  var v__8357 = v - (v >> 1 & 1431655765);
  var v__8358 = (v__8357 & 858993459) + (v__8357 >> 2 & 858993459);
  return(v__8358 + (v__8358 >> 4) & 252645135) * 16843009 >> 24
};
cljs.core._EQ__EQ_ = function() {
  var _EQ__EQ_ = null;
  var _EQ__EQ___1 = function(x) {
    return true
  };
  var _EQ__EQ___2 = function(x, y) {
    return cljs.core._equiv.call(null, x, y)
  };
  var _EQ__EQ___3 = function() {
    var G__8359__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_EQ__EQ_.call(null, x, y))) {
          if(cljs.core.next.call(null, more)) {
            var G__8360 = y;
            var G__8361 = cljs.core.first.call(null, more);
            var G__8362 = cljs.core.next.call(null, more);
            x = G__8360;
            y = G__8361;
            more = G__8362;
            continue
          }else {
            return _EQ__EQ_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__8359 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8359__delegate.call(this, x, y, more)
    };
    G__8359.cljs$lang$maxFixedArity = 2;
    G__8359.cljs$lang$applyTo = function(arglist__8363) {
      var x = cljs.core.first(arglist__8363);
      var y = cljs.core.first(cljs.core.next(arglist__8363));
      var more = cljs.core.rest(cljs.core.next(arglist__8363));
      return G__8359__delegate(x, y, more)
    };
    G__8359.cljs$lang$arity$variadic = G__8359__delegate;
    return G__8359
  }();
  _EQ__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _EQ__EQ___1.call(this, x);
      case 2:
        return _EQ__EQ___2.call(this, x, y);
      default:
        return _EQ__EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _EQ__EQ_.cljs$lang$maxFixedArity = 2;
  _EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___3.cljs$lang$applyTo;
  _EQ__EQ_.cljs$lang$arity$1 = _EQ__EQ___1;
  _EQ__EQ_.cljs$lang$arity$2 = _EQ__EQ___2;
  _EQ__EQ_.cljs$lang$arity$variadic = _EQ__EQ___3.cljs$lang$arity$variadic;
  return _EQ__EQ_
}();
cljs.core.pos_QMARK_ = function pos_QMARK_(n) {
  return n > 0
};
cljs.core.zero_QMARK_ = function zero_QMARK_(n) {
  return n === 0
};
cljs.core.neg_QMARK_ = function neg_QMARK_(x) {
  return x < 0
};
cljs.core.nthnext = function nthnext(coll, n) {
  var n__8367 = n;
  var xs__8368 = cljs.core.seq.call(null, coll);
  while(true) {
    if(cljs.core.truth_(function() {
      var and__3822__auto____8369 = xs__8368;
      if(and__3822__auto____8369) {
        return n__8367 > 0
      }else {
        return and__3822__auto____8369
      }
    }())) {
      var G__8370 = n__8367 - 1;
      var G__8371 = cljs.core.next.call(null, xs__8368);
      n__8367 = G__8370;
      xs__8368 = G__8371;
      continue
    }else {
      return xs__8368
    }
    break
  }
};
cljs.core.str_STAR_ = function() {
  var str_STAR_ = null;
  var str_STAR___0 = function() {
    return""
  };
  var str_STAR___1 = function(x) {
    if(x == null) {
      return""
    }else {
      if("\ufdd0'else") {
        return x.toString()
      }else {
        return null
      }
    }
  };
  var str_STAR___2 = function() {
    var G__8372__delegate = function(x, ys) {
      return function(sb, more) {
        while(true) {
          if(cljs.core.truth_(more)) {
            var G__8373 = sb.append(str_STAR_.call(null, cljs.core.first.call(null, more)));
            var G__8374 = cljs.core.next.call(null, more);
            sb = G__8373;
            more = G__8374;
            continue
          }else {
            return str_STAR_.call(null, sb)
          }
          break
        }
      }.call(null, new goog.string.StringBuffer(str_STAR_.call(null, x)), ys)
    };
    var G__8372 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__8372__delegate.call(this, x, ys)
    };
    G__8372.cljs$lang$maxFixedArity = 1;
    G__8372.cljs$lang$applyTo = function(arglist__8375) {
      var x = cljs.core.first(arglist__8375);
      var ys = cljs.core.rest(arglist__8375);
      return G__8372__delegate(x, ys)
    };
    G__8372.cljs$lang$arity$variadic = G__8372__delegate;
    return G__8372
  }();
  str_STAR_ = function(x, var_args) {
    var ys = var_args;
    switch(arguments.length) {
      case 0:
        return str_STAR___0.call(this);
      case 1:
        return str_STAR___1.call(this, x);
      default:
        return str_STAR___2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  str_STAR_.cljs$lang$maxFixedArity = 1;
  str_STAR_.cljs$lang$applyTo = str_STAR___2.cljs$lang$applyTo;
  str_STAR_.cljs$lang$arity$0 = str_STAR___0;
  str_STAR_.cljs$lang$arity$1 = str_STAR___1;
  str_STAR_.cljs$lang$arity$variadic = str_STAR___2.cljs$lang$arity$variadic;
  return str_STAR_
}();
cljs.core.str = function() {
  var str = null;
  var str__0 = function() {
    return""
  };
  var str__1 = function(x) {
    if(cljs.core.symbol_QMARK_.call(null, x)) {
      return x.substring(2, x.length)
    }else {
      if(cljs.core.keyword_QMARK_.call(null, x)) {
        return cljs.core.str_STAR_.call(null, ":", x.substring(2, x.length))
      }else {
        if(x == null) {
          return""
        }else {
          if("\ufdd0'else") {
            return x.toString()
          }else {
            return null
          }
        }
      }
    }
  };
  var str__2 = function() {
    var G__8376__delegate = function(x, ys) {
      return function(sb, more) {
        while(true) {
          if(cljs.core.truth_(more)) {
            var G__8377 = sb.append(str.call(null, cljs.core.first.call(null, more)));
            var G__8378 = cljs.core.next.call(null, more);
            sb = G__8377;
            more = G__8378;
            continue
          }else {
            return cljs.core.str_STAR_.call(null, sb)
          }
          break
        }
      }.call(null, new goog.string.StringBuffer(str.call(null, x)), ys)
    };
    var G__8376 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__8376__delegate.call(this, x, ys)
    };
    G__8376.cljs$lang$maxFixedArity = 1;
    G__8376.cljs$lang$applyTo = function(arglist__8379) {
      var x = cljs.core.first(arglist__8379);
      var ys = cljs.core.rest(arglist__8379);
      return G__8376__delegate(x, ys)
    };
    G__8376.cljs$lang$arity$variadic = G__8376__delegate;
    return G__8376
  }();
  str = function(x, var_args) {
    var ys = var_args;
    switch(arguments.length) {
      case 0:
        return str__0.call(this);
      case 1:
        return str__1.call(this, x);
      default:
        return str__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  str.cljs$lang$maxFixedArity = 1;
  str.cljs$lang$applyTo = str__2.cljs$lang$applyTo;
  str.cljs$lang$arity$0 = str__0;
  str.cljs$lang$arity$1 = str__1;
  str.cljs$lang$arity$variadic = str__2.cljs$lang$arity$variadic;
  return str
}();
cljs.core.subs = function() {
  var subs = null;
  var subs__2 = function(s, start) {
    return s.substring(start)
  };
  var subs__3 = function(s, start, end) {
    return s.substring(start, end)
  };
  subs = function(s, start, end) {
    switch(arguments.length) {
      case 2:
        return subs__2.call(this, s, start);
      case 3:
        return subs__3.call(this, s, start, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  subs.cljs$lang$arity$2 = subs__2;
  subs.cljs$lang$arity$3 = subs__3;
  return subs
}();
cljs.core.format = function() {
  var format__delegate = function(fmt, args) {
    return cljs.core.apply.call(null, goog.string.format, fmt, args)
  };
  var format = function(fmt, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return format__delegate.call(this, fmt, args)
  };
  format.cljs$lang$maxFixedArity = 1;
  format.cljs$lang$applyTo = function(arglist__8380) {
    var fmt = cljs.core.first(arglist__8380);
    var args = cljs.core.rest(arglist__8380);
    return format__delegate(fmt, args)
  };
  format.cljs$lang$arity$variadic = format__delegate;
  return format
}();
cljs.core.symbol = function() {
  var symbol = null;
  var symbol__1 = function(name) {
    if(cljs.core.symbol_QMARK_.call(null, name)) {
      name
    }else {
      if(cljs.core.keyword_QMARK_.call(null, name)) {
        cljs.core.str_STAR_.call(null, "\ufdd1", "'", cljs.core.subs.call(null, name, 2))
      }else {
      }
    }
    return cljs.core.str_STAR_.call(null, "\ufdd1", "'", name)
  };
  var symbol__2 = function(ns, name) {
    return symbol.call(null, cljs.core.str_STAR_.call(null, ns, "/", name))
  };
  symbol = function(ns, name) {
    switch(arguments.length) {
      case 1:
        return symbol__1.call(this, ns);
      case 2:
        return symbol__2.call(this, ns, name)
    }
    throw"Invalid arity: " + arguments.length;
  };
  symbol.cljs$lang$arity$1 = symbol__1;
  symbol.cljs$lang$arity$2 = symbol__2;
  return symbol
}();
cljs.core.keyword = function() {
  var keyword = null;
  var keyword__1 = function(name) {
    if(cljs.core.keyword_QMARK_.call(null, name)) {
      return name
    }else {
      if(cljs.core.symbol_QMARK_.call(null, name)) {
        return cljs.core.str_STAR_.call(null, "\ufdd0", "'", cljs.core.subs.call(null, name, 2))
      }else {
        if("\ufdd0'else") {
          return cljs.core.str_STAR_.call(null, "\ufdd0", "'", name)
        }else {
          return null
        }
      }
    }
  };
  var keyword__2 = function(ns, name) {
    return keyword.call(null, cljs.core.str_STAR_.call(null, ns, "/", name))
  };
  keyword = function(ns, name) {
    switch(arguments.length) {
      case 1:
        return keyword__1.call(this, ns);
      case 2:
        return keyword__2.call(this, ns, name)
    }
    throw"Invalid arity: " + arguments.length;
  };
  keyword.cljs$lang$arity$1 = keyword__1;
  keyword.cljs$lang$arity$2 = keyword__2;
  return keyword
}();
cljs.core.equiv_sequential = function equiv_sequential(x, y) {
  return cljs.core.boolean$.call(null, cljs.core.sequential_QMARK_.call(null, y) ? function() {
    var xs__8383 = cljs.core.seq.call(null, x);
    var ys__8384 = cljs.core.seq.call(null, y);
    while(true) {
      if(xs__8383 == null) {
        return ys__8384 == null
      }else {
        if(ys__8384 == null) {
          return false
        }else {
          if(cljs.core._EQ_.call(null, cljs.core.first.call(null, xs__8383), cljs.core.first.call(null, ys__8384))) {
            var G__8385 = cljs.core.next.call(null, xs__8383);
            var G__8386 = cljs.core.next.call(null, ys__8384);
            xs__8383 = G__8385;
            ys__8384 = G__8386;
            continue
          }else {
            if("\ufdd0'else") {
              return false
            }else {
              return null
            }
          }
        }
      }
      break
    }
  }() : null)
};
cljs.core.hash_combine = function hash_combine(seed, hash) {
  return seed ^ hash + 2654435769 + (seed << 6) + (seed >> 2)
};
cljs.core.hash_coll = function hash_coll(coll) {
  return cljs.core.reduce.call(null, function(p1__8387_SHARP_, p2__8388_SHARP_) {
    return cljs.core.hash_combine.call(null, p1__8387_SHARP_, cljs.core.hash.call(null, p2__8388_SHARP_, false))
  }, cljs.core.hash.call(null, cljs.core.first.call(null, coll), false), cljs.core.next.call(null, coll))
};
cljs.core.hash_imap = function hash_imap(m) {
  var h__8392 = 0;
  var s__8393 = cljs.core.seq.call(null, m);
  while(true) {
    if(s__8393) {
      var e__8394 = cljs.core.first.call(null, s__8393);
      var G__8395 = (h__8392 + (cljs.core.hash.call(null, cljs.core.key.call(null, e__8394)) ^ cljs.core.hash.call(null, cljs.core.val.call(null, e__8394)))) % 4503599627370496;
      var G__8396 = cljs.core.next.call(null, s__8393);
      h__8392 = G__8395;
      s__8393 = G__8396;
      continue
    }else {
      return h__8392
    }
    break
  }
};
cljs.core.hash_iset = function hash_iset(s) {
  var h__8400 = 0;
  var s__8401 = cljs.core.seq.call(null, s);
  while(true) {
    if(s__8401) {
      var e__8402 = cljs.core.first.call(null, s__8401);
      var G__8403 = (h__8400 + cljs.core.hash.call(null, e__8402)) % 4503599627370496;
      var G__8404 = cljs.core.next.call(null, s__8401);
      h__8400 = G__8403;
      s__8401 = G__8404;
      continue
    }else {
      return h__8400
    }
    break
  }
};
cljs.core.extend_object_BANG_ = function extend_object_BANG_(obj, fn_map) {
  var G__8425__8426 = cljs.core.seq.call(null, fn_map);
  if(G__8425__8426) {
    var G__8428__8430 = cljs.core.first.call(null, G__8425__8426);
    var vec__8429__8431 = G__8428__8430;
    var key_name__8432 = cljs.core.nth.call(null, vec__8429__8431, 0, null);
    var f__8433 = cljs.core.nth.call(null, vec__8429__8431, 1, null);
    var G__8425__8434 = G__8425__8426;
    var G__8428__8435 = G__8428__8430;
    var G__8425__8436 = G__8425__8434;
    while(true) {
      var vec__8437__8438 = G__8428__8435;
      var key_name__8439 = cljs.core.nth.call(null, vec__8437__8438, 0, null);
      var f__8440 = cljs.core.nth.call(null, vec__8437__8438, 1, null);
      var G__8425__8441 = G__8425__8436;
      var str_name__8442 = cljs.core.name.call(null, key_name__8439);
      obj[str_name__8442] = f__8440;
      var temp__3974__auto____8443 = cljs.core.next.call(null, G__8425__8441);
      if(temp__3974__auto____8443) {
        var G__8425__8444 = temp__3974__auto____8443;
        var G__8445 = cljs.core.first.call(null, G__8425__8444);
        var G__8446 = G__8425__8444;
        G__8428__8435 = G__8445;
        G__8425__8436 = G__8446;
        continue
      }else {
      }
      break
    }
  }else {
  }
  return obj
};
cljs.core.List = function(meta, first, rest, count, __hash) {
  this.meta = meta;
  this.first = first;
  this.rest = rest;
  this.count = count;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413358
};
cljs.core.List.cljs$lang$type = true;
cljs.core.List.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/List")
};
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8447 = this;
  var h__2192__auto____8448 = this__8447.__hash;
  if(!(h__2192__auto____8448 == null)) {
    return h__2192__auto____8448
  }else {
    var h__2192__auto____8449 = cljs.core.hash_coll.call(null, coll);
    this__8447.__hash = h__2192__auto____8449;
    return h__2192__auto____8449
  }
};
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__8450 = this;
  if(this__8450.count === 1) {
    return null
  }else {
    return this__8450.rest
  }
};
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8451 = this;
  return new cljs.core.List(this__8451.meta, o, coll, this__8451.count + 1, null)
};
cljs.core.List.prototype.toString = function() {
  var this__8452 = this;
  var this__8453 = this;
  return cljs.core.pr_str.call(null, this__8453)
};
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8454 = this;
  return coll
};
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8455 = this;
  return this__8455.count
};
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8456 = this;
  return this__8456.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8457 = this;
  return coll.cljs$core$ISeq$_rest$arity$1(coll)
};
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8458 = this;
  return this__8458.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8459 = this;
  if(this__8459.count === 1) {
    return cljs.core.List.EMPTY
  }else {
    return this__8459.rest
  }
};
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8460 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8461 = this;
  return new cljs.core.List(meta, this__8461.first, this__8461.rest, this__8461.count, this__8461.__hash)
};
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8462 = this;
  return this__8462.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8463 = this;
  return cljs.core.List.EMPTY
};
cljs.core.List;
cljs.core.EmptyList = function(meta) {
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413326
};
cljs.core.EmptyList.cljs$lang$type = true;
cljs.core.EmptyList.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/EmptyList")
};
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8464 = this;
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__8465 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8466 = this;
  return new cljs.core.List(this__8466.meta, o, null, 1, null)
};
cljs.core.EmptyList.prototype.toString = function() {
  var this__8467 = this;
  var this__8468 = this;
  return cljs.core.pr_str.call(null, this__8468)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8469 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8470 = this;
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8471 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8472 = this;
  throw new Error("Can't pop empty list");
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8473 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8474 = this;
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8475 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8476 = this;
  return new cljs.core.EmptyList(meta)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8477 = this;
  return this__8477.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8478 = this;
  return coll
};
cljs.core.EmptyList;
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reversible_QMARK_ = function reversible_QMARK_(coll) {
  var G__8482__8483 = coll;
  if(G__8482__8483) {
    if(function() {
      var or__3824__auto____8484 = G__8482__8483.cljs$lang$protocol_mask$partition0$ & 134217728;
      if(or__3824__auto____8484) {
        return or__3824__auto____8484
      }else {
        return G__8482__8483.cljs$core$IReversible$
      }
    }()) {
      return true
    }else {
      if(!G__8482__8483.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReversible, G__8482__8483)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IReversible, G__8482__8483)
  }
};
cljs.core.rseq = function rseq(coll) {
  return cljs.core._rseq.call(null, coll)
};
cljs.core.reverse = function reverse(coll) {
  if(cljs.core.reversible_QMARK_.call(null, coll)) {
    return cljs.core.rseq.call(null, coll)
  }else {
    return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, coll)
  }
};
cljs.core.list = function() {
  var list = null;
  var list__0 = function() {
    return cljs.core.List.EMPTY
  };
  var list__1 = function(x) {
    return cljs.core.conj.call(null, cljs.core.List.EMPTY, x)
  };
  var list__2 = function(x, y) {
    return cljs.core.conj.call(null, list.call(null, y), x)
  };
  var list__3 = function(x, y, z) {
    return cljs.core.conj.call(null, list.call(null, y, z), x)
  };
  var list__4 = function() {
    var G__8485__delegate = function(x, y, z, items) {
      return cljs.core.conj.call(null, cljs.core.conj.call(null, cljs.core.conj.call(null, cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, cljs.core.reverse.call(null, items)), z), y), x)
    };
    var G__8485 = function(x, y, z, var_args) {
      var items = null;
      if(goog.isDef(var_args)) {
        items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__8485__delegate.call(this, x, y, z, items)
    };
    G__8485.cljs$lang$maxFixedArity = 3;
    G__8485.cljs$lang$applyTo = function(arglist__8486) {
      var x = cljs.core.first(arglist__8486);
      var y = cljs.core.first(cljs.core.next(arglist__8486));
      var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8486)));
      var items = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8486)));
      return G__8485__delegate(x, y, z, items)
    };
    G__8485.cljs$lang$arity$variadic = G__8485__delegate;
    return G__8485
  }();
  list = function(x, y, z, var_args) {
    var items = var_args;
    switch(arguments.length) {
      case 0:
        return list__0.call(this);
      case 1:
        return list__1.call(this, x);
      case 2:
        return list__2.call(this, x, y);
      case 3:
        return list__3.call(this, x, y, z);
      default:
        return list__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  list.cljs$lang$maxFixedArity = 3;
  list.cljs$lang$applyTo = list__4.cljs$lang$applyTo;
  list.cljs$lang$arity$0 = list__0;
  list.cljs$lang$arity$1 = list__1;
  list.cljs$lang$arity$2 = list__2;
  list.cljs$lang$arity$3 = list__3;
  list.cljs$lang$arity$variadic = list__4.cljs$lang$arity$variadic;
  return list
}();
cljs.core.Cons = function(meta, first, rest, __hash) {
  this.meta = meta;
  this.first = first;
  this.rest = rest;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65405164
};
cljs.core.Cons.cljs$lang$type = true;
cljs.core.Cons.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Cons")
};
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8487 = this;
  var h__2192__auto____8488 = this__8487.__hash;
  if(!(h__2192__auto____8488 == null)) {
    return h__2192__auto____8488
  }else {
    var h__2192__auto____8489 = cljs.core.hash_coll.call(null, coll);
    this__8487.__hash = h__2192__auto____8489;
    return h__2192__auto____8489
  }
};
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__8490 = this;
  if(this__8490.rest == null) {
    return null
  }else {
    return cljs.core._seq.call(null, this__8490.rest)
  }
};
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8491 = this;
  return new cljs.core.Cons(null, o, coll, this__8491.__hash)
};
cljs.core.Cons.prototype.toString = function() {
  var this__8492 = this;
  var this__8493 = this;
  return cljs.core.pr_str.call(null, this__8493)
};
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8494 = this;
  return coll
};
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8495 = this;
  return this__8495.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8496 = this;
  if(this__8496.rest == null) {
    return cljs.core.List.EMPTY
  }else {
    return this__8496.rest
  }
};
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8497 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8498 = this;
  return new cljs.core.Cons(meta, this__8498.first, this__8498.rest, this__8498.__hash)
};
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8499 = this;
  return this__8499.meta
};
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8500 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__8500.meta)
};
cljs.core.Cons;
cljs.core.cons = function cons(x, coll) {
  if(function() {
    var or__3824__auto____8505 = coll == null;
    if(or__3824__auto____8505) {
      return or__3824__auto____8505
    }else {
      var G__8506__8507 = coll;
      if(G__8506__8507) {
        if(function() {
          var or__3824__auto____8508 = G__8506__8507.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____8508) {
            return or__3824__auto____8508
          }else {
            return G__8506__8507.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__8506__8507.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__8506__8507)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__8506__8507)
      }
    }
  }()) {
    return new cljs.core.Cons(null, x, coll, null)
  }else {
    return new cljs.core.Cons(null, x, cljs.core.seq.call(null, coll), null)
  }
};
cljs.core.list_QMARK_ = function list_QMARK_(x) {
  var G__8512__8513 = x;
  if(G__8512__8513) {
    if(function() {
      var or__3824__auto____8514 = G__8512__8513.cljs$lang$protocol_mask$partition0$ & 33554432;
      if(or__3824__auto____8514) {
        return or__3824__auto____8514
      }else {
        return G__8512__8513.cljs$core$IList$
      }
    }()) {
      return true
    }else {
      if(!G__8512__8513.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IList, G__8512__8513)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IList, G__8512__8513)
  }
};
cljs.core.IReduce["string"] = true;
cljs.core._reduce["string"] = function() {
  var G__8515 = null;
  var G__8515__2 = function(string, f) {
    return cljs.core.ci_reduce.call(null, string, f)
  };
  var G__8515__3 = function(string, f, start) {
    return cljs.core.ci_reduce.call(null, string, f, start)
  };
  G__8515 = function(string, f, start) {
    switch(arguments.length) {
      case 2:
        return G__8515__2.call(this, string, f);
      case 3:
        return G__8515__3.call(this, string, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8515
}();
cljs.core.ILookup["string"] = true;
cljs.core._lookup["string"] = function() {
  var G__8516 = null;
  var G__8516__2 = function(string, k) {
    return cljs.core._nth.call(null, string, k)
  };
  var G__8516__3 = function(string, k, not_found) {
    return cljs.core._nth.call(null, string, k, not_found)
  };
  G__8516 = function(string, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8516__2.call(this, string, k);
      case 3:
        return G__8516__3.call(this, string, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8516
}();
cljs.core.IIndexed["string"] = true;
cljs.core._nth["string"] = function() {
  var G__8517 = null;
  var G__8517__2 = function(string, n) {
    if(n < cljs.core._count.call(null, string)) {
      return string.charAt(n)
    }else {
      return null
    }
  };
  var G__8517__3 = function(string, n, not_found) {
    if(n < cljs.core._count.call(null, string)) {
      return string.charAt(n)
    }else {
      return not_found
    }
  };
  G__8517 = function(string, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8517__2.call(this, string, n);
      case 3:
        return G__8517__3.call(this, string, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8517
}();
cljs.core.ICounted["string"] = true;
cljs.core._count["string"] = function(s) {
  return s.length
};
cljs.core.ISeqable["string"] = true;
cljs.core._seq["string"] = function(string) {
  return cljs.core.prim_seq.call(null, string, 0)
};
cljs.core.IHash["string"] = true;
cljs.core._hash["string"] = function(o) {
  return goog.string.hashCode(o)
};
cljs.core.Keyword = function(k) {
  this.k = k;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1
};
cljs.core.Keyword.cljs$lang$type = true;
cljs.core.Keyword.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Keyword")
};
cljs.core.Keyword.prototype.call = function() {
  var G__8529 = null;
  var G__8529__2 = function(this_sym8520, coll) {
    var this__8522 = this;
    var this_sym8520__8523 = this;
    var ___8524 = this_sym8520__8523;
    if(coll == null) {
      return null
    }else {
      var strobj__8525 = coll.strobj;
      if(strobj__8525 == null) {
        return cljs.core._lookup.call(null, coll, this__8522.k, null)
      }else {
        return strobj__8525[this__8522.k]
      }
    }
  };
  var G__8529__3 = function(this_sym8521, coll, not_found) {
    var this__8522 = this;
    var this_sym8521__8526 = this;
    var ___8527 = this_sym8521__8526;
    if(coll == null) {
      return not_found
    }else {
      return cljs.core._lookup.call(null, coll, this__8522.k, not_found)
    }
  };
  G__8529 = function(this_sym8521, coll, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8529__2.call(this, this_sym8521, coll);
      case 3:
        return G__8529__3.call(this, this_sym8521, coll, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8529
}();
cljs.core.Keyword.prototype.apply = function(this_sym8518, args8519) {
  var this__8528 = this;
  return this_sym8518.call.apply(this_sym8518, [this_sym8518].concat(args8519.slice()))
};
cljs.core.Keyword;
String.prototype.cljs$core$IFn$ = true;
String.prototype.call = function() {
  var G__8538 = null;
  var G__8538__2 = function(this_sym8532, coll) {
    var this_sym8532__8534 = this;
    var this__8535 = this_sym8532__8534;
    return cljs.core._lookup.call(null, coll, this__8535.toString(), null)
  };
  var G__8538__3 = function(this_sym8533, coll, not_found) {
    var this_sym8533__8536 = this;
    var this__8537 = this_sym8533__8536;
    return cljs.core._lookup.call(null, coll, this__8537.toString(), not_found)
  };
  G__8538 = function(this_sym8533, coll, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8538__2.call(this, this_sym8533, coll);
      case 3:
        return G__8538__3.call(this, this_sym8533, coll, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8538
}();
String.prototype.apply = function(this_sym8530, args8531) {
  return this_sym8530.call.apply(this_sym8530, [this_sym8530].concat(args8531.slice()))
};
String.prototype.apply = function(s, args) {
  if(cljs.core.count.call(null, args) < 2) {
    return cljs.core._lookup.call(null, args[0], s, null)
  }else {
    return cljs.core._lookup.call(null, args[0], s, args[1])
  }
};
cljs.core.lazy_seq_value = function lazy_seq_value(lazy_seq) {
  var x__8540 = lazy_seq.x;
  if(lazy_seq.realized) {
    return x__8540
  }else {
    lazy_seq.x = x__8540.call(null);
    lazy_seq.realized = true;
    return lazy_seq.x
  }
};
cljs.core.LazySeq = function(meta, realized, x, __hash) {
  this.meta = meta;
  this.realized = realized;
  this.x = x;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850700
};
cljs.core.LazySeq.cljs$lang$type = true;
cljs.core.LazySeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/LazySeq")
};
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8541 = this;
  var h__2192__auto____8542 = this__8541.__hash;
  if(!(h__2192__auto____8542 == null)) {
    return h__2192__auto____8542
  }else {
    var h__2192__auto____8543 = cljs.core.hash_coll.call(null, coll);
    this__8541.__hash = h__2192__auto____8543;
    return h__2192__auto____8543
  }
};
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__8544 = this;
  return cljs.core._seq.call(null, coll.cljs$core$ISeq$_rest$arity$1(coll))
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8545 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.LazySeq.prototype.toString = function() {
  var this__8546 = this;
  var this__8547 = this;
  return cljs.core.pr_str.call(null, this__8547)
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8548 = this;
  return cljs.core.seq.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8549 = this;
  return cljs.core.first.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8550 = this;
  return cljs.core.rest.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8551 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8552 = this;
  return new cljs.core.LazySeq(meta, this__8552.realized, this__8552.x, this__8552.__hash)
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8553 = this;
  return this__8553.meta
};
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8554 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__8554.meta)
};
cljs.core.LazySeq;
cljs.core.ChunkBuffer = function(buf, end) {
  this.buf = buf;
  this.end = end;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.ChunkBuffer.cljs$lang$type = true;
cljs.core.ChunkBuffer.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkBuffer")
};
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__8555 = this;
  return this__8555.end
};
cljs.core.ChunkBuffer.prototype.add = function(o) {
  var this__8556 = this;
  var ___8557 = this;
  this__8556.buf[this__8556.end] = o;
  return this__8556.end = this__8556.end + 1
};
cljs.core.ChunkBuffer.prototype.chunk = function(o) {
  var this__8558 = this;
  var ___8559 = this;
  var ret__8560 = new cljs.core.ArrayChunk(this__8558.buf, 0, this__8558.end);
  this__8558.buf = null;
  return ret__8560
};
cljs.core.ChunkBuffer;
cljs.core.chunk_buffer = function chunk_buffer(capacity) {
  return new cljs.core.ChunkBuffer(cljs.core.make_array.call(null, capacity), 0)
};
cljs.core.ArrayChunk = function(arr, off, end) {
  this.arr = arr;
  this.off = off;
  this.end = end;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 524306
};
cljs.core.ArrayChunk.cljs$lang$type = true;
cljs.core.ArrayChunk.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayChunk")
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__8561 = this;
  return cljs.core.ci_reduce.call(null, coll, f, this__8561.arr[this__8561.off], this__8561.off + 1)
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__8562 = this;
  return cljs.core.ci_reduce.call(null, coll, f, start, this__8562.off)
};
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = true;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = function(coll) {
  var this__8563 = this;
  if(this__8563.off === this__8563.end) {
    throw new Error("-drop-first of empty chunk");
  }else {
    return new cljs.core.ArrayChunk(this__8563.arr, this__8563.off + 1, this__8563.end)
  }
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, i) {
  var this__8564 = this;
  return this__8564.arr[this__8564.off + i]
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, i, not_found) {
  var this__8565 = this;
  if(function() {
    var and__3822__auto____8566 = i >= 0;
    if(and__3822__auto____8566) {
      return i < this__8565.end - this__8565.off
    }else {
      return and__3822__auto____8566
    }
  }()) {
    return this__8565.arr[this__8565.off + i]
  }else {
    return not_found
  }
};
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__8567 = this;
  return this__8567.end - this__8567.off
};
cljs.core.ArrayChunk;
cljs.core.array_chunk = function() {
  var array_chunk = null;
  var array_chunk__1 = function(arr) {
    return array_chunk.call(null, arr, 0, arr.length)
  };
  var array_chunk__2 = function(arr, off) {
    return array_chunk.call(null, arr, off, arr.length)
  };
  var array_chunk__3 = function(arr, off, end) {
    return new cljs.core.ArrayChunk(arr, off, end)
  };
  array_chunk = function(arr, off, end) {
    switch(arguments.length) {
      case 1:
        return array_chunk__1.call(this, arr);
      case 2:
        return array_chunk__2.call(this, arr, off);
      case 3:
        return array_chunk__3.call(this, arr, off, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  array_chunk.cljs$lang$arity$1 = array_chunk__1;
  array_chunk.cljs$lang$arity$2 = array_chunk__2;
  array_chunk.cljs$lang$arity$3 = array_chunk__3;
  return array_chunk
}();
cljs.core.ChunkedCons = function(chunk, more, meta) {
  this.chunk = chunk;
  this.more = more;
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 27656296
};
cljs.core.ChunkedCons.cljs$lang$type = true;
cljs.core.ChunkedCons.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkedCons")
};
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = function(this$, o) {
  var this__8568 = this;
  return cljs.core.cons.call(null, o, this$)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8569 = this;
  return coll
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8570 = this;
  return cljs.core._nth.call(null, this__8570.chunk, 0)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8571 = this;
  if(cljs.core._count.call(null, this__8571.chunk) > 1) {
    return new cljs.core.ChunkedCons(cljs.core._drop_first.call(null, this__8571.chunk), this__8571.more, this__8571.meta)
  }else {
    if(this__8571.more == null) {
      return cljs.core.List.EMPTY
    }else {
      return this__8571.more
    }
  }
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function(coll) {
  var this__8572 = this;
  if(this__8572.more == null) {
    return null
  }else {
    return this__8572.more
  }
};
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8573 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, m) {
  var this__8574 = this;
  return new cljs.core.ChunkedCons(this__8574.chunk, this__8574.more, m)
};
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8575 = this;
  return this__8575.meta
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function(coll) {
  var this__8576 = this;
  return this__8576.chunk
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function(coll) {
  var this__8577 = this;
  if(this__8577.more == null) {
    return cljs.core.List.EMPTY
  }else {
    return this__8577.more
  }
};
cljs.core.ChunkedCons;
cljs.core.chunk_cons = function chunk_cons(chunk, rest) {
  if(cljs.core._count.call(null, chunk) === 0) {
    return rest
  }else {
    return new cljs.core.ChunkedCons(chunk, rest, null)
  }
};
cljs.core.chunk_append = function chunk_append(b, x) {
  return b.add(x)
};
cljs.core.chunk = function chunk(b) {
  return b.chunk()
};
cljs.core.chunk_first = function chunk_first(s) {
  return cljs.core._chunked_first.call(null, s)
};
cljs.core.chunk_rest = function chunk_rest(s) {
  return cljs.core._chunked_rest.call(null, s)
};
cljs.core.chunk_next = function chunk_next(s) {
  if(function() {
    var G__8581__8582 = s;
    if(G__8581__8582) {
      if(cljs.core.truth_(function() {
        var or__3824__auto____8583 = null;
        if(cljs.core.truth_(or__3824__auto____8583)) {
          return or__3824__auto____8583
        }else {
          return G__8581__8582.cljs$core$IChunkedNext$
        }
      }())) {
        return true
      }else {
        if(!G__8581__8582.cljs$lang$protocol_mask$partition$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedNext, G__8581__8582)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedNext, G__8581__8582)
    }
  }()) {
    return cljs.core._chunked_next.call(null, s)
  }else {
    return cljs.core.seq.call(null, cljs.core._chunked_rest.call(null, s))
  }
};
cljs.core.to_array = function to_array(s) {
  var ary__8586 = [];
  var s__8587 = s;
  while(true) {
    if(cljs.core.seq.call(null, s__8587)) {
      ary__8586.push(cljs.core.first.call(null, s__8587));
      var G__8588 = cljs.core.next.call(null, s__8587);
      s__8587 = G__8588;
      continue
    }else {
      return ary__8586
    }
    break
  }
};
cljs.core.to_array_2d = function to_array_2d(coll) {
  var ret__8592 = cljs.core.make_array.call(null, cljs.core.count.call(null, coll));
  var i__8593 = 0;
  var xs__8594 = cljs.core.seq.call(null, coll);
  while(true) {
    if(xs__8594) {
      ret__8592[i__8593] = cljs.core.to_array.call(null, cljs.core.first.call(null, xs__8594));
      var G__8595 = i__8593 + 1;
      var G__8596 = cljs.core.next.call(null, xs__8594);
      i__8593 = G__8595;
      xs__8594 = G__8596;
      continue
    }else {
    }
    break
  }
  return ret__8592
};
cljs.core.long_array = function() {
  var long_array = null;
  var long_array__1 = function(size_or_seq) {
    if(cljs.core.number_QMARK_.call(null, size_or_seq)) {
      return long_array.call(null, size_or_seq, null)
    }else {
      if(cljs.core.seq_QMARK_.call(null, size_or_seq)) {
        return cljs.core.into_array.call(null, size_or_seq)
      }else {
        if("\ufdd0'else") {
          throw new Error("long-array called with something other than size or ISeq");
        }else {
          return null
        }
      }
    }
  };
  var long_array__2 = function(size, init_val_or_seq) {
    var a__8604 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__8605 = cljs.core.seq.call(null, init_val_or_seq);
      var i__8606 = 0;
      var s__8607 = s__8605;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____8608 = s__8607;
          if(and__3822__auto____8608) {
            return i__8606 < size
          }else {
            return and__3822__auto____8608
          }
        }())) {
          a__8604[i__8606] = cljs.core.first.call(null, s__8607);
          var G__8611 = i__8606 + 1;
          var G__8612 = cljs.core.next.call(null, s__8607);
          i__8606 = G__8611;
          s__8607 = G__8612;
          continue
        }else {
          return a__8604
        }
        break
      }
    }else {
      var n__2527__auto____8609 = size;
      var i__8610 = 0;
      while(true) {
        if(i__8610 < n__2527__auto____8609) {
          a__8604[i__8610] = init_val_or_seq;
          var G__8613 = i__8610 + 1;
          i__8610 = G__8613;
          continue
        }else {
        }
        break
      }
      return a__8604
    }
  };
  long_array = function(size, init_val_or_seq) {
    switch(arguments.length) {
      case 1:
        return long_array__1.call(this, size);
      case 2:
        return long_array__2.call(this, size, init_val_or_seq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  long_array.cljs$lang$arity$1 = long_array__1;
  long_array.cljs$lang$arity$2 = long_array__2;
  return long_array
}();
cljs.core.double_array = function() {
  var double_array = null;
  var double_array__1 = function(size_or_seq) {
    if(cljs.core.number_QMARK_.call(null, size_or_seq)) {
      return double_array.call(null, size_or_seq, null)
    }else {
      if(cljs.core.seq_QMARK_.call(null, size_or_seq)) {
        return cljs.core.into_array.call(null, size_or_seq)
      }else {
        if("\ufdd0'else") {
          throw new Error("double-array called with something other than size or ISeq");
        }else {
          return null
        }
      }
    }
  };
  var double_array__2 = function(size, init_val_or_seq) {
    var a__8621 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__8622 = cljs.core.seq.call(null, init_val_or_seq);
      var i__8623 = 0;
      var s__8624 = s__8622;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____8625 = s__8624;
          if(and__3822__auto____8625) {
            return i__8623 < size
          }else {
            return and__3822__auto____8625
          }
        }())) {
          a__8621[i__8623] = cljs.core.first.call(null, s__8624);
          var G__8628 = i__8623 + 1;
          var G__8629 = cljs.core.next.call(null, s__8624);
          i__8623 = G__8628;
          s__8624 = G__8629;
          continue
        }else {
          return a__8621
        }
        break
      }
    }else {
      var n__2527__auto____8626 = size;
      var i__8627 = 0;
      while(true) {
        if(i__8627 < n__2527__auto____8626) {
          a__8621[i__8627] = init_val_or_seq;
          var G__8630 = i__8627 + 1;
          i__8627 = G__8630;
          continue
        }else {
        }
        break
      }
      return a__8621
    }
  };
  double_array = function(size, init_val_or_seq) {
    switch(arguments.length) {
      case 1:
        return double_array__1.call(this, size);
      case 2:
        return double_array__2.call(this, size, init_val_or_seq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  double_array.cljs$lang$arity$1 = double_array__1;
  double_array.cljs$lang$arity$2 = double_array__2;
  return double_array
}();
cljs.core.object_array = function() {
  var object_array = null;
  var object_array__1 = function(size_or_seq) {
    if(cljs.core.number_QMARK_.call(null, size_or_seq)) {
      return object_array.call(null, size_or_seq, null)
    }else {
      if(cljs.core.seq_QMARK_.call(null, size_or_seq)) {
        return cljs.core.into_array.call(null, size_or_seq)
      }else {
        if("\ufdd0'else") {
          throw new Error("object-array called with something other than size or ISeq");
        }else {
          return null
        }
      }
    }
  };
  var object_array__2 = function(size, init_val_or_seq) {
    var a__8638 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__8639 = cljs.core.seq.call(null, init_val_or_seq);
      var i__8640 = 0;
      var s__8641 = s__8639;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____8642 = s__8641;
          if(and__3822__auto____8642) {
            return i__8640 < size
          }else {
            return and__3822__auto____8642
          }
        }())) {
          a__8638[i__8640] = cljs.core.first.call(null, s__8641);
          var G__8645 = i__8640 + 1;
          var G__8646 = cljs.core.next.call(null, s__8641);
          i__8640 = G__8645;
          s__8641 = G__8646;
          continue
        }else {
          return a__8638
        }
        break
      }
    }else {
      var n__2527__auto____8643 = size;
      var i__8644 = 0;
      while(true) {
        if(i__8644 < n__2527__auto____8643) {
          a__8638[i__8644] = init_val_or_seq;
          var G__8647 = i__8644 + 1;
          i__8644 = G__8647;
          continue
        }else {
        }
        break
      }
      return a__8638
    }
  };
  object_array = function(size, init_val_or_seq) {
    switch(arguments.length) {
      case 1:
        return object_array__1.call(this, size);
      case 2:
        return object_array__2.call(this, size, init_val_or_seq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  object_array.cljs$lang$arity$1 = object_array__1;
  object_array.cljs$lang$arity$2 = object_array__2;
  return object_array
}();
cljs.core.bounded_count = function bounded_count(s, n) {
  if(cljs.core.counted_QMARK_.call(null, s)) {
    return cljs.core.count.call(null, s)
  }else {
    var s__8652 = s;
    var i__8653 = n;
    var sum__8654 = 0;
    while(true) {
      if(cljs.core.truth_(function() {
        var and__3822__auto____8655 = i__8653 > 0;
        if(and__3822__auto____8655) {
          return cljs.core.seq.call(null, s__8652)
        }else {
          return and__3822__auto____8655
        }
      }())) {
        var G__8656 = cljs.core.next.call(null, s__8652);
        var G__8657 = i__8653 - 1;
        var G__8658 = sum__8654 + 1;
        s__8652 = G__8656;
        i__8653 = G__8657;
        sum__8654 = G__8658;
        continue
      }else {
        return sum__8654
      }
      break
    }
  }
};
cljs.core.spread = function spread(arglist) {
  if(arglist == null) {
    return null
  }else {
    if(cljs.core.next.call(null, arglist) == null) {
      return cljs.core.seq.call(null, cljs.core.first.call(null, arglist))
    }else {
      if("\ufdd0'else") {
        return cljs.core.cons.call(null, cljs.core.first.call(null, arglist), spread.call(null, cljs.core.next.call(null, arglist)))
      }else {
        return null
      }
    }
  }
};
cljs.core.concat = function() {
  var concat = null;
  var concat__0 = function() {
    return new cljs.core.LazySeq(null, false, function() {
      return null
    }, null)
  };
  var concat__1 = function(x) {
    return new cljs.core.LazySeq(null, false, function() {
      return x
    }, null)
  };
  var concat__2 = function(x, y) {
    return new cljs.core.LazySeq(null, false, function() {
      var s__8663 = cljs.core.seq.call(null, x);
      if(s__8663) {
        if(cljs.core.chunked_seq_QMARK_.call(null, s__8663)) {
          return cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, s__8663), concat.call(null, cljs.core.chunk_rest.call(null, s__8663), y))
        }else {
          return cljs.core.cons.call(null, cljs.core.first.call(null, s__8663), concat.call(null, cljs.core.rest.call(null, s__8663), y))
        }
      }else {
        return y
      }
    }, null)
  };
  var concat__3 = function() {
    var G__8667__delegate = function(x, y, zs) {
      var cat__8666 = function cat(xys, zs) {
        return new cljs.core.LazySeq(null, false, function() {
          var xys__8665 = cljs.core.seq.call(null, xys);
          if(xys__8665) {
            if(cljs.core.chunked_seq_QMARK_.call(null, xys__8665)) {
              return cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, xys__8665), cat.call(null, cljs.core.chunk_rest.call(null, xys__8665), zs))
            }else {
              return cljs.core.cons.call(null, cljs.core.first.call(null, xys__8665), cat.call(null, cljs.core.rest.call(null, xys__8665), zs))
            }
          }else {
            if(cljs.core.truth_(zs)) {
              return cat.call(null, cljs.core.first.call(null, zs), cljs.core.next.call(null, zs))
            }else {
              return null
            }
          }
        }, null)
      };
      return cat__8666.call(null, concat.call(null, x, y), zs)
    };
    var G__8667 = function(x, y, var_args) {
      var zs = null;
      if(goog.isDef(var_args)) {
        zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8667__delegate.call(this, x, y, zs)
    };
    G__8667.cljs$lang$maxFixedArity = 2;
    G__8667.cljs$lang$applyTo = function(arglist__8668) {
      var x = cljs.core.first(arglist__8668);
      var y = cljs.core.first(cljs.core.next(arglist__8668));
      var zs = cljs.core.rest(cljs.core.next(arglist__8668));
      return G__8667__delegate(x, y, zs)
    };
    G__8667.cljs$lang$arity$variadic = G__8667__delegate;
    return G__8667
  }();
  concat = function(x, y, var_args) {
    var zs = var_args;
    switch(arguments.length) {
      case 0:
        return concat__0.call(this);
      case 1:
        return concat__1.call(this, x);
      case 2:
        return concat__2.call(this, x, y);
      default:
        return concat__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  concat.cljs$lang$maxFixedArity = 2;
  concat.cljs$lang$applyTo = concat__3.cljs$lang$applyTo;
  concat.cljs$lang$arity$0 = concat__0;
  concat.cljs$lang$arity$1 = concat__1;
  concat.cljs$lang$arity$2 = concat__2;
  concat.cljs$lang$arity$variadic = concat__3.cljs$lang$arity$variadic;
  return concat
}();
cljs.core.list_STAR_ = function() {
  var list_STAR_ = null;
  var list_STAR___1 = function(args) {
    return cljs.core.seq.call(null, args)
  };
  var list_STAR___2 = function(a, args) {
    return cljs.core.cons.call(null, a, args)
  };
  var list_STAR___3 = function(a, b, args) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, args))
  };
  var list_STAR___4 = function(a, b, c, args) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, args)))
  };
  var list_STAR___5 = function() {
    var G__8669__delegate = function(a, b, c, d, more) {
      return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, more)))))
    };
    var G__8669 = function(a, b, c, d, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__8669__delegate.call(this, a, b, c, d, more)
    };
    G__8669.cljs$lang$maxFixedArity = 4;
    G__8669.cljs$lang$applyTo = function(arglist__8670) {
      var a = cljs.core.first(arglist__8670);
      var b = cljs.core.first(cljs.core.next(arglist__8670));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8670)));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8670))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8670))));
      return G__8669__delegate(a, b, c, d, more)
    };
    G__8669.cljs$lang$arity$variadic = G__8669__delegate;
    return G__8669
  }();
  list_STAR_ = function(a, b, c, d, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return list_STAR___1.call(this, a);
      case 2:
        return list_STAR___2.call(this, a, b);
      case 3:
        return list_STAR___3.call(this, a, b, c);
      case 4:
        return list_STAR___4.call(this, a, b, c, d);
      default:
        return list_STAR___5.cljs$lang$arity$variadic(a, b, c, d, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  list_STAR_.cljs$lang$maxFixedArity = 4;
  list_STAR_.cljs$lang$applyTo = list_STAR___5.cljs$lang$applyTo;
  list_STAR_.cljs$lang$arity$1 = list_STAR___1;
  list_STAR_.cljs$lang$arity$2 = list_STAR___2;
  list_STAR_.cljs$lang$arity$3 = list_STAR___3;
  list_STAR_.cljs$lang$arity$4 = list_STAR___4;
  list_STAR_.cljs$lang$arity$variadic = list_STAR___5.cljs$lang$arity$variadic;
  return list_STAR_
}();
cljs.core.transient$ = function transient$(coll) {
  return cljs.core._as_transient.call(null, coll)
};
cljs.core.persistent_BANG_ = function persistent_BANG_(tcoll) {
  return cljs.core._persistent_BANG_.call(null, tcoll)
};
cljs.core.conj_BANG_ = function conj_BANG_(tcoll, val) {
  return cljs.core._conj_BANG_.call(null, tcoll, val)
};
cljs.core.assoc_BANG_ = function assoc_BANG_(tcoll, key, val) {
  return cljs.core._assoc_BANG_.call(null, tcoll, key, val)
};
cljs.core.dissoc_BANG_ = function dissoc_BANG_(tcoll, key) {
  return cljs.core._dissoc_BANG_.call(null, tcoll, key)
};
cljs.core.pop_BANG_ = function pop_BANG_(tcoll) {
  return cljs.core._pop_BANG_.call(null, tcoll)
};
cljs.core.disj_BANG_ = function disj_BANG_(tcoll, val) {
  return cljs.core._disjoin_BANG_.call(null, tcoll, val)
};
cljs.core.apply_to = function apply_to(f, argc, args) {
  var args__8712 = cljs.core.seq.call(null, args);
  if(argc === 0) {
    return f.call(null)
  }else {
    var a__8713 = cljs.core._first.call(null, args__8712);
    var args__8714 = cljs.core._rest.call(null, args__8712);
    if(argc === 1) {
      if(f.cljs$lang$arity$1) {
        return f.cljs$lang$arity$1(a__8713)
      }else {
        return f.call(null, a__8713)
      }
    }else {
      var b__8715 = cljs.core._first.call(null, args__8714);
      var args__8716 = cljs.core._rest.call(null, args__8714);
      if(argc === 2) {
        if(f.cljs$lang$arity$2) {
          return f.cljs$lang$arity$2(a__8713, b__8715)
        }else {
          return f.call(null, a__8713, b__8715)
        }
      }else {
        var c__8717 = cljs.core._first.call(null, args__8716);
        var args__8718 = cljs.core._rest.call(null, args__8716);
        if(argc === 3) {
          if(f.cljs$lang$arity$3) {
            return f.cljs$lang$arity$3(a__8713, b__8715, c__8717)
          }else {
            return f.call(null, a__8713, b__8715, c__8717)
          }
        }else {
          var d__8719 = cljs.core._first.call(null, args__8718);
          var args__8720 = cljs.core._rest.call(null, args__8718);
          if(argc === 4) {
            if(f.cljs$lang$arity$4) {
              return f.cljs$lang$arity$4(a__8713, b__8715, c__8717, d__8719)
            }else {
              return f.call(null, a__8713, b__8715, c__8717, d__8719)
            }
          }else {
            var e__8721 = cljs.core._first.call(null, args__8720);
            var args__8722 = cljs.core._rest.call(null, args__8720);
            if(argc === 5) {
              if(f.cljs$lang$arity$5) {
                return f.cljs$lang$arity$5(a__8713, b__8715, c__8717, d__8719, e__8721)
              }else {
                return f.call(null, a__8713, b__8715, c__8717, d__8719, e__8721)
              }
            }else {
              var f__8723 = cljs.core._first.call(null, args__8722);
              var args__8724 = cljs.core._rest.call(null, args__8722);
              if(argc === 6) {
                if(f__8723.cljs$lang$arity$6) {
                  return f__8723.cljs$lang$arity$6(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723)
                }else {
                  return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723)
                }
              }else {
                var g__8725 = cljs.core._first.call(null, args__8724);
                var args__8726 = cljs.core._rest.call(null, args__8724);
                if(argc === 7) {
                  if(f__8723.cljs$lang$arity$7) {
                    return f__8723.cljs$lang$arity$7(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725)
                  }else {
                    return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725)
                  }
                }else {
                  var h__8727 = cljs.core._first.call(null, args__8726);
                  var args__8728 = cljs.core._rest.call(null, args__8726);
                  if(argc === 8) {
                    if(f__8723.cljs$lang$arity$8) {
                      return f__8723.cljs$lang$arity$8(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727)
                    }else {
                      return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727)
                    }
                  }else {
                    var i__8729 = cljs.core._first.call(null, args__8728);
                    var args__8730 = cljs.core._rest.call(null, args__8728);
                    if(argc === 9) {
                      if(f__8723.cljs$lang$arity$9) {
                        return f__8723.cljs$lang$arity$9(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729)
                      }else {
                        return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729)
                      }
                    }else {
                      var j__8731 = cljs.core._first.call(null, args__8730);
                      var args__8732 = cljs.core._rest.call(null, args__8730);
                      if(argc === 10) {
                        if(f__8723.cljs$lang$arity$10) {
                          return f__8723.cljs$lang$arity$10(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731)
                        }else {
                          return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731)
                        }
                      }else {
                        var k__8733 = cljs.core._first.call(null, args__8732);
                        var args__8734 = cljs.core._rest.call(null, args__8732);
                        if(argc === 11) {
                          if(f__8723.cljs$lang$arity$11) {
                            return f__8723.cljs$lang$arity$11(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733)
                          }else {
                            return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733)
                          }
                        }else {
                          var l__8735 = cljs.core._first.call(null, args__8734);
                          var args__8736 = cljs.core._rest.call(null, args__8734);
                          if(argc === 12) {
                            if(f__8723.cljs$lang$arity$12) {
                              return f__8723.cljs$lang$arity$12(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735)
                            }else {
                              return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735)
                            }
                          }else {
                            var m__8737 = cljs.core._first.call(null, args__8736);
                            var args__8738 = cljs.core._rest.call(null, args__8736);
                            if(argc === 13) {
                              if(f__8723.cljs$lang$arity$13) {
                                return f__8723.cljs$lang$arity$13(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737)
                              }else {
                                return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737)
                              }
                            }else {
                              var n__8739 = cljs.core._first.call(null, args__8738);
                              var args__8740 = cljs.core._rest.call(null, args__8738);
                              if(argc === 14) {
                                if(f__8723.cljs$lang$arity$14) {
                                  return f__8723.cljs$lang$arity$14(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739)
                                }else {
                                  return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739)
                                }
                              }else {
                                var o__8741 = cljs.core._first.call(null, args__8740);
                                var args__8742 = cljs.core._rest.call(null, args__8740);
                                if(argc === 15) {
                                  if(f__8723.cljs$lang$arity$15) {
                                    return f__8723.cljs$lang$arity$15(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741)
                                  }else {
                                    return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741)
                                  }
                                }else {
                                  var p__8743 = cljs.core._first.call(null, args__8742);
                                  var args__8744 = cljs.core._rest.call(null, args__8742);
                                  if(argc === 16) {
                                    if(f__8723.cljs$lang$arity$16) {
                                      return f__8723.cljs$lang$arity$16(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741, p__8743)
                                    }else {
                                      return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741, p__8743)
                                    }
                                  }else {
                                    var q__8745 = cljs.core._first.call(null, args__8744);
                                    var args__8746 = cljs.core._rest.call(null, args__8744);
                                    if(argc === 17) {
                                      if(f__8723.cljs$lang$arity$17) {
                                        return f__8723.cljs$lang$arity$17(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741, p__8743, q__8745)
                                      }else {
                                        return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741, p__8743, q__8745)
                                      }
                                    }else {
                                      var r__8747 = cljs.core._first.call(null, args__8746);
                                      var args__8748 = cljs.core._rest.call(null, args__8746);
                                      if(argc === 18) {
                                        if(f__8723.cljs$lang$arity$18) {
                                          return f__8723.cljs$lang$arity$18(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741, p__8743, q__8745, r__8747)
                                        }else {
                                          return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741, p__8743, q__8745, r__8747)
                                        }
                                      }else {
                                        var s__8749 = cljs.core._first.call(null, args__8748);
                                        var args__8750 = cljs.core._rest.call(null, args__8748);
                                        if(argc === 19) {
                                          if(f__8723.cljs$lang$arity$19) {
                                            return f__8723.cljs$lang$arity$19(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741, p__8743, q__8745, r__8747, s__8749)
                                          }else {
                                            return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741, p__8743, q__8745, r__8747, s__8749)
                                          }
                                        }else {
                                          var t__8751 = cljs.core._first.call(null, args__8750);
                                          var args__8752 = cljs.core._rest.call(null, args__8750);
                                          if(argc === 20) {
                                            if(f__8723.cljs$lang$arity$20) {
                                              return f__8723.cljs$lang$arity$20(a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741, p__8743, q__8745, r__8747, s__8749, t__8751)
                                            }else {
                                              return f__8723.call(null, a__8713, b__8715, c__8717, d__8719, e__8721, f__8723, g__8725, h__8727, i__8729, j__8731, k__8733, l__8735, m__8737, n__8739, o__8741, p__8743, q__8745, r__8747, s__8749, t__8751)
                                            }
                                          }else {
                                            throw new Error("Only up to 20 arguments supported on functions");
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
cljs.core.apply = function() {
  var apply = null;
  var apply__2 = function(f, args) {
    var fixed_arity__8767 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__8768 = cljs.core.bounded_count.call(null, args, fixed_arity__8767 + 1);
      if(bc__8768 <= fixed_arity__8767) {
        return cljs.core.apply_to.call(null, f, bc__8768, args)
      }else {
        return f.cljs$lang$applyTo(args)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, args))
    }
  };
  var apply__3 = function(f, x, args) {
    var arglist__8769 = cljs.core.list_STAR_.call(null, x, args);
    var fixed_arity__8770 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__8771 = cljs.core.bounded_count.call(null, arglist__8769, fixed_arity__8770 + 1);
      if(bc__8771 <= fixed_arity__8770) {
        return cljs.core.apply_to.call(null, f, bc__8771, arglist__8769)
      }else {
        return f.cljs$lang$applyTo(arglist__8769)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__8769))
    }
  };
  var apply__4 = function(f, x, y, args) {
    var arglist__8772 = cljs.core.list_STAR_.call(null, x, y, args);
    var fixed_arity__8773 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__8774 = cljs.core.bounded_count.call(null, arglist__8772, fixed_arity__8773 + 1);
      if(bc__8774 <= fixed_arity__8773) {
        return cljs.core.apply_to.call(null, f, bc__8774, arglist__8772)
      }else {
        return f.cljs$lang$applyTo(arglist__8772)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__8772))
    }
  };
  var apply__5 = function(f, x, y, z, args) {
    var arglist__8775 = cljs.core.list_STAR_.call(null, x, y, z, args);
    var fixed_arity__8776 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__8777 = cljs.core.bounded_count.call(null, arglist__8775, fixed_arity__8776 + 1);
      if(bc__8777 <= fixed_arity__8776) {
        return cljs.core.apply_to.call(null, f, bc__8777, arglist__8775)
      }else {
        return f.cljs$lang$applyTo(arglist__8775)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__8775))
    }
  };
  var apply__6 = function() {
    var G__8781__delegate = function(f, a, b, c, d, args) {
      var arglist__8778 = cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, args)))));
      var fixed_arity__8779 = f.cljs$lang$maxFixedArity;
      if(cljs.core.truth_(f.cljs$lang$applyTo)) {
        var bc__8780 = cljs.core.bounded_count.call(null, arglist__8778, fixed_arity__8779 + 1);
        if(bc__8780 <= fixed_arity__8779) {
          return cljs.core.apply_to.call(null, f, bc__8780, arglist__8778)
        }else {
          return f.cljs$lang$applyTo(arglist__8778)
        }
      }else {
        return f.apply(f, cljs.core.to_array.call(null, arglist__8778))
      }
    };
    var G__8781 = function(f, a, b, c, d, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__8781__delegate.call(this, f, a, b, c, d, args)
    };
    G__8781.cljs$lang$maxFixedArity = 5;
    G__8781.cljs$lang$applyTo = function(arglist__8782) {
      var f = cljs.core.first(arglist__8782);
      var a = cljs.core.first(cljs.core.next(arglist__8782));
      var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8782)));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8782))));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8782)))));
      var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8782)))));
      return G__8781__delegate(f, a, b, c, d, args)
    };
    G__8781.cljs$lang$arity$variadic = G__8781__delegate;
    return G__8781
  }();
  apply = function(f, a, b, c, d, var_args) {
    var args = var_args;
    switch(arguments.length) {
      case 2:
        return apply__2.call(this, f, a);
      case 3:
        return apply__3.call(this, f, a, b);
      case 4:
        return apply__4.call(this, f, a, b, c);
      case 5:
        return apply__5.call(this, f, a, b, c, d);
      default:
        return apply__6.cljs$lang$arity$variadic(f, a, b, c, d, cljs.core.array_seq(arguments, 5))
    }
    throw"Invalid arity: " + arguments.length;
  };
  apply.cljs$lang$maxFixedArity = 5;
  apply.cljs$lang$applyTo = apply__6.cljs$lang$applyTo;
  apply.cljs$lang$arity$2 = apply__2;
  apply.cljs$lang$arity$3 = apply__3;
  apply.cljs$lang$arity$4 = apply__4;
  apply.cljs$lang$arity$5 = apply__5;
  apply.cljs$lang$arity$variadic = apply__6.cljs$lang$arity$variadic;
  return apply
}();
cljs.core.vary_meta = function() {
  var vary_meta__delegate = function(obj, f, args) {
    return cljs.core.with_meta.call(null, obj, cljs.core.apply.call(null, f, cljs.core.meta.call(null, obj), args))
  };
  var vary_meta = function(obj, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
    }
    return vary_meta__delegate.call(this, obj, f, args)
  };
  vary_meta.cljs$lang$maxFixedArity = 2;
  vary_meta.cljs$lang$applyTo = function(arglist__8783) {
    var obj = cljs.core.first(arglist__8783);
    var f = cljs.core.first(cljs.core.next(arglist__8783));
    var args = cljs.core.rest(cljs.core.next(arglist__8783));
    return vary_meta__delegate(obj, f, args)
  };
  vary_meta.cljs$lang$arity$variadic = vary_meta__delegate;
  return vary_meta
}();
cljs.core.not_EQ_ = function() {
  var not_EQ_ = null;
  var not_EQ___1 = function(x) {
    return false
  };
  var not_EQ___2 = function(x, y) {
    return!cljs.core._EQ_.call(null, x, y)
  };
  var not_EQ___3 = function() {
    var G__8784__delegate = function(x, y, more) {
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, x, y, more))
    };
    var G__8784 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8784__delegate.call(this, x, y, more)
    };
    G__8784.cljs$lang$maxFixedArity = 2;
    G__8784.cljs$lang$applyTo = function(arglist__8785) {
      var x = cljs.core.first(arglist__8785);
      var y = cljs.core.first(cljs.core.next(arglist__8785));
      var more = cljs.core.rest(cljs.core.next(arglist__8785));
      return G__8784__delegate(x, y, more)
    };
    G__8784.cljs$lang$arity$variadic = G__8784__delegate;
    return G__8784
  }();
  not_EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return not_EQ___1.call(this, x);
      case 2:
        return not_EQ___2.call(this, x, y);
      default:
        return not_EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  not_EQ_.cljs$lang$maxFixedArity = 2;
  not_EQ_.cljs$lang$applyTo = not_EQ___3.cljs$lang$applyTo;
  not_EQ_.cljs$lang$arity$1 = not_EQ___1;
  not_EQ_.cljs$lang$arity$2 = not_EQ___2;
  not_EQ_.cljs$lang$arity$variadic = not_EQ___3.cljs$lang$arity$variadic;
  return not_EQ_
}();
cljs.core.not_empty = function not_empty(coll) {
  if(cljs.core.seq.call(null, coll)) {
    return coll
  }else {
    return null
  }
};
cljs.core.every_QMARK_ = function every_QMARK_(pred, coll) {
  while(true) {
    if(cljs.core.seq.call(null, coll) == null) {
      return true
    }else {
      if(cljs.core.truth_(pred.call(null, cljs.core.first.call(null, coll)))) {
        var G__8786 = pred;
        var G__8787 = cljs.core.next.call(null, coll);
        pred = G__8786;
        coll = G__8787;
        continue
      }else {
        if("\ufdd0'else") {
          return false
        }else {
          return null
        }
      }
    }
    break
  }
};
cljs.core.not_every_QMARK_ = function not_every_QMARK_(pred, coll) {
  return!cljs.core.every_QMARK_.call(null, pred, coll)
};
cljs.core.some = function some(pred, coll) {
  while(true) {
    if(cljs.core.seq.call(null, coll)) {
      var or__3824__auto____8789 = pred.call(null, cljs.core.first.call(null, coll));
      if(cljs.core.truth_(or__3824__auto____8789)) {
        return or__3824__auto____8789
      }else {
        var G__8790 = pred;
        var G__8791 = cljs.core.next.call(null, coll);
        pred = G__8790;
        coll = G__8791;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.not_any_QMARK_ = function not_any_QMARK_(pred, coll) {
  return cljs.core.not.call(null, cljs.core.some.call(null, pred, coll))
};
cljs.core.even_QMARK_ = function even_QMARK_(n) {
  if(cljs.core.integer_QMARK_.call(null, n)) {
    return(n & 1) === 0
  }else {
    throw new Error([cljs.core.str("Argument must be an integer: "), cljs.core.str(n)].join(""));
  }
};
cljs.core.odd_QMARK_ = function odd_QMARK_(n) {
  return!cljs.core.even_QMARK_.call(null, n)
};
cljs.core.identity = function identity(x) {
  return x
};
cljs.core.complement = function complement(f) {
  return function() {
    var G__8792 = null;
    var G__8792__0 = function() {
      return cljs.core.not.call(null, f.call(null))
    };
    var G__8792__1 = function(x) {
      return cljs.core.not.call(null, f.call(null, x))
    };
    var G__8792__2 = function(x, y) {
      return cljs.core.not.call(null, f.call(null, x, y))
    };
    var G__8792__3 = function() {
      var G__8793__delegate = function(x, y, zs) {
        return cljs.core.not.call(null, cljs.core.apply.call(null, f, x, y, zs))
      };
      var G__8793 = function(x, y, var_args) {
        var zs = null;
        if(goog.isDef(var_args)) {
          zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
        }
        return G__8793__delegate.call(this, x, y, zs)
      };
      G__8793.cljs$lang$maxFixedArity = 2;
      G__8793.cljs$lang$applyTo = function(arglist__8794) {
        var x = cljs.core.first(arglist__8794);
        var y = cljs.core.first(cljs.core.next(arglist__8794));
        var zs = cljs.core.rest(cljs.core.next(arglist__8794));
        return G__8793__delegate(x, y, zs)
      };
      G__8793.cljs$lang$arity$variadic = G__8793__delegate;
      return G__8793
    }();
    G__8792 = function(x, y, var_args) {
      var zs = var_args;
      switch(arguments.length) {
        case 0:
          return G__8792__0.call(this);
        case 1:
          return G__8792__1.call(this, x);
        case 2:
          return G__8792__2.call(this, x, y);
        default:
          return G__8792__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
      }
      throw"Invalid arity: " + arguments.length;
    };
    G__8792.cljs$lang$maxFixedArity = 2;
    G__8792.cljs$lang$applyTo = G__8792__3.cljs$lang$applyTo;
    return G__8792
  }()
};
cljs.core.constantly = function constantly(x) {
  return function() {
    var G__8795__delegate = function(args) {
      return x
    };
    var G__8795 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__8795__delegate.call(this, args)
    };
    G__8795.cljs$lang$maxFixedArity = 0;
    G__8795.cljs$lang$applyTo = function(arglist__8796) {
      var args = cljs.core.seq(arglist__8796);
      return G__8795__delegate(args)
    };
    G__8795.cljs$lang$arity$variadic = G__8795__delegate;
    return G__8795
  }()
};
cljs.core.comp = function() {
  var comp = null;
  var comp__0 = function() {
    return cljs.core.identity
  };
  var comp__1 = function(f) {
    return f
  };
  var comp__2 = function(f, g) {
    return function() {
      var G__8803 = null;
      var G__8803__0 = function() {
        return f.call(null, g.call(null))
      };
      var G__8803__1 = function(x) {
        return f.call(null, g.call(null, x))
      };
      var G__8803__2 = function(x, y) {
        return f.call(null, g.call(null, x, y))
      };
      var G__8803__3 = function(x, y, z) {
        return f.call(null, g.call(null, x, y, z))
      };
      var G__8803__4 = function() {
        var G__8804__delegate = function(x, y, z, args) {
          return f.call(null, cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__8804 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8804__delegate.call(this, x, y, z, args)
        };
        G__8804.cljs$lang$maxFixedArity = 3;
        G__8804.cljs$lang$applyTo = function(arglist__8805) {
          var x = cljs.core.first(arglist__8805);
          var y = cljs.core.first(cljs.core.next(arglist__8805));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8805)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8805)));
          return G__8804__delegate(x, y, z, args)
        };
        G__8804.cljs$lang$arity$variadic = G__8804__delegate;
        return G__8804
      }();
      G__8803 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__8803__0.call(this);
          case 1:
            return G__8803__1.call(this, x);
          case 2:
            return G__8803__2.call(this, x, y);
          case 3:
            return G__8803__3.call(this, x, y, z);
          default:
            return G__8803__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__8803.cljs$lang$maxFixedArity = 3;
      G__8803.cljs$lang$applyTo = G__8803__4.cljs$lang$applyTo;
      return G__8803
    }()
  };
  var comp__3 = function(f, g, h) {
    return function() {
      var G__8806 = null;
      var G__8806__0 = function() {
        return f.call(null, g.call(null, h.call(null)))
      };
      var G__8806__1 = function(x) {
        return f.call(null, g.call(null, h.call(null, x)))
      };
      var G__8806__2 = function(x, y) {
        return f.call(null, g.call(null, h.call(null, x, y)))
      };
      var G__8806__3 = function(x, y, z) {
        return f.call(null, g.call(null, h.call(null, x, y, z)))
      };
      var G__8806__4 = function() {
        var G__8807__delegate = function(x, y, z, args) {
          return f.call(null, g.call(null, cljs.core.apply.call(null, h, x, y, z, args)))
        };
        var G__8807 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8807__delegate.call(this, x, y, z, args)
        };
        G__8807.cljs$lang$maxFixedArity = 3;
        G__8807.cljs$lang$applyTo = function(arglist__8808) {
          var x = cljs.core.first(arglist__8808);
          var y = cljs.core.first(cljs.core.next(arglist__8808));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8808)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8808)));
          return G__8807__delegate(x, y, z, args)
        };
        G__8807.cljs$lang$arity$variadic = G__8807__delegate;
        return G__8807
      }();
      G__8806 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__8806__0.call(this);
          case 1:
            return G__8806__1.call(this, x);
          case 2:
            return G__8806__2.call(this, x, y);
          case 3:
            return G__8806__3.call(this, x, y, z);
          default:
            return G__8806__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__8806.cljs$lang$maxFixedArity = 3;
      G__8806.cljs$lang$applyTo = G__8806__4.cljs$lang$applyTo;
      return G__8806
    }()
  };
  var comp__4 = function() {
    var G__8809__delegate = function(f1, f2, f3, fs) {
      var fs__8800 = cljs.core.reverse.call(null, cljs.core.list_STAR_.call(null, f1, f2, f3, fs));
      return function() {
        var G__8810__delegate = function(args) {
          var ret__8801 = cljs.core.apply.call(null, cljs.core.first.call(null, fs__8800), args);
          var fs__8802 = cljs.core.next.call(null, fs__8800);
          while(true) {
            if(fs__8802) {
              var G__8811 = cljs.core.first.call(null, fs__8802).call(null, ret__8801);
              var G__8812 = cljs.core.next.call(null, fs__8802);
              ret__8801 = G__8811;
              fs__8802 = G__8812;
              continue
            }else {
              return ret__8801
            }
            break
          }
        };
        var G__8810 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__8810__delegate.call(this, args)
        };
        G__8810.cljs$lang$maxFixedArity = 0;
        G__8810.cljs$lang$applyTo = function(arglist__8813) {
          var args = cljs.core.seq(arglist__8813);
          return G__8810__delegate(args)
        };
        G__8810.cljs$lang$arity$variadic = G__8810__delegate;
        return G__8810
      }()
    };
    var G__8809 = function(f1, f2, f3, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__8809__delegate.call(this, f1, f2, f3, fs)
    };
    G__8809.cljs$lang$maxFixedArity = 3;
    G__8809.cljs$lang$applyTo = function(arglist__8814) {
      var f1 = cljs.core.first(arglist__8814);
      var f2 = cljs.core.first(cljs.core.next(arglist__8814));
      var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8814)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8814)));
      return G__8809__delegate(f1, f2, f3, fs)
    };
    G__8809.cljs$lang$arity$variadic = G__8809__delegate;
    return G__8809
  }();
  comp = function(f1, f2, f3, var_args) {
    var fs = var_args;
    switch(arguments.length) {
      case 0:
        return comp__0.call(this);
      case 1:
        return comp__1.call(this, f1);
      case 2:
        return comp__2.call(this, f1, f2);
      case 3:
        return comp__3.call(this, f1, f2, f3);
      default:
        return comp__4.cljs$lang$arity$variadic(f1, f2, f3, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  comp.cljs$lang$maxFixedArity = 3;
  comp.cljs$lang$applyTo = comp__4.cljs$lang$applyTo;
  comp.cljs$lang$arity$0 = comp__0;
  comp.cljs$lang$arity$1 = comp__1;
  comp.cljs$lang$arity$2 = comp__2;
  comp.cljs$lang$arity$3 = comp__3;
  comp.cljs$lang$arity$variadic = comp__4.cljs$lang$arity$variadic;
  return comp
}();
cljs.core.partial = function() {
  var partial = null;
  var partial__2 = function(f, arg1) {
    return function() {
      var G__8815__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, args)
      };
      var G__8815 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__8815__delegate.call(this, args)
      };
      G__8815.cljs$lang$maxFixedArity = 0;
      G__8815.cljs$lang$applyTo = function(arglist__8816) {
        var args = cljs.core.seq(arglist__8816);
        return G__8815__delegate(args)
      };
      G__8815.cljs$lang$arity$variadic = G__8815__delegate;
      return G__8815
    }()
  };
  var partial__3 = function(f, arg1, arg2) {
    return function() {
      var G__8817__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, args)
      };
      var G__8817 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__8817__delegate.call(this, args)
      };
      G__8817.cljs$lang$maxFixedArity = 0;
      G__8817.cljs$lang$applyTo = function(arglist__8818) {
        var args = cljs.core.seq(arglist__8818);
        return G__8817__delegate(args)
      };
      G__8817.cljs$lang$arity$variadic = G__8817__delegate;
      return G__8817
    }()
  };
  var partial__4 = function(f, arg1, arg2, arg3) {
    return function() {
      var G__8819__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, arg3, args)
      };
      var G__8819 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__8819__delegate.call(this, args)
      };
      G__8819.cljs$lang$maxFixedArity = 0;
      G__8819.cljs$lang$applyTo = function(arglist__8820) {
        var args = cljs.core.seq(arglist__8820);
        return G__8819__delegate(args)
      };
      G__8819.cljs$lang$arity$variadic = G__8819__delegate;
      return G__8819
    }()
  };
  var partial__5 = function() {
    var G__8821__delegate = function(f, arg1, arg2, arg3, more) {
      return function() {
        var G__8822__delegate = function(args) {
          return cljs.core.apply.call(null, f, arg1, arg2, arg3, cljs.core.concat.call(null, more, args))
        };
        var G__8822 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__8822__delegate.call(this, args)
        };
        G__8822.cljs$lang$maxFixedArity = 0;
        G__8822.cljs$lang$applyTo = function(arglist__8823) {
          var args = cljs.core.seq(arglist__8823);
          return G__8822__delegate(args)
        };
        G__8822.cljs$lang$arity$variadic = G__8822__delegate;
        return G__8822
      }()
    };
    var G__8821 = function(f, arg1, arg2, arg3, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__8821__delegate.call(this, f, arg1, arg2, arg3, more)
    };
    G__8821.cljs$lang$maxFixedArity = 4;
    G__8821.cljs$lang$applyTo = function(arglist__8824) {
      var f = cljs.core.first(arglist__8824);
      var arg1 = cljs.core.first(cljs.core.next(arglist__8824));
      var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8824)));
      var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8824))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8824))));
      return G__8821__delegate(f, arg1, arg2, arg3, more)
    };
    G__8821.cljs$lang$arity$variadic = G__8821__delegate;
    return G__8821
  }();
  partial = function(f, arg1, arg2, arg3, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return partial__2.call(this, f, arg1);
      case 3:
        return partial__3.call(this, f, arg1, arg2);
      case 4:
        return partial__4.call(this, f, arg1, arg2, arg3);
      default:
        return partial__5.cljs$lang$arity$variadic(f, arg1, arg2, arg3, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  partial.cljs$lang$maxFixedArity = 4;
  partial.cljs$lang$applyTo = partial__5.cljs$lang$applyTo;
  partial.cljs$lang$arity$2 = partial__2;
  partial.cljs$lang$arity$3 = partial__3;
  partial.cljs$lang$arity$4 = partial__4;
  partial.cljs$lang$arity$variadic = partial__5.cljs$lang$arity$variadic;
  return partial
}();
cljs.core.fnil = function() {
  var fnil = null;
  var fnil__2 = function(f, x) {
    return function() {
      var G__8825 = null;
      var G__8825__1 = function(a) {
        return f.call(null, a == null ? x : a)
      };
      var G__8825__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b)
      };
      var G__8825__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b, c)
      };
      var G__8825__4 = function() {
        var G__8826__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b, c, ds)
        };
        var G__8826 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8826__delegate.call(this, a, b, c, ds)
        };
        G__8826.cljs$lang$maxFixedArity = 3;
        G__8826.cljs$lang$applyTo = function(arglist__8827) {
          var a = cljs.core.first(arglist__8827);
          var b = cljs.core.first(cljs.core.next(arglist__8827));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8827)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8827)));
          return G__8826__delegate(a, b, c, ds)
        };
        G__8826.cljs$lang$arity$variadic = G__8826__delegate;
        return G__8826
      }();
      G__8825 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 1:
            return G__8825__1.call(this, a);
          case 2:
            return G__8825__2.call(this, a, b);
          case 3:
            return G__8825__3.call(this, a, b, c);
          default:
            return G__8825__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__8825.cljs$lang$maxFixedArity = 3;
      G__8825.cljs$lang$applyTo = G__8825__4.cljs$lang$applyTo;
      return G__8825
    }()
  };
  var fnil__3 = function(f, x, y) {
    return function() {
      var G__8828 = null;
      var G__8828__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b == null ? y : b)
      };
      var G__8828__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b == null ? y : b, c)
      };
      var G__8828__4 = function() {
        var G__8829__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b == null ? y : b, c, ds)
        };
        var G__8829 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8829__delegate.call(this, a, b, c, ds)
        };
        G__8829.cljs$lang$maxFixedArity = 3;
        G__8829.cljs$lang$applyTo = function(arglist__8830) {
          var a = cljs.core.first(arglist__8830);
          var b = cljs.core.first(cljs.core.next(arglist__8830));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8830)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8830)));
          return G__8829__delegate(a, b, c, ds)
        };
        G__8829.cljs$lang$arity$variadic = G__8829__delegate;
        return G__8829
      }();
      G__8828 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__8828__2.call(this, a, b);
          case 3:
            return G__8828__3.call(this, a, b, c);
          default:
            return G__8828__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__8828.cljs$lang$maxFixedArity = 3;
      G__8828.cljs$lang$applyTo = G__8828__4.cljs$lang$applyTo;
      return G__8828
    }()
  };
  var fnil__4 = function(f, x, y, z) {
    return function() {
      var G__8831 = null;
      var G__8831__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b == null ? y : b)
      };
      var G__8831__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b == null ? y : b, c == null ? z : c)
      };
      var G__8831__4 = function() {
        var G__8832__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b == null ? y : b, c == null ? z : c, ds)
        };
        var G__8832 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8832__delegate.call(this, a, b, c, ds)
        };
        G__8832.cljs$lang$maxFixedArity = 3;
        G__8832.cljs$lang$applyTo = function(arglist__8833) {
          var a = cljs.core.first(arglist__8833);
          var b = cljs.core.first(cljs.core.next(arglist__8833));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8833)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8833)));
          return G__8832__delegate(a, b, c, ds)
        };
        G__8832.cljs$lang$arity$variadic = G__8832__delegate;
        return G__8832
      }();
      G__8831 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__8831__2.call(this, a, b);
          case 3:
            return G__8831__3.call(this, a, b, c);
          default:
            return G__8831__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__8831.cljs$lang$maxFixedArity = 3;
      G__8831.cljs$lang$applyTo = G__8831__4.cljs$lang$applyTo;
      return G__8831
    }()
  };
  fnil = function(f, x, y, z) {
    switch(arguments.length) {
      case 2:
        return fnil__2.call(this, f, x);
      case 3:
        return fnil__3.call(this, f, x, y);
      case 4:
        return fnil__4.call(this, f, x, y, z)
    }
    throw"Invalid arity: " + arguments.length;
  };
  fnil.cljs$lang$arity$2 = fnil__2;
  fnil.cljs$lang$arity$3 = fnil__3;
  fnil.cljs$lang$arity$4 = fnil__4;
  return fnil
}();
cljs.core.map_indexed = function map_indexed(f, coll) {
  var mapi__8849 = function mapi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____8857 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8857) {
        var s__8858 = temp__3974__auto____8857;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__8858)) {
          var c__8859 = cljs.core.chunk_first.call(null, s__8858);
          var size__8860 = cljs.core.count.call(null, c__8859);
          var b__8861 = cljs.core.chunk_buffer.call(null, size__8860);
          var n__2527__auto____8862 = size__8860;
          var i__8863 = 0;
          while(true) {
            if(i__8863 < n__2527__auto____8862) {
              cljs.core.chunk_append.call(null, b__8861, f.call(null, idx + i__8863, cljs.core._nth.call(null, c__8859, i__8863)));
              var G__8864 = i__8863 + 1;
              i__8863 = G__8864;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__8861), mapi.call(null, idx + size__8860, cljs.core.chunk_rest.call(null, s__8858)))
        }else {
          return cljs.core.cons.call(null, f.call(null, idx, cljs.core.first.call(null, s__8858)), mapi.call(null, idx + 1, cljs.core.rest.call(null, s__8858)))
        }
      }else {
        return null
      }
    }, null)
  };
  return mapi__8849.call(null, 0, coll)
};
cljs.core.keep = function keep(f, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____8874 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____8874) {
      var s__8875 = temp__3974__auto____8874;
      if(cljs.core.chunked_seq_QMARK_.call(null, s__8875)) {
        var c__8876 = cljs.core.chunk_first.call(null, s__8875);
        var size__8877 = cljs.core.count.call(null, c__8876);
        var b__8878 = cljs.core.chunk_buffer.call(null, size__8877);
        var n__2527__auto____8879 = size__8877;
        var i__8880 = 0;
        while(true) {
          if(i__8880 < n__2527__auto____8879) {
            var x__8881 = f.call(null, cljs.core._nth.call(null, c__8876, i__8880));
            if(x__8881 == null) {
            }else {
              cljs.core.chunk_append.call(null, b__8878, x__8881)
            }
            var G__8883 = i__8880 + 1;
            i__8880 = G__8883;
            continue
          }else {
          }
          break
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__8878), keep.call(null, f, cljs.core.chunk_rest.call(null, s__8875)))
      }else {
        var x__8882 = f.call(null, cljs.core.first.call(null, s__8875));
        if(x__8882 == null) {
          return keep.call(null, f, cljs.core.rest.call(null, s__8875))
        }else {
          return cljs.core.cons.call(null, x__8882, keep.call(null, f, cljs.core.rest.call(null, s__8875)))
        }
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.keep_indexed = function keep_indexed(f, coll) {
  var keepi__8909 = function keepi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____8919 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8919) {
        var s__8920 = temp__3974__auto____8919;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__8920)) {
          var c__8921 = cljs.core.chunk_first.call(null, s__8920);
          var size__8922 = cljs.core.count.call(null, c__8921);
          var b__8923 = cljs.core.chunk_buffer.call(null, size__8922);
          var n__2527__auto____8924 = size__8922;
          var i__8925 = 0;
          while(true) {
            if(i__8925 < n__2527__auto____8924) {
              var x__8926 = f.call(null, idx + i__8925, cljs.core._nth.call(null, c__8921, i__8925));
              if(x__8926 == null) {
              }else {
                cljs.core.chunk_append.call(null, b__8923, x__8926)
              }
              var G__8928 = i__8925 + 1;
              i__8925 = G__8928;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__8923), keepi.call(null, idx + size__8922, cljs.core.chunk_rest.call(null, s__8920)))
        }else {
          var x__8927 = f.call(null, idx, cljs.core.first.call(null, s__8920));
          if(x__8927 == null) {
            return keepi.call(null, idx + 1, cljs.core.rest.call(null, s__8920))
          }else {
            return cljs.core.cons.call(null, x__8927, keepi.call(null, idx + 1, cljs.core.rest.call(null, s__8920)))
          }
        }
      }else {
        return null
      }
    }, null)
  };
  return keepi__8909.call(null, 0, coll)
};
cljs.core.every_pred = function() {
  var every_pred = null;
  var every_pred__1 = function(p) {
    return function() {
      var ep1 = null;
      var ep1__0 = function() {
        return true
      };
      var ep1__1 = function(x) {
        return cljs.core.boolean$.call(null, p.call(null, x))
      };
      var ep1__2 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____9014 = p.call(null, x);
          if(cljs.core.truth_(and__3822__auto____9014)) {
            return p.call(null, y)
          }else {
            return and__3822__auto____9014
          }
        }())
      };
      var ep1__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____9015 = p.call(null, x);
          if(cljs.core.truth_(and__3822__auto____9015)) {
            var and__3822__auto____9016 = p.call(null, y);
            if(cljs.core.truth_(and__3822__auto____9016)) {
              return p.call(null, z)
            }else {
              return and__3822__auto____9016
            }
          }else {
            return and__3822__auto____9015
          }
        }())
      };
      var ep1__4 = function() {
        var G__9085__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____9017 = ep1.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____9017)) {
              return cljs.core.every_QMARK_.call(null, p, args)
            }else {
              return and__3822__auto____9017
            }
          }())
        };
        var G__9085 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9085__delegate.call(this, x, y, z, args)
        };
        G__9085.cljs$lang$maxFixedArity = 3;
        G__9085.cljs$lang$applyTo = function(arglist__9086) {
          var x = cljs.core.first(arglist__9086);
          var y = cljs.core.first(cljs.core.next(arglist__9086));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9086)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9086)));
          return G__9085__delegate(x, y, z, args)
        };
        G__9085.cljs$lang$arity$variadic = G__9085__delegate;
        return G__9085
      }();
      ep1 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep1__0.call(this);
          case 1:
            return ep1__1.call(this, x);
          case 2:
            return ep1__2.call(this, x, y);
          case 3:
            return ep1__3.call(this, x, y, z);
          default:
            return ep1__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep1.cljs$lang$maxFixedArity = 3;
      ep1.cljs$lang$applyTo = ep1__4.cljs$lang$applyTo;
      ep1.cljs$lang$arity$0 = ep1__0;
      ep1.cljs$lang$arity$1 = ep1__1;
      ep1.cljs$lang$arity$2 = ep1__2;
      ep1.cljs$lang$arity$3 = ep1__3;
      ep1.cljs$lang$arity$variadic = ep1__4.cljs$lang$arity$variadic;
      return ep1
    }()
  };
  var every_pred__2 = function(p1, p2) {
    return function() {
      var ep2 = null;
      var ep2__0 = function() {
        return true
      };
      var ep2__1 = function(x) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____9029 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____9029)) {
            return p2.call(null, x)
          }else {
            return and__3822__auto____9029
          }
        }())
      };
      var ep2__2 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____9030 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____9030)) {
            var and__3822__auto____9031 = p1.call(null, y);
            if(cljs.core.truth_(and__3822__auto____9031)) {
              var and__3822__auto____9032 = p2.call(null, x);
              if(cljs.core.truth_(and__3822__auto____9032)) {
                return p2.call(null, y)
              }else {
                return and__3822__auto____9032
              }
            }else {
              return and__3822__auto____9031
            }
          }else {
            return and__3822__auto____9030
          }
        }())
      };
      var ep2__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____9033 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____9033)) {
            var and__3822__auto____9034 = p1.call(null, y);
            if(cljs.core.truth_(and__3822__auto____9034)) {
              var and__3822__auto____9035 = p1.call(null, z);
              if(cljs.core.truth_(and__3822__auto____9035)) {
                var and__3822__auto____9036 = p2.call(null, x);
                if(cljs.core.truth_(and__3822__auto____9036)) {
                  var and__3822__auto____9037 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____9037)) {
                    return p2.call(null, z)
                  }else {
                    return and__3822__auto____9037
                  }
                }else {
                  return and__3822__auto____9036
                }
              }else {
                return and__3822__auto____9035
              }
            }else {
              return and__3822__auto____9034
            }
          }else {
            return and__3822__auto____9033
          }
        }())
      };
      var ep2__4 = function() {
        var G__9087__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____9038 = ep2.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____9038)) {
              return cljs.core.every_QMARK_.call(null, function(p1__8884_SHARP_) {
                var and__3822__auto____9039 = p1.call(null, p1__8884_SHARP_);
                if(cljs.core.truth_(and__3822__auto____9039)) {
                  return p2.call(null, p1__8884_SHARP_)
                }else {
                  return and__3822__auto____9039
                }
              }, args)
            }else {
              return and__3822__auto____9038
            }
          }())
        };
        var G__9087 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9087__delegate.call(this, x, y, z, args)
        };
        G__9087.cljs$lang$maxFixedArity = 3;
        G__9087.cljs$lang$applyTo = function(arglist__9088) {
          var x = cljs.core.first(arglist__9088);
          var y = cljs.core.first(cljs.core.next(arglist__9088));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9088)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9088)));
          return G__9087__delegate(x, y, z, args)
        };
        G__9087.cljs$lang$arity$variadic = G__9087__delegate;
        return G__9087
      }();
      ep2 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep2__0.call(this);
          case 1:
            return ep2__1.call(this, x);
          case 2:
            return ep2__2.call(this, x, y);
          case 3:
            return ep2__3.call(this, x, y, z);
          default:
            return ep2__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep2.cljs$lang$maxFixedArity = 3;
      ep2.cljs$lang$applyTo = ep2__4.cljs$lang$applyTo;
      ep2.cljs$lang$arity$0 = ep2__0;
      ep2.cljs$lang$arity$1 = ep2__1;
      ep2.cljs$lang$arity$2 = ep2__2;
      ep2.cljs$lang$arity$3 = ep2__3;
      ep2.cljs$lang$arity$variadic = ep2__4.cljs$lang$arity$variadic;
      return ep2
    }()
  };
  var every_pred__3 = function(p1, p2, p3) {
    return function() {
      var ep3 = null;
      var ep3__0 = function() {
        return true
      };
      var ep3__1 = function(x) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____9058 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____9058)) {
            var and__3822__auto____9059 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____9059)) {
              return p3.call(null, x)
            }else {
              return and__3822__auto____9059
            }
          }else {
            return and__3822__auto____9058
          }
        }())
      };
      var ep3__2 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____9060 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____9060)) {
            var and__3822__auto____9061 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____9061)) {
              var and__3822__auto____9062 = p3.call(null, x);
              if(cljs.core.truth_(and__3822__auto____9062)) {
                var and__3822__auto____9063 = p1.call(null, y);
                if(cljs.core.truth_(and__3822__auto____9063)) {
                  var and__3822__auto____9064 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____9064)) {
                    return p3.call(null, y)
                  }else {
                    return and__3822__auto____9064
                  }
                }else {
                  return and__3822__auto____9063
                }
              }else {
                return and__3822__auto____9062
              }
            }else {
              return and__3822__auto____9061
            }
          }else {
            return and__3822__auto____9060
          }
        }())
      };
      var ep3__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____9065 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____9065)) {
            var and__3822__auto____9066 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____9066)) {
              var and__3822__auto____9067 = p3.call(null, x);
              if(cljs.core.truth_(and__3822__auto____9067)) {
                var and__3822__auto____9068 = p1.call(null, y);
                if(cljs.core.truth_(and__3822__auto____9068)) {
                  var and__3822__auto____9069 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____9069)) {
                    var and__3822__auto____9070 = p3.call(null, y);
                    if(cljs.core.truth_(and__3822__auto____9070)) {
                      var and__3822__auto____9071 = p1.call(null, z);
                      if(cljs.core.truth_(and__3822__auto____9071)) {
                        var and__3822__auto____9072 = p2.call(null, z);
                        if(cljs.core.truth_(and__3822__auto____9072)) {
                          return p3.call(null, z)
                        }else {
                          return and__3822__auto____9072
                        }
                      }else {
                        return and__3822__auto____9071
                      }
                    }else {
                      return and__3822__auto____9070
                    }
                  }else {
                    return and__3822__auto____9069
                  }
                }else {
                  return and__3822__auto____9068
                }
              }else {
                return and__3822__auto____9067
              }
            }else {
              return and__3822__auto____9066
            }
          }else {
            return and__3822__auto____9065
          }
        }())
      };
      var ep3__4 = function() {
        var G__9089__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____9073 = ep3.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____9073)) {
              return cljs.core.every_QMARK_.call(null, function(p1__8885_SHARP_) {
                var and__3822__auto____9074 = p1.call(null, p1__8885_SHARP_);
                if(cljs.core.truth_(and__3822__auto____9074)) {
                  var and__3822__auto____9075 = p2.call(null, p1__8885_SHARP_);
                  if(cljs.core.truth_(and__3822__auto____9075)) {
                    return p3.call(null, p1__8885_SHARP_)
                  }else {
                    return and__3822__auto____9075
                  }
                }else {
                  return and__3822__auto____9074
                }
              }, args)
            }else {
              return and__3822__auto____9073
            }
          }())
        };
        var G__9089 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9089__delegate.call(this, x, y, z, args)
        };
        G__9089.cljs$lang$maxFixedArity = 3;
        G__9089.cljs$lang$applyTo = function(arglist__9090) {
          var x = cljs.core.first(arglist__9090);
          var y = cljs.core.first(cljs.core.next(arglist__9090));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9090)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9090)));
          return G__9089__delegate(x, y, z, args)
        };
        G__9089.cljs$lang$arity$variadic = G__9089__delegate;
        return G__9089
      }();
      ep3 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep3__0.call(this);
          case 1:
            return ep3__1.call(this, x);
          case 2:
            return ep3__2.call(this, x, y);
          case 3:
            return ep3__3.call(this, x, y, z);
          default:
            return ep3__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep3.cljs$lang$maxFixedArity = 3;
      ep3.cljs$lang$applyTo = ep3__4.cljs$lang$applyTo;
      ep3.cljs$lang$arity$0 = ep3__0;
      ep3.cljs$lang$arity$1 = ep3__1;
      ep3.cljs$lang$arity$2 = ep3__2;
      ep3.cljs$lang$arity$3 = ep3__3;
      ep3.cljs$lang$arity$variadic = ep3__4.cljs$lang$arity$variadic;
      return ep3
    }()
  };
  var every_pred__4 = function() {
    var G__9091__delegate = function(p1, p2, p3, ps) {
      var ps__9076 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var epn = null;
        var epn__0 = function() {
          return true
        };
        var epn__1 = function(x) {
          return cljs.core.every_QMARK_.call(null, function(p1__8886_SHARP_) {
            return p1__8886_SHARP_.call(null, x)
          }, ps__9076)
        };
        var epn__2 = function(x, y) {
          return cljs.core.every_QMARK_.call(null, function(p1__8887_SHARP_) {
            var and__3822__auto____9081 = p1__8887_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3822__auto____9081)) {
              return p1__8887_SHARP_.call(null, y)
            }else {
              return and__3822__auto____9081
            }
          }, ps__9076)
        };
        var epn__3 = function(x, y, z) {
          return cljs.core.every_QMARK_.call(null, function(p1__8888_SHARP_) {
            var and__3822__auto____9082 = p1__8888_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3822__auto____9082)) {
              var and__3822__auto____9083 = p1__8888_SHARP_.call(null, y);
              if(cljs.core.truth_(and__3822__auto____9083)) {
                return p1__8888_SHARP_.call(null, z)
              }else {
                return and__3822__auto____9083
              }
            }else {
              return and__3822__auto____9082
            }
          }, ps__9076)
        };
        var epn__4 = function() {
          var G__9092__delegate = function(x, y, z, args) {
            return cljs.core.boolean$.call(null, function() {
              var and__3822__auto____9084 = epn.call(null, x, y, z);
              if(cljs.core.truth_(and__3822__auto____9084)) {
                return cljs.core.every_QMARK_.call(null, function(p1__8889_SHARP_) {
                  return cljs.core.every_QMARK_.call(null, p1__8889_SHARP_, args)
                }, ps__9076)
              }else {
                return and__3822__auto____9084
              }
            }())
          };
          var G__9092 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__9092__delegate.call(this, x, y, z, args)
          };
          G__9092.cljs$lang$maxFixedArity = 3;
          G__9092.cljs$lang$applyTo = function(arglist__9093) {
            var x = cljs.core.first(arglist__9093);
            var y = cljs.core.first(cljs.core.next(arglist__9093));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9093)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9093)));
            return G__9092__delegate(x, y, z, args)
          };
          G__9092.cljs$lang$arity$variadic = G__9092__delegate;
          return G__9092
        }();
        epn = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return epn__0.call(this);
            case 1:
              return epn__1.call(this, x);
            case 2:
              return epn__2.call(this, x, y);
            case 3:
              return epn__3.call(this, x, y, z);
            default:
              return epn__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
          }
          throw"Invalid arity: " + arguments.length;
        };
        epn.cljs$lang$maxFixedArity = 3;
        epn.cljs$lang$applyTo = epn__4.cljs$lang$applyTo;
        epn.cljs$lang$arity$0 = epn__0;
        epn.cljs$lang$arity$1 = epn__1;
        epn.cljs$lang$arity$2 = epn__2;
        epn.cljs$lang$arity$3 = epn__3;
        epn.cljs$lang$arity$variadic = epn__4.cljs$lang$arity$variadic;
        return epn
      }()
    };
    var G__9091 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__9091__delegate.call(this, p1, p2, p3, ps)
    };
    G__9091.cljs$lang$maxFixedArity = 3;
    G__9091.cljs$lang$applyTo = function(arglist__9094) {
      var p1 = cljs.core.first(arglist__9094);
      var p2 = cljs.core.first(cljs.core.next(arglist__9094));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9094)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9094)));
      return G__9091__delegate(p1, p2, p3, ps)
    };
    G__9091.cljs$lang$arity$variadic = G__9091__delegate;
    return G__9091
  }();
  every_pred = function(p1, p2, p3, var_args) {
    var ps = var_args;
    switch(arguments.length) {
      case 1:
        return every_pred__1.call(this, p1);
      case 2:
        return every_pred__2.call(this, p1, p2);
      case 3:
        return every_pred__3.call(this, p1, p2, p3);
      default:
        return every_pred__4.cljs$lang$arity$variadic(p1, p2, p3, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  every_pred.cljs$lang$maxFixedArity = 3;
  every_pred.cljs$lang$applyTo = every_pred__4.cljs$lang$applyTo;
  every_pred.cljs$lang$arity$1 = every_pred__1;
  every_pred.cljs$lang$arity$2 = every_pred__2;
  every_pred.cljs$lang$arity$3 = every_pred__3;
  every_pred.cljs$lang$arity$variadic = every_pred__4.cljs$lang$arity$variadic;
  return every_pred
}();
cljs.core.some_fn = function() {
  var some_fn = null;
  var some_fn__1 = function(p) {
    return function() {
      var sp1 = null;
      var sp1__0 = function() {
        return null
      };
      var sp1__1 = function(x) {
        return p.call(null, x)
      };
      var sp1__2 = function(x, y) {
        var or__3824__auto____9175 = p.call(null, x);
        if(cljs.core.truth_(or__3824__auto____9175)) {
          return or__3824__auto____9175
        }else {
          return p.call(null, y)
        }
      };
      var sp1__3 = function(x, y, z) {
        var or__3824__auto____9176 = p.call(null, x);
        if(cljs.core.truth_(or__3824__auto____9176)) {
          return or__3824__auto____9176
        }else {
          var or__3824__auto____9177 = p.call(null, y);
          if(cljs.core.truth_(or__3824__auto____9177)) {
            return or__3824__auto____9177
          }else {
            return p.call(null, z)
          }
        }
      };
      var sp1__4 = function() {
        var G__9246__delegate = function(x, y, z, args) {
          var or__3824__auto____9178 = sp1.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____9178)) {
            return or__3824__auto____9178
          }else {
            return cljs.core.some.call(null, p, args)
          }
        };
        var G__9246 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9246__delegate.call(this, x, y, z, args)
        };
        G__9246.cljs$lang$maxFixedArity = 3;
        G__9246.cljs$lang$applyTo = function(arglist__9247) {
          var x = cljs.core.first(arglist__9247);
          var y = cljs.core.first(cljs.core.next(arglist__9247));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9247)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9247)));
          return G__9246__delegate(x, y, z, args)
        };
        G__9246.cljs$lang$arity$variadic = G__9246__delegate;
        return G__9246
      }();
      sp1 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp1__0.call(this);
          case 1:
            return sp1__1.call(this, x);
          case 2:
            return sp1__2.call(this, x, y);
          case 3:
            return sp1__3.call(this, x, y, z);
          default:
            return sp1__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp1.cljs$lang$maxFixedArity = 3;
      sp1.cljs$lang$applyTo = sp1__4.cljs$lang$applyTo;
      sp1.cljs$lang$arity$0 = sp1__0;
      sp1.cljs$lang$arity$1 = sp1__1;
      sp1.cljs$lang$arity$2 = sp1__2;
      sp1.cljs$lang$arity$3 = sp1__3;
      sp1.cljs$lang$arity$variadic = sp1__4.cljs$lang$arity$variadic;
      return sp1
    }()
  };
  var some_fn__2 = function(p1, p2) {
    return function() {
      var sp2 = null;
      var sp2__0 = function() {
        return null
      };
      var sp2__1 = function(x) {
        var or__3824__auto____9190 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____9190)) {
          return or__3824__auto____9190
        }else {
          return p2.call(null, x)
        }
      };
      var sp2__2 = function(x, y) {
        var or__3824__auto____9191 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____9191)) {
          return or__3824__auto____9191
        }else {
          var or__3824__auto____9192 = p1.call(null, y);
          if(cljs.core.truth_(or__3824__auto____9192)) {
            return or__3824__auto____9192
          }else {
            var or__3824__auto____9193 = p2.call(null, x);
            if(cljs.core.truth_(or__3824__auto____9193)) {
              return or__3824__auto____9193
            }else {
              return p2.call(null, y)
            }
          }
        }
      };
      var sp2__3 = function(x, y, z) {
        var or__3824__auto____9194 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____9194)) {
          return or__3824__auto____9194
        }else {
          var or__3824__auto____9195 = p1.call(null, y);
          if(cljs.core.truth_(or__3824__auto____9195)) {
            return or__3824__auto____9195
          }else {
            var or__3824__auto____9196 = p1.call(null, z);
            if(cljs.core.truth_(or__3824__auto____9196)) {
              return or__3824__auto____9196
            }else {
              var or__3824__auto____9197 = p2.call(null, x);
              if(cljs.core.truth_(or__3824__auto____9197)) {
                return or__3824__auto____9197
              }else {
                var or__3824__auto____9198 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____9198)) {
                  return or__3824__auto____9198
                }else {
                  return p2.call(null, z)
                }
              }
            }
          }
        }
      };
      var sp2__4 = function() {
        var G__9248__delegate = function(x, y, z, args) {
          var or__3824__auto____9199 = sp2.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____9199)) {
            return or__3824__auto____9199
          }else {
            return cljs.core.some.call(null, function(p1__8929_SHARP_) {
              var or__3824__auto____9200 = p1.call(null, p1__8929_SHARP_);
              if(cljs.core.truth_(or__3824__auto____9200)) {
                return or__3824__auto____9200
              }else {
                return p2.call(null, p1__8929_SHARP_)
              }
            }, args)
          }
        };
        var G__9248 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9248__delegate.call(this, x, y, z, args)
        };
        G__9248.cljs$lang$maxFixedArity = 3;
        G__9248.cljs$lang$applyTo = function(arglist__9249) {
          var x = cljs.core.first(arglist__9249);
          var y = cljs.core.first(cljs.core.next(arglist__9249));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9249)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9249)));
          return G__9248__delegate(x, y, z, args)
        };
        G__9248.cljs$lang$arity$variadic = G__9248__delegate;
        return G__9248
      }();
      sp2 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp2__0.call(this);
          case 1:
            return sp2__1.call(this, x);
          case 2:
            return sp2__2.call(this, x, y);
          case 3:
            return sp2__3.call(this, x, y, z);
          default:
            return sp2__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp2.cljs$lang$maxFixedArity = 3;
      sp2.cljs$lang$applyTo = sp2__4.cljs$lang$applyTo;
      sp2.cljs$lang$arity$0 = sp2__0;
      sp2.cljs$lang$arity$1 = sp2__1;
      sp2.cljs$lang$arity$2 = sp2__2;
      sp2.cljs$lang$arity$3 = sp2__3;
      sp2.cljs$lang$arity$variadic = sp2__4.cljs$lang$arity$variadic;
      return sp2
    }()
  };
  var some_fn__3 = function(p1, p2, p3) {
    return function() {
      var sp3 = null;
      var sp3__0 = function() {
        return null
      };
      var sp3__1 = function(x) {
        var or__3824__auto____9219 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____9219)) {
          return or__3824__auto____9219
        }else {
          var or__3824__auto____9220 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____9220)) {
            return or__3824__auto____9220
          }else {
            return p3.call(null, x)
          }
        }
      };
      var sp3__2 = function(x, y) {
        var or__3824__auto____9221 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____9221)) {
          return or__3824__auto____9221
        }else {
          var or__3824__auto____9222 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____9222)) {
            return or__3824__auto____9222
          }else {
            var or__3824__auto____9223 = p3.call(null, x);
            if(cljs.core.truth_(or__3824__auto____9223)) {
              return or__3824__auto____9223
            }else {
              var or__3824__auto____9224 = p1.call(null, y);
              if(cljs.core.truth_(or__3824__auto____9224)) {
                return or__3824__auto____9224
              }else {
                var or__3824__auto____9225 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____9225)) {
                  return or__3824__auto____9225
                }else {
                  return p3.call(null, y)
                }
              }
            }
          }
        }
      };
      var sp3__3 = function(x, y, z) {
        var or__3824__auto____9226 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____9226)) {
          return or__3824__auto____9226
        }else {
          var or__3824__auto____9227 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____9227)) {
            return or__3824__auto____9227
          }else {
            var or__3824__auto____9228 = p3.call(null, x);
            if(cljs.core.truth_(or__3824__auto____9228)) {
              return or__3824__auto____9228
            }else {
              var or__3824__auto____9229 = p1.call(null, y);
              if(cljs.core.truth_(or__3824__auto____9229)) {
                return or__3824__auto____9229
              }else {
                var or__3824__auto____9230 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____9230)) {
                  return or__3824__auto____9230
                }else {
                  var or__3824__auto____9231 = p3.call(null, y);
                  if(cljs.core.truth_(or__3824__auto____9231)) {
                    return or__3824__auto____9231
                  }else {
                    var or__3824__auto____9232 = p1.call(null, z);
                    if(cljs.core.truth_(or__3824__auto____9232)) {
                      return or__3824__auto____9232
                    }else {
                      var or__3824__auto____9233 = p2.call(null, z);
                      if(cljs.core.truth_(or__3824__auto____9233)) {
                        return or__3824__auto____9233
                      }else {
                        return p3.call(null, z)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      var sp3__4 = function() {
        var G__9250__delegate = function(x, y, z, args) {
          var or__3824__auto____9234 = sp3.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____9234)) {
            return or__3824__auto____9234
          }else {
            return cljs.core.some.call(null, function(p1__8930_SHARP_) {
              var or__3824__auto____9235 = p1.call(null, p1__8930_SHARP_);
              if(cljs.core.truth_(or__3824__auto____9235)) {
                return or__3824__auto____9235
              }else {
                var or__3824__auto____9236 = p2.call(null, p1__8930_SHARP_);
                if(cljs.core.truth_(or__3824__auto____9236)) {
                  return or__3824__auto____9236
                }else {
                  return p3.call(null, p1__8930_SHARP_)
                }
              }
            }, args)
          }
        };
        var G__9250 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9250__delegate.call(this, x, y, z, args)
        };
        G__9250.cljs$lang$maxFixedArity = 3;
        G__9250.cljs$lang$applyTo = function(arglist__9251) {
          var x = cljs.core.first(arglist__9251);
          var y = cljs.core.first(cljs.core.next(arglist__9251));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9251)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9251)));
          return G__9250__delegate(x, y, z, args)
        };
        G__9250.cljs$lang$arity$variadic = G__9250__delegate;
        return G__9250
      }();
      sp3 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp3__0.call(this);
          case 1:
            return sp3__1.call(this, x);
          case 2:
            return sp3__2.call(this, x, y);
          case 3:
            return sp3__3.call(this, x, y, z);
          default:
            return sp3__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp3.cljs$lang$maxFixedArity = 3;
      sp3.cljs$lang$applyTo = sp3__4.cljs$lang$applyTo;
      sp3.cljs$lang$arity$0 = sp3__0;
      sp3.cljs$lang$arity$1 = sp3__1;
      sp3.cljs$lang$arity$2 = sp3__2;
      sp3.cljs$lang$arity$3 = sp3__3;
      sp3.cljs$lang$arity$variadic = sp3__4.cljs$lang$arity$variadic;
      return sp3
    }()
  };
  var some_fn__4 = function() {
    var G__9252__delegate = function(p1, p2, p3, ps) {
      var ps__9237 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var spn = null;
        var spn__0 = function() {
          return null
        };
        var spn__1 = function(x) {
          return cljs.core.some.call(null, function(p1__8931_SHARP_) {
            return p1__8931_SHARP_.call(null, x)
          }, ps__9237)
        };
        var spn__2 = function(x, y) {
          return cljs.core.some.call(null, function(p1__8932_SHARP_) {
            var or__3824__auto____9242 = p1__8932_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3824__auto____9242)) {
              return or__3824__auto____9242
            }else {
              return p1__8932_SHARP_.call(null, y)
            }
          }, ps__9237)
        };
        var spn__3 = function(x, y, z) {
          return cljs.core.some.call(null, function(p1__8933_SHARP_) {
            var or__3824__auto____9243 = p1__8933_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3824__auto____9243)) {
              return or__3824__auto____9243
            }else {
              var or__3824__auto____9244 = p1__8933_SHARP_.call(null, y);
              if(cljs.core.truth_(or__3824__auto____9244)) {
                return or__3824__auto____9244
              }else {
                return p1__8933_SHARP_.call(null, z)
              }
            }
          }, ps__9237)
        };
        var spn__4 = function() {
          var G__9253__delegate = function(x, y, z, args) {
            var or__3824__auto____9245 = spn.call(null, x, y, z);
            if(cljs.core.truth_(or__3824__auto____9245)) {
              return or__3824__auto____9245
            }else {
              return cljs.core.some.call(null, function(p1__8934_SHARP_) {
                return cljs.core.some.call(null, p1__8934_SHARP_, args)
              }, ps__9237)
            }
          };
          var G__9253 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__9253__delegate.call(this, x, y, z, args)
          };
          G__9253.cljs$lang$maxFixedArity = 3;
          G__9253.cljs$lang$applyTo = function(arglist__9254) {
            var x = cljs.core.first(arglist__9254);
            var y = cljs.core.first(cljs.core.next(arglist__9254));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9254)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9254)));
            return G__9253__delegate(x, y, z, args)
          };
          G__9253.cljs$lang$arity$variadic = G__9253__delegate;
          return G__9253
        }();
        spn = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return spn__0.call(this);
            case 1:
              return spn__1.call(this, x);
            case 2:
              return spn__2.call(this, x, y);
            case 3:
              return spn__3.call(this, x, y, z);
            default:
              return spn__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
          }
          throw"Invalid arity: " + arguments.length;
        };
        spn.cljs$lang$maxFixedArity = 3;
        spn.cljs$lang$applyTo = spn__4.cljs$lang$applyTo;
        spn.cljs$lang$arity$0 = spn__0;
        spn.cljs$lang$arity$1 = spn__1;
        spn.cljs$lang$arity$2 = spn__2;
        spn.cljs$lang$arity$3 = spn__3;
        spn.cljs$lang$arity$variadic = spn__4.cljs$lang$arity$variadic;
        return spn
      }()
    };
    var G__9252 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__9252__delegate.call(this, p1, p2, p3, ps)
    };
    G__9252.cljs$lang$maxFixedArity = 3;
    G__9252.cljs$lang$applyTo = function(arglist__9255) {
      var p1 = cljs.core.first(arglist__9255);
      var p2 = cljs.core.first(cljs.core.next(arglist__9255));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9255)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9255)));
      return G__9252__delegate(p1, p2, p3, ps)
    };
    G__9252.cljs$lang$arity$variadic = G__9252__delegate;
    return G__9252
  }();
  some_fn = function(p1, p2, p3, var_args) {
    var ps = var_args;
    switch(arguments.length) {
      case 1:
        return some_fn__1.call(this, p1);
      case 2:
        return some_fn__2.call(this, p1, p2);
      case 3:
        return some_fn__3.call(this, p1, p2, p3);
      default:
        return some_fn__4.cljs$lang$arity$variadic(p1, p2, p3, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  some_fn.cljs$lang$maxFixedArity = 3;
  some_fn.cljs$lang$applyTo = some_fn__4.cljs$lang$applyTo;
  some_fn.cljs$lang$arity$1 = some_fn__1;
  some_fn.cljs$lang$arity$2 = some_fn__2;
  some_fn.cljs$lang$arity$3 = some_fn__3;
  some_fn.cljs$lang$arity$variadic = some_fn__4.cljs$lang$arity$variadic;
  return some_fn
}();
cljs.core.map = function() {
  var map = null;
  var map__2 = function(f, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____9274 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____9274) {
        var s__9275 = temp__3974__auto____9274;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__9275)) {
          var c__9276 = cljs.core.chunk_first.call(null, s__9275);
          var size__9277 = cljs.core.count.call(null, c__9276);
          var b__9278 = cljs.core.chunk_buffer.call(null, size__9277);
          var n__2527__auto____9279 = size__9277;
          var i__9280 = 0;
          while(true) {
            if(i__9280 < n__2527__auto____9279) {
              cljs.core.chunk_append.call(null, b__9278, f.call(null, cljs.core._nth.call(null, c__9276, i__9280)));
              var G__9292 = i__9280 + 1;
              i__9280 = G__9292;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__9278), map.call(null, f, cljs.core.chunk_rest.call(null, s__9275)))
        }else {
          return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s__9275)), map.call(null, f, cljs.core.rest.call(null, s__9275)))
        }
      }else {
        return null
      }
    }, null)
  };
  var map__3 = function(f, c1, c2) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__9281 = cljs.core.seq.call(null, c1);
      var s2__9282 = cljs.core.seq.call(null, c2);
      if(function() {
        var and__3822__auto____9283 = s1__9281;
        if(and__3822__auto____9283) {
          return s2__9282
        }else {
          return and__3822__auto____9283
        }
      }()) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__9281), cljs.core.first.call(null, s2__9282)), map.call(null, f, cljs.core.rest.call(null, s1__9281), cljs.core.rest.call(null, s2__9282)))
      }else {
        return null
      }
    }, null)
  };
  var map__4 = function(f, c1, c2, c3) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__9284 = cljs.core.seq.call(null, c1);
      var s2__9285 = cljs.core.seq.call(null, c2);
      var s3__9286 = cljs.core.seq.call(null, c3);
      if(function() {
        var and__3822__auto____9287 = s1__9284;
        if(and__3822__auto____9287) {
          var and__3822__auto____9288 = s2__9285;
          if(and__3822__auto____9288) {
            return s3__9286
          }else {
            return and__3822__auto____9288
          }
        }else {
          return and__3822__auto____9287
        }
      }()) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__9284), cljs.core.first.call(null, s2__9285), cljs.core.first.call(null, s3__9286)), map.call(null, f, cljs.core.rest.call(null, s1__9284), cljs.core.rest.call(null, s2__9285), cljs.core.rest.call(null, s3__9286)))
      }else {
        return null
      }
    }, null)
  };
  var map__5 = function() {
    var G__9293__delegate = function(f, c1, c2, c3, colls) {
      var step__9291 = function step(cs) {
        return new cljs.core.LazySeq(null, false, function() {
          var ss__9290 = map.call(null, cljs.core.seq, cs);
          if(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__9290)) {
            return cljs.core.cons.call(null, map.call(null, cljs.core.first, ss__9290), step.call(null, map.call(null, cljs.core.rest, ss__9290)))
          }else {
            return null
          }
        }, null)
      };
      return map.call(null, function(p1__9095_SHARP_) {
        return cljs.core.apply.call(null, f, p1__9095_SHARP_)
      }, step__9291.call(null, cljs.core.conj.call(null, colls, c3, c2, c1)))
    };
    var G__9293 = function(f, c1, c2, c3, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__9293__delegate.call(this, f, c1, c2, c3, colls)
    };
    G__9293.cljs$lang$maxFixedArity = 4;
    G__9293.cljs$lang$applyTo = function(arglist__9294) {
      var f = cljs.core.first(arglist__9294);
      var c1 = cljs.core.first(cljs.core.next(arglist__9294));
      var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9294)));
      var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9294))));
      var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9294))));
      return G__9293__delegate(f, c1, c2, c3, colls)
    };
    G__9293.cljs$lang$arity$variadic = G__9293__delegate;
    return G__9293
  }();
  map = function(f, c1, c2, c3, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return map__2.call(this, f, c1);
      case 3:
        return map__3.call(this, f, c1, c2);
      case 4:
        return map__4.call(this, f, c1, c2, c3);
      default:
        return map__5.cljs$lang$arity$variadic(f, c1, c2, c3, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  map.cljs$lang$maxFixedArity = 4;
  map.cljs$lang$applyTo = map__5.cljs$lang$applyTo;
  map.cljs$lang$arity$2 = map__2;
  map.cljs$lang$arity$3 = map__3;
  map.cljs$lang$arity$4 = map__4;
  map.cljs$lang$arity$variadic = map__5.cljs$lang$arity$variadic;
  return map
}();
cljs.core.take = function take(n, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    if(n > 0) {
      var temp__3974__auto____9297 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____9297) {
        var s__9298 = temp__3974__auto____9297;
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__9298), take.call(null, n - 1, cljs.core.rest.call(null, s__9298)))
      }else {
        return null
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.drop = function drop(n, coll) {
  var step__9304 = function(n, coll) {
    while(true) {
      var s__9302 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3822__auto____9303 = n > 0;
        if(and__3822__auto____9303) {
          return s__9302
        }else {
          return and__3822__auto____9303
        }
      }())) {
        var G__9305 = n - 1;
        var G__9306 = cljs.core.rest.call(null, s__9302);
        n = G__9305;
        coll = G__9306;
        continue
      }else {
        return s__9302
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__9304.call(null, n, coll)
  }, null)
};
cljs.core.drop_last = function() {
  var drop_last = null;
  var drop_last__1 = function(s) {
    return drop_last.call(null, 1, s)
  };
  var drop_last__2 = function(n, s) {
    return cljs.core.map.call(null, function(x, _) {
      return x
    }, s, cljs.core.drop.call(null, n, s))
  };
  drop_last = function(n, s) {
    switch(arguments.length) {
      case 1:
        return drop_last__1.call(this, n);
      case 2:
        return drop_last__2.call(this, n, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  drop_last.cljs$lang$arity$1 = drop_last__1;
  drop_last.cljs$lang$arity$2 = drop_last__2;
  return drop_last
}();
cljs.core.take_last = function take_last(n, coll) {
  var s__9309 = cljs.core.seq.call(null, coll);
  var lead__9310 = cljs.core.seq.call(null, cljs.core.drop.call(null, n, coll));
  while(true) {
    if(lead__9310) {
      var G__9311 = cljs.core.next.call(null, s__9309);
      var G__9312 = cljs.core.next.call(null, lead__9310);
      s__9309 = G__9311;
      lead__9310 = G__9312;
      continue
    }else {
      return s__9309
    }
    break
  }
};
cljs.core.drop_while = function drop_while(pred, coll) {
  var step__9318 = function(pred, coll) {
    while(true) {
      var s__9316 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3822__auto____9317 = s__9316;
        if(and__3822__auto____9317) {
          return pred.call(null, cljs.core.first.call(null, s__9316))
        }else {
          return and__3822__auto____9317
        }
      }())) {
        var G__9319 = pred;
        var G__9320 = cljs.core.rest.call(null, s__9316);
        pred = G__9319;
        coll = G__9320;
        continue
      }else {
        return s__9316
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__9318.call(null, pred, coll)
  }, null)
};
cljs.core.cycle = function cycle(coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____9323 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____9323) {
      var s__9324 = temp__3974__auto____9323;
      return cljs.core.concat.call(null, s__9324, cycle.call(null, s__9324))
    }else {
      return null
    }
  }, null)
};
cljs.core.split_at = function split_at(n, coll) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take.call(null, n, coll), cljs.core.drop.call(null, n, coll)], true)
};
cljs.core.repeat = function() {
  var repeat = null;
  var repeat__1 = function(x) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, x, repeat.call(null, x))
    }, null)
  };
  var repeat__2 = function(n, x) {
    return cljs.core.take.call(null, n, repeat.call(null, x))
  };
  repeat = function(n, x) {
    switch(arguments.length) {
      case 1:
        return repeat__1.call(this, n);
      case 2:
        return repeat__2.call(this, n, x)
    }
    throw"Invalid arity: " + arguments.length;
  };
  repeat.cljs$lang$arity$1 = repeat__1;
  repeat.cljs$lang$arity$2 = repeat__2;
  return repeat
}();
cljs.core.replicate = function replicate(n, x) {
  return cljs.core.take.call(null, n, cljs.core.repeat.call(null, x))
};
cljs.core.repeatedly = function() {
  var repeatedly = null;
  var repeatedly__1 = function(f) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, f.call(null), repeatedly.call(null, f))
    }, null)
  };
  var repeatedly__2 = function(n, f) {
    return cljs.core.take.call(null, n, repeatedly.call(null, f))
  };
  repeatedly = function(n, f) {
    switch(arguments.length) {
      case 1:
        return repeatedly__1.call(this, n);
      case 2:
        return repeatedly__2.call(this, n, f)
    }
    throw"Invalid arity: " + arguments.length;
  };
  repeatedly.cljs$lang$arity$1 = repeatedly__1;
  repeatedly.cljs$lang$arity$2 = repeatedly__2;
  return repeatedly
}();
cljs.core.iterate = function iterate(f, x) {
  return cljs.core.cons.call(null, x, new cljs.core.LazySeq(null, false, function() {
    return iterate.call(null, f, f.call(null, x))
  }, null))
};
cljs.core.interleave = function() {
  var interleave = null;
  var interleave__2 = function(c1, c2) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__9329 = cljs.core.seq.call(null, c1);
      var s2__9330 = cljs.core.seq.call(null, c2);
      if(function() {
        var and__3822__auto____9331 = s1__9329;
        if(and__3822__auto____9331) {
          return s2__9330
        }else {
          return and__3822__auto____9331
        }
      }()) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s1__9329), cljs.core.cons.call(null, cljs.core.first.call(null, s2__9330), interleave.call(null, cljs.core.rest.call(null, s1__9329), cljs.core.rest.call(null, s2__9330))))
      }else {
        return null
      }
    }, null)
  };
  var interleave__3 = function() {
    var G__9333__delegate = function(c1, c2, colls) {
      return new cljs.core.LazySeq(null, false, function() {
        var ss__9332 = cljs.core.map.call(null, cljs.core.seq, cljs.core.conj.call(null, colls, c2, c1));
        if(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__9332)) {
          return cljs.core.concat.call(null, cljs.core.map.call(null, cljs.core.first, ss__9332), cljs.core.apply.call(null, interleave, cljs.core.map.call(null, cljs.core.rest, ss__9332)))
        }else {
          return null
        }
      }, null)
    };
    var G__9333 = function(c1, c2, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__9333__delegate.call(this, c1, c2, colls)
    };
    G__9333.cljs$lang$maxFixedArity = 2;
    G__9333.cljs$lang$applyTo = function(arglist__9334) {
      var c1 = cljs.core.first(arglist__9334);
      var c2 = cljs.core.first(cljs.core.next(arglist__9334));
      var colls = cljs.core.rest(cljs.core.next(arglist__9334));
      return G__9333__delegate(c1, c2, colls)
    };
    G__9333.cljs$lang$arity$variadic = G__9333__delegate;
    return G__9333
  }();
  interleave = function(c1, c2, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return interleave__2.call(this, c1, c2);
      default:
        return interleave__3.cljs$lang$arity$variadic(c1, c2, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  interleave.cljs$lang$maxFixedArity = 2;
  interleave.cljs$lang$applyTo = interleave__3.cljs$lang$applyTo;
  interleave.cljs$lang$arity$2 = interleave__2;
  interleave.cljs$lang$arity$variadic = interleave__3.cljs$lang$arity$variadic;
  return interleave
}();
cljs.core.interpose = function interpose(sep, coll) {
  return cljs.core.drop.call(null, 1, cljs.core.interleave.call(null, cljs.core.repeat.call(null, sep), coll))
};
cljs.core.flatten1 = function flatten1(colls) {
  var cat__9344 = function cat(coll, colls) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3971__auto____9342 = cljs.core.seq.call(null, coll);
      if(temp__3971__auto____9342) {
        var coll__9343 = temp__3971__auto____9342;
        return cljs.core.cons.call(null, cljs.core.first.call(null, coll__9343), cat.call(null, cljs.core.rest.call(null, coll__9343), colls))
      }else {
        if(cljs.core.seq.call(null, colls)) {
          return cat.call(null, cljs.core.first.call(null, colls), cljs.core.rest.call(null, colls))
        }else {
          return null
        }
      }
    }, null)
  };
  return cat__9344.call(null, null, colls)
};
cljs.core.mapcat = function() {
  var mapcat = null;
  var mapcat__2 = function(f, coll) {
    return cljs.core.flatten1.call(null, cljs.core.map.call(null, f, coll))
  };
  var mapcat__3 = function() {
    var G__9345__delegate = function(f, coll, colls) {
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, f, coll, colls))
    };
    var G__9345 = function(f, coll, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__9345__delegate.call(this, f, coll, colls)
    };
    G__9345.cljs$lang$maxFixedArity = 2;
    G__9345.cljs$lang$applyTo = function(arglist__9346) {
      var f = cljs.core.first(arglist__9346);
      var coll = cljs.core.first(cljs.core.next(arglist__9346));
      var colls = cljs.core.rest(cljs.core.next(arglist__9346));
      return G__9345__delegate(f, coll, colls)
    };
    G__9345.cljs$lang$arity$variadic = G__9345__delegate;
    return G__9345
  }();
  mapcat = function(f, coll, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return mapcat__2.call(this, f, coll);
      default:
        return mapcat__3.cljs$lang$arity$variadic(f, coll, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  mapcat.cljs$lang$maxFixedArity = 2;
  mapcat.cljs$lang$applyTo = mapcat__3.cljs$lang$applyTo;
  mapcat.cljs$lang$arity$2 = mapcat__2;
  mapcat.cljs$lang$arity$variadic = mapcat__3.cljs$lang$arity$variadic;
  return mapcat
}();
cljs.core.filter = function filter(pred, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____9356 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____9356) {
      var s__9357 = temp__3974__auto____9356;
      if(cljs.core.chunked_seq_QMARK_.call(null, s__9357)) {
        var c__9358 = cljs.core.chunk_first.call(null, s__9357);
        var size__9359 = cljs.core.count.call(null, c__9358);
        var b__9360 = cljs.core.chunk_buffer.call(null, size__9359);
        var n__2527__auto____9361 = size__9359;
        var i__9362 = 0;
        while(true) {
          if(i__9362 < n__2527__auto____9361) {
            if(cljs.core.truth_(pred.call(null, cljs.core._nth.call(null, c__9358, i__9362)))) {
              cljs.core.chunk_append.call(null, b__9360, cljs.core._nth.call(null, c__9358, i__9362))
            }else {
            }
            var G__9365 = i__9362 + 1;
            i__9362 = G__9365;
            continue
          }else {
          }
          break
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__9360), filter.call(null, pred, cljs.core.chunk_rest.call(null, s__9357)))
      }else {
        var f__9363 = cljs.core.first.call(null, s__9357);
        var r__9364 = cljs.core.rest.call(null, s__9357);
        if(cljs.core.truth_(pred.call(null, f__9363))) {
          return cljs.core.cons.call(null, f__9363, filter.call(null, pred, r__9364))
        }else {
          return filter.call(null, pred, r__9364)
        }
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.remove = function remove(pred, coll) {
  return cljs.core.filter.call(null, cljs.core.complement.call(null, pred), coll)
};
cljs.core.tree_seq = function tree_seq(branch_QMARK_, children, root) {
  var walk__9368 = function walk(node) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, node, cljs.core.truth_(branch_QMARK_.call(null, node)) ? cljs.core.mapcat.call(null, walk, children.call(null, node)) : null)
    }, null)
  };
  return walk__9368.call(null, root)
};
cljs.core.flatten = function flatten(x) {
  return cljs.core.filter.call(null, function(p1__9366_SHARP_) {
    return!cljs.core.sequential_QMARK_.call(null, p1__9366_SHARP_)
  }, cljs.core.rest.call(null, cljs.core.tree_seq.call(null, cljs.core.sequential_QMARK_, cljs.core.seq, x)))
};
cljs.core.into = function into(to, from) {
  if(function() {
    var G__9372__9373 = to;
    if(G__9372__9373) {
      if(function() {
        var or__3824__auto____9374 = G__9372__9373.cljs$lang$protocol_mask$partition1$ & 1;
        if(or__3824__auto____9374) {
          return or__3824__auto____9374
        }else {
          return G__9372__9373.cljs$core$IEditableCollection$
        }
      }()) {
        return true
      }else {
        if(!G__9372__9373.cljs$lang$protocol_mask$partition1$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IEditableCollection, G__9372__9373)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IEditableCollection, G__9372__9373)
    }
  }()) {
    return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, cljs.core._conj_BANG_, cljs.core.transient$.call(null, to), from))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, to, from)
  }
};
cljs.core.mapv = function() {
  var mapv = null;
  var mapv__2 = function(f, coll) {
    return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(v, o) {
      return cljs.core.conj_BANG_.call(null, v, f.call(null, o))
    }, cljs.core.transient$.call(null, cljs.core.PersistentVector.EMPTY), coll))
  };
  var mapv__3 = function(f, c1, c2) {
    return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.map.call(null, f, c1, c2))
  };
  var mapv__4 = function(f, c1, c2, c3) {
    return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.map.call(null, f, c1, c2, c3))
  };
  var mapv__5 = function() {
    var G__9375__delegate = function(f, c1, c2, c3, colls) {
      return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.apply.call(null, cljs.core.map, f, c1, c2, c3, colls))
    };
    var G__9375 = function(f, c1, c2, c3, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__9375__delegate.call(this, f, c1, c2, c3, colls)
    };
    G__9375.cljs$lang$maxFixedArity = 4;
    G__9375.cljs$lang$applyTo = function(arglist__9376) {
      var f = cljs.core.first(arglist__9376);
      var c1 = cljs.core.first(cljs.core.next(arglist__9376));
      var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9376)));
      var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9376))));
      var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9376))));
      return G__9375__delegate(f, c1, c2, c3, colls)
    };
    G__9375.cljs$lang$arity$variadic = G__9375__delegate;
    return G__9375
  }();
  mapv = function(f, c1, c2, c3, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return mapv__2.call(this, f, c1);
      case 3:
        return mapv__3.call(this, f, c1, c2);
      case 4:
        return mapv__4.call(this, f, c1, c2, c3);
      default:
        return mapv__5.cljs$lang$arity$variadic(f, c1, c2, c3, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  mapv.cljs$lang$maxFixedArity = 4;
  mapv.cljs$lang$applyTo = mapv__5.cljs$lang$applyTo;
  mapv.cljs$lang$arity$2 = mapv__2;
  mapv.cljs$lang$arity$3 = mapv__3;
  mapv.cljs$lang$arity$4 = mapv__4;
  mapv.cljs$lang$arity$variadic = mapv__5.cljs$lang$arity$variadic;
  return mapv
}();
cljs.core.filterv = function filterv(pred, coll) {
  return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(v, o) {
    if(cljs.core.truth_(pred.call(null, o))) {
      return cljs.core.conj_BANG_.call(null, v, o)
    }else {
      return v
    }
  }, cljs.core.transient$.call(null, cljs.core.PersistentVector.EMPTY), coll))
};
cljs.core.partition = function() {
  var partition = null;
  var partition__2 = function(n, coll) {
    return partition.call(null, n, n, coll)
  };
  var partition__3 = function(n, step, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____9383 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____9383) {
        var s__9384 = temp__3974__auto____9383;
        var p__9385 = cljs.core.take.call(null, n, s__9384);
        if(n === cljs.core.count.call(null, p__9385)) {
          return cljs.core.cons.call(null, p__9385, partition.call(null, n, step, cljs.core.drop.call(null, step, s__9384)))
        }else {
          return null
        }
      }else {
        return null
      }
    }, null)
  };
  var partition__4 = function(n, step, pad, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____9386 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____9386) {
        var s__9387 = temp__3974__auto____9386;
        var p__9388 = cljs.core.take.call(null, n, s__9387);
        if(n === cljs.core.count.call(null, p__9388)) {
          return cljs.core.cons.call(null, p__9388, partition.call(null, n, step, pad, cljs.core.drop.call(null, step, s__9387)))
        }else {
          return cljs.core.list.call(null, cljs.core.take.call(null, n, cljs.core.concat.call(null, p__9388, pad)))
        }
      }else {
        return null
      }
    }, null)
  };
  partition = function(n, step, pad, coll) {
    switch(arguments.length) {
      case 2:
        return partition__2.call(this, n, step);
      case 3:
        return partition__3.call(this, n, step, pad);
      case 4:
        return partition__4.call(this, n, step, pad, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  partition.cljs$lang$arity$2 = partition__2;
  partition.cljs$lang$arity$3 = partition__3;
  partition.cljs$lang$arity$4 = partition__4;
  return partition
}();
cljs.core.get_in = function() {
  var get_in = null;
  var get_in__2 = function(m, ks) {
    return cljs.core.reduce.call(null, cljs.core.get, m, ks)
  };
  var get_in__3 = function(m, ks, not_found) {
    var sentinel__9393 = cljs.core.lookup_sentinel;
    var m__9394 = m;
    var ks__9395 = cljs.core.seq.call(null, ks);
    while(true) {
      if(ks__9395) {
        var m__9396 = cljs.core._lookup.call(null, m__9394, cljs.core.first.call(null, ks__9395), sentinel__9393);
        if(sentinel__9393 === m__9396) {
          return not_found
        }else {
          var G__9397 = sentinel__9393;
          var G__9398 = m__9396;
          var G__9399 = cljs.core.next.call(null, ks__9395);
          sentinel__9393 = G__9397;
          m__9394 = G__9398;
          ks__9395 = G__9399;
          continue
        }
      }else {
        return m__9394
      }
      break
    }
  };
  get_in = function(m, ks, not_found) {
    switch(arguments.length) {
      case 2:
        return get_in__2.call(this, m, ks);
      case 3:
        return get_in__3.call(this, m, ks, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  get_in.cljs$lang$arity$2 = get_in__2;
  get_in.cljs$lang$arity$3 = get_in__3;
  return get_in
}();
cljs.core.assoc_in = function assoc_in(m, p__9400, v) {
  var vec__9405__9406 = p__9400;
  var k__9407 = cljs.core.nth.call(null, vec__9405__9406, 0, null);
  var ks__9408 = cljs.core.nthnext.call(null, vec__9405__9406, 1);
  if(cljs.core.truth_(ks__9408)) {
    return cljs.core.assoc.call(null, m, k__9407, assoc_in.call(null, cljs.core._lookup.call(null, m, k__9407, null), ks__9408, v))
  }else {
    return cljs.core.assoc.call(null, m, k__9407, v)
  }
};
cljs.core.update_in = function() {
  var update_in__delegate = function(m, p__9409, f, args) {
    var vec__9414__9415 = p__9409;
    var k__9416 = cljs.core.nth.call(null, vec__9414__9415, 0, null);
    var ks__9417 = cljs.core.nthnext.call(null, vec__9414__9415, 1);
    if(cljs.core.truth_(ks__9417)) {
      return cljs.core.assoc.call(null, m, k__9416, cljs.core.apply.call(null, update_in, cljs.core._lookup.call(null, m, k__9416, null), ks__9417, f, args))
    }else {
      return cljs.core.assoc.call(null, m, k__9416, cljs.core.apply.call(null, f, cljs.core._lookup.call(null, m, k__9416, null), args))
    }
  };
  var update_in = function(m, p__9409, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
    }
    return update_in__delegate.call(this, m, p__9409, f, args)
  };
  update_in.cljs$lang$maxFixedArity = 3;
  update_in.cljs$lang$applyTo = function(arglist__9418) {
    var m = cljs.core.first(arglist__9418);
    var p__9409 = cljs.core.first(cljs.core.next(arglist__9418));
    var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9418)));
    var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9418)));
    return update_in__delegate(m, p__9409, f, args)
  };
  update_in.cljs$lang$arity$variadic = update_in__delegate;
  return update_in
}();
cljs.core.Vector = function(meta, array, __hash) {
  this.meta = meta;
  this.array = array;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32400159
};
cljs.core.Vector.cljs$lang$type = true;
cljs.core.Vector.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Vector")
};
cljs.core.Vector.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9421 = this;
  var h__2192__auto____9422 = this__9421.__hash;
  if(!(h__2192__auto____9422 == null)) {
    return h__2192__auto____9422
  }else {
    var h__2192__auto____9423 = cljs.core.hash_coll.call(null, coll);
    this__9421.__hash = h__2192__auto____9423;
    return h__2192__auto____9423
  }
};
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9424 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9425 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__9426 = this;
  var new_array__9427 = this__9426.array.slice();
  new_array__9427[k] = v;
  return new cljs.core.Vector(this__9426.meta, new_array__9427, null)
};
cljs.core.Vector.prototype.call = function() {
  var G__9458 = null;
  var G__9458__2 = function(this_sym9428, k) {
    var this__9430 = this;
    var this_sym9428__9431 = this;
    var coll__9432 = this_sym9428__9431;
    return coll__9432.cljs$core$ILookup$_lookup$arity$2(coll__9432, k)
  };
  var G__9458__3 = function(this_sym9429, k, not_found) {
    var this__9430 = this;
    var this_sym9429__9433 = this;
    var coll__9434 = this_sym9429__9433;
    return coll__9434.cljs$core$ILookup$_lookup$arity$3(coll__9434, k, not_found)
  };
  G__9458 = function(this_sym9429, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9458__2.call(this, this_sym9429, k);
      case 3:
        return G__9458__3.call(this, this_sym9429, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9458
}();
cljs.core.Vector.prototype.apply = function(this_sym9419, args9420) {
  var this__9435 = this;
  return this_sym9419.call.apply(this_sym9419, [this_sym9419].concat(args9420.slice()))
};
cljs.core.Vector.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9436 = this;
  var new_array__9437 = this__9436.array.slice();
  new_array__9437.push(o);
  return new cljs.core.Vector(this__9436.meta, new_array__9437, null)
};
cljs.core.Vector.prototype.toString = function() {
  var this__9438 = this;
  var this__9439 = this;
  return cljs.core.pr_str.call(null, this__9439)
};
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(v, f) {
  var this__9440 = this;
  return cljs.core.ci_reduce.call(null, this__9440.array, f)
};
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(v, f, start) {
  var this__9441 = this;
  return cljs.core.ci_reduce.call(null, this__9441.array, f, start)
};
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9442 = this;
  if(this__9442.array.length > 0) {
    var vector_seq__9443 = function vector_seq(i) {
      return new cljs.core.LazySeq(null, false, function() {
        if(i < this__9442.array.length) {
          return cljs.core.cons.call(null, this__9442.array[i], vector_seq.call(null, i + 1))
        }else {
          return null
        }
      }, null)
    };
    return vector_seq__9443.call(null, 0)
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9444 = this;
  return this__9444.array.length
};
cljs.core.Vector.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__9445 = this;
  var count__9446 = this__9445.array.length;
  if(count__9446 > 0) {
    return this__9445.array[count__9446 - 1]
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__9447 = this;
  if(this__9447.array.length > 0) {
    var new_array__9448 = this__9447.array.slice();
    new_array__9448.pop();
    return new cljs.core.Vector(this__9447.meta, new_array__9448, null)
  }else {
    throw new Error("Can't pop empty vector");
  }
};
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__9449 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9450 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9451 = this;
  return new cljs.core.Vector(meta, this__9451.array, this__9451.__hash)
};
cljs.core.Vector.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9452 = this;
  return this__9452.meta
};
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__9453 = this;
  if(function() {
    var and__3822__auto____9454 = 0 <= n;
    if(and__3822__auto____9454) {
      return n < this__9453.array.length
    }else {
      return and__3822__auto____9454
    }
  }()) {
    return this__9453.array[n]
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__9455 = this;
  if(function() {
    var and__3822__auto____9456 = 0 <= n;
    if(and__3822__auto____9456) {
      return n < this__9455.array.length
    }else {
      return and__3822__auto____9456
    }
  }()) {
    return this__9455.array[n]
  }else {
    return not_found
  }
};
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9457 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__9457.meta)
};
cljs.core.Vector;
cljs.core.Vector.EMPTY = new cljs.core.Vector(null, [], 0);
cljs.core.Vector.fromArray = function(xs) {
  return new cljs.core.Vector(null, xs, null)
};
cljs.core.VectorNode = function(edit, arr) {
  this.edit = edit;
  this.arr = arr
};
cljs.core.VectorNode.cljs$lang$type = true;
cljs.core.VectorNode.cljs$lang$ctorPrSeq = function(this__2310__auto__) {
  return cljs.core.list.call(null, "cljs.core/VectorNode")
};
cljs.core.VectorNode;
cljs.core.pv_fresh_node = function pv_fresh_node(edit) {
  return new cljs.core.VectorNode(edit, cljs.core.make_array.call(null, 32))
};
cljs.core.pv_aget = function pv_aget(node, idx) {
  return node.arr[idx]
};
cljs.core.pv_aset = function pv_aset(node, idx, val) {
  return node.arr[idx] = val
};
cljs.core.pv_clone_node = function pv_clone_node(node) {
  return new cljs.core.VectorNode(node.edit, node.arr.slice())
};
cljs.core.tail_off = function tail_off(pv) {
  var cnt__9460 = pv.cnt;
  if(cnt__9460 < 32) {
    return 0
  }else {
    return cnt__9460 - 1 >>> 5 << 5
  }
};
cljs.core.new_path = function new_path(edit, level, node) {
  var ll__9466 = level;
  var ret__9467 = node;
  while(true) {
    if(ll__9466 === 0) {
      return ret__9467
    }else {
      var embed__9468 = ret__9467;
      var r__9469 = cljs.core.pv_fresh_node.call(null, edit);
      var ___9470 = cljs.core.pv_aset.call(null, r__9469, 0, embed__9468);
      var G__9471 = ll__9466 - 5;
      var G__9472 = r__9469;
      ll__9466 = G__9471;
      ret__9467 = G__9472;
      continue
    }
    break
  }
};
cljs.core.push_tail = function push_tail(pv, level, parent, tailnode) {
  var ret__9478 = cljs.core.pv_clone_node.call(null, parent);
  var subidx__9479 = pv.cnt - 1 >>> level & 31;
  if(5 === level) {
    cljs.core.pv_aset.call(null, ret__9478, subidx__9479, tailnode);
    return ret__9478
  }else {
    var child__9480 = cljs.core.pv_aget.call(null, parent, subidx__9479);
    if(!(child__9480 == null)) {
      var node_to_insert__9481 = push_tail.call(null, pv, level - 5, child__9480, tailnode);
      cljs.core.pv_aset.call(null, ret__9478, subidx__9479, node_to_insert__9481);
      return ret__9478
    }else {
      var node_to_insert__9482 = cljs.core.new_path.call(null, null, level - 5, tailnode);
      cljs.core.pv_aset.call(null, ret__9478, subidx__9479, node_to_insert__9482);
      return ret__9478
    }
  }
};
cljs.core.array_for = function array_for(pv, i) {
  if(function() {
    var and__3822__auto____9486 = 0 <= i;
    if(and__3822__auto____9486) {
      return i < pv.cnt
    }else {
      return and__3822__auto____9486
    }
  }()) {
    if(i >= cljs.core.tail_off.call(null, pv)) {
      return pv.tail
    }else {
      var node__9487 = pv.root;
      var level__9488 = pv.shift;
      while(true) {
        if(level__9488 > 0) {
          var G__9489 = cljs.core.pv_aget.call(null, node__9487, i >>> level__9488 & 31);
          var G__9490 = level__9488 - 5;
          node__9487 = G__9489;
          level__9488 = G__9490;
          continue
        }else {
          return node__9487.arr
        }
        break
      }
    }
  }else {
    throw new Error([cljs.core.str("No item "), cljs.core.str(i), cljs.core.str(" in vector of length "), cljs.core.str(pv.cnt)].join(""));
  }
};
cljs.core.do_assoc = function do_assoc(pv, level, node, i, val) {
  var ret__9493 = cljs.core.pv_clone_node.call(null, node);
  if(level === 0) {
    cljs.core.pv_aset.call(null, ret__9493, i & 31, val);
    return ret__9493
  }else {
    var subidx__9494 = i >>> level & 31;
    cljs.core.pv_aset.call(null, ret__9493, subidx__9494, do_assoc.call(null, pv, level - 5, cljs.core.pv_aget.call(null, node, subidx__9494), i, val));
    return ret__9493
  }
};
cljs.core.pop_tail = function pop_tail(pv, level, node) {
  var subidx__9500 = pv.cnt - 2 >>> level & 31;
  if(level > 5) {
    var new_child__9501 = pop_tail.call(null, pv, level - 5, cljs.core.pv_aget.call(null, node, subidx__9500));
    if(function() {
      var and__3822__auto____9502 = new_child__9501 == null;
      if(and__3822__auto____9502) {
        return subidx__9500 === 0
      }else {
        return and__3822__auto____9502
      }
    }()) {
      return null
    }else {
      var ret__9503 = cljs.core.pv_clone_node.call(null, node);
      cljs.core.pv_aset.call(null, ret__9503, subidx__9500, new_child__9501);
      return ret__9503
    }
  }else {
    if(subidx__9500 === 0) {
      return null
    }else {
      if("\ufdd0'else") {
        var ret__9504 = cljs.core.pv_clone_node.call(null, node);
        cljs.core.pv_aset.call(null, ret__9504, subidx__9500, null);
        return ret__9504
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentVector = function(meta, cnt, shift, root, tail, __hash) {
  this.meta = meta;
  this.cnt = cnt;
  this.shift = shift;
  this.root = root;
  this.tail = tail;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 167668511
};
cljs.core.PersistentVector.cljs$lang$type = true;
cljs.core.PersistentVector.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentVector")
};
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__9507 = this;
  return new cljs.core.TransientVector(this__9507.cnt, this__9507.shift, cljs.core.tv_editable_root.call(null, this__9507.root), cljs.core.tv_editable_tail.call(null, this__9507.tail))
};
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9508 = this;
  var h__2192__auto____9509 = this__9508.__hash;
  if(!(h__2192__auto____9509 == null)) {
    return h__2192__auto____9509
  }else {
    var h__2192__auto____9510 = cljs.core.hash_coll.call(null, coll);
    this__9508.__hash = h__2192__auto____9510;
    return h__2192__auto____9510
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9511 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9512 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__9513 = this;
  if(function() {
    var and__3822__auto____9514 = 0 <= k;
    if(and__3822__auto____9514) {
      return k < this__9513.cnt
    }else {
      return and__3822__auto____9514
    }
  }()) {
    if(cljs.core.tail_off.call(null, coll) <= k) {
      var new_tail__9515 = this__9513.tail.slice();
      new_tail__9515[k & 31] = v;
      return new cljs.core.PersistentVector(this__9513.meta, this__9513.cnt, this__9513.shift, this__9513.root, new_tail__9515, null)
    }else {
      return new cljs.core.PersistentVector(this__9513.meta, this__9513.cnt, this__9513.shift, cljs.core.do_assoc.call(null, coll, this__9513.shift, this__9513.root, k, v), this__9513.tail, null)
    }
  }else {
    if(k === this__9513.cnt) {
      return coll.cljs$core$ICollection$_conj$arity$2(coll, v)
    }else {
      if("\ufdd0'else") {
        throw new Error([cljs.core.str("Index "), cljs.core.str(k), cljs.core.str(" out of bounds  [0,"), cljs.core.str(this__9513.cnt), cljs.core.str("]")].join(""));
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentVector.prototype.call = function() {
  var G__9563 = null;
  var G__9563__2 = function(this_sym9516, k) {
    var this__9518 = this;
    var this_sym9516__9519 = this;
    var coll__9520 = this_sym9516__9519;
    return coll__9520.cljs$core$ILookup$_lookup$arity$2(coll__9520, k)
  };
  var G__9563__3 = function(this_sym9517, k, not_found) {
    var this__9518 = this;
    var this_sym9517__9521 = this;
    var coll__9522 = this_sym9517__9521;
    return coll__9522.cljs$core$ILookup$_lookup$arity$3(coll__9522, k, not_found)
  };
  G__9563 = function(this_sym9517, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9563__2.call(this, this_sym9517, k);
      case 3:
        return G__9563__3.call(this, this_sym9517, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9563
}();
cljs.core.PersistentVector.prototype.apply = function(this_sym9505, args9506) {
  var this__9523 = this;
  return this_sym9505.call.apply(this_sym9505, [this_sym9505].concat(args9506.slice()))
};
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(v, f, init) {
  var this__9524 = this;
  var step_init__9525 = [0, init];
  var i__9526 = 0;
  while(true) {
    if(i__9526 < this__9524.cnt) {
      var arr__9527 = cljs.core.array_for.call(null, v, i__9526);
      var len__9528 = arr__9527.length;
      var init__9532 = function() {
        var j__9529 = 0;
        var init__9530 = step_init__9525[1];
        while(true) {
          if(j__9529 < len__9528) {
            var init__9531 = f.call(null, init__9530, j__9529 + i__9526, arr__9527[j__9529]);
            if(cljs.core.reduced_QMARK_.call(null, init__9531)) {
              return init__9531
            }else {
              var G__9564 = j__9529 + 1;
              var G__9565 = init__9531;
              j__9529 = G__9564;
              init__9530 = G__9565;
              continue
            }
          }else {
            step_init__9525[0] = len__9528;
            step_init__9525[1] = init__9530;
            return init__9530
          }
          break
        }
      }();
      if(cljs.core.reduced_QMARK_.call(null, init__9532)) {
        return cljs.core.deref.call(null, init__9532)
      }else {
        var G__9566 = i__9526 + step_init__9525[0];
        i__9526 = G__9566;
        continue
      }
    }else {
      return step_init__9525[1]
    }
    break
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9533 = this;
  if(this__9533.cnt - cljs.core.tail_off.call(null, coll) < 32) {
    var new_tail__9534 = this__9533.tail.slice();
    new_tail__9534.push(o);
    return new cljs.core.PersistentVector(this__9533.meta, this__9533.cnt + 1, this__9533.shift, this__9533.root, new_tail__9534, null)
  }else {
    var root_overflow_QMARK___9535 = this__9533.cnt >>> 5 > 1 << this__9533.shift;
    var new_shift__9536 = root_overflow_QMARK___9535 ? this__9533.shift + 5 : this__9533.shift;
    var new_root__9538 = root_overflow_QMARK___9535 ? function() {
      var n_r__9537 = cljs.core.pv_fresh_node.call(null, null);
      cljs.core.pv_aset.call(null, n_r__9537, 0, this__9533.root);
      cljs.core.pv_aset.call(null, n_r__9537, 1, cljs.core.new_path.call(null, null, this__9533.shift, new cljs.core.VectorNode(null, this__9533.tail)));
      return n_r__9537
    }() : cljs.core.push_tail.call(null, coll, this__9533.shift, this__9533.root, new cljs.core.VectorNode(null, this__9533.tail));
    return new cljs.core.PersistentVector(this__9533.meta, this__9533.cnt + 1, new_shift__9536, new_root__9538, [o], null)
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__9539 = this;
  if(this__9539.cnt > 0) {
    return new cljs.core.RSeq(coll, this__9539.cnt - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = function(coll) {
  var this__9540 = this;
  return coll.cljs$core$IIndexed$_nth$arity$2(coll, 0)
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = function(coll) {
  var this__9541 = this;
  return coll.cljs$core$IIndexed$_nth$arity$2(coll, 1)
};
cljs.core.PersistentVector.prototype.toString = function() {
  var this__9542 = this;
  var this__9543 = this;
  return cljs.core.pr_str.call(null, this__9543)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(v, f) {
  var this__9544 = this;
  return cljs.core.ci_reduce.call(null, v, f)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(v, f, start) {
  var this__9545 = this;
  return cljs.core.ci_reduce.call(null, v, f, start)
};
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9546 = this;
  if(this__9546.cnt === 0) {
    return null
  }else {
    return cljs.core.chunked_seq.call(null, coll, 0, 0)
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9547 = this;
  return this__9547.cnt
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__9548 = this;
  if(this__9548.cnt > 0) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, this__9548.cnt - 1)
  }else {
    return null
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__9549 = this;
  if(this__9549.cnt === 0) {
    throw new Error("Can't pop empty vector");
  }else {
    if(1 === this__9549.cnt) {
      return cljs.core._with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__9549.meta)
    }else {
      if(1 < this__9549.cnt - cljs.core.tail_off.call(null, coll)) {
        return new cljs.core.PersistentVector(this__9549.meta, this__9549.cnt - 1, this__9549.shift, this__9549.root, this__9549.tail.slice(0, -1), null)
      }else {
        if("\ufdd0'else") {
          var new_tail__9550 = cljs.core.array_for.call(null, coll, this__9549.cnt - 2);
          var nr__9551 = cljs.core.pop_tail.call(null, coll, this__9549.shift, this__9549.root);
          var new_root__9552 = nr__9551 == null ? cljs.core.PersistentVector.EMPTY_NODE : nr__9551;
          var cnt_1__9553 = this__9549.cnt - 1;
          if(function() {
            var and__3822__auto____9554 = 5 < this__9549.shift;
            if(and__3822__auto____9554) {
              return cljs.core.pv_aget.call(null, new_root__9552, 1) == null
            }else {
              return and__3822__auto____9554
            }
          }()) {
            return new cljs.core.PersistentVector(this__9549.meta, cnt_1__9553, this__9549.shift - 5, cljs.core.pv_aget.call(null, new_root__9552, 0), new_tail__9550, null)
          }else {
            return new cljs.core.PersistentVector(this__9549.meta, cnt_1__9553, this__9549.shift, new_root__9552, new_tail__9550, null)
          }
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__9555 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9556 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9557 = this;
  return new cljs.core.PersistentVector(meta, this__9557.cnt, this__9557.shift, this__9557.root, this__9557.tail, this__9557.__hash)
};
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9558 = this;
  return this__9558.meta
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__9559 = this;
  return cljs.core.array_for.call(null, coll, n)[n & 31]
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__9560 = this;
  if(function() {
    var and__3822__auto____9561 = 0 <= n;
    if(and__3822__auto____9561) {
      return n < this__9560.cnt
    }else {
      return and__3822__auto____9561
    }
  }()) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
  }else {
    return not_found
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9562 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__9562.meta)
};
cljs.core.PersistentVector;
cljs.core.PersistentVector.EMPTY_NODE = cljs.core.pv_fresh_node.call(null, null);
cljs.core.PersistentVector.EMPTY = new cljs.core.PersistentVector(null, 0, 5, cljs.core.PersistentVector.EMPTY_NODE, [], 0);
cljs.core.PersistentVector.fromArray = function(xs, no_clone) {
  var l__9567 = xs.length;
  var xs__9568 = no_clone === true ? xs : xs.slice();
  if(l__9567 < 32) {
    return new cljs.core.PersistentVector(null, l__9567, 5, cljs.core.PersistentVector.EMPTY_NODE, xs__9568, null)
  }else {
    var node__9569 = xs__9568.slice(0, 32);
    var v__9570 = new cljs.core.PersistentVector(null, 32, 5, cljs.core.PersistentVector.EMPTY_NODE, node__9569, null);
    var i__9571 = 32;
    var out__9572 = cljs.core._as_transient.call(null, v__9570);
    while(true) {
      if(i__9571 < l__9567) {
        var G__9573 = i__9571 + 1;
        var G__9574 = cljs.core.conj_BANG_.call(null, out__9572, xs__9568[i__9571]);
        i__9571 = G__9573;
        out__9572 = G__9574;
        continue
      }else {
        return cljs.core.persistent_BANG_.call(null, out__9572)
      }
      break
    }
  }
};
cljs.core.vec = function vec(coll) {
  return cljs.core._persistent_BANG_.call(null, cljs.core.reduce.call(null, cljs.core._conj_BANG_, cljs.core._as_transient.call(null, cljs.core.PersistentVector.EMPTY), coll))
};
cljs.core.vector = function() {
  var vector__delegate = function(args) {
    return cljs.core.vec.call(null, args)
  };
  var vector = function(var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return vector__delegate.call(this, args)
  };
  vector.cljs$lang$maxFixedArity = 0;
  vector.cljs$lang$applyTo = function(arglist__9575) {
    var args = cljs.core.seq(arglist__9575);
    return vector__delegate(args)
  };
  vector.cljs$lang$arity$variadic = vector__delegate;
  return vector
}();
cljs.core.ChunkedSeq = function(vec, node, i, off, meta) {
  this.vec = vec;
  this.node = node;
  this.i = i;
  this.off = off;
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 27525356
};
cljs.core.ChunkedSeq.cljs$lang$type = true;
cljs.core.ChunkedSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkedSeq")
};
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__9576 = this;
  if(this__9576.off + 1 < this__9576.node.length) {
    var s__9577 = cljs.core.chunked_seq.call(null, this__9576.vec, this__9576.node, this__9576.i, this__9576.off + 1);
    if(s__9577 == null) {
      return null
    }else {
      return s__9577
    }
  }else {
    return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll)
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9578 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9579 = this;
  return coll
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__9580 = this;
  return this__9580.node[this__9580.off]
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__9581 = this;
  if(this__9581.off + 1 < this__9581.node.length) {
    var s__9582 = cljs.core.chunked_seq.call(null, this__9581.vec, this__9581.node, this__9581.i, this__9581.off + 1);
    if(s__9582 == null) {
      return cljs.core.List.EMPTY
    }else {
      return s__9582
    }
  }else {
    return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll)
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function(coll) {
  var this__9583 = this;
  var l__9584 = this__9583.node.length;
  var s__9585 = this__9583.i + l__9584 < cljs.core._count.call(null, this__9583.vec) ? cljs.core.chunked_seq.call(null, this__9583.vec, this__9583.i + l__9584, 0) : null;
  if(s__9585 == null) {
    return null
  }else {
    return s__9585
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9586 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, m) {
  var this__9587 = this;
  return cljs.core.chunked_seq.call(null, this__9587.vec, this__9587.node, this__9587.i, this__9587.off, m)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = function(coll) {
  var this__9588 = this;
  return this__9588.meta
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9589 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__9589.meta)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function(coll) {
  var this__9590 = this;
  return cljs.core.array_chunk.call(null, this__9590.node, this__9590.off)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function(coll) {
  var this__9591 = this;
  var l__9592 = this__9591.node.length;
  var s__9593 = this__9591.i + l__9592 < cljs.core._count.call(null, this__9591.vec) ? cljs.core.chunked_seq.call(null, this__9591.vec, this__9591.i + l__9592, 0) : null;
  if(s__9593 == null) {
    return cljs.core.List.EMPTY
  }else {
    return s__9593
  }
};
cljs.core.ChunkedSeq;
cljs.core.chunked_seq = function() {
  var chunked_seq = null;
  var chunked_seq__3 = function(vec, i, off) {
    return chunked_seq.call(null, vec, cljs.core.array_for.call(null, vec, i), i, off, null)
  };
  var chunked_seq__4 = function(vec, node, i, off) {
    return chunked_seq.call(null, vec, node, i, off, null)
  };
  var chunked_seq__5 = function(vec, node, i, off, meta) {
    return new cljs.core.ChunkedSeq(vec, node, i, off, meta)
  };
  chunked_seq = function(vec, node, i, off, meta) {
    switch(arguments.length) {
      case 3:
        return chunked_seq__3.call(this, vec, node, i);
      case 4:
        return chunked_seq__4.call(this, vec, node, i, off);
      case 5:
        return chunked_seq__5.call(this, vec, node, i, off, meta)
    }
    throw"Invalid arity: " + arguments.length;
  };
  chunked_seq.cljs$lang$arity$3 = chunked_seq__3;
  chunked_seq.cljs$lang$arity$4 = chunked_seq__4;
  chunked_seq.cljs$lang$arity$5 = chunked_seq__5;
  return chunked_seq
}();
cljs.core.Subvec = function(meta, v, start, end, __hash) {
  this.meta = meta;
  this.v = v;
  this.start = start;
  this.end = end;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32400159
};
cljs.core.Subvec.cljs$lang$type = true;
cljs.core.Subvec.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Subvec")
};
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9596 = this;
  var h__2192__auto____9597 = this__9596.__hash;
  if(!(h__2192__auto____9597 == null)) {
    return h__2192__auto____9597
  }else {
    var h__2192__auto____9598 = cljs.core.hash_coll.call(null, coll);
    this__9596.__hash = h__2192__auto____9598;
    return h__2192__auto____9598
  }
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9599 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9600 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, key, val) {
  var this__9601 = this;
  var v_pos__9602 = this__9601.start + key;
  return new cljs.core.Subvec(this__9601.meta, cljs.core._assoc.call(null, this__9601.v, v_pos__9602, val), this__9601.start, this__9601.end > v_pos__9602 + 1 ? this__9601.end : v_pos__9602 + 1, null)
};
cljs.core.Subvec.prototype.call = function() {
  var G__9628 = null;
  var G__9628__2 = function(this_sym9603, k) {
    var this__9605 = this;
    var this_sym9603__9606 = this;
    var coll__9607 = this_sym9603__9606;
    return coll__9607.cljs$core$ILookup$_lookup$arity$2(coll__9607, k)
  };
  var G__9628__3 = function(this_sym9604, k, not_found) {
    var this__9605 = this;
    var this_sym9604__9608 = this;
    var coll__9609 = this_sym9604__9608;
    return coll__9609.cljs$core$ILookup$_lookup$arity$3(coll__9609, k, not_found)
  };
  G__9628 = function(this_sym9604, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9628__2.call(this, this_sym9604, k);
      case 3:
        return G__9628__3.call(this, this_sym9604, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9628
}();
cljs.core.Subvec.prototype.apply = function(this_sym9594, args9595) {
  var this__9610 = this;
  return this_sym9594.call.apply(this_sym9594, [this_sym9594].concat(args9595.slice()))
};
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9611 = this;
  return new cljs.core.Subvec(this__9611.meta, cljs.core._assoc_n.call(null, this__9611.v, this__9611.end, o), this__9611.start, this__9611.end + 1, null)
};
cljs.core.Subvec.prototype.toString = function() {
  var this__9612 = this;
  var this__9613 = this;
  return cljs.core.pr_str.call(null, this__9613)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__9614 = this;
  return cljs.core.ci_reduce.call(null, coll, f)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__9615 = this;
  return cljs.core.ci_reduce.call(null, coll, f, start)
};
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9616 = this;
  var subvec_seq__9617 = function subvec_seq(i) {
    if(i === this__9616.end) {
      return null
    }else {
      return cljs.core.cons.call(null, cljs.core._nth.call(null, this__9616.v, i), new cljs.core.LazySeq(null, false, function() {
        return subvec_seq.call(null, i + 1)
      }, null))
    }
  };
  return subvec_seq__9617.call(null, this__9616.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9618 = this;
  return this__9618.end - this__9618.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__9619 = this;
  return cljs.core._nth.call(null, this__9619.v, this__9619.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__9620 = this;
  if(this__9620.start === this__9620.end) {
    throw new Error("Can't pop empty vector");
  }else {
    return new cljs.core.Subvec(this__9620.meta, this__9620.v, this__9620.start, this__9620.end - 1, null)
  }
};
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__9621 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9622 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9623 = this;
  return new cljs.core.Subvec(meta, this__9623.v, this__9623.start, this__9623.end, this__9623.__hash)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9624 = this;
  return this__9624.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__9625 = this;
  return cljs.core._nth.call(null, this__9625.v, this__9625.start + n)
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__9626 = this;
  return cljs.core._nth.call(null, this__9626.v, this__9626.start + n, not_found)
};
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9627 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__9627.meta)
};
cljs.core.Subvec;
cljs.core.subvec = function() {
  var subvec = null;
  var subvec__2 = function(v, start) {
    return subvec.call(null, v, start, cljs.core.count.call(null, v))
  };
  var subvec__3 = function(v, start, end) {
    return new cljs.core.Subvec(null, v, start, end, null)
  };
  subvec = function(v, start, end) {
    switch(arguments.length) {
      case 2:
        return subvec__2.call(this, v, start);
      case 3:
        return subvec__3.call(this, v, start, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  subvec.cljs$lang$arity$2 = subvec__2;
  subvec.cljs$lang$arity$3 = subvec__3;
  return subvec
}();
cljs.core.tv_ensure_editable = function tv_ensure_editable(edit, node) {
  if(edit === node.edit) {
    return node
  }else {
    return new cljs.core.VectorNode(edit, node.arr.slice())
  }
};
cljs.core.tv_editable_root = function tv_editable_root(node) {
  return new cljs.core.VectorNode({}, node.arr.slice())
};
cljs.core.tv_editable_tail = function tv_editable_tail(tl) {
  var ret__9630 = cljs.core.make_array.call(null, 32);
  cljs.core.array_copy.call(null, tl, 0, ret__9630, 0, tl.length);
  return ret__9630
};
cljs.core.tv_push_tail = function tv_push_tail(tv, level, parent, tail_node) {
  var ret__9634 = cljs.core.tv_ensure_editable.call(null, tv.root.edit, parent);
  var subidx__9635 = tv.cnt - 1 >>> level & 31;
  cljs.core.pv_aset.call(null, ret__9634, subidx__9635, level === 5 ? tail_node : function() {
    var child__9636 = cljs.core.pv_aget.call(null, ret__9634, subidx__9635);
    if(!(child__9636 == null)) {
      return tv_push_tail.call(null, tv, level - 5, child__9636, tail_node)
    }else {
      return cljs.core.new_path.call(null, tv.root.edit, level - 5, tail_node)
    }
  }());
  return ret__9634
};
cljs.core.tv_pop_tail = function tv_pop_tail(tv, level, node) {
  var node__9641 = cljs.core.tv_ensure_editable.call(null, tv.root.edit, node);
  var subidx__9642 = tv.cnt - 2 >>> level & 31;
  if(level > 5) {
    var new_child__9643 = tv_pop_tail.call(null, tv, level - 5, cljs.core.pv_aget.call(null, node__9641, subidx__9642));
    if(function() {
      var and__3822__auto____9644 = new_child__9643 == null;
      if(and__3822__auto____9644) {
        return subidx__9642 === 0
      }else {
        return and__3822__auto____9644
      }
    }()) {
      return null
    }else {
      cljs.core.pv_aset.call(null, node__9641, subidx__9642, new_child__9643);
      return node__9641
    }
  }else {
    if(subidx__9642 === 0) {
      return null
    }else {
      if("\ufdd0'else") {
        cljs.core.pv_aset.call(null, node__9641, subidx__9642, null);
        return node__9641
      }else {
        return null
      }
    }
  }
};
cljs.core.editable_array_for = function editable_array_for(tv, i) {
  if(function() {
    var and__3822__auto____9649 = 0 <= i;
    if(and__3822__auto____9649) {
      return i < tv.cnt
    }else {
      return and__3822__auto____9649
    }
  }()) {
    if(i >= cljs.core.tail_off.call(null, tv)) {
      return tv.tail
    }else {
      var root__9650 = tv.root;
      var node__9651 = root__9650;
      var level__9652 = tv.shift;
      while(true) {
        if(level__9652 > 0) {
          var G__9653 = cljs.core.tv_ensure_editable.call(null, root__9650.edit, cljs.core.pv_aget.call(null, node__9651, i >>> level__9652 & 31));
          var G__9654 = level__9652 - 5;
          node__9651 = G__9653;
          level__9652 = G__9654;
          continue
        }else {
          return node__9651.arr
        }
        break
      }
    }
  }else {
    throw new Error([cljs.core.str("No item "), cljs.core.str(i), cljs.core.str(" in transient vector of length "), cljs.core.str(tv.cnt)].join(""));
  }
};
cljs.core.TransientVector = function(cnt, shift, root, tail) {
  this.cnt = cnt;
  this.shift = shift;
  this.root = root;
  this.tail = tail;
  this.cljs$lang$protocol_mask$partition0$ = 275;
  this.cljs$lang$protocol_mask$partition1$ = 22
};
cljs.core.TransientVector.cljs$lang$type = true;
cljs.core.TransientVector.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientVector")
};
cljs.core.TransientVector.prototype.call = function() {
  var G__9694 = null;
  var G__9694__2 = function(this_sym9657, k) {
    var this__9659 = this;
    var this_sym9657__9660 = this;
    var coll__9661 = this_sym9657__9660;
    return coll__9661.cljs$core$ILookup$_lookup$arity$2(coll__9661, k)
  };
  var G__9694__3 = function(this_sym9658, k, not_found) {
    var this__9659 = this;
    var this_sym9658__9662 = this;
    var coll__9663 = this_sym9658__9662;
    return coll__9663.cljs$core$ILookup$_lookup$arity$3(coll__9663, k, not_found)
  };
  G__9694 = function(this_sym9658, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9694__2.call(this, this_sym9658, k);
      case 3:
        return G__9694__3.call(this, this_sym9658, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9694
}();
cljs.core.TransientVector.prototype.apply = function(this_sym9655, args9656) {
  var this__9664 = this;
  return this_sym9655.call.apply(this_sym9655, [this_sym9655].concat(args9656.slice()))
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9665 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9666 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__9667 = this;
  if(this__9667.root.edit) {
    return cljs.core.array_for.call(null, coll, n)[n & 31]
  }else {
    throw new Error("nth after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__9668 = this;
  if(function() {
    var and__3822__auto____9669 = 0 <= n;
    if(and__3822__auto____9669) {
      return n < this__9668.cnt
    }else {
      return and__3822__auto____9669
    }
  }()) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
  }else {
    return not_found
  }
};
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9670 = this;
  if(this__9670.root.edit) {
    return this__9670.cnt
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = function(tcoll, n, val) {
  var this__9671 = this;
  if(this__9671.root.edit) {
    if(function() {
      var and__3822__auto____9672 = 0 <= n;
      if(and__3822__auto____9672) {
        return n < this__9671.cnt
      }else {
        return and__3822__auto____9672
      }
    }()) {
      if(cljs.core.tail_off.call(null, tcoll) <= n) {
        this__9671.tail[n & 31] = val;
        return tcoll
      }else {
        var new_root__9677 = function go(level, node) {
          var node__9675 = cljs.core.tv_ensure_editable.call(null, this__9671.root.edit, node);
          if(level === 0) {
            cljs.core.pv_aset.call(null, node__9675, n & 31, val);
            return node__9675
          }else {
            var subidx__9676 = n >>> level & 31;
            cljs.core.pv_aset.call(null, node__9675, subidx__9676, go.call(null, level - 5, cljs.core.pv_aget.call(null, node__9675, subidx__9676)));
            return node__9675
          }
        }.call(null, this__9671.shift, this__9671.root);
        this__9671.root = new_root__9677;
        return tcoll
      }
    }else {
      if(n === this__9671.cnt) {
        return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll, val)
      }else {
        if("\ufdd0'else") {
          throw new Error([cljs.core.str("Index "), cljs.core.str(n), cljs.core.str(" out of bounds for TransientVector of length"), cljs.core.str(this__9671.cnt)].join(""));
        }else {
          return null
        }
      }
    }
  }else {
    throw new Error("assoc! after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_pop_BANG_$arity$1 = function(tcoll) {
  var this__9678 = this;
  if(this__9678.root.edit) {
    if(this__9678.cnt === 0) {
      throw new Error("Can't pop empty vector");
    }else {
      if(1 === this__9678.cnt) {
        this__9678.cnt = 0;
        return tcoll
      }else {
        if((this__9678.cnt - 1 & 31) > 0) {
          this__9678.cnt = this__9678.cnt - 1;
          return tcoll
        }else {
          if("\ufdd0'else") {
            var new_tail__9679 = cljs.core.editable_array_for.call(null, tcoll, this__9678.cnt - 2);
            var new_root__9681 = function() {
              var nr__9680 = cljs.core.tv_pop_tail.call(null, tcoll, this__9678.shift, this__9678.root);
              if(!(nr__9680 == null)) {
                return nr__9680
              }else {
                return new cljs.core.VectorNode(this__9678.root.edit, cljs.core.make_array.call(null, 32))
              }
            }();
            if(function() {
              var and__3822__auto____9682 = 5 < this__9678.shift;
              if(and__3822__auto____9682) {
                return cljs.core.pv_aget.call(null, new_root__9681, 1) == null
              }else {
                return and__3822__auto____9682
              }
            }()) {
              var new_root__9683 = cljs.core.tv_ensure_editable.call(null, this__9678.root.edit, cljs.core.pv_aget.call(null, new_root__9681, 0));
              this__9678.root = new_root__9683;
              this__9678.shift = this__9678.shift - 5;
              this__9678.cnt = this__9678.cnt - 1;
              this__9678.tail = new_tail__9679;
              return tcoll
            }else {
              this__9678.root = new_root__9681;
              this__9678.cnt = this__9678.cnt - 1;
              this__9678.tail = new_tail__9679;
              return tcoll
            }
          }else {
            return null
          }
        }
      }
    }
  }else {
    throw new Error("pop! after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(tcoll, key, val) {
  var this__9684 = this;
  return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll, key, val)
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__9685 = this;
  if(this__9685.root.edit) {
    if(this__9685.cnt - cljs.core.tail_off.call(null, tcoll) < 32) {
      this__9685.tail[this__9685.cnt & 31] = o;
      this__9685.cnt = this__9685.cnt + 1;
      return tcoll
    }else {
      var tail_node__9686 = new cljs.core.VectorNode(this__9685.root.edit, this__9685.tail);
      var new_tail__9687 = cljs.core.make_array.call(null, 32);
      new_tail__9687[0] = o;
      this__9685.tail = new_tail__9687;
      if(this__9685.cnt >>> 5 > 1 << this__9685.shift) {
        var new_root_array__9688 = cljs.core.make_array.call(null, 32);
        var new_shift__9689 = this__9685.shift + 5;
        new_root_array__9688[0] = this__9685.root;
        new_root_array__9688[1] = cljs.core.new_path.call(null, this__9685.root.edit, this__9685.shift, tail_node__9686);
        this__9685.root = new cljs.core.VectorNode(this__9685.root.edit, new_root_array__9688);
        this__9685.shift = new_shift__9689;
        this__9685.cnt = this__9685.cnt + 1;
        return tcoll
      }else {
        var new_root__9690 = cljs.core.tv_push_tail.call(null, tcoll, this__9685.shift, this__9685.root, tail_node__9686);
        this__9685.root = new_root__9690;
        this__9685.cnt = this__9685.cnt + 1;
        return tcoll
      }
    }
  }else {
    throw new Error("conj! after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__9691 = this;
  if(this__9691.root.edit) {
    this__9691.root.edit = null;
    var len__9692 = this__9691.cnt - cljs.core.tail_off.call(null, tcoll);
    var trimmed_tail__9693 = cljs.core.make_array.call(null, len__9692);
    cljs.core.array_copy.call(null, this__9691.tail, 0, trimmed_tail__9693, 0, len__9692);
    return new cljs.core.PersistentVector(null, this__9691.cnt, this__9691.shift, this__9691.root, trimmed_tail__9693, null)
  }else {
    throw new Error("persistent! called twice");
  }
};
cljs.core.TransientVector;
cljs.core.PersistentQueueSeq = function(meta, front, rear, __hash) {
  this.meta = meta;
  this.front = front;
  this.rear = rear;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.PersistentQueueSeq.cljs$lang$type = true;
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentQueueSeq")
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9695 = this;
  var h__2192__auto____9696 = this__9695.__hash;
  if(!(h__2192__auto____9696 == null)) {
    return h__2192__auto____9696
  }else {
    var h__2192__auto____9697 = cljs.core.hash_coll.call(null, coll);
    this__9695.__hash = h__2192__auto____9697;
    return h__2192__auto____9697
  }
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9698 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.PersistentQueueSeq.prototype.toString = function() {
  var this__9699 = this;
  var this__9700 = this;
  return cljs.core.pr_str.call(null, this__9700)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9701 = this;
  return coll
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__9702 = this;
  return cljs.core._first.call(null, this__9702.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__9703 = this;
  var temp__3971__auto____9704 = cljs.core.next.call(null, this__9703.front);
  if(temp__3971__auto____9704) {
    var f1__9705 = temp__3971__auto____9704;
    return new cljs.core.PersistentQueueSeq(this__9703.meta, f1__9705, this__9703.rear, null)
  }else {
    if(this__9703.rear == null) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
    }else {
      return new cljs.core.PersistentQueueSeq(this__9703.meta, this__9703.rear, null, null)
    }
  }
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9706 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9707 = this;
  return new cljs.core.PersistentQueueSeq(meta, this__9707.front, this__9707.rear, this__9707.__hash)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9708 = this;
  return this__9708.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9709 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__9709.meta)
};
cljs.core.PersistentQueueSeq;
cljs.core.PersistentQueue = function(meta, count, front, rear, __hash) {
  this.meta = meta;
  this.count = count;
  this.front = front;
  this.rear = rear;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31858766
};
cljs.core.PersistentQueue.cljs$lang$type = true;
cljs.core.PersistentQueue.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentQueue")
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9710 = this;
  var h__2192__auto____9711 = this__9710.__hash;
  if(!(h__2192__auto____9711 == null)) {
    return h__2192__auto____9711
  }else {
    var h__2192__auto____9712 = cljs.core.hash_coll.call(null, coll);
    this__9710.__hash = h__2192__auto____9712;
    return h__2192__auto____9712
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9713 = this;
  if(cljs.core.truth_(this__9713.front)) {
    return new cljs.core.PersistentQueue(this__9713.meta, this__9713.count + 1, this__9713.front, cljs.core.conj.call(null, function() {
      var or__3824__auto____9714 = this__9713.rear;
      if(cljs.core.truth_(or__3824__auto____9714)) {
        return or__3824__auto____9714
      }else {
        return cljs.core.PersistentVector.EMPTY
      }
    }(), o), null)
  }else {
    return new cljs.core.PersistentQueue(this__9713.meta, this__9713.count + 1, cljs.core.conj.call(null, this__9713.front, o), cljs.core.PersistentVector.EMPTY, null)
  }
};
cljs.core.PersistentQueue.prototype.toString = function() {
  var this__9715 = this;
  var this__9716 = this;
  return cljs.core.pr_str.call(null, this__9716)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9717 = this;
  var rear__9718 = cljs.core.seq.call(null, this__9717.rear);
  if(cljs.core.truth_(function() {
    var or__3824__auto____9719 = this__9717.front;
    if(cljs.core.truth_(or__3824__auto____9719)) {
      return or__3824__auto____9719
    }else {
      return rear__9718
    }
  }())) {
    return new cljs.core.PersistentQueueSeq(null, this__9717.front, cljs.core.seq.call(null, rear__9718), null)
  }else {
    return null
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9720 = this;
  return this__9720.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__9721 = this;
  return cljs.core._first.call(null, this__9721.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__9722 = this;
  if(cljs.core.truth_(this__9722.front)) {
    var temp__3971__auto____9723 = cljs.core.next.call(null, this__9722.front);
    if(temp__3971__auto____9723) {
      var f1__9724 = temp__3971__auto____9723;
      return new cljs.core.PersistentQueue(this__9722.meta, this__9722.count - 1, f1__9724, this__9722.rear, null)
    }else {
      return new cljs.core.PersistentQueue(this__9722.meta, this__9722.count - 1, cljs.core.seq.call(null, this__9722.rear), cljs.core.PersistentVector.EMPTY, null)
    }
  }else {
    return coll
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__9725 = this;
  return cljs.core.first.call(null, this__9725.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__9726 = this;
  return cljs.core.rest.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9727 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9728 = this;
  return new cljs.core.PersistentQueue(meta, this__9728.count, this__9728.front, this__9728.rear, this__9728.__hash)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9729 = this;
  return this__9729.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9730 = this;
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.PersistentQueue;
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.PersistentVector.EMPTY, 0);
cljs.core.NeverEquiv = function() {
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2097152
};
cljs.core.NeverEquiv.cljs$lang$type = true;
cljs.core.NeverEquiv.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/NeverEquiv")
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(o, other) {
  var this__9731 = this;
  return false
};
cljs.core.NeverEquiv;
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function equiv_map(x, y) {
  return cljs.core.boolean$.call(null, cljs.core.map_QMARK_.call(null, y) ? cljs.core.count.call(null, x) === cljs.core.count.call(null, y) ? cljs.core.every_QMARK_.call(null, cljs.core.identity, cljs.core.map.call(null, function(xkv) {
    return cljs.core._EQ_.call(null, cljs.core._lookup.call(null, y, cljs.core.first.call(null, xkv), cljs.core.never_equiv), cljs.core.second.call(null, xkv))
  }, x)) : null : null)
};
cljs.core.scan_array = function scan_array(incr, k, array) {
  var len__9734 = array.length;
  var i__9735 = 0;
  while(true) {
    if(i__9735 < len__9734) {
      if(k === array[i__9735]) {
        return i__9735
      }else {
        var G__9736 = i__9735 + incr;
        i__9735 = G__9736;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.obj_map_compare_keys = function obj_map_compare_keys(a, b) {
  var a__9739 = cljs.core.hash.call(null, a);
  var b__9740 = cljs.core.hash.call(null, b);
  if(a__9739 < b__9740) {
    return-1
  }else {
    if(a__9739 > b__9740) {
      return 1
    }else {
      if("\ufdd0'else") {
        return 0
      }else {
        return null
      }
    }
  }
};
cljs.core.obj_map__GT_hash_map = function obj_map__GT_hash_map(m, k, v) {
  var ks__9748 = m.keys;
  var len__9749 = ks__9748.length;
  var so__9750 = m.strobj;
  var out__9751 = cljs.core.with_meta.call(null, cljs.core.PersistentHashMap.EMPTY, cljs.core.meta.call(null, m));
  var i__9752 = 0;
  var out__9753 = cljs.core.transient$.call(null, out__9751);
  while(true) {
    if(i__9752 < len__9749) {
      var k__9754 = ks__9748[i__9752];
      var G__9755 = i__9752 + 1;
      var G__9756 = cljs.core.assoc_BANG_.call(null, out__9753, k__9754, so__9750[k__9754]);
      i__9752 = G__9755;
      out__9753 = G__9756;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, cljs.core.assoc_BANG_.call(null, out__9753, k, v))
    }
    break
  }
};
cljs.core.obj_clone = function obj_clone(obj, ks) {
  var new_obj__9762 = {};
  var l__9763 = ks.length;
  var i__9764 = 0;
  while(true) {
    if(i__9764 < l__9763) {
      var k__9765 = ks[i__9764];
      new_obj__9762[k__9765] = obj[k__9765];
      var G__9766 = i__9764 + 1;
      i__9764 = G__9766;
      continue
    }else {
    }
    break
  }
  return new_obj__9762
};
cljs.core.ObjMap = function(meta, keys, strobj, update_count, __hash) {
  this.meta = meta;
  this.keys = keys;
  this.strobj = strobj;
  this.update_count = update_count;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 15075087
};
cljs.core.ObjMap.cljs$lang$type = true;
cljs.core.ObjMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ObjMap")
};
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__9769 = this;
  return cljs.core.transient$.call(null, cljs.core.into.call(null, cljs.core.hash_map.call(null), coll))
};
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9770 = this;
  var h__2192__auto____9771 = this__9770.__hash;
  if(!(h__2192__auto____9771 == null)) {
    return h__2192__auto____9771
  }else {
    var h__2192__auto____9772 = cljs.core.hash_imap.call(null, coll);
    this__9770.__hash = h__2192__auto____9772;
    return h__2192__auto____9772
  }
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9773 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9774 = this;
  if(function() {
    var and__3822__auto____9775 = goog.isString(k);
    if(and__3822__auto____9775) {
      return!(cljs.core.scan_array.call(null, 1, k, this__9774.keys) == null)
    }else {
      return and__3822__auto____9775
    }
  }()) {
    return this__9774.strobj[k]
  }else {
    return not_found
  }
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__9776 = this;
  if(goog.isString(k)) {
    if(function() {
      var or__3824__auto____9777 = this__9776.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD;
      if(or__3824__auto____9777) {
        return or__3824__auto____9777
      }else {
        return this__9776.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD
      }
    }()) {
      return cljs.core.obj_map__GT_hash_map.call(null, coll, k, v)
    }else {
      if(!(cljs.core.scan_array.call(null, 1, k, this__9776.keys) == null)) {
        var new_strobj__9778 = cljs.core.obj_clone.call(null, this__9776.strobj, this__9776.keys);
        new_strobj__9778[k] = v;
        return new cljs.core.ObjMap(this__9776.meta, this__9776.keys, new_strobj__9778, this__9776.update_count + 1, null)
      }else {
        var new_strobj__9779 = cljs.core.obj_clone.call(null, this__9776.strobj, this__9776.keys);
        var new_keys__9780 = this__9776.keys.slice();
        new_strobj__9779[k] = v;
        new_keys__9780.push(k);
        return new cljs.core.ObjMap(this__9776.meta, new_keys__9780, new_strobj__9779, this__9776.update_count + 1, null)
      }
    }
  }else {
    return cljs.core.obj_map__GT_hash_map.call(null, coll, k, v)
  }
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__9781 = this;
  if(function() {
    var and__3822__auto____9782 = goog.isString(k);
    if(and__3822__auto____9782) {
      return!(cljs.core.scan_array.call(null, 1, k, this__9781.keys) == null)
    }else {
      return and__3822__auto____9782
    }
  }()) {
    return true
  }else {
    return false
  }
};
cljs.core.ObjMap.prototype.call = function() {
  var G__9804 = null;
  var G__9804__2 = function(this_sym9783, k) {
    var this__9785 = this;
    var this_sym9783__9786 = this;
    var coll__9787 = this_sym9783__9786;
    return coll__9787.cljs$core$ILookup$_lookup$arity$2(coll__9787, k)
  };
  var G__9804__3 = function(this_sym9784, k, not_found) {
    var this__9785 = this;
    var this_sym9784__9788 = this;
    var coll__9789 = this_sym9784__9788;
    return coll__9789.cljs$core$ILookup$_lookup$arity$3(coll__9789, k, not_found)
  };
  G__9804 = function(this_sym9784, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9804__2.call(this, this_sym9784, k);
      case 3:
        return G__9804__3.call(this, this_sym9784, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9804
}();
cljs.core.ObjMap.prototype.apply = function(this_sym9767, args9768) {
  var this__9790 = this;
  return this_sym9767.call.apply(this_sym9767, [this_sym9767].concat(args9768.slice()))
};
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__9791 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.ObjMap.prototype.toString = function() {
  var this__9792 = this;
  var this__9793 = this;
  return cljs.core.pr_str.call(null, this__9793)
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9794 = this;
  if(this__9794.keys.length > 0) {
    return cljs.core.map.call(null, function(p1__9757_SHARP_) {
      return cljs.core.vector.call(null, p1__9757_SHARP_, this__9794.strobj[p1__9757_SHARP_])
    }, this__9794.keys.sort(cljs.core.obj_map_compare_keys))
  }else {
    return null
  }
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9795 = this;
  return this__9795.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9796 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9797 = this;
  return new cljs.core.ObjMap(meta, this__9797.keys, this__9797.strobj, this__9797.update_count, this__9797.__hash)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9798 = this;
  return this__9798.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9799 = this;
  return cljs.core.with_meta.call(null, cljs.core.ObjMap.EMPTY, this__9799.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__9800 = this;
  if(function() {
    var and__3822__auto____9801 = goog.isString(k);
    if(and__3822__auto____9801) {
      return!(cljs.core.scan_array.call(null, 1, k, this__9800.keys) == null)
    }else {
      return and__3822__auto____9801
    }
  }()) {
    var new_keys__9802 = this__9800.keys.slice();
    var new_strobj__9803 = cljs.core.obj_clone.call(null, this__9800.strobj, this__9800.keys);
    new_keys__9802.splice(cljs.core.scan_array.call(null, 1, k, new_keys__9802), 1);
    cljs.core.js_delete.call(null, new_strobj__9803, k);
    return new cljs.core.ObjMap(this__9800.meta, new_keys__9802, new_strobj__9803, this__9800.update_count + 1, null)
  }else {
    return coll
  }
};
cljs.core.ObjMap;
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, [], {}, 0, 0);
cljs.core.ObjMap.HASHMAP_THRESHOLD = 32;
cljs.core.ObjMap.fromObject = function(ks, obj) {
  return new cljs.core.ObjMap(null, ks, obj, 0, null)
};
cljs.core.HashMap = function(meta, count, hashobj, __hash) {
  this.meta = meta;
  this.count = count;
  this.hashobj = hashobj;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 15075087
};
cljs.core.HashMap.cljs$lang$type = true;
cljs.core.HashMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/HashMap")
};
cljs.core.HashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9808 = this;
  var h__2192__auto____9809 = this__9808.__hash;
  if(!(h__2192__auto____9809 == null)) {
    return h__2192__auto____9809
  }else {
    var h__2192__auto____9810 = cljs.core.hash_imap.call(null, coll);
    this__9808.__hash = h__2192__auto____9810;
    return h__2192__auto____9810
  }
};
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9811 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9812 = this;
  var bucket__9813 = this__9812.hashobj[cljs.core.hash.call(null, k)];
  var i__9814 = cljs.core.truth_(bucket__9813) ? cljs.core.scan_array.call(null, 2, k, bucket__9813) : null;
  if(cljs.core.truth_(i__9814)) {
    return bucket__9813[i__9814 + 1]
  }else {
    return not_found
  }
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__9815 = this;
  var h__9816 = cljs.core.hash.call(null, k);
  var bucket__9817 = this__9815.hashobj[h__9816];
  if(cljs.core.truth_(bucket__9817)) {
    var new_bucket__9818 = bucket__9817.slice();
    var new_hashobj__9819 = goog.object.clone(this__9815.hashobj);
    new_hashobj__9819[h__9816] = new_bucket__9818;
    var temp__3971__auto____9820 = cljs.core.scan_array.call(null, 2, k, new_bucket__9818);
    if(cljs.core.truth_(temp__3971__auto____9820)) {
      var i__9821 = temp__3971__auto____9820;
      new_bucket__9818[i__9821 + 1] = v;
      return new cljs.core.HashMap(this__9815.meta, this__9815.count, new_hashobj__9819, null)
    }else {
      new_bucket__9818.push(k, v);
      return new cljs.core.HashMap(this__9815.meta, this__9815.count + 1, new_hashobj__9819, null)
    }
  }else {
    var new_hashobj__9822 = goog.object.clone(this__9815.hashobj);
    new_hashobj__9822[h__9816] = [k, v];
    return new cljs.core.HashMap(this__9815.meta, this__9815.count + 1, new_hashobj__9822, null)
  }
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__9823 = this;
  var bucket__9824 = this__9823.hashobj[cljs.core.hash.call(null, k)];
  var i__9825 = cljs.core.truth_(bucket__9824) ? cljs.core.scan_array.call(null, 2, k, bucket__9824) : null;
  if(cljs.core.truth_(i__9825)) {
    return true
  }else {
    return false
  }
};
cljs.core.HashMap.prototype.call = function() {
  var G__9850 = null;
  var G__9850__2 = function(this_sym9826, k) {
    var this__9828 = this;
    var this_sym9826__9829 = this;
    var coll__9830 = this_sym9826__9829;
    return coll__9830.cljs$core$ILookup$_lookup$arity$2(coll__9830, k)
  };
  var G__9850__3 = function(this_sym9827, k, not_found) {
    var this__9828 = this;
    var this_sym9827__9831 = this;
    var coll__9832 = this_sym9827__9831;
    return coll__9832.cljs$core$ILookup$_lookup$arity$3(coll__9832, k, not_found)
  };
  G__9850 = function(this_sym9827, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9850__2.call(this, this_sym9827, k);
      case 3:
        return G__9850__3.call(this, this_sym9827, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9850
}();
cljs.core.HashMap.prototype.apply = function(this_sym9806, args9807) {
  var this__9833 = this;
  return this_sym9806.call.apply(this_sym9806, [this_sym9806].concat(args9807.slice()))
};
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__9834 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.HashMap.prototype.toString = function() {
  var this__9835 = this;
  var this__9836 = this;
  return cljs.core.pr_str.call(null, this__9836)
};
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9837 = this;
  if(this__9837.count > 0) {
    var hashes__9838 = cljs.core.js_keys.call(null, this__9837.hashobj).sort();
    return cljs.core.mapcat.call(null, function(p1__9805_SHARP_) {
      return cljs.core.map.call(null, cljs.core.vec, cljs.core.partition.call(null, 2, this__9837.hashobj[p1__9805_SHARP_]))
    }, hashes__9838)
  }else {
    return null
  }
};
cljs.core.HashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9839 = this;
  return this__9839.count
};
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9840 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9841 = this;
  return new cljs.core.HashMap(meta, this__9841.count, this__9841.hashobj, this__9841.__hash)
};
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9842 = this;
  return this__9842.meta
};
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9843 = this;
  return cljs.core.with_meta.call(null, cljs.core.HashMap.EMPTY, this__9843.meta)
};
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__9844 = this;
  var h__9845 = cljs.core.hash.call(null, k);
  var bucket__9846 = this__9844.hashobj[h__9845];
  var i__9847 = cljs.core.truth_(bucket__9846) ? cljs.core.scan_array.call(null, 2, k, bucket__9846) : null;
  if(cljs.core.not.call(null, i__9847)) {
    return coll
  }else {
    var new_hashobj__9848 = goog.object.clone(this__9844.hashobj);
    if(3 > bucket__9846.length) {
      cljs.core.js_delete.call(null, new_hashobj__9848, h__9845)
    }else {
      var new_bucket__9849 = bucket__9846.slice();
      new_bucket__9849.splice(i__9847, 2);
      new_hashobj__9848[h__9845] = new_bucket__9849
    }
    return new cljs.core.HashMap(this__9844.meta, this__9844.count - 1, new_hashobj__9848, null)
  }
};
cljs.core.HashMap;
cljs.core.HashMap.EMPTY = new cljs.core.HashMap(null, 0, {}, 0);
cljs.core.HashMap.fromArrays = function(ks, vs) {
  var len__9851 = ks.length;
  var i__9852 = 0;
  var out__9853 = cljs.core.HashMap.EMPTY;
  while(true) {
    if(i__9852 < len__9851) {
      var G__9854 = i__9852 + 1;
      var G__9855 = cljs.core.assoc.call(null, out__9853, ks[i__9852], vs[i__9852]);
      i__9852 = G__9854;
      out__9853 = G__9855;
      continue
    }else {
      return out__9853
    }
    break
  }
};
cljs.core.array_map_index_of = function array_map_index_of(m, k) {
  var arr__9859 = m.arr;
  var len__9860 = arr__9859.length;
  var i__9861 = 0;
  while(true) {
    if(len__9860 <= i__9861) {
      return-1
    }else {
      if(cljs.core._EQ_.call(null, arr__9859[i__9861], k)) {
        return i__9861
      }else {
        if("\ufdd0'else") {
          var G__9862 = i__9861 + 2;
          i__9861 = G__9862;
          continue
        }else {
          return null
        }
      }
    }
    break
  }
};
cljs.core.PersistentArrayMap = function(meta, cnt, arr, __hash) {
  this.meta = meta;
  this.cnt = cnt;
  this.arr = arr;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentArrayMap.cljs$lang$type = true;
cljs.core.PersistentArrayMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentArrayMap")
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__9865 = this;
  return new cljs.core.TransientArrayMap({}, this__9865.arr.length, this__9865.arr.slice())
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9866 = this;
  var h__2192__auto____9867 = this__9866.__hash;
  if(!(h__2192__auto____9867 == null)) {
    return h__2192__auto____9867
  }else {
    var h__2192__auto____9868 = cljs.core.hash_imap.call(null, coll);
    this__9866.__hash = h__2192__auto____9868;
    return h__2192__auto____9868
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9869 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9870 = this;
  var idx__9871 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__9871 === -1) {
    return not_found
  }else {
    return this__9870.arr[idx__9871 + 1]
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__9872 = this;
  var idx__9873 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__9873 === -1) {
    if(this__9872.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
      return new cljs.core.PersistentArrayMap(this__9872.meta, this__9872.cnt + 1, function() {
        var G__9874__9875 = this__9872.arr.slice();
        G__9874__9875.push(k);
        G__9874__9875.push(v);
        return G__9874__9875
      }(), null)
    }else {
      return cljs.core.persistent_BANG_.call(null, cljs.core.assoc_BANG_.call(null, cljs.core.transient$.call(null, cljs.core.into.call(null, cljs.core.PersistentHashMap.EMPTY, coll)), k, v))
    }
  }else {
    if(v === this__9872.arr[idx__9873 + 1]) {
      return coll
    }else {
      if("\ufdd0'else") {
        return new cljs.core.PersistentArrayMap(this__9872.meta, this__9872.cnt, function() {
          var G__9876__9877 = this__9872.arr.slice();
          G__9876__9877[idx__9873 + 1] = v;
          return G__9876__9877
        }(), null)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__9878 = this;
  return!(cljs.core.array_map_index_of.call(null, coll, k) === -1)
};
cljs.core.PersistentArrayMap.prototype.call = function() {
  var G__9910 = null;
  var G__9910__2 = function(this_sym9879, k) {
    var this__9881 = this;
    var this_sym9879__9882 = this;
    var coll__9883 = this_sym9879__9882;
    return coll__9883.cljs$core$ILookup$_lookup$arity$2(coll__9883, k)
  };
  var G__9910__3 = function(this_sym9880, k, not_found) {
    var this__9881 = this;
    var this_sym9880__9884 = this;
    var coll__9885 = this_sym9880__9884;
    return coll__9885.cljs$core$ILookup$_lookup$arity$3(coll__9885, k, not_found)
  };
  G__9910 = function(this_sym9880, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9910__2.call(this, this_sym9880, k);
      case 3:
        return G__9910__3.call(this, this_sym9880, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9910
}();
cljs.core.PersistentArrayMap.prototype.apply = function(this_sym9863, args9864) {
  var this__9886 = this;
  return this_sym9863.call.apply(this_sym9863, [this_sym9863].concat(args9864.slice()))
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__9887 = this;
  var len__9888 = this__9887.arr.length;
  var i__9889 = 0;
  var init__9890 = init;
  while(true) {
    if(i__9889 < len__9888) {
      var init__9891 = f.call(null, init__9890, this__9887.arr[i__9889], this__9887.arr[i__9889 + 1]);
      if(cljs.core.reduced_QMARK_.call(null, init__9891)) {
        return cljs.core.deref.call(null, init__9891)
      }else {
        var G__9911 = i__9889 + 2;
        var G__9912 = init__9891;
        i__9889 = G__9911;
        init__9890 = G__9912;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__9892 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentArrayMap.prototype.toString = function() {
  var this__9893 = this;
  var this__9894 = this;
  return cljs.core.pr_str.call(null, this__9894)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9895 = this;
  if(this__9895.cnt > 0) {
    var len__9896 = this__9895.arr.length;
    var array_map_seq__9897 = function array_map_seq(i) {
      return new cljs.core.LazySeq(null, false, function() {
        if(i < len__9896) {
          return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([this__9895.arr[i], this__9895.arr[i + 1]], true), array_map_seq.call(null, i + 2))
        }else {
          return null
        }
      }, null)
    };
    return array_map_seq__9897.call(null, 0)
  }else {
    return null
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9898 = this;
  return this__9898.cnt
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9899 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9900 = this;
  return new cljs.core.PersistentArrayMap(meta, this__9900.cnt, this__9900.arr, this__9900.__hash)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9901 = this;
  return this__9901.meta
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9902 = this;
  return cljs.core._with_meta.call(null, cljs.core.PersistentArrayMap.EMPTY, this__9902.meta)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__9903 = this;
  var idx__9904 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__9904 >= 0) {
    var len__9905 = this__9903.arr.length;
    var new_len__9906 = len__9905 - 2;
    if(new_len__9906 === 0) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
    }else {
      var new_arr__9907 = cljs.core.make_array.call(null, new_len__9906);
      var s__9908 = 0;
      var d__9909 = 0;
      while(true) {
        if(s__9908 >= len__9905) {
          return new cljs.core.PersistentArrayMap(this__9903.meta, this__9903.cnt - 1, new_arr__9907, null)
        }else {
          if(cljs.core._EQ_.call(null, k, this__9903.arr[s__9908])) {
            var G__9913 = s__9908 + 2;
            var G__9914 = d__9909;
            s__9908 = G__9913;
            d__9909 = G__9914;
            continue
          }else {
            if("\ufdd0'else") {
              new_arr__9907[d__9909] = this__9903.arr[s__9908];
              new_arr__9907[d__9909 + 1] = this__9903.arr[s__9908 + 1];
              var G__9915 = s__9908 + 2;
              var G__9916 = d__9909 + 2;
              s__9908 = G__9915;
              d__9909 = G__9916;
              continue
            }else {
              return null
            }
          }
        }
        break
      }
    }
  }else {
    return coll
  }
};
cljs.core.PersistentArrayMap;
cljs.core.PersistentArrayMap.EMPTY = new cljs.core.PersistentArrayMap(null, 0, [], null);
cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD = 16;
cljs.core.PersistentArrayMap.fromArrays = function(ks, vs) {
  var len__9917 = cljs.core.count.call(null, ks);
  var i__9918 = 0;
  var out__9919 = cljs.core.transient$.call(null, cljs.core.PersistentArrayMap.EMPTY);
  while(true) {
    if(i__9918 < len__9917) {
      var G__9920 = i__9918 + 1;
      var G__9921 = cljs.core.assoc_BANG_.call(null, out__9919, ks[i__9918], vs[i__9918]);
      i__9918 = G__9920;
      out__9919 = G__9921;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__9919)
    }
    break
  }
};
cljs.core.TransientArrayMap = function(editable_QMARK_, len, arr) {
  this.editable_QMARK_ = editable_QMARK_;
  this.len = len;
  this.arr = arr;
  this.cljs$lang$protocol_mask$partition1$ = 14;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientArrayMap.cljs$lang$type = true;
cljs.core.TransientArrayMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientArrayMap")
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(tcoll, key) {
  var this__9922 = this;
  if(cljs.core.truth_(this__9922.editable_QMARK_)) {
    var idx__9923 = cljs.core.array_map_index_of.call(null, tcoll, key);
    if(idx__9923 >= 0) {
      this__9922.arr[idx__9923] = this__9922.arr[this__9922.len - 2];
      this__9922.arr[idx__9923 + 1] = this__9922.arr[this__9922.len - 1];
      var G__9924__9925 = this__9922.arr;
      G__9924__9925.pop();
      G__9924__9925.pop();
      G__9924__9925;
      this__9922.len = this__9922.len - 2
    }else {
    }
    return tcoll
  }else {
    throw new Error("dissoc! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(tcoll, key, val) {
  var this__9926 = this;
  if(cljs.core.truth_(this__9926.editable_QMARK_)) {
    var idx__9927 = cljs.core.array_map_index_of.call(null, tcoll, key);
    if(idx__9927 === -1) {
      if(this__9926.len + 2 <= 2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
        this__9926.len = this__9926.len + 2;
        this__9926.arr.push(key);
        this__9926.arr.push(val);
        return tcoll
      }else {
        return cljs.core.assoc_BANG_.call(null, cljs.core.array__GT_transient_hash_map.call(null, this__9926.len, this__9926.arr), key, val)
      }
    }else {
      if(val === this__9926.arr[idx__9927 + 1]) {
        return tcoll
      }else {
        this__9926.arr[idx__9927 + 1] = val;
        return tcoll
      }
    }
  }else {
    throw new Error("assoc! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__9928 = this;
  if(cljs.core.truth_(this__9928.editable_QMARK_)) {
    if(function() {
      var G__9929__9930 = o;
      if(G__9929__9930) {
        if(function() {
          var or__3824__auto____9931 = G__9929__9930.cljs$lang$protocol_mask$partition0$ & 2048;
          if(or__3824__auto____9931) {
            return or__3824__auto____9931
          }else {
            return G__9929__9930.cljs$core$IMapEntry$
          }
        }()) {
          return true
        }else {
          if(!G__9929__9930.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__9929__9930)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__9929__9930)
      }
    }()) {
      return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll, cljs.core.key.call(null, o), cljs.core.val.call(null, o))
    }else {
      var es__9932 = cljs.core.seq.call(null, o);
      var tcoll__9933 = tcoll;
      while(true) {
        var temp__3971__auto____9934 = cljs.core.first.call(null, es__9932);
        if(cljs.core.truth_(temp__3971__auto____9934)) {
          var e__9935 = temp__3971__auto____9934;
          var G__9941 = cljs.core.next.call(null, es__9932);
          var G__9942 = tcoll__9933.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll__9933, cljs.core.key.call(null, e__9935), cljs.core.val.call(null, e__9935));
          es__9932 = G__9941;
          tcoll__9933 = G__9942;
          continue
        }else {
          return tcoll__9933
        }
        break
      }
    }
  }else {
    throw new Error("conj! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__9936 = this;
  if(cljs.core.truth_(this__9936.editable_QMARK_)) {
    this__9936.editable_QMARK_ = false;
    return new cljs.core.PersistentArrayMap(null, cljs.core.quot.call(null, this__9936.len, 2), this__9936.arr, null)
  }else {
    throw new Error("persistent! called twice");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, k) {
  var this__9937 = this;
  return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll, k, null)
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, k, not_found) {
  var this__9938 = this;
  if(cljs.core.truth_(this__9938.editable_QMARK_)) {
    var idx__9939 = cljs.core.array_map_index_of.call(null, tcoll, k);
    if(idx__9939 === -1) {
      return not_found
    }else {
      return this__9938.arr[idx__9939 + 1]
    }
  }else {
    throw new Error("lookup after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function(tcoll) {
  var this__9940 = this;
  if(cljs.core.truth_(this__9940.editable_QMARK_)) {
    return cljs.core.quot.call(null, this__9940.len, 2)
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientArrayMap;
cljs.core.array__GT_transient_hash_map = function array__GT_transient_hash_map(len, arr) {
  var out__9945 = cljs.core.transient$.call(null, cljs.core.ObjMap.EMPTY);
  var i__9946 = 0;
  while(true) {
    if(i__9946 < len) {
      var G__9947 = cljs.core.assoc_BANG_.call(null, out__9945, arr[i__9946], arr[i__9946 + 1]);
      var G__9948 = i__9946 + 2;
      out__9945 = G__9947;
      i__9946 = G__9948;
      continue
    }else {
      return out__9945
    }
    break
  }
};
cljs.core.Box = function(val) {
  this.val = val
};
cljs.core.Box.cljs$lang$type = true;
cljs.core.Box.cljs$lang$ctorPrSeq = function(this__2310__auto__) {
  return cljs.core.list.call(null, "cljs.core/Box")
};
cljs.core.Box;
cljs.core.key_test = function key_test(key, other) {
  if(goog.isString(key)) {
    return key === other
  }else {
    return cljs.core._EQ_.call(null, key, other)
  }
};
cljs.core.mask = function mask(hash, shift) {
  return hash >>> shift & 31
};
cljs.core.clone_and_set = function() {
  var clone_and_set = null;
  var clone_and_set__3 = function(arr, i, a) {
    var G__9953__9954 = arr.slice();
    G__9953__9954[i] = a;
    return G__9953__9954
  };
  var clone_and_set__5 = function(arr, i, a, j, b) {
    var G__9955__9956 = arr.slice();
    G__9955__9956[i] = a;
    G__9955__9956[j] = b;
    return G__9955__9956
  };
  clone_and_set = function(arr, i, a, j, b) {
    switch(arguments.length) {
      case 3:
        return clone_and_set__3.call(this, arr, i, a);
      case 5:
        return clone_and_set__5.call(this, arr, i, a, j, b)
    }
    throw"Invalid arity: " + arguments.length;
  };
  clone_and_set.cljs$lang$arity$3 = clone_and_set__3;
  clone_and_set.cljs$lang$arity$5 = clone_and_set__5;
  return clone_and_set
}();
cljs.core.remove_pair = function remove_pair(arr, i) {
  var new_arr__9958 = cljs.core.make_array.call(null, arr.length - 2);
  cljs.core.array_copy.call(null, arr, 0, new_arr__9958, 0, 2 * i);
  cljs.core.array_copy.call(null, arr, 2 * (i + 1), new_arr__9958, 2 * i, new_arr__9958.length - 2 * i);
  return new_arr__9958
};
cljs.core.bitmap_indexed_node_index = function bitmap_indexed_node_index(bitmap, bit) {
  return cljs.core.bit_count.call(null, bitmap & bit - 1)
};
cljs.core.bitpos = function bitpos(hash, shift) {
  return 1 << (hash >>> shift & 31)
};
cljs.core.edit_and_set = function() {
  var edit_and_set = null;
  var edit_and_set__4 = function(inode, edit, i, a) {
    var editable__9961 = inode.ensure_editable(edit);
    editable__9961.arr[i] = a;
    return editable__9961
  };
  var edit_and_set__6 = function(inode, edit, i, a, j, b) {
    var editable__9962 = inode.ensure_editable(edit);
    editable__9962.arr[i] = a;
    editable__9962.arr[j] = b;
    return editable__9962
  };
  edit_and_set = function(inode, edit, i, a, j, b) {
    switch(arguments.length) {
      case 4:
        return edit_and_set__4.call(this, inode, edit, i, a);
      case 6:
        return edit_and_set__6.call(this, inode, edit, i, a, j, b)
    }
    throw"Invalid arity: " + arguments.length;
  };
  edit_and_set.cljs$lang$arity$4 = edit_and_set__4;
  edit_and_set.cljs$lang$arity$6 = edit_and_set__6;
  return edit_and_set
}();
cljs.core.inode_kv_reduce = function inode_kv_reduce(arr, f, init) {
  var len__9969 = arr.length;
  var i__9970 = 0;
  var init__9971 = init;
  while(true) {
    if(i__9970 < len__9969) {
      var init__9974 = function() {
        var k__9972 = arr[i__9970];
        if(!(k__9972 == null)) {
          return f.call(null, init__9971, k__9972, arr[i__9970 + 1])
        }else {
          var node__9973 = arr[i__9970 + 1];
          if(!(node__9973 == null)) {
            return node__9973.kv_reduce(f, init__9971)
          }else {
            return init__9971
          }
        }
      }();
      if(cljs.core.reduced_QMARK_.call(null, init__9974)) {
        return cljs.core.deref.call(null, init__9974)
      }else {
        var G__9975 = i__9970 + 2;
        var G__9976 = init__9974;
        i__9970 = G__9975;
        init__9971 = G__9976;
        continue
      }
    }else {
      return init__9971
    }
    break
  }
};
cljs.core.BitmapIndexedNode = function(edit, bitmap, arr) {
  this.edit = edit;
  this.bitmap = bitmap;
  this.arr = arr
};
cljs.core.BitmapIndexedNode.cljs$lang$type = true;
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/BitmapIndexedNode")
};
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = function(e, bit, i) {
  var this__9977 = this;
  var inode__9978 = this;
  if(this__9977.bitmap === bit) {
    return null
  }else {
    var editable__9979 = inode__9978.ensure_editable(e);
    var earr__9980 = editable__9979.arr;
    var len__9981 = earr__9980.length;
    editable__9979.bitmap = bit ^ editable__9979.bitmap;
    cljs.core.array_copy.call(null, earr__9980, 2 * (i + 1), earr__9980, 2 * i, len__9981 - 2 * (i + 1));
    earr__9980[len__9981 - 2] = null;
    earr__9980[len__9981 - 1] = null;
    return editable__9979
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__9982 = this;
  var inode__9983 = this;
  var bit__9984 = 1 << (hash >>> shift & 31);
  var idx__9985 = cljs.core.bitmap_indexed_node_index.call(null, this__9982.bitmap, bit__9984);
  if((this__9982.bitmap & bit__9984) === 0) {
    var n__9986 = cljs.core.bit_count.call(null, this__9982.bitmap);
    if(2 * n__9986 < this__9982.arr.length) {
      var editable__9987 = inode__9983.ensure_editable(edit);
      var earr__9988 = editable__9987.arr;
      added_leaf_QMARK_.val = true;
      cljs.core.array_copy_downward.call(null, earr__9988, 2 * idx__9985, earr__9988, 2 * (idx__9985 + 1), 2 * (n__9986 - idx__9985));
      earr__9988[2 * idx__9985] = key;
      earr__9988[2 * idx__9985 + 1] = val;
      editable__9987.bitmap = editable__9987.bitmap | bit__9984;
      return editable__9987
    }else {
      if(n__9986 >= 16) {
        var nodes__9989 = cljs.core.make_array.call(null, 32);
        var jdx__9990 = hash >>> shift & 31;
        nodes__9989[jdx__9990] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
        var i__9991 = 0;
        var j__9992 = 0;
        while(true) {
          if(i__9991 < 32) {
            if((this__9982.bitmap >>> i__9991 & 1) === 0) {
              var G__10045 = i__9991 + 1;
              var G__10046 = j__9992;
              i__9991 = G__10045;
              j__9992 = G__10046;
              continue
            }else {
              nodes__9989[i__9991] = !(this__9982.arr[j__9992] == null) ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, cljs.core.hash.call(null, this__9982.arr[j__9992]), this__9982.arr[j__9992], this__9982.arr[j__9992 + 1], added_leaf_QMARK_) : this__9982.arr[j__9992 + 1];
              var G__10047 = i__9991 + 1;
              var G__10048 = j__9992 + 2;
              i__9991 = G__10047;
              j__9992 = G__10048;
              continue
            }
          }else {
          }
          break
        }
        return new cljs.core.ArrayNode(edit, n__9986 + 1, nodes__9989)
      }else {
        if("\ufdd0'else") {
          var new_arr__9993 = cljs.core.make_array.call(null, 2 * (n__9986 + 4));
          cljs.core.array_copy.call(null, this__9982.arr, 0, new_arr__9993, 0, 2 * idx__9985);
          new_arr__9993[2 * idx__9985] = key;
          new_arr__9993[2 * idx__9985 + 1] = val;
          cljs.core.array_copy.call(null, this__9982.arr, 2 * idx__9985, new_arr__9993, 2 * (idx__9985 + 1), 2 * (n__9986 - idx__9985));
          added_leaf_QMARK_.val = true;
          var editable__9994 = inode__9983.ensure_editable(edit);
          editable__9994.arr = new_arr__9993;
          editable__9994.bitmap = editable__9994.bitmap | bit__9984;
          return editable__9994
        }else {
          return null
        }
      }
    }
  }else {
    var key_or_nil__9995 = this__9982.arr[2 * idx__9985];
    var val_or_node__9996 = this__9982.arr[2 * idx__9985 + 1];
    if(key_or_nil__9995 == null) {
      var n__9997 = val_or_node__9996.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
      if(n__9997 === val_or_node__9996) {
        return inode__9983
      }else {
        return cljs.core.edit_and_set.call(null, inode__9983, edit, 2 * idx__9985 + 1, n__9997)
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__9995)) {
        if(val === val_or_node__9996) {
          return inode__9983
        }else {
          return cljs.core.edit_and_set.call(null, inode__9983, edit, 2 * idx__9985 + 1, val)
        }
      }else {
        if("\ufdd0'else") {
          added_leaf_QMARK_.val = true;
          return cljs.core.edit_and_set.call(null, inode__9983, edit, 2 * idx__9985, null, 2 * idx__9985 + 1, cljs.core.create_node.call(null, edit, shift + 5, key_or_nil__9995, val_or_node__9996, hash, key, val))
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_seq = function() {
  var this__9998 = this;
  var inode__9999 = this;
  return cljs.core.create_inode_seq.call(null, this__9998.arr)
};
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__10000 = this;
  var inode__10001 = this;
  var bit__10002 = 1 << (hash >>> shift & 31);
  if((this__10000.bitmap & bit__10002) === 0) {
    return inode__10001
  }else {
    var idx__10003 = cljs.core.bitmap_indexed_node_index.call(null, this__10000.bitmap, bit__10002);
    var key_or_nil__10004 = this__10000.arr[2 * idx__10003];
    var val_or_node__10005 = this__10000.arr[2 * idx__10003 + 1];
    if(key_or_nil__10004 == null) {
      var n__10006 = val_or_node__10005.inode_without_BANG_(edit, shift + 5, hash, key, removed_leaf_QMARK_);
      if(n__10006 === val_or_node__10005) {
        return inode__10001
      }else {
        if(!(n__10006 == null)) {
          return cljs.core.edit_and_set.call(null, inode__10001, edit, 2 * idx__10003 + 1, n__10006)
        }else {
          if(this__10000.bitmap === bit__10002) {
            return null
          }else {
            if("\ufdd0'else") {
              return inode__10001.edit_and_remove_pair(edit, bit__10002, idx__10003)
            }else {
              return null
            }
          }
        }
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__10004)) {
        removed_leaf_QMARK_[0] = true;
        return inode__10001.edit_and_remove_pair(edit, bit__10002, idx__10003)
      }else {
        if("\ufdd0'else") {
          return inode__10001
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.ensure_editable = function(e) {
  var this__10007 = this;
  var inode__10008 = this;
  if(e === this__10007.edit) {
    return inode__10008
  }else {
    var n__10009 = cljs.core.bit_count.call(null, this__10007.bitmap);
    var new_arr__10010 = cljs.core.make_array.call(null, n__10009 < 0 ? 4 : 2 * (n__10009 + 1));
    cljs.core.array_copy.call(null, this__10007.arr, 0, new_arr__10010, 0, 2 * n__10009);
    return new cljs.core.BitmapIndexedNode(e, this__10007.bitmap, new_arr__10010)
  }
};
cljs.core.BitmapIndexedNode.prototype.kv_reduce = function(f, init) {
  var this__10011 = this;
  var inode__10012 = this;
  return cljs.core.inode_kv_reduce.call(null, this__10011.arr, f, init)
};
cljs.core.BitmapIndexedNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__10013 = this;
  var inode__10014 = this;
  var bit__10015 = 1 << (hash >>> shift & 31);
  if((this__10013.bitmap & bit__10015) === 0) {
    return not_found
  }else {
    var idx__10016 = cljs.core.bitmap_indexed_node_index.call(null, this__10013.bitmap, bit__10015);
    var key_or_nil__10017 = this__10013.arr[2 * idx__10016];
    var val_or_node__10018 = this__10013.arr[2 * idx__10016 + 1];
    if(key_or_nil__10017 == null) {
      return val_or_node__10018.inode_find(shift + 5, hash, key, not_found)
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__10017)) {
        return cljs.core.PersistentVector.fromArray([key_or_nil__10017, val_or_node__10018], true)
      }else {
        if("\ufdd0'else") {
          return not_found
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_without = function(shift, hash, key) {
  var this__10019 = this;
  var inode__10020 = this;
  var bit__10021 = 1 << (hash >>> shift & 31);
  if((this__10019.bitmap & bit__10021) === 0) {
    return inode__10020
  }else {
    var idx__10022 = cljs.core.bitmap_indexed_node_index.call(null, this__10019.bitmap, bit__10021);
    var key_or_nil__10023 = this__10019.arr[2 * idx__10022];
    var val_or_node__10024 = this__10019.arr[2 * idx__10022 + 1];
    if(key_or_nil__10023 == null) {
      var n__10025 = val_or_node__10024.inode_without(shift + 5, hash, key);
      if(n__10025 === val_or_node__10024) {
        return inode__10020
      }else {
        if(!(n__10025 == null)) {
          return new cljs.core.BitmapIndexedNode(null, this__10019.bitmap, cljs.core.clone_and_set.call(null, this__10019.arr, 2 * idx__10022 + 1, n__10025))
        }else {
          if(this__10019.bitmap === bit__10021) {
            return null
          }else {
            if("\ufdd0'else") {
              return new cljs.core.BitmapIndexedNode(null, this__10019.bitmap ^ bit__10021, cljs.core.remove_pair.call(null, this__10019.arr, idx__10022))
            }else {
              return null
            }
          }
        }
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__10023)) {
        return new cljs.core.BitmapIndexedNode(null, this__10019.bitmap ^ bit__10021, cljs.core.remove_pair.call(null, this__10019.arr, idx__10022))
      }else {
        if("\ufdd0'else") {
          return inode__10020
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__10026 = this;
  var inode__10027 = this;
  var bit__10028 = 1 << (hash >>> shift & 31);
  var idx__10029 = cljs.core.bitmap_indexed_node_index.call(null, this__10026.bitmap, bit__10028);
  if((this__10026.bitmap & bit__10028) === 0) {
    var n__10030 = cljs.core.bit_count.call(null, this__10026.bitmap);
    if(n__10030 >= 16) {
      var nodes__10031 = cljs.core.make_array.call(null, 32);
      var jdx__10032 = hash >>> shift & 31;
      nodes__10031[jdx__10032] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
      var i__10033 = 0;
      var j__10034 = 0;
      while(true) {
        if(i__10033 < 32) {
          if((this__10026.bitmap >>> i__10033 & 1) === 0) {
            var G__10049 = i__10033 + 1;
            var G__10050 = j__10034;
            i__10033 = G__10049;
            j__10034 = G__10050;
            continue
          }else {
            nodes__10031[i__10033] = !(this__10026.arr[j__10034] == null) ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, cljs.core.hash.call(null, this__10026.arr[j__10034]), this__10026.arr[j__10034], this__10026.arr[j__10034 + 1], added_leaf_QMARK_) : this__10026.arr[j__10034 + 1];
            var G__10051 = i__10033 + 1;
            var G__10052 = j__10034 + 2;
            i__10033 = G__10051;
            j__10034 = G__10052;
            continue
          }
        }else {
        }
        break
      }
      return new cljs.core.ArrayNode(null, n__10030 + 1, nodes__10031)
    }else {
      var new_arr__10035 = cljs.core.make_array.call(null, 2 * (n__10030 + 1));
      cljs.core.array_copy.call(null, this__10026.arr, 0, new_arr__10035, 0, 2 * idx__10029);
      new_arr__10035[2 * idx__10029] = key;
      new_arr__10035[2 * idx__10029 + 1] = val;
      cljs.core.array_copy.call(null, this__10026.arr, 2 * idx__10029, new_arr__10035, 2 * (idx__10029 + 1), 2 * (n__10030 - idx__10029));
      added_leaf_QMARK_.val = true;
      return new cljs.core.BitmapIndexedNode(null, this__10026.bitmap | bit__10028, new_arr__10035)
    }
  }else {
    var key_or_nil__10036 = this__10026.arr[2 * idx__10029];
    var val_or_node__10037 = this__10026.arr[2 * idx__10029 + 1];
    if(key_or_nil__10036 == null) {
      var n__10038 = val_or_node__10037.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
      if(n__10038 === val_or_node__10037) {
        return inode__10027
      }else {
        return new cljs.core.BitmapIndexedNode(null, this__10026.bitmap, cljs.core.clone_and_set.call(null, this__10026.arr, 2 * idx__10029 + 1, n__10038))
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__10036)) {
        if(val === val_or_node__10037) {
          return inode__10027
        }else {
          return new cljs.core.BitmapIndexedNode(null, this__10026.bitmap, cljs.core.clone_and_set.call(null, this__10026.arr, 2 * idx__10029 + 1, val))
        }
      }else {
        if("\ufdd0'else") {
          added_leaf_QMARK_.val = true;
          return new cljs.core.BitmapIndexedNode(null, this__10026.bitmap, cljs.core.clone_and_set.call(null, this__10026.arr, 2 * idx__10029, null, 2 * idx__10029 + 1, cljs.core.create_node.call(null, shift + 5, key_or_nil__10036, val_or_node__10037, hash, key, val)))
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__10039 = this;
  var inode__10040 = this;
  var bit__10041 = 1 << (hash >>> shift & 31);
  if((this__10039.bitmap & bit__10041) === 0) {
    return not_found
  }else {
    var idx__10042 = cljs.core.bitmap_indexed_node_index.call(null, this__10039.bitmap, bit__10041);
    var key_or_nil__10043 = this__10039.arr[2 * idx__10042];
    var val_or_node__10044 = this__10039.arr[2 * idx__10042 + 1];
    if(key_or_nil__10043 == null) {
      return val_or_node__10044.inode_lookup(shift + 5, hash, key, not_found)
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__10043)) {
        return val_or_node__10044
      }else {
        if("\ufdd0'else") {
          return not_found
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode;
cljs.core.BitmapIndexedNode.EMPTY = new cljs.core.BitmapIndexedNode(null, 0, cljs.core.make_array.call(null, 0));
cljs.core.pack_array_node = function pack_array_node(array_node, edit, idx) {
  var arr__10060 = array_node.arr;
  var len__10061 = 2 * (array_node.cnt - 1);
  var new_arr__10062 = cljs.core.make_array.call(null, len__10061);
  var i__10063 = 0;
  var j__10064 = 1;
  var bitmap__10065 = 0;
  while(true) {
    if(i__10063 < len__10061) {
      if(function() {
        var and__3822__auto____10066 = !(i__10063 === idx);
        if(and__3822__auto____10066) {
          return!(arr__10060[i__10063] == null)
        }else {
          return and__3822__auto____10066
        }
      }()) {
        new_arr__10062[j__10064] = arr__10060[i__10063];
        var G__10067 = i__10063 + 1;
        var G__10068 = j__10064 + 2;
        var G__10069 = bitmap__10065 | 1 << i__10063;
        i__10063 = G__10067;
        j__10064 = G__10068;
        bitmap__10065 = G__10069;
        continue
      }else {
        var G__10070 = i__10063 + 1;
        var G__10071 = j__10064;
        var G__10072 = bitmap__10065;
        i__10063 = G__10070;
        j__10064 = G__10071;
        bitmap__10065 = G__10072;
        continue
      }
    }else {
      return new cljs.core.BitmapIndexedNode(edit, bitmap__10065, new_arr__10062)
    }
    break
  }
};
cljs.core.ArrayNode = function(edit, cnt, arr) {
  this.edit = edit;
  this.cnt = cnt;
  this.arr = arr
};
cljs.core.ArrayNode.cljs$lang$type = true;
cljs.core.ArrayNode.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayNode")
};
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__10073 = this;
  var inode__10074 = this;
  var idx__10075 = hash >>> shift & 31;
  var node__10076 = this__10073.arr[idx__10075];
  if(node__10076 == null) {
    var editable__10077 = cljs.core.edit_and_set.call(null, inode__10074, edit, idx__10075, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_));
    editable__10077.cnt = editable__10077.cnt + 1;
    return editable__10077
  }else {
    var n__10078 = node__10076.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
    if(n__10078 === node__10076) {
      return inode__10074
    }else {
      return cljs.core.edit_and_set.call(null, inode__10074, edit, idx__10075, n__10078)
    }
  }
};
cljs.core.ArrayNode.prototype.inode_seq = function() {
  var this__10079 = this;
  var inode__10080 = this;
  return cljs.core.create_array_node_seq.call(null, this__10079.arr)
};
cljs.core.ArrayNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__10081 = this;
  var inode__10082 = this;
  var idx__10083 = hash >>> shift & 31;
  var node__10084 = this__10081.arr[idx__10083];
  if(node__10084 == null) {
    return inode__10082
  }else {
    var n__10085 = node__10084.inode_without_BANG_(edit, shift + 5, hash, key, removed_leaf_QMARK_);
    if(n__10085 === node__10084) {
      return inode__10082
    }else {
      if(n__10085 == null) {
        if(this__10081.cnt <= 8) {
          return cljs.core.pack_array_node.call(null, inode__10082, edit, idx__10083)
        }else {
          var editable__10086 = cljs.core.edit_and_set.call(null, inode__10082, edit, idx__10083, n__10085);
          editable__10086.cnt = editable__10086.cnt - 1;
          return editable__10086
        }
      }else {
        if("\ufdd0'else") {
          return cljs.core.edit_and_set.call(null, inode__10082, edit, idx__10083, n__10085)
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.ArrayNode.prototype.ensure_editable = function(e) {
  var this__10087 = this;
  var inode__10088 = this;
  if(e === this__10087.edit) {
    return inode__10088
  }else {
    return new cljs.core.ArrayNode(e, this__10087.cnt, this__10087.arr.slice())
  }
};
cljs.core.ArrayNode.prototype.kv_reduce = function(f, init) {
  var this__10089 = this;
  var inode__10090 = this;
  var len__10091 = this__10089.arr.length;
  var i__10092 = 0;
  var init__10093 = init;
  while(true) {
    if(i__10092 < len__10091) {
      var node__10094 = this__10089.arr[i__10092];
      if(!(node__10094 == null)) {
        var init__10095 = node__10094.kv_reduce(f, init__10093);
        if(cljs.core.reduced_QMARK_.call(null, init__10095)) {
          return cljs.core.deref.call(null, init__10095)
        }else {
          var G__10114 = i__10092 + 1;
          var G__10115 = init__10095;
          i__10092 = G__10114;
          init__10093 = G__10115;
          continue
        }
      }else {
        return null
      }
    }else {
      return init__10093
    }
    break
  }
};
cljs.core.ArrayNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__10096 = this;
  var inode__10097 = this;
  var idx__10098 = hash >>> shift & 31;
  var node__10099 = this__10096.arr[idx__10098];
  if(!(node__10099 == null)) {
    return node__10099.inode_find(shift + 5, hash, key, not_found)
  }else {
    return not_found
  }
};
cljs.core.ArrayNode.prototype.inode_without = function(shift, hash, key) {
  var this__10100 = this;
  var inode__10101 = this;
  var idx__10102 = hash >>> shift & 31;
  var node__10103 = this__10100.arr[idx__10102];
  if(!(node__10103 == null)) {
    var n__10104 = node__10103.inode_without(shift + 5, hash, key);
    if(n__10104 === node__10103) {
      return inode__10101
    }else {
      if(n__10104 == null) {
        if(this__10100.cnt <= 8) {
          return cljs.core.pack_array_node.call(null, inode__10101, null, idx__10102)
        }else {
          return new cljs.core.ArrayNode(null, this__10100.cnt - 1, cljs.core.clone_and_set.call(null, this__10100.arr, idx__10102, n__10104))
        }
      }else {
        if("\ufdd0'else") {
          return new cljs.core.ArrayNode(null, this__10100.cnt, cljs.core.clone_and_set.call(null, this__10100.arr, idx__10102, n__10104))
        }else {
          return null
        }
      }
    }
  }else {
    return inode__10101
  }
};
cljs.core.ArrayNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__10105 = this;
  var inode__10106 = this;
  var idx__10107 = hash >>> shift & 31;
  var node__10108 = this__10105.arr[idx__10107];
  if(node__10108 == null) {
    return new cljs.core.ArrayNode(null, this__10105.cnt + 1, cljs.core.clone_and_set.call(null, this__10105.arr, idx__10107, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_)))
  }else {
    var n__10109 = node__10108.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
    if(n__10109 === node__10108) {
      return inode__10106
    }else {
      return new cljs.core.ArrayNode(null, this__10105.cnt, cljs.core.clone_and_set.call(null, this__10105.arr, idx__10107, n__10109))
    }
  }
};
cljs.core.ArrayNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__10110 = this;
  var inode__10111 = this;
  var idx__10112 = hash >>> shift & 31;
  var node__10113 = this__10110.arr[idx__10112];
  if(!(node__10113 == null)) {
    return node__10113.inode_lookup(shift + 5, hash, key, not_found)
  }else {
    return not_found
  }
};
cljs.core.ArrayNode;
cljs.core.hash_collision_node_find_index = function hash_collision_node_find_index(arr, cnt, key) {
  var lim__10118 = 2 * cnt;
  var i__10119 = 0;
  while(true) {
    if(i__10119 < lim__10118) {
      if(cljs.core.key_test.call(null, key, arr[i__10119])) {
        return i__10119
      }else {
        var G__10120 = i__10119 + 2;
        i__10119 = G__10120;
        continue
      }
    }else {
      return-1
    }
    break
  }
};
cljs.core.HashCollisionNode = function(edit, collision_hash, cnt, arr) {
  this.edit = edit;
  this.collision_hash = collision_hash;
  this.cnt = cnt;
  this.arr = arr
};
cljs.core.HashCollisionNode.cljs$lang$type = true;
cljs.core.HashCollisionNode.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/HashCollisionNode")
};
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__10121 = this;
  var inode__10122 = this;
  if(hash === this__10121.collision_hash) {
    var idx__10123 = cljs.core.hash_collision_node_find_index.call(null, this__10121.arr, this__10121.cnt, key);
    if(idx__10123 === -1) {
      if(this__10121.arr.length > 2 * this__10121.cnt) {
        var editable__10124 = cljs.core.edit_and_set.call(null, inode__10122, edit, 2 * this__10121.cnt, key, 2 * this__10121.cnt + 1, val);
        added_leaf_QMARK_.val = true;
        editable__10124.cnt = editable__10124.cnt + 1;
        return editable__10124
      }else {
        var len__10125 = this__10121.arr.length;
        var new_arr__10126 = cljs.core.make_array.call(null, len__10125 + 2);
        cljs.core.array_copy.call(null, this__10121.arr, 0, new_arr__10126, 0, len__10125);
        new_arr__10126[len__10125] = key;
        new_arr__10126[len__10125 + 1] = val;
        added_leaf_QMARK_.val = true;
        return inode__10122.ensure_editable_array(edit, this__10121.cnt + 1, new_arr__10126)
      }
    }else {
      if(this__10121.arr[idx__10123 + 1] === val) {
        return inode__10122
      }else {
        return cljs.core.edit_and_set.call(null, inode__10122, edit, idx__10123 + 1, val)
      }
    }
  }else {
    return(new cljs.core.BitmapIndexedNode(edit, 1 << (this__10121.collision_hash >>> shift & 31), [null, inode__10122, null, null])).inode_assoc_BANG_(edit, shift, hash, key, val, added_leaf_QMARK_)
  }
};
cljs.core.HashCollisionNode.prototype.inode_seq = function() {
  var this__10127 = this;
  var inode__10128 = this;
  return cljs.core.create_inode_seq.call(null, this__10127.arr)
};
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__10129 = this;
  var inode__10130 = this;
  var idx__10131 = cljs.core.hash_collision_node_find_index.call(null, this__10129.arr, this__10129.cnt, key);
  if(idx__10131 === -1) {
    return inode__10130
  }else {
    removed_leaf_QMARK_[0] = true;
    if(this__10129.cnt === 1) {
      return null
    }else {
      var editable__10132 = inode__10130.ensure_editable(edit);
      var earr__10133 = editable__10132.arr;
      earr__10133[idx__10131] = earr__10133[2 * this__10129.cnt - 2];
      earr__10133[idx__10131 + 1] = earr__10133[2 * this__10129.cnt - 1];
      earr__10133[2 * this__10129.cnt - 1] = null;
      earr__10133[2 * this__10129.cnt - 2] = null;
      editable__10132.cnt = editable__10132.cnt - 1;
      return editable__10132
    }
  }
};
cljs.core.HashCollisionNode.prototype.ensure_editable = function(e) {
  var this__10134 = this;
  var inode__10135 = this;
  if(e === this__10134.edit) {
    return inode__10135
  }else {
    var new_arr__10136 = cljs.core.make_array.call(null, 2 * (this__10134.cnt + 1));
    cljs.core.array_copy.call(null, this__10134.arr, 0, new_arr__10136, 0, 2 * this__10134.cnt);
    return new cljs.core.HashCollisionNode(e, this__10134.collision_hash, this__10134.cnt, new_arr__10136)
  }
};
cljs.core.HashCollisionNode.prototype.kv_reduce = function(f, init) {
  var this__10137 = this;
  var inode__10138 = this;
  return cljs.core.inode_kv_reduce.call(null, this__10137.arr, f, init)
};
cljs.core.HashCollisionNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__10139 = this;
  var inode__10140 = this;
  var idx__10141 = cljs.core.hash_collision_node_find_index.call(null, this__10139.arr, this__10139.cnt, key);
  if(idx__10141 < 0) {
    return not_found
  }else {
    if(cljs.core.key_test.call(null, key, this__10139.arr[idx__10141])) {
      return cljs.core.PersistentVector.fromArray([this__10139.arr[idx__10141], this__10139.arr[idx__10141 + 1]], true)
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.HashCollisionNode.prototype.inode_without = function(shift, hash, key) {
  var this__10142 = this;
  var inode__10143 = this;
  var idx__10144 = cljs.core.hash_collision_node_find_index.call(null, this__10142.arr, this__10142.cnt, key);
  if(idx__10144 === -1) {
    return inode__10143
  }else {
    if(this__10142.cnt === 1) {
      return null
    }else {
      if("\ufdd0'else") {
        return new cljs.core.HashCollisionNode(null, this__10142.collision_hash, this__10142.cnt - 1, cljs.core.remove_pair.call(null, this__10142.arr, cljs.core.quot.call(null, idx__10144, 2)))
      }else {
        return null
      }
    }
  }
};
cljs.core.HashCollisionNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__10145 = this;
  var inode__10146 = this;
  if(hash === this__10145.collision_hash) {
    var idx__10147 = cljs.core.hash_collision_node_find_index.call(null, this__10145.arr, this__10145.cnt, key);
    if(idx__10147 === -1) {
      var len__10148 = this__10145.arr.length;
      var new_arr__10149 = cljs.core.make_array.call(null, len__10148 + 2);
      cljs.core.array_copy.call(null, this__10145.arr, 0, new_arr__10149, 0, len__10148);
      new_arr__10149[len__10148] = key;
      new_arr__10149[len__10148 + 1] = val;
      added_leaf_QMARK_.val = true;
      return new cljs.core.HashCollisionNode(null, this__10145.collision_hash, this__10145.cnt + 1, new_arr__10149)
    }else {
      if(cljs.core._EQ_.call(null, this__10145.arr[idx__10147], val)) {
        return inode__10146
      }else {
        return new cljs.core.HashCollisionNode(null, this__10145.collision_hash, this__10145.cnt, cljs.core.clone_and_set.call(null, this__10145.arr, idx__10147 + 1, val))
      }
    }
  }else {
    return(new cljs.core.BitmapIndexedNode(null, 1 << (this__10145.collision_hash >>> shift & 31), [null, inode__10146])).inode_assoc(shift, hash, key, val, added_leaf_QMARK_)
  }
};
cljs.core.HashCollisionNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__10150 = this;
  var inode__10151 = this;
  var idx__10152 = cljs.core.hash_collision_node_find_index.call(null, this__10150.arr, this__10150.cnt, key);
  if(idx__10152 < 0) {
    return not_found
  }else {
    if(cljs.core.key_test.call(null, key, this__10150.arr[idx__10152])) {
      return this__10150.arr[idx__10152 + 1]
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.HashCollisionNode.prototype.ensure_editable_array = function(e, count, array) {
  var this__10153 = this;
  var inode__10154 = this;
  if(e === this__10153.edit) {
    this__10153.arr = array;
    this__10153.cnt = count;
    return inode__10154
  }else {
    return new cljs.core.HashCollisionNode(this__10153.edit, this__10153.collision_hash, count, array)
  }
};
cljs.core.HashCollisionNode;
cljs.core.create_node = function() {
  var create_node = null;
  var create_node__6 = function(shift, key1, val1, key2hash, key2, val2) {
    var key1hash__10159 = cljs.core.hash.call(null, key1);
    if(key1hash__10159 === key2hash) {
      return new cljs.core.HashCollisionNode(null, key1hash__10159, 2, [key1, val1, key2, val2])
    }else {
      var added_leaf_QMARK___10160 = new cljs.core.Box(false);
      return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift, key1hash__10159, key1, val1, added_leaf_QMARK___10160).inode_assoc(shift, key2hash, key2, val2, added_leaf_QMARK___10160)
    }
  };
  var create_node__7 = function(edit, shift, key1, val1, key2hash, key2, val2) {
    var key1hash__10161 = cljs.core.hash.call(null, key1);
    if(key1hash__10161 === key2hash) {
      return new cljs.core.HashCollisionNode(null, key1hash__10161, 2, [key1, val1, key2, val2])
    }else {
      var added_leaf_QMARK___10162 = new cljs.core.Box(false);
      return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift, key1hash__10161, key1, val1, added_leaf_QMARK___10162).inode_assoc_BANG_(edit, shift, key2hash, key2, val2, added_leaf_QMARK___10162)
    }
  };
  create_node = function(edit, shift, key1, val1, key2hash, key2, val2) {
    switch(arguments.length) {
      case 6:
        return create_node__6.call(this, edit, shift, key1, val1, key2hash, key2);
      case 7:
        return create_node__7.call(this, edit, shift, key1, val1, key2hash, key2, val2)
    }
    throw"Invalid arity: " + arguments.length;
  };
  create_node.cljs$lang$arity$6 = create_node__6;
  create_node.cljs$lang$arity$7 = create_node__7;
  return create_node
}();
cljs.core.NodeSeq = function(meta, nodes, i, s, __hash) {
  this.meta = meta;
  this.nodes = nodes;
  this.i = i;
  this.s = s;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.NodeSeq.cljs$lang$type = true;
cljs.core.NodeSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/NodeSeq")
};
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__10163 = this;
  var h__2192__auto____10164 = this__10163.__hash;
  if(!(h__2192__auto____10164 == null)) {
    return h__2192__auto____10164
  }else {
    var h__2192__auto____10165 = cljs.core.hash_coll.call(null, coll);
    this__10163.__hash = h__2192__auto____10165;
    return h__2192__auto____10165
  }
};
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__10166 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.NodeSeq.prototype.toString = function() {
  var this__10167 = this;
  var this__10168 = this;
  return cljs.core.pr_str.call(null, this__10168)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__10169 = this;
  return this$
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__10170 = this;
  if(this__10170.s == null) {
    return cljs.core.PersistentVector.fromArray([this__10170.nodes[this__10170.i], this__10170.nodes[this__10170.i + 1]], true)
  }else {
    return cljs.core.first.call(null, this__10170.s)
  }
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__10171 = this;
  if(this__10171.s == null) {
    return cljs.core.create_inode_seq.call(null, this__10171.nodes, this__10171.i + 2, null)
  }else {
    return cljs.core.create_inode_seq.call(null, this__10171.nodes, this__10171.i, cljs.core.next.call(null, this__10171.s))
  }
};
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__10172 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__10173 = this;
  return new cljs.core.NodeSeq(meta, this__10173.nodes, this__10173.i, this__10173.s, this__10173.__hash)
};
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__10174 = this;
  return this__10174.meta
};
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__10175 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__10175.meta)
};
cljs.core.NodeSeq;
cljs.core.create_inode_seq = function() {
  var create_inode_seq = null;
  var create_inode_seq__1 = function(nodes) {
    return create_inode_seq.call(null, nodes, 0, null)
  };
  var create_inode_seq__3 = function(nodes, i, s) {
    if(s == null) {
      var len__10182 = nodes.length;
      var j__10183 = i;
      while(true) {
        if(j__10183 < len__10182) {
          if(!(nodes[j__10183] == null)) {
            return new cljs.core.NodeSeq(null, nodes, j__10183, null, null)
          }else {
            var temp__3971__auto____10184 = nodes[j__10183 + 1];
            if(cljs.core.truth_(temp__3971__auto____10184)) {
              var node__10185 = temp__3971__auto____10184;
              var temp__3971__auto____10186 = node__10185.inode_seq();
              if(cljs.core.truth_(temp__3971__auto____10186)) {
                var node_seq__10187 = temp__3971__auto____10186;
                return new cljs.core.NodeSeq(null, nodes, j__10183 + 2, node_seq__10187, null)
              }else {
                var G__10188 = j__10183 + 2;
                j__10183 = G__10188;
                continue
              }
            }else {
              var G__10189 = j__10183 + 2;
              j__10183 = G__10189;
              continue
            }
          }
        }else {
          return null
        }
        break
      }
    }else {
      return new cljs.core.NodeSeq(null, nodes, i, s, null)
    }
  };
  create_inode_seq = function(nodes, i, s) {
    switch(arguments.length) {
      case 1:
        return create_inode_seq__1.call(this, nodes);
      case 3:
        return create_inode_seq__3.call(this, nodes, i, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  create_inode_seq.cljs$lang$arity$1 = create_inode_seq__1;
  create_inode_seq.cljs$lang$arity$3 = create_inode_seq__3;
  return create_inode_seq
}();
cljs.core.ArrayNodeSeq = function(meta, nodes, i, s, __hash) {
  this.meta = meta;
  this.nodes = nodes;
  this.i = i;
  this.s = s;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.ArrayNodeSeq.cljs$lang$type = true;
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayNodeSeq")
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__10190 = this;
  var h__2192__auto____10191 = this__10190.__hash;
  if(!(h__2192__auto____10191 == null)) {
    return h__2192__auto____10191
  }else {
    var h__2192__auto____10192 = cljs.core.hash_coll.call(null, coll);
    this__10190.__hash = h__2192__auto____10192;
    return h__2192__auto____10192
  }
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__10193 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.ArrayNodeSeq.prototype.toString = function() {
  var this__10194 = this;
  var this__10195 = this;
  return cljs.core.pr_str.call(null, this__10195)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__10196 = this;
  return this$
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__10197 = this;
  return cljs.core.first.call(null, this__10197.s)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__10198 = this;
  return cljs.core.create_array_node_seq.call(null, null, this__10198.nodes, this__10198.i, cljs.core.next.call(null, this__10198.s))
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__10199 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__10200 = this;
  return new cljs.core.ArrayNodeSeq(meta, this__10200.nodes, this__10200.i, this__10200.s, this__10200.__hash)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__10201 = this;
  return this__10201.meta
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__10202 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__10202.meta)
};
cljs.core.ArrayNodeSeq;
cljs.core.create_array_node_seq = function() {
  var create_array_node_seq = null;
  var create_array_node_seq__1 = function(nodes) {
    return create_array_node_seq.call(null, null, nodes, 0, null)
  };
  var create_array_node_seq__4 = function(meta, nodes, i, s) {
    if(s == null) {
      var len__10209 = nodes.length;
      var j__10210 = i;
      while(true) {
        if(j__10210 < len__10209) {
          var temp__3971__auto____10211 = nodes[j__10210];
          if(cljs.core.truth_(temp__3971__auto____10211)) {
            var nj__10212 = temp__3971__auto____10211;
            var temp__3971__auto____10213 = nj__10212.inode_seq();
            if(cljs.core.truth_(temp__3971__auto____10213)) {
              var ns__10214 = temp__3971__auto____10213;
              return new cljs.core.ArrayNodeSeq(meta, nodes, j__10210 + 1, ns__10214, null)
            }else {
              var G__10215 = j__10210 + 1;
              j__10210 = G__10215;
              continue
            }
          }else {
            var G__10216 = j__10210 + 1;
            j__10210 = G__10216;
            continue
          }
        }else {
          return null
        }
        break
      }
    }else {
      return new cljs.core.ArrayNodeSeq(meta, nodes, i, s, null)
    }
  };
  create_array_node_seq = function(meta, nodes, i, s) {
    switch(arguments.length) {
      case 1:
        return create_array_node_seq__1.call(this, meta);
      case 4:
        return create_array_node_seq__4.call(this, meta, nodes, i, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  create_array_node_seq.cljs$lang$arity$1 = create_array_node_seq__1;
  create_array_node_seq.cljs$lang$arity$4 = create_array_node_seq__4;
  return create_array_node_seq
}();
cljs.core.PersistentHashMap = function(meta, cnt, root, has_nil_QMARK_, nil_val, __hash) {
  this.meta = meta;
  this.cnt = cnt;
  this.root = root;
  this.has_nil_QMARK_ = has_nil_QMARK_;
  this.nil_val = nil_val;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentHashMap.cljs$lang$type = true;
cljs.core.PersistentHashMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentHashMap")
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__10219 = this;
  return new cljs.core.TransientHashMap({}, this__10219.root, this__10219.cnt, this__10219.has_nil_QMARK_, this__10219.nil_val)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__10220 = this;
  var h__2192__auto____10221 = this__10220.__hash;
  if(!(h__2192__auto____10221 == null)) {
    return h__2192__auto____10221
  }else {
    var h__2192__auto____10222 = cljs.core.hash_imap.call(null, coll);
    this__10220.__hash = h__2192__auto____10222;
    return h__2192__auto____10222
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__10223 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__10224 = this;
  if(k == null) {
    if(this__10224.has_nil_QMARK_) {
      return this__10224.nil_val
    }else {
      return not_found
    }
  }else {
    if(this__10224.root == null) {
      return not_found
    }else {
      if("\ufdd0'else") {
        return this__10224.root.inode_lookup(0, cljs.core.hash.call(null, k), k, not_found)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__10225 = this;
  if(k == null) {
    if(function() {
      var and__3822__auto____10226 = this__10225.has_nil_QMARK_;
      if(and__3822__auto____10226) {
        return v === this__10225.nil_val
      }else {
        return and__3822__auto____10226
      }
    }()) {
      return coll
    }else {
      return new cljs.core.PersistentHashMap(this__10225.meta, this__10225.has_nil_QMARK_ ? this__10225.cnt : this__10225.cnt + 1, this__10225.root, true, v, null)
    }
  }else {
    var added_leaf_QMARK___10227 = new cljs.core.Box(false);
    var new_root__10228 = (this__10225.root == null ? cljs.core.BitmapIndexedNode.EMPTY : this__10225.root).inode_assoc(0, cljs.core.hash.call(null, k), k, v, added_leaf_QMARK___10227);
    if(new_root__10228 === this__10225.root) {
      return coll
    }else {
      return new cljs.core.PersistentHashMap(this__10225.meta, added_leaf_QMARK___10227.val ? this__10225.cnt + 1 : this__10225.cnt, new_root__10228, this__10225.has_nil_QMARK_, this__10225.nil_val, null)
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__10229 = this;
  if(k == null) {
    return this__10229.has_nil_QMARK_
  }else {
    if(this__10229.root == null) {
      return false
    }else {
      if("\ufdd0'else") {
        return!(this__10229.root.inode_lookup(0, cljs.core.hash.call(null, k), k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.call = function() {
  var G__10252 = null;
  var G__10252__2 = function(this_sym10230, k) {
    var this__10232 = this;
    var this_sym10230__10233 = this;
    var coll__10234 = this_sym10230__10233;
    return coll__10234.cljs$core$ILookup$_lookup$arity$2(coll__10234, k)
  };
  var G__10252__3 = function(this_sym10231, k, not_found) {
    var this__10232 = this;
    var this_sym10231__10235 = this;
    var coll__10236 = this_sym10231__10235;
    return coll__10236.cljs$core$ILookup$_lookup$arity$3(coll__10236, k, not_found)
  };
  G__10252 = function(this_sym10231, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__10252__2.call(this, this_sym10231, k);
      case 3:
        return G__10252__3.call(this, this_sym10231, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__10252
}();
cljs.core.PersistentHashMap.prototype.apply = function(this_sym10217, args10218) {
  var this__10237 = this;
  return this_sym10217.call.apply(this_sym10217, [this_sym10217].concat(args10218.slice()))
};
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__10238 = this;
  var init__10239 = this__10238.has_nil_QMARK_ ? f.call(null, init, null, this__10238.nil_val) : init;
  if(cljs.core.reduced_QMARK_.call(null, init__10239)) {
    return cljs.core.deref.call(null, init__10239)
  }else {
    if(!(this__10238.root == null)) {
      return this__10238.root.kv_reduce(f, init__10239)
    }else {
      if("\ufdd0'else") {
        return init__10239
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__10240 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentHashMap.prototype.toString = function() {
  var this__10241 = this;
  var this__10242 = this;
  return cljs.core.pr_str.call(null, this__10242)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__10243 = this;
  if(this__10243.cnt > 0) {
    var s__10244 = !(this__10243.root == null) ? this__10243.root.inode_seq() : null;
    if(this__10243.has_nil_QMARK_) {
      return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([null, this__10243.nil_val], true), s__10244)
    }else {
      return s__10244
    }
  }else {
    return null
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__10245 = this;
  return this__10245.cnt
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__10246 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__10247 = this;
  return new cljs.core.PersistentHashMap(meta, this__10247.cnt, this__10247.root, this__10247.has_nil_QMARK_, this__10247.nil_val, this__10247.__hash)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__10248 = this;
  return this__10248.meta
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__10249 = this;
  return cljs.core._with_meta.call(null, cljs.core.PersistentHashMap.EMPTY, this__10249.meta)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__10250 = this;
  if(k == null) {
    if(this__10250.has_nil_QMARK_) {
      return new cljs.core.PersistentHashMap(this__10250.meta, this__10250.cnt - 1, this__10250.root, false, null, null)
    }else {
      return coll
    }
  }else {
    if(this__10250.root == null) {
      return coll
    }else {
      if("\ufdd0'else") {
        var new_root__10251 = this__10250.root.inode_without(0, cljs.core.hash.call(null, k), k);
        if(new_root__10251 === this__10250.root) {
          return coll
        }else {
          return new cljs.core.PersistentHashMap(this__10250.meta, this__10250.cnt - 1, new_root__10251, this__10250.has_nil_QMARK_, this__10250.nil_val, null)
        }
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap;
cljs.core.PersistentHashMap.EMPTY = new cljs.core.PersistentHashMap(null, 0, null, false, null, 0);
cljs.core.PersistentHashMap.fromArrays = function(ks, vs) {
  var len__10253 = ks.length;
  var i__10254 = 0;
  var out__10255 = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);
  while(true) {
    if(i__10254 < len__10253) {
      var G__10256 = i__10254 + 1;
      var G__10257 = cljs.core.assoc_BANG_.call(null, out__10255, ks[i__10254], vs[i__10254]);
      i__10254 = G__10256;
      out__10255 = G__10257;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__10255)
    }
    break
  }
};
cljs.core.TransientHashMap = function(edit, root, count, has_nil_QMARK_, nil_val) {
  this.edit = edit;
  this.root = root;
  this.count = count;
  this.has_nil_QMARK_ = has_nil_QMARK_;
  this.nil_val = nil_val;
  this.cljs$lang$protocol_mask$partition1$ = 14;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientHashMap.cljs$lang$type = true;
cljs.core.TransientHashMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientHashMap")
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(tcoll, key) {
  var this__10258 = this;
  return tcoll.without_BANG_(key)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(tcoll, key, val) {
  var this__10259 = this;
  return tcoll.assoc_BANG_(key, val)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, val) {
  var this__10260 = this;
  return tcoll.conj_BANG_(val)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__10261 = this;
  return tcoll.persistent_BANG_()
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, k) {
  var this__10262 = this;
  if(k == null) {
    if(this__10262.has_nil_QMARK_) {
      return this__10262.nil_val
    }else {
      return null
    }
  }else {
    if(this__10262.root == null) {
      return null
    }else {
      return this__10262.root.inode_lookup(0, cljs.core.hash.call(null, k), k)
    }
  }
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, k, not_found) {
  var this__10263 = this;
  if(k == null) {
    if(this__10263.has_nil_QMARK_) {
      return this__10263.nil_val
    }else {
      return not_found
    }
  }else {
    if(this__10263.root == null) {
      return not_found
    }else {
      return this__10263.root.inode_lookup(0, cljs.core.hash.call(null, k), k, not_found)
    }
  }
};
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__10264 = this;
  if(this__10264.edit) {
    return this__10264.count
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.conj_BANG_ = function(o) {
  var this__10265 = this;
  var tcoll__10266 = this;
  if(this__10265.edit) {
    if(function() {
      var G__10267__10268 = o;
      if(G__10267__10268) {
        if(function() {
          var or__3824__auto____10269 = G__10267__10268.cljs$lang$protocol_mask$partition0$ & 2048;
          if(or__3824__auto____10269) {
            return or__3824__auto____10269
          }else {
            return G__10267__10268.cljs$core$IMapEntry$
          }
        }()) {
          return true
        }else {
          if(!G__10267__10268.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__10267__10268)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__10267__10268)
      }
    }()) {
      return tcoll__10266.assoc_BANG_(cljs.core.key.call(null, o), cljs.core.val.call(null, o))
    }else {
      var es__10270 = cljs.core.seq.call(null, o);
      var tcoll__10271 = tcoll__10266;
      while(true) {
        var temp__3971__auto____10272 = cljs.core.first.call(null, es__10270);
        if(cljs.core.truth_(temp__3971__auto____10272)) {
          var e__10273 = temp__3971__auto____10272;
          var G__10284 = cljs.core.next.call(null, es__10270);
          var G__10285 = tcoll__10271.assoc_BANG_(cljs.core.key.call(null, e__10273), cljs.core.val.call(null, e__10273));
          es__10270 = G__10284;
          tcoll__10271 = G__10285;
          continue
        }else {
          return tcoll__10271
        }
        break
      }
    }
  }else {
    throw new Error("conj! after persistent");
  }
};
cljs.core.TransientHashMap.prototype.assoc_BANG_ = function(k, v) {
  var this__10274 = this;
  var tcoll__10275 = this;
  if(this__10274.edit) {
    if(k == null) {
      if(this__10274.nil_val === v) {
      }else {
        this__10274.nil_val = v
      }
      if(this__10274.has_nil_QMARK_) {
      }else {
        this__10274.count = this__10274.count + 1;
        this__10274.has_nil_QMARK_ = true
      }
      return tcoll__10275
    }else {
      var added_leaf_QMARK___10276 = new cljs.core.Box(false);
      var node__10277 = (this__10274.root == null ? cljs.core.BitmapIndexedNode.EMPTY : this__10274.root).inode_assoc_BANG_(this__10274.edit, 0, cljs.core.hash.call(null, k), k, v, added_leaf_QMARK___10276);
      if(node__10277 === this__10274.root) {
      }else {
        this__10274.root = node__10277
      }
      if(added_leaf_QMARK___10276.val) {
        this__10274.count = this__10274.count + 1
      }else {
      }
      return tcoll__10275
    }
  }else {
    throw new Error("assoc! after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.without_BANG_ = function(k) {
  var this__10278 = this;
  var tcoll__10279 = this;
  if(this__10278.edit) {
    if(k == null) {
      if(this__10278.has_nil_QMARK_) {
        this__10278.has_nil_QMARK_ = false;
        this__10278.nil_val = null;
        this__10278.count = this__10278.count - 1;
        return tcoll__10279
      }else {
        return tcoll__10279
      }
    }else {
      if(this__10278.root == null) {
        return tcoll__10279
      }else {
        var removed_leaf_QMARK___10280 = new cljs.core.Box(false);
        var node__10281 = this__10278.root.inode_without_BANG_(this__10278.edit, 0, cljs.core.hash.call(null, k), k, removed_leaf_QMARK___10280);
        if(node__10281 === this__10278.root) {
        }else {
          this__10278.root = node__10281
        }
        if(cljs.core.truth_(removed_leaf_QMARK___10280[0])) {
          this__10278.count = this__10278.count - 1
        }else {
        }
        return tcoll__10279
      }
    }
  }else {
    throw new Error("dissoc! after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.persistent_BANG_ = function() {
  var this__10282 = this;
  var tcoll__10283 = this;
  if(this__10282.edit) {
    this__10282.edit = null;
    return new cljs.core.PersistentHashMap(null, this__10282.count, this__10282.root, this__10282.has_nil_QMARK_, this__10282.nil_val, null)
  }else {
    throw new Error("persistent! called twice");
  }
};
cljs.core.TransientHashMap;
cljs.core.tree_map_seq_push = function tree_map_seq_push(node, stack, ascending_QMARK_) {
  var t__10288 = node;
  var stack__10289 = stack;
  while(true) {
    if(!(t__10288 == null)) {
      var G__10290 = ascending_QMARK_ ? t__10288.left : t__10288.right;
      var G__10291 = cljs.core.conj.call(null, stack__10289, t__10288);
      t__10288 = G__10290;
      stack__10289 = G__10291;
      continue
    }else {
      return stack__10289
    }
    break
  }
};
cljs.core.PersistentTreeMapSeq = function(meta, stack, ascending_QMARK_, cnt, __hash) {
  this.meta = meta;
  this.stack = stack;
  this.ascending_QMARK_ = ascending_QMARK_;
  this.cnt = cnt;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850570
};
cljs.core.PersistentTreeMapSeq.cljs$lang$type = true;
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeMapSeq")
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__10292 = this;
  var h__2192__auto____10293 = this__10292.__hash;
  if(!(h__2192__auto____10293 == null)) {
    return h__2192__auto____10293
  }else {
    var h__2192__auto____10294 = cljs.core.hash_coll.call(null, coll);
    this__10292.__hash = h__2192__auto____10294;
    return h__2192__auto____10294
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__10295 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.PersistentTreeMapSeq.prototype.toString = function() {
  var this__10296 = this;
  var this__10297 = this;
  return cljs.core.pr_str.call(null, this__10297)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__10298 = this;
  return this$
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__10299 = this;
  if(this__10299.cnt < 0) {
    return cljs.core.count.call(null, cljs.core.next.call(null, coll)) + 1
  }else {
    return this__10299.cnt
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(this$) {
  var this__10300 = this;
  return cljs.core.peek.call(null, this__10300.stack)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(this$) {
  var this__10301 = this;
  var t__10302 = cljs.core.first.call(null, this__10301.stack);
  var next_stack__10303 = cljs.core.tree_map_seq_push.call(null, this__10301.ascending_QMARK_ ? t__10302.right : t__10302.left, cljs.core.next.call(null, this__10301.stack), this__10301.ascending_QMARK_);
  if(!(next_stack__10303 == null)) {
    return new cljs.core.PersistentTreeMapSeq(null, next_stack__10303, this__10301.ascending_QMARK_, this__10301.cnt - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__10304 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__10305 = this;
  return new cljs.core.PersistentTreeMapSeq(meta, this__10305.stack, this__10305.ascending_QMARK_, this__10305.cnt, this__10305.__hash)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__10306 = this;
  return this__10306.meta
};
cljs.core.PersistentTreeMapSeq;
cljs.core.create_tree_map_seq = function create_tree_map_seq(tree, ascending_QMARK_, cnt) {
  return new cljs.core.PersistentTreeMapSeq(null, cljs.core.tree_map_seq_push.call(null, tree, null, ascending_QMARK_), ascending_QMARK_, cnt, null)
};
cljs.core.balance_left = function balance_left(key, val, ins, right) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins)) {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.left)) {
      return new cljs.core.RedNode(ins.key, ins.val, ins.left.blacken(), new cljs.core.BlackNode(key, val, ins.right, right, null), null)
    }else {
      if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.right)) {
        return new cljs.core.RedNode(ins.right.key, ins.right.val, new cljs.core.BlackNode(ins.key, ins.val, ins.left, ins.right.left, null), new cljs.core.BlackNode(key, val, ins.right.right, right, null), null)
      }else {
        if("\ufdd0'else") {
          return new cljs.core.BlackNode(key, val, ins, right, null)
        }else {
          return null
        }
      }
    }
  }else {
    return new cljs.core.BlackNode(key, val, ins, right, null)
  }
};
cljs.core.balance_right = function balance_right(key, val, left, ins) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins)) {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.right)) {
      return new cljs.core.RedNode(ins.key, ins.val, new cljs.core.BlackNode(key, val, left, ins.left, null), ins.right.blacken(), null)
    }else {
      if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.left)) {
        return new cljs.core.RedNode(ins.left.key, ins.left.val, new cljs.core.BlackNode(key, val, left, ins.left.left, null), new cljs.core.BlackNode(ins.key, ins.val, ins.left.right, ins.right, null), null)
      }else {
        if("\ufdd0'else") {
          return new cljs.core.BlackNode(key, val, left, ins, null)
        }else {
          return null
        }
      }
    }
  }else {
    return new cljs.core.BlackNode(key, val, left, ins, null)
  }
};
cljs.core.balance_left_del = function balance_left_del(key, val, del, right) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, del)) {
    return new cljs.core.RedNode(key, val, del.blacken(), right, null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, right)) {
      return cljs.core.balance_right.call(null, key, val, del, right.redden())
    }else {
      if(function() {
        var and__3822__auto____10308 = cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, right);
        if(and__3822__auto____10308) {
          return cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, right.left)
        }else {
          return and__3822__auto____10308
        }
      }()) {
        return new cljs.core.RedNode(right.left.key, right.left.val, new cljs.core.BlackNode(key, val, del, right.left.left, null), cljs.core.balance_right.call(null, right.key, right.val, right.left.right, right.right.redden()), null)
      }else {
        if("\ufdd0'else") {
          throw new Error("red-black tree invariant violation");
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.balance_right_del = function balance_right_del(key, val, left, del) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, del)) {
    return new cljs.core.RedNode(key, val, left, del.blacken(), null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, left)) {
      return cljs.core.balance_left.call(null, key, val, left.redden(), del)
    }else {
      if(function() {
        var and__3822__auto____10310 = cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, left);
        if(and__3822__auto____10310) {
          return cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, left.right)
        }else {
          return and__3822__auto____10310
        }
      }()) {
        return new cljs.core.RedNode(left.right.key, left.right.val, cljs.core.balance_left.call(null, left.key, left.val, left.left.redden(), left.right.left), new cljs.core.BlackNode(key, val, left.right.right, del, null), null)
      }else {
        if("\ufdd0'else") {
          throw new Error("red-black tree invariant violation");
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.tree_map_kv_reduce = function tree_map_kv_reduce(node, f, init) {
  var init__10314 = f.call(null, init, node.key, node.val);
  if(cljs.core.reduced_QMARK_.call(null, init__10314)) {
    return cljs.core.deref.call(null, init__10314)
  }else {
    var init__10315 = !(node.left == null) ? tree_map_kv_reduce.call(null, node.left, f, init__10314) : init__10314;
    if(cljs.core.reduced_QMARK_.call(null, init__10315)) {
      return cljs.core.deref.call(null, init__10315)
    }else {
      var init__10316 = !(node.right == null) ? tree_map_kv_reduce.call(null, node.right, f, init__10315) : init__10315;
      if(cljs.core.reduced_QMARK_.call(null, init__10316)) {
        return cljs.core.deref.call(null, init__10316)
      }else {
        return init__10316
      }
    }
  }
};
cljs.core.BlackNode = function(key, val, left, right, __hash) {
  this.key = key;
  this.val = val;
  this.left = left;
  this.right = right;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.BlackNode.cljs$lang$type = true;
cljs.core.BlackNode.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/BlackNode")
};
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__10319 = this;
  var h__2192__auto____10320 = this__10319.__hash;
  if(!(h__2192__auto____10320 == null)) {
    return h__2192__auto____10320
  }else {
    var h__2192__auto____10321 = cljs.core.hash_coll.call(null, coll);
    this__10319.__hash = h__2192__auto____10321;
    return h__2192__auto____10321
  }
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(node, k) {
  var this__10322 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, null)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(node, k, not_found) {
  var this__10323 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, not_found)
};
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(node, k, v) {
  var this__10324 = this;
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this__10324.key, this__10324.val], true), k, v)
};
cljs.core.BlackNode.prototype.call = function() {
  var G__10372 = null;
  var G__10372__2 = function(this_sym10325, k) {
    var this__10327 = this;
    var this_sym10325__10328 = this;
    var node__10329 = this_sym10325__10328;
    return node__10329.cljs$core$ILookup$_lookup$arity$2(node__10329, k)
  };
  var G__10372__3 = function(this_sym10326, k, not_found) {
    var this__10327 = this;
    var this_sym10326__10330 = this;
    var node__10331 = this_sym10326__10330;
    return node__10331.cljs$core$ILookup$_lookup$arity$3(node__10331, k, not_found)
  };
  G__10372 = function(this_sym10326, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__10372__2.call(this, this_sym10326, k);
      case 3:
        return G__10372__3.call(this, this_sym10326, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__10372
}();
cljs.core.BlackNode.prototype.apply = function(this_sym10317, args10318) {
  var this__10332 = this;
  return this_sym10317.call.apply(this_sym10317, [this_sym10317].concat(args10318.slice()))
};
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(node, o) {
  var this__10333 = this;
  return cljs.core.PersistentVector.fromArray([this__10333.key, this__10333.val, o], true)
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function(node) {
  var this__10334 = this;
  return this__10334.key
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function(node) {
  var this__10335 = this;
  return this__10335.val
};
cljs.core.BlackNode.prototype.add_right = function(ins) {
  var this__10336 = this;
  var node__10337 = this;
  return ins.balance_right(node__10337)
};
cljs.core.BlackNode.prototype.redden = function() {
  var this__10338 = this;
  var node__10339 = this;
  return new cljs.core.RedNode(this__10338.key, this__10338.val, this__10338.left, this__10338.right, null)
};
cljs.core.BlackNode.prototype.remove_right = function(del) {
  var this__10340 = this;
  var node__10341 = this;
  return cljs.core.balance_right_del.call(null, this__10340.key, this__10340.val, this__10340.left, del)
};
cljs.core.BlackNode.prototype.replace = function(key, val, left, right) {
  var this__10342 = this;
  var node__10343 = this;
  return new cljs.core.BlackNode(key, val, left, right, null)
};
cljs.core.BlackNode.prototype.kv_reduce = function(f, init) {
  var this__10344 = this;
  var node__10345 = this;
  return cljs.core.tree_map_kv_reduce.call(null, node__10345, f, init)
};
cljs.core.BlackNode.prototype.remove_left = function(del) {
  var this__10346 = this;
  var node__10347 = this;
  return cljs.core.balance_left_del.call(null, this__10346.key, this__10346.val, del, this__10346.right)
};
cljs.core.BlackNode.prototype.add_left = function(ins) {
  var this__10348 = this;
  var node__10349 = this;
  return ins.balance_left(node__10349)
};
cljs.core.BlackNode.prototype.balance_left = function(parent) {
  var this__10350 = this;
  var node__10351 = this;
  return new cljs.core.BlackNode(parent.key, parent.val, node__10351, parent.right, null)
};
cljs.core.BlackNode.prototype.toString = function() {
  var G__10373 = null;
  var G__10373__0 = function() {
    var this__10352 = this;
    var this__10354 = this;
    return cljs.core.pr_str.call(null, this__10354)
  };
  G__10373 = function() {
    switch(arguments.length) {
      case 0:
        return G__10373__0.call(this)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__10373
}();
cljs.core.BlackNode.prototype.balance_right = function(parent) {
  var this__10355 = this;
  var node__10356 = this;
  return new cljs.core.BlackNode(parent.key, parent.val, parent.left, node__10356, null)
};
cljs.core.BlackNode.prototype.blacken = function() {
  var this__10357 = this;
  var node__10358 = this;
  return node__10358
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(node, f) {
  var this__10359 = this;
  return cljs.core.ci_reduce.call(null, node, f)
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(node, f, start) {
  var this__10360 = this;
  return cljs.core.ci_reduce.call(null, node, f, start)
};
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function(node) {
  var this__10361 = this;
  return cljs.core.list.call(null, this__10361.key, this__10361.val)
};
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = function(node) {
  var this__10362 = this;
  return 2
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = function(node) {
  var this__10363 = this;
  return this__10363.val
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = function(node) {
  var this__10364 = this;
  return cljs.core.PersistentVector.fromArray([this__10364.key], true)
};
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(node, n, v) {
  var this__10365 = this;
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this__10365.key, this__10365.val], true), n, v)
};
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__10366 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(node, meta) {
  var this__10367 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this__10367.key, this__10367.val], true), meta)
};
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = function(node) {
  var this__10368 = this;
  return null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(node, n) {
  var this__10369 = this;
  if(n === 0) {
    return this__10369.key
  }else {
    if(n === 1) {
      return this__10369.val
    }else {
      if("\ufdd0'else") {
        return null
      }else {
        return null
      }
    }
  }
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(node, n, not_found) {
  var this__10370 = this;
  if(n === 0) {
    return this__10370.key
  }else {
    if(n === 1) {
      return this__10370.val
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.BlackNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(node) {
  var this__10371 = this;
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.BlackNode;
cljs.core.RedNode = function(key, val, left, right, __hash) {
  this.key = key;
  this.val = val;
  this.left = left;
  this.right = right;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.RedNode.cljs$lang$type = true;
cljs.core.RedNode.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/RedNode")
};
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__10376 = this;
  var h__2192__auto____10377 = this__10376.__hash;
  if(!(h__2192__auto____10377 == null)) {
    return h__2192__auto____10377
  }else {
    var h__2192__auto____10378 = cljs.core.hash_coll.call(null, coll);
    this__10376.__hash = h__2192__auto____10378;
    return h__2192__auto____10378
  }
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(node, k) {
  var this__10379 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, null)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(node, k, not_found) {
  var this__10380 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, not_found)
};
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(node, k, v) {
  var this__10381 = this;
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this__10381.key, this__10381.val], true), k, v)
};
cljs.core.RedNode.prototype.call = function() {
  var G__10429 = null;
  var G__10429__2 = function(this_sym10382, k) {
    var this__10384 = this;
    var this_sym10382__10385 = this;
    var node__10386 = this_sym10382__10385;
    return node__10386.cljs$core$ILookup$_lookup$arity$2(node__10386, k)
  };
  var G__10429__3 = function(this_sym10383, k, not_found) {
    var this__10384 = this;
    var this_sym10383__10387 = this;
    var node__10388 = this_sym10383__10387;
    return node__10388.cljs$core$ILookup$_lookup$arity$3(node__10388, k, not_found)
  };
  G__10429 = function(this_sym10383, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__10429__2.call(this, this_sym10383, k);
      case 3:
        return G__10429__3.call(this, this_sym10383, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__10429
}();
cljs.core.RedNode.prototype.apply = function(this_sym10374, args10375) {
  var this__10389 = this;
  return this_sym10374.call.apply(this_sym10374, [this_sym10374].concat(args10375.slice()))
};
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(node, o) {
  var this__10390 = this;
  return cljs.core.PersistentVector.fromArray([this__10390.key, this__10390.val, o], true)
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function(node) {
  var this__10391 = this;
  return this__10391.key
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function(node) {
  var this__10392 = this;
  return this__10392.val
};
cljs.core.RedNode.prototype.add_right = function(ins) {
  var this__10393 = this;
  var node__10394 = this;
  return new cljs.core.RedNode(this__10393.key, this__10393.val, this__10393.left, ins, null)
};
cljs.core.RedNode.prototype.redden = function() {
  var this__10395 = this;
  var node__10396 = this;
  throw new Error("red-black tree invariant violation");
};
cljs.core.RedNode.prototype.remove_right = function(del) {
  var this__10397 = this;
  var node__10398 = this;
  return new cljs.core.RedNode(this__10397.key, this__10397.val, this__10397.left, del, null)
};
cljs.core.RedNode.prototype.replace = function(key, val, left, right) {
  var this__10399 = this;
  var node__10400 = this;
  return new cljs.core.RedNode(key, val, left, right, null)
};
cljs.core.RedNode.prototype.kv_reduce = function(f, init) {
  var this__10401 = this;
  var node__10402 = this;
  return cljs.core.tree_map_kv_reduce.call(null, node__10402, f, init)
};
cljs.core.RedNode.prototype.remove_left = function(del) {
  var this__10403 = this;
  var node__10404 = this;
  return new cljs.core.RedNode(this__10403.key, this__10403.val, del, this__10403.right, null)
};
cljs.core.RedNode.prototype.add_left = function(ins) {
  var this__10405 = this;
  var node__10406 = this;
  return new cljs.core.RedNode(this__10405.key, this__10405.val, ins, this__10405.right, null)
};
cljs.core.RedNode.prototype.balance_left = function(parent) {
  var this__10407 = this;
  var node__10408 = this;
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__10407.left)) {
    return new cljs.core.RedNode(this__10407.key, this__10407.val, this__10407.left.blacken(), new cljs.core.BlackNode(parent.key, parent.val, this__10407.right, parent.right, null), null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__10407.right)) {
      return new cljs.core.RedNode(this__10407.right.key, this__10407.right.val, new cljs.core.BlackNode(this__10407.key, this__10407.val, this__10407.left, this__10407.right.left, null), new cljs.core.BlackNode(parent.key, parent.val, this__10407.right.right, parent.right, null), null)
    }else {
      if("\ufdd0'else") {
        return new cljs.core.BlackNode(parent.key, parent.val, node__10408, parent.right, null)
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.toString = function() {
  var G__10430 = null;
  var G__10430__0 = function() {
    var this__10409 = this;
    var this__10411 = this;
    return cljs.core.pr_str.call(null, this__10411)
  };
  G__10430 = function() {
    switch(arguments.length) {
      case 0:
        return G__10430__0.call(this)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__10430
}();
cljs.core.RedNode.prototype.balance_right = function(parent) {
  var this__10412 = this;
  var node__10413 = this;
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__10412.right)) {
    return new cljs.core.RedNode(this__10412.key, this__10412.val, new cljs.core.BlackNode(parent.key, parent.val, parent.left, this__10412.left, null), this__10412.right.blacken(), null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__10412.left)) {
      return new cljs.core.RedNode(this__10412.left.key, this__10412.left.val, new cljs.core.BlackNode(parent.key, parent.val, parent.left, this__10412.left.left, null), new cljs.core.BlackNode(this__10412.key, this__10412.val, this__10412.left.right, this__10412.right, null), null)
    }else {
      if("\ufdd0'else") {
        return new cljs.core.BlackNode(parent.key, parent.val, parent.left, node__10413, null)
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.blacken = function() {
  var this__10414 = this;
  var node__10415 = this;
  return new cljs.core.BlackNode(this__10414.key, this__10414.val, this__10414.left, this__10414.right, null)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(node, f) {
  var this__10416 = this;
  return cljs.core.ci_reduce.call(null, node, f)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(node, f, start) {
  var this__10417 = this;
  return cljs.core.ci_reduce.call(null, node, f, start)
};
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function(node) {
  var this__10418 = this;
  return cljs.core.list.call(null, this__10418.key, this__10418.val)
};
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = function(node) {
  var this__10419 = this;
  return 2
};
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = function(node) {
  var this__10420 = this;
  return this__10420.val
};
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = function(node) {
  var this__10421 = this;
  return cljs.core.PersistentVector.fromArray([this__10421.key], true)
};
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(node, n, v) {
  var this__10422 = this;
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this__10422.key, this__10422.val], true), n, v)
};
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__10423 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(node, meta) {
  var this__10424 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this__10424.key, this__10424.val], true), meta)
};
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = function(node) {
  var this__10425 = this;
  return null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(node, n) {
  var this__10426 = this;
  if(n === 0) {
    return this__10426.key
  }else {
    if(n === 1) {
      return this__10426.val
    }else {
      if("\ufdd0'else") {
        return null
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(node, n, not_found) {
  var this__10427 = this;
  if(n === 0) {
    return this__10427.key
  }else {
    if(n === 1) {
      return this__10427.val
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(node) {
  var this__10428 = this;
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.RedNode;
cljs.core.tree_map_add = function tree_map_add(comp, tree, k, v, found) {
  if(tree == null) {
    return new cljs.core.RedNode(k, v, null, null, null)
  }else {
    var c__10434 = comp.call(null, k, tree.key);
    if(c__10434 === 0) {
      found[0] = tree;
      return null
    }else {
      if(c__10434 < 0) {
        var ins__10435 = tree_map_add.call(null, comp, tree.left, k, v, found);
        if(!(ins__10435 == null)) {
          return tree.add_left(ins__10435)
        }else {
          return null
        }
      }else {
        if("\ufdd0'else") {
          var ins__10436 = tree_map_add.call(null, comp, tree.right, k, v, found);
          if(!(ins__10436 == null)) {
            return tree.add_right(ins__10436)
          }else {
            return null
          }
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.tree_map_append = function tree_map_append(left, right) {
  if(left == null) {
    return right
  }else {
    if(right == null) {
      return left
    }else {
      if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, left)) {
        if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, right)) {
          var app__10439 = tree_map_append.call(null, left.right, right.left);
          if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, app__10439)) {
            return new cljs.core.RedNode(app__10439.key, app__10439.val, new cljs.core.RedNode(left.key, left.val, left.left, app__10439.left, null), new cljs.core.RedNode(right.key, right.val, app__10439.right, right.right, null), null)
          }else {
            return new cljs.core.RedNode(left.key, left.val, left.left, new cljs.core.RedNode(right.key, right.val, app__10439, right.right, null), null)
          }
        }else {
          return new cljs.core.RedNode(left.key, left.val, left.left, tree_map_append.call(null, left.right, right), null)
        }
      }else {
        if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, right)) {
          return new cljs.core.RedNode(right.key, right.val, tree_map_append.call(null, left, right.left), right.right, null)
        }else {
          if("\ufdd0'else") {
            var app__10440 = tree_map_append.call(null, left.right, right.left);
            if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, app__10440)) {
              return new cljs.core.RedNode(app__10440.key, app__10440.val, new cljs.core.BlackNode(left.key, left.val, left.left, app__10440.left, null), new cljs.core.BlackNode(right.key, right.val, app__10440.right, right.right, null), null)
            }else {
              return cljs.core.balance_left_del.call(null, left.key, left.val, left.left, new cljs.core.BlackNode(right.key, right.val, app__10440, right.right, null))
            }
          }else {
            return null
          }
        }
      }
    }
  }
};
cljs.core.tree_map_remove = function tree_map_remove(comp, tree, k, found) {
  if(!(tree == null)) {
    var c__10446 = comp.call(null, k, tree.key);
    if(c__10446 === 0) {
      found[0] = tree;
      return cljs.core.tree_map_append.call(null, tree.left, tree.right)
    }else {
      if(c__10446 < 0) {
        var del__10447 = tree_map_remove.call(null, comp, tree.left, k, found);
        if(function() {
          var or__3824__auto____10448 = !(del__10447 == null);
          if(or__3824__auto____10448) {
            return or__3824__auto____10448
          }else {
            return!(found[0] == null)
          }
        }()) {
          if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, tree.left)) {
            return cljs.core.balance_left_del.call(null, tree.key, tree.val, del__10447, tree.right)
          }else {
            return new cljs.core.RedNode(tree.key, tree.val, del__10447, tree.right, null)
          }
        }else {
          return null
        }
      }else {
        if("\ufdd0'else") {
          var del__10449 = tree_map_remove.call(null, comp, tree.right, k, found);
          if(function() {
            var or__3824__auto____10450 = !(del__10449 == null);
            if(or__3824__auto____10450) {
              return or__3824__auto____10450
            }else {
              return!(found[0] == null)
            }
          }()) {
            if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, tree.right)) {
              return cljs.core.balance_right_del.call(null, tree.key, tree.val, tree.left, del__10449)
            }else {
              return new cljs.core.RedNode(tree.key, tree.val, tree.left, del__10449, null)
            }
          }else {
            return null
          }
        }else {
          return null
        }
      }
    }
  }else {
    return null
  }
};
cljs.core.tree_map_replace = function tree_map_replace(comp, tree, k, v) {
  var tk__10453 = tree.key;
  var c__10454 = comp.call(null, k, tk__10453);
  if(c__10454 === 0) {
    return tree.replace(tk__10453, v, tree.left, tree.right)
  }else {
    if(c__10454 < 0) {
      return tree.replace(tk__10453, tree.val, tree_map_replace.call(null, comp, tree.left, k, v), tree.right)
    }else {
      if("\ufdd0'else") {
        return tree.replace(tk__10453, tree.val, tree.left, tree_map_replace.call(null, comp, tree.right, k, v))
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentTreeMap = function(comp, tree, cnt, meta, __hash) {
  this.comp = comp;
  this.tree = tree;
  this.cnt = cnt;
  this.meta = meta;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 418776847
};
cljs.core.PersistentTreeMap.cljs$lang$type = true;
cljs.core.PersistentTreeMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeMap")
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__10457 = this;
  var h__2192__auto____10458 = this__10457.__hash;
  if(!(h__2192__auto____10458 == null)) {
    return h__2192__auto____10458
  }else {
    var h__2192__auto____10459 = cljs.core.hash_imap.call(null, coll);
    this__10457.__hash = h__2192__auto____10459;
    return h__2192__auto____10459
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__10460 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__10461 = this;
  var n__10462 = coll.entry_at(k);
  if(!(n__10462 == null)) {
    return n__10462.val
  }else {
    return not_found
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__10463 = this;
  var found__10464 = [null];
  var t__10465 = cljs.core.tree_map_add.call(null, this__10463.comp, this__10463.tree, k, v, found__10464);
  if(t__10465 == null) {
    var found_node__10466 = cljs.core.nth.call(null, found__10464, 0);
    if(cljs.core._EQ_.call(null, v, found_node__10466.val)) {
      return coll
    }else {
      return new cljs.core.PersistentTreeMap(this__10463.comp, cljs.core.tree_map_replace.call(null, this__10463.comp, this__10463.tree, k, v), this__10463.cnt, this__10463.meta, null)
    }
  }else {
    return new cljs.core.PersistentTreeMap(this__10463.comp, t__10465.blacken(), this__10463.cnt + 1, this__10463.meta, null)
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__10467 = this;
  return!(coll.entry_at(k) == null)
};
cljs.core.PersistentTreeMap.prototype.call = function() {
  var G__10501 = null;
  var G__10501__2 = function(this_sym10468, k) {
    var this__10470 = this;
    var this_sym10468__10471 = this;
    var coll__10472 = this_sym10468__10471;
    return coll__10472.cljs$core$ILookup$_lookup$arity$2(coll__10472, k)
  };
  var G__10501__3 = function(this_sym10469, k, not_found) {
    var this__10470 = this;
    var this_sym10469__10473 = this;
    var coll__10474 = this_sym10469__10473;
    return coll__10474.cljs$core$ILookup$_lookup$arity$3(coll__10474, k, not_found)
  };
  G__10501 = function(this_sym10469, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__10501__2.call(this, this_sym10469, k);
      case 3:
        return G__10501__3.call(this, this_sym10469, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__10501
}();
cljs.core.PersistentTreeMap.prototype.apply = function(this_sym10455, args10456) {
  var this__10475 = this;
  return this_sym10455.call.apply(this_sym10455, [this_sym10455].concat(args10456.slice()))
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__10476 = this;
  if(!(this__10476.tree == null)) {
    return cljs.core.tree_map_kv_reduce.call(null, this__10476.tree, f, init)
  }else {
    return init
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__10477 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__10478 = this;
  if(this__10478.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__10478.tree, false, this__10478.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.toString = function() {
  var this__10479 = this;
  var this__10480 = this;
  return cljs.core.pr_str.call(null, this__10480)
};
cljs.core.PersistentTreeMap.prototype.entry_at = function(k) {
  var this__10481 = this;
  var coll__10482 = this;
  var t__10483 = this__10481.tree;
  while(true) {
    if(!(t__10483 == null)) {
      var c__10484 = this__10481.comp.call(null, k, t__10483.key);
      if(c__10484 === 0) {
        return t__10483
      }else {
        if(c__10484 < 0) {
          var G__10502 = t__10483.left;
          t__10483 = G__10502;
          continue
        }else {
          if("\ufdd0'else") {
            var G__10503 = t__10483.right;
            t__10483 = G__10503;
            continue
          }else {
            return null
          }
        }
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(coll, ascending_QMARK_) {
  var this__10485 = this;
  if(this__10485.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__10485.tree, ascending_QMARK_, this__10485.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(coll, k, ascending_QMARK_) {
  var this__10486 = this;
  if(this__10486.cnt > 0) {
    var stack__10487 = null;
    var t__10488 = this__10486.tree;
    while(true) {
      if(!(t__10488 == null)) {
        var c__10489 = this__10486.comp.call(null, k, t__10488.key);
        if(c__10489 === 0) {
          return new cljs.core.PersistentTreeMapSeq(null, cljs.core.conj.call(null, stack__10487, t__10488), ascending_QMARK_, -1, null)
        }else {
          if(cljs.core.truth_(ascending_QMARK_)) {
            if(c__10489 < 0) {
              var G__10504 = cljs.core.conj.call(null, stack__10487, t__10488);
              var G__10505 = t__10488.left;
              stack__10487 = G__10504;
              t__10488 = G__10505;
              continue
            }else {
              var G__10506 = stack__10487;
              var G__10507 = t__10488.right;
              stack__10487 = G__10506;
              t__10488 = G__10507;
              continue
            }
          }else {
            if("\ufdd0'else") {
              if(c__10489 > 0) {
                var G__10508 = cljs.core.conj.call(null, stack__10487, t__10488);
                var G__10509 = t__10488.right;
                stack__10487 = G__10508;
                t__10488 = G__10509;
                continue
              }else {
                var G__10510 = stack__10487;
                var G__10511 = t__10488.left;
                stack__10487 = G__10510;
                t__10488 = G__10511;
                continue
              }
            }else {
              return null
            }
          }
        }
      }else {
        if(stack__10487 == null) {
          return new cljs.core.PersistentTreeMapSeq(null, stack__10487, ascending_QMARK_, -1, null)
        }else {
          return null
        }
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(coll, entry) {
  var this__10490 = this;
  return cljs.core.key.call(null, entry)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = function(coll) {
  var this__10491 = this;
  return this__10491.comp
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__10492 = this;
  if(this__10492.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__10492.tree, true, this__10492.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__10493 = this;
  return this__10493.cnt
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__10494 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__10495 = this;
  return new cljs.core.PersistentTreeMap(this__10495.comp, this__10495.tree, this__10495.cnt, meta, this__10495.__hash)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__10496 = this;
  return this__10496.meta
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__10497 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeMap.EMPTY, this__10497.meta)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__10498 = this;
  var found__10499 = [null];
  var t__10500 = cljs.core.tree_map_remove.call(null, this__10498.comp, this__10498.tree, k, found__10499);
  if(t__10500 == null) {
    if(cljs.core.nth.call(null, found__10499, 0) == null) {
      return coll
    }else {
      return new cljs.core.PersistentTreeMap(this__10498.comp, null, 0, this__10498.meta, null)
    }
  }else {
    return new cljs.core.PersistentTreeMap(this__10498.comp, t__10500.blacken(), this__10498.cnt - 1, this__10498.meta, null)
  }
};
cljs.core.PersistentTreeMap;
cljs.core.PersistentTreeMap.EMPTY = new cljs.core.PersistentTreeMap(cljs.core.compare, null, 0, null, 0);
cljs.core.hash_map = function() {
  var hash_map__delegate = function(keyvals) {
    var in__10514 = cljs.core.seq.call(null, keyvals);
    var out__10515 = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);
    while(true) {
      if(in__10514) {
        var G__10516 = cljs.core.nnext.call(null, in__10514);
        var G__10517 = cljs.core.assoc_BANG_.call(null, out__10515, cljs.core.first.call(null, in__10514), cljs.core.second.call(null, in__10514));
        in__10514 = G__10516;
        out__10515 = G__10517;
        continue
      }else {
        return cljs.core.persistent_BANG_.call(null, out__10515)
      }
      break
    }
  };
  var hash_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return hash_map__delegate.call(this, keyvals)
  };
  hash_map.cljs$lang$maxFixedArity = 0;
  hash_map.cljs$lang$applyTo = function(arglist__10518) {
    var keyvals = cljs.core.seq(arglist__10518);
    return hash_map__delegate(keyvals)
  };
  hash_map.cljs$lang$arity$variadic = hash_map__delegate;
  return hash_map
}();
cljs.core.array_map = function() {
  var array_map__delegate = function(keyvals) {
    return new cljs.core.PersistentArrayMap(null, cljs.core.quot.call(null, cljs.core.count.call(null, keyvals), 2), cljs.core.apply.call(null, cljs.core.array, keyvals), null)
  };
  var array_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return array_map__delegate.call(this, keyvals)
  };
  array_map.cljs$lang$maxFixedArity = 0;
  array_map.cljs$lang$applyTo = function(arglist__10519) {
    var keyvals = cljs.core.seq(arglist__10519);
    return array_map__delegate(keyvals)
  };
  array_map.cljs$lang$arity$variadic = array_map__delegate;
  return array_map
}();
cljs.core.obj_map = function() {
  var obj_map__delegate = function(keyvals) {
    var ks__10523 = [];
    var obj__10524 = {};
    var kvs__10525 = cljs.core.seq.call(null, keyvals);
    while(true) {
      if(kvs__10525) {
        ks__10523.push(cljs.core.first.call(null, kvs__10525));
        obj__10524[cljs.core.first.call(null, kvs__10525)] = cljs.core.second.call(null, kvs__10525);
        var G__10526 = cljs.core.nnext.call(null, kvs__10525);
        kvs__10525 = G__10526;
        continue
      }else {
        return cljs.core.ObjMap.fromObject.call(null, ks__10523, obj__10524)
      }
      break
    }
  };
  var obj_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return obj_map__delegate.call(this, keyvals)
  };
  obj_map.cljs$lang$maxFixedArity = 0;
  obj_map.cljs$lang$applyTo = function(arglist__10527) {
    var keyvals = cljs.core.seq(arglist__10527);
    return obj_map__delegate(keyvals)
  };
  obj_map.cljs$lang$arity$variadic = obj_map__delegate;
  return obj_map
}();
cljs.core.sorted_map = function() {
  var sorted_map__delegate = function(keyvals) {
    var in__10530 = cljs.core.seq.call(null, keyvals);
    var out__10531 = cljs.core.PersistentTreeMap.EMPTY;
    while(true) {
      if(in__10530) {
        var G__10532 = cljs.core.nnext.call(null, in__10530);
        var G__10533 = cljs.core.assoc.call(null, out__10531, cljs.core.first.call(null, in__10530), cljs.core.second.call(null, in__10530));
        in__10530 = G__10532;
        out__10531 = G__10533;
        continue
      }else {
        return out__10531
      }
      break
    }
  };
  var sorted_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return sorted_map__delegate.call(this, keyvals)
  };
  sorted_map.cljs$lang$maxFixedArity = 0;
  sorted_map.cljs$lang$applyTo = function(arglist__10534) {
    var keyvals = cljs.core.seq(arglist__10534);
    return sorted_map__delegate(keyvals)
  };
  sorted_map.cljs$lang$arity$variadic = sorted_map__delegate;
  return sorted_map
}();
cljs.core.sorted_map_by = function() {
  var sorted_map_by__delegate = function(comparator, keyvals) {
    var in__10537 = cljs.core.seq.call(null, keyvals);
    var out__10538 = new cljs.core.PersistentTreeMap(comparator, null, 0, null, 0);
    while(true) {
      if(in__10537) {
        var G__10539 = cljs.core.nnext.call(null, in__10537);
        var G__10540 = cljs.core.assoc.call(null, out__10538, cljs.core.first.call(null, in__10537), cljs.core.second.call(null, in__10537));
        in__10537 = G__10539;
        out__10538 = G__10540;
        continue
      }else {
        return out__10538
      }
      break
    }
  };
  var sorted_map_by = function(comparator, var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return sorted_map_by__delegate.call(this, comparator, keyvals)
  };
  sorted_map_by.cljs$lang$maxFixedArity = 1;
  sorted_map_by.cljs$lang$applyTo = function(arglist__10541) {
    var comparator = cljs.core.first(arglist__10541);
    var keyvals = cljs.core.rest(arglist__10541);
    return sorted_map_by__delegate(comparator, keyvals)
  };
  sorted_map_by.cljs$lang$arity$variadic = sorted_map_by__delegate;
  return sorted_map_by
}();
cljs.core.keys = function keys(hash_map) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.first, hash_map))
};
cljs.core.key = function key(map_entry) {
  return cljs.core._key.call(null, map_entry)
};
cljs.core.vals = function vals(hash_map) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.second, hash_map))
};
cljs.core.val = function val(map_entry) {
  return cljs.core._val.call(null, map_entry)
};
cljs.core.merge = function() {
  var merge__delegate = function(maps) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, maps))) {
      return cljs.core.reduce.call(null, function(p1__10542_SHARP_, p2__10543_SHARP_) {
        return cljs.core.conj.call(null, function() {
          var or__3824__auto____10545 = p1__10542_SHARP_;
          if(cljs.core.truth_(or__3824__auto____10545)) {
            return or__3824__auto____10545
          }else {
            return cljs.core.ObjMap.EMPTY
          }
        }(), p2__10543_SHARP_)
      }, maps)
    }else {
      return null
    }
  };
  var merge = function(var_args) {
    var maps = null;
    if(goog.isDef(var_args)) {
      maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return merge__delegate.call(this, maps)
  };
  merge.cljs$lang$maxFixedArity = 0;
  merge.cljs$lang$applyTo = function(arglist__10546) {
    var maps = cljs.core.seq(arglist__10546);
    return merge__delegate(maps)
  };
  merge.cljs$lang$arity$variadic = merge__delegate;
  return merge
}();
cljs.core.merge_with = function() {
  var merge_with__delegate = function(f, maps) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, maps))) {
      var merge_entry__10554 = function(m, e) {
        var k__10552 = cljs.core.first.call(null, e);
        var v__10553 = cljs.core.second.call(null, e);
        if(cljs.core.contains_QMARK_.call(null, m, k__10552)) {
          return cljs.core.assoc.call(null, m, k__10552, f.call(null, cljs.core._lookup.call(null, m, k__10552, null), v__10553))
        }else {
          return cljs.core.assoc.call(null, m, k__10552, v__10553)
        }
      };
      var merge2__10556 = function(m1, m2) {
        return cljs.core.reduce.call(null, merge_entry__10554, function() {
          var or__3824__auto____10555 = m1;
          if(cljs.core.truth_(or__3824__auto____10555)) {
            return or__3824__auto____10555
          }else {
            return cljs.core.ObjMap.EMPTY
          }
        }(), cljs.core.seq.call(null, m2))
      };
      return cljs.core.reduce.call(null, merge2__10556, maps)
    }else {
      return null
    }
  };
  var merge_with = function(f, var_args) {
    var maps = null;
    if(goog.isDef(var_args)) {
      maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return merge_with__delegate.call(this, f, maps)
  };
  merge_with.cljs$lang$maxFixedArity = 1;
  merge_with.cljs$lang$applyTo = function(arglist__10557) {
    var f = cljs.core.first(arglist__10557);
    var maps = cljs.core.rest(arglist__10557);
    return merge_with__delegate(f, maps)
  };
  merge_with.cljs$lang$arity$variadic = merge_with__delegate;
  return merge_with
}();
cljs.core.select_keys = function select_keys(map, keyseq) {
  var ret__10562 = cljs.core.ObjMap.EMPTY;
  var keys__10563 = cljs.core.seq.call(null, keyseq);
  while(true) {
    if(keys__10563) {
      var key__10564 = cljs.core.first.call(null, keys__10563);
      var entry__10565 = cljs.core._lookup.call(null, map, key__10564, "\ufdd0'cljs.core/not-found");
      var G__10566 = cljs.core.not_EQ_.call(null, entry__10565, "\ufdd0'cljs.core/not-found") ? cljs.core.assoc.call(null, ret__10562, key__10564, entry__10565) : ret__10562;
      var G__10567 = cljs.core.next.call(null, keys__10563);
      ret__10562 = G__10566;
      keys__10563 = G__10567;
      continue
    }else {
      return ret__10562
    }
    break
  }
};
cljs.core.PersistentHashSet = function(meta, hash_map, __hash) {
  this.meta = meta;
  this.hash_map = hash_map;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 15077647
};
cljs.core.PersistentHashSet.cljs$lang$type = true;
cljs.core.PersistentHashSet.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentHashSet")
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__10571 = this;
  return new cljs.core.TransientHashSet(cljs.core.transient$.call(null, this__10571.hash_map))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__10572 = this;
  var h__2192__auto____10573 = this__10572.__hash;
  if(!(h__2192__auto____10573 == null)) {
    return h__2192__auto____10573
  }else {
    var h__2192__auto____10574 = cljs.core.hash_iset.call(null, coll);
    this__10572.__hash = h__2192__auto____10574;
    return h__2192__auto____10574
  }
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, v) {
  var this__10575 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, v, null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, v, not_found) {
  var this__10576 = this;
  if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this__10576.hash_map, v))) {
    return v
  }else {
    return not_found
  }
};
cljs.core.PersistentHashSet.prototype.call = function() {
  var G__10597 = null;
  var G__10597__2 = function(this_sym10577, k) {
    var this__10579 = this;
    var this_sym10577__10580 = this;
    var coll__10581 = this_sym10577__10580;
    return coll__10581.cljs$core$ILookup$_lookup$arity$2(coll__10581, k)
  };
  var G__10597__3 = function(this_sym10578, k, not_found) {
    var this__10579 = this;
    var this_sym10578__10582 = this;
    var coll__10583 = this_sym10578__10582;
    return coll__10583.cljs$core$ILookup$_lookup$arity$3(coll__10583, k, not_found)
  };
  G__10597 = function(this_sym10578, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__10597__2.call(this, this_sym10578, k);
      case 3:
        return G__10597__3.call(this, this_sym10578, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__10597
}();
cljs.core.PersistentHashSet.prototype.apply = function(this_sym10569, args10570) {
  var this__10584 = this;
  return this_sym10569.call.apply(this_sym10569, [this_sym10569].concat(args10570.slice()))
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__10585 = this;
  return new cljs.core.PersistentHashSet(this__10585.meta, cljs.core.assoc.call(null, this__10585.hash_map, o, null), null)
};
cljs.core.PersistentHashSet.prototype.toString = function() {
  var this__10586 = this;
  var this__10587 = this;
  return cljs.core.pr_str.call(null, this__10587)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__10588 = this;
  return cljs.core.keys.call(null, this__10588.hash_map)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(coll, v) {
  var this__10589 = this;
  return new cljs.core.PersistentHashSet(this__10589.meta, cljs.core.dissoc.call(null, this__10589.hash_map, v), null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__10590 = this;
  return cljs.core.count.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__10591 = this;
  var and__3822__auto____10592 = cljs.core.set_QMARK_.call(null, other);
  if(and__3822__auto____10592) {
    var and__3822__auto____10593 = cljs.core.count.call(null, coll) === cljs.core.count.call(null, other);
    if(and__3822__auto____10593) {
      return cljs.core.every_QMARK_.call(null, function(p1__10568_SHARP_) {
        return cljs.core.contains_QMARK_.call(null, coll, p1__10568_SHARP_)
      }, other)
    }else {
      return and__3822__auto____10593
    }
  }else {
    return and__3822__auto____10592
  }
};
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__10594 = this;
  return new cljs.core.PersistentHashSet(meta, this__10594.hash_map, this__10594.__hash)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__10595 = this;
  return this__10595.meta
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__10596 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentHashSet.EMPTY, this__10596.meta)
};
cljs.core.PersistentHashSet;
cljs.core.PersistentHashSet.EMPTY = new cljs.core.PersistentHashSet(null, cljs.core.hash_map.call(null), 0);
cljs.core.PersistentHashSet.fromArray = function(items) {
  var len__10598 = cljs.core.count.call(null, items);
  var i__10599 = 0;
  var out__10600 = cljs.core.transient$.call(null, cljs.core.PersistentHashSet.EMPTY);
  while(true) {
    if(i__10599 < len__10598) {
      var G__10601 = i__10599 + 1;
      var G__10602 = cljs.core.conj_BANG_.call(null, out__10600, items[i__10599]);
      i__10599 = G__10601;
      out__10600 = G__10602;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__10600)
    }
    break
  }
};
cljs.core.TransientHashSet = function(transient_map) {
  this.transient_map = transient_map;
  this.cljs$lang$protocol_mask$partition0$ = 259;
  this.cljs$lang$protocol_mask$partition1$ = 34
};
cljs.core.TransientHashSet.cljs$lang$type = true;
cljs.core.TransientHashSet.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientHashSet")
};
cljs.core.TransientHashSet.prototype.call = function() {
  var G__10620 = null;
  var G__10620__2 = function(this_sym10606, k) {
    var this__10608 = this;
    var this_sym10606__10609 = this;
    var tcoll__10610 = this_sym10606__10609;
    if(cljs.core._lookup.call(null, this__10608.transient_map, k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
      return null
    }else {
      return k
    }
  };
  var G__10620__3 = function(this_sym10607, k, not_found) {
    var this__10608 = this;
    var this_sym10607__10611 = this;
    var tcoll__10612 = this_sym10607__10611;
    if(cljs.core._lookup.call(null, this__10608.transient_map, k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
      return not_found
    }else {
      return k
    }
  };
  G__10620 = function(this_sym10607, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__10620__2.call(this, this_sym10607, k);
      case 3:
        return G__10620__3.call(this, this_sym10607, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__10620
}();
cljs.core.TransientHashSet.prototype.apply = function(this_sym10604, args10605) {
  var this__10613 = this;
  return this_sym10604.call.apply(this_sym10604, [this_sym10604].concat(args10605.slice()))
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, v) {
  var this__10614 = this;
  return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll, v, null)
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, v, not_found) {
  var this__10615 = this;
  if(cljs.core._lookup.call(null, this__10615.transient_map, v, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
    return not_found
  }else {
    return v
  }
};
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function(tcoll) {
  var this__10616 = this;
  return cljs.core.count.call(null, this__10616.transient_map)
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = function(tcoll, v) {
  var this__10617 = this;
  this__10617.transient_map = cljs.core.dissoc_BANG_.call(null, this__10617.transient_map, v);
  return tcoll
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__10618 = this;
  this__10618.transient_map = cljs.core.assoc_BANG_.call(null, this__10618.transient_map, o, null);
  return tcoll
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__10619 = this;
  return new cljs.core.PersistentHashSet(null, cljs.core.persistent_BANG_.call(null, this__10619.transient_map), null)
};
cljs.core.TransientHashSet;
cljs.core.PersistentTreeSet = function(meta, tree_map, __hash) {
  this.meta = meta;
  this.tree_map = tree_map;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 417730831
};
cljs.core.PersistentTreeSet.cljs$lang$type = true;
cljs.core.PersistentTreeSet.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeSet")
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__10623 = this;
  var h__2192__auto____10624 = this__10623.__hash;
  if(!(h__2192__auto____10624 == null)) {
    return h__2192__auto____10624
  }else {
    var h__2192__auto____10625 = cljs.core.hash_iset.call(null, coll);
    this__10623.__hash = h__2192__auto____10625;
    return h__2192__auto____10625
  }
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, v) {
  var this__10626 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, v, null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, v, not_found) {
  var this__10627 = this;
  if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this__10627.tree_map, v))) {
    return v
  }else {
    return not_found
  }
};
cljs.core.PersistentTreeSet.prototype.call = function() {
  var G__10653 = null;
  var G__10653__2 = function(this_sym10628, k) {
    var this__10630 = this;
    var this_sym10628__10631 = this;
    var coll__10632 = this_sym10628__10631;
    return coll__10632.cljs$core$ILookup$_lookup$arity$2(coll__10632, k)
  };
  var G__10653__3 = function(this_sym10629, k, not_found) {
    var this__10630 = this;
    var this_sym10629__10633 = this;
    var coll__10634 = this_sym10629__10633;
    return coll__10634.cljs$core$ILookup$_lookup$arity$3(coll__10634, k, not_found)
  };
  G__10653 = function(this_sym10629, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__10653__2.call(this, this_sym10629, k);
      case 3:
        return G__10653__3.call(this, this_sym10629, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__10653
}();
cljs.core.PersistentTreeSet.prototype.apply = function(this_sym10621, args10622) {
  var this__10635 = this;
  return this_sym10621.call.apply(this_sym10621, [this_sym10621].concat(args10622.slice()))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__10636 = this;
  return new cljs.core.PersistentTreeSet(this__10636.meta, cljs.core.assoc.call(null, this__10636.tree_map, o, null), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__10637 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core.rseq.call(null, this__10637.tree_map))
};
cljs.core.PersistentTreeSet.prototype.toString = function() {
  var this__10638 = this;
  var this__10639 = this;
  return cljs.core.pr_str.call(null, this__10639)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(coll, ascending_QMARK_) {
  var this__10640 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq.call(null, this__10640.tree_map, ascending_QMARK_))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(coll, k, ascending_QMARK_) {
  var this__10641 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq_from.call(null, this__10641.tree_map, k, ascending_QMARK_))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(coll, entry) {
  var this__10642 = this;
  return entry
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = function(coll) {
  var this__10643 = this;
  return cljs.core._comparator.call(null, this__10643.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__10644 = this;
  return cljs.core.keys.call(null, this__10644.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(coll, v) {
  var this__10645 = this;
  return new cljs.core.PersistentTreeSet(this__10645.meta, cljs.core.dissoc.call(null, this__10645.tree_map, v), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__10646 = this;
  return cljs.core.count.call(null, this__10646.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__10647 = this;
  var and__3822__auto____10648 = cljs.core.set_QMARK_.call(null, other);
  if(and__3822__auto____10648) {
    var and__3822__auto____10649 = cljs.core.count.call(null, coll) === cljs.core.count.call(null, other);
    if(and__3822__auto____10649) {
      return cljs.core.every_QMARK_.call(null, function(p1__10603_SHARP_) {
        return cljs.core.contains_QMARK_.call(null, coll, p1__10603_SHARP_)
      }, other)
    }else {
      return and__3822__auto____10649
    }
  }else {
    return and__3822__auto____10648
  }
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__10650 = this;
  return new cljs.core.PersistentTreeSet(meta, this__10650.tree_map, this__10650.__hash)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__10651 = this;
  return this__10651.meta
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__10652 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeSet.EMPTY, this__10652.meta)
};
cljs.core.PersistentTreeSet;
cljs.core.PersistentTreeSet.EMPTY = new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map.call(null), 0);
cljs.core.hash_set = function() {
  var hash_set = null;
  var hash_set__0 = function() {
    return cljs.core.PersistentHashSet.EMPTY
  };
  var hash_set__1 = function() {
    var G__10658__delegate = function(keys) {
      var in__10656 = cljs.core.seq.call(null, keys);
      var out__10657 = cljs.core.transient$.call(null, cljs.core.PersistentHashSet.EMPTY);
      while(true) {
        if(cljs.core.seq.call(null, in__10656)) {
          var G__10659 = cljs.core.next.call(null, in__10656);
          var G__10660 = cljs.core.conj_BANG_.call(null, out__10657, cljs.core.first.call(null, in__10656));
          in__10656 = G__10659;
          out__10657 = G__10660;
          continue
        }else {
          return cljs.core.persistent_BANG_.call(null, out__10657)
        }
        break
      }
    };
    var G__10658 = function(var_args) {
      var keys = null;
      if(goog.isDef(var_args)) {
        keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__10658__delegate.call(this, keys)
    };
    G__10658.cljs$lang$maxFixedArity = 0;
    G__10658.cljs$lang$applyTo = function(arglist__10661) {
      var keys = cljs.core.seq(arglist__10661);
      return G__10658__delegate(keys)
    };
    G__10658.cljs$lang$arity$variadic = G__10658__delegate;
    return G__10658
  }();
  hash_set = function(var_args) {
    var keys = var_args;
    switch(arguments.length) {
      case 0:
        return hash_set__0.call(this);
      default:
        return hash_set__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw"Invalid arity: " + arguments.length;
  };
  hash_set.cljs$lang$maxFixedArity = 0;
  hash_set.cljs$lang$applyTo = hash_set__1.cljs$lang$applyTo;
  hash_set.cljs$lang$arity$0 = hash_set__0;
  hash_set.cljs$lang$arity$variadic = hash_set__1.cljs$lang$arity$variadic;
  return hash_set
}();
cljs.core.set = function set(coll) {
  return cljs.core.apply.call(null, cljs.core.hash_set, coll)
};
cljs.core.sorted_set = function() {
  var sorted_set__delegate = function(keys) {
    return cljs.core.reduce.call(null, cljs.core._conj, cljs.core.PersistentTreeSet.EMPTY, keys)
  };
  var sorted_set = function(var_args) {
    var keys = null;
    if(goog.isDef(var_args)) {
      keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return sorted_set__delegate.call(this, keys)
  };
  sorted_set.cljs$lang$maxFixedArity = 0;
  sorted_set.cljs$lang$applyTo = function(arglist__10662) {
    var keys = cljs.core.seq(arglist__10662);
    return sorted_set__delegate(keys)
  };
  sorted_set.cljs$lang$arity$variadic = sorted_set__delegate;
  return sorted_set
}();
cljs.core.sorted_set_by = function() {
  var sorted_set_by__delegate = function(comparator, keys) {
    return cljs.core.reduce.call(null, cljs.core._conj, new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map_by.call(null, comparator), 0), keys)
  };
  var sorted_set_by = function(comparator, var_args) {
    var keys = null;
    if(goog.isDef(var_args)) {
      keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return sorted_set_by__delegate.call(this, comparator, keys)
  };
  sorted_set_by.cljs$lang$maxFixedArity = 1;
  sorted_set_by.cljs$lang$applyTo = function(arglist__10664) {
    var comparator = cljs.core.first(arglist__10664);
    var keys = cljs.core.rest(arglist__10664);
    return sorted_set_by__delegate(comparator, keys)
  };
  sorted_set_by.cljs$lang$arity$variadic = sorted_set_by__delegate;
  return sorted_set_by
}();
cljs.core.replace = function replace(smap, coll) {
  if(cljs.core.vector_QMARK_.call(null, coll)) {
    var n__10670 = cljs.core.count.call(null, coll);
    return cljs.core.reduce.call(null, function(v, i) {
      var temp__3971__auto____10671 = cljs.core.find.call(null, smap, cljs.core.nth.call(null, v, i));
      if(cljs.core.truth_(temp__3971__auto____10671)) {
        var e__10672 = temp__3971__auto____10671;
        return cljs.core.assoc.call(null, v, i, cljs.core.second.call(null, e__10672))
      }else {
        return v
      }
    }, coll, cljs.core.take.call(null, n__10670, cljs.core.iterate.call(null, cljs.core.inc, 0)))
  }else {
    return cljs.core.map.call(null, function(p1__10663_SHARP_) {
      var temp__3971__auto____10673 = cljs.core.find.call(null, smap, p1__10663_SHARP_);
      if(cljs.core.truth_(temp__3971__auto____10673)) {
        var e__10674 = temp__3971__auto____10673;
        return cljs.core.second.call(null, e__10674)
      }else {
        return p1__10663_SHARP_
      }
    }, coll)
  }
};
cljs.core.distinct = function distinct(coll) {
  var step__10704 = function step(xs, seen) {
    return new cljs.core.LazySeq(null, false, function() {
      return function(p__10697, seen) {
        while(true) {
          var vec__10698__10699 = p__10697;
          var f__10700 = cljs.core.nth.call(null, vec__10698__10699, 0, null);
          var xs__10701 = vec__10698__10699;
          var temp__3974__auto____10702 = cljs.core.seq.call(null, xs__10701);
          if(temp__3974__auto____10702) {
            var s__10703 = temp__3974__auto____10702;
            if(cljs.core.contains_QMARK_.call(null, seen, f__10700)) {
              var G__10705 = cljs.core.rest.call(null, s__10703);
              var G__10706 = seen;
              p__10697 = G__10705;
              seen = G__10706;
              continue
            }else {
              return cljs.core.cons.call(null, f__10700, step.call(null, cljs.core.rest.call(null, s__10703), cljs.core.conj.call(null, seen, f__10700)))
            }
          }else {
            return null
          }
          break
        }
      }.call(null, xs, seen)
    }, null)
  };
  return step__10704.call(null, coll, cljs.core.PersistentHashSet.EMPTY)
};
cljs.core.butlast = function butlast(s) {
  var ret__10709 = cljs.core.PersistentVector.EMPTY;
  var s__10710 = s;
  while(true) {
    if(cljs.core.next.call(null, s__10710)) {
      var G__10711 = cljs.core.conj.call(null, ret__10709, cljs.core.first.call(null, s__10710));
      var G__10712 = cljs.core.next.call(null, s__10710);
      ret__10709 = G__10711;
      s__10710 = G__10712;
      continue
    }else {
      return cljs.core.seq.call(null, ret__10709)
    }
    break
  }
};
cljs.core.name = function name(x) {
  if(cljs.core.string_QMARK_.call(null, x)) {
    return x
  }else {
    if(function() {
      var or__3824__auto____10715 = cljs.core.keyword_QMARK_.call(null, x);
      if(or__3824__auto____10715) {
        return or__3824__auto____10715
      }else {
        return cljs.core.symbol_QMARK_.call(null, x)
      }
    }()) {
      var i__10716 = x.lastIndexOf("/");
      if(i__10716 < 0) {
        return cljs.core.subs.call(null, x, 2)
      }else {
        return cljs.core.subs.call(null, x, i__10716 + 1)
      }
    }else {
      if("\ufdd0'else") {
        throw new Error([cljs.core.str("Doesn't support name: "), cljs.core.str(x)].join(""));
      }else {
        return null
      }
    }
  }
};
cljs.core.namespace = function namespace(x) {
  if(function() {
    var or__3824__auto____10719 = cljs.core.keyword_QMARK_.call(null, x);
    if(or__3824__auto____10719) {
      return or__3824__auto____10719
    }else {
      return cljs.core.symbol_QMARK_.call(null, x)
    }
  }()) {
    var i__10720 = x.lastIndexOf("/");
    if(i__10720 > -1) {
      return cljs.core.subs.call(null, x, 2, i__10720)
    }else {
      return null
    }
  }else {
    throw new Error([cljs.core.str("Doesn't support namespace: "), cljs.core.str(x)].join(""));
  }
};
cljs.core.zipmap = function zipmap(keys, vals) {
  var map__10727 = cljs.core.ObjMap.EMPTY;
  var ks__10728 = cljs.core.seq.call(null, keys);
  var vs__10729 = cljs.core.seq.call(null, vals);
  while(true) {
    if(function() {
      var and__3822__auto____10730 = ks__10728;
      if(and__3822__auto____10730) {
        return vs__10729
      }else {
        return and__3822__auto____10730
      }
    }()) {
      var G__10731 = cljs.core.assoc.call(null, map__10727, cljs.core.first.call(null, ks__10728), cljs.core.first.call(null, vs__10729));
      var G__10732 = cljs.core.next.call(null, ks__10728);
      var G__10733 = cljs.core.next.call(null, vs__10729);
      map__10727 = G__10731;
      ks__10728 = G__10732;
      vs__10729 = G__10733;
      continue
    }else {
      return map__10727
    }
    break
  }
};
cljs.core.max_key = function() {
  var max_key = null;
  var max_key__2 = function(k, x) {
    return x
  };
  var max_key__3 = function(k, x, y) {
    if(k.call(null, x) > k.call(null, y)) {
      return x
    }else {
      return y
    }
  };
  var max_key__4 = function() {
    var G__10736__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__10721_SHARP_, p2__10722_SHARP_) {
        return max_key.call(null, k, p1__10721_SHARP_, p2__10722_SHARP_)
      }, max_key.call(null, k, x, y), more)
    };
    var G__10736 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__10736__delegate.call(this, k, x, y, more)
    };
    G__10736.cljs$lang$maxFixedArity = 3;
    G__10736.cljs$lang$applyTo = function(arglist__10737) {
      var k = cljs.core.first(arglist__10737);
      var x = cljs.core.first(cljs.core.next(arglist__10737));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10737)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10737)));
      return G__10736__delegate(k, x, y, more)
    };
    G__10736.cljs$lang$arity$variadic = G__10736__delegate;
    return G__10736
  }();
  max_key = function(k, x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return max_key__2.call(this, k, x);
      case 3:
        return max_key__3.call(this, k, x, y);
      default:
        return max_key__4.cljs$lang$arity$variadic(k, x, y, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  max_key.cljs$lang$maxFixedArity = 3;
  max_key.cljs$lang$applyTo = max_key__4.cljs$lang$applyTo;
  max_key.cljs$lang$arity$2 = max_key__2;
  max_key.cljs$lang$arity$3 = max_key__3;
  max_key.cljs$lang$arity$variadic = max_key__4.cljs$lang$arity$variadic;
  return max_key
}();
cljs.core.min_key = function() {
  var min_key = null;
  var min_key__2 = function(k, x) {
    return x
  };
  var min_key__3 = function(k, x, y) {
    if(k.call(null, x) < k.call(null, y)) {
      return x
    }else {
      return y
    }
  };
  var min_key__4 = function() {
    var G__10738__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__10734_SHARP_, p2__10735_SHARP_) {
        return min_key.call(null, k, p1__10734_SHARP_, p2__10735_SHARP_)
      }, min_key.call(null, k, x, y), more)
    };
    var G__10738 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__10738__delegate.call(this, k, x, y, more)
    };
    G__10738.cljs$lang$maxFixedArity = 3;
    G__10738.cljs$lang$applyTo = function(arglist__10739) {
      var k = cljs.core.first(arglist__10739);
      var x = cljs.core.first(cljs.core.next(arglist__10739));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10739)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10739)));
      return G__10738__delegate(k, x, y, more)
    };
    G__10738.cljs$lang$arity$variadic = G__10738__delegate;
    return G__10738
  }();
  min_key = function(k, x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return min_key__2.call(this, k, x);
      case 3:
        return min_key__3.call(this, k, x, y);
      default:
        return min_key__4.cljs$lang$arity$variadic(k, x, y, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  min_key.cljs$lang$maxFixedArity = 3;
  min_key.cljs$lang$applyTo = min_key__4.cljs$lang$applyTo;
  min_key.cljs$lang$arity$2 = min_key__2;
  min_key.cljs$lang$arity$3 = min_key__3;
  min_key.cljs$lang$arity$variadic = min_key__4.cljs$lang$arity$variadic;
  return min_key
}();
cljs.core.partition_all = function() {
  var partition_all = null;
  var partition_all__2 = function(n, coll) {
    return partition_all.call(null, n, n, coll)
  };
  var partition_all__3 = function(n, step, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____10742 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____10742) {
        var s__10743 = temp__3974__auto____10742;
        return cljs.core.cons.call(null, cljs.core.take.call(null, n, s__10743), partition_all.call(null, n, step, cljs.core.drop.call(null, step, s__10743)))
      }else {
        return null
      }
    }, null)
  };
  partition_all = function(n, step, coll) {
    switch(arguments.length) {
      case 2:
        return partition_all__2.call(this, n, step);
      case 3:
        return partition_all__3.call(this, n, step, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  partition_all.cljs$lang$arity$2 = partition_all__2;
  partition_all.cljs$lang$arity$3 = partition_all__3;
  return partition_all
}();
cljs.core.take_while = function take_while(pred, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____10746 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____10746) {
      var s__10747 = temp__3974__auto____10746;
      if(cljs.core.truth_(pred.call(null, cljs.core.first.call(null, s__10747)))) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__10747), take_while.call(null, pred, cljs.core.rest.call(null, s__10747)))
      }else {
        return null
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.mk_bound_fn = function mk_bound_fn(sc, test, key) {
  return function(e) {
    var comp__10749 = cljs.core._comparator.call(null, sc);
    return test.call(null, comp__10749.call(null, cljs.core._entry_key.call(null, sc, e), key), 0)
  }
};
cljs.core.subseq = function() {
  var subseq = null;
  var subseq__3 = function(sc, test, key) {
    var include__10761 = cljs.core.mk_bound_fn.call(null, sc, test, key);
    if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_, cljs.core._GT__EQ_]).call(null, test))) {
      var temp__3974__auto____10762 = cljs.core._sorted_seq_from.call(null, sc, key, true);
      if(cljs.core.truth_(temp__3974__auto____10762)) {
        var vec__10763__10764 = temp__3974__auto____10762;
        var e__10765 = cljs.core.nth.call(null, vec__10763__10764, 0, null);
        var s__10766 = vec__10763__10764;
        if(cljs.core.truth_(include__10761.call(null, e__10765))) {
          return s__10766
        }else {
          return cljs.core.next.call(null, s__10766)
        }
      }else {
        return null
      }
    }else {
      return cljs.core.take_while.call(null, include__10761, cljs.core._sorted_seq.call(null, sc, true))
    }
  };
  var subseq__5 = function(sc, start_test, start_key, end_test, end_key) {
    var temp__3974__auto____10767 = cljs.core._sorted_seq_from.call(null, sc, start_key, true);
    if(cljs.core.truth_(temp__3974__auto____10767)) {
      var vec__10768__10769 = temp__3974__auto____10767;
      var e__10770 = cljs.core.nth.call(null, vec__10768__10769, 0, null);
      var s__10771 = vec__10768__10769;
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, sc, end_test, end_key), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, sc, start_test, start_key).call(null, e__10770)) ? s__10771 : cljs.core.next.call(null, s__10771))
    }else {
      return null
    }
  };
  subseq = function(sc, start_test, start_key, end_test, end_key) {
    switch(arguments.length) {
      case 3:
        return subseq__3.call(this, sc, start_test, start_key);
      case 5:
        return subseq__5.call(this, sc, start_test, start_key, end_test, end_key)
    }
    throw"Invalid arity: " + arguments.length;
  };
  subseq.cljs$lang$arity$3 = subseq__3;
  subseq.cljs$lang$arity$5 = subseq__5;
  return subseq
}();
cljs.core.rsubseq = function() {
  var rsubseq = null;
  var rsubseq__3 = function(sc, test, key) {
    var include__10783 = cljs.core.mk_bound_fn.call(null, sc, test, key);
    if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_, cljs.core._LT__EQ_]).call(null, test))) {
      var temp__3974__auto____10784 = cljs.core._sorted_seq_from.call(null, sc, key, false);
      if(cljs.core.truth_(temp__3974__auto____10784)) {
        var vec__10785__10786 = temp__3974__auto____10784;
        var e__10787 = cljs.core.nth.call(null, vec__10785__10786, 0, null);
        var s__10788 = vec__10785__10786;
        if(cljs.core.truth_(include__10783.call(null, e__10787))) {
          return s__10788
        }else {
          return cljs.core.next.call(null, s__10788)
        }
      }else {
        return null
      }
    }else {
      return cljs.core.take_while.call(null, include__10783, cljs.core._sorted_seq.call(null, sc, false))
    }
  };
  var rsubseq__5 = function(sc, start_test, start_key, end_test, end_key) {
    var temp__3974__auto____10789 = cljs.core._sorted_seq_from.call(null, sc, end_key, false);
    if(cljs.core.truth_(temp__3974__auto____10789)) {
      var vec__10790__10791 = temp__3974__auto____10789;
      var e__10792 = cljs.core.nth.call(null, vec__10790__10791, 0, null);
      var s__10793 = vec__10790__10791;
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, sc, start_test, start_key), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, sc, end_test, end_key).call(null, e__10792)) ? s__10793 : cljs.core.next.call(null, s__10793))
    }else {
      return null
    }
  };
  rsubseq = function(sc, start_test, start_key, end_test, end_key) {
    switch(arguments.length) {
      case 3:
        return rsubseq__3.call(this, sc, start_test, start_key);
      case 5:
        return rsubseq__5.call(this, sc, start_test, start_key, end_test, end_key)
    }
    throw"Invalid arity: " + arguments.length;
  };
  rsubseq.cljs$lang$arity$3 = rsubseq__3;
  rsubseq.cljs$lang$arity$5 = rsubseq__5;
  return rsubseq
}();
cljs.core.Range = function(meta, start, end, step, __hash) {
  this.meta = meta;
  this.start = start;
  this.end = end;
  this.step = step;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32375006
};
cljs.core.Range.cljs$lang$type = true;
cljs.core.Range.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Range")
};
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = function(rng) {
  var this__10794 = this;
  var h__2192__auto____10795 = this__10794.__hash;
  if(!(h__2192__auto____10795 == null)) {
    return h__2192__auto____10795
  }else {
    var h__2192__auto____10796 = cljs.core.hash_coll.call(null, rng);
    this__10794.__hash = h__2192__auto____10796;
    return h__2192__auto____10796
  }
};
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = function(rng) {
  var this__10797 = this;
  if(this__10797.step > 0) {
    if(this__10797.start + this__10797.step < this__10797.end) {
      return new cljs.core.Range(this__10797.meta, this__10797.start + this__10797.step, this__10797.end, this__10797.step, null)
    }else {
      return null
    }
  }else {
    if(this__10797.start + this__10797.step > this__10797.end) {
      return new cljs.core.Range(this__10797.meta, this__10797.start + this__10797.step, this__10797.end, this__10797.step, null)
    }else {
      return null
    }
  }
};
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = function(rng, o) {
  var this__10798 = this;
  return cljs.core.cons.call(null, o, rng)
};
cljs.core.Range.prototype.toString = function() {
  var this__10799 = this;
  var this__10800 = this;
  return cljs.core.pr_str.call(null, this__10800)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = function(rng, f) {
  var this__10801 = this;
  return cljs.core.ci_reduce.call(null, rng, f)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = function(rng, f, s) {
  var this__10802 = this;
  return cljs.core.ci_reduce.call(null, rng, f, s)
};
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = function(rng) {
  var this__10803 = this;
  if(this__10803.step > 0) {
    if(this__10803.start < this__10803.end) {
      return rng
    }else {
      return null
    }
  }else {
    if(this__10803.start > this__10803.end) {
      return rng
    }else {
      return null
    }
  }
};
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = function(rng) {
  var this__10804 = this;
  if(cljs.core.not.call(null, rng.cljs$core$ISeqable$_seq$arity$1(rng))) {
    return 0
  }else {
    return Math.ceil((this__10804.end - this__10804.start) / this__10804.step)
  }
};
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = function(rng) {
  var this__10805 = this;
  return this__10805.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = function(rng) {
  var this__10806 = this;
  if(!(rng.cljs$core$ISeqable$_seq$arity$1(rng) == null)) {
    return new cljs.core.Range(this__10806.meta, this__10806.start + this__10806.step, this__10806.end, this__10806.step, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(rng, other) {
  var this__10807 = this;
  return cljs.core.equiv_sequential.call(null, rng, other)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(rng, meta) {
  var this__10808 = this;
  return new cljs.core.Range(meta, this__10808.start, this__10808.end, this__10808.step, this__10808.__hash)
};
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = function(rng) {
  var this__10809 = this;
  return this__10809.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = function(rng, n) {
  var this__10810 = this;
  if(n < rng.cljs$core$ICounted$_count$arity$1(rng)) {
    return this__10810.start + n * this__10810.step
  }else {
    if(function() {
      var and__3822__auto____10811 = this__10810.start > this__10810.end;
      if(and__3822__auto____10811) {
        return this__10810.step === 0
      }else {
        return and__3822__auto____10811
      }
    }()) {
      return this__10810.start
    }else {
      throw new Error("Index out of bounds");
    }
  }
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = function(rng, n, not_found) {
  var this__10812 = this;
  if(n < rng.cljs$core$ICounted$_count$arity$1(rng)) {
    return this__10812.start + n * this__10812.step
  }else {
    if(function() {
      var and__3822__auto____10813 = this__10812.start > this__10812.end;
      if(and__3822__auto____10813) {
        return this__10812.step === 0
      }else {
        return and__3822__auto____10813
      }
    }()) {
      return this__10812.start
    }else {
      return not_found
    }
  }
};
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(rng) {
  var this__10814 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__10814.meta)
};
cljs.core.Range;
cljs.core.range = function() {
  var range = null;
  var range__0 = function() {
    return range.call(null, 0, Number.MAX_VALUE, 1)
  };
  var range__1 = function(end) {
    return range.call(null, 0, end, 1)
  };
  var range__2 = function(start, end) {
    return range.call(null, start, end, 1)
  };
  var range__3 = function(start, end, step) {
    return new cljs.core.Range(null, start, end, step, null)
  };
  range = function(start, end, step) {
    switch(arguments.length) {
      case 0:
        return range__0.call(this);
      case 1:
        return range__1.call(this, start);
      case 2:
        return range__2.call(this, start, end);
      case 3:
        return range__3.call(this, start, end, step)
    }
    throw"Invalid arity: " + arguments.length;
  };
  range.cljs$lang$arity$0 = range__0;
  range.cljs$lang$arity$1 = range__1;
  range.cljs$lang$arity$2 = range__2;
  range.cljs$lang$arity$3 = range__3;
  return range
}();
cljs.core.take_nth = function take_nth(n, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____10817 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____10817) {
      var s__10818 = temp__3974__auto____10817;
      return cljs.core.cons.call(null, cljs.core.first.call(null, s__10818), take_nth.call(null, n, cljs.core.drop.call(null, n, s__10818)))
    }else {
      return null
    }
  }, null)
};
cljs.core.split_with = function split_with(pred, coll) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take_while.call(null, pred, coll), cljs.core.drop_while.call(null, pred, coll)], true)
};
cljs.core.partition_by = function partition_by(f, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____10825 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____10825) {
      var s__10826 = temp__3974__auto____10825;
      var fst__10827 = cljs.core.first.call(null, s__10826);
      var fv__10828 = f.call(null, fst__10827);
      var run__10829 = cljs.core.cons.call(null, fst__10827, cljs.core.take_while.call(null, function(p1__10819_SHARP_) {
        return cljs.core._EQ_.call(null, fv__10828, f.call(null, p1__10819_SHARP_))
      }, cljs.core.next.call(null, s__10826)));
      return cljs.core.cons.call(null, run__10829, partition_by.call(null, f, cljs.core.seq.call(null, cljs.core.drop.call(null, cljs.core.count.call(null, run__10829), s__10826))))
    }else {
      return null
    }
  }, null)
};
cljs.core.frequencies = function frequencies(coll) {
  return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(counts, x) {
    return cljs.core.assoc_BANG_.call(null, counts, x, cljs.core._lookup.call(null, counts, x, 0) + 1)
  }, cljs.core.transient$.call(null, cljs.core.ObjMap.EMPTY), coll))
};
cljs.core.reductions = function() {
  var reductions = null;
  var reductions__2 = function(f, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3971__auto____10844 = cljs.core.seq.call(null, coll);
      if(temp__3971__auto____10844) {
        var s__10845 = temp__3971__auto____10844;
        return reductions.call(null, f, cljs.core.first.call(null, s__10845), cljs.core.rest.call(null, s__10845))
      }else {
        return cljs.core.list.call(null, f.call(null))
      }
    }, null)
  };
  var reductions__3 = function(f, init, coll) {
    return cljs.core.cons.call(null, init, new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____10846 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____10846) {
        var s__10847 = temp__3974__auto____10846;
        return reductions.call(null, f, f.call(null, init, cljs.core.first.call(null, s__10847)), cljs.core.rest.call(null, s__10847))
      }else {
        return null
      }
    }, null))
  };
  reductions = function(f, init, coll) {
    switch(arguments.length) {
      case 2:
        return reductions__2.call(this, f, init);
      case 3:
        return reductions__3.call(this, f, init, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  reductions.cljs$lang$arity$2 = reductions__2;
  reductions.cljs$lang$arity$3 = reductions__3;
  return reductions
}();
cljs.core.juxt = function() {
  var juxt = null;
  var juxt__1 = function(f) {
    return function() {
      var G__10850 = null;
      var G__10850__0 = function() {
        return cljs.core.vector.call(null, f.call(null))
      };
      var G__10850__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x))
      };
      var G__10850__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y))
      };
      var G__10850__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z))
      };
      var G__10850__4 = function() {
        var G__10851__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args))
        };
        var G__10851 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__10851__delegate.call(this, x, y, z, args)
        };
        G__10851.cljs$lang$maxFixedArity = 3;
        G__10851.cljs$lang$applyTo = function(arglist__10852) {
          var x = cljs.core.first(arglist__10852);
          var y = cljs.core.first(cljs.core.next(arglist__10852));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10852)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10852)));
          return G__10851__delegate(x, y, z, args)
        };
        G__10851.cljs$lang$arity$variadic = G__10851__delegate;
        return G__10851
      }();
      G__10850 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__10850__0.call(this);
          case 1:
            return G__10850__1.call(this, x);
          case 2:
            return G__10850__2.call(this, x, y);
          case 3:
            return G__10850__3.call(this, x, y, z);
          default:
            return G__10850__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__10850.cljs$lang$maxFixedArity = 3;
      G__10850.cljs$lang$applyTo = G__10850__4.cljs$lang$applyTo;
      return G__10850
    }()
  };
  var juxt__2 = function(f, g) {
    return function() {
      var G__10853 = null;
      var G__10853__0 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null))
      };
      var G__10853__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x))
      };
      var G__10853__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y))
      };
      var G__10853__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z))
      };
      var G__10853__4 = function() {
        var G__10854__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__10854 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__10854__delegate.call(this, x, y, z, args)
        };
        G__10854.cljs$lang$maxFixedArity = 3;
        G__10854.cljs$lang$applyTo = function(arglist__10855) {
          var x = cljs.core.first(arglist__10855);
          var y = cljs.core.first(cljs.core.next(arglist__10855));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10855)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10855)));
          return G__10854__delegate(x, y, z, args)
        };
        G__10854.cljs$lang$arity$variadic = G__10854__delegate;
        return G__10854
      }();
      G__10853 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__10853__0.call(this);
          case 1:
            return G__10853__1.call(this, x);
          case 2:
            return G__10853__2.call(this, x, y);
          case 3:
            return G__10853__3.call(this, x, y, z);
          default:
            return G__10853__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__10853.cljs$lang$maxFixedArity = 3;
      G__10853.cljs$lang$applyTo = G__10853__4.cljs$lang$applyTo;
      return G__10853
    }()
  };
  var juxt__3 = function(f, g, h) {
    return function() {
      var G__10856 = null;
      var G__10856__0 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null), h.call(null))
      };
      var G__10856__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x), h.call(null, x))
      };
      var G__10856__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y), h.call(null, x, y))
      };
      var G__10856__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z), h.call(null, x, y, z))
      };
      var G__10856__4 = function() {
        var G__10857__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args), cljs.core.apply.call(null, h, x, y, z, args))
        };
        var G__10857 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__10857__delegate.call(this, x, y, z, args)
        };
        G__10857.cljs$lang$maxFixedArity = 3;
        G__10857.cljs$lang$applyTo = function(arglist__10858) {
          var x = cljs.core.first(arglist__10858);
          var y = cljs.core.first(cljs.core.next(arglist__10858));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10858)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10858)));
          return G__10857__delegate(x, y, z, args)
        };
        G__10857.cljs$lang$arity$variadic = G__10857__delegate;
        return G__10857
      }();
      G__10856 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__10856__0.call(this);
          case 1:
            return G__10856__1.call(this, x);
          case 2:
            return G__10856__2.call(this, x, y);
          case 3:
            return G__10856__3.call(this, x, y, z);
          default:
            return G__10856__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__10856.cljs$lang$maxFixedArity = 3;
      G__10856.cljs$lang$applyTo = G__10856__4.cljs$lang$applyTo;
      return G__10856
    }()
  };
  var juxt__4 = function() {
    var G__10859__delegate = function(f, g, h, fs) {
      var fs__10849 = cljs.core.list_STAR_.call(null, f, g, h, fs);
      return function() {
        var G__10860 = null;
        var G__10860__0 = function() {
          return cljs.core.reduce.call(null, function(p1__10830_SHARP_, p2__10831_SHARP_) {
            return cljs.core.conj.call(null, p1__10830_SHARP_, p2__10831_SHARP_.call(null))
          }, cljs.core.PersistentVector.EMPTY, fs__10849)
        };
        var G__10860__1 = function(x) {
          return cljs.core.reduce.call(null, function(p1__10832_SHARP_, p2__10833_SHARP_) {
            return cljs.core.conj.call(null, p1__10832_SHARP_, p2__10833_SHARP_.call(null, x))
          }, cljs.core.PersistentVector.EMPTY, fs__10849)
        };
        var G__10860__2 = function(x, y) {
          return cljs.core.reduce.call(null, function(p1__10834_SHARP_, p2__10835_SHARP_) {
            return cljs.core.conj.call(null, p1__10834_SHARP_, p2__10835_SHARP_.call(null, x, y))
          }, cljs.core.PersistentVector.EMPTY, fs__10849)
        };
        var G__10860__3 = function(x, y, z) {
          return cljs.core.reduce.call(null, function(p1__10836_SHARP_, p2__10837_SHARP_) {
            return cljs.core.conj.call(null, p1__10836_SHARP_, p2__10837_SHARP_.call(null, x, y, z))
          }, cljs.core.PersistentVector.EMPTY, fs__10849)
        };
        var G__10860__4 = function() {
          var G__10861__delegate = function(x, y, z, args) {
            return cljs.core.reduce.call(null, function(p1__10838_SHARP_, p2__10839_SHARP_) {
              return cljs.core.conj.call(null, p1__10838_SHARP_, cljs.core.apply.call(null, p2__10839_SHARP_, x, y, z, args))
            }, cljs.core.PersistentVector.EMPTY, fs__10849)
          };
          var G__10861 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__10861__delegate.call(this, x, y, z, args)
          };
          G__10861.cljs$lang$maxFixedArity = 3;
          G__10861.cljs$lang$applyTo = function(arglist__10862) {
            var x = cljs.core.first(arglist__10862);
            var y = cljs.core.first(cljs.core.next(arglist__10862));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10862)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10862)));
            return G__10861__delegate(x, y, z, args)
          };
          G__10861.cljs$lang$arity$variadic = G__10861__delegate;
          return G__10861
        }();
        G__10860 = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return G__10860__0.call(this);
            case 1:
              return G__10860__1.call(this, x);
            case 2:
              return G__10860__2.call(this, x, y);
            case 3:
              return G__10860__3.call(this, x, y, z);
            default:
              return G__10860__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
          }
          throw"Invalid arity: " + arguments.length;
        };
        G__10860.cljs$lang$maxFixedArity = 3;
        G__10860.cljs$lang$applyTo = G__10860__4.cljs$lang$applyTo;
        return G__10860
      }()
    };
    var G__10859 = function(f, g, h, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__10859__delegate.call(this, f, g, h, fs)
    };
    G__10859.cljs$lang$maxFixedArity = 3;
    G__10859.cljs$lang$applyTo = function(arglist__10863) {
      var f = cljs.core.first(arglist__10863);
      var g = cljs.core.first(cljs.core.next(arglist__10863));
      var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10863)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10863)));
      return G__10859__delegate(f, g, h, fs)
    };
    G__10859.cljs$lang$arity$variadic = G__10859__delegate;
    return G__10859
  }();
  juxt = function(f, g, h, var_args) {
    var fs = var_args;
    switch(arguments.length) {
      case 1:
        return juxt__1.call(this, f);
      case 2:
        return juxt__2.call(this, f, g);
      case 3:
        return juxt__3.call(this, f, g, h);
      default:
        return juxt__4.cljs$lang$arity$variadic(f, g, h, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  juxt.cljs$lang$maxFixedArity = 3;
  juxt.cljs$lang$applyTo = juxt__4.cljs$lang$applyTo;
  juxt.cljs$lang$arity$1 = juxt__1;
  juxt.cljs$lang$arity$2 = juxt__2;
  juxt.cljs$lang$arity$3 = juxt__3;
  juxt.cljs$lang$arity$variadic = juxt__4.cljs$lang$arity$variadic;
  return juxt
}();
cljs.core.dorun = function() {
  var dorun = null;
  var dorun__1 = function(coll) {
    while(true) {
      if(cljs.core.seq.call(null, coll)) {
        var G__10866 = cljs.core.next.call(null, coll);
        coll = G__10866;
        continue
      }else {
        return null
      }
      break
    }
  };
  var dorun__2 = function(n, coll) {
    while(true) {
      if(cljs.core.truth_(function() {
        var and__3822__auto____10865 = cljs.core.seq.call(null, coll);
        if(and__3822__auto____10865) {
          return n > 0
        }else {
          return and__3822__auto____10865
        }
      }())) {
        var G__10867 = n - 1;
        var G__10868 = cljs.core.next.call(null, coll);
        n = G__10867;
        coll = G__10868;
        continue
      }else {
        return null
      }
      break
    }
  };
  dorun = function(n, coll) {
    switch(arguments.length) {
      case 1:
        return dorun__1.call(this, n);
      case 2:
        return dorun__2.call(this, n, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  dorun.cljs$lang$arity$1 = dorun__1;
  dorun.cljs$lang$arity$2 = dorun__2;
  return dorun
}();
cljs.core.doall = function() {
  var doall = null;
  var doall__1 = function(coll) {
    cljs.core.dorun.call(null, coll);
    return coll
  };
  var doall__2 = function(n, coll) {
    cljs.core.dorun.call(null, n, coll);
    return coll
  };
  doall = function(n, coll) {
    switch(arguments.length) {
      case 1:
        return doall__1.call(this, n);
      case 2:
        return doall__2.call(this, n, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  doall.cljs$lang$arity$1 = doall__1;
  doall.cljs$lang$arity$2 = doall__2;
  return doall
}();
cljs.core.regexp_QMARK_ = function regexp_QMARK_(o) {
  return o instanceof RegExp
};
cljs.core.re_matches = function re_matches(re, s) {
  var matches__10870 = re.exec(s);
  if(cljs.core._EQ_.call(null, cljs.core.first.call(null, matches__10870), s)) {
    if(cljs.core.count.call(null, matches__10870) === 1) {
      return cljs.core.first.call(null, matches__10870)
    }else {
      return cljs.core.vec.call(null, matches__10870)
    }
  }else {
    return null
  }
};
cljs.core.re_find = function re_find(re, s) {
  var matches__10872 = re.exec(s);
  if(matches__10872 == null) {
    return null
  }else {
    if(cljs.core.count.call(null, matches__10872) === 1) {
      return cljs.core.first.call(null, matches__10872)
    }else {
      return cljs.core.vec.call(null, matches__10872)
    }
  }
};
cljs.core.re_seq = function re_seq(re, s) {
  var match_data__10877 = cljs.core.re_find.call(null, re, s);
  var match_idx__10878 = s.search(re);
  var match_str__10879 = cljs.core.coll_QMARK_.call(null, match_data__10877) ? cljs.core.first.call(null, match_data__10877) : match_data__10877;
  var post_match__10880 = cljs.core.subs.call(null, s, match_idx__10878 + cljs.core.count.call(null, match_str__10879));
  if(cljs.core.truth_(match_data__10877)) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, match_data__10877, re_seq.call(null, re, post_match__10880))
    }, null)
  }else {
    return null
  }
};
cljs.core.re_pattern = function re_pattern(s) {
  var vec__10887__10888 = cljs.core.re_find.call(null, /^(?:\(\?([idmsux]*)\))?(.*)/, s);
  var ___10889 = cljs.core.nth.call(null, vec__10887__10888, 0, null);
  var flags__10890 = cljs.core.nth.call(null, vec__10887__10888, 1, null);
  var pattern__10891 = cljs.core.nth.call(null, vec__10887__10888, 2, null);
  return new RegExp(pattern__10891, flags__10890)
};
cljs.core.pr_sequential = function pr_sequential(print_one, begin, sep, end, opts, coll) {
  return cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray([begin], true), cljs.core.flatten1.call(null, cljs.core.interpose.call(null, cljs.core.PersistentVector.fromArray([sep], true), cljs.core.map.call(null, function(p1__10881_SHARP_) {
    return print_one.call(null, p1__10881_SHARP_, opts)
  }, coll))), cljs.core.PersistentVector.fromArray([end], true))
};
cljs.core.string_print = function string_print(x) {
  cljs.core._STAR_print_fn_STAR_.call(null, x);
  return null
};
cljs.core.flush = function flush() {
  return null
};
cljs.core.pr_seq = function pr_seq(obj, opts) {
  if(obj == null) {
    return cljs.core.list.call(null, "nil")
  }else {
    if(void 0 === obj) {
      return cljs.core.list.call(null, "#<undefined>")
    }else {
      if("\ufdd0'else") {
        return cljs.core.concat.call(null, cljs.core.truth_(function() {
          var and__3822__auto____10901 = cljs.core._lookup.call(null, opts, "\ufdd0'meta", null);
          if(cljs.core.truth_(and__3822__auto____10901)) {
            var and__3822__auto____10905 = function() {
              var G__10902__10903 = obj;
              if(G__10902__10903) {
                if(function() {
                  var or__3824__auto____10904 = G__10902__10903.cljs$lang$protocol_mask$partition0$ & 131072;
                  if(or__3824__auto____10904) {
                    return or__3824__auto____10904
                  }else {
                    return G__10902__10903.cljs$core$IMeta$
                  }
                }()) {
                  return true
                }else {
                  if(!G__10902__10903.cljs$lang$protocol_mask$partition0$) {
                    return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__10902__10903)
                  }else {
                    return false
                  }
                }
              }else {
                return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__10902__10903)
              }
            }();
            if(cljs.core.truth_(and__3822__auto____10905)) {
              return cljs.core.meta.call(null, obj)
            }else {
              return and__3822__auto____10905
            }
          }else {
            return and__3822__auto____10901
          }
        }()) ? cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray(["^"], true), pr_seq.call(null, cljs.core.meta.call(null, obj), opts), cljs.core.PersistentVector.fromArray([" "], true)) : null, function() {
          var and__3822__auto____10906 = !(obj == null);
          if(and__3822__auto____10906) {
            return obj.cljs$lang$type
          }else {
            return and__3822__auto____10906
          }
        }() ? obj.cljs$lang$ctorPrSeq(obj) : function() {
          var G__10907__10908 = obj;
          if(G__10907__10908) {
            if(function() {
              var or__3824__auto____10909 = G__10907__10908.cljs$lang$protocol_mask$partition0$ & 536870912;
              if(or__3824__auto____10909) {
                return or__3824__auto____10909
              }else {
                return G__10907__10908.cljs$core$IPrintable$
              }
            }()) {
              return true
            }else {
              if(!G__10907__10908.cljs$lang$protocol_mask$partition0$) {
                return cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, G__10907__10908)
              }else {
                return false
              }
            }
          }else {
            return cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, G__10907__10908)
          }
        }() ? cljs.core._pr_seq.call(null, obj, opts) : cljs.core.truth_(cljs.core.regexp_QMARK_.call(null, obj)) ? cljs.core.list.call(null, '#"', obj.source, '"') : "\ufdd0'else" ? cljs.core.list.call(null, "#<", [cljs.core.str(obj)].join(""), ">") : null)
      }else {
        return null
      }
    }
  }
};
cljs.core.pr_sb = function pr_sb(objs, opts) {
  var sb__10929 = new goog.string.StringBuffer;
  var G__10930__10931 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, cljs.core.first.call(null, objs), opts));
  if(G__10930__10931) {
    var string__10932 = cljs.core.first.call(null, G__10930__10931);
    var G__10930__10933 = G__10930__10931;
    while(true) {
      sb__10929.append(string__10932);
      var temp__3974__auto____10934 = cljs.core.next.call(null, G__10930__10933);
      if(temp__3974__auto____10934) {
        var G__10930__10935 = temp__3974__auto____10934;
        var G__10948 = cljs.core.first.call(null, G__10930__10935);
        var G__10949 = G__10930__10935;
        string__10932 = G__10948;
        G__10930__10933 = G__10949;
        continue
      }else {
      }
      break
    }
  }else {
  }
  var G__10936__10937 = cljs.core.seq.call(null, cljs.core.next.call(null, objs));
  if(G__10936__10937) {
    var obj__10938 = cljs.core.first.call(null, G__10936__10937);
    var G__10936__10939 = G__10936__10937;
    while(true) {
      sb__10929.append(" ");
      var G__10940__10941 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__10938, opts));
      if(G__10940__10941) {
        var string__10942 = cljs.core.first.call(null, G__10940__10941);
        var G__10940__10943 = G__10940__10941;
        while(true) {
          sb__10929.append(string__10942);
          var temp__3974__auto____10944 = cljs.core.next.call(null, G__10940__10943);
          if(temp__3974__auto____10944) {
            var G__10940__10945 = temp__3974__auto____10944;
            var G__10950 = cljs.core.first.call(null, G__10940__10945);
            var G__10951 = G__10940__10945;
            string__10942 = G__10950;
            G__10940__10943 = G__10951;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3974__auto____10946 = cljs.core.next.call(null, G__10936__10939);
      if(temp__3974__auto____10946) {
        var G__10936__10947 = temp__3974__auto____10946;
        var G__10952 = cljs.core.first.call(null, G__10936__10947);
        var G__10953 = G__10936__10947;
        obj__10938 = G__10952;
        G__10936__10939 = G__10953;
        continue
      }else {
      }
      break
    }
  }else {
  }
  return sb__10929
};
cljs.core.pr_str_with_opts = function pr_str_with_opts(objs, opts) {
  return[cljs.core.str(cljs.core.pr_sb.call(null, objs, opts))].join("")
};
cljs.core.prn_str_with_opts = function prn_str_with_opts(objs, opts) {
  var sb__10955 = cljs.core.pr_sb.call(null, objs, opts);
  sb__10955.append("\n");
  return[cljs.core.str(sb__10955)].join("")
};
cljs.core.pr_with_opts = function pr_with_opts(objs, opts) {
  var G__10974__10975 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, cljs.core.first.call(null, objs), opts));
  if(G__10974__10975) {
    var string__10976 = cljs.core.first.call(null, G__10974__10975);
    var G__10974__10977 = G__10974__10975;
    while(true) {
      cljs.core.string_print.call(null, string__10976);
      var temp__3974__auto____10978 = cljs.core.next.call(null, G__10974__10977);
      if(temp__3974__auto____10978) {
        var G__10974__10979 = temp__3974__auto____10978;
        var G__10992 = cljs.core.first.call(null, G__10974__10979);
        var G__10993 = G__10974__10979;
        string__10976 = G__10992;
        G__10974__10977 = G__10993;
        continue
      }else {
      }
      break
    }
  }else {
  }
  var G__10980__10981 = cljs.core.seq.call(null, cljs.core.next.call(null, objs));
  if(G__10980__10981) {
    var obj__10982 = cljs.core.first.call(null, G__10980__10981);
    var G__10980__10983 = G__10980__10981;
    while(true) {
      cljs.core.string_print.call(null, " ");
      var G__10984__10985 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__10982, opts));
      if(G__10984__10985) {
        var string__10986 = cljs.core.first.call(null, G__10984__10985);
        var G__10984__10987 = G__10984__10985;
        while(true) {
          cljs.core.string_print.call(null, string__10986);
          var temp__3974__auto____10988 = cljs.core.next.call(null, G__10984__10987);
          if(temp__3974__auto____10988) {
            var G__10984__10989 = temp__3974__auto____10988;
            var G__10994 = cljs.core.first.call(null, G__10984__10989);
            var G__10995 = G__10984__10989;
            string__10986 = G__10994;
            G__10984__10987 = G__10995;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3974__auto____10990 = cljs.core.next.call(null, G__10980__10983);
      if(temp__3974__auto____10990) {
        var G__10980__10991 = temp__3974__auto____10990;
        var G__10996 = cljs.core.first.call(null, G__10980__10991);
        var G__10997 = G__10980__10991;
        obj__10982 = G__10996;
        G__10980__10983 = G__10997;
        continue
      }else {
        return null
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.newline = function newline(opts) {
  cljs.core.string_print.call(null, "\n");
  if(cljs.core.truth_(cljs.core._lookup.call(null, opts, "\ufdd0'flush-on-newline", null))) {
    return cljs.core.flush.call(null)
  }else {
    return null
  }
};
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = function pr_opts() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'flush-on-newline", "\ufdd0'readably", "\ufdd0'meta", "\ufdd0'dup"], {"\ufdd0'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_, "\ufdd0'readably":cljs.core._STAR_print_readably_STAR_, "\ufdd0'meta":cljs.core._STAR_print_meta_STAR_, "\ufdd0'dup":cljs.core._STAR_print_dup_STAR_})
};
cljs.core.pr_str = function() {
  var pr_str__delegate = function(objs) {
    return cljs.core.pr_str_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var pr_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return pr_str__delegate.call(this, objs)
  };
  pr_str.cljs$lang$maxFixedArity = 0;
  pr_str.cljs$lang$applyTo = function(arglist__10998) {
    var objs = cljs.core.seq(arglist__10998);
    return pr_str__delegate(objs)
  };
  pr_str.cljs$lang$arity$variadic = pr_str__delegate;
  return pr_str
}();
cljs.core.prn_str = function() {
  var prn_str__delegate = function(objs) {
    return cljs.core.prn_str_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var prn_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return prn_str__delegate.call(this, objs)
  };
  prn_str.cljs$lang$maxFixedArity = 0;
  prn_str.cljs$lang$applyTo = function(arglist__10999) {
    var objs = cljs.core.seq(arglist__10999);
    return prn_str__delegate(objs)
  };
  prn_str.cljs$lang$arity$variadic = prn_str__delegate;
  return prn_str
}();
cljs.core.pr = function() {
  var pr__delegate = function(objs) {
    return cljs.core.pr_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var pr = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return pr__delegate.call(this, objs)
  };
  pr.cljs$lang$maxFixedArity = 0;
  pr.cljs$lang$applyTo = function(arglist__11000) {
    var objs = cljs.core.seq(arglist__11000);
    return pr__delegate(objs)
  };
  pr.cljs$lang$arity$variadic = pr__delegate;
  return pr
}();
cljs.core.print = function() {
  var cljs_core_print__delegate = function(objs) {
    return cljs.core.pr_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  };
  var cljs_core_print = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return cljs_core_print__delegate.call(this, objs)
  };
  cljs_core_print.cljs$lang$maxFixedArity = 0;
  cljs_core_print.cljs$lang$applyTo = function(arglist__11001) {
    var objs = cljs.core.seq(arglist__11001);
    return cljs_core_print__delegate(objs)
  };
  cljs_core_print.cljs$lang$arity$variadic = cljs_core_print__delegate;
  return cljs_core_print
}();
cljs.core.print_str = function() {
  var print_str__delegate = function(objs) {
    return cljs.core.pr_str_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  };
  var print_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return print_str__delegate.call(this, objs)
  };
  print_str.cljs$lang$maxFixedArity = 0;
  print_str.cljs$lang$applyTo = function(arglist__11002) {
    var objs = cljs.core.seq(arglist__11002);
    return print_str__delegate(objs)
  };
  print_str.cljs$lang$arity$variadic = print_str__delegate;
  return print_str
}();
cljs.core.println = function() {
  var println__delegate = function(objs) {
    cljs.core.pr_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  };
  var println = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return println__delegate.call(this, objs)
  };
  println.cljs$lang$maxFixedArity = 0;
  println.cljs$lang$applyTo = function(arglist__11003) {
    var objs = cljs.core.seq(arglist__11003);
    return println__delegate(objs)
  };
  println.cljs$lang$arity$variadic = println__delegate;
  return println
}();
cljs.core.println_str = function() {
  var println_str__delegate = function(objs) {
    return cljs.core.prn_str_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  };
  var println_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return println_str__delegate.call(this, objs)
  };
  println_str.cljs$lang$maxFixedArity = 0;
  println_str.cljs$lang$applyTo = function(arglist__11004) {
    var objs = cljs.core.seq(arglist__11004);
    return println_str__delegate(objs)
  };
  println_str.cljs$lang$arity$variadic = println_str__delegate;
  return println_str
}();
cljs.core.prn = function() {
  var prn__delegate = function(objs) {
    cljs.core.pr_with_opts.call(null, objs, cljs.core.pr_opts.call(null));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  };
  var prn = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return prn__delegate.call(this, objs)
  };
  prn.cljs$lang$maxFixedArity = 0;
  prn.cljs$lang$applyTo = function(arglist__11005) {
    var objs = cljs.core.seq(arglist__11005);
    return prn__delegate(objs)
  };
  prn.cljs$lang$arity$variadic = prn__delegate;
  return prn
}();
cljs.core.printf = function() {
  var printf__delegate = function(fmt, args) {
    return cljs.core.print.call(null, cljs.core.apply.call(null, cljs.core.format, fmt, args))
  };
  var printf = function(fmt, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return printf__delegate.call(this, fmt, args)
  };
  printf.cljs$lang$maxFixedArity = 1;
  printf.cljs$lang$applyTo = function(arglist__11006) {
    var fmt = cljs.core.first(arglist__11006);
    var args = cljs.core.rest(arglist__11006);
    return printf__delegate(fmt, args)
  };
  printf.cljs$lang$arity$variadic = printf__delegate;
  return printf
}();
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__11007 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__11007, "{", ", ", "}", opts, coll)
};
cljs.core.IPrintable["number"] = true;
cljs.core._pr_seq["number"] = function(n, opts) {
  return cljs.core.list.call(null, [cljs.core.str(n)].join(""))
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = true;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__11008 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__11008, "{", ", ", "}", opts, coll)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__11009 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__11009, "{", ", ", "}", opts, coll)
};
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#queue [", " ", "]", opts, cljs.core.seq.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.RSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.RSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#{", " ", "}", opts, coll)
};
cljs.core.IPrintable["boolean"] = true;
cljs.core._pr_seq["boolean"] = function(bool, opts) {
  return cljs.core.list.call(null, [cljs.core.str(bool)].join(""))
};
cljs.core.IPrintable["string"] = true;
cljs.core._pr_seq["string"] = function(obj, opts) {
  if(cljs.core.keyword_QMARK_.call(null, obj)) {
    return cljs.core.list.call(null, [cljs.core.str(":"), cljs.core.str(function() {
      var temp__3974__auto____11010 = cljs.core.namespace.call(null, obj);
      if(cljs.core.truth_(temp__3974__auto____11010)) {
        var nspc__11011 = temp__3974__auto____11010;
        return[cljs.core.str(nspc__11011), cljs.core.str("/")].join("")
      }else {
        return null
      }
    }()), cljs.core.str(cljs.core.name.call(null, obj))].join(""))
  }else {
    if(cljs.core.symbol_QMARK_.call(null, obj)) {
      return cljs.core.list.call(null, [cljs.core.str(function() {
        var temp__3974__auto____11012 = cljs.core.namespace.call(null, obj);
        if(cljs.core.truth_(temp__3974__auto____11012)) {
          var nspc__11013 = temp__3974__auto____11012;
          return[cljs.core.str(nspc__11013), cljs.core.str("/")].join("")
        }else {
          return null
        }
      }()), cljs.core.str(cljs.core.name.call(null, obj))].join(""))
    }else {
      if("\ufdd0'else") {
        return cljs.core.list.call(null, cljs.core.truth_((new cljs.core.Keyword("\ufdd0'readably")).call(null, opts)) ? goog.string.quote(obj) : obj)
      }else {
        return null
      }
    }
  }
};
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.RedNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.RedNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__11014 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__11014, "{", ", ", "}", opts, coll)
};
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#{", " ", "}", opts, coll)
};
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.IPrintable["array"] = true;
cljs.core._pr_seq["array"] = function(a, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#<Array [", ", ", "]>", opts, a)
};
cljs.core.IPrintable["function"] = true;
cljs.core._pr_seq["function"] = function(this$) {
  return cljs.core.list.call(null, "#<", [cljs.core.str(this$)].join(""), ">")
};
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.list.call(null, "()")
};
cljs.core.BlackNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.BlackNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
Date.prototype.cljs$core$IPrintable$ = true;
Date.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(d, _) {
  var normalize__11016 = function(n, len) {
    var ns__11015 = [cljs.core.str(n)].join("");
    while(true) {
      if(cljs.core.count.call(null, ns__11015) < len) {
        var G__11018 = [cljs.core.str("0"), cljs.core.str(ns__11015)].join("");
        ns__11015 = G__11018;
        continue
      }else {
        return ns__11015
      }
      break
    }
  };
  return cljs.core.list.call(null, [cljs.core.str('#inst "'), cljs.core.str(d.getUTCFullYear()), cljs.core.str("-"), cljs.core.str(normalize__11016.call(null, d.getUTCMonth() + 1, 2)), cljs.core.str("-"), cljs.core.str(normalize__11016.call(null, d.getUTCDate(), 2)), cljs.core.str("T"), cljs.core.str(normalize__11016.call(null, d.getUTCHours(), 2)), cljs.core.str(":"), cljs.core.str(normalize__11016.call(null, d.getUTCMinutes(), 2)), cljs.core.str(":"), cljs.core.str(normalize__11016.call(null, d.getUTCSeconds(), 
  2)), cljs.core.str("."), cljs.core.str(normalize__11016.call(null, d.getUTCMilliseconds(), 3)), cljs.core.str("-"), cljs.core.str('00:00"')].join(""))
};
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__11017 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__11017, "{", ", ", "}", opts, coll)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentVector.prototype.cljs$core$IComparable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IComparable$_compare$arity$2 = function(x, y) {
  return cljs.core.compare_indexed.call(null, x, y)
};
cljs.core.Atom = function(state, meta, validator, watches) {
  this.state = state;
  this.meta = meta;
  this.validator = validator;
  this.watches = watches;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2690809856
};
cljs.core.Atom.cljs$lang$type = true;
cljs.core.Atom.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Atom")
};
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__11019 = this;
  return goog.getUid(this$)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = function(this$, oldval, newval) {
  var this__11020 = this;
  var G__11021__11022 = cljs.core.seq.call(null, this__11020.watches);
  if(G__11021__11022) {
    var G__11024__11026 = cljs.core.first.call(null, G__11021__11022);
    var vec__11025__11027 = G__11024__11026;
    var key__11028 = cljs.core.nth.call(null, vec__11025__11027, 0, null);
    var f__11029 = cljs.core.nth.call(null, vec__11025__11027, 1, null);
    var G__11021__11030 = G__11021__11022;
    var G__11024__11031 = G__11024__11026;
    var G__11021__11032 = G__11021__11030;
    while(true) {
      var vec__11033__11034 = G__11024__11031;
      var key__11035 = cljs.core.nth.call(null, vec__11033__11034, 0, null);
      var f__11036 = cljs.core.nth.call(null, vec__11033__11034, 1, null);
      var G__11021__11037 = G__11021__11032;
      f__11036.call(null, key__11035, this$, oldval, newval);
      var temp__3974__auto____11038 = cljs.core.next.call(null, G__11021__11037);
      if(temp__3974__auto____11038) {
        var G__11021__11039 = temp__3974__auto____11038;
        var G__11046 = cljs.core.first.call(null, G__11021__11039);
        var G__11047 = G__11021__11039;
        G__11024__11031 = G__11046;
        G__11021__11032 = G__11047;
        continue
      }else {
        return null
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = function(this$, key, f) {
  var this__11040 = this;
  return this$.watches = cljs.core.assoc.call(null, this__11040.watches, key, f)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = function(this$, key) {
  var this__11041 = this;
  return this$.watches = cljs.core.dissoc.call(null, this__11041.watches, key)
};
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, opts) {
  var this__11042 = this;
  return cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray(["#<Atom: "], true), cljs.core._pr_seq.call(null, this__11042.state, opts), ">")
};
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = function(_) {
  var this__11043 = this;
  return this__11043.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = function(_) {
  var this__11044 = this;
  return this__11044.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(o, other) {
  var this__11045 = this;
  return o === other
};
cljs.core.Atom;
cljs.core.atom = function() {
  var atom = null;
  var atom__1 = function(x) {
    return new cljs.core.Atom(x, null, null, null)
  };
  var atom__2 = function() {
    var G__11059__delegate = function(x, p__11048) {
      var map__11054__11055 = p__11048;
      var map__11054__11056 = cljs.core.seq_QMARK_.call(null, map__11054__11055) ? cljs.core.apply.call(null, cljs.core.hash_map, map__11054__11055) : map__11054__11055;
      var validator__11057 = cljs.core._lookup.call(null, map__11054__11056, "\ufdd0'validator", null);
      var meta__11058 = cljs.core._lookup.call(null, map__11054__11056, "\ufdd0'meta", null);
      return new cljs.core.Atom(x, meta__11058, validator__11057, null)
    };
    var G__11059 = function(x, var_args) {
      var p__11048 = null;
      if(goog.isDef(var_args)) {
        p__11048 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__11059__delegate.call(this, x, p__11048)
    };
    G__11059.cljs$lang$maxFixedArity = 1;
    G__11059.cljs$lang$applyTo = function(arglist__11060) {
      var x = cljs.core.first(arglist__11060);
      var p__11048 = cljs.core.rest(arglist__11060);
      return G__11059__delegate(x, p__11048)
    };
    G__11059.cljs$lang$arity$variadic = G__11059__delegate;
    return G__11059
  }();
  atom = function(x, var_args) {
    var p__11048 = var_args;
    switch(arguments.length) {
      case 1:
        return atom__1.call(this, x);
      default:
        return atom__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  atom.cljs$lang$maxFixedArity = 1;
  atom.cljs$lang$applyTo = atom__2.cljs$lang$applyTo;
  atom.cljs$lang$arity$1 = atom__1;
  atom.cljs$lang$arity$variadic = atom__2.cljs$lang$arity$variadic;
  return atom
}();
cljs.core.reset_BANG_ = function reset_BANG_(a, new_value) {
  var temp__3974__auto____11064 = a.validator;
  if(cljs.core.truth_(temp__3974__auto____11064)) {
    var validate__11065 = temp__3974__auto____11064;
    if(cljs.core.truth_(validate__11065.call(null, new_value))) {
    }else {
      throw new Error([cljs.core.str("Assert failed: "), cljs.core.str("Validator rejected reference state"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'validate", "\ufdd1'new-value"), cljs.core.hash_map("\ufdd0'line", 6440))))].join(""));
    }
  }else {
  }
  var old_value__11066 = a.state;
  a.state = new_value;
  cljs.core._notify_watches.call(null, a, old_value__11066, new_value);
  return new_value
};
cljs.core.swap_BANG_ = function() {
  var swap_BANG_ = null;
  var swap_BANG___2 = function(a, f) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state))
  };
  var swap_BANG___3 = function(a, f, x) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x))
  };
  var swap_BANG___4 = function(a, f, x, y) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x, y))
  };
  var swap_BANG___5 = function(a, f, x, y, z) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x, y, z))
  };
  var swap_BANG___6 = function() {
    var G__11067__delegate = function(a, f, x, y, z, more) {
      return cljs.core.reset_BANG_.call(null, a, cljs.core.apply.call(null, f, a.state, x, y, z, more))
    };
    var G__11067 = function(a, f, x, y, z, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__11067__delegate.call(this, a, f, x, y, z, more)
    };
    G__11067.cljs$lang$maxFixedArity = 5;
    G__11067.cljs$lang$applyTo = function(arglist__11068) {
      var a = cljs.core.first(arglist__11068);
      var f = cljs.core.first(cljs.core.next(arglist__11068));
      var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__11068)));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__11068))));
      var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__11068)))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__11068)))));
      return G__11067__delegate(a, f, x, y, z, more)
    };
    G__11067.cljs$lang$arity$variadic = G__11067__delegate;
    return G__11067
  }();
  swap_BANG_ = function(a, f, x, y, z, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return swap_BANG___2.call(this, a, f);
      case 3:
        return swap_BANG___3.call(this, a, f, x);
      case 4:
        return swap_BANG___4.call(this, a, f, x, y);
      case 5:
        return swap_BANG___5.call(this, a, f, x, y, z);
      default:
        return swap_BANG___6.cljs$lang$arity$variadic(a, f, x, y, z, cljs.core.array_seq(arguments, 5))
    }
    throw"Invalid arity: " + arguments.length;
  };
  swap_BANG_.cljs$lang$maxFixedArity = 5;
  swap_BANG_.cljs$lang$applyTo = swap_BANG___6.cljs$lang$applyTo;
  swap_BANG_.cljs$lang$arity$2 = swap_BANG___2;
  swap_BANG_.cljs$lang$arity$3 = swap_BANG___3;
  swap_BANG_.cljs$lang$arity$4 = swap_BANG___4;
  swap_BANG_.cljs$lang$arity$5 = swap_BANG___5;
  swap_BANG_.cljs$lang$arity$variadic = swap_BANG___6.cljs$lang$arity$variadic;
  return swap_BANG_
}();
cljs.core.compare_and_set_BANG_ = function compare_and_set_BANG_(a, oldval, newval) {
  if(cljs.core._EQ_.call(null, a.state, oldval)) {
    cljs.core.reset_BANG_.call(null, a, newval);
    return true
  }else {
    return false
  }
};
cljs.core.deref = function deref(o) {
  return cljs.core._deref.call(null, o)
};
cljs.core.set_validator_BANG_ = function set_validator_BANG_(iref, val) {
  return iref.validator = val
};
cljs.core.get_validator = function get_validator(iref) {
  return iref.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var alter_meta_BANG___delegate = function(iref, f, args) {
    return iref.meta = cljs.core.apply.call(null, f, iref.meta, args)
  };
  var alter_meta_BANG_ = function(iref, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
    }
    return alter_meta_BANG___delegate.call(this, iref, f, args)
  };
  alter_meta_BANG_.cljs$lang$maxFixedArity = 2;
  alter_meta_BANG_.cljs$lang$applyTo = function(arglist__11069) {
    var iref = cljs.core.first(arglist__11069);
    var f = cljs.core.first(cljs.core.next(arglist__11069));
    var args = cljs.core.rest(cljs.core.next(arglist__11069));
    return alter_meta_BANG___delegate(iref, f, args)
  };
  alter_meta_BANG_.cljs$lang$arity$variadic = alter_meta_BANG___delegate;
  return alter_meta_BANG_
}();
cljs.core.reset_meta_BANG_ = function reset_meta_BANG_(iref, m) {
  return iref.meta = m
};
cljs.core.add_watch = function add_watch(iref, key, f) {
  return cljs.core._add_watch.call(null, iref, key, f)
};
cljs.core.remove_watch = function remove_watch(iref, key) {
  return cljs.core._remove_watch.call(null, iref, key)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var gensym = null;
  var gensym__0 = function() {
    return gensym.call(null, "G__")
  };
  var gensym__1 = function(prefix_string) {
    if(cljs.core.gensym_counter == null) {
      cljs.core.gensym_counter = cljs.core.atom.call(null, 0)
    }else {
    }
    return cljs.core.symbol.call(null, [cljs.core.str(prefix_string), cljs.core.str(cljs.core.swap_BANG_.call(null, cljs.core.gensym_counter, cljs.core.inc))].join(""))
  };
  gensym = function(prefix_string) {
    switch(arguments.length) {
      case 0:
        return gensym__0.call(this);
      case 1:
        return gensym__1.call(this, prefix_string)
    }
    throw"Invalid arity: " + arguments.length;
  };
  gensym.cljs$lang$arity$0 = gensym__0;
  gensym.cljs$lang$arity$1 = gensym__1;
  return gensym
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(state, f) {
  this.state = state;
  this.f = f;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1073774592
};
cljs.core.Delay.cljs$lang$type = true;
cljs.core.Delay.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Delay")
};
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = function(d) {
  var this__11070 = this;
  return(new cljs.core.Keyword("\ufdd0'done")).call(null, cljs.core.deref.call(null, this__11070.state))
};
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = function(_) {
  var this__11071 = this;
  return(new cljs.core.Keyword("\ufdd0'value")).call(null, cljs.core.swap_BANG_.call(null, this__11071.state, function(p__11072) {
    var map__11073__11074 = p__11072;
    var map__11073__11075 = cljs.core.seq_QMARK_.call(null, map__11073__11074) ? cljs.core.apply.call(null, cljs.core.hash_map, map__11073__11074) : map__11073__11074;
    var curr_state__11076 = map__11073__11075;
    var done__11077 = cljs.core._lookup.call(null, map__11073__11075, "\ufdd0'done", null);
    if(cljs.core.truth_(done__11077)) {
      return curr_state__11076
    }else {
      return cljs.core.ObjMap.fromObject(["\ufdd0'done", "\ufdd0'value"], {"\ufdd0'done":true, "\ufdd0'value":this__11071.f.call(null)})
    }
  }))
};
cljs.core.Delay;
cljs.core.delay_QMARK_ = function delay_QMARK_(x) {
  return cljs.core.instance_QMARK_.call(null, cljs.core.Delay, x)
};
cljs.core.force = function force(x) {
  if(cljs.core.delay_QMARK_.call(null, x)) {
    return cljs.core.deref.call(null, x)
  }else {
    return x
  }
};
cljs.core.realized_QMARK_ = function realized_QMARK_(d) {
  return cljs.core._realized_QMARK_.call(null, d)
};
cljs.core.js__GT_clj = function() {
  var js__GT_clj__delegate = function(x, options) {
    var map__11098__11099 = options;
    var map__11098__11100 = cljs.core.seq_QMARK_.call(null, map__11098__11099) ? cljs.core.apply.call(null, cljs.core.hash_map, map__11098__11099) : map__11098__11099;
    var keywordize_keys__11101 = cljs.core._lookup.call(null, map__11098__11100, "\ufdd0'keywordize-keys", null);
    var keyfn__11102 = cljs.core.truth_(keywordize_keys__11101) ? cljs.core.keyword : cljs.core.str;
    var f__11117 = function thisfn(x) {
      if(cljs.core.seq_QMARK_.call(null, x)) {
        return cljs.core.doall.call(null, cljs.core.map.call(null, thisfn, x))
      }else {
        if(cljs.core.coll_QMARK_.call(null, x)) {
          return cljs.core.into.call(null, cljs.core.empty.call(null, x), cljs.core.map.call(null, thisfn, x))
        }else {
          if(cljs.core.truth_(goog.isArray(x))) {
            return cljs.core.vec.call(null, cljs.core.map.call(null, thisfn, x))
          }else {
            if(cljs.core.type.call(null, x) === Object) {
              return cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, function() {
                var iter__2462__auto____11116 = function iter__11110(s__11111) {
                  return new cljs.core.LazySeq(null, false, function() {
                    var s__11111__11114 = s__11111;
                    while(true) {
                      if(cljs.core.seq.call(null, s__11111__11114)) {
                        var k__11115 = cljs.core.first.call(null, s__11111__11114);
                        return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([keyfn__11102.call(null, k__11115), thisfn.call(null, x[k__11115])], true), iter__11110.call(null, cljs.core.rest.call(null, s__11111__11114)))
                      }else {
                        return null
                      }
                      break
                    }
                  }, null)
                };
                return iter__2462__auto____11116.call(null, cljs.core.js_keys.call(null, x))
              }())
            }else {
              if("\ufdd0'else") {
                return x
              }else {
                return null
              }
            }
          }
        }
      }
    };
    return f__11117.call(null, x)
  };
  var js__GT_clj = function(x, var_args) {
    var options = null;
    if(goog.isDef(var_args)) {
      options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return js__GT_clj__delegate.call(this, x, options)
  };
  js__GT_clj.cljs$lang$maxFixedArity = 1;
  js__GT_clj.cljs$lang$applyTo = function(arglist__11118) {
    var x = cljs.core.first(arglist__11118);
    var options = cljs.core.rest(arglist__11118);
    return js__GT_clj__delegate(x, options)
  };
  js__GT_clj.cljs$lang$arity$variadic = js__GT_clj__delegate;
  return js__GT_clj
}();
cljs.core.memoize = function memoize(f) {
  var mem__11123 = cljs.core.atom.call(null, cljs.core.ObjMap.EMPTY);
  return function() {
    var G__11127__delegate = function(args) {
      var temp__3971__auto____11124 = cljs.core._lookup.call(null, cljs.core.deref.call(null, mem__11123), args, null);
      if(cljs.core.truth_(temp__3971__auto____11124)) {
        var v__11125 = temp__3971__auto____11124;
        return v__11125
      }else {
        var ret__11126 = cljs.core.apply.call(null, f, args);
        cljs.core.swap_BANG_.call(null, mem__11123, cljs.core.assoc, args, ret__11126);
        return ret__11126
      }
    };
    var G__11127 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__11127__delegate.call(this, args)
    };
    G__11127.cljs$lang$maxFixedArity = 0;
    G__11127.cljs$lang$applyTo = function(arglist__11128) {
      var args = cljs.core.seq(arglist__11128);
      return G__11127__delegate(args)
    };
    G__11127.cljs$lang$arity$variadic = G__11127__delegate;
    return G__11127
  }()
};
cljs.core.trampoline = function() {
  var trampoline = null;
  var trampoline__1 = function(f) {
    while(true) {
      var ret__11130 = f.call(null);
      if(cljs.core.fn_QMARK_.call(null, ret__11130)) {
        var G__11131 = ret__11130;
        f = G__11131;
        continue
      }else {
        return ret__11130
      }
      break
    }
  };
  var trampoline__2 = function() {
    var G__11132__delegate = function(f, args) {
      return trampoline.call(null, function() {
        return cljs.core.apply.call(null, f, args)
      })
    };
    var G__11132 = function(f, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__11132__delegate.call(this, f, args)
    };
    G__11132.cljs$lang$maxFixedArity = 1;
    G__11132.cljs$lang$applyTo = function(arglist__11133) {
      var f = cljs.core.first(arglist__11133);
      var args = cljs.core.rest(arglist__11133);
      return G__11132__delegate(f, args)
    };
    G__11132.cljs$lang$arity$variadic = G__11132__delegate;
    return G__11132
  }();
  trampoline = function(f, var_args) {
    var args = var_args;
    switch(arguments.length) {
      case 1:
        return trampoline__1.call(this, f);
      default:
        return trampoline__2.cljs$lang$arity$variadic(f, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  trampoline.cljs$lang$maxFixedArity = 1;
  trampoline.cljs$lang$applyTo = trampoline__2.cljs$lang$applyTo;
  trampoline.cljs$lang$arity$1 = trampoline__1;
  trampoline.cljs$lang$arity$variadic = trampoline__2.cljs$lang$arity$variadic;
  return trampoline
}();
cljs.core.rand = function() {
  var rand = null;
  var rand__0 = function() {
    return rand.call(null, 1)
  };
  var rand__1 = function(n) {
    return Math.random.call(null) * n
  };
  rand = function(n) {
    switch(arguments.length) {
      case 0:
        return rand__0.call(this);
      case 1:
        return rand__1.call(this, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  rand.cljs$lang$arity$0 = rand__0;
  rand.cljs$lang$arity$1 = rand__1;
  return rand
}();
cljs.core.rand_int = function rand_int(n) {
  return Math.floor.call(null, Math.random.call(null) * n)
};
cljs.core.rand_nth = function rand_nth(coll) {
  return cljs.core.nth.call(null, coll, cljs.core.rand_int.call(null, cljs.core.count.call(null, coll)))
};
cljs.core.group_by = function group_by(f, coll) {
  return cljs.core.reduce.call(null, function(ret, x) {
    var k__11135 = f.call(null, x);
    return cljs.core.assoc.call(null, ret, k__11135, cljs.core.conj.call(null, cljs.core._lookup.call(null, ret, k__11135, cljs.core.PersistentVector.EMPTY), x))
  }, cljs.core.ObjMap.EMPTY, coll)
};
cljs.core.make_hierarchy = function make_hierarchy() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'descendants", "\ufdd0'ancestors"], {"\ufdd0'parents":cljs.core.ObjMap.EMPTY, "\ufdd0'descendants":cljs.core.ObjMap.EMPTY, "\ufdd0'ancestors":cljs.core.ObjMap.EMPTY})
};
cljs.core.global_hierarchy = cljs.core.atom.call(null, cljs.core.make_hierarchy.call(null));
cljs.core.isa_QMARK_ = function() {
  var isa_QMARK_ = null;
  var isa_QMARK___2 = function(child, parent) {
    return isa_QMARK_.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), child, parent)
  };
  var isa_QMARK___3 = function(h, child, parent) {
    var or__3824__auto____11144 = cljs.core._EQ_.call(null, child, parent);
    if(or__3824__auto____11144) {
      return or__3824__auto____11144
    }else {
      var or__3824__auto____11145 = cljs.core.contains_QMARK_.call(null, (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h).call(null, child), parent);
      if(or__3824__auto____11145) {
        return or__3824__auto____11145
      }else {
        var and__3822__auto____11146 = cljs.core.vector_QMARK_.call(null, parent);
        if(and__3822__auto____11146) {
          var and__3822__auto____11147 = cljs.core.vector_QMARK_.call(null, child);
          if(and__3822__auto____11147) {
            var and__3822__auto____11148 = cljs.core.count.call(null, parent) === cljs.core.count.call(null, child);
            if(and__3822__auto____11148) {
              var ret__11149 = true;
              var i__11150 = 0;
              while(true) {
                if(function() {
                  var or__3824__auto____11151 = cljs.core.not.call(null, ret__11149);
                  if(or__3824__auto____11151) {
                    return or__3824__auto____11151
                  }else {
                    return i__11150 === cljs.core.count.call(null, parent)
                  }
                }()) {
                  return ret__11149
                }else {
                  var G__11152 = isa_QMARK_.call(null, h, child.call(null, i__11150), parent.call(null, i__11150));
                  var G__11153 = i__11150 + 1;
                  ret__11149 = G__11152;
                  i__11150 = G__11153;
                  continue
                }
                break
              }
            }else {
              return and__3822__auto____11148
            }
          }else {
            return and__3822__auto____11147
          }
        }else {
          return and__3822__auto____11146
        }
      }
    }
  };
  isa_QMARK_ = function(h, child, parent) {
    switch(arguments.length) {
      case 2:
        return isa_QMARK___2.call(this, h, child);
      case 3:
        return isa_QMARK___3.call(this, h, child, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  isa_QMARK_.cljs$lang$arity$2 = isa_QMARK___2;
  isa_QMARK_.cljs$lang$arity$3 = isa_QMARK___3;
  return isa_QMARK_
}();
cljs.core.parents = function() {
  var parents = null;
  var parents__1 = function(tag) {
    return parents.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var parents__2 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core._lookup.call(null, (new cljs.core.Keyword("\ufdd0'parents")).call(null, h), tag, null))
  };
  parents = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return parents__1.call(this, h);
      case 2:
        return parents__2.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  parents.cljs$lang$arity$1 = parents__1;
  parents.cljs$lang$arity$2 = parents__2;
  return parents
}();
cljs.core.ancestors = function() {
  var ancestors = null;
  var ancestors__1 = function(tag) {
    return ancestors.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var ancestors__2 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core._lookup.call(null, (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h), tag, null))
  };
  ancestors = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return ancestors__1.call(this, h);
      case 2:
        return ancestors__2.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  ancestors.cljs$lang$arity$1 = ancestors__1;
  ancestors.cljs$lang$arity$2 = ancestors__2;
  return ancestors
}();
cljs.core.descendants = function() {
  var descendants = null;
  var descendants__1 = function(tag) {
    return descendants.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var descendants__2 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core._lookup.call(null, (new cljs.core.Keyword("\ufdd0'descendants")).call(null, h), tag, null))
  };
  descendants = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return descendants__1.call(this, h);
      case 2:
        return descendants__2.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  descendants.cljs$lang$arity$1 = descendants__1;
  descendants.cljs$lang$arity$2 = descendants__2;
  return descendants
}();
cljs.core.derive = function() {
  var derive = null;
  var derive__2 = function(tag, parent) {
    if(cljs.core.truth_(cljs.core.namespace.call(null, parent))) {
    }else {
      throw new Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'namespace", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 6724))))].join(""));
    }
    cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, derive, tag, parent);
    return null
  };
  var derive__3 = function(h, tag, parent) {
    if(cljs.core.not_EQ_.call(null, tag, parent)) {
    }else {
      throw new Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'not=", "\ufdd1'tag", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 6728))))].join(""));
    }
    var tp__11162 = (new cljs.core.Keyword("\ufdd0'parents")).call(null, h);
    var td__11163 = (new cljs.core.Keyword("\ufdd0'descendants")).call(null, h);
    var ta__11164 = (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h);
    var tf__11165 = function(m, source, sources, target, targets) {
      return cljs.core.reduce.call(null, function(ret, k) {
        return cljs.core.assoc.call(null, ret, k, cljs.core.reduce.call(null, cljs.core.conj, cljs.core._lookup.call(null, targets, k, cljs.core.PersistentHashSet.EMPTY), cljs.core.cons.call(null, target, targets.call(null, target))))
      }, m, cljs.core.cons.call(null, source, sources.call(null, source)))
    };
    var or__3824__auto____11166 = cljs.core.contains_QMARK_.call(null, tp__11162.call(null, tag), parent) ? null : function() {
      if(cljs.core.contains_QMARK_.call(null, ta__11164.call(null, tag), parent)) {
        throw new Error([cljs.core.str(tag), cljs.core.str("already has"), cljs.core.str(parent), cljs.core.str("as ancestor")].join(""));
      }else {
      }
      if(cljs.core.contains_QMARK_.call(null, ta__11164.call(null, parent), tag)) {
        throw new Error([cljs.core.str("Cyclic derivation:"), cljs.core.str(parent), cljs.core.str("has"), cljs.core.str(tag), cljs.core.str("as ancestor")].join(""));
      }else {
      }
      return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'ancestors", "\ufdd0'descendants"], {"\ufdd0'parents":cljs.core.assoc.call(null, (new cljs.core.Keyword("\ufdd0'parents")).call(null, h), tag, cljs.core.conj.call(null, cljs.core._lookup.call(null, tp__11162, tag, cljs.core.PersistentHashSet.EMPTY), parent)), "\ufdd0'ancestors":tf__11165.call(null, (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h), tag, td__11163, parent, ta__11164), "\ufdd0'descendants":tf__11165.call(null, 
      (new cljs.core.Keyword("\ufdd0'descendants")).call(null, h), parent, ta__11164, tag, td__11163)})
    }();
    if(cljs.core.truth_(or__3824__auto____11166)) {
      return or__3824__auto____11166
    }else {
      return h
    }
  };
  derive = function(h, tag, parent) {
    switch(arguments.length) {
      case 2:
        return derive__2.call(this, h, tag);
      case 3:
        return derive__3.call(this, h, tag, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  derive.cljs$lang$arity$2 = derive__2;
  derive.cljs$lang$arity$3 = derive__3;
  return derive
}();
cljs.core.underive = function() {
  var underive = null;
  var underive__2 = function(tag, parent) {
    cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, underive, tag, parent);
    return null
  };
  var underive__3 = function(h, tag, parent) {
    var parentMap__11171 = (new cljs.core.Keyword("\ufdd0'parents")).call(null, h);
    var childsParents__11172 = cljs.core.truth_(parentMap__11171.call(null, tag)) ? cljs.core.disj.call(null, parentMap__11171.call(null, tag), parent) : cljs.core.PersistentHashSet.EMPTY;
    var newParents__11173 = cljs.core.truth_(cljs.core.not_empty.call(null, childsParents__11172)) ? cljs.core.assoc.call(null, parentMap__11171, tag, childsParents__11172) : cljs.core.dissoc.call(null, parentMap__11171, tag);
    var deriv_seq__11174 = cljs.core.flatten.call(null, cljs.core.map.call(null, function(p1__11154_SHARP_) {
      return cljs.core.cons.call(null, cljs.core.first.call(null, p1__11154_SHARP_), cljs.core.interpose.call(null, cljs.core.first.call(null, p1__11154_SHARP_), cljs.core.second.call(null, p1__11154_SHARP_)))
    }, cljs.core.seq.call(null, newParents__11173)));
    if(cljs.core.contains_QMARK_.call(null, parentMap__11171.call(null, tag), parent)) {
      return cljs.core.reduce.call(null, function(p1__11155_SHARP_, p2__11156_SHARP_) {
        return cljs.core.apply.call(null, cljs.core.derive, p1__11155_SHARP_, p2__11156_SHARP_)
      }, cljs.core.make_hierarchy.call(null), cljs.core.partition.call(null, 2, deriv_seq__11174))
    }else {
      return h
    }
  };
  underive = function(h, tag, parent) {
    switch(arguments.length) {
      case 2:
        return underive__2.call(this, h, tag);
      case 3:
        return underive__3.call(this, h, tag, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  underive.cljs$lang$arity$2 = underive__2;
  underive.cljs$lang$arity$3 = underive__3;
  return underive
}();
cljs.core.reset_cache = function reset_cache(method_cache, method_table, cached_hierarchy, hierarchy) {
  cljs.core.swap_BANG_.call(null, method_cache, function(_) {
    return cljs.core.deref.call(null, method_table)
  });
  return cljs.core.swap_BANG_.call(null, cached_hierarchy, function(_) {
    return cljs.core.deref.call(null, hierarchy)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(x, y, prefer_table) {
  var xprefs__11182 = cljs.core.deref.call(null, prefer_table).call(null, x);
  var or__3824__auto____11184 = cljs.core.truth_(function() {
    var and__3822__auto____11183 = xprefs__11182;
    if(cljs.core.truth_(and__3822__auto____11183)) {
      return xprefs__11182.call(null, y)
    }else {
      return and__3822__auto____11183
    }
  }()) ? true : null;
  if(cljs.core.truth_(or__3824__auto____11184)) {
    return or__3824__auto____11184
  }else {
    var or__3824__auto____11186 = function() {
      var ps__11185 = cljs.core.parents.call(null, y);
      while(true) {
        if(cljs.core.count.call(null, ps__11185) > 0) {
          if(cljs.core.truth_(prefers_STAR_.call(null, x, cljs.core.first.call(null, ps__11185), prefer_table))) {
          }else {
          }
          var G__11189 = cljs.core.rest.call(null, ps__11185);
          ps__11185 = G__11189;
          continue
        }else {
          return null
        }
        break
      }
    }();
    if(cljs.core.truth_(or__3824__auto____11186)) {
      return or__3824__auto____11186
    }else {
      var or__3824__auto____11188 = function() {
        var ps__11187 = cljs.core.parents.call(null, x);
        while(true) {
          if(cljs.core.count.call(null, ps__11187) > 0) {
            if(cljs.core.truth_(prefers_STAR_.call(null, cljs.core.first.call(null, ps__11187), y, prefer_table))) {
            }else {
            }
            var G__11190 = cljs.core.rest.call(null, ps__11187);
            ps__11187 = G__11190;
            continue
          }else {
            return null
          }
          break
        }
      }();
      if(cljs.core.truth_(or__3824__auto____11188)) {
        return or__3824__auto____11188
      }else {
        return false
      }
    }
  }
};
cljs.core.dominates = function dominates(x, y, prefer_table) {
  var or__3824__auto____11192 = cljs.core.prefers_STAR_.call(null, x, y, prefer_table);
  if(cljs.core.truth_(or__3824__auto____11192)) {
    return or__3824__auto____11192
  }else {
    return cljs.core.isa_QMARK_.call(null, x, y)
  }
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(name, dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy) {
  var best_entry__11210 = cljs.core.reduce.call(null, function(be, p__11202) {
    var vec__11203__11204 = p__11202;
    var k__11205 = cljs.core.nth.call(null, vec__11203__11204, 0, null);
    var ___11206 = cljs.core.nth.call(null, vec__11203__11204, 1, null);
    var e__11207 = vec__11203__11204;
    if(cljs.core.isa_QMARK_.call(null, dispatch_val, k__11205)) {
      var be2__11209 = cljs.core.truth_(function() {
        var or__3824__auto____11208 = be == null;
        if(or__3824__auto____11208) {
          return or__3824__auto____11208
        }else {
          return cljs.core.dominates.call(null, k__11205, cljs.core.first.call(null, be), prefer_table)
        }
      }()) ? e__11207 : be;
      if(cljs.core.truth_(cljs.core.dominates.call(null, cljs.core.first.call(null, be2__11209), k__11205, prefer_table))) {
      }else {
        throw new Error([cljs.core.str("Multiple methods in multimethod '"), cljs.core.str(name), cljs.core.str("' match dispatch value: "), cljs.core.str(dispatch_val), cljs.core.str(" -> "), cljs.core.str(k__11205), cljs.core.str(" and "), cljs.core.str(cljs.core.first.call(null, be2__11209)), cljs.core.str(", and neither is preferred")].join(""));
      }
      return be2__11209
    }else {
      return be
    }
  }, null, cljs.core.deref.call(null, method_table));
  if(cljs.core.truth_(best_entry__11210)) {
    if(cljs.core._EQ_.call(null, cljs.core.deref.call(null, cached_hierarchy), cljs.core.deref.call(null, hierarchy))) {
      cljs.core.swap_BANG_.call(null, method_cache, cljs.core.assoc, dispatch_val, cljs.core.second.call(null, best_entry__11210));
      return cljs.core.second.call(null, best_entry__11210)
    }else {
      cljs.core.reset_cache.call(null, method_cache, method_table, cached_hierarchy, hierarchy);
      return find_and_cache_best_method.call(null, name, dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy)
    }
  }else {
    return null
  }
};
cljs.core.IMultiFn = {};
cljs.core._reset = function _reset(mf) {
  if(function() {
    var and__3822__auto____11215 = mf;
    if(and__3822__auto____11215) {
      return mf.cljs$core$IMultiFn$_reset$arity$1
    }else {
      return and__3822__auto____11215
    }
  }()) {
    return mf.cljs$core$IMultiFn$_reset$arity$1(mf)
  }else {
    var x__2363__auto____11216 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____11217 = cljs.core._reset[goog.typeOf(x__2363__auto____11216)];
      if(or__3824__auto____11217) {
        return or__3824__auto____11217
      }else {
        var or__3824__auto____11218 = cljs.core._reset["_"];
        if(or__3824__auto____11218) {
          return or__3824__auto____11218
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-reset", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._add_method = function _add_method(mf, dispatch_val, method) {
  if(function() {
    var and__3822__auto____11223 = mf;
    if(and__3822__auto____11223) {
      return mf.cljs$core$IMultiFn$_add_method$arity$3
    }else {
      return and__3822__auto____11223
    }
  }()) {
    return mf.cljs$core$IMultiFn$_add_method$arity$3(mf, dispatch_val, method)
  }else {
    var x__2363__auto____11224 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____11225 = cljs.core._add_method[goog.typeOf(x__2363__auto____11224)];
      if(or__3824__auto____11225) {
        return or__3824__auto____11225
      }else {
        var or__3824__auto____11226 = cljs.core._add_method["_"];
        if(or__3824__auto____11226) {
          return or__3824__auto____11226
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-add-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, method)
  }
};
cljs.core._remove_method = function _remove_method(mf, dispatch_val) {
  if(function() {
    var and__3822__auto____11231 = mf;
    if(and__3822__auto____11231) {
      return mf.cljs$core$IMultiFn$_remove_method$arity$2
    }else {
      return and__3822__auto____11231
    }
  }()) {
    return mf.cljs$core$IMultiFn$_remove_method$arity$2(mf, dispatch_val)
  }else {
    var x__2363__auto____11232 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____11233 = cljs.core._remove_method[goog.typeOf(x__2363__auto____11232)];
      if(or__3824__auto____11233) {
        return or__3824__auto____11233
      }else {
        var or__3824__auto____11234 = cljs.core._remove_method["_"];
        if(or__3824__auto____11234) {
          return or__3824__auto____11234
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-remove-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._prefer_method = function _prefer_method(mf, dispatch_val, dispatch_val_y) {
  if(function() {
    var and__3822__auto____11239 = mf;
    if(and__3822__auto____11239) {
      return mf.cljs$core$IMultiFn$_prefer_method$arity$3
    }else {
      return and__3822__auto____11239
    }
  }()) {
    return mf.cljs$core$IMultiFn$_prefer_method$arity$3(mf, dispatch_val, dispatch_val_y)
  }else {
    var x__2363__auto____11240 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____11241 = cljs.core._prefer_method[goog.typeOf(x__2363__auto____11240)];
      if(or__3824__auto____11241) {
        return or__3824__auto____11241
      }else {
        var or__3824__auto____11242 = cljs.core._prefer_method["_"];
        if(or__3824__auto____11242) {
          return or__3824__auto____11242
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefer-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, dispatch_val_y)
  }
};
cljs.core._get_method = function _get_method(mf, dispatch_val) {
  if(function() {
    var and__3822__auto____11247 = mf;
    if(and__3822__auto____11247) {
      return mf.cljs$core$IMultiFn$_get_method$arity$2
    }else {
      return and__3822__auto____11247
    }
  }()) {
    return mf.cljs$core$IMultiFn$_get_method$arity$2(mf, dispatch_val)
  }else {
    var x__2363__auto____11248 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____11249 = cljs.core._get_method[goog.typeOf(x__2363__auto____11248)];
      if(or__3824__auto____11249) {
        return or__3824__auto____11249
      }else {
        var or__3824__auto____11250 = cljs.core._get_method["_"];
        if(or__3824__auto____11250) {
          return or__3824__auto____11250
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-get-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._methods = function _methods(mf) {
  if(function() {
    var and__3822__auto____11255 = mf;
    if(and__3822__auto____11255) {
      return mf.cljs$core$IMultiFn$_methods$arity$1
    }else {
      return and__3822__auto____11255
    }
  }()) {
    return mf.cljs$core$IMultiFn$_methods$arity$1(mf)
  }else {
    var x__2363__auto____11256 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____11257 = cljs.core._methods[goog.typeOf(x__2363__auto____11256)];
      if(or__3824__auto____11257) {
        return or__3824__auto____11257
      }else {
        var or__3824__auto____11258 = cljs.core._methods["_"];
        if(or__3824__auto____11258) {
          return or__3824__auto____11258
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-methods", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._prefers = function _prefers(mf) {
  if(function() {
    var and__3822__auto____11263 = mf;
    if(and__3822__auto____11263) {
      return mf.cljs$core$IMultiFn$_prefers$arity$1
    }else {
      return and__3822__auto____11263
    }
  }()) {
    return mf.cljs$core$IMultiFn$_prefers$arity$1(mf)
  }else {
    var x__2363__auto____11264 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____11265 = cljs.core._prefers[goog.typeOf(x__2363__auto____11264)];
      if(or__3824__auto____11265) {
        return or__3824__auto____11265
      }else {
        var or__3824__auto____11266 = cljs.core._prefers["_"];
        if(or__3824__auto____11266) {
          return or__3824__auto____11266
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefers", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._dispatch = function _dispatch(mf, args) {
  if(function() {
    var and__3822__auto____11271 = mf;
    if(and__3822__auto____11271) {
      return mf.cljs$core$IMultiFn$_dispatch$arity$2
    }else {
      return and__3822__auto____11271
    }
  }()) {
    return mf.cljs$core$IMultiFn$_dispatch$arity$2(mf, args)
  }else {
    var x__2363__auto____11272 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____11273 = cljs.core._dispatch[goog.typeOf(x__2363__auto____11272)];
      if(or__3824__auto____11273) {
        return or__3824__auto____11273
      }else {
        var or__3824__auto____11274 = cljs.core._dispatch["_"];
        if(or__3824__auto____11274) {
          return or__3824__auto____11274
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-dispatch", mf);
        }
      }
    }().call(null, mf, args)
  }
};
cljs.core.do_dispatch = function do_dispatch(mf, dispatch_fn, args) {
  var dispatch_val__11277 = cljs.core.apply.call(null, dispatch_fn, args);
  var target_fn__11278 = cljs.core._get_method.call(null, mf, dispatch_val__11277);
  if(cljs.core.truth_(target_fn__11278)) {
  }else {
    throw new Error([cljs.core.str("No method in multimethod '"), cljs.core.str(cljs.core.name), cljs.core.str("' for dispatch value: "), cljs.core.str(dispatch_val__11277)].join(""));
  }
  return cljs.core.apply.call(null, target_fn__11278, args)
};
cljs.core.MultiFn = function(name, dispatch_fn, default_dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy) {
  this.name = name;
  this.dispatch_fn = dispatch_fn;
  this.default_dispatch_val = default_dispatch_val;
  this.hierarchy = hierarchy;
  this.method_table = method_table;
  this.prefer_table = prefer_table;
  this.method_cache = method_cache;
  this.cached_hierarchy = cached_hierarchy;
  this.cljs$lang$protocol_mask$partition0$ = 4194304;
  this.cljs$lang$protocol_mask$partition1$ = 64
};
cljs.core.MultiFn.cljs$lang$type = true;
cljs.core.MultiFn.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/MultiFn")
};
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__11279 = this;
  return goog.getUid(this$)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = function(mf) {
  var this__11280 = this;
  cljs.core.swap_BANG_.call(null, this__11280.method_table, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__11280.method_cache, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__11280.prefer_table, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__11280.cached_hierarchy, function(mf) {
    return null
  });
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = function(mf, dispatch_val, method) {
  var this__11281 = this;
  cljs.core.swap_BANG_.call(null, this__11281.method_table, cljs.core.assoc, dispatch_val, method);
  cljs.core.reset_cache.call(null, this__11281.method_cache, this__11281.method_table, this__11281.cached_hierarchy, this__11281.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = function(mf, dispatch_val) {
  var this__11282 = this;
  cljs.core.swap_BANG_.call(null, this__11282.method_table, cljs.core.dissoc, dispatch_val);
  cljs.core.reset_cache.call(null, this__11282.method_cache, this__11282.method_table, this__11282.cached_hierarchy, this__11282.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = function(mf, dispatch_val) {
  var this__11283 = this;
  if(cljs.core._EQ_.call(null, cljs.core.deref.call(null, this__11283.cached_hierarchy), cljs.core.deref.call(null, this__11283.hierarchy))) {
  }else {
    cljs.core.reset_cache.call(null, this__11283.method_cache, this__11283.method_table, this__11283.cached_hierarchy, this__11283.hierarchy)
  }
  var temp__3971__auto____11284 = cljs.core.deref.call(null, this__11283.method_cache).call(null, dispatch_val);
  if(cljs.core.truth_(temp__3971__auto____11284)) {
    var target_fn__11285 = temp__3971__auto____11284;
    return target_fn__11285
  }else {
    var temp__3971__auto____11286 = cljs.core.find_and_cache_best_method.call(null, this__11283.name, dispatch_val, this__11283.hierarchy, this__11283.method_table, this__11283.prefer_table, this__11283.method_cache, this__11283.cached_hierarchy);
    if(cljs.core.truth_(temp__3971__auto____11286)) {
      var target_fn__11287 = temp__3971__auto____11286;
      return target_fn__11287
    }else {
      return cljs.core.deref.call(null, this__11283.method_table).call(null, this__11283.default_dispatch_val)
    }
  }
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = function(mf, dispatch_val_x, dispatch_val_y) {
  var this__11288 = this;
  if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null, dispatch_val_x, dispatch_val_y, this__11288.prefer_table))) {
    throw new Error([cljs.core.str("Preference conflict in multimethod '"), cljs.core.str(this__11288.name), cljs.core.str("': "), cljs.core.str(dispatch_val_y), cljs.core.str(" is already preferred to "), cljs.core.str(dispatch_val_x)].join(""));
  }else {
  }
  cljs.core.swap_BANG_.call(null, this__11288.prefer_table, function(old) {
    return cljs.core.assoc.call(null, old, dispatch_val_x, cljs.core.conj.call(null, cljs.core._lookup.call(null, old, dispatch_val_x, cljs.core.PersistentHashSet.EMPTY), dispatch_val_y))
  });
  return cljs.core.reset_cache.call(null, this__11288.method_cache, this__11288.method_table, this__11288.cached_hierarchy, this__11288.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = function(mf) {
  var this__11289 = this;
  return cljs.core.deref.call(null, this__11289.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = function(mf) {
  var this__11290 = this;
  return cljs.core.deref.call(null, this__11290.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = function(mf, args) {
  var this__11291 = this;
  return cljs.core.do_dispatch.call(null, mf, this__11291.dispatch_fn, args)
};
cljs.core.MultiFn;
cljs.core.MultiFn.prototype.call = function() {
  var G__11293__delegate = function(_, args) {
    var self__11292 = this;
    return cljs.core._dispatch.call(null, self__11292, args)
  };
  var G__11293 = function(_, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return G__11293__delegate.call(this, _, args)
  };
  G__11293.cljs$lang$maxFixedArity = 1;
  G__11293.cljs$lang$applyTo = function(arglist__11294) {
    var _ = cljs.core.first(arglist__11294);
    var args = cljs.core.rest(arglist__11294);
    return G__11293__delegate(_, args)
  };
  G__11293.cljs$lang$arity$variadic = G__11293__delegate;
  return G__11293
}();
cljs.core.MultiFn.prototype.apply = function(_, args) {
  var self__11295 = this;
  return cljs.core._dispatch.call(null, self__11295, args)
};
cljs.core.remove_all_methods = function remove_all_methods(multifn) {
  return cljs.core._reset.call(null, multifn)
};
cljs.core.remove_method = function remove_method(multifn, dispatch_val) {
  return cljs.core._remove_method.call(null, multifn, dispatch_val)
};
cljs.core.prefer_method = function prefer_method(multifn, dispatch_val_x, dispatch_val_y) {
  return cljs.core._prefer_method.call(null, multifn, dispatch_val_x, dispatch_val_y)
};
cljs.core.methods$ = function methods$(multifn) {
  return cljs.core._methods.call(null, multifn)
};
cljs.core.get_method = function get_method(multifn, dispatch_val) {
  return cljs.core._get_method.call(null, multifn, dispatch_val)
};
cljs.core.prefers = function prefers(multifn) {
  return cljs.core._prefers.call(null, multifn)
};
cljs.core.UUID = function(uuid) {
  this.uuid = uuid;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 543162368
};
cljs.core.UUID.cljs$lang$type = true;
cljs.core.UUID.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/UUID")
};
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__11296 = this;
  return goog.string.hashCode(cljs.core.pr_str.call(null, this$))
};
cljs.core.UUID.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(_11298, _) {
  var this__11297 = this;
  return cljs.core.list.call(null, [cljs.core.str('#uuid "'), cljs.core.str(this__11297.uuid), cljs.core.str('"')].join(""))
};
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(_, other) {
  var this__11299 = this;
  var and__3822__auto____11300 = cljs.core.instance_QMARK_.call(null, cljs.core.UUID, other);
  if(and__3822__auto____11300) {
    return this__11299.uuid === other.uuid
  }else {
    return and__3822__auto____11300
  }
};
cljs.core.UUID.prototype.toString = function() {
  var this__11301 = this;
  var this__11302 = this;
  return cljs.core.pr_str.call(null, this__11302)
};
cljs.core.UUID;
goog.provide("subpar.paredit");
goog.require("cljs.core");
subpar.paredit.code = "c";
subpar.paredit.cmmnt = ";";
subpar.paredit.string = '"';
subpar.paredit.openers = cljs.core.PersistentHashSet.fromArray(["(", "[", "{"]);
subpar.paredit.closers = cljs.core.PersistentHashSet.fromArray([")", "]", "}"]);
subpar.paredit.opener_QMARK_ = function opener_QMARK_(a) {
  return cljs.core.contains_QMARK_.call(null, subpar.paredit.openers, a)
};
subpar.paredit.closer_QMARK_ = function closer_QMARK_(a) {
  return cljs.core.contains_QMARK_.call(null, subpar.paredit.closers, a)
};
subpar.paredit.whitespace_QMARK_ = function whitespace_QMARK_(x) {
  var or__3824__auto____6850 = cljs.core._EQ_.call(null, x, "\t");
  if(or__3824__auto____6850) {
    return or__3824__auto____6850
  }else {
    var or__3824__auto____6851 = cljs.core._EQ_.call(null, x, " ");
    if(or__3824__auto____6851) {
      return or__3824__auto____6851
    }else {
      return cljs.core._EQ_.call(null, x, "\n")
    }
  }
};
subpar.paredit.get_opening_delimiter_index_with_parse = function get_opening_delimiter_index_with_parse(p, i) {
  return cljs.core.nth.call(null, cljs.core.nth.call(null, (new cljs.core.Keyword("\ufdd0'chars")).call(null, p), i), 1)
};
subpar.paredit.get_closing_delimiter_index_with_parse = function get_closing_delimiter_index_with_parse(p, i) {
  return cljs.core.get_in.call(null, p, cljs.core.PersistentVector.fromArray(["\ufdd0'families", subpar.paredit.get_opening_delimiter_index_with_parse.call(null, p, i), "\ufdd0'closer"], true))
};
subpar.paredit.get_opening_delimiter_index = function get_opening_delimiter_index(s, i) {
  return subpar.paredit.get_opening_delimiter_index_with_parse.call(null, subpar.paredit.parse.call(null, s), i)
};
subpar.paredit.get_closing_delimiter_index = function get_closing_delimiter_index(s, i) {
  return subpar.paredit.get_closing_delimiter_index_with_parse.call(null, subpar.paredit.parse.call(null, s), i)
};
subpar.paredit.get_wrapper = function get_wrapper(p, i) {
  return cljs.core.PersistentVector.fromArray([subpar.paredit.get_opening_delimiter_index_with_parse.call(null, p, i), subpar.paredit.get_closing_delimiter_index_with_parse.call(null, p, i)], true)
};
subpar.paredit.get_mode = function get_mode(p, i) {
  return cljs.core.nth.call(null, cljs.core.nth.call(null, (new cljs.core.Keyword("\ufdd0'chars")).call(null, p), i), 0)
};
subpar.paredit.in_QMARK_ = function in_QMARK_(p, i, mode) {
  var and__3822__auto____6855 = function() {
    var and__3822__auto____6854 = 0 <= i;
    if(and__3822__auto____6854) {
      return i <= cljs.core.count.call(null, (new cljs.core.Keyword("\ufdd0'chars")).call(null, p))
    }else {
      return and__3822__auto____6854
    }
  }();
  if(cljs.core.truth_(and__3822__auto____6855)) {
    return cljs.core._EQ_.call(null, mode, subpar.paredit.get_mode.call(null, p, i))
  }else {
    return and__3822__auto____6855
  }
};
subpar.paredit.in_comment_QMARK_ = function in_comment_QMARK_(p, i) {
  return subpar.paredit.in_QMARK_.call(null, p, i, subpar.paredit.cmmnt)
};
subpar.paredit.in_code_QMARK_ = function in_code_QMARK_(p, i) {
  return subpar.paredit.in_QMARK_.call(null, p, i, subpar.paredit.code)
};
subpar.paredit.in_string_QMARK_ = function in_string_QMARK_(p, i) {
  return subpar.paredit.in_QMARK_.call(null, p, i, subpar.paredit.string)
};
subpar.paredit.in_string = function in_string(s, i) {
  return subpar.paredit.in_string_QMARK_.call(null, subpar.paredit.parse.call(null, s), i)
};
subpar.paredit.n_str_QMARK_ = cljs.core.complement.call(null, subpar.paredit.in_string_QMARK_);
subpar.paredit.get_all_siblings = function get_all_siblings(i, p) {
  return cljs.core.get_in.call(null, p, cljs.core.PersistentVector.fromArray(["\ufdd0'families", subpar.paredit.get_opening_delimiter_index_with_parse.call(null, p, i), "\ufdd0'children"], true))
};
subpar.paredit.get_siblings = function get_siblings(i, transform, predicate, p) {
  return cljs.core.sort.call(null, cljs.core.filter.call(null, predicate, transform.call(null, subpar.paredit.get_all_siblings.call(null, i, p))))
};
subpar.paredit.count_lines = function count_lines(s, i, j) {
  var and__3822__auto____6859 = i;
  if(cljs.core.truth_(and__3822__auto____6859)) {
    var and__3822__auto____6860 = j;
    if(cljs.core.truth_(and__3822__auto____6860)) {
      return cljs.core.count.call(null, cljs.core.filter.call(null, function(p1__6856_SHARP_) {
        return cljs.core._EQ_.call(null, "\n", p1__6856_SHARP_)
      }, cljs.core.drop.call(null, i, cljs.core.drop_last.call(null, cljs.core.count.call(null, s) - j - 1, cljs.core.take.call(null, cljs.core.count.call(null, s), s))))) + 1
    }else {
      return and__3822__auto____6860
    }
  }else {
    return and__3822__auto____6859
  }
};
subpar.paredit.escaped_QMARK_ = function escaped_QMARK_(s, i) {
  return cljs.core.odd_QMARK_.call(null, function() {
    var c__6864 = 0;
    var j__6865 = i - 1;
    while(true) {
      var a__6866 = cljs.core.nth.call(null, s, j__6865, null);
      if(j__6865 < 0) {
        return c__6864
      }else {
        if(a__6866 == null) {
          return c__6864
        }else {
          if(cljs.core.not_EQ_.call(null, "\\", a__6866)) {
            return c__6864
          }else {
            if(true) {
              var G__6867 = c__6864 + 1;
              var G__6868 = j__6865 - 1;
              c__6864 = G__6867;
              j__6865 = G__6868;
              continue
            }else {
              return null
            }
          }
        }
      }
      break
    }
  }())
};
subpar.paredit.closes_list_QMARK_ = function closes_list_QMARK_(p, i) {
  return cljs.core.some.call(null, cljs.core.PersistentHashSet.fromArray([i]), cljs.core.map.call(null, "\ufdd0'closer", cljs.core.vals.call(null, (new cljs.core.Keyword("\ufdd0'families")).call(null, p))))
};
subpar.paredit.opens_list_QMARK_ = function opens_list_QMARK_(p, i) {
  return cljs.core.some.call(null, cljs.core.PersistentHashSet.fromArray([i]), cljs.core.keys.call(null, (new cljs.core.Keyword("\ufdd0'families")).call(null, p)))
};
subpar.paredit.backward_up_fn = function backward_up_fn(s, i) {
  var vec__6873__6874 = subpar.paredit.get_wrapper.call(null, subpar.paredit.parse.call(null, s), i);
  var o__6875 = cljs.core.nth.call(null, vec__6873__6874, 0, null);
  var c__6876 = cljs.core.nth.call(null, vec__6873__6874, 1, null);
  if(cljs.core._EQ_.call(null, -1, o__6875)) {
    return i
  }else {
    return o__6875
  }
};
subpar.paredit.forward_delete_action = function forward_delete_action(s, i) {
  var p__6881 = subpar.paredit.parse.call(null, s);
  var h__6882 = i - 1;
  var j__6883 = i + 1;
  var c__6884 = cljs.core.nth.call(null, s, i, null);
  if(i >= cljs.core.count.call(null, s)) {
    return 0
  }else {
    if(cljs.core.truth_(subpar.paredit.escaped_QMARK_.call(null, s, i))) {
      return 2
    }else {
      if(cljs.core.truth_(subpar.paredit.escaped_QMARK_.call(null, s, j__6883))) {
        return 3
      }else {
        if(cljs.core._EQ_.call(null, cljs.core.PersistentVector.fromArray([h__6882, i], true), subpar.paredit.get_wrapper.call(null, p__6881, i))) {
          return 2
        }else {
          if(cljs.core.truth_(subpar.paredit.closes_list_QMARK_.call(null, p__6881, i))) {
            return 0
          }else {
            if(cljs.core._EQ_.call(null, cljs.core.PersistentVector.fromArray([i, j__6883], true), subpar.paredit.get_wrapper.call(null, p__6881, j__6883))) {
              return 3
            }else {
              if(cljs.core.truth_(subpar.paredit.opens_list_QMARK_.call(null, p__6881, i))) {
                return 4
              }else {
                if(true) {
                  return 1
                }else {
                  return null
                }
              }
            }
          }
        }
      }
    }
  }
};
subpar.paredit.backward_delete_action = function backward_delete_action(s, i) {
  var p__6888 = subpar.paredit.parse.call(null, s);
  var g__6889 = i - 2;
  var h__6890 = i - 1;
  if(i <= 0) {
    return 0
  }else {
    if(cljs.core.truth_(subpar.paredit.escaped_QMARK_.call(null, s, h__6890))) {
      return 3
    }else {
      if(cljs.core.truth_(subpar.paredit.escaped_QMARK_.call(null, s, i))) {
        return 2
      }else {
        if(cljs.core._EQ_.call(null, cljs.core.PersistentVector.fromArray([g__6889, h__6890], true), subpar.paredit.get_wrapper.call(null, p__6888, h__6890))) {
          return 3
        }else {
          if(cljs.core.truth_(subpar.paredit.closes_list_QMARK_.call(null, p__6888, h__6890))) {
            return 4
          }else {
            if(cljs.core._EQ_.call(null, cljs.core.PersistentVector.fromArray([h__6890, i], true), subpar.paredit.get_wrapper.call(null, p__6888, i))) {
              return 2
            }else {
              if(cljs.core.truth_(subpar.paredit.opens_list_QMARK_.call(null, p__6888, h__6890))) {
                return 0
              }else {
                if(true) {
                  return 1
                }else {
                  return null
                }
              }
            }
          }
        }
      }
    }
  }
};
subpar.paredit.double_quote_action = function double_quote_action(s, i) {
  var p__6892 = subpar.paredit.parse.call(null, s);
  if(i < 0) {
    return 0
  }else {
    if(i >= cljs.core.count.call(null, s)) {
      return 0
    }else {
      if(cljs.core.truth_(subpar.paredit.in_comment_QMARK_.call(null, p__6892, i))) {
        return 3
      }else {
        if(cljs.core.truth_(subpar.paredit.n_str_QMARK_.call(null, p__6892, i))) {
          return 0
        }else {
          if(cljs.core._EQ_.call(null, '"', cljs.core.nth.call(null, s, i))) {
            return 2
          }else {
            if("\ufdd0'escaping") {
              return 1
            }else {
              return null
            }
          }
        }
      }
    }
  }
};
subpar.paredit.close_expression_vals = function close_expression_vals(p, i) {
  var vec__6902__6903 = subpar.paredit.get_wrapper.call(null, p, i);
  var o__6904 = cljs.core.nth.call(null, vec__6902__6903, 0, null);
  var c__6905 = cljs.core.nth.call(null, vec__6902__6903, 1, null);
  if(cljs.core._EQ_.call(null, -1, o__6904)) {
    return cljs.core.PersistentVector.EMPTY
  }else {
    var start__6907 = function() {
      var or__3824__auto____6906 = cljs.core.last.call(null, subpar.paredit.get_siblings.call(null, i, cljs.core.vals, cljs.core.identity, p));
      if(cljs.core.truth_(or__3824__auto____6906)) {
        return or__3824__auto____6906
      }else {
        return o__6904
      }
    }() + 1;
    var delete__6908 = cljs.core.not_EQ_.call(null, start__6907, c__6905);
    var dest__6909 = delete__6908 ? start__6907 + 1 : c__6905 + 1;
    return cljs.core.PersistentVector.fromArray([delete__6908, start__6907, c__6905, dest__6909], true)
  }
};
subpar.paredit.get_start_of_next_list = function get_start_of_next_list(s, i) {
  var p__6913 = subpar.paredit.parse.call(null, s);
  var r__6915 = cljs.core.first.call(null, subpar.paredit.get_siblings.call(null, i, cljs.core.keys, function(p1__6893_SHARP_) {
    var and__3822__auto____6914 = p1__6893_SHARP_ >= i;
    if(and__3822__auto____6914) {
      return cljs.core.get_in.call(null, p__6913, cljs.core.PersistentVector.fromArray(["\ufdd0'families", p1__6893_SHARP_], true))
    }else {
      return and__3822__auto____6914
    }
  }, p__6913));
  if(r__6915 == null) {
    return false
  }else {
    return r__6915
  }
};
subpar.paredit.forward_down_fn = function forward_down_fn(s, i) {
  var r__6918 = subpar.paredit.get_start_of_next_list.call(null, s, i);
  if(cljs.core.truth_(r__6918)) {
    return r__6918 + 1
  }else {
    return i
  }
};
subpar.paredit.backward_fn = function backward_fn(s, i) {
  var p__6924 = subpar.paredit.parse.call(null, s);
  var b__6925 = cljs.core.last.call(null, subpar.paredit.get_siblings.call(null, i, cljs.core.keys, function(p1__6916_SHARP_) {
    return p1__6916_SHARP_ < i
  }, p__6924));
  var o__6926 = subpar.paredit.get_opening_delimiter_index_with_parse.call(null, p__6924, i);
  var or__3824__auto____6927 = b__6925;
  if(cljs.core.truth_(or__3824__auto____6927)) {
    return or__3824__auto____6927
  }else {
    if(o__6926 < 0) {
      return 0
    }else {
      return o__6926
    }
  }
};
subpar.paredit.backward_down_fn = function backward_down_fn(s, i) {
  var p__6932 = subpar.paredit.parse.call(null, s);
  var b__6934 = cljs.core.last.call(null, subpar.paredit.get_siblings.call(null, i, cljs.core.vals, function(p1__6919_SHARP_) {
    var and__3822__auto____6933 = p1__6919_SHARP_ < i;
    if(and__3822__auto____6933) {
      return subpar.paredit.closes_list_QMARK_.call(null, p__6932, p1__6919_SHARP_)
    }else {
      return and__3822__auto____6933
    }
  }, p__6932));
  var or__3824__auto____6935 = b__6934;
  if(cljs.core.truth_(or__3824__auto____6935)) {
    return or__3824__auto____6935
  }else {
    return i
  }
};
subpar.paredit.forward_up_fn = function forward_up_fn(s, i) {
  var p__6944 = subpar.paredit.parse.call(null, s);
  var vec__6943__6945 = subpar.paredit.get_wrapper.call(null, p__6944, i);
  var o__6946 = cljs.core.nth.call(null, vec__6943__6945, 0, null);
  var c__6947 = cljs.core.nth.call(null, vec__6943__6945, 1, null);
  var in_list__6948 = cljs.core.not_EQ_.call(null, -1, o__6946);
  if(in_list__6948) {
    return c__6947 + 1
  }else {
    return i
  }
};
subpar.paredit.forward_fn = function forward_fn(s, i) {
  var p__6954 = subpar.paredit.parse.call(null, s);
  var b__6955 = cljs.core.first.call(null, subpar.paredit.get_siblings.call(null, i, cljs.core.vals, function(p1__6936_SHARP_) {
    return p1__6936_SHARP_ >= i
  }, p__6954));
  var c__6956 = subpar.paredit.get_closing_delimiter_index_with_parse.call(null, p__6954, i);
  var l__6957 = cljs.core.count.call(null, s);
  if(cljs.core.truth_(b__6955)) {
    return b__6955 + 1
  }else {
    if(cljs.core.truth_(c__6956)) {
      return c__6956 + 1 < l__6957 ? c__6956 + 1 : l__6957
    }else {
      if(true) {
        return l__6957
      }else {
        return null
      }
    }
  }
};
subpar.paredit.forward_slurp_vals = function forward_slurp_vals(s, i) {
  var p__6972 = subpar.paredit.parse.call(null, s);
  var vec__6971__6973 = subpar.paredit.get_wrapper.call(null, p__6972, i);
  var o__6974 = cljs.core.nth.call(null, vec__6971__6973, 0, null);
  var c__6975 = cljs.core.nth.call(null, vec__6971__6973, 1, null);
  var in_list__6976 = cljs.core.not_EQ_.call(null, -1, o__6974);
  var a__6978 = function() {
    var and__3822__auto____6977 = in_list__6976;
    if(and__3822__auto____6977) {
      return cljs.core.nth.call(null, s, c__6975, false)
    }else {
      return and__3822__auto____6977
    }
  }();
  var d__6980 = function() {
    var and__3822__auto____6979 = in_list__6976;
    if(and__3822__auto____6979) {
      return cljs.core.first.call(null, subpar.paredit.get_siblings.call(null, o__6974, cljs.core.vals, function(p1__6949_SHARP_) {
        return p1__6949_SHARP_ > c__6975
      }, p__6972))
    }else {
      return and__3822__auto____6979
    }
  }();
  if(cljs.core.truth_(function() {
    var and__3822__auto____6981 = a__6978;
    if(cljs.core.truth_(and__3822__auto____6981)) {
      var and__3822__auto____6982 = c__6975;
      if(cljs.core.truth_(and__3822__auto____6982)) {
        return d__6980
      }else {
        return and__3822__auto____6982
      }
    }else {
      return and__3822__auto____6981
    }
  }())) {
    return cljs.core.PersistentVector.fromArray([a__6978, c__6975, d__6980 + 1, subpar.paredit.count_lines.call(null, s, o__6974, d__6980 + 1)], true)
  }else {
    return cljs.core.PersistentVector.EMPTY
  }
};
subpar.paredit.backward_slurp_vals = function backward_slurp_vals(s, i) {
  var p__6995 = subpar.paredit.parse.call(null, s);
  var vec__6994__6996 = subpar.paredit.get_wrapper.call(null, p__6995, i);
  var o__6997 = cljs.core.nth.call(null, vec__6994__6996, 0, null);
  var c__6998 = cljs.core.nth.call(null, vec__6994__6996, 1, null);
  var in_list__6999 = cljs.core.not_EQ_.call(null, -1, o__6997);
  var d__7001 = function() {
    var and__3822__auto____7000 = in_list__6999;
    if(and__3822__auto____7000) {
      return cljs.core.last.call(null, subpar.paredit.get_siblings.call(null, o__6997, cljs.core.keys, function(p1__6958_SHARP_) {
        return p1__6958_SHARP_ < o__6997
      }, p__6995))
    }else {
      return and__3822__auto____7000
    }
  }();
  var a__7003 = function() {
    var and__3822__auto____7002 = in_list__6999;
    if(and__3822__auto____7002) {
      return cljs.core.nth.call(null, s, o__6997, false)
    }else {
      return and__3822__auto____7002
    }
  }();
  if(cljs.core.truth_(function() {
    var and__3822__auto____7004 = a__7003;
    if(cljs.core.truth_(and__3822__auto____7004)) {
      return d__7001
    }else {
      return and__3822__auto____7004
    }
  }())) {
    return cljs.core.PersistentVector.fromArray([a__7003, o__6997, d__7001, subpar.paredit.count_lines.call(null, s, d__7001, c__6998)], true)
  }else {
    return cljs.core.PersistentVector.EMPTY
  }
};
subpar.paredit.forward_barf_vals = function forward_barf_vals(s, i) {
  var p__7020 = subpar.paredit.parse.call(null, s);
  var vec__7019__7021 = subpar.paredit.get_wrapper.call(null, p__7020, i);
  var o__7022 = cljs.core.nth.call(null, vec__7019__7021, 0, null);
  var c__7023 = cljs.core.nth.call(null, vec__7019__7021, 1, null);
  var in_list__7024 = cljs.core.not_EQ_.call(null, -1, o__7022);
  var endings__7026 = function() {
    var and__3822__auto____7025 = in_list__7024;
    if(and__3822__auto____7025) {
      return subpar.paredit.get_siblings.call(null, i, cljs.core.vals, cljs.core.constantly.call(null, true), p__7020)
    }else {
      return and__3822__auto____7025
    }
  }();
  var a__7029 = function() {
    var and__3822__auto____7027 = c__7023;
    if(cljs.core.truth_(and__3822__auto____7027)) {
      var and__3822__auto____7028 = in_list__7024;
      if(and__3822__auto____7028) {
        return cljs.core.nth.call(null, s, c__7023, null)
      }else {
        return and__3822__auto____7028
      }
    }else {
      return and__3822__auto____7027
    }
  }();
  var r__7031 = function() {
    var or__3824__auto____7030 = subpar.paredit.count_lines.call(null, s, o__7022, c__7023);
    if(cljs.core.truth_(or__3824__auto____7030)) {
      return or__3824__auto____7030
    }else {
      return 1
    }
  }();
  var num__7032 = cljs.core.truth_(endings__7026) ? cljs.core.count.call(null, endings__7026) : 0;
  if(num__7032 > 1) {
    return cljs.core.PersistentVector.fromArray([a__7029, c__7023, cljs.core.nth.call(null, endings__7026, num__7032 - 2) + 1, false, r__7031, o__7022], true)
  }else {
    if(cljs.core._EQ_.call(null, num__7032, 1)) {
      return cljs.core.PersistentVector.fromArray([a__7029, c__7023, o__7022 + 1, true, r__7031, o__7022], true)
    }else {
      if(true) {
        return cljs.core.PersistentVector.EMPTY
      }else {
        return null
      }
    }
  }
};
subpar.paredit.backward_barf_vals = function backward_barf_vals(s, i) {
  var p__7048 = subpar.paredit.parse.call(null, s);
  var vec__7047__7049 = subpar.paredit.get_wrapper.call(null, p__7048, i);
  var o__7050 = cljs.core.nth.call(null, vec__7047__7049, 0, null);
  var c__7051 = cljs.core.nth.call(null, vec__7047__7049, 1, null);
  var in_list__7052 = cljs.core.not_EQ_.call(null, -1, o__7050);
  var starts__7054 = function() {
    var and__3822__auto____7053 = in_list__7052;
    if(and__3822__auto____7053) {
      return subpar.paredit.get_siblings.call(null, i, cljs.core.keys, cljs.core.constantly.call(null, true), p__7048)
    }else {
      return and__3822__auto____7053
    }
  }();
  var a__7057 = function() {
    var and__3822__auto____7055 = o__7050;
    if(cljs.core.truth_(and__3822__auto____7055)) {
      var and__3822__auto____7056 = in_list__7052;
      if(and__3822__auto____7056) {
        return cljs.core.nth.call(null, s, o__7050, null)
      }else {
        return and__3822__auto____7056
      }
    }else {
      return and__3822__auto____7055
    }
  }();
  var r__7059 = function() {
    var or__3824__auto____7058 = subpar.paredit.count_lines.call(null, s, o__7050, c__7051);
    if(cljs.core.truth_(or__3824__auto____7058)) {
      return or__3824__auto____7058
    }else {
      return 1
    }
  }();
  var num__7060 = cljs.core.truth_(starts__7054) ? cljs.core.count.call(null, starts__7054) : 0;
  if(num__7060 > 1) {
    return cljs.core.PersistentVector.fromArray([a__7057, o__7050, cljs.core.second.call(null, starts__7054), false, r__7059], true)
  }else {
    if(cljs.core._EQ_.call(null, num__7060, 1)) {
      return cljs.core.PersistentVector.fromArray([a__7057, o__7050, c__7051, true, r__7059], true)
    }else {
      if(true) {
        return cljs.core.PersistentVector.EMPTY
      }else {
        return null
      }
    }
  }
};
subpar.paredit.splice_vals = function splice_vals(s, i) {
  var p__7073 = subpar.paredit.parse.call(null, s);
  var vec__7072__7074 = subpar.paredit.get_wrapper.call(null, p__7073, i);
  var o__7075 = cljs.core.nth.call(null, vec__7072__7074, 0, null);
  var c__7076 = cljs.core.nth.call(null, vec__7072__7074, 1, null);
  var in_list__7077 = cljs.core.not_EQ_.call(null, -1, o__7075);
  if(in_list__7077) {
    var vec__7078__7079 = subpar.paredit.get_wrapper.call(null, p__7073, o__7075);
    var n__7080 = cljs.core.nth.call(null, vec__7078__7079, 0, null);
    var d__7081 = cljs.core.nth.call(null, vec__7078__7079, 1, null);
    var r__7082 = subpar.paredit.count_lines.call(null, s, n__7080, d__7081);
    return cljs.core.PersistentVector.fromArray([o__7075, c__7076, 0 > n__7080 ? 0 : n__7080, r__7082], true)
  }else {
    return cljs.core.PersistentVector.EMPTY
  }
};
subpar.paredit.splice_delete_backward_vals = function splice_delete_backward_vals(s, i) {
  var p__7095 = subpar.paredit.parse.call(null, s);
  var vec__7094__7096 = subpar.paredit.get_wrapper.call(null, p__7095, i);
  var o__7097 = cljs.core.nth.call(null, vec__7094__7096, 0, null);
  var c__7098 = cljs.core.nth.call(null, vec__7094__7096, 1, null);
  var in_list__7099 = cljs.core.not_EQ_.call(null, -1, o__7097);
  if(in_list__7099) {
    var vec__7100__7101 = subpar.paredit.get_wrapper.call(null, p__7095, o__7097);
    var n__7102 = cljs.core.nth.call(null, vec__7100__7101, 0, null);
    var d__7103 = cljs.core.nth.call(null, vec__7100__7101, 1, null);
    var r__7104 = subpar.paredit.count_lines.call(null, s, n__7102, d__7103);
    return cljs.core.PersistentVector.fromArray([o__7097, o__7097 > i ? o__7097 : i, c__7098, 0 > n__7102 ? 0 : n__7102, r__7104], true)
  }else {
    return cljs.core.PersistentVector.EMPTY
  }
};
subpar.paredit.splice_delete_forward_vals = function splice_delete_forward_vals(s, i) {
  var p__7117 = subpar.paredit.parse.call(null, s);
  var vec__7116__7118 = subpar.paredit.get_wrapper.call(null, p__7117, i);
  var o__7119 = cljs.core.nth.call(null, vec__7116__7118, 0, null);
  var c__7120 = cljs.core.nth.call(null, vec__7116__7118, 1, null);
  var in_list__7121 = cljs.core.not_EQ_.call(null, -1, o__7119);
  if(in_list__7121) {
    var vec__7122__7123 = subpar.paredit.get_wrapper.call(null, p__7117, o__7119);
    var n__7124 = cljs.core.nth.call(null, vec__7122__7123, 0, null);
    var d__7125 = cljs.core.nth.call(null, vec__7122__7123, 1, null);
    var r__7126 = subpar.paredit.count_lines.call(null, s, n__7124, d__7125);
    return cljs.core.PersistentVector.fromArray([o__7119, i, c__7120 + 1, 0 > n__7124 ? 0 : n__7124, r__7126], true)
  }else {
    return cljs.core.PersistentVector.EMPTY
  }
};
subpar.paredit.parse = function parse(ss) {
  var s__7165 = [cljs.core.str(ss), cljs.core.str(" ")].join("");
  var i__7166 = 0;
  var mode__7167 = subpar.paredit.code;
  var openings__7168 = cljs.core.list.call(null, -1);
  var start__7169 = -1;
  var t__7170 = cljs.core.PersistentVector.EMPTY;
  var families__7171 = cljs.core.PersistentArrayMap.fromArrays([-1], [cljs.core.ObjMap.fromObject(["\ufdd0'children"], {"\ufdd0'children":cljs.core.ObjMap.EMPTY})]);
  var escaping__7172 = false;
  var in_word__7173 = false;
  while(true) {
    var a__7174 = cljs.core.nth.call(null, s__7165, i__7166, null);
    var j__7175 = i__7166 + 1;
    var o__7176 = cljs.core.peek.call(null, openings__7168);
    if(cljs.core.truth_(function() {
      var and__3822__auto____7177 = a__7174 == null;
      if(and__3822__auto____7177) {
        return in_word__7173
      }else {
        return and__3822__auto____7177
      }
    }())) {
      return cljs.core.ObjMap.fromObject(["\ufdd0'chars", "\ufdd0'families"], {"\ufdd0'chars":t__7170, "\ufdd0'families":cljs.core.assoc_in.call(null, cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([-1, "\ufdd0'closer"], true), i__7166 - 1), cljs.core.PersistentVector.fromArray([-1, "\ufdd0'children", start__7169], true), i__7166 - 1)})
    }else {
      if(a__7174 == null) {
        return cljs.core.ObjMap.fromObject(["\ufdd0'chars", "\ufdd0'families"], {"\ufdd0'chars":t__7170, "\ufdd0'families":cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([-1, "\ufdd0'closer"], true), i__7166 - 1)})
      }else {
        if(function() {
          var and__3822__auto____7178 = cljs.core.not_EQ_.call(null, subpar.paredit.cmmnt, mode__7167);
          if(and__3822__auto____7178) {
            var and__3822__auto____7179 = cljs.core._EQ_.call(null, "\\", a__7174);
            if(and__3822__auto____7179) {
              var and__3822__auto____7180 = cljs.core.not.call(null, escaping__7172);
              if(and__3822__auto____7180) {
                return cljs.core.not.call(null, in_word__7173)
              }else {
                return and__3822__auto____7180
              }
            }else {
              return and__3822__auto____7179
            }
          }else {
            return and__3822__auto____7178
          }
        }()) {
          var G__7203 = j__7175;
          var G__7204 = mode__7167;
          var G__7205 = openings__7168;
          var G__7206 = i__7166;
          var G__7207 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
          var G__7208 = cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'children", i__7166], true), j__7175);
          var G__7209 = true;
          var G__7210 = true;
          i__7166 = G__7203;
          mode__7167 = G__7204;
          openings__7168 = G__7205;
          start__7169 = G__7206;
          t__7170 = G__7207;
          families__7171 = G__7208;
          escaping__7172 = G__7209;
          in_word__7173 = G__7210;
          continue
        }else {
          if(function() {
            var and__3822__auto____7181 = cljs.core.not_EQ_.call(null, subpar.paredit.cmmnt, mode__7167);
            if(and__3822__auto____7181) {
              var and__3822__auto____7182 = cljs.core._EQ_.call(null, "\\", a__7174);
              if(and__3822__auto____7182) {
                return cljs.core.not.call(null, escaping__7172)
              }else {
                return and__3822__auto____7182
              }
            }else {
              return and__3822__auto____7181
            }
          }()) {
            var G__7211 = j__7175;
            var G__7212 = mode__7167;
            var G__7213 = openings__7168;
            var G__7214 = i__7166;
            var G__7215 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
            var G__7216 = families__7171;
            var G__7217 = true;
            var G__7218 = true;
            i__7166 = G__7211;
            mode__7167 = G__7212;
            openings__7168 = G__7213;
            start__7169 = G__7214;
            t__7170 = G__7215;
            families__7171 = G__7216;
            escaping__7172 = G__7217;
            in_word__7173 = G__7218;
            continue
          }else {
            if(function() {
              var and__3822__auto____7183 = cljs.core._EQ_.call(null, subpar.paredit.code, mode__7167);
              if(and__3822__auto____7183) {
                var and__3822__auto____7184 = cljs.core._EQ_.call(null, ";", a__7174);
                if(and__3822__auto____7184) {
                  return cljs.core.not.call(null, escaping__7172)
                }else {
                  return and__3822__auto____7184
                }
              }else {
                return and__3822__auto____7183
              }
            }()) {
              var G__7219 = j__7175;
              var G__7220 = subpar.paredit.cmmnt;
              var G__7221 = openings__7168;
              var G__7222 = start__7169;
              var G__7223 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
              var G__7224 = families__7171;
              var G__7225 = false;
              var G__7226 = false;
              i__7166 = G__7219;
              mode__7167 = G__7220;
              openings__7168 = G__7221;
              start__7169 = G__7222;
              t__7170 = G__7223;
              families__7171 = G__7224;
              escaping__7172 = G__7225;
              in_word__7173 = G__7226;
              continue
            }else {
              if(function() {
                var and__3822__auto____7185 = cljs.core._EQ_.call(null, subpar.paredit.cmmnt, mode__7167);
                if(and__3822__auto____7185) {
                  return cljs.core._EQ_.call(null, "\n", a__7174)
                }else {
                  return and__3822__auto____7185
                }
              }()) {
                var G__7227 = j__7175;
                var G__7228 = subpar.paredit.code;
                var G__7229 = openings__7168;
                var G__7230 = start__7169;
                var G__7231 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                var G__7232 = families__7171;
                var G__7233 = false;
                var G__7234 = false;
                i__7166 = G__7227;
                mode__7167 = G__7228;
                openings__7168 = G__7229;
                start__7169 = G__7230;
                t__7170 = G__7231;
                families__7171 = G__7232;
                escaping__7172 = G__7233;
                in_word__7173 = G__7234;
                continue
              }else {
                if(cljs.core._EQ_.call(null, subpar.paredit.cmmnt, mode__7167)) {
                  var G__7235 = j__7175;
                  var G__7236 = subpar.paredit.cmmnt;
                  var G__7237 = openings__7168;
                  var G__7238 = start__7169;
                  var G__7239 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                  var G__7240 = families__7171;
                  var G__7241 = false;
                  var G__7242 = false;
                  i__7166 = G__7235;
                  mode__7167 = G__7236;
                  openings__7168 = G__7237;
                  start__7169 = G__7238;
                  t__7170 = G__7239;
                  families__7171 = G__7240;
                  escaping__7172 = G__7241;
                  in_word__7173 = G__7242;
                  continue
                }else {
                  if(function() {
                    var and__3822__auto____7186 = cljs.core._EQ_.call(null, subpar.paredit.code, mode__7167);
                    if(and__3822__auto____7186) {
                      var and__3822__auto____7187 = cljs.core._EQ_.call(null, '"', a__7174);
                      if(and__3822__auto____7187) {
                        return cljs.core.not.call(null, escaping__7172)
                      }else {
                        return and__3822__auto____7187
                      }
                    }else {
                      return and__3822__auto____7186
                    }
                  }()) {
                    var G__7243 = j__7175;
                    var G__7244 = subpar.paredit.string;
                    var G__7245 = cljs.core.conj.call(null, openings__7168, i__7166);
                    var G__7246 = -1;
                    var G__7247 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                    var G__7248 = cljs.core.assoc_in.call(null, cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([i__7166, "\ufdd0'children"], true), cljs.core.ObjMap.EMPTY), cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'children", i__7166], true), j__7175);
                    var G__7249 = false;
                    var G__7250 = false;
                    i__7166 = G__7243;
                    mode__7167 = G__7244;
                    openings__7168 = G__7245;
                    start__7169 = G__7246;
                    t__7170 = G__7247;
                    families__7171 = G__7248;
                    escaping__7172 = G__7249;
                    in_word__7173 = G__7250;
                    continue
                  }else {
                    if(cljs.core.truth_(function() {
                      var and__3822__auto____7188 = cljs.core._EQ_.call(null, subpar.paredit.string, mode__7167);
                      if(and__3822__auto____7188) {
                        var and__3822__auto____7189 = cljs.core._EQ_.call(null, '"', a__7174);
                        if(and__3822__auto____7189) {
                          var and__3822__auto____7190 = cljs.core.not.call(null, escaping__7172);
                          if(and__3822__auto____7190) {
                            return in_word__7173
                          }else {
                            return and__3822__auto____7190
                          }
                        }else {
                          return and__3822__auto____7189
                        }
                      }else {
                        return and__3822__auto____7188
                      }
                    }())) {
                      var G__7251 = j__7175;
                      var G__7252 = subpar.paredit.code;
                      var G__7253 = cljs.core.pop.call(null, openings__7168);
                      var G__7254 = -1;
                      var G__7255 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                      var G__7256 = cljs.core.assoc_in.call(null, cljs.core.assoc_in.call(null, cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'closer"], true), i__7166), cljs.core.PersistentVector.fromArray([cljs.core.second.call(null, openings__7168), "\ufdd0'children", o__7176], true), i__7166), cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'children", start__7169], true), i__7166 - 1);
                      var G__7257 = false;
                      var G__7258 = false;
                      i__7166 = G__7251;
                      mode__7167 = G__7252;
                      openings__7168 = G__7253;
                      start__7169 = G__7254;
                      t__7170 = G__7255;
                      families__7171 = G__7256;
                      escaping__7172 = G__7257;
                      in_word__7173 = G__7258;
                      continue
                    }else {
                      if(function() {
                        var and__3822__auto____7191 = cljs.core._EQ_.call(null, subpar.paredit.string, mode__7167);
                        if(and__3822__auto____7191) {
                          var and__3822__auto____7192 = cljs.core._EQ_.call(null, '"', a__7174);
                          if(and__3822__auto____7192) {
                            return cljs.core.not.call(null, escaping__7172)
                          }else {
                            return and__3822__auto____7192
                          }
                        }else {
                          return and__3822__auto____7191
                        }
                      }()) {
                        var G__7259 = j__7175;
                        var G__7260 = subpar.paredit.code;
                        var G__7261 = cljs.core.pop.call(null, openings__7168);
                        var G__7262 = -1;
                        var G__7263 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                        var G__7264 = cljs.core.assoc_in.call(null, cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'closer"], true), i__7166), cljs.core.PersistentVector.fromArray([cljs.core.second.call(null, openings__7168), "\ufdd0'children", o__7176], true), i__7166);
                        var G__7265 = false;
                        var G__7266 = false;
                        i__7166 = G__7259;
                        mode__7167 = G__7260;
                        openings__7168 = G__7261;
                        start__7169 = G__7262;
                        t__7170 = G__7263;
                        families__7171 = G__7264;
                        escaping__7172 = G__7265;
                        in_word__7173 = G__7266;
                        continue
                      }else {
                        if(function() {
                          var and__3822__auto____7193 = cljs.core._EQ_.call(null, subpar.paredit.string, mode__7167);
                          if(and__3822__auto____7193) {
                            var and__3822__auto____7194 = cljs.core.not.call(null, subpar.paredit.whitespace_QMARK_.call(null, a__7174));
                            if(and__3822__auto____7194) {
                              return cljs.core.not.call(null, in_word__7173)
                            }else {
                              return and__3822__auto____7194
                            }
                          }else {
                            return and__3822__auto____7193
                          }
                        }()) {
                          var G__7267 = j__7175;
                          var G__7268 = subpar.paredit.string;
                          var G__7269 = openings__7168;
                          var G__7270 = i__7166;
                          var G__7271 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                          var G__7272 = cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'children", i__7166], true), i__7166);
                          var G__7273 = false;
                          var G__7274 = true;
                          i__7166 = G__7267;
                          mode__7167 = G__7268;
                          openings__7168 = G__7269;
                          start__7169 = G__7270;
                          t__7170 = G__7271;
                          families__7171 = G__7272;
                          escaping__7172 = G__7273;
                          in_word__7173 = G__7274;
                          continue
                        }else {
                          if(cljs.core.truth_(function() {
                            var and__3822__auto____7195 = cljs.core._EQ_.call(null, subpar.paredit.string, mode__7167);
                            if(and__3822__auto____7195) {
                              var and__3822__auto____7196 = subpar.paredit.whitespace_QMARK_.call(null, a__7174);
                              if(cljs.core.truth_(and__3822__auto____7196)) {
                                return in_word__7173
                              }else {
                                return and__3822__auto____7196
                              }
                            }else {
                              return and__3822__auto____7195
                            }
                          }())) {
                            var G__7275 = j__7175;
                            var G__7276 = subpar.paredit.string;
                            var G__7277 = openings__7168;
                            var G__7278 = -1;
                            var G__7279 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                            var G__7280 = cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'children", start__7169], true), i__7166 - 1);
                            var G__7281 = false;
                            var G__7282 = false;
                            i__7166 = G__7275;
                            mode__7167 = G__7276;
                            openings__7168 = G__7277;
                            start__7169 = G__7278;
                            t__7170 = G__7279;
                            families__7171 = G__7280;
                            escaping__7172 = G__7281;
                            in_word__7173 = G__7282;
                            continue
                          }else {
                            if(cljs.core._EQ_.call(null, subpar.paredit.string, mode__7167)) {
                              var G__7283 = j__7175;
                              var G__7284 = subpar.paredit.string;
                              var G__7285 = openings__7168;
                              var G__7286 = start__7169;
                              var G__7287 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                              var G__7288 = families__7171;
                              var G__7289 = false;
                              var G__7290 = in_word__7173;
                              i__7166 = G__7283;
                              mode__7167 = G__7284;
                              openings__7168 = G__7285;
                              start__7169 = G__7286;
                              t__7170 = G__7287;
                              families__7171 = G__7288;
                              escaping__7172 = G__7289;
                              in_word__7173 = G__7290;
                              continue
                            }else {
                              if(cljs.core.truth_(function() {
                                var and__3822__auto____7197 = subpar.paredit.opener_QMARK_.call(null, a__7174);
                                if(cljs.core.truth_(and__3822__auto____7197)) {
                                  return in_word__7173
                                }else {
                                  return and__3822__auto____7197
                                }
                              }())) {
                                var G__7291 = j__7175;
                                var G__7292 = subpar.paredit.code;
                                var G__7293 = cljs.core.conj.call(null, openings__7168, i__7166);
                                var G__7294 = -1;
                                var G__7295 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                                var G__7296 = cljs.core.assoc_in.call(null, cljs.core.assoc_in.call(null, cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'children", start__7169], true), i__7166 - 1), cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'children", i__7166], true), i__7166), cljs.core.PersistentVector.fromArray([i__7166, "\ufdd0'children"], true), cljs.core.ObjMap.EMPTY);
                                var G__7297 = false;
                                var G__7298 = false;
                                i__7166 = G__7291;
                                mode__7167 = G__7292;
                                openings__7168 = G__7293;
                                start__7169 = G__7294;
                                t__7170 = G__7295;
                                families__7171 = G__7296;
                                escaping__7172 = G__7297;
                                in_word__7173 = G__7298;
                                continue
                              }else {
                                if(cljs.core.truth_(subpar.paredit.opener_QMARK_.call(null, a__7174))) {
                                  var G__7299 = j__7175;
                                  var G__7300 = subpar.paredit.code;
                                  var G__7301 = cljs.core.conj.call(null, openings__7168, i__7166);
                                  var G__7302 = -1;
                                  var G__7303 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                                  var G__7304 = cljs.core.assoc_in.call(null, cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'children", i__7166], true), i__7166), cljs.core.PersistentVector.fromArray([i__7166, "\ufdd0'children"], true), cljs.core.ObjMap.EMPTY);
                                  var G__7305 = false;
                                  var G__7306 = false;
                                  i__7166 = G__7299;
                                  mode__7167 = G__7300;
                                  openings__7168 = G__7301;
                                  start__7169 = G__7302;
                                  t__7170 = G__7303;
                                  families__7171 = G__7304;
                                  escaping__7172 = G__7305;
                                  in_word__7173 = G__7306;
                                  continue
                                }else {
                                  if(cljs.core.truth_(function() {
                                    var and__3822__auto____7198 = subpar.paredit.closer_QMARK_.call(null, a__7174);
                                    if(cljs.core.truth_(and__3822__auto____7198)) {
                                      return in_word__7173
                                    }else {
                                      return and__3822__auto____7198
                                    }
                                  }())) {
                                    var G__7307 = j__7175;
                                    var G__7308 = subpar.paredit.code;
                                    var G__7309 = cljs.core.pop.call(null, openings__7168);
                                    var G__7310 = -1;
                                    var G__7311 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                                    var G__7312 = cljs.core.assoc_in.call(null, cljs.core.assoc_in.call(null, cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'children", start__7169], true), i__7166 - 1), cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'closer"], true), i__7166), cljs.core.PersistentVector.fromArray([cljs.core.second.call(null, openings__7168), "\ufdd0'children", o__7176], true), i__7166);
                                    var G__7313 = false;
                                    var G__7314 = false;
                                    i__7166 = G__7307;
                                    mode__7167 = G__7308;
                                    openings__7168 = G__7309;
                                    start__7169 = G__7310;
                                    t__7170 = G__7311;
                                    families__7171 = G__7312;
                                    escaping__7172 = G__7313;
                                    in_word__7173 = G__7314;
                                    continue
                                  }else {
                                    if(cljs.core.truth_(subpar.paredit.closer_QMARK_.call(null, a__7174))) {
                                      var G__7315 = j__7175;
                                      var G__7316 = subpar.paredit.code;
                                      var G__7317 = cljs.core.pop.call(null, openings__7168);
                                      var G__7318 = -1;
                                      var G__7319 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                                      var G__7320 = cljs.core.assoc_in.call(null, cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'closer"], true), i__7166), cljs.core.PersistentVector.fromArray([cljs.core.second.call(null, openings__7168), "\ufdd0'children", o__7176], true), i__7166);
                                      var G__7321 = false;
                                      var G__7322 = false;
                                      i__7166 = G__7315;
                                      mode__7167 = G__7316;
                                      openings__7168 = G__7317;
                                      start__7169 = G__7318;
                                      t__7170 = G__7319;
                                      families__7171 = G__7320;
                                      escaping__7172 = G__7321;
                                      in_word__7173 = G__7322;
                                      continue
                                    }else {
                                      if(function() {
                                        var and__3822__auto____7199 = cljs.core.not.call(null, subpar.paredit.whitespace_QMARK_.call(null, a__7174));
                                        if(and__3822__auto____7199) {
                                          return cljs.core.not.call(null, in_word__7173)
                                        }else {
                                          return and__3822__auto____7199
                                        }
                                      }()) {
                                        var G__7323 = j__7175;
                                        var G__7324 = subpar.paredit.code;
                                        var G__7325 = openings__7168;
                                        var G__7326 = i__7166;
                                        var G__7327 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                                        var G__7328 = cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'children", i__7166], true), i__7166);
                                        var G__7329 = false;
                                        var G__7330 = true;
                                        i__7166 = G__7323;
                                        mode__7167 = G__7324;
                                        openings__7168 = G__7325;
                                        start__7169 = G__7326;
                                        t__7170 = G__7327;
                                        families__7171 = G__7328;
                                        escaping__7172 = G__7329;
                                        in_word__7173 = G__7330;
                                        continue
                                      }else {
                                        if(cljs.core.truth_(function() {
                                          var and__3822__auto____7200 = subpar.paredit.whitespace_QMARK_.call(null, a__7174);
                                          if(cljs.core.truth_(and__3822__auto____7200)) {
                                            return in_word__7173
                                          }else {
                                            return and__3822__auto____7200
                                          }
                                        }())) {
                                          var G__7331 = j__7175;
                                          var G__7332 = subpar.paredit.code;
                                          var G__7333 = openings__7168;
                                          var G__7334 = -1;
                                          var G__7335 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                                          var G__7336 = cljs.core.assoc_in.call(null, families__7171, cljs.core.PersistentVector.fromArray([o__7176, "\ufdd0'children", start__7169], true), i__7166 - 1);
                                          var G__7337 = false;
                                          var G__7338 = false;
                                          i__7166 = G__7331;
                                          mode__7167 = G__7332;
                                          openings__7168 = G__7333;
                                          start__7169 = G__7334;
                                          t__7170 = G__7335;
                                          families__7171 = G__7336;
                                          escaping__7172 = G__7337;
                                          in_word__7173 = G__7338;
                                          continue
                                        }else {
                                          if(cljs.core.truth_(function() {
                                            var and__3822__auto____7201 = subpar.paredit.whitespace_QMARK_.call(null, a__7174);
                                            if(cljs.core.truth_(and__3822__auto____7201)) {
                                              return cljs.core.not.call(null, in_word__7173)
                                            }else {
                                              return and__3822__auto____7201
                                            }
                                          }())) {
                                            var G__7339 = j__7175;
                                            var G__7340 = subpar.paredit.code;
                                            var G__7341 = openings__7168;
                                            var G__7342 = -1;
                                            var G__7343 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                                            var G__7344 = families__7171;
                                            var G__7345 = false;
                                            var G__7346 = false;
                                            i__7166 = G__7339;
                                            mode__7167 = G__7340;
                                            openings__7168 = G__7341;
                                            start__7169 = G__7342;
                                            t__7170 = G__7343;
                                            families__7171 = G__7344;
                                            escaping__7172 = G__7345;
                                            in_word__7173 = G__7346;
                                            continue
                                          }else {
                                            if(cljs.core.truth_(function() {
                                              var and__3822__auto____7202 = cljs.core.not.call(null, subpar.paredit.whitespace_QMARK_.call(null, a__7174));
                                              if(and__3822__auto____7202) {
                                                return in_word__7173
                                              }else {
                                                return and__3822__auto____7202
                                              }
                                            }())) {
                                              var G__7347 = j__7175;
                                              var G__7348 = subpar.paredit.code;
                                              var G__7349 = openings__7168;
                                              var G__7350 = start__7169;
                                              var G__7351 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray([mode__7167, o__7176], true));
                                              var G__7352 = families__7171;
                                              var G__7353 = false;
                                              var G__7354 = true;
                                              i__7166 = G__7347;
                                              mode__7167 = G__7348;
                                              openings__7168 = G__7349;
                                              start__7169 = G__7350;
                                              t__7170 = G__7351;
                                              families__7171 = G__7352;
                                              escaping__7172 = G__7353;
                                              in_word__7173 = G__7354;
                                              continue
                                            }else {
                                              if("\ufdd0'default") {
                                                var G__7355 = j__7175;
                                                var G__7356 = subpar.paredit.code;
                                                var G__7357 = openings__7168;
                                                var G__7358 = start__7169;
                                                var G__7359 = cljs.core.conj.call(null, t__7170, cljs.core.PersistentVector.fromArray(["?", o__7176], true));
                                                var G__7360 = families__7171;
                                                var G__7361 = escaping__7172;
                                                var G__7362 = in_word__7173;
                                                i__7166 = G__7355;
                                                mode__7167 = G__7356;
                                                openings__7168 = G__7357;
                                                start__7169 = G__7358;
                                                t__7170 = G__7359;
                                                families__7171 = G__7360;
                                                escaping__7172 = G__7361;
                                                in_word__7173 = G__7362;
                                                continue
                                              }else {
                                                return null
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    break
  }
};
goog.provide("subpar.core");
goog.require("cljs.core");
goog.require("subpar.paredit");
goog.require("subpar.paredit");
subpar.core.get_index = function get_index(cm) {
  return cm.indexFromPos(cm.getCursor())
};
subpar.core.go_to_index = function go_to_index(cm, i, j) {
  if(cljs.core.not_EQ_.call(null, i, j)) {
    return cm.setCursor(cm.posFromIndex(j))
  }else {
    return null
  }
};
subpar.core.nothing_selected_QMARK_ = function nothing_selected_QMARK_(cm) {
  return cljs.core._EQ_.call(null, "", cm.getSelection())
};
subpar.core.get_info = function get_info(cm) {
  return cljs.core.PersistentVector.fromArray([cm.getCursor(), subpar.core.get_index.call(null, cm), cm.getValue()], true)
};
subpar.core.open_expression = function open_expression(cm, pair) {
  var vec__6459__6460 = subpar.core.get_info.call(null, cm);
  var cur__6461 = cljs.core.nth.call(null, vec__6459__6460, 0, null);
  var i__6462 = cljs.core.nth.call(null, vec__6459__6460, 1, null);
  var s__6463 = cljs.core.nth.call(null, vec__6459__6460, 2, null);
  if(cljs.core.truth_(subpar.paredit.in_string.call(null, s__6463, i__6462))) {
    cm.replaceRange(cljs.core.nth.call(null, pair, 0), cur__6461);
    return cm.setCursor(cur__6461.line, cur__6461.ch + 1)
  }else {
    return cm.compoundChange(function() {
      cm.replaceRange(pair, cur__6461);
      cm.setCursor(cur__6461.line, cur__6461.ch + 1);
      return cm.indentLine(cur__6461.line)
    })
  }
};
goog.exportSymbol("subpar.core.open_expression", subpar.core.open_expression);
subpar.core.forward_delete = function forward_delete(cm) {
  if(cljs.core.truth_(subpar.core.nothing_selected_QMARK_.call(null, cm))) {
    var vec__6481__6482 = subpar.core.get_info.call(null, cm);
    var cur__6483 = cljs.core.nth.call(null, vec__6481__6482, 0, null);
    var i__6484 = cljs.core.nth.call(null, vec__6481__6482, 1, null);
    var s__6485 = cljs.core.nth.call(null, vec__6481__6482, 2, null);
    var act__6486 = subpar.paredit.forward_delete_action.call(null, s__6485, i__6484);
    var s1__6487 = cm.posFromIndex(i__6484);
    var e1__6488 = cm.posFromIndex(i__6484 + 1);
    var s2__6489 = cm.posFromIndex(i__6484 - 1);
    var e2__6490 = e1__6488;
    var s3__6491 = s1__6487;
    var e3__6492 = cm.posFromIndex(i__6484 + 2);
    var pred__6493__6496 = cljs.core._EQ_;
    var expr__6494__6497 = act__6486;
    if(pred__6493__6496.call(null, 1, expr__6494__6497)) {
      return cm.replaceRange("", s1__6487, e1__6488)
    }else {
      if(pred__6493__6496.call(null, 2, expr__6494__6497)) {
        return cm.replaceRange("", s2__6489, e2__6490)
      }else {
        if(pred__6493__6496.call(null, 3, expr__6494__6497)) {
          return cm.replaceRange("", s3__6491, e3__6492)
        }else {
          if(pred__6493__6496.call(null, 4, expr__6494__6497)) {
            return cm.setCursor(e1__6488)
          }else {
            throw new Error([cljs.core.str("No matching clause: "), cljs.core.str(expr__6494__6497)].join(""));
          }
        }
      }
    }
  }else {
    return cm.replaceSelection("")
  }
};
goog.exportSymbol("subpar.core.forward_delete", subpar.core.forward_delete);
subpar.core.backward_delete = function backward_delete(cm) {
  if(cljs.core.truth_(subpar.core.nothing_selected_QMARK_.call(null, cm))) {
    var vec__6515__6516 = subpar.core.get_info.call(null, cm);
    var cur__6517 = cljs.core.nth.call(null, vec__6515__6516, 0, null);
    var i__6518 = cljs.core.nth.call(null, vec__6515__6516, 1, null);
    var s__6519 = cljs.core.nth.call(null, vec__6515__6516, 2, null);
    var act__6520 = subpar.paredit.backward_delete_action.call(null, s__6519, i__6518);
    var s1__6521 = cm.posFromIndex(i__6518 - 1);
    var e1__6522 = cm.posFromIndex(i__6518);
    var s2__6523 = s1__6521;
    var e2__6524 = cm.posFromIndex(i__6518 + 1);
    var s3__6525 = cm.posFromIndex(i__6518 - 2);
    var e3__6526 = e1__6522;
    var pred__6527__6530 = cljs.core._EQ_;
    var expr__6528__6531 = act__6520;
    if(pred__6527__6530.call(null, 1, expr__6528__6531)) {
      return cm.replaceRange("", s1__6521, e1__6522)
    }else {
      if(pred__6527__6530.call(null, 2, expr__6528__6531)) {
        return cm.replaceRange("", s2__6523, e2__6524)
      }else {
        if(pred__6527__6530.call(null, 3, expr__6528__6531)) {
          return cm.replaceRange("", s3__6525, e3__6526)
        }else {
          if(pred__6527__6530.call(null, 4, expr__6528__6531)) {
            return cm.setCursor(s1__6521)
          }else {
            throw new Error([cljs.core.str("No matching clause: "), cljs.core.str(expr__6528__6531)].join(""));
          }
        }
      }
    }
  }else {
    return cm.replaceSelection("")
  }
};
goog.exportSymbol("subpar.core.backward_delete", subpar.core.backward_delete);
subpar.core.double_quote = function double_quote(cm) {
  var vec__6543__6544 = subpar.core.get_info.call(null, cm);
  var cur__6545 = cljs.core.nth.call(null, vec__6543__6544, 0, null);
  var i__6546 = cljs.core.nth.call(null, vec__6543__6544, 1, null);
  var s__6547 = cljs.core.nth.call(null, vec__6543__6544, 2, null);
  var act__6548 = subpar.paredit.double_quote_action.call(null, s__6547, i__6546);
  var pred__6549__6552 = cljs.core._EQ_;
  var expr__6550__6553 = act__6548;
  if(pred__6549__6552.call(null, 0, expr__6550__6553)) {
    return subpar.core.open_expression.call(null, cm, '""')
  }else {
    if(pred__6549__6552.call(null, 1, expr__6550__6553)) {
      return cm.replaceRange('\\"', cur__6545)
    }else {
      if(pred__6549__6552.call(null, 2, expr__6550__6553)) {
        return subpar.core.go_to_index.call(null, cm, i__6546, i__6546 + 1)
      }else {
        if(pred__6549__6552.call(null, 3, expr__6550__6553)) {
          return cm.replaceRange('"', cur__6545)
        }else {
          throw new Error([cljs.core.str("No matching clause: "), cljs.core.str(expr__6550__6553)].join(""));
        }
      }
    }
  }
};
goog.exportSymbol("subpar.core.double_quote", subpar.core.double_quote);
subpar.core.close_expression = function close_expression(cm, c) {
  var vec__6566__6567 = subpar.core.get_info.call(null, cm);
  var cur__6568 = cljs.core.nth.call(null, vec__6566__6567, 0, null);
  var i__6569 = cljs.core.nth.call(null, vec__6566__6567, 1, null);
  var s__6570 = cljs.core.nth.call(null, vec__6566__6567, 2, null);
  var p__6571 = subpar.paredit.parse.call(null, s__6570);
  if(cljs.core.truth_(subpar.paredit.in_string_QMARK_.call(null, p__6571, i__6569))) {
    cm.replaceRange(c, cur__6568);
    return cm.setCursor(cur__6568.line, cur__6568.ch + 1)
  }else {
    var vec__6572__6573 = subpar.paredit.close_expression_vals.call(null, p__6571, i__6569);
    var del__6574 = cljs.core.nth.call(null, vec__6572__6573, 0, null);
    var beg__6575 = cljs.core.nth.call(null, vec__6572__6573, 1, null);
    var end__6576 = cljs.core.nth.call(null, vec__6572__6573, 2, null);
    var dst__6577 = cljs.core.nth.call(null, vec__6572__6573, 3, null);
    if(cljs.core.truth_(dst__6577)) {
      if(cljs.core.truth_(del__6574)) {
        cm.replaceRange("", cm.posFromIndex(beg__6575), cm.posFromIndex(end__6576))
      }else {
      }
      return subpar.core.go_to_index.call(null, cm, i__6569, dst__6577)
    }else {
      return null
    }
  }
};
goog.exportSymbol("subpar.core.close_expression", subpar.core.close_expression);
subpar.core.go = function go(cm, f) {
  var vec__6584__6585 = subpar.core.get_info.call(null, cm);
  var cur__6586 = cljs.core.nth.call(null, vec__6584__6585, 0, null);
  var i__6587 = cljs.core.nth.call(null, vec__6584__6585, 1, null);
  var s__6588 = cljs.core.nth.call(null, vec__6584__6585, 2, null);
  var j__6589 = f.call(null, s__6588, i__6587);
  return subpar.core.go_to_index.call(null, cm, i__6587, j__6589)
};
subpar.core.backward_up = function backward_up(cm) {
  return subpar.core.go.call(null, cm, subpar.paredit.backward_up_fn)
};
goog.exportSymbol("subpar.core.backward_up", subpar.core.backward_up);
subpar.core.forward_down = function forward_down(cm) {
  return subpar.core.go.call(null, cm, subpar.paredit.forward_down_fn)
};
goog.exportSymbol("subpar.core.forward_down", subpar.core.forward_down);
subpar.core.backward = function backward(cm) {
  return subpar.core.go.call(null, cm, subpar.paredit.backward_fn)
};
goog.exportSymbol("subpar.core.backward", subpar.core.backward);
subpar.core.forward = function forward(cm) {
  return subpar.core.go.call(null, cm, subpar.paredit.forward_fn)
};
goog.exportSymbol("subpar.core.forward", subpar.core.forward);
subpar.core.backward_down = function backward_down(cm) {
  return subpar.core.go.call(null, cm, subpar.paredit.backward_down_fn)
};
goog.exportSymbol("subpar.core.backward_down", subpar.core.backward_down);
subpar.core.forward_up = function forward_up(cm) {
  return subpar.core.go.call(null, cm, subpar.paredit.forward_up_fn)
};
goog.exportSymbol("subpar.core.forward_up", subpar.core.forward_up);
subpar.core.forward_slurp = function forward_slurp(cm) {
  var vec__6608__6610 = subpar.core.get_info.call(null, cm);
  var cur__6611 = cljs.core.nth.call(null, vec__6608__6610, 0, null);
  var i__6612 = cljs.core.nth.call(null, vec__6608__6610, 1, null);
  var s__6613 = cljs.core.nth.call(null, vec__6608__6610, 2, null);
  var vec__6609__6614 = subpar.paredit.forward_slurp_vals.call(null, s__6613, i__6612);
  var delimiter__6615 = cljs.core.nth.call(null, vec__6609__6614, 0, null);
  var si__6616 = cljs.core.nth.call(null, vec__6609__6614, 1, null);
  var di__6617 = cljs.core.nth.call(null, vec__6609__6614, 2, null);
  var ri__6618 = cljs.core.nth.call(null, vec__6609__6614, 3, null);
  if(cljs.core.truth_(ri__6618)) {
    var start__6619 = cm.posFromIndex(si__6616);
    var end__6620 = cm.posFromIndex(si__6616 + 1);
    var destination__6621 = cm.posFromIndex(di__6617);
    var line__6622 = start__6619.line;
    var update__6623 = function() {
      cm.replaceRange(delimiter__6615, destination__6621);
      cm.replaceRange("", start__6619, end__6620);
      return cljs.core.map.call(null, function(p1__6590_SHARP_) {
        return cm.indentLine(p1__6590_SHARP_)
      }, cljs.core.range.call(null, line__6622, line__6622 + ri__6618))
    };
    return cm.compoundChange(update__6623)
  }else {
    return null
  }
};
goog.exportSymbol("subpar.core.forward_slurp", subpar.core.forward_slurp);
subpar.core.backward_slurp = function backward_slurp(cm) {
  var vec__6641__6643 = subpar.core.get_info.call(null, cm);
  var cur__6644 = cljs.core.nth.call(null, vec__6641__6643, 0, null);
  var i__6645 = cljs.core.nth.call(null, vec__6641__6643, 1, null);
  var s__6646 = cljs.core.nth.call(null, vec__6641__6643, 2, null);
  var vec__6642__6647 = subpar.paredit.backward_slurp_vals.call(null, s__6646, i__6645);
  var delimiter__6648 = cljs.core.nth.call(null, vec__6642__6647, 0, null);
  var si__6649 = cljs.core.nth.call(null, vec__6642__6647, 1, null);
  var di__6650 = cljs.core.nth.call(null, vec__6642__6647, 2, null);
  var ri__6651 = cljs.core.nth.call(null, vec__6642__6647, 3, null);
  if(cljs.core.truth_(ri__6651)) {
    var start__6652 = cm.posFromIndex(si__6649);
    var end__6653 = cm.posFromIndex(si__6649 + 1);
    var destination__6654 = cm.posFromIndex(di__6650);
    var line__6655 = start__6652.line;
    var update__6656 = function() {
      cm.replaceRange("", start__6652, end__6653);
      cm.replaceRange(delimiter__6648, destination__6654);
      return cljs.core.map.call(null, function(p1__6591_SHARP_) {
        return cm.indentLine(p1__6591_SHARP_)
      }, cljs.core.range.call(null, line__6655, line__6655 + ri__6651))
    };
    return cm.compoundChange(update__6656)
  }else {
    return null
  }
};
goog.exportSymbol("subpar.core.backward_slurp", subpar.core.backward_slurp);
subpar.core.backward_barf = function backward_barf(cm) {
  var vec__6676__6678 = subpar.core.get_info.call(null, cm);
  var cur__6679 = cljs.core.nth.call(null, vec__6676__6678, 0, null);
  var i__6680 = cljs.core.nth.call(null, vec__6676__6678, 1, null);
  var s__6681 = cljs.core.nth.call(null, vec__6676__6678, 2, null);
  var vec__6677__6682 = subpar.paredit.backward_barf_vals.call(null, s__6681, i__6680);
  var delimiter__6683 = cljs.core.nth.call(null, vec__6677__6682, 0, null);
  var si__6684 = cljs.core.nth.call(null, vec__6677__6682, 1, null);
  var di__6685 = cljs.core.nth.call(null, vec__6677__6682, 2, null);
  var pad__6686 = cljs.core.nth.call(null, vec__6677__6682, 3, null);
  var ri__6687 = cljs.core.nth.call(null, vec__6677__6682, 4, null);
  if(cljs.core.truth_(ri__6687)) {
    var delimiter__6688 = cljs.core.truth_(pad__6686) ? [cljs.core.str(" "), cljs.core.str(delimiter__6683)].join("") : delimiter__6683;
    var destination__6689 = cm.posFromIndex(di__6685);
    var start__6690 = cm.posFromIndex(si__6684);
    var end__6691 = cm.posFromIndex(si__6684 + 1);
    var line__6692 = start__6690.line;
    var update__6693 = function() {
      cm.replaceRange(delimiter__6688, destination__6689);
      cm.replaceRange("", start__6690, end__6691);
      return cljs.core.map.call(null, function(p1__6624_SHARP_) {
        return cm.indentLine(p1__6624_SHARP_)
      }, cljs.core.range.call(null, line__6692, line__6692 + ri__6687))
    };
    return cm.compoundChange(update__6693)
  }else {
    return null
  }
};
goog.exportSymbol("subpar.core.backward_barf", subpar.core.backward_barf);
subpar.core.forward_barf = function forward_barf(cm) {
  var vec__6714__6716 = subpar.core.get_info.call(null, cm);
  var cur__6717 = cljs.core.nth.call(null, vec__6714__6716, 0, null);
  var i__6718 = cljs.core.nth.call(null, vec__6714__6716, 1, null);
  var s__6719 = cljs.core.nth.call(null, vec__6714__6716, 2, null);
  var vec__6715__6720 = subpar.paredit.forward_barf_vals.call(null, s__6719, i__6718);
  var delimiter__6721 = cljs.core.nth.call(null, vec__6715__6720, 0, null);
  var si__6722 = cljs.core.nth.call(null, vec__6715__6720, 1, null);
  var di__6723 = cljs.core.nth.call(null, vec__6715__6720, 2, null);
  var pad__6724 = cljs.core.nth.call(null, vec__6715__6720, 3, null);
  var ri__6725 = cljs.core.nth.call(null, vec__6715__6720, 4, null);
  var i0__6726 = cljs.core.nth.call(null, vec__6715__6720, 5, null);
  if(cljs.core.truth_(ri__6725)) {
    var delimiter__6727 = cljs.core.truth_(pad__6724) ? [cljs.core.str(" "), cljs.core.str(delimiter__6721)].join("") : delimiter__6721;
    var destination__6728 = cm.posFromIndex(di__6723);
    var start__6729 = cm.posFromIndex(si__6722);
    var end__6730 = cm.posFromIndex(si__6722 + 1);
    var line__6731 = cm.posFromIndex(i0__6726).line;
    var update__6732 = function() {
      cm.replaceRange("", start__6729, end__6730);
      cm.replaceRange(delimiter__6727, destination__6728);
      return cljs.core.map.call(null, function(p1__6657_SHARP_) {
        return cm.indentLine(p1__6657_SHARP_)
      }, cljs.core.range.call(null, line__6731, line__6731 + ri__6725))
    };
    return cm.compoundChange(update__6732)
  }else {
    return null
  }
};
goog.exportSymbol("subpar.core.forward_barf", subpar.core.forward_barf);
subpar.core.splice_delete_backward = function splice_delete_backward(cm) {
  var vec__6752__6754 = subpar.core.get_info.call(null, cm);
  var cur__6755 = cljs.core.nth.call(null, vec__6752__6754, 0, null);
  var i__6756 = cljs.core.nth.call(null, vec__6752__6754, 1, null);
  var s__6757 = cljs.core.nth.call(null, vec__6752__6754, 2, null);
  var vec__6753__6758 = subpar.paredit.splice_delete_backward_vals.call(null, s__6757, i__6756);
  var start__6759 = cljs.core.nth.call(null, vec__6753__6758, 0, null);
  var end__6760 = cljs.core.nth.call(null, vec__6753__6758, 1, null);
  var closer__6761 = cljs.core.nth.call(null, vec__6753__6758, 2, null);
  var reindent__6762 = cljs.core.nth.call(null, vec__6753__6758, 3, null);
  var num__6763 = cljs.core.nth.call(null, vec__6753__6758, 4, null);
  if(cljs.core.truth_(reindent__6762)) {
    var line__6764 = cm.posFromIndex(reindent__6762).line;
    var c0__6765 = cm.posFromIndex(closer__6761);
    var c1__6766 = cm.posFromIndex(closer__6761 + 1);
    var s0__6767 = cm.posFromIndex(start__6759);
    var s1__6768 = cm.posFromIndex(end__6760);
    var update__6769 = function() {
      cm.replaceRange("", c0__6765, c1__6766);
      cm.replaceRange("", s0__6767, s1__6768);
      return cljs.core.map.call(null, function(p1__6694_SHARP_) {
        return cm.indentLine(p1__6694_SHARP_)
      }, cljs.core.range.call(null, line__6764, line__6764 + num__6763))
    };
    return cm.compoundChange(update__6769)
  }else {
    return null
  }
};
goog.exportSymbol("subpar.core.splice_delete_backward", subpar.core.splice_delete_backward);
subpar.core.splice_delete_forward = function splice_delete_forward(cm) {
  var vec__6789__6791 = subpar.core.get_info.call(null, cm);
  var cur__6792 = cljs.core.nth.call(null, vec__6789__6791, 0, null);
  var i__6793 = cljs.core.nth.call(null, vec__6789__6791, 1, null);
  var s__6794 = cljs.core.nth.call(null, vec__6789__6791, 2, null);
  var vec__6790__6795 = subpar.paredit.splice_delete_forward_vals.call(null, s__6794, i__6793);
  var opener__6796 = cljs.core.nth.call(null, vec__6790__6795, 0, null);
  var start__6797 = cljs.core.nth.call(null, vec__6790__6795, 1, null);
  var end__6798 = cljs.core.nth.call(null, vec__6790__6795, 2, null);
  var reindent__6799 = cljs.core.nth.call(null, vec__6790__6795, 3, null);
  var num__6800 = cljs.core.nth.call(null, vec__6790__6795, 4, null);
  if(cljs.core.truth_(reindent__6799)) {
    var line__6801 = cm.posFromIndex(reindent__6799).line;
    var o0__6802 = cm.posFromIndex(opener__6796);
    var o1__6803 = cm.posFromIndex(opener__6796 + 1);
    var s0__6804 = cm.posFromIndex(start__6797);
    var s1__6805 = cm.posFromIndex(end__6798);
    var update__6806 = function() {
      cm.replaceRange("", s0__6804, s1__6805);
      cm.replaceRange("", o0__6802, o1__6803);
      return cljs.core.map.call(null, function(p1__6733_SHARP_) {
        return cm.indentLine(p1__6733_SHARP_)
      }, cljs.core.range.call(null, line__6801, line__6801 + num__6800))
    };
    return cm.compoundChange(update__6806)
  }else {
    return null
  }
};
goog.exportSymbol("subpar.core.splice_delete_forward", subpar.core.splice_delete_forward);
subpar.core.splice = function splice(cm) {
  var vec__6825__6827 = subpar.core.get_info.call(null, cm);
  var cur__6828 = cljs.core.nth.call(null, vec__6825__6827, 0, null);
  var i__6829 = cljs.core.nth.call(null, vec__6825__6827, 1, null);
  var s__6830 = cljs.core.nth.call(null, vec__6825__6827, 2, null);
  var vec__6826__6831 = subpar.paredit.splice_vals.call(null, s__6830, i__6829);
  var opener__6832 = cljs.core.nth.call(null, vec__6826__6831, 0, null);
  var closer__6833 = cljs.core.nth.call(null, vec__6826__6831, 1, null);
  var reindent__6834 = cljs.core.nth.call(null, vec__6826__6831, 2, null);
  var num__6835 = cljs.core.nth.call(null, vec__6826__6831, 3, null);
  if(cljs.core.truth_(reindent__6834)) {
    var line__6836 = cm.posFromIndex(reindent__6834).line;
    var o0__6837 = cm.posFromIndex(opener__6832);
    var o1__6838 = cm.posFromIndex(opener__6832 + 1);
    var c0__6839 = cm.posFromIndex(closer__6833);
    var c1__6840 = cm.posFromIndex(closer__6833 + 1);
    var update__6841 = function() {
      cm.replaceRange("", c0__6839, c1__6840);
      cm.replaceRange("", o0__6837, o1__6838);
      return cljs.core.map.call(null, function(p1__6770_SHARP_) {
        return cm.indentLine(p1__6770_SHARP_)
      }, cljs.core.range.call(null, line__6836, line__6836 + num__6835))
    };
    return cm.compoundChange(update__6841)
  }else {
    return null
  }
};
goog.exportSymbol("subpar.core.splice", subpar.core.splice);
subpar.core.indent_selection = function indent_selection(cm) {
  if(cljs.core.truth_(cm.somethingSelected())) {
    var start__6845 = cm.getCursor(true).line;
    var end__6846 = cm.getCursor(false).line;
    var f__6847 = function() {
      return cljs.core.map.call(null, function(p1__6807_SHARP_) {
        return cm.indentLine(p1__6807_SHARP_)
      }, cljs.core.range.call(null, start__6845, end__6846 + 1))
    };
    return cm.compoundChange(f__6847)
  }else {
    return cm.indentLine(cm.getCursor().line)
  }
};
goog.exportSymbol("subpar.core.indent_selection", subpar.core.indent_selection);
