// Compiled by ClojureScript 1.9.229 {}
goog.provide('crate.compiler');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('clojure.string');
goog.require('crate.binding');
crate.compiler.xmlns = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"xhtml","xhtml",1912943770),"http://www.w3.org/1999/xhtml",new cljs.core.Keyword(null,"svg","svg",856789142),"http://www.w3.org/2000/svg"], null);


crate.compiler.group_id = cljs.core.atom.call(null,(0));
crate.compiler.bindings = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
crate.compiler.capture_binding = (function crate$compiler$capture_binding(tag,b){
return cljs.core.swap_BANG_.call(null,crate.compiler.bindings,cljs.core.conj,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag,b], null));
});

/**
 * @interface
 */
crate.compiler.Element = function(){};

crate.compiler._elem = (function crate$compiler$_elem(this$){
if((!((this$ == null))) && (!((this$.crate$compiler$Element$_elem$arity$1 == null)))){
return this$.crate$compiler$Element$_elem$arity$1(this$);
} else {
var x__7456__auto__ = (((this$ == null))?null:this$);
var m__7457__auto__ = (crate.compiler._elem[goog.typeOf(x__7456__auto__)]);
if(!((m__7457__auto__ == null))){
return m__7457__auto__.call(null,this$);
} else {
var m__7457__auto____$1 = (crate.compiler._elem["_"]);
if(!((m__7457__auto____$1 == null))){
return m__7457__auto____$1.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"Element.-elem",this$);
}
}
}
});

crate.compiler.as_content = (function crate$compiler$as_content(parent,content){
var seq__12559 = cljs.core.seq.call(null,content);
var chunk__12560 = null;
var count__12561 = (0);
var i__12562 = (0);
while(true){
if((i__12562 < count__12561)){
var c = cljs.core._nth.call(null,chunk__12560,i__12562);
var child_12565 = ((((!((c == null)))?(((false) || (c.crate$compiler$Element$))?true:(((!c.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,c):false)):cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,c)))?crate.compiler._elem.call(null,c):(((c == null))?null:((cljs.core.map_QMARK_.call(null,c))?(function(){throw "Maps cannot be used as content"})():((typeof c === 'string')?goog.dom.createTextNode(c):((cljs.core.vector_QMARK_.call(null,c))?crate.compiler.elem_factory.call(null,c):((cljs.core.seq_QMARK_.call(null,c))?crate$compiler$as_content.call(null,parent,c):(cljs.core.truth_(crate.binding.binding_coll_QMARK_.call(null,c))?(function (){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"coll","coll",1647737163),c);

return crate$compiler$as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})()
:(cljs.core.truth_(crate.binding.binding_QMARK_.call(null,c))?(function (){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"text","text",-1790561697),c);

return crate$compiler$as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})()
:(cljs.core.truth_(c.nodeName)?c:(cljs.core.truth_(c.get)?c.get((0)):goog.dom.createTextNode([cljs.core.str(c)].join(''))
))))))))));
if(cljs.core.truth_(child_12565)){
goog.dom.appendChild(parent,child_12565);
} else {
}

var G__12566 = seq__12559;
var G__12567 = chunk__12560;
var G__12568 = count__12561;
var G__12569 = (i__12562 + (1));
seq__12559 = G__12566;
chunk__12560 = G__12567;
count__12561 = G__12568;
i__12562 = G__12569;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12559);
if(temp__4657__auto__){
var seq__12559__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12559__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12559__$1);
var G__12570 = cljs.core.chunk_rest.call(null,seq__12559__$1);
var G__12571 = c__7604__auto__;
var G__12572 = cljs.core.count.call(null,c__7604__auto__);
var G__12573 = (0);
seq__12559 = G__12570;
chunk__12560 = G__12571;
count__12561 = G__12572;
i__12562 = G__12573;
continue;
} else {
var c = cljs.core.first.call(null,seq__12559__$1);
var child_12574 = ((((!((c == null)))?(((false) || (c.crate$compiler$Element$))?true:(((!c.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,c):false)):cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,c)))?crate.compiler._elem.call(null,c):(((c == null))?null:((cljs.core.map_QMARK_.call(null,c))?(function(){throw "Maps cannot be used as content"})():((typeof c === 'string')?goog.dom.createTextNode(c):((cljs.core.vector_QMARK_.call(null,c))?crate.compiler.elem_factory.call(null,c):((cljs.core.seq_QMARK_.call(null,c))?crate$compiler$as_content.call(null,parent,c):(cljs.core.truth_(crate.binding.binding_coll_QMARK_.call(null,c))?(function (){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"coll","coll",1647737163),c);

return crate$compiler$as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})()
:(cljs.core.truth_(crate.binding.binding_QMARK_.call(null,c))?(function (){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"text","text",-1790561697),c);

return crate$compiler$as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})()
:(cljs.core.truth_(c.nodeName)?c:(cljs.core.truth_(c.get)?c.get((0)):goog.dom.createTextNode([cljs.core.str(c)].join(''))
))))))))));
if(cljs.core.truth_(child_12574)){
goog.dom.appendChild(parent,child_12574);
} else {
}

