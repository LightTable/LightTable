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
var seq__12561 = cljs.core.seq.call(null,content);
var chunk__12562 = null;
var count__12563 = (0);
var i__12564 = (0);
while(true){
if((i__12564 < count__12563)){
var c = cljs.core._nth.call(null,chunk__12562,i__12564);
var child_12567 = ((((!((c == null)))?(((false) || (c.crate$compiler$Element$))?true:(((!c.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,c):false)):cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,c)))?crate.compiler._elem.call(null,c):(((c == null))?null:((cljs.core.map_QMARK_.call(null,c))?(function(){throw "Maps cannot be used as content"})():((typeof c === 'string')?goog.dom.createTextNode(c):((cljs.core.vector_QMARK_.call(null,c))?crate.compiler.elem_factory.call(null,c):((cljs.core.seq_QMARK_.call(null,c))?crate$compiler$as_content.call(null,parent,c):(cljs.core.truth_(crate.binding.binding_coll_QMARK_.call(null,c))?(function (){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"coll","coll",1647737163),c);

return crate$compiler$as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})()
:(cljs.core.truth_(crate.binding.binding_QMARK_.call(null,c))?(function (){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"text","text",-1790561697),c);

return crate$compiler$as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})()
:(cljs.core.truth_(c.nodeName)?c:(cljs.core.truth_(c.get)?c.get((0)):goog.dom.createTextNode([cljs.core.str(c)].join(''))
))))))))));
if(cljs.core.truth_(child_12567)){
goog.dom.appendChild(parent,child_12567);
} else {
}

var G__12568 = seq__12561;
var G__12569 = chunk__12562;
var G__12570 = count__12563;
var G__12571 = (i__12564 + (1));
seq__12561 = G__12568;
chunk__12562 = G__12569;
count__12563 = G__12570;
i__12564 = G__12571;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12561);
if(temp__4657__auto__){
var seq__12561__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12561__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12561__$1);
var G__12572 = cljs.core.chunk_rest.call(null,seq__12561__$1);
var G__12573 = c__7604__auto__;
var G__12574 = cljs.core.count.call(null,c__7604__auto__);
var G__12575 = (0);
seq__12561 = G__12572;
chunk__12562 = G__12573;
count__12563 = G__12574;
i__12564 = G__12575;
continue;
} else {
var c = cljs.core.first.call(null,seq__12561__$1);
var child_12576 = ((((!((c == null)))?(((false) || (c.crate$compiler$Element$))?true:(((!c.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,c):false)):cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,c)))?crate.compiler._elem.call(null,c):(((c == null))?null:((cljs.core.map_QMARK_.call(null,c))?(function(){throw "Maps cannot be used as content"})():((typeof c === 'string')?goog.dom.createTextNode(c):((cljs.core.vector_QMARK_.call(null,c))?crate.compiler.elem_factory.call(null,c):((cljs.core.seq_QMARK_.call(null,c))?crate$compiler$as_content.call(null,parent,c):(cljs.core.truth_(crate.binding.binding_coll_QMARK_.call(null,c))?(function (){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"coll","coll",1647737163),c);

return crate$compiler$as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})()
:(cljs.core.truth_(crate.binding.binding_QMARK_.call(null,c))?(function (){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"text","text",-1790561697),c);

return crate$compiler$as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})()
:(cljs.core.truth_(c.nodeName)?c:(cljs.core.truth_(c.get)?c.get((0)):goog.dom.createTextNode([cljs.core.str(c)].join(''))
))))))))));
if(cljs.core.truth_(child_12576)){
goog.dom.appendChild(parent,child_12576);
} else {
}