var G__12575 = cljs.core.next.call(null,seq__12559__$1);
var G__12576 = null;
var G__12577 = (0);
var G__12578 = (0);
seq__12559 = G__12575;
chunk__12560 = G__12576;
count__12561 = G__12577;
i__12562 = G__12578;
continue;
}
} else {
return null;
}
}
break;
}
});
if(typeof crate.compiler.dom_binding !== 'undefined'){
} else {
crate.compiler.dom_binding = (function (){var method_table__7718__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__7719__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__7720__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__7721__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__7722__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"crate.compiler","dom-binding"),((function (method_table__7718__auto__,prefer_table__7719__auto__,method_cache__7720__auto__,cached_hierarchy__7721__auto__,hierarchy__7722__auto__){
return (function (type,_,___$1){
return type;
});})(method_table__7718__auto__,prefer_table__7719__auto__,method_cache__7720__auto__,cached_hierarchy__7721__auto__,hierarchy__7722__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__7722__auto__,method_table__7718__auto__,prefer_table__7719__auto__,method_cache__7720__auto__,cached_hierarchy__7721__auto__));
})();
}
cljs.core._add_method.call(null,crate.compiler.dom_binding,new cljs.core.Keyword(null,"text","text",-1790561697),(function (_,b,elem){
return crate.binding.on_change.call(null,b,(function (v){
goog.dom.removeChildren(elem);

return crate.compiler.as_content.call(null,elem,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null));
}));
}));
cljs.core._add_method.call(null,crate.compiler.dom_binding,new cljs.core.Keyword(null,"attr","attr",-604132353),(function (_,p__12579,elem){
var vec__12580 = p__12579;
var k = cljs.core.nth.call(null,vec__12580,(0),null);
var b = cljs.core.nth.call(null,vec__12580,(1),null);
return crate.binding.on_change.call(null,b,((function (vec__12580,k,b){
return (function (v){
return crate.compiler.dom_attr.call(null,elem,k,v);
});})(vec__12580,k,b))
);
}));
cljs.core._add_method.call(null,crate.compiler.dom_binding,new cljs.core.Keyword(null,"style","style",-496642736),(function (_,p__12583,elem){
var vec__12584 = p__12583;
var k = cljs.core.nth.call(null,vec__12584,(0),null);
var b = cljs.core.nth.call(null,vec__12584,(1),null);
return crate.binding.on_change.call(null,b,((function (vec__12584,k,b){
return (function (v){
if(cljs.core.truth_(k)){
return crate.compiler.dom_style.call(null,elem,k,v);
} else {
return crate.compiler.dom_style.call(null,elem,v);
}
});})(vec__12584,k,b))
);
}));
crate.compiler.dom_add = (function crate$compiler$dom_add(bc,parent,elem,v){
var temp__4655__auto__ = crate.binding.opt.call(null,bc,new cljs.core.Keyword(null,"add","add",235287739));
if(cljs.core.truth_(temp__4655__auto__)){
var adder = temp__4655__auto__;
return adder.call(null,parent,elem,v);
} else {
return goog.dom.appendChild(parent,elem);
}
});
crate.compiler.dom_remove = (function crate$compiler$dom_remove(bc,elem){
var temp__4655__auto__ = crate.binding.opt.call(null,bc,new cljs.core.Keyword(null,"remove","remove",-131428414));
if(cljs.core.truth_(temp__4655__auto__)){
var remover = temp__4655__auto__;
return remover.call(null,elem);
} else {
return goog.dom.removeNode(elem);
}
});
cljs.core._add_method.call(null,crate.compiler.dom_binding,new cljs.core.Keyword(null,"coll","coll",1647737163),(function (_,bc,parent){
return crate.binding.on_change.call(null,bc,(function (type,elem,v){
var pred__12587 = cljs.core._EQ_;
var expr__12588 = type;
if(cljs.core.truth_(pred__12587.call(null,new cljs.core.Keyword(null,"add","add",235287739),expr__12588))){
return crate.compiler.dom_add.call(null,bc,parent,elem,v);
} else {
if(cljs.core.truth_(pred__12587.call(null,new cljs.core.Keyword(null,"remove","remove",-131428414),expr__12588))){
return crate.compiler.dom_remove.call(null,bc,elem);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__12588)].join('')));
}
}
}));
}));
crate.compiler.handle_bindings = (function crate$compiler$handle_bindings(bs,elem){
var seq__12600 = cljs.core.seq.call(null,bs);
var chunk__12601 = null;
var count__12602 = (0);
var i__12603 = (0);
while(true){
if((i__12603 < count__12602)){
var vec__12604 = cljs.core._nth.call(null,chunk__12601,i__12603);
var type = cljs.core.nth.call(null,vec__12604,(0),null);
var b = cljs.core.nth.call(null,vec__12604,(1),null);
crate.compiler.dom_binding.call(null,type,b,elem);

var G__12610 = seq__12600;
var G__12611 = chunk__12601;
var G__12612 = count__12602;
var G__12613 = (i__12603 + (1));
seq__12600 = G__12610;
chunk__12601 = G__12611;
count__12602 = G__12612;
i__12603 = G__12613;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12600);
if(temp__4657__auto__){
var seq__12600__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12600__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12600__$1);
var G__12614 = cljs.core.chunk_rest.call(null,seq__12600__$1);
var G__12615 = c__7604__auto__;
var G__12616 = cljs.core.count.call(null,c__7604__auto__);
var G__12617 = (0);
seq__12600 = G__12614;
chunk__12601 = G__12615;
count__12602 = G__12616;
i__12603 = G__12617;
continue;
} else {
var vec__12607 = cljs.core.first.call(null,seq__12600__$1);
var type = cljs.core.nth.call(null,vec__12607,(0),null);
var b = cljs.core.nth.call(null,vec__12607,(1),null);
crate.compiler.dom_binding.call(null,type,b,elem);

var G__12618 = cljs.core.next.call(null,seq__12600__$1);
var G__12619 = null;
var G__12620 = (0);
var G__12621 = (0);
seq__12600 = G__12618;
chunk__12601 = G__12619;
count__12602 = G__12620;
i__12603 = G__12621;
continue;
}
} else {
return null;
}
}
break;
}
});
crate.compiler.dom_style = (function crate$compiler$dom_style(var_args){
var args12622 = [];
var len__7868__auto___12635 = arguments.length;
var i__7869__auto___12636 = (0);
while(true){
if((i__7869__auto___12636 < len__7868__auto___12635)){
args12622.push((arguments[i__7869__auto___12636]));

var G__12637 = (i__7869__auto___12636 + (1));
i__7869__auto___12636 = G__12637;
continue;
} else {
}
break;
}

var G__12624 = args12622.length;
switch (G__12624) {
case 2:
return crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12622.length)].join('')));

}
});

crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$2 = (function (elem,v){
if(typeof v === 'string'){
elem.setAttribute("style",v);
} else {
if(cljs.core.map_QMARK_.call(null,v)){
var seq__12625_12639 = cljs.core.seq.call(null,v);
var chunk__12626_12640 = null;
var count__12627_12641 = (0);
var i__12628_12642 = (0);
while(true){
if((i__12628_12642 < count__12627_12641)){
var vec__12629_12643 = cljs.core._nth.call(null,chunk__12626_12640,i__12628_12642);
var k_12644 = cljs.core.nth.call(null,vec__12629_12643,(0),null);
var v_12645__$1 = cljs.core.nth.call(null,vec__12629_12643,(1),null);
crate.compiler.dom_style.call(null,elem,k_12644,v_12645__$1);

var G__12646 = seq__12625_12639;
var G__12647 = chunk__12626_12640;
var G__12648 = count__12627_12641;
var G__12649 = (i__12628_12642 + (1));
seq__12625_12639 = G__12646;
chunk__12626_12640 = G__12647;
count__12627_12641 = G__12648;
i__12628_12642 = G__12649;
continue;
} else {
var temp__4657__auto___12650 = cljs.core.seq.call(null,seq__12625_12639);
if(temp__4657__auto___12650){
var seq__12625_12651__$1 = temp__4657__auto___12650;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12625_12651__$1)){
var c__7604__auto___12652 = cljs.core.chunk_first.call(null,seq__12625_12651__$1);
var G__12653 = cljs.core.chunk_rest.call(null,seq__12625_12651__$1);
var G__12654 = c__7604__auto___12652;
var G__12655 = cljs.core.count.call(null,c__7604__auto___12652);
var G__12656 = (0);
seq__12625_12639 = G__12653;
chunk__12626_12640 = G__12654;
count__12627_12641 = G__12655;
i__12628_12642 = G__12656;
continue;
} else {
var vec__12632_12657 = cljs.core.first.call(null,seq__12625_12651__$1);
var k_12658 = cljs.core.nth.call(null,vec__12632_12657,(0),null);
var v_12659__$1 = cljs.core.nth.call(null,vec__12632_12657,(1),null);
crate.compiler.dom_style.call(null,elem,k_12658,v_12659__$1);

var G__12660 = cljs.core.next.call(null,seq__12625_12651__$1);
var G__12661 = null;
var G__12662 = (0);
var G__12663 = (0);
seq__12625_12639 = G__12660;
chunk__12626_12640 = G__12661;
count__12627_12641 = G__12662;
i__12628_12642 = G__12663;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(crate.binding.binding_QMARK_.call(null,v))){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,v], null));

crate.compiler.dom_style.call(null,elem,crate.binding.value.call(null,v));
} else {
}
}
}