var G__12577 = cljs.core.next.call(null,seq__12561__$1);
var G__12578 = null;
var G__12579 = (0);
var G__12580 = (0);
seq__12561 = G__12577;
chunk__12562 = G__12578;
count__12563 = G__12579;
i__12564 = G__12580;
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
cljs.core._add_method.call(null,crate.compiler.dom_binding,new cljs.core.Keyword(null,"attr","attr",-604132353),(function (_,p__12581,elem){
var vec__12582 = p__12581;
var k = cljs.core.nth.call(null,vec__12582,(0),null);
var b = cljs.core.nth.call(null,vec__12582,(1),null);
return crate.binding.on_change.call(null,b,((function (vec__12582,k,b){
return (function (v){
return crate.compiler.dom_attr.call(null,elem,k,v);
});})(vec__12582,k,b))
);
}));
cljs.core._add_method.call(null,crate.compiler.dom_binding,new cljs.core.Keyword(null,"style","style",-496642736),(function (_,p__12585,elem){
var vec__12586 = p__12585;
var k = cljs.core.nth.call(null,vec__12586,(0),null);
var b = cljs.core.nth.call(null,vec__12586,(1),null);
return crate.binding.on_change.call(null,b,((function (vec__12586,k,b){
return (function (v){
if(cljs.core.truth_(k)){
return crate.compiler.dom_style.call(null,elem,k,v);
} else {
return crate.compiler.dom_style.call(null,elem,v);
}
});})(vec__12586,k,b))
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
var pred__12589 = cljs.core._EQ_;
var expr__12590 = type;
if(cljs.core.truth_(pred__12589.call(null,new cljs.core.Keyword(null,"add","add",235287739),expr__12590))){
return crate.compiler.dom_add.call(null,bc,parent,elem,v);
} else {
if(cljs.core.truth_(pred__12589.call(null,new cljs.core.Keyword(null,"remove","remove",-131428414),expr__12590))){
return crate.compiler.dom_remove.call(null,bc,elem);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__12590)].join('')));
}
}
}));
}));
crate.compiler.handle_bindings = (function crate$compiler$handle_bindings(bs,elem){
var seq__12602 = cljs.core.seq.call(null,bs);
var chunk__12603 = null;
var count__12604 = (0);
var i__12605 = (0);
while(true){
if((i__12605 < count__12604)){
var vec__12606 = cljs.core._nth.call(null,chunk__12603,i__12605);
var type = cljs.core.nth.call(null,vec__12606,(0),null);
var b = cljs.core.nth.call(null,vec__12606,(1),null);
crate.compiler.dom_binding.call(null,type,b,elem);

var G__12612 = seq__12602;
var G__12613 = chunk__12603;
var G__12614 = count__12604;
var G__12615 = (i__12605 + (1));
seq__12602 = G__12612;
chunk__12603 = G__12613;
count__12604 = G__12614;
i__12605 = G__12615;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12602);
if(temp__4657__auto__){
var seq__12602__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12602__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12602__$1);
var G__12616 = cljs.core.chunk_rest.call(null,seq__12602__$1);
var G__12617 = c__7604__auto__;
var G__12618 = cljs.core.count.call(null,c__7604__auto__);
var G__12619 = (0);
seq__12602 = G__12616;
chunk__12603 = G__12617;
count__12604 = G__12618;
i__12605 = G__12619;
continue;
} else {
var vec__12609 = cljs.core.first.call(null,seq__12602__$1);
var type = cljs.core.nth.call(null,vec__12609,(0),null);
var b = cljs.core.nth.call(null,vec__12609,(1),null);
crate.compiler.dom_binding.call(null,type,b,elem);

var G__12620 = cljs.core.next.call(null,seq__12602__$1);
var G__12621 = null;
var G__12622 = (0);
var G__12623 = (0);
seq__12602 = G__12620;
chunk__12603 = G__12621;
count__12604 = G__12622;
i__12605 = G__12623;
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
var args12624 = [];
var len__7868__auto___12637 = arguments.length;
var i__7869__auto___12638 = (0);
while(true){
if((i__7869__auto___12638 < len__7868__auto___12637)){
args12624.push((arguments[i__7869__auto___12638]));

var G__12639 = (i__7869__auto___12638 + (1));
i__7869__auto___12638 = G__12639;
continue;
} else {
}
break;
}

var G__12626 = args12624.length;
switch (G__12626) {
case 2:
return crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12624.length)].join('')));

}
});

crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$2 = (function (elem,v){
if(typeof v === 'string'){
elem.setAttribute("style",v);
} else {
if(cljs.core.map_QMARK_.call(null,v)){
var seq__12627_12641 = cljs.core.seq.call(null,v);
var chunk__12628_12642 = null;
var count__12629_12643 = (0);
var i__12630_12644 = (0);
while(true){
if((i__12630_12644 < count__12629_12643)){
var vec__12631_12645 = cljs.core._nth.call(null,chunk__12628_12642,i__12630_12644);
var k_12646 = cljs.core.nth.call(null,vec__12631_12645,(0),null);
var v_12647__$1 = cljs.core.nth.call(null,vec__12631_12645,(1),null);
crate.compiler.dom_style.call(null,elem,k_12646,v_12647__$1);

var G__12648 = seq__12627_12641;
var G__12649 = chunk__12628_12642;
var G__12650 = count__12629_12643;
var G__12651 = (i__12630_12644 + (1));
seq__12627_12641 = G__12648;
chunk__12628_12642 = G__12649;
count__12629_12643 = G__12650;
i__12630_12644 = G__12651;
continue;
} else {
var temp__4657__auto___12652 = cljs.core.seq.call(null,seq__12627_12641);
if(temp__4657__auto___12652){
var seq__12627_12653__$1 = temp__4657__auto___12652;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12627_12653__$1)){
var c__7604__auto___12654 = cljs.core.chunk_first.call(null,seq__12627_12653__$1);
var G__12655 = cljs.core.chunk_rest.call(null,seq__12627_12653__$1);
var G__12656 = c__7604__auto___12654;
var G__12657 = cljs.core.count.call(null,c__7604__auto___12654);
var G__12658 = (0);
seq__12627_12641 = G__12655;
chunk__12628_12642 = G__12656;
count__12629_12643 = G__12657;
i__12630_12644 = G__12658;
continue;
} else {
var vec__12634_12659 = cljs.core.first.call(null,seq__12627_12653__$1);
var k_12660 = cljs.core.nth.call(null,vec__12634_12659,(0),null);
var v_12661__$1 = cljs.core.nth.call(null,vec__12634_12659,(1),null);
crate.compiler.dom_style.call(null,elem,k_12660,v_12661__$1);

var G__12662 = cljs.core.next.call(null,seq__12627_12653__$1);
var G__12663 = null;
var G__12664 = (0);
var G__12665 = (0);
seq__12627_12641 = G__12662;
chunk__12628_12642 = G__12663;
count__12629_12643 = G__12664;
i__12630_12644 = G__12665;
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
var args12666 = [];
var len__7868__auto___12679 = arguments.length;
var i__7869__auto___12680 = (0);
while(true){
if((i__7869__auto___12680 < len__7868__auto___12679)){
args12666.push((arguments[i__7869__auto___12680]));

var G__12681 = (i__7869__auto___12680 + (1));
i__7869__auto___12680 = G__12681;
continue;
} else {
}
break;
}

var G__12668 = args12666.length;
switch (G__12668) {
case 2:
return crate.compiler.dom_attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return crate.compiler.dom_attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12666.length)].join('')));

}
});

crate.compiler.dom_attr.cljs$core$IFn$_invoke$arity$2 = (function (elem,attrs){
if(cljs.core.truth_(elem)){
if(!(cljs.core.map_QMARK_.call(null,attrs))){
return elem.getAttribute(cljs.core.name.call(null,attrs));
} else {
var seq__12669_12683 = cljs.core.seq.call(null,attrs);
var chunk__12670_12684 = null;
var count__12671_12685 = (0);
var i__12672_12686 = (0);
while(true){
if((i__12672_12686 < count__12671_12685)){
var vec__12673_12687 = cljs.core._nth.call(null,chunk__12670_12684,i__12672_12686);
var k_12688 = cljs.core.nth.call(null,vec__12673_12687,(0),null);
var v_12689 = cljs.core.nth.call(null,vec__12673_12687,(1),null);
crate.compiler.dom_attr.call(null,elem,k_12688,v_12689);

var G__12690 = seq__12669_12683;
var G__12691 = chunk__12670_12684;
var G__12692 = count__12671_12685;
var G__12693 = (i__12672_12686 + (1));
seq__12669_12683 = G__12690;
chunk__12670_12684 = G__12691;
count__12671_12685 = G__12692;
i__12672_12686 = G__12693;
continue;
} else {
var temp__4657__auto___12694 = cljs.core.seq.call(null,seq__12669_12683);
if(temp__4657__auto___12694){
var seq__12669_12695__$1 = temp__4657__auto___12694;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12669_12695__$1)){
var c__7604__auto___12696 = cljs.core.chunk_first.call(null,seq__12669_12695__$1);
var G__12697 = cljs.core.chunk_rest.call(null,seq__12669_12695__$1);
var G__12698 = c__7604__auto___12696;
var G__12699 = cljs.core.count.call(null,c__7604__auto___12696);
var G__12700 = (0);
seq__12669_12683 = G__12697;
chunk__12670_12684 = G__12698;
count__12671_12685 = G__12699;
i__12672_12686 = G__12700;
continue;
} else {
var vec__12676_12701 = cljs.core.first.call(null,seq__12669_12695__$1);
var k_12702 = cljs.core.nth.call(null,vec__12676_12701,(0),null);
var v_12703 = cljs.core.nth.call(null,vec__12676_12701,(1),null);
crate.compiler.dom_attr.call(null,elem,k_12702,v_12703);

var G__12704 = cljs.core.next.call(null,seq__12669_12695__$1);
var G__12705 = null;
var G__12706 = (0);
var G__12707 = (0);
seq__12669_12683 = G__12704;
chunk__12670_12684 = G__12705;
count__12671_12685 = G__12706;
i__12672_12686 = G__12707;
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
var v_12708__$1 = (cljs.core.truth_(crate.binding.binding_QMARK_.call(null,v))?(function (){
crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"attr","attr",-604132353),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));

return crate.binding.value.call(null,v);
})()
:v);
elem.setAttribute(cljs.core.name.call(null,k),v_12708__$1);
}

return elem;
});

crate.compiler.dom_attr.cljs$lang$maxFixedArity = 3;

/**
 * Regular expression that parses a CSS-style id and class from a tag name.
 */