return elem;
});

crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$3 = (function (elem,k,v){
var v__$1 = (cljs.core.truth_(crate.binding.binding_QMARK_.call(null,v))?(function (){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));

return crate.binding.value.call(null,v);
})()
:v);
return goog.style.setStyle(elem,cljs.core.name.call(null,k),v__$1);
});

crate.compiler.dom_style.cljs$lang$maxFixedArity = 3;

crate.compiler.dom_attr = (function crate$compiler$dom_attr(var_args){
var args12664 = [];
var len__7868__auto___12677 = arguments.length;
var i__7869__auto___12678 = (0);
while(true){
if((i__7869__auto___12678 < len__7868__auto___12677)){
args12664.push((arguments[i__7869__auto___12678]));

var G__12679 = (i__7869__auto___12678 + (1));
i__7869__auto___12678 = G__12679;
continue;
} else {
}
break;
}

var G__12666 = args12664.length;
switch (G__12666) {
case 2:
return crate.compiler.dom_attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return crate.compiler.dom_attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12664.length)].join('')));

}
});

crate.compiler.dom_attr.cljs$core$IFn$_invoke$arity$2 = (function (elem,attrs){
if(cljs.core.truth_(elem)){
if(!(cljs.core.map_QMARK_.call(null,attrs))){
return elem.getAttribute(cljs.core.name.call(null,attrs));
} else {
var seq__12667_12681 = cljs.core.seq.call(null,attrs);
var chunk__12668_12682 = null;
var count__12669_12683 = (0);
var i__12670_12684 = (0);
while(true){
if((i__12670_12684 < count__12669_12683)){
var vec__12671_12685 = cljs.core._nth.call(null,chunk__12668_12682,i__12670_12684);
var k_12686 = cljs.core.nth.call(null,vec__12671_12685,(0),null);
var v_12687 = cljs.core.nth.call(null,vec__12671_12685,(1),null);
crate.compiler.dom_attr.call(null,elem,k_12686,v_12687);

var G__12688 = seq__12667_12681;
var G__12689 = chunk__12668_12682;
var G__12690 = count__12669_12683;
var G__12691 = (i__12670_12684 + (1));
seq__12667_12681 = G__12688;
chunk__12668_12682 = G__12689;
count__12669_12683 = G__12690;
i__12670_12684 = G__12691;
continue;
} else {
var temp__4657__auto___12692 = cljs.core.seq.call(null,seq__12667_12681);
if(temp__4657__auto___12692){
var seq__12667_12693__$1 = temp__4657__auto___12692;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12667_12693__$1)){
var c__7604__auto___12694 = cljs.core.chunk_first.call(null,seq__12667_12693__$1);
var G__12695 = cljs.core.chunk_rest.call(null,seq__12667_12693__$1);
var G__12696 = c__7604__auto___12694;
var G__12697 = cljs.core.count.call(null,c__7604__auto___12694);
var G__12698 = (0);
seq__12667_12681 = G__12695;
chunk__12668_12682 = G__12696;
count__12669_12683 = G__12697;
i__12670_12684 = G__12698;
continue;
} else {
var vec__12674_12699 = cljs.core.first.call(null,seq__12667_12693__$1);
var k_12700 = cljs.core.nth.call(null,vec__12674_12699,(0),null);
var v_12701 = cljs.core.nth.call(null,vec__12674_12699,(1),null);
crate.compiler.dom_attr.call(null,elem,k_12700,v_12701);

var G__12702 = cljs.core.next.call(null,seq__12667_12693__$1);
var G__12703 = null;
var G__12704 = (0);
var G__12705 = (0);
seq__12667_12681 = G__12702;
chunk__12668_12682 = G__12703;
count__12669_12683 = G__12704;
i__12670_12684 = G__12705;
continue;
}
} else {
}
}
break;
}

return elem;
}
} else {
return null;
}
});

crate.compiler.dom_attr.cljs$core$IFn$_invoke$arity$3 = (function (elem,k,v){
if(cljs.core._EQ_.call(null,k,new cljs.core.Keyword(null,"style","style",-496642736))){
crate.compiler.dom_style.call(null,elem,v);
} else {
var v_12706__$1 = (cljs.core.truth_(crate.binding.binding_QMARK_.call(null,v))?(function (){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"attr","attr",-604132353),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));

return crate.binding.value.call(null,v);
})()
:v);
elem.setAttribute(cljs.core.name.call(null,k),v_12706__$1);
}

return elem;
});

crate.compiler.dom_attr.cljs$lang$maxFixedArity = 3;

/**
 * Regular expression that parses a CSS-style id and class from a tag name.
 */
crate.compiler.re_tag = /([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?/;
crate.compiler.normalize_map_attrs = (function crate$compiler$normalize_map_attrs(map_attrs){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p__12711){
var vec__12712 = p__12711;
var n = cljs.core.nth.call(null,vec__12712,(0),null);
var v = cljs.core.nth.call(null,vec__12712,(1),null);
if(v === true){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [n,cljs.core.name.call(null,n)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [n,v], null);
}
}),cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.boolean$,cljs.core.second),map_attrs)));
});
/**
 * Ensure a tag vector is of the form [tag-name attrs content].
 */