crate.compiler.re_tag = /([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?/;
crate.compiler.normalize_map_attrs = (function crate$compiler$normalize_map_attrs(map_attrs){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p__12713){
var vec__12714 = p__12713;
var n = cljs.core.nth.call(null,vec__12714,(0),null);
var v = cljs.core.nth.call(null,vec__12714,(1),null);
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
crate.compiler.normalize_element = (function crate$compiler$normalize_element(p__12718){
var vec__12731 = p__12718;
var seq__12732 = cljs.core.seq.call(null,vec__12731);
var first__12733 = cljs.core.first.call(null,seq__12732);
var seq__12732__$1 = cljs.core.next.call(null,seq__12732);
var tag = first__12733;
var content = seq__12732__$1;
if(!(((tag instanceof cljs.core.Keyword)) || ((tag instanceof cljs.core.Symbol)) || (typeof tag === 'string'))){
throw [cljs.core.str(tag),cljs.core.str(" is not a valid tag name.")].join('');
} else {
}

var vec__12734 = cljs.core.re_matches.call(null,crate.compiler.re_tag,cljs.core.name.call(null,tag));
var _ = cljs.core.nth.call(null,vec__12734,(0),null);
var tag__$1 = cljs.core.nth.call(null,vec__12734,(1),null);
var id = cljs.core.nth.call(null,vec__12734,(2),null);
var class$ = cljs.core.nth.call(null,vec__12734,(3),null);
var vec__12737 = (function (){var vec__12740 = clojure.string.split.call(null,tag__$1,/:/);
var nsp = cljs.core.nth.call(null,vec__12740,(0),null);
var t = cljs.core.nth.call(null,vec__12740,(1),null);
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
var nsp = cljs.core.nth.call(null,vec__12737,(0),null);
var tag__$2 = cljs.core.nth.call(null,vec__12737,(1),null);
var tag_attrs = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.call(null,((function (vec__12734,_,tag__$1,id,class$,vec__12737,nsp,tag__$2,vec__12731,seq__12732,first__12733,seq__12732__$1,tag,content){
return (function (p1__12717_SHARP_){
return !((cljs.core.second.call(null,p1__12717_SHARP_) == null));
});})(vec__12734,_,tag__$1,id,class$,vec__12737,nsp,tag__$2,vec__12731,seq__12732,first__12733,seq__12732__$1,tag,content))
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
var bindings12747 = crate.compiler.bindings;
crate.compiler.bindings = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);

try{var vec__12748 = crate.compiler.normalize_element.call(null,tag_def);
var nsp = cljs.core.nth.call(null,vec__12748,(0),null);
var tag = cljs.core.nth.call(null,vec__12748,(1),null);
var attrs = cljs.core.nth.call(null,vec__12748,(2),null);
var content = cljs.core.nth.call(null,vec__12748,(3),null);
var elem = crate.compiler.create_elem.call(null,nsp,tag);
crate.compiler.dom_attr.call(null,elem,attrs);

crate.compiler.as_content.call(null,elem,content);

crate.compiler.handle_bindings.call(null,cljs.core.deref.call(null,crate.compiler.bindings),elem);

return elem;
}finally {crate.compiler.bindings = bindings12747;
}});
/**
 * Add an optional attribute argument to a function that returns a vector tag.
 */
crate.compiler.add_optional_attrs = (function crate$compiler$add_optional_attrs(func){
return (function() { 
var G__12757__delegate = function (args){
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,args))){
var vec__12754 = cljs.core.apply.call(null,func,cljs.core.rest.call(null,args));
var seq__12755 = cljs.core.seq.call(null,vec__12754);
var first__12756 = cljs.core.first.call(null,seq__12755);
var seq__12755__$1 = cljs.core.next.call(null,seq__12755);
var tag = first__12756;
var body = seq__12755__$1;
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,body))){
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.merge.call(null,cljs.core.first.call(null,body),cljs.core.first.call(null,args)),cljs.core.rest.call(null,body));
} else {
return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.first.call(null,args),body);
}
} else {
return cljs.core.apply.call(null,func,args);
}
};
var G__12757 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__12758__i = 0, G__12758__a = new Array(arguments.length -  0);
while (G__12758__i < G__12758__a.length) {G__12758__a[G__12758__i] = arguments[G__12758__i + 0]; ++G__12758__i;}
  args = new cljs.core.IndexedSeq(G__12758__a,0);
} 
return G__12757__delegate.call(this,args);};
G__12757.cljs$lang$maxFixedArity = 0;
G__12757.cljs$lang$applyTo = (function (arglist__12759){
var args = cljs.core.seq(arglist__12759);
return G__12757__delegate(args);
});
G__12757.cljs$core$IFn$_invoke$arity$variadic = G__12757__delegate;
return G__12757;
})()
;
});