crate.compiler.normalize_element = (function crate$compiler$normalize_element(p__12716){
var vec__12729 = p__12716;
var seq__12730 = cljs.core.seq.call(null,vec__12729);
var first__12731 = cljs.core.first.call(null,seq__12730);
var seq__12730__$1 = cljs.core.next.call(null,seq__12730);
var tag = first__12731;
var content = seq__12730__$1;
if(!(((tag instanceof cljs.core.Keyword)) || ((tag instanceof cljs.core.Symbol)) || (typeof tag === 'string'))){
throw [cljs.core.str(tag),cljs.core.str(" is not a valid tag name.")].join('');
} else {
}

var vec__12732 = cljs.core.re_matches.call(null,crate.compiler.re_tag,cljs.core.name.call(null,tag));
var _ = cljs.core.nth.call(null,vec__12732,(0),null);
var tag__$1 = cljs.core.nth.call(null,vec__12732,(1),null);
var id = cljs.core.nth.call(null,vec__12732,(2),null);
var class$ = cljs.core.nth.call(null,vec__12732,(3),null);
var vec__12735 = (function (){var vec__12738 = clojure.string.split.call(null,tag__$1,/:/);
var nsp = cljs.core.nth.call(null,vec__12738,(0),null);
var t = cljs.core.nth.call(null,vec__12738,(1),null);
var ns_xmlns = crate.compiler.xmlns.call(null,cljs.core.keyword.call(null,nsp));
if(cljs.core.truth_(t)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var or__6793__auto__ = ns_xmlns;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return nsp;
}
})(),t], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"xhtml","xhtml",1912943770).cljs$core$IFn$_invoke$arity$1(crate.compiler.xmlns),nsp], null);
}
})();
var nsp = cljs.core.nth.call(null,vec__12735,(0),null);
var tag__$2 = cljs.core.nth.call(null,vec__12735,(1),null);
var tag_attrs = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.call(null,((function (vec__12732,_,tag__$1,id,class$,vec__12735,nsp,tag__$2,vec__12729,seq__12730,first__12731,seq__12730__$1,tag,content){
return (function (p1__12715_SHARP_){
return !((cljs.core.second.call(null,p1__12715_SHARP_) == null));
});})(vec__12732,_,tag__$1,id,class$,vec__12735,nsp,tag__$2,vec__12729,seq__12730,first__12731,seq__12730__$1,tag,content))
,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),(function (){var or__6793__auto__ = id;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return null;
}
})(),new cljs.core.Keyword(null,"class","class",-2030961996),(cljs.core.truth_(class$)?clojure.string.replace.call(null,class$,/\./," "):null)], null)));
var map_attrs = cljs.core.first.call(null,content);
if(cljs.core.map_QMARK_.call(null,map_attrs)){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [nsp,tag__$2,cljs.core.merge.call(null,tag_attrs,crate.compiler.normalize_map_attrs.call(null,map_attrs)),cljs.core.next.call(null,content)], null);
} else {
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [nsp,tag__$2,tag_attrs,content], null);
}
});
crate.compiler.parse_content = (function crate$compiler$parse_content(elem,content){
var attrs = cljs.core.first.call(null,content);
if(cljs.core.map_QMARK_.call(null,attrs)){
crate.compiler.dom_attr.call(null,elem,attrs);

return cljs.core.rest.call(null,content);
} else {
return content;
}
});
crate.compiler.create_elem = (cljs.core.truth_(document.createElementNS)?(function (nsp,tag){
return document.createElementNS(nsp,tag);
}):(function (_,tag){
return document.createElement(tag);
}));
crate.compiler.elem_factory = (function crate$compiler$elem_factory(tag_def){
var bindings12745 = crate.compiler.bindings;
crate.compiler.bindings = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);

try{var vec__12746 = crate.compiler.normalize_element.call(null,tag_def);
var nsp = cljs.core.nth.call(null,vec__12746,(0),null);
var tag = cljs.core.nth.call(null,vec__12746,(1),null);
var attrs = cljs.core.nth.call(null,vec__12746,(2),null);
var content = cljs.core.nth.call(null,vec__12746,(3),null);
var elem = crate.compiler.create_elem.call(null,nsp,tag);
crate.compiler.dom_attr.call(null,elem,attrs);

crate.compiler.as_content.call(null,elem,content);

crate.compiler.handle_bindings.call(null,cljs.core.deref.call(null,crate.compiler.bindings),elem);

return elem;
}finally {crate.compiler.bindings = bindings12745;
}});
/**
 * Add an optional attribute argument to a function that returns a vector tag.
 */
crate.compiler.add_optional_attrs = (function crate$compiler$add_optional_attrs(func){
return (function() { 
var G__12755__delegate = function (args){
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,args))){
var vec__12752 = cljs.core.apply.call(null,func,cljs.core.rest.call(null,args));
var seq__12753 = cljs.core.seq.call(null,vec__12752);
var first__12754 = cljs.core.first.call(null,seq__12753);
var seq__12753__$1 = cljs.core.next.call(null,seq__12753);
var tag = first__12754;
var body = seq__12753__$1;
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,body))){
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.merge.call(null,cljs.core.first.call(null,body),cljs.core.first.call(null,args)),cljs.core.rest.call(null,body));
} else {
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.first.call(null,args),body);
}
} else {
return cljs.core.apply.call(null,func,args);
}
};
var G__12755 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__12756__i = 0, G__12756__a = new Array(arguments.length -  0);
while (G__12756__i < G__12756__a.length) {G__12756__a[G__12756__i] = arguments[G__12756__i + 0]; ++G__12756__i;}
  args = new cljs.core.IndexedSeq(G__12756__a,0);
} 
return G__12755__delegate.call(this,args);};
G__12755.cljs$lang$maxFixedArity = 0;
G__12755.cljs$lang$applyTo = (function (arglist__12757){
var args = cljs.core.seq(arglist__12757);
return G__12755__delegate(args);
});
G__12755.cljs$core$IFn$_invoke$arity$variadic = G__12755__delegate;
return G__12755;
})()
;
});
