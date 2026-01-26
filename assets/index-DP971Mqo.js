import{r as er}from"./ton-BL9nFnJE.js";import{B as Sr}from"./vendor-C-nSUQJB.js";import"@ton/crypto";(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const v of document.querySelectorAll('link[rel="modulepreload"]'))d(v);new MutationObserver(v=>{for(const h of v)if(h.type==="childList")for(const s of h.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&d(s)}).observe(document,{childList:!0,subtree:!0});function g(v){const h={};return v.integrity&&(h.integrity=v.integrity),v.referrerPolicy&&(h.referrerPolicy=v.referrerPolicy),v.crossOrigin==="use-credentials"?h.credentials="include":v.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function d(v){if(v.ep)return;v.ep=!0;const h=g(v);fetch(v.href,h)}})();var Xt={},Qe={},Wt={},Kt={},ot={},Yt={},et={},Pe={},Oe={},Ir;function qn(){if(Ir)return Oe;Ir=1,Object.defineProperty(Oe,"__esModule",{value:!0});function m(r){const e=r||"";return function(){throw new Error("this method "+e+" is abstract! (it has no implementation in class "+this.constructor.name+")")}}function _(r,e){if(!r)throw new Error(e||"Assertion failed")}function g(r,e,t){let n;Object.defineProperty(r,e,{get(){return n||(n=t.call(this)),n}})}function d(r){return r&&Object.assign({},r)}function v(r,e){const t=[];for(;e-- >0;)t.push(r());return t}function h(r,e){return new Array(e+1).join(r)}function s(r,e){return v(()=>r,e)}function a(r){const e=[];for(let t=0;t<r.length;t++){const n=r[t];r.lastIndexOf(n)!==t&&e.indexOf(n)<0&&e.push(n)}return e}function B(r){const e=[];return r.forEach(t=>{e.indexOf(t)<0&&e.push(t)}),e}function c(r){const e=r[0];return e===e.toUpperCase()}function C(r){return!c(r)}function O(r,e,t){const n=t||" ";return r.length<e?h(n,e-r.length)+r:r}function ne(){this.strings=[]}ne.prototype.append=function(r){this.strings.push(r)},ne.prototype.contents=function(){return this.strings.join("")};const b=r=>String.fromCodePoint(parseInt(r,16));function F(r){if(r.charAt(0)==="\\")switch(r.charAt(1)){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"x":return b(r.slice(2,4));case"u":return r.charAt(2)==="{"?b(r.slice(3,-1)):b(r.slice(2,6));default:return r.charAt(1)}else return r}function z(r){if(r==null)return String(r);const e=Object.prototype.toString.call(r);try{let t;return r.constructor&&r.constructor.name?t=r.constructor.name:e.indexOf("[object ")===0?t=e.slice(8,-1):t=typeof r,t+": "+JSON.stringify(String(r))}catch{return e}}function A(r,e="unexpected null value"){if(r==null)throw new Error(e);return r}var S=Object.freeze({__proto__:null,abstract:m,assert:_,defineLazyProperty:g,clone:d,repeatFn:v,repeatStr:h,repeat:s,getDuplicates:a,copyWithoutDuplicates:B,isSyntactic:c,isLexical:C,padLeft:O,StringBuffer:ne,unescapeCodePoint:F,unexpectedObjToString:z,checkNotNull:A});const o=r=>new RegExp(String.raw`\p{${r}}`,"u"),i=Object.fromEntries(["Cc","Cf","Cn","Co","Cs","Ll","Lm","Lo","Lt","Lu","Mc","Me","Mn","Nd","Nl","No","Pc","Pd","Pe","Pf","Pi","Po","Ps","Sc","Sk","Sm","So","Zl","Zp","Zs"].map(r=>[r,o(r)]));i.Ltmo=new RegExp("\\p{Lt}|\\p{Lm}|\\p{Lo}","u");const u=Object.fromEntries(["XID_Start","XID_Continue","White_Space"].map(r=>[r,o(r)]));class f{constructor(){if(this.constructor===f)throw new Error("PExpr cannot be instantiated -- it's abstract")}withSource(e){return e&&(this.source=e.trimmed()),this}}const p=Object.create(f.prototype),w=Object.create(f.prototype);class I extends f{constructor(e){super(),this.obj=e}}class N extends f{constructor(e,t){super(),this.from=e,this.to=t,this.matchCodePoint=e.length>1||t.length>1}}class x extends f{constructor(e){super(),this.index=e}}class y extends f{constructor(e){super(),this.terms=e}}class L extends y{constructor(e,t,n){const l=e.rules[t].body;super([n,l]),this.superGrammar=e,this.name=t,this.body=n}}class q extends y{constructor(e,t,n,l){const E=e.rules[t].body;super([...n,E,...l]),this.superGrammar=e,this.ruleName=t,this.expansionPos=n.length}}class V extends f{constructor(e){super(),this.factors=e}}class se extends f{constructor(e){super(),this.expr=e}}class oe extends se{}class ye extends se{}class T extends se{}oe.prototype.operator="*",ye.prototype.operator="+",T.prototype.operator="?",oe.prototype.minNumMatches=0,ye.prototype.minNumMatches=1,T.prototype.minNumMatches=0,oe.prototype.maxNumMatches=Number.POSITIVE_INFINITY,ye.prototype.maxNumMatches=Number.POSITIVE_INFINITY,T.prototype.maxNumMatches=1;class P extends f{constructor(e){super(),this.expr=e}}class k extends f{constructor(e){super(),this.expr=e}}class re extends f{constructor(e){super(),this.expr=e}}class j extends f{constructor(e,t=[]){super(),this.ruleName=e,this.args=t}isSyntactic(){return c(this.ruleName)}toMemoKey(){return this._memoKey||Object.defineProperty(this,"_memoKey",{value:this.toString()}),this._memoKey}}class J extends f{constructor(e){if(super(),this.categoryOrProp=e,e in i)this.pattern=i[e];else if(e in u)this.pattern=u[e];else throw new Error(`Invalid Unicode category or property name: ${JSON.stringify(e)}`)}}function le(r,e){let t;return e?(t=new Error(e.getLineAndColumnMessage()+r),t.shortMessage=r,t.interval=e):t=new Error(r),t}function ve(){return le("Interval sources don't match")}function Ee(r){const e=new Error;return Object.defineProperty(e,"message",{enumerable:!0,get(){return r.message}}),Object.defineProperty(e,"shortMessage",{enumerable:!0,get(){return"Expected "+r.getExpectedText()}}),e.interval=r.getInterval(),e}function ce(r,e,t){const n=e?`Grammar ${r} is not declared in namespace '${e}'`:"Undeclared grammar "+r;return le(n,t)}function U(r,e){return le("Grammar "+r.name+" is already declared in this namespace")}function D(r){return le(`Grammar '${r.name}' does not support incremental parsing`)}function K(r,e,t){return le("Rule "+r+" is not declared in grammar "+e,t)}function de(r,e,t){return le("Cannot override rule "+r+" because it is not declared in "+e,t)}function me(r,e,t){return le("Cannot extend rule "+r+" because it is not declared in "+e,t)}function ie(r,e,t,n){let l="Duplicate declaration for rule '"+r+"' in grammar '"+e+"'";return e!==t&&(l+=" (originally declared in '"+t+"')"),le(l,n)}function ge(r,e,t,n){return le("Wrong number of parameters for rule "+r+" (expected "+e+", got "+t+")",n)}function _e(r,e,t,n){return le("Wrong number of arguments for rule "+r+" (expected "+e+", got "+t+")",n)}function Y(r,e,t){return le("Duplicate parameter names in rule "+r+": "+e.join(", "),t)}function M(r,e){return le("Invalid parameter to rule "+r+": "+e+" has arity "+e.getArity()+", but parameter expressions must have arity 1",e.source)}const R="NOTE: A _syntactic rule_ is a rule whose name begins with a capital letter. See https://ohmjs.org/d/svl for more details.";function H(r,e){return le("Cannot apply syntactic rule "+r+" from here (inside a lexical context)",e.source)}function Z(r){const{ruleName:e}=r;return le(`applySyntactic is for syntactic rules, but '${e}' is a lexical rule. `+R,r.source)}function X(r){return le("applySyntactic is not required here (in a syntactic context)",r.source)}function ee(r,e){return le("Incorrect argument type: expected "+r,e.source)}function xe(r){return le("'...' can appear at most once in a rule body",r.source)}function pe(r){const e=r._node;_(e&&e.isNonterminal()&&e.ctorName==="escapeChar_unicodeCodePoint");const t=r.children.slice(1,-1).map(l=>l.source),n=t[0].coverageWith(...t.slice(1));return le(`U+${n.contents} is not a valid Unicode code point`,n)}function he(r,e){const t=e.length>0?e[e.length-1].args:[];let l="Nullable expression "+r.expr.substituteParams(t)+" is not allowed inside '"+r.operator+"' (possible infinite loop)";if(e.length>0){const E=e.map($=>new j($.ruleName,$.args)).join(`
`);l+=`
Application stack (most recent application last):
`+E}return le(l,r.expr.source)}function Se(r,e,t,n){return le("Rule "+r+" involves an alternation which has inconsistent arity (expected "+e+", got "+t+")",n.source)}function Fe(r){const e=r.map(t=>t.message);return le(["Errors:"].concat(e).join(`
- `),r[0].interval)}function ze(r,e,t,n){let l=n.slice(0,-1).map(Q=>{const fe="  "+Q[0].name+" > "+Q[1];return Q.length===3?fe+" for '"+Q[2]+"'":fe}).join(`
`);l+=`
  `+e+" > "+r;let E="";r==="_iter"&&(E=[`
NOTE: as of Ohm v16, there is no default action for iteration nodes — see `,"  https://ohmjs.org/d/dsa for details."].join(`
`));const $=[`Missing semantic action for '${r}' in ${t} '${e}'.${E}`,"Action stack (most recent call last):",l].join(`
`),te=le($);return te.name="missingSemanticAction",te}function Ze(r){if(r.length===1)throw r[0];if(r.length>1)throw Fe(r)}function Je(r){let e=0;return r.map(n=>{const l=n.toString();return e=Math.max(e,l.length),l}).map(n=>O(n,e))}function ke(r,e,t){const n=r.length,l=r.slice(0,t),E=r.slice(t+e.length);return(l+e+E).substr(0,n)}function rt(...r){const e=this,{offset:t}=e,{repeatStr:n}=S,l=new ne;l.append("Line "+e.lineNum+", col "+e.colNum+`:
`);const E=Je([e.prevLine==null?0:e.lineNum-1,e.lineNum,e.nextLine==null?0:e.lineNum+1]),$=(W,G,ae)=>{l.append(ae+E[W]+" | "+G+`
`)};e.prevLine!=null&&$(0,e.prevLine,"  "),$(1,e.line,"> ");const te=e.line.length;let Q=n(" ",te+1);for(let W=0;W<r.length;++W){let G=r[W][0],ae=r[W][1];_(G>=0&&G<=ae,"range start must be >= 0 and <= end");const be=t-e.colNum+1;G=Math.max(0,G-be),ae=Math.min(ae-be,te),Q=ke(Q,n("~",ae-G),G)}const fe=2+E[1].length+3;return l.append(n(" ",fe)),Q=ke(Q,"^",e.colNum-1),l.append(Q.replace(/ +$/,"")+`
`),e.nextLine!=null&&$(2,e.nextLine,"  "),l.contents()}let Ue=[];function xt(r){Ue.push(r)}function $t(r){Ue.forEach(e=>{e(r)}),Ue=null}function Ot(r,e){let t=1,n=1,l=0,E=0,$=null,te=null,Q=-1;for(;l<e;){const G=r.charAt(l++);G===`
`?(t++,n=1,Q=E,E=l):G!=="\r"&&n++}let fe=r.indexOf(`
`,E);if(fe===-1)fe=r.length;else{const G=r.indexOf(`
`,fe+1);$=G===-1?r.slice(fe):r.slice(fe,G),$=$.replace(/^\r?\n/,"").replace(/\r$/,"")}Q>=0&&(te=r.slice(Q,E).replace(/\r?\n$/,""));const W=r.slice(E,fe).replace(/\r$/,"");return{offset:e,lineNum:t,colNum:n,line:W,prevLine:te,nextLine:$,toString:rt}}function Dt(r,e,...t){return Ot(r,e).toString(...t)}const ir=(()=>{let r=0;return e=>""+e+r++})();class Ce{constructor(e,t,n){Object.defineProperty(this,"_sourceString",{value:e,configurable:!1,enumerable:!1,writable:!1}),this.startIdx=t,this.endIdx=n}get sourceString(){return this._sourceString}get contents(){return this._contents===void 0&&(this._contents=this.sourceString.slice(this.startIdx,this.endIdx)),this._contents}get length(){return this.endIdx-this.startIdx}coverageWith(...e){return Ce.coverage(...e,this)}collapsedLeft(){return new Ce(this.sourceString,this.startIdx,this.startIdx)}collapsedRight(){return new Ce(this.sourceString,this.endIdx,this.endIdx)}getLineAndColumn(){return Ot(this.sourceString,this.startIdx)}getLineAndColumnMessage(){const e=[this.startIdx,this.endIdx];return Dt(this.sourceString,this.startIdx,e)}minus(e){if(this.sourceString!==e.sourceString)throw ve();return this.startIdx===e.startIdx&&this.endIdx===e.endIdx?[]:this.startIdx<e.startIdx&&e.endIdx<this.endIdx?[new Ce(this.sourceString,this.startIdx,e.startIdx),new Ce(this.sourceString,e.endIdx,this.endIdx)]:this.startIdx<e.endIdx&&e.endIdx<this.endIdx?[new Ce(this.sourceString,e.endIdx,this.endIdx)]:this.startIdx<e.startIdx&&e.startIdx<this.endIdx?[new Ce(this.sourceString,this.startIdx,e.startIdx)]:[this]}relativeTo(e){if(this.sourceString!==e.sourceString)throw ve();return _(this.startIdx>=e.startIdx&&this.endIdx<=e.endIdx,"other interval does not cover this one"),new Ce(this.sourceString,this.startIdx-e.startIdx,this.endIdx-e.startIdx)}trimmed(){const{contents:e}=this,t=this.startIdx+e.match(/^\s*/)[0].length,n=this.endIdx-e.match(/\s*$/)[0].length;return new Ce(this.sourceString,t,n)}subInterval(e,t){const n=this.startIdx+e;return new Ce(this.sourceString,n,n+t)}}Ce.coverage=function(r,...e){let{startIdx:t,endIdx:n}=r;for(const l of e){if(l.sourceString!==r.sourceString)throw ve();t=Math.min(t,l.startIdx),n=Math.max(n,l.endIdx)}return new Ce(r.sourceString,t,n)};const fn=65535,dn=1114111;class vt{constructor(e){this.source=e,this.pos=0,this.examinedLength=0}atEnd(){const e=this.pos>=this.source.length;return this.examinedLength=Math.max(this.examinedLength,this.pos+1),e}next(){const e=this.source[this.pos++];return this.examinedLength=Math.max(this.examinedLength,this.pos),e}nextCharCode(){const e=this.next();return e&&e.charCodeAt(0)}nextCodePoint(){const e=this.source.slice(this.pos++).codePointAt(0);return e>fn&&(this.pos+=1),this.examinedLength=Math.max(this.examinedLength,this.pos),e}matchString(e,t){let n;if(t){for(n=0;n<e.length;n++){const l=this.next(),E=e[n];if(l==null||l.toUpperCase()!==E.toUpperCase())return!1}return!0}for(n=0;n<e.length;n++)if(this.next()!==e[n])return!1;return!0}sourceSlice(e,t){return this.source.slice(e,t)}interval(e,t){return new Ce(this.source,e,t||this.pos)}}class sr{constructor(e,t,n,l,E,$,te){this.matcher=e,this.input=t,this.startExpr=n,this._cst=l,this._cstOffset=E,this._rightmostFailurePosition=$,this._rightmostFailures=te,this.failed()&&(g(this,"message",function(){const Q="Expected "+this.getExpectedText();return Dt(this.input,this.getRightmostFailurePosition())+Q}),g(this,"shortMessage",function(){const Q="expected "+this.getExpectedText(),fe=Ot(this.input,this.getRightmostFailurePosition());return"Line "+fe.lineNum+", col "+fe.colNum+": "+Q}))}succeeded(){return!!this._cst}failed(){return!this.succeeded()}getRightmostFailurePosition(){return this._rightmostFailurePosition}getRightmostFailures(){if(!this._rightmostFailures){this.matcher.setInput(this.input);const e=this.matcher._match(this.startExpr,{tracing:!1,positionToRecordFailures:this.getRightmostFailurePosition()});this._rightmostFailures=e.getRightmostFailures()}return this._rightmostFailures}toString(){return this.succeeded()?"[match succeeded]":"[match failed at position "+this.getRightmostFailurePosition()+"]"}getExpectedText(){if(this.succeeded())throw new Error("cannot get expected text of a successful MatchResult");const e=new ne;let t=this.getRightmostFailures();t=t.filter(n=>!n.isFluffy());for(let n=0;n<t.length;n++)n>0&&(n===t.length-1?e.append(t.length>2?", or ":" or "):e.append(", ")),e.append(t[n].toString());return e.contents()}getInterval(){const e=this.getRightmostFailurePosition();return new Ce(this.input,e,e)}}class mn{constructor(){this.applicationMemoKeyStack=[],this.memo={},this.maxExaminedLength=0,this.maxRightmostFailureOffset=-1,this.currentLeftRecursion=void 0}isActive(e){return this.applicationMemoKeyStack.indexOf(e.toMemoKey())>=0}enter(e){this.applicationMemoKeyStack.push(e.toMemoKey())}exit(){this.applicationMemoKeyStack.pop()}startLeftRecursion(e,t){t.isLeftRecursion=!0,t.headApplication=e,t.nextLeftRecursion=this.currentLeftRecursion,this.currentLeftRecursion=t;const{applicationMemoKeyStack:n}=this,l=n.indexOf(e.toMemoKey())+1,E=n.slice(l);t.isInvolved=function($){return E.indexOf($)>=0},t.updateInvolvedApplicationMemoKeys=function(){for(let $=l;$<n.length;$++){const te=n[$];this.isInvolved(te)||E.push(te)}}}endLeftRecursion(){this.currentLeftRecursion=this.currentLeftRecursion.nextLeftRecursion}shouldUseMemoizedResult(e){if(!e.isLeftRecursion)return!0;const{applicationMemoKeyStack:t}=this;for(let n=0;n<t.length;n++){const l=t[n];if(e.isInvolved(l))return!1}return!0}memoize(e,t){return this.memo[e]=t,this.maxExaminedLength=Math.max(this.maxExaminedLength,t.examinedLength),this.maxRightmostFailureOffset=Math.max(this.maxRightmostFailureOffset,t.rightmostFailureOffset),t}clearObsoleteEntries(e,t){if(e+this.maxExaminedLength<=t)return;const{memo:n}=this;this.maxExaminedLength=0,this.maxRightmostFailureOffset=-1,Object.keys(n).forEach(l=>{const E=n[l];e+E.examinedLength>t?delete n[l]:(this.maxExaminedLength=Math.max(this.maxExaminedLength,E.examinedLength),this.maxRightmostFailureOffset=Math.max(this.maxRightmostFailureOffset,E.rightmostFailureOffset))})}}const hn="✗",gn="✓",yn="⋅",_n="⇒",bn="␉",xn="␊",vn="␍",Ft={succeeded:1,isRootNode:2,isImplicitSpaces:4,isMemoized:8,isHeadOfLeftRecursion:16,terminatesLR:32};function En(r){return s(" ",r).join("")}function Tn(r,e,t){const n=ar(r.slice(e,e+t));return n.length<t?n+s(" ",t-n.length).join(""):n}function ar(r){return typeof r=="string"?r.replace(/ /g,yn).replace(/\t/g,bn).replace(/\n/g,xn).replace(/\r/g,vn):String(r)}class Ve{constructor(e,t,n,l,E,$,te){this.input=e,this.pos=this.pos1=t,this.pos2=n,this.source=new Ce(e,t,n),this.expr=l,this.bindings=$,this.children=te||[],this.terminatingLREntry=null,this._flags=E?Ft.succeeded:0}get displayString(){return this.expr.toDisplayString()}clone(){return this.cloneWithExpr(this.expr)}cloneWithExpr(e){const t=new Ve(this.input,this.pos,this.pos2,e,this.succeeded,this.bindings,this.children);return t.isHeadOfLeftRecursion=this.isHeadOfLeftRecursion,t.isImplicitSpaces=this.isImplicitSpaces,t.isMemoized=this.isMemoized,t.isRootNode=this.isRootNode,t.terminatesLR=this.terminatesLR,t.terminatingLREntry=this.terminatingLREntry,t}recordLRTermination(e,t){this.terminatingLREntry=new Ve(this.input,this.pos,this.pos2,this.expr,!1,[t],[e]),this.terminatingLREntry.terminatesLR=!0}walk(e,t){let n=e;typeof n=="function"&&(n={enter:n});function l(E,$,te){let Q=!0;n.enter&&n.enter.call(t,E,$,te)===Ve.prototype.SKIP&&(Q=!1),Q&&(E.children.forEach(fe=>{l(fe,E,te+1)}),n.exit&&n.exit.call(t,E,$,te))}this.isRootNode?this.children.forEach(E=>{l(E,null,0)}):l(this,null,0)}toString(){const e=new ne;return this.walk((t,n,l)=>{if(!t)return this.SKIP;if(t.expr.constructor.name!=="Alt"){if(e.append(Tn(t.input,t.pos,10)+En(l*2+1)),e.append((t.succeeded?gn:hn)+" "+t.displayString),t.isHeadOfLeftRecursion&&e.append(" (LR)"),t.succeeded){const $=ar(t.source.contents);e.append(" "+_n+"  "),e.append(typeof $=="string"?'"'+$+'"':$)}e.append(`
`)}}),e.contents()}}Ve.prototype.SKIP={},Object.keys(Ft).forEach(r=>{const e=Ft[r];Object.defineProperty(Ve.prototype,r,{get(){return(this._flags&e)!==0},set(t){t?this._flags|=e:this._flags&=~e}})}),f.prototype.allowsSkippingPrecedingSpace=m("allowsSkippingPrecedingSpace"),p.allowsSkippingPrecedingSpace=w.allowsSkippingPrecedingSpace=j.prototype.allowsSkippingPrecedingSpace=I.prototype.allowsSkippingPrecedingSpace=N.prototype.allowsSkippingPrecedingSpace=J.prototype.allowsSkippingPrecedingSpace=function(){return!0},y.prototype.allowsSkippingPrecedingSpace=se.prototype.allowsSkippingPrecedingSpace=re.prototype.allowsSkippingPrecedingSpace=k.prototype.allowsSkippingPrecedingSpace=P.prototype.allowsSkippingPrecedingSpace=x.prototype.allowsSkippingPrecedingSpace=V.prototype.allowsSkippingPrecedingSpace=function(){return!1};let nt;xt(r=>{nt=r});let Et;f.prototype.assertAllApplicationsAreValid=function(r,e){Et=0,this._assertAllApplicationsAreValid(r,e)},f.prototype._assertAllApplicationsAreValid=m("_assertAllApplicationsAreValid"),p._assertAllApplicationsAreValid=w._assertAllApplicationsAreValid=I.prototype._assertAllApplicationsAreValid=N.prototype._assertAllApplicationsAreValid=x.prototype._assertAllApplicationsAreValid=J.prototype._assertAllApplicationsAreValid=function(r,e){},re.prototype._assertAllApplicationsAreValid=function(r,e){Et++,this.expr._assertAllApplicationsAreValid(r,e),Et--},y.prototype._assertAllApplicationsAreValid=function(r,e){for(let t=0;t<this.terms.length;t++)this.terms[t]._assertAllApplicationsAreValid(r,e)},V.prototype._assertAllApplicationsAreValid=function(r,e){for(let t=0;t<this.factors.length;t++)this.factors[t]._assertAllApplicationsAreValid(r,e)},se.prototype._assertAllApplicationsAreValid=P.prototype._assertAllApplicationsAreValid=k.prototype._assertAllApplicationsAreValid=function(r,e){this.expr._assertAllApplicationsAreValid(r,e)},j.prototype._assertAllApplicationsAreValid=function(r,e,t=!1){const n=e.rules[this.ruleName],l=c(r)&&Et===0;if(!n)throw K(this.ruleName,e.name,this.source);if(!t&&c(this.ruleName)&&!l)throw H(this.ruleName,this);const E=this.args.length,$=n.formals.length;if(E!==$)throw _e(this.ruleName,$,E,this.source);const te=nt&&n===nt.rules.applySyntactic;if(nt&&n===nt.rules.caseInsensitive&&!(this.args[0]instanceof I))throw ee('a Terminal (e.g. "abc")',this.args[0]);if(te){const fe=this.args[0];if(!(fe instanceof j))throw ee("a syntactic rule application",fe);if(!c(fe.ruleName))throw Z(fe);if(l)throw X(this)}this.args.forEach(fe=>{if(fe._assertAllApplicationsAreValid(r,e,te),fe.getArity()!==1)throw M(this.ruleName,fe)})},f.prototype.assertChoicesHaveUniformArity=m("assertChoicesHaveUniformArity"),p.assertChoicesHaveUniformArity=w.assertChoicesHaveUniformArity=I.prototype.assertChoicesHaveUniformArity=N.prototype.assertChoicesHaveUniformArity=x.prototype.assertChoicesHaveUniformArity=re.prototype.assertChoicesHaveUniformArity=J.prototype.assertChoicesHaveUniformArity=function(r){},y.prototype.assertChoicesHaveUniformArity=function(r){if(this.terms.length===0)return;const e=this.terms[0].getArity();for(let t=0;t<this.terms.length;t++){const n=this.terms[t];n.assertChoicesHaveUniformArity();const l=n.getArity();if(e!==l)throw Se(r,e,l,n)}},L.prototype.assertChoicesHaveUniformArity=function(r){const e=this.terms[0].getArity(),t=this.terms[1].getArity();if(e!==t)throw Se(r,t,e,this.terms[0])},V.prototype.assertChoicesHaveUniformArity=function(r){for(let e=0;e<this.factors.length;e++)this.factors[e].assertChoicesHaveUniformArity(r)},se.prototype.assertChoicesHaveUniformArity=function(r){this.expr.assertChoicesHaveUniformArity(r)},P.prototype.assertChoicesHaveUniformArity=function(r){},k.prototype.assertChoicesHaveUniformArity=function(r){this.expr.assertChoicesHaveUniformArity(r)},j.prototype.assertChoicesHaveUniformArity=function(r){},f.prototype.assertIteratedExprsAreNotNullable=m("assertIteratedExprsAreNotNullable"),p.assertIteratedExprsAreNotNullable=w.assertIteratedExprsAreNotNullable=I.prototype.assertIteratedExprsAreNotNullable=N.prototype.assertIteratedExprsAreNotNullable=x.prototype.assertIteratedExprsAreNotNullable=J.prototype.assertIteratedExprsAreNotNullable=function(r){},y.prototype.assertIteratedExprsAreNotNullable=function(r){for(let e=0;e<this.terms.length;e++)this.terms[e].assertIteratedExprsAreNotNullable(r)},V.prototype.assertIteratedExprsAreNotNullable=function(r){for(let e=0;e<this.factors.length;e++)this.factors[e].assertIteratedExprsAreNotNullable(r)},se.prototype.assertIteratedExprsAreNotNullable=function(r){if(this.expr.assertIteratedExprsAreNotNullable(r),this.expr.isNullable(r))throw he(this,[])},T.prototype.assertIteratedExprsAreNotNullable=P.prototype.assertIteratedExprsAreNotNullable=k.prototype.assertIteratedExprsAreNotNullable=re.prototype.assertIteratedExprsAreNotNullable=function(r){this.expr.assertIteratedExprsAreNotNullable(r)},j.prototype.assertIteratedExprsAreNotNullable=function(r){this.args.forEach(e=>{e.assertIteratedExprsAreNotNullable(r)})};class Rt{constructor(e){this.matchLength=e}get ctorName(){throw new Error("subclass responsibility")}numChildren(){return this.children?this.children.length:0}childAt(e){if(this.children)return this.children[e]}indexOfChild(e){return this.children.indexOf(e)}hasChildren(){return this.numChildren()>0}hasNoChildren(){return!this.hasChildren()}onlyChild(){if(this.numChildren()!==1)throw new Error("cannot get only child of a node of type "+this.ctorName+" (it has "+this.numChildren()+" children)");return this.firstChild()}firstChild(){if(this.hasNoChildren())throw new Error("cannot get first child of a "+this.ctorName+" node, which has no children");return this.childAt(0)}lastChild(){if(this.hasNoChildren())throw new Error("cannot get last child of a "+this.ctorName+" node, which has no children");return this.childAt(this.numChildren()-1)}childBefore(e){const t=this.indexOfChild(e);if(t<0)throw new Error("Node.childBefore() called w/ an argument that is not a child");if(t===0)throw new Error("cannot get child before first child");return this.childAt(t-1)}childAfter(e){const t=this.indexOfChild(e);if(t<0)throw new Error("Node.childAfter() called w/ an argument that is not a child");if(t===this.numChildren()-1)throw new Error("cannot get child after last child");return this.childAt(t+1)}isTerminal(){return!1}isNonterminal(){return!1}isIteration(){return!1}isOptional(){return!1}}class qe extends Rt{get ctorName(){return"_terminal"}isTerminal(){return!0}get primitiveValue(){throw new Error("The `primitiveValue` property was removed in Ohm v17.")}}class Sn extends Rt{constructor(e,t,n,l){super(l),this.ruleName=e,this.children=t,this.childOffsets=n}get ctorName(){return this.ruleName}isNonterminal(){return!0}isLexical(){return C(this.ctorName)}isSyntactic(){return c(this.ctorName)}}class or extends Rt{constructor(e,t,n,l){super(n),this.children=e,this.childOffsets=t,this.optional=l}get ctorName(){return"_iter"}isIteration(){return!0}isOptional(){return this.optional}}f.prototype.eval=m("eval"),p.eval=function(r){const{inputStream:e}=r,t=e.pos,n=e.nextCodePoint();return n!==void 0?(r.pushBinding(new qe(String.fromCodePoint(n).length),t),!0):(r.processFailure(t,this),!1)},w.eval=function(r){const{inputStream:e}=r,t=e.pos;return e.atEnd()?(r.pushBinding(new qe(0),t),!0):(r.processFailure(t,this),!1)},I.prototype.eval=function(r){const{inputStream:e}=r,t=e.pos;return e.matchString(this.obj)?(r.pushBinding(new qe(this.obj.length),t),!0):(r.processFailure(t,this),!1)},N.prototype.eval=function(r){const{inputStream:e}=r,t=e.pos,n=this.matchCodePoint?e.nextCodePoint():e.nextCharCode();return n!==void 0&&this.from.codePointAt(0)<=n&&n<=this.to.codePointAt(0)?(r.pushBinding(new qe(String.fromCodePoint(n).length),t),!0):(r.processFailure(t,this),!1)},x.prototype.eval=function(r){return r.eval(r.currentApplication().args[this.index])},re.prototype.eval=function(r){r.enterLexifiedContext();const e=r.eval(this.expr);return r.exitLexifiedContext(),e},y.prototype.eval=function(r){for(let e=0;e<this.terms.length;e++)if(r.eval(this.terms[e]))return!0;return!1},V.prototype.eval=function(r){for(let e=0;e<this.factors.length;e++){const t=this.factors[e];if(!r.eval(t))return!1}return!0},se.prototype.eval=function(r){const{inputStream:e}=r,t=e.pos,n=this.getArity(),l=[],E=[];for(;l.length<n;)l.push([]),E.push([]);let $=0,te=t,Q;for(;$<this.maxNumMatches&&r.eval(this.expr);){if(e.pos===te)throw he(this,r._applicationStack);te=e.pos,$++;const ae=r._bindings.splice(r._bindings.length-n,n),be=r._bindingOffsets.splice(r._bindingOffsets.length-n,n);for(Q=0;Q<ae.length;Q++)l[Q].push(ae[Q]),E[Q].push(be[Q])}if($<this.minNumMatches)return!1;let fe=r.posToOffset(t),W=0;if($>0){const ae=l[n-1],be=E[n-1],Te=be[be.length-1]+ae[ae.length-1].matchLength;fe=E[0][0],W=Te-fe}const G=this instanceof T;for(Q=0;Q<l.length;Q++)r._bindings.push(new or(l[Q],E[Q],W,G)),r._bindingOffsets.push(fe);return!0},P.prototype.eval=function(r){const{inputStream:e}=r,t=e.pos;r.pushFailuresInfo();const n=r.eval(this.expr);return r.popFailuresInfo(),n?(r.processFailure(t,this),!1):(e.pos=t,!0)},k.prototype.eval=function(r){const{inputStream:e}=r,t=e.pos;return r.eval(this.expr)?(e.pos=t,!0):!1},j.prototype.eval=function(r){const e=r.currentApplication(),t=e?e.args:[],n=this.substituteParams(t),l=r.getCurrentPosInfo();if(l.isActive(n))return n.handleCycle(r);const E=n.toMemoKey(),$=l.memo[E];if($&&l.shouldUseMemoizedResult($)){if(r.hasNecessaryInfo($))return r.useMemoizedResult(r.inputStream.pos,$);delete l.memo[E]}return n.reallyEval(r)},j.prototype.handleCycle=function(r){const e=r.getCurrentPosInfo(),{currentLeftRecursion:t}=e,n=this.toMemoKey();let l=e.memo[n];return t&&t.headApplication.toMemoKey()===n?l.updateInvolvedApplicationMemoKeys():l||(l=e.memoize(n,{matchLength:0,examinedLength:0,value:!1,rightmostFailureOffset:-1}),e.startLeftRecursion(this,l)),r.useMemoizedResult(r.inputStream.pos,l)},j.prototype.reallyEval=function(r){const{inputStream:e}=r,t=e.pos,n=r.getCurrentPosInfo(),l=r.grammar.rules[this.ruleName],{body:E}=l,{description:$}=l;r.enterApplication(n,this),$&&r.pushFailuresInfo();const te=e.examinedLength;e.examinedLength=0;let Q=this.evalOnce(E,r);const fe=n.currentLeftRecursion,W=this.toMemoKey(),G=fe&&fe.headApplication.toMemoKey()===W;let ae;r.doNotMemoize?r.doNotMemoize=!1:G?(Q=this.growSeedResult(E,r,t,fe,Q),n.endLeftRecursion(),ae=fe,ae.examinedLength=e.examinedLength-t,ae.rightmostFailureOffset=r._getRightmostFailureOffset(),n.memoize(W,ae)):(!fe||!fe.isInvolved(W))&&(ae=n.memoize(W,{matchLength:e.pos-t,examinedLength:e.examinedLength-t,value:Q,failuresAtRightmostPosition:r.cloneRecordedFailures(),rightmostFailureOffset:r._getRightmostFailureOffset()}));const be=!!Q;if($&&(r.popFailuresInfo(),be||r.processFailure(t,this),ae&&(ae.failuresAtRightmostPosition=r.cloneRecordedFailures())),r.isTracing()&&ae){const Te=r.getTraceEntry(t,this,be,be?[Q]:[]);G&&(_(Te.terminatingLREntry!=null||!be),Te.isHeadOfLeftRecursion=!0),ae.traceEntry=Te}return e.examinedLength=Math.max(e.examinedLength,te),r.exitApplication(n,Q),be},j.prototype.evalOnce=function(r,e){const{inputStream:t}=e,n=t.pos;if(e.eval(r)){const l=r.getArity(),E=e._bindings.splice(e._bindings.length-l,l),$=e._bindingOffsets.splice(e._bindingOffsets.length-l,l),te=t.pos-n;return new Sn(this.ruleName,E,$,te)}else return!1},j.prototype.growSeedResult=function(r,e,t,n,l){if(!l)return!1;const{inputStream:E}=e;for(;;){if(n.matchLength=E.pos-t,n.value=l,n.failuresAtRightmostPosition=e.cloneRecordedFailures(),e.isTracing()){const $=e.trace[e.trace.length-1];n.traceEntry=new Ve(e.input,t,E.pos,this,!0,[l],[$.clone()])}if(E.pos=t,l=this.evalOnce(r,e),E.pos-t<=n.matchLength)break;e.isTracing()&&e.trace.splice(-2,1)}return e.isTracing()&&n.traceEntry.recordLRTermination(e.trace.pop(),l),E.pos=t+n.matchLength,n.value},J.prototype.eval=function(r){const{inputStream:e}=r,t=e.pos,n=e.nextCodePoint();if(n!==void 0&&n<=dn){const l=String.fromCodePoint(n);if(this.pattern.test(l))return r.pushBinding(new qe(l.length),t),!0}return r.processFailure(t,this),!1},f.prototype.getArity=m("getArity"),p.getArity=w.getArity=I.prototype.getArity=N.prototype.getArity=x.prototype.getArity=j.prototype.getArity=J.prototype.getArity=function(){return 1},y.prototype.getArity=function(){return this.terms.length===0?0:this.terms[0].getArity()},V.prototype.getArity=function(){let r=0;for(let e=0;e<this.factors.length;e++)r+=this.factors[e].getArity();return r},se.prototype.getArity=function(){return this.expr.getArity()},P.prototype.getArity=function(){return 0},k.prototype.getArity=re.prototype.getArity=function(){return this.expr.getArity()};function $e(r,e){const t={};if(r.source&&e){const n=r.source.relativeTo(e);t.sourceInterval=[n.startIdx,n.endIdx]}return t}f.prototype.outputRecipe=m("outputRecipe"),p.outputRecipe=function(r,e){return["any",$e(this,e)]},w.outputRecipe=function(r,e){return["end",$e(this,e)]},I.prototype.outputRecipe=function(r,e){return["terminal",$e(this,e),this.obj]},N.prototype.outputRecipe=function(r,e){return["range",$e(this,e),this.from,this.to]},x.prototype.outputRecipe=function(r,e){return["param",$e(this,e),this.index]},y.prototype.outputRecipe=function(r,e){return["alt",$e(this,e)].concat(this.terms.map(t=>t.outputRecipe(r,e)))},L.prototype.outputRecipe=function(r,e){return this.terms[0].outputRecipe(r,e)},q.prototype.outputRecipe=function(r,e){const t=this.terms.slice(0,this.expansionPos),n=this.terms.slice(this.expansionPos+1);return["splice",$e(this,e),t.map(l=>l.outputRecipe(r,e)),n.map(l=>l.outputRecipe(r,e))]},V.prototype.outputRecipe=function(r,e){return["seq",$e(this,e)].concat(this.factors.map(t=>t.outputRecipe(r,e)))},oe.prototype.outputRecipe=ye.prototype.outputRecipe=T.prototype.outputRecipe=P.prototype.outputRecipe=k.prototype.outputRecipe=re.prototype.outputRecipe=function(r,e){return[this.constructor.name.toLowerCase(),$e(this,e),this.expr.outputRecipe(r,e)]},j.prototype.outputRecipe=function(r,e){return["app",$e(this,e),this.ruleName,this.args.map(t=>t.outputRecipe(r,e))]},J.prototype.outputRecipe=function(r,e){return["unicodeChar",$e(this,e),this.categoryOrProp]},f.prototype.introduceParams=m("introduceParams"),p.introduceParams=w.introduceParams=I.prototype.introduceParams=N.prototype.introduceParams=x.prototype.introduceParams=J.prototype.introduceParams=function(r){return this},y.prototype.introduceParams=function(r){return this.terms.forEach((e,t,n)=>{n[t]=e.introduceParams(r)}),this},V.prototype.introduceParams=function(r){return this.factors.forEach((e,t,n)=>{n[t]=e.introduceParams(r)}),this},se.prototype.introduceParams=P.prototype.introduceParams=k.prototype.introduceParams=re.prototype.introduceParams=function(r){return this.expr=this.expr.introduceParams(r),this},j.prototype.introduceParams=function(r){const e=r.indexOf(this.ruleName);if(e>=0){if(this.args.length>0)throw new Error("Parameterized rules cannot be passed as arguments to another rule.");return new x(e).withSource(this.source)}else return this.args.forEach((t,n,l)=>{l[n]=t.introduceParams(r)}),this},f.prototype.isNullable=function(r){return this._isNullable(r,Object.create(null))},f.prototype._isNullable=m("_isNullable"),p._isNullable=N.prototype._isNullable=x.prototype._isNullable=ye.prototype._isNullable=J.prototype._isNullable=function(r,e){return!1},w._isNullable=function(r,e){return!0},I.prototype._isNullable=function(r,e){return typeof this.obj=="string"?this.obj==="":!1},y.prototype._isNullable=function(r,e){return this.terms.length===0||this.terms.some(t=>t._isNullable(r,e))},V.prototype._isNullable=function(r,e){return this.factors.every(t=>t._isNullable(r,e))},oe.prototype._isNullable=T.prototype._isNullable=P.prototype._isNullable=k.prototype._isNullable=function(r,e){return!0},re.prototype._isNullable=function(r,e){return this.expr._isNullable(r,e)},j.prototype._isNullable=function(r,e){const t=this.toMemoKey();if(!Object.prototype.hasOwnProperty.call(e,t)){const{body:n}=r.rules[this.ruleName],l=n.substituteParams(this.args);e[t]=!1,e[t]=l._isNullable(r,e)}return e[t]},f.prototype.substituteParams=m("substituteParams"),p.substituteParams=w.substituteParams=I.prototype.substituteParams=N.prototype.substituteParams=J.prototype.substituteParams=function(r){return this},x.prototype.substituteParams=function(r){return A(r[this.index])},y.prototype.substituteParams=function(r){return new y(this.terms.map(e=>e.substituteParams(r)))},V.prototype.substituteParams=function(r){return new V(this.factors.map(e=>e.substituteParams(r)))},se.prototype.substituteParams=P.prototype.substituteParams=k.prototype.substituteParams=re.prototype.substituteParams=function(r){return new this.constructor(this.expr.substituteParams(r))},j.prototype.substituteParams=function(r){if(this.args.length===0)return this;{const e=this.args.map(t=>t.substituteParams(r));return new j(this.ruleName,e)}};function lr(r){return/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(r)}function zt(r){const e=Object.create(null);r.forEach(t=>{e[t]=(e[t]||0)+1}),Object.keys(e).forEach(t=>{if(e[t]<=1)return;let n=1;r.forEach((l,E)=>{l===t&&(r[E]=l+"_"+n++)})})}f.prototype.toArgumentNameList=m("toArgumentNameList"),p.toArgumentNameList=function(r,e){return["any"]},w.toArgumentNameList=function(r,e){return["end"]},I.prototype.toArgumentNameList=function(r,e){return typeof this.obj=="string"&&/^[_a-zA-Z0-9]+$/.test(this.obj)?["_"+this.obj]:["$"+r]},N.prototype.toArgumentNameList=function(r,e){let t=this.from+"_to_"+this.to;return lr(t)||(t="_"+t),lr(t)||(t="$"+r),[t]},y.prototype.toArgumentNameList=function(r,e){const t=this.terms.map(E=>E.toArgumentNameList(r,!0)),n=[],l=t[0].length;for(let E=0;E<l;E++){const $=[];for(let Q=0;Q<this.terms.length;Q++)$.push(t[Q][E]);const te=B($);n.push(te.join("_or_"))}return e||zt(n),n},V.prototype.toArgumentNameList=function(r,e){let t=[];return this.factors.forEach(n=>{const l=n.toArgumentNameList(r,!0);t=t.concat(l),r+=l.length}),e||zt(t),t},se.prototype.toArgumentNameList=function(r,e){const t=this.expr.toArgumentNameList(r,e).map(n=>n[n.length-1]==="s"?n+"es":n+"s");return e||zt(t),t},T.prototype.toArgumentNameList=function(r,e){return this.expr.toArgumentNameList(r,e).map(t=>"opt"+t[0].toUpperCase()+t.slice(1))},P.prototype.toArgumentNameList=function(r,e){return[]},k.prototype.toArgumentNameList=re.prototype.toArgumentNameList=function(r,e){return this.expr.toArgumentNameList(r,e)},j.prototype.toArgumentNameList=function(r,e){return[this.ruleName]},J.prototype.toArgumentNameList=function(r,e){return["$"+r]},x.prototype.toArgumentNameList=function(r,e){return["param"+this.index]},f.prototype.toDisplayString=m("toDisplayString"),y.prototype.toDisplayString=V.prototype.toDisplayString=function(){return this.source?this.source.trimmed().contents:"["+this.constructor.name+"]"},p.toDisplayString=w.toDisplayString=se.prototype.toDisplayString=P.prototype.toDisplayString=k.prototype.toDisplayString=re.prototype.toDisplayString=I.prototype.toDisplayString=N.prototype.toDisplayString=x.prototype.toDisplayString=function(){return this.toString()},j.prototype.toDisplayString=function(){if(this.args.length>0){const r=this.args.map(e=>e.toDisplayString());return this.ruleName+"<"+r.join(",")+">"}else return this.ruleName},J.prototype.toDisplayString=function(){return"Unicode ["+this.categoryOrProp+"] character"};function In(r){return r==="description"||r==="string"||r==="code"}class Ae{constructor(e,t,n){if(!In(n))throw new Error("invalid Failure type: "+n);this.pexpr=e,this.text=t,this.type=n,this.fluffy=!1}getPExpr(){return this.pexpr}getText(){return this.text}getType(){return this.type}isDescription(){return this.type==="description"}isStringTerminal(){return this.type==="string"}isCode(){return this.type==="code"}isFluffy(){return this.fluffy}makeFluffy(){this.fluffy=!0}clearFluffy(){this.fluffy=!1}subsumes(e){return this.getText()===e.getText()&&this.type===e.type&&(!this.isFluffy()||this.isFluffy()&&e.isFluffy())}toString(){return this.type==="string"?JSON.stringify(this.getText()):this.getText()}clone(){const e=new Ae(this.pexpr,this.text,this.type);return this.isFluffy()&&e.makeFluffy(),e}toKey(){return this.toString()+"#"+this.type}}f.prototype.toFailure=m("toFailure"),p.toFailure=function(r){return new Ae(this,"any object","description")},w.toFailure=function(r){return new Ae(this,"end of input","description")},I.prototype.toFailure=function(r){return new Ae(this,this.obj,"string")},N.prototype.toFailure=function(r){return new Ae(this,JSON.stringify(this.from)+".."+JSON.stringify(this.to),"code")},P.prototype.toFailure=function(r){const e=this.expr===p?"nothing":"not "+this.expr.toFailure(r);return new Ae(this,e,"description")},k.prototype.toFailure=function(r){return this.expr.toFailure(r)},j.prototype.toFailure=function(r){let{description:e}=r.rules[this.ruleName];return e||(e=(/^[aeiouAEIOU]/.test(this.ruleName)?"an":"a")+" "+this.ruleName),new Ae(this,e,"description")},J.prototype.toFailure=function(r){return new Ae(this,"a Unicode ["+this.categoryOrProp+"] character","description")},y.prototype.toFailure=function(r){const t="("+this.terms.map(n=>n.toFailure(r)).join(" or ")+")";return new Ae(this,t,"description")},V.prototype.toFailure=function(r){const t="("+this.factors.map(n=>n.toFailure(r)).join(" ")+")";return new Ae(this,t,"description")},se.prototype.toFailure=function(r){const e="("+this.expr.toFailure(r)+this.operator+")";return new Ae(this,e,"description")},f.prototype.toString=m("toString"),p.toString=function(){return"any"},w.toString=function(){return"end"},I.prototype.toString=function(){return JSON.stringify(this.obj)},N.prototype.toString=function(){return JSON.stringify(this.from)+".."+JSON.stringify(this.to)},x.prototype.toString=function(){return"$"+this.index},re.prototype.toString=function(){return"#("+this.expr.toString()+")"},y.prototype.toString=function(){return this.terms.length===1?this.terms[0].toString():"("+this.terms.map(r=>r.toString()).join(" | ")+")"},V.prototype.toString=function(){return this.factors.length===1?this.factors[0].toString():"("+this.factors.map(r=>r.toString()).join(" ")+")"},se.prototype.toString=function(){return this.expr+this.operator},P.prototype.toString=function(){return"~"+this.expr},k.prototype.toString=function(){return"&"+this.expr},j.prototype.toString=function(){if(this.args.length>0){const r=this.args.map(e=>e.toString());return this.ruleName+"<"+r.join(",")+">"}else return this.ruleName},J.prototype.toString=function(){return"\\p{"+this.categoryOrProp+"}"};class Tt extends f{constructor(e){super(),this.obj=e}_getString(e){const t=e.currentApplication().args[this.obj.index];return _(t instanceof I,"expected a Terminal expression"),t.obj}allowsSkippingPrecedingSpace(){return!0}eval(e){const{inputStream:t}=e,n=t.pos,l=this._getString(e);return t.matchString(l,!0)?(e.pushBinding(new qe(l.length),n),!0):(e.processFailure(n,this),!1)}getArity(){return 1}substituteParams(e){return new Tt(this.obj.substituteParams(e))}toDisplayString(){return this.obj.toDisplayString()+" (case-insensitive)"}toFailure(e){return new Ae(this,this.obj.toFailure(e)+" (case-insensitive)","description")}_isNullable(e,t){return this.obj._isNullable(e,t)}}var Bn=Object.freeze({__proto__:null,CaseInsensitiveTerminal:Tt,PExpr:f,any:p,end:w,Terminal:I,Range:N,Param:x,Alt:y,Extend:L,Splice:q,Seq:V,Iter:se,Star:oe,Plus:ye,Opt:T,Not:P,Lookahead:k,Lex:re,Apply:j,UnicodeChar:J});let cr;xt(r=>{cr=r.rules.applySyntactic.body});const Vt=new j("spaces");class wn{constructor(e,t,n){this.matcher=e,this.startExpr=t,this.grammar=e.grammar,this.input=e.getInput(),this.inputStream=new vt(this.input),this.memoTable=e._memoTable,this.userData=void 0,this.doNotMemoize=!1,this._bindings=[],this._bindingOffsets=[],this._applicationStack=[],this._posStack=[0],this.inLexifiedContextStack=[!1],this.rightmostFailurePosition=-1,this._rightmostFailurePositionStack=[],this._recordedFailuresStack=[],n!==void 0&&(this.positionToRecordFailures=n,this.recordedFailures=Object.create(null))}posToOffset(e){return e-this._posStack[this._posStack.length-1]}enterApplication(e,t){this._posStack.push(this.inputStream.pos),this._applicationStack.push(t),this.inLexifiedContextStack.push(!1),e.enter(t),this._rightmostFailurePositionStack.push(this.rightmostFailurePosition),this.rightmostFailurePosition=-1}exitApplication(e,t){const n=this._posStack.pop();this._applicationStack.pop(),this.inLexifiedContextStack.pop(),e.exit(),this.rightmostFailurePosition=Math.max(this.rightmostFailurePosition,this._rightmostFailurePositionStack.pop()),t&&this.pushBinding(t,n)}enterLexifiedContext(){this.inLexifiedContextStack.push(!0)}exitLexifiedContext(){this.inLexifiedContextStack.pop()}currentApplication(){return this._applicationStack[this._applicationStack.length-1]}inSyntacticContext(){const e=this.currentApplication();return e?e.isSyntactic()&&!this.inLexifiedContext():this.startExpr.factors[0].isSyntactic()}inLexifiedContext(){return this.inLexifiedContextStack[this.inLexifiedContextStack.length-1]}skipSpaces(){return this.pushFailuresInfo(),this.eval(Vt),this.popBinding(),this.popFailuresInfo(),this.inputStream.pos}skipSpacesIfInSyntacticContext(){return this.inSyntacticContext()?this.skipSpaces():this.inputStream.pos}maybeSkipSpacesBefore(e){return e.allowsSkippingPrecedingSpace()&&e!==Vt?this.skipSpacesIfInSyntacticContext():this.inputStream.pos}pushBinding(e,t){this._bindings.push(e),this._bindingOffsets.push(this.posToOffset(t))}popBinding(){this._bindings.pop(),this._bindingOffsets.pop()}numBindings(){return this._bindings.length}truncateBindings(e){for(;this._bindings.length>e;)this.popBinding()}getCurrentPosInfo(){return this.getPosInfo(this.inputStream.pos)}getPosInfo(e){let t=this.memoTable[e];return t||(t=this.memoTable[e]=new mn),t}processFailure(e,t){if(this.rightmostFailurePosition=Math.max(this.rightmostFailurePosition,e),this.recordedFailures&&e===this.positionToRecordFailures){const n=this.currentApplication();n&&(t=t.substituteParams(n.args)),this.recordFailure(t.toFailure(this.grammar),!1)}}recordFailure(e,t){const n=e.toKey();this.recordedFailures[n]?this.recordedFailures[n].isFluffy()&&!e.isFluffy()&&this.recordedFailures[n].clearFluffy():this.recordedFailures[n]=t?e.clone():e}recordFailures(e,t){Object.keys(e).forEach(n=>{this.recordFailure(e[n],t)})}cloneRecordedFailures(){if(!this.recordedFailures)return;const e=Object.create(null);return Object.keys(this.recordedFailures).forEach(t=>{e[t]=this.recordedFailures[t].clone()}),e}getRightmostFailurePosition(){return this.rightmostFailurePosition}_getRightmostFailureOffset(){return this.rightmostFailurePosition>=0?this.posToOffset(this.rightmostFailurePosition):-1}getMemoizedTraceEntry(e,t){const n=this.memoTable[e];if(n&&t instanceof j){const l=n.memo[t.toMemoKey()];if(l&&l.traceEntry){const E=l.traceEntry.cloneWithExpr(t);return E.isMemoized=!0,E}}return null}getTraceEntry(e,t,n,l){if(t instanceof j){const E=this.currentApplication(),$=E?E.args:[];t=t.substituteParams($)}return this.getMemoizedTraceEntry(e,t)||new Ve(this.input,e,this.inputStream.pos,t,n,l,this.trace)}isTracing(){return!!this.trace}hasNecessaryInfo(e){return this.trace&&!e.traceEntry?!1:this.recordedFailures&&this.inputStream.pos+e.rightmostFailureOffset===this.positionToRecordFailures?!!e.failuresAtRightmostPosition:!0}useMemoizedResult(e,t){this.trace&&this.trace.push(t.traceEntry);const n=this.inputStream.pos+t.rightmostFailureOffset;return this.rightmostFailurePosition=Math.max(this.rightmostFailurePosition,n),this.recordedFailures&&this.positionToRecordFailures===n&&t.failuresAtRightmostPosition&&this.recordFailures(t.failuresAtRightmostPosition,!0),this.inputStream.examinedLength=Math.max(this.inputStream.examinedLength,t.examinedLength+e),t.value?(this.inputStream.pos+=t.matchLength,this.pushBinding(t.value,e),!0):!1}eval(e){const{inputStream:t}=this,n=this._bindings.length,l=this.userData;let E;this.recordedFailures&&(E=this.recordedFailures,this.recordedFailures=Object.create(null));const $=t.pos,te=this.maybeSkipSpacesBefore(e);let Q;this.trace&&(Q=this.trace,this.trace=[]);const fe=e.eval(this);if(this.trace){const W=this._bindings.slice(n),G=this.getTraceEntry(te,e,fe,W);G.isImplicitSpaces=e===Vt,G.isRootNode=e===this.startExpr,Q.push(G),this.trace=Q}return fe?this.recordedFailures&&t.pos===this.positionToRecordFailures&&Object.keys(this.recordedFailures).forEach(W=>{this.recordedFailures[W].makeFluffy()}):(t.pos=$,this.truncateBindings(n),this.userData=l),this.recordedFailures&&this.recordFailures(E,!1),e===cr&&this.skipSpaces(),fe}getMatchResult(){this.grammar._setUpMatchState(this),this.eval(this.startExpr);let e;this.recordedFailures&&(e=Object.keys(this.recordedFailures).map(n=>this.recordedFailures[n]));const t=this._bindings[0];return t&&(t.grammar=this.grammar),new sr(this.matcher,this.input,this.startExpr,t,this._bindingOffsets[0],this.rightmostFailurePosition,e)}getTrace(){this.trace=[];const e=this.getMatchResult(),t=this.trace[this.trace.length-1];return t.result=e,t}pushFailuresInfo(){this._rightmostFailurePositionStack.push(this.rightmostFailurePosition),this._recordedFailuresStack.push(this.recordedFailures)}popFailuresInfo(){this.rightmostFailurePosition=this._rightmostFailurePositionStack.pop(),this.recordedFailures=this._recordedFailuresStack.pop()}}class Cn{constructor(e){this.grammar=e,this._memoTable=[],this._input="",this._isMemoTableStale=!1}_resetMemoTable(){this._memoTable=[],this._isMemoTableStale=!1}getInput(){return this._input}setInput(e){return this._input!==e&&this.replaceInputRange(0,this._input.length,e),this}replaceInputRange(e,t,n){const l=this._input,E=this._memoTable;if(e<0||e>l.length||t<0||t>l.length||e>t)throw new Error("Invalid indices: "+e+" and "+t);this._input=l.slice(0,e)+n+l.slice(t),this._input!==l&&E.length>0&&(this._isMemoTableStale=!0);const $=E.slice(t);E.length=e;for(let te=0;te<n.length;te++)E.push(void 0);for(const te of $)E.push(te);for(let te=0;te<e;te++){const Q=E[te];Q&&Q.clearObsoleteEntries(te,e)}return this}match(e,t={incremental:!0}){return this._match(this._getStartExpr(e),{incremental:t.incremental,tracing:!1})}trace(e,t={incremental:!0}){return this._match(this._getStartExpr(e),{incremental:t.incremental,tracing:!0})}_match(e,t={}){const n={tracing:!1,incremental:!0,positionToRecordFailures:void 0,...t};if(!n.incremental)this._resetMemoTable();else if(this._isMemoTableStale&&!this.grammar.supportsIncrementalParsing)throw D(this.grammar);const l=new wn(this,e,n.positionToRecordFailures);return n.tracing?l.getTrace():l.getMatchResult()}_getStartExpr(e){const t=e||this.grammar.defaultStartRule;if(!t)throw new Error("Missing start rule argument -- the grammar has no default start rule.");const n=this.grammar.parseApplication(t);return new V([n,w])}}const it=[],jt=(r,e)=>Object.prototype.hasOwnProperty.call(r,e);class ur{constructor(e,t,n){this._node=e,this.source=t,this._baseInterval=n,e.isNonterminal()&&_(t===n),this._childWrappers=[]}_forgetMemoizedResultFor(e){delete this._node[this._semantics.attributeKeys[e]],this.children.forEach(t=>{t._forgetMemoizedResultFor(e)})}child(e){if(!(0<=e&&e<this._node.numChildren()))return;let t=this._childWrappers[e];if(!t){const n=this._node.childAt(e),l=this._node.childOffsets[e],E=this._baseInterval.subInterval(l,n.matchLength),$=n.isNonterminal()?E:this._baseInterval;t=this._childWrappers[e]=this._semantics.wrap(n,E,$)}return t}_children(){for(let e=0;e<this._node.numChildren();e++)this.child(e);return this._childWrappers}isIteration(){return this._node.isIteration()}isTerminal(){return this._node.isTerminal()}isNonterminal(){return this._node.isNonterminal()}isSyntactic(){return this.isNonterminal()&&this._node.isSyntactic()}isLexical(){return this.isNonterminal()&&this._node.isLexical()}isOptional(){return this._node.isOptional()}iteration(e){const t=e||[],n=t.map($=>$._node),l=new or(n,[],-1,!1),E=this._semantics.wrap(l,null,null);return E._childWrappers=t,E}get children(){return this._children()}get ctorName(){return this._node.ctorName}get numChildren(){return this._node.numChildren()}get sourceString(){return this.source.contents}}class Le{constructor(e,t){const n=this;if(this.grammar=e,this.checkedActionDicts=!1,this.Wrapper=class extends(t?t.Wrapper:ur){constructor(l,E,$){super(l,E,$),n.checkActionDictsIfHaventAlready(),this._semantics=n}toString(){return"[semantics wrapper for "+n.grammar.name+"]"}},this.super=t,t){if(!(e.equals(this.super.grammar)||e._inheritsFrom(this.super.grammar)))throw new Error("Cannot extend a semantics for grammar '"+this.super.grammar.name+"' for use with grammar '"+e.name+"' (not a sub-grammar)");this.operations=Object.create(this.super.operations),this.attributes=Object.create(this.super.attributes),this.attributeKeys=Object.create(null);for(const l in this.attributes)Object.defineProperty(this.attributeKeys,l,{value:ir(l)})}else this.operations=Object.create(null),this.attributes=Object.create(null),this.attributeKeys=Object.create(null)}toString(){return"[semantics for "+this.grammar.name+"]"}checkActionDictsIfHaventAlready(){this.checkedActionDicts||(this.checkActionDicts(),this.checkedActionDicts=!0)}checkActionDicts(){let e;for(e in this.operations)this.operations[e].checkActionDict(this.grammar);for(e in this.attributes)this.attributes[e].checkActionDict(this.grammar)}toRecipe(e){function t(l){return l.super!==Le.BuiltInSemantics._getSemantics()}let n=`(function(g) {
`;if(t(this)){n+="  var semantics = "+this.super.toRecipe(!0)+"(g";const l=this.super.grammar;let E=this.grammar;for(;E!==l;)n+=".superGrammar",E=E.superGrammar;n+=`);
`,n+="  return g.extendSemantics(semantics)"}else n+="  return g.createSemantics()";return["Operation","Attribute"].forEach(l=>{const E=this[l.toLowerCase()+"s"];Object.keys(E).forEach($=>{const{actionDict:te,formals:Q,builtInDefault:fe}=E[$];let W=$;Q.length>0&&(W+="("+Q.join(", ")+")");let G;t(this)&&this.super[l.toLowerCase()+"s"][$]?G="extend"+l:G="add"+l,n+=`
    .`+G+"("+JSON.stringify(W)+", {";const ae=[];Object.keys(te).forEach(be=>{if(te[be]!==fe){let Te=te[be].toString().trim();Te=Te.replace(/^.*\(/,"function("),ae.push(`
      `+JSON.stringify(be)+": "+Te)}}),n+=ae.join(",")+`
    })`})}),n+=`;
  })`,e||(n=`(function() {
  var grammar = this.fromRecipe(`+this.grammar.toRecipe()+`);
  var semantics = `+n+`(grammar);
  return semantics;
});
`),n}addOperationOrAttribute(e,t,n){const l=e+"s",E=pr(t,e),{name:$}=E,{formals:te}=E;this.assertNewName($,e);const Q=Nn(e,$,G),fe={_default:Q};Object.keys(n).forEach(ae=>{fe[ae]=n[ae]});const W=e==="operation"?new st($,te,fe,Q):new Ut($,fe,Q);W.checkActionDict(this.grammar),this[l][$]=W;function G(...ae){const be=this._semantics[l][$];if(arguments.length!==be.formals.length)throw new Error("Invalid number of arguments passed to "+$+" "+e+" (expected "+be.formals.length+", got "+arguments.length+")");const Te=Object.create(null);for(const[Ge,at]of Object.entries(ae)){const Un=be.formals[Ge];Te[Un]=at}const Ie=this.args;this.args=Te;const we=be.execute(this._semantics,this);return this.args=Ie,we}e==="operation"?(this.Wrapper.prototype[$]=G,this.Wrapper.prototype[$].toString=function(){return"["+$+" operation]"}):(Object.defineProperty(this.Wrapper.prototype,$,{get:G,configurable:!0}),Object.defineProperty(this.attributeKeys,$,{value:ir($)}))}extendOperationOrAttribute(e,t,n){const l=e+"s";if(pr(t,"attribute"),!(this.super&&t in this.super[l]))throw new Error("Cannot extend "+e+" '"+t+"': did not inherit an "+e+" with that name");if(jt(this[l],t))throw new Error("Cannot extend "+e+" '"+t+"' again");const E=this[l][t].formals,$=this[l][t].actionDict,te=Object.create($);Object.keys(n).forEach(Q=>{te[Q]=n[Q]}),this[l][t]=e==="operation"?new st(t,E,te):new Ut(t,te),this[l][t].checkActionDict(this.grammar)}assertNewName(e,t){if(jt(ur.prototype,e))throw new Error("Cannot add "+t+" '"+e+"': that's a reserved name");if(e in this.operations)throw new Error("Cannot add "+t+" '"+e+"': an operation with that name already exists");if(e in this.attributes)throw new Error("Cannot add "+t+" '"+e+"': an attribute with that name already exists")}wrap(e,t,n){const l=n||t;return e instanceof this.Wrapper?e:new this.Wrapper(e,t,l)}}function pr(r,e){if(!Le.prototypeGrammar)return _(r.indexOf("(")===-1),{name:r,formals:[]};const t=Le.prototypeGrammar.match(r,e==="operation"?"OperationSignature":"AttributeSignature");if(t.failed())throw new Error(t.message);return Le.prototypeGrammarSemantics(t).parse()}function Nn(r,e,t){return function(...n){const E=(this._semantics.operations[e]||this._semantics.attributes[e]).formals.map($=>this.args[$]);if(!this.isIteration()&&n.length===1)return t.apply(n[0],E);throw ze(this.ctorName,e,r,it)}}Le.createSemantics=function(r,e){const t=new Le(r,e!==void 0?e:Le.BuiltInSemantics._getSemantics()),n=function(E){if(!(E instanceof sr))throw new TypeError("Semantics expected a MatchResult, but got "+z(E));if(E.failed())throw new TypeError("cannot apply Semantics to "+E.toString());const $=E._cst;if($.grammar!==r)throw new Error("Cannot use a MatchResult from grammar '"+$.grammar.name+"' with a semantics for '"+r.name+"'");const te=new vt(E.input);return t.wrap($,te.interval(E._cstOffset,E.input.length))};return n.addOperation=function(l,E){return t.addOperationOrAttribute("operation",l,E),n},n.extendOperation=function(l,E){return t.extendOperationOrAttribute("operation",l,E),n},n.addAttribute=function(l,E){return t.addOperationOrAttribute("attribute",l,E),n},n.extendAttribute=function(l,E){return t.extendOperationOrAttribute("attribute",l,E),n},n._getActionDict=function(l){const E=t.operations[l]||t.attributes[l];if(!E)throw new Error('"'+l+'" is not a valid operation or attribute name in this semantics for "'+r.name+'"');return E.actionDict},n._remove=function(l){let E;return l in t.operations?(E=t.operations[l],delete t.operations[l]):l in t.attributes&&(E=t.attributes[l],delete t.attributes[l]),delete t.Wrapper.prototype[l],E},n.getOperationNames=function(){return Object.keys(t.operations)},n.getAttributeNames=function(){return Object.keys(t.attributes)},n.getGrammar=function(){return t.grammar},n.toRecipe=function(l){return t.toRecipe(l)},n.toString=t.toString.bind(t),n._getSemantics=function(){return t},n};class st{constructor(e,t,n,l){this.name=e,this.formals=t,this.actionDict=n,this.builtInDefault=l}checkActionDict(e){e._checkTopDownActionDict(this.typeName,this.name,this.actionDict)}execute(e,t){try{const{ctorName:n}=t._node;let l=this.actionDict[n];return l?(it.push([this,n]),l.apply(t,t._children())):t.isNonterminal()&&(l=this.actionDict._nonterminal,l)?(it.push([this,"_nonterminal",n]),l.apply(t,t._children())):(it.push([this,"default action",n]),this.actionDict._default.apply(t,t._children()))}finally{it.pop()}}}st.prototype.typeName="operation";class Ut extends st{constructor(e,t,n){super(e,[],t,n)}execute(e,t){const n=t._node,l=e.attributeKeys[this.name];return jt(n,l)||(n[l]=st.prototype.execute.call(this,e,t)),n[l]}}Ut.prototype.typeName="attribute";const fr=["_iter","_terminal","_nonterminal","_default"];function dr(r){return Object.keys(r.rules).sort().map(e=>r.rules[e])}const An=r=>r.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029");let mr,hr;class Ne{constructor(e,t,n,l){if(this.name=e,this.superGrammar=t,this.rules=n,l){if(!(l in n))throw new Error("Invalid start rule: '"+l+"' is not a rule in grammar '"+e+"'");this.defaultStartRule=l}this._matchStateInitializer=void 0,this.supportsIncrementalParsing=!0}matcher(){return new Cn(this)}isBuiltIn(){return this===Ne.ProtoBuiltInRules||this===Ne.BuiltInRules}equals(e){if(this===e)return!0;if(e==null||this.name!==e.name||this.defaultStartRule!==e.defaultStartRule||!(this.superGrammar===e.superGrammar||this.superGrammar.equals(e.superGrammar)))return!1;const t=dr(this),n=dr(e);return t.length===n.length&&t.every((l,E)=>l.description===n[E].description&&l.formals.join(",")===n[E].formals.join(",")&&l.body.toString()===n[E].body.toString())}match(e,t){const n=this.matcher();return n.replaceInputRange(0,0,e),n.match(t)}trace(e,t){const n=this.matcher();return n.replaceInputRange(0,0,e),n.trace(t)}createSemantics(){return Le.createSemantics(this)}extendSemantics(e){return Le.createSemantics(this,e._getSemantics())}_checkTopDownActionDict(e,t,n){const l=[];for(const E in n){const $=n[E];if(!fr.includes(E)&&!(E in this.rules)){l.push(`'${E}' is not a valid semantic action for '${this.name}'`);continue}if(typeof $!="function"){l.push(`'${E}' must be a function in an action dictionary for '${this.name}'`);continue}const Q=$.length,fe=this._topDownActionArity(E);if(Q!==fe){let W;E==="_iter"||E==="_nonterminal"?W=`it should use a rest parameter, e.g. \`${E}(...children) {}\`. NOTE: this is new in Ohm v16 — see https://ohmjs.org/d/ati for details.`:W=`expected ${fe}, got ${Q}`,l.push(`Semantic action '${E}' has the wrong arity: ${W}`)}}if(l.length>0){const E=l.map(te=>"- "+te),$=new Error([`Found errors in the action dictionary of the '${t}' ${e}:`,...E].join(`
`));throw $.problems=l,$}}_topDownActionArity(e){return fr.includes(e)?0:this.rules[e].body.getArity()}_inheritsFrom(e){let t=this.superGrammar;for(;t;){if(t.equals(e,!0))return!0;t=t.superGrammar}return!1}toRecipe(e=void 0){const t={};this.source&&(t.source=this.source.contents);let n=null;this.defaultStartRule&&(n=this.defaultStartRule);const l={};Object.keys(this.rules).forEach(te=>{const Q=this.rules[te],{body:fe}=Q,W=!this.superGrammar||!this.superGrammar.rules[te];let G;W?G="define":G=fe instanceof L?"extend":"override";const ae={};if(Q.source&&this.source){const Ie=Q.source.relativeTo(this.source);ae.sourceInterval=[Ie.startIdx,Ie.endIdx]}const be=W?Q.description:null,Te=fe.outputRecipe(Q.formals,this.source);l[te]=[G,ae,be,Q.formals,Te]});let E="null";e?E=e:this.superGrammar&&!this.superGrammar.isBuiltIn()&&(E=this.superGrammar.toRecipe());const $=[...["grammar",t,this.name].map(JSON.stringify),E,...[n,l].map(JSON.stringify)];return An(`[${$.join(",")}]`)}toOperationActionDictionaryTemplate(){return this._toOperationOrAttributeActionDictionaryTemplate()}toAttributeActionDictionaryTemplate(){return this._toOperationOrAttributeActionDictionaryTemplate()}_toOperationOrAttributeActionDictionaryTemplate(){const e=new ne;e.append("{");let t=!0;for(const n in this.rules){const{body:l}=this.rules[n];t?t=!1:e.append(","),e.append(`
`),e.append("  "),this.addSemanticActionTemplate(n,l,e)}return e.append(`
}`),e.contents()}addSemanticActionTemplate(e,t,n){n.append(e),n.append(": function(");const l=this._topDownActionArity(e);n.append(s("_",l).join(", ")),n.append(`) {
`),n.append("  }")}parseApplication(e){let t;if(e.indexOf("<")===-1)t=new j(e);else{const l=mr.match(e,"Base_application");t=hr(l,{})}if(!(t.ruleName in this.rules))throw K(t.ruleName,this.name);const{formals:n}=this.rules[t.ruleName];if(n.length!==t.args.length){const{source:l}=this.rules[t.ruleName];throw ge(t.ruleName,n.length,t.args.length,l)}return t}_setUpMatchState(e){this._matchStateInitializer&&this._matchStateInitializer(e)}}Ne.ProtoBuiltInRules=new Ne("ProtoBuiltInRules",void 0,{any:{body:p,formals:[],description:"any character",primitive:!0},end:{body:w,formals:[],description:"end of input",primitive:!0},caseInsensitive:{body:new Tt(new x(0)),formals:["str"],primitive:!0},lower:{body:new J("Ll"),formals:[],description:"a lowercase letter",primitive:!0},upper:{body:new J("Lu"),formals:[],description:"an uppercase letter",primitive:!0},unicodeLtmo:{body:new J("Ltmo"),formals:[],description:"a Unicode character in Lt, Lm, or Lo",primitive:!0},spaces:{body:new oe(new j("space")),formals:[]},space:{body:new N("\0"," "),formals:[],description:"a space"}}),Ne.initApplicationParser=function(r,e){mr=r,hr=e};class gr{constructor(e){this.name=e}sourceInterval(e,t){return this.source.subInterval(e,t-e)}ensureSuperGrammar(){return this.superGrammar||this.withSuperGrammar(this.name==="BuiltInRules"?Ne.ProtoBuiltInRules:Ne.BuiltInRules),this.superGrammar}ensureSuperGrammarRuleForOverriding(e,t){const n=this.ensureSuperGrammar().rules[e];if(!n)throw de(e,this.superGrammar.name,t);return n}installOverriddenOrExtendedRule(e,t,n,l){const E=a(t);if(E.length>0)throw Y(e,E,l);const $=this.ensureSuperGrammar().rules[e],te=$.formals,Q=te?te.length:0;if(t.length!==Q)throw ge(e,Q,t.length,l);return this.install(e,t,n,$.description,l)}install(e,t,n,l,E,$=!1){return this.rules[e]={body:n.introduceParams(t),formals:t,description:l,source:E,primitive:$},this}withSuperGrammar(e){if(this.superGrammar)throw new Error("the super grammar of a GrammarDecl cannot be set more than once");return this.superGrammar=e,this.rules=Object.create(e.rules),e.isBuiltIn()||(this.defaultStartRule=e.defaultStartRule),this}withDefaultStartRule(e){return this.defaultStartRule=e,this}withSource(e){return this.source=new vt(e).interval(0,e.length),this}build(){const e=new Ne(this.name,this.ensureSuperGrammar(),this.rules,this.defaultStartRule);e._matchStateInitializer=e.superGrammar._matchStateInitializer,e.supportsIncrementalParsing=e.superGrammar.supportsIncrementalParsing;const t=[];let n=!1;return Object.keys(e.rules).forEach(l=>{const{body:E}=e.rules[l];try{E.assertChoicesHaveUniformArity(l)}catch($){t.push($)}try{E.assertAllApplicationsAreValid(l,e)}catch($){t.push($),n=!0}}),n||Object.keys(e.rules).forEach(l=>{const{body:E}=e.rules[l];try{E.assertIteratedExprsAreNotNullable(e,[])}catch($){t.push($)}}),t.length>0&&Ze(t),this.source&&(e.source=this.source),e}define(e,t,n,l,E,$){if(this.ensureSuperGrammar(),this.superGrammar.rules[e])throw ie(e,this.name,this.superGrammar.name,E);if(this.rules[e])throw ie(e,this.name,this.name,E);const te=a(t);if(te.length>0)throw Y(e,te,E);return this.install(e,t,n,l,E,$)}override(e,t,n,l,E){return this.ensureSuperGrammarRuleForOverriding(e,E),this.installOverriddenOrExtendedRule(e,t,n,E),this}extend(e,t,n,l,E){if(!this.ensureSuperGrammar().rules[e])throw me(e,this.superGrammar.name,E);const te=new L(this.superGrammar,e,n);return te.source=n.source,this.installOverriddenOrExtendedRule(e,t,te,E),this}}class St{constructor(){this.currentDecl=null,this.currentRuleName=null}newGrammar(e){return new gr(e)}grammar(e,t,n,l,E){const $=new gr(t);return n&&$.withSuperGrammar(n instanceof Ne?n:this.fromRecipe(n)),l&&$.withDefaultStartRule(l),e&&e.source&&$.withSource(e.source),this.currentDecl=$,Object.keys(E).forEach(te=>{this.currentRuleName=te;const Q=E[te],fe=Q[0],W=Q[1],G=Q[2],ae=Q[3],be=this.fromRecipe(Q[4]);let Te;$.source&&W&&W.sourceInterval&&(Te=$.source.subInterval(W.sourceInterval[0],W.sourceInterval[1]-W.sourceInterval[0])),$[fe](te,ae,be,G,Te)}),this.currentRuleName=this.currentDecl=null,$.build()}terminal(e){return new I(e)}range(e,t){return new N(e,t)}param(e){return new x(e)}alt(...e){let t=[];for(let n of e)n instanceof f||(n=this.fromRecipe(n)),n instanceof y?t=t.concat(n.terms):t.push(n);return t.length===1?t[0]:new y(t)}seq(...e){let t=[];for(let n of e)n instanceof f||(n=this.fromRecipe(n)),n instanceof V?t=t.concat(n.factors):t.push(n);return t.length===1?t[0]:new V(t)}star(e){return e instanceof f||(e=this.fromRecipe(e)),new oe(e)}plus(e){return e instanceof f||(e=this.fromRecipe(e)),new ye(e)}opt(e){return e instanceof f||(e=this.fromRecipe(e)),new T(e)}not(e){return e instanceof f||(e=this.fromRecipe(e)),new P(e)}lookahead(e){return e instanceof f||(e=this.fromRecipe(e)),new k(e)}lex(e){return e instanceof f||(e=this.fromRecipe(e)),new re(e)}app(e,t){return t&&t.length>0&&(t=t.map(function(n){return n instanceof f?n:this.fromRecipe(n)},this)),new j(e,t)}splice(e,t){return new q(this.currentDecl.superGrammar,this.currentRuleName,e.map(n=>this.fromRecipe(n)),t.map(n=>this.fromRecipe(n)))}fromRecipe(e){const t=e[0]==="grammar"?e.slice(1):e.slice(2),n=this[e[0]](...t),l=e[1];return l&&l.sourceInterval&&this.currentDecl&&n.withSource(this.currentDecl.sourceInterval(...l.sourceInterval)),n}}function It(r){return typeof r=="function"?r.call(new St):(typeof r=="string"&&(r=JSON.parse(r)),new St().fromRecipe(r))}var qt=It(["grammar",{source:`BuiltInRules {

  alnum  (an alpha-numeric character)
    = letter
    | digit

  letter  (a letter)
    = lower
    | upper
    | unicodeLtmo

  digit  (a digit)
    = "0".."9"

  hexDigit  (a hexadecimal digit)
    = digit
    | "a".."f"
    | "A".."F"

  ListOf<elem, sep>
    = NonemptyListOf<elem, sep>
    | EmptyListOf<elem, sep>

  NonemptyListOf<elem, sep>
    = elem (sep elem)*

  EmptyListOf<elem, sep>
    = /* nothing */

  listOf<elem, sep>
    = nonemptyListOf<elem, sep>
    | emptyListOf<elem, sep>

  nonemptyListOf<elem, sep>
    = elem (sep elem)*

  emptyListOf<elem, sep>
    = /* nothing */

  // Allows a syntactic rule application within a lexical context.
  applySyntactic<app> = app
}`},"BuiltInRules",null,null,{alnum:["define",{sourceInterval:[18,78]},"an alpha-numeric character",[],["alt",{sourceInterval:[60,78]},["app",{sourceInterval:[60,66]},"letter",[]],["app",{sourceInterval:[73,78]},"digit",[]]]],letter:["define",{sourceInterval:[82,142]},"a letter",[],["alt",{sourceInterval:[107,142]},["app",{sourceInterval:[107,112]},"lower",[]],["app",{sourceInterval:[119,124]},"upper",[]],["app",{sourceInterval:[131,142]},"unicodeLtmo",[]]]],digit:["define",{sourceInterval:[146,177]},"a digit",[],["range",{sourceInterval:[169,177]},"0","9"]],hexDigit:["define",{sourceInterval:[181,254]},"a hexadecimal digit",[],["alt",{sourceInterval:[219,254]},["app",{sourceInterval:[219,224]},"digit",[]],["range",{sourceInterval:[231,239]},"a","f"],["range",{sourceInterval:[246,254]},"A","F"]]],ListOf:["define",{sourceInterval:[258,336]},null,["elem","sep"],["alt",{sourceInterval:[282,336]},["app",{sourceInterval:[282,307]},"NonemptyListOf",[["param",{sourceInterval:[297,301]},0],["param",{sourceInterval:[303,306]},1]]],["app",{sourceInterval:[314,336]},"EmptyListOf",[["param",{sourceInterval:[326,330]},0],["param",{sourceInterval:[332,335]},1]]]]],NonemptyListOf:["define",{sourceInterval:[340,388]},null,["elem","sep"],["seq",{sourceInterval:[372,388]},["param",{sourceInterval:[372,376]},0],["star",{sourceInterval:[377,388]},["seq",{sourceInterval:[378,386]},["param",{sourceInterval:[378,381]},1],["param",{sourceInterval:[382,386]},0]]]]],EmptyListOf:["define",{sourceInterval:[392,434]},null,["elem","sep"],["seq",{sourceInterval:[438,438]}]],listOf:["define",{sourceInterval:[438,516]},null,["elem","sep"],["alt",{sourceInterval:[462,516]},["app",{sourceInterval:[462,487]},"nonemptyListOf",[["param",{sourceInterval:[477,481]},0],["param",{sourceInterval:[483,486]},1]]],["app",{sourceInterval:[494,516]},"emptyListOf",[["param",{sourceInterval:[506,510]},0],["param",{sourceInterval:[512,515]},1]]]]],nonemptyListOf:["define",{sourceInterval:[520,568]},null,["elem","sep"],["seq",{sourceInterval:[552,568]},["param",{sourceInterval:[552,556]},0],["star",{sourceInterval:[557,568]},["seq",{sourceInterval:[558,566]},["param",{sourceInterval:[558,561]},1],["param",{sourceInterval:[562,566]},0]]]]],emptyListOf:["define",{sourceInterval:[572,682]},null,["elem","sep"],["seq",{sourceInterval:[685,685]}]],applySyntactic:["define",{sourceInterval:[685,710]},null,["app"],["param",{sourceInterval:[707,710]},0]]}]);Ne.BuiltInRules=qt,$t(Ne.BuiltInRules);var Bt=It(["grammar",{source:`Ohm {

  Grammars
    = Grammar*

  Grammar
    = ident SuperGrammar? "{" Rule* "}"

  SuperGrammar
    = "<:" ident

  Rule
    = ident Formals? ruleDescr? "="  RuleBody  -- define
    | ident Formals?            ":=" OverrideRuleBody  -- override
    | ident Formals?            "+=" RuleBody  -- extend

  RuleBody
    = "|"? NonemptyListOf<TopLevelTerm, "|">

  TopLevelTerm
    = Seq caseName  -- inline
    | Seq

  OverrideRuleBody
    = "|"? NonemptyListOf<OverrideTopLevelTerm, "|">

  OverrideTopLevelTerm
    = "..."  -- superSplice
    | TopLevelTerm

  Formals
    = "<" ListOf<ident, ","> ">"

  Params
    = "<" ListOf<Seq, ","> ">"

  Alt
    = NonemptyListOf<Seq, "|">

  Seq
    = Iter*

  Iter
    = Pred "*"  -- star
    | Pred "+"  -- plus
    | Pred "?"  -- opt
    | Pred

  Pred
    = "~" Lex  -- not
    | "&" Lex  -- lookahead
    | Lex

  Lex
    = "#" Base  -- lex
    | Base

  Base
    = ident Params? ~(ruleDescr? "=" | ":=" | "+=")  -- application
    | oneCharTerminal ".." oneCharTerminal           -- range
    | terminal                                       -- terminal
    | "(" Alt ")"                                    -- paren

  ruleDescr  (a rule description)
    = "(" ruleDescrText ")"

  ruleDescrText
    = (~")" any)*

  caseName
    = "--" (~"\\n" space)* name (~"\\n" space)* ("\\n" | &"}")

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

  ident  (an identifier)
    = name

  terminal
    = "\\"" terminalChar* "\\""

  oneCharTerminal
    = "\\"" terminalChar "\\""

  terminalChar
    = escapeChar
      | ~"\\\\" ~"\\"" ~"\\n" "\\u{0}".."\\u{10FFFF}"

  escapeChar  (an escape sequence)
    = "\\\\\\\\"                                     -- backslash
    | "\\\\\\""                                     -- doubleQuote
    | "\\\\\\'"                                     -- singleQuote
    | "\\\\b"                                      -- backspace
    | "\\\\n"                                      -- lineFeed
    | "\\\\r"                                      -- carriageReturn
    | "\\\\t"                                      -- tab
    | "\\\\u{" hexDigit hexDigit? hexDigit?
             hexDigit? hexDigit? hexDigit? "}"   -- unicodeCodePoint
    | "\\\\u" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape
    | "\\\\x" hexDigit hexDigit                    -- hexEscape

  space
   += comment

  comment
    = "//" (~"\\n" any)* &("\\n" | end)  -- singleLine
    | "/*" (~"*/" any)* "*/"  -- multiLine

  tokens = token*

  token = caseName | comment | ident | operator | punctuation | terminal | any

  operator = "<:" | "=" | ":=" | "+=" | "*" | "+" | "?" | "~" | "&"

  punctuation = "<" | ">" | "," | "--"
}`},"Ohm",null,"Grammars",{Grammars:["define",{sourceInterval:[9,32]},null,[],["star",{sourceInterval:[24,32]},["app",{sourceInterval:[24,31]},"Grammar",[]]]],Grammar:["define",{sourceInterval:[36,83]},null,[],["seq",{sourceInterval:[50,83]},["app",{sourceInterval:[50,55]},"ident",[]],["opt",{sourceInterval:[56,69]},["app",{sourceInterval:[56,68]},"SuperGrammar",[]]],["terminal",{sourceInterval:[70,73]},"{"],["star",{sourceInterval:[74,79]},["app",{sourceInterval:[74,78]},"Rule",[]]],["terminal",{sourceInterval:[80,83]},"}"]]],SuperGrammar:["define",{sourceInterval:[87,116]},null,[],["seq",{sourceInterval:[106,116]},["terminal",{sourceInterval:[106,110]},"<:"],["app",{sourceInterval:[111,116]},"ident",[]]]],Rule_define:["define",{sourceInterval:[131,181]},null,[],["seq",{sourceInterval:[131,170]},["app",{sourceInterval:[131,136]},"ident",[]],["opt",{sourceInterval:[137,145]},["app",{sourceInterval:[137,144]},"Formals",[]]],["opt",{sourceInterval:[146,156]},["app",{sourceInterval:[146,155]},"ruleDescr",[]]],["terminal",{sourceInterval:[157,160]},"="],["app",{sourceInterval:[162,170]},"RuleBody",[]]]],Rule_override:["define",{sourceInterval:[188,248]},null,[],["seq",{sourceInterval:[188,235]},["app",{sourceInterval:[188,193]},"ident",[]],["opt",{sourceInterval:[194,202]},["app",{sourceInterval:[194,201]},"Formals",[]]],["terminal",{sourceInterval:[214,218]},":="],["app",{sourceInterval:[219,235]},"OverrideRuleBody",[]]]],Rule_extend:["define",{sourceInterval:[255,305]},null,[],["seq",{sourceInterval:[255,294]},["app",{sourceInterval:[255,260]},"ident",[]],["opt",{sourceInterval:[261,269]},["app",{sourceInterval:[261,268]},"Formals",[]]],["terminal",{sourceInterval:[281,285]},"+="],["app",{sourceInterval:[286,294]},"RuleBody",[]]]],Rule:["define",{sourceInterval:[120,305]},null,[],["alt",{sourceInterval:[131,305]},["app",{sourceInterval:[131,170]},"Rule_define",[]],["app",{sourceInterval:[188,235]},"Rule_override",[]],["app",{sourceInterval:[255,294]},"Rule_extend",[]]]],RuleBody:["define",{sourceInterval:[309,362]},null,[],["seq",{sourceInterval:[324,362]},["opt",{sourceInterval:[324,328]},["terminal",{sourceInterval:[324,327]},"|"]],["app",{sourceInterval:[329,362]},"NonemptyListOf",[["app",{sourceInterval:[344,356]},"TopLevelTerm",[]],["terminal",{sourceInterval:[358,361]},"|"]]]]],TopLevelTerm_inline:["define",{sourceInterval:[385,408]},null,[],["seq",{sourceInterval:[385,397]},["app",{sourceInterval:[385,388]},"Seq",[]],["app",{sourceInterval:[389,397]},"caseName",[]]]],TopLevelTerm:["define",{sourceInterval:[366,418]},null,[],["alt",{sourceInterval:[385,418]},["app",{sourceInterval:[385,397]},"TopLevelTerm_inline",[]],["app",{sourceInterval:[415,418]},"Seq",[]]]],OverrideRuleBody:["define",{sourceInterval:[422,491]},null,[],["seq",{sourceInterval:[445,491]},["opt",{sourceInterval:[445,449]},["terminal",{sourceInterval:[445,448]},"|"]],["app",{sourceInterval:[450,491]},"NonemptyListOf",[["app",{sourceInterval:[465,485]},"OverrideTopLevelTerm",[]],["terminal",{sourceInterval:[487,490]},"|"]]]]],OverrideTopLevelTerm_superSplice:["define",{sourceInterval:[522,543]},null,[],["terminal",{sourceInterval:[522,527]},"..."]],OverrideTopLevelTerm:["define",{sourceInterval:[495,562]},null,[],["alt",{sourceInterval:[522,562]},["app",{sourceInterval:[522,527]},"OverrideTopLevelTerm_superSplice",[]],["app",{sourceInterval:[550,562]},"TopLevelTerm",[]]]],Formals:["define",{sourceInterval:[566,606]},null,[],["seq",{sourceInterval:[580,606]},["terminal",{sourceInterval:[580,583]},"<"],["app",{sourceInterval:[584,602]},"ListOf",[["app",{sourceInterval:[591,596]},"ident",[]],["terminal",{sourceInterval:[598,601]},","]]],["terminal",{sourceInterval:[603,606]},">"]]],Params:["define",{sourceInterval:[610,647]},null,[],["seq",{sourceInterval:[623,647]},["terminal",{sourceInterval:[623,626]},"<"],["app",{sourceInterval:[627,643]},"ListOf",[["app",{sourceInterval:[634,637]},"Seq",[]],["terminal",{sourceInterval:[639,642]},","]]],["terminal",{sourceInterval:[644,647]},">"]]],Alt:["define",{sourceInterval:[651,685]},null,[],["app",{sourceInterval:[661,685]},"NonemptyListOf",[["app",{sourceInterval:[676,679]},"Seq",[]],["terminal",{sourceInterval:[681,684]},"|"]]]],Seq:["define",{sourceInterval:[689,704]},null,[],["star",{sourceInterval:[699,704]},["app",{sourceInterval:[699,703]},"Iter",[]]]],Iter_star:["define",{sourceInterval:[719,736]},null,[],["seq",{sourceInterval:[719,727]},["app",{sourceInterval:[719,723]},"Pred",[]],["terminal",{sourceInterval:[724,727]},"*"]]],Iter_plus:["define",{sourceInterval:[743,760]},null,[],["seq",{sourceInterval:[743,751]},["app",{sourceInterval:[743,747]},"Pred",[]],["terminal",{sourceInterval:[748,751]},"+"]]],Iter_opt:["define",{sourceInterval:[767,783]},null,[],["seq",{sourceInterval:[767,775]},["app",{sourceInterval:[767,771]},"Pred",[]],["terminal",{sourceInterval:[772,775]},"?"]]],Iter:["define",{sourceInterval:[708,794]},null,[],["alt",{sourceInterval:[719,794]},["app",{sourceInterval:[719,727]},"Iter_star",[]],["app",{sourceInterval:[743,751]},"Iter_plus",[]],["app",{sourceInterval:[767,775]},"Iter_opt",[]],["app",{sourceInterval:[790,794]},"Pred",[]]]],Pred_not:["define",{sourceInterval:[809,824]},null,[],["seq",{sourceInterval:[809,816]},["terminal",{sourceInterval:[809,812]},"~"],["app",{sourceInterval:[813,816]},"Lex",[]]]],Pred_lookahead:["define",{sourceInterval:[831,852]},null,[],["seq",{sourceInterval:[831,838]},["terminal",{sourceInterval:[831,834]},"&"],["app",{sourceInterval:[835,838]},"Lex",[]]]],Pred:["define",{sourceInterval:[798,862]},null,[],["alt",{sourceInterval:[809,862]},["app",{sourceInterval:[809,816]},"Pred_not",[]],["app",{sourceInterval:[831,838]},"Pred_lookahead",[]],["app",{sourceInterval:[859,862]},"Lex",[]]]],Lex_lex:["define",{sourceInterval:[876,892]},null,[],["seq",{sourceInterval:[876,884]},["terminal",{sourceInterval:[876,879]},"#"],["app",{sourceInterval:[880,884]},"Base",[]]]],Lex:["define",{sourceInterval:[866,903]},null,[],["alt",{sourceInterval:[876,903]},["app",{sourceInterval:[876,884]},"Lex_lex",[]],["app",{sourceInterval:[899,903]},"Base",[]]]],Base_application:["define",{sourceInterval:[918,979]},null,[],["seq",{sourceInterval:[918,963]},["app",{sourceInterval:[918,923]},"ident",[]],["opt",{sourceInterval:[924,931]},["app",{sourceInterval:[924,930]},"Params",[]]],["not",{sourceInterval:[932,963]},["alt",{sourceInterval:[934,962]},["seq",{sourceInterval:[934,948]},["opt",{sourceInterval:[934,944]},["app",{sourceInterval:[934,943]},"ruleDescr",[]]],["terminal",{sourceInterval:[945,948]},"="]],["terminal",{sourceInterval:[951,955]},":="],["terminal",{sourceInterval:[958,962]},"+="]]]]],Base_range:["define",{sourceInterval:[986,1041]},null,[],["seq",{sourceInterval:[986,1022]},["app",{sourceInterval:[986,1001]},"oneCharTerminal",[]],["terminal",{sourceInterval:[1002,1006]},".."],["app",{sourceInterval:[1007,1022]},"oneCharTerminal",[]]]],Base_terminal:["define",{sourceInterval:[1048,1106]},null,[],["app",{sourceInterval:[1048,1056]},"terminal",[]]],Base_paren:["define",{sourceInterval:[1113,1168]},null,[],["seq",{sourceInterval:[1113,1124]},["terminal",{sourceInterval:[1113,1116]},"("],["app",{sourceInterval:[1117,1120]},"Alt",[]],["terminal",{sourceInterval:[1121,1124]},")"]]],Base:["define",{sourceInterval:[907,1168]},null,[],["alt",{sourceInterval:[918,1168]},["app",{sourceInterval:[918,963]},"Base_application",[]],["app",{sourceInterval:[986,1022]},"Base_range",[]],["app",{sourceInterval:[1048,1056]},"Base_terminal",[]],["app",{sourceInterval:[1113,1124]},"Base_paren",[]]]],ruleDescr:["define",{sourceInterval:[1172,1231]},"a rule description",[],["seq",{sourceInterval:[1210,1231]},["terminal",{sourceInterval:[1210,1213]},"("],["app",{sourceInterval:[1214,1227]},"ruleDescrText",[]],["terminal",{sourceInterval:[1228,1231]},")"]]],ruleDescrText:["define",{sourceInterval:[1235,1266]},null,[],["star",{sourceInterval:[1255,1266]},["seq",{sourceInterval:[1256,1264]},["not",{sourceInterval:[1256,1260]},["terminal",{sourceInterval:[1257,1260]},")"]],["app",{sourceInterval:[1261,1264]},"any",[]]]]],caseName:["define",{sourceInterval:[1270,1338]},null,[],["seq",{sourceInterval:[1285,1338]},["terminal",{sourceInterval:[1285,1289]},"--"],["star",{sourceInterval:[1290,1304]},["seq",{sourceInterval:[1291,1302]},["not",{sourceInterval:[1291,1296]},["terminal",{sourceInterval:[1292,1296]},`
`]],["app",{sourceInterval:[1297,1302]},"space",[]]]],["app",{sourceInterval:[1305,1309]},"name",[]],["star",{sourceInterval:[1310,1324]},["seq",{sourceInterval:[1311,1322]},["not",{sourceInterval:[1311,1316]},["terminal",{sourceInterval:[1312,1316]},`
`]],["app",{sourceInterval:[1317,1322]},"space",[]]]],["alt",{sourceInterval:[1326,1337]},["terminal",{sourceInterval:[1326,1330]},`
`],["lookahead",{sourceInterval:[1333,1337]},["terminal",{sourceInterval:[1334,1337]},"}"]]]]],name:["define",{sourceInterval:[1342,1382]},"a name",[],["seq",{sourceInterval:[1363,1382]},["app",{sourceInterval:[1363,1372]},"nameFirst",[]],["star",{sourceInterval:[1373,1382]},["app",{sourceInterval:[1373,1381]},"nameRest",[]]]]],nameFirst:["define",{sourceInterval:[1386,1418]},null,[],["alt",{sourceInterval:[1402,1418]},["terminal",{sourceInterval:[1402,1405]},"_"],["app",{sourceInterval:[1412,1418]},"letter",[]]]],nameRest:["define",{sourceInterval:[1422,1452]},null,[],["alt",{sourceInterval:[1437,1452]},["terminal",{sourceInterval:[1437,1440]},"_"],["app",{sourceInterval:[1447,1452]},"alnum",[]]]],ident:["define",{sourceInterval:[1456,1489]},"an identifier",[],["app",{sourceInterval:[1485,1489]},"name",[]]],terminal:["define",{sourceInterval:[1493,1531]},null,[],["seq",{sourceInterval:[1508,1531]},["terminal",{sourceInterval:[1508,1512]},'"'],["star",{sourceInterval:[1513,1526]},["app",{sourceInterval:[1513,1525]},"terminalChar",[]]],["terminal",{sourceInterval:[1527,1531]},'"']]],oneCharTerminal:["define",{sourceInterval:[1535,1579]},null,[],["seq",{sourceInterval:[1557,1579]},["terminal",{sourceInterval:[1557,1561]},'"'],["app",{sourceInterval:[1562,1574]},"terminalChar",[]],["terminal",{sourceInterval:[1575,1579]},'"']]],terminalChar:["define",{sourceInterval:[1583,1660]},null,[],["alt",{sourceInterval:[1602,1660]},["app",{sourceInterval:[1602,1612]},"escapeChar",[]],["seq",{sourceInterval:[1621,1660]},["not",{sourceInterval:[1621,1626]},["terminal",{sourceInterval:[1622,1626]},"\\"]],["not",{sourceInterval:[1627,1632]},["terminal",{sourceInterval:[1628,1632]},'"']],["not",{sourceInterval:[1633,1638]},["terminal",{sourceInterval:[1634,1638]},`
`]],["range",{sourceInterval:[1639,1660]},"\0","􏿿"]]]],escapeChar_backslash:["define",{sourceInterval:[1703,1758]},null,[],["terminal",{sourceInterval:[1703,1709]},"\\\\"]],escapeChar_doubleQuote:["define",{sourceInterval:[1765,1822]},null,[],["terminal",{sourceInterval:[1765,1771]},'\\"']],escapeChar_singleQuote:["define",{sourceInterval:[1829,1886]},null,[],["terminal",{sourceInterval:[1829,1835]},"\\'"]],escapeChar_backspace:["define",{sourceInterval:[1893,1948]},null,[],["terminal",{sourceInterval:[1893,1898]},"\\b"]],escapeChar_lineFeed:["define",{sourceInterval:[1955,2009]},null,[],["terminal",{sourceInterval:[1955,1960]},"\\n"]],escapeChar_carriageReturn:["define",{sourceInterval:[2016,2076]},null,[],["terminal",{sourceInterval:[2016,2021]},"\\r"]],escapeChar_tab:["define",{sourceInterval:[2083,2132]},null,[],["terminal",{sourceInterval:[2083,2088]},"\\t"]],escapeChar_unicodeCodePoint:["define",{sourceInterval:[2139,2243]},null,[],["seq",{sourceInterval:[2139,2221]},["terminal",{sourceInterval:[2139,2145]},"\\u{"],["app",{sourceInterval:[2146,2154]},"hexDigit",[]],["opt",{sourceInterval:[2155,2164]},["app",{sourceInterval:[2155,2163]},"hexDigit",[]]],["opt",{sourceInterval:[2165,2174]},["app",{sourceInterval:[2165,2173]},"hexDigit",[]]],["opt",{sourceInterval:[2188,2197]},["app",{sourceInterval:[2188,2196]},"hexDigit",[]]],["opt",{sourceInterval:[2198,2207]},["app",{sourceInterval:[2198,2206]},"hexDigit",[]]],["opt",{sourceInterval:[2208,2217]},["app",{sourceInterval:[2208,2216]},"hexDigit",[]]],["terminal",{sourceInterval:[2218,2221]},"}"]]],escapeChar_unicodeEscape:["define",{sourceInterval:[2250,2309]},null,[],["seq",{sourceInterval:[2250,2291]},["terminal",{sourceInterval:[2250,2255]},"\\u"],["app",{sourceInterval:[2256,2264]},"hexDigit",[]],["app",{sourceInterval:[2265,2273]},"hexDigit",[]],["app",{sourceInterval:[2274,2282]},"hexDigit",[]],["app",{sourceInterval:[2283,2291]},"hexDigit",[]]]],escapeChar_hexEscape:["define",{sourceInterval:[2316,2371]},null,[],["seq",{sourceInterval:[2316,2339]},["terminal",{sourceInterval:[2316,2321]},"\\x"],["app",{sourceInterval:[2322,2330]},"hexDigit",[]],["app",{sourceInterval:[2331,2339]},"hexDigit",[]]]],escapeChar:["define",{sourceInterval:[1664,2371]},"an escape sequence",[],["alt",{sourceInterval:[1703,2371]},["app",{sourceInterval:[1703,1709]},"escapeChar_backslash",[]],["app",{sourceInterval:[1765,1771]},"escapeChar_doubleQuote",[]],["app",{sourceInterval:[1829,1835]},"escapeChar_singleQuote",[]],["app",{sourceInterval:[1893,1898]},"escapeChar_backspace",[]],["app",{sourceInterval:[1955,1960]},"escapeChar_lineFeed",[]],["app",{sourceInterval:[2016,2021]},"escapeChar_carriageReturn",[]],["app",{sourceInterval:[2083,2088]},"escapeChar_tab",[]],["app",{sourceInterval:[2139,2221]},"escapeChar_unicodeCodePoint",[]],["app",{sourceInterval:[2250,2291]},"escapeChar_unicodeEscape",[]],["app",{sourceInterval:[2316,2339]},"escapeChar_hexEscape",[]]]],space:["extend",{sourceInterval:[2375,2394]},null,[],["app",{sourceInterval:[2387,2394]},"comment",[]]],comment_singleLine:["define",{sourceInterval:[2412,2458]},null,[],["seq",{sourceInterval:[2412,2443]},["terminal",{sourceInterval:[2412,2416]},"//"],["star",{sourceInterval:[2417,2429]},["seq",{sourceInterval:[2418,2427]},["not",{sourceInterval:[2418,2423]},["terminal",{sourceInterval:[2419,2423]},`
`]],["app",{sourceInterval:[2424,2427]},"any",[]]]],["lookahead",{sourceInterval:[2430,2443]},["alt",{sourceInterval:[2432,2442]},["terminal",{sourceInterval:[2432,2436]},`
`],["app",{sourceInterval:[2439,2442]},"end",[]]]]]],comment_multiLine:["define",{sourceInterval:[2465,2501]},null,[],["seq",{sourceInterval:[2465,2487]},["terminal",{sourceInterval:[2465,2469]},"/*"],["star",{sourceInterval:[2470,2482]},["seq",{sourceInterval:[2471,2480]},["not",{sourceInterval:[2471,2476]},["terminal",{sourceInterval:[2472,2476]},"*/"]],["app",{sourceInterval:[2477,2480]},"any",[]]]],["terminal",{sourceInterval:[2483,2487]},"*/"]]],comment:["define",{sourceInterval:[2398,2501]},null,[],["alt",{sourceInterval:[2412,2501]},["app",{sourceInterval:[2412,2443]},"comment_singleLine",[]],["app",{sourceInterval:[2465,2487]},"comment_multiLine",[]]]],tokens:["define",{sourceInterval:[2505,2520]},null,[],["star",{sourceInterval:[2514,2520]},["app",{sourceInterval:[2514,2519]},"token",[]]]],token:["define",{sourceInterval:[2524,2600]},null,[],["alt",{sourceInterval:[2532,2600]},["app",{sourceInterval:[2532,2540]},"caseName",[]],["app",{sourceInterval:[2543,2550]},"comment",[]],["app",{sourceInterval:[2553,2558]},"ident",[]],["app",{sourceInterval:[2561,2569]},"operator",[]],["app",{sourceInterval:[2572,2583]},"punctuation",[]],["app",{sourceInterval:[2586,2594]},"terminal",[]],["app",{sourceInterval:[2597,2600]},"any",[]]]],operator:["define",{sourceInterval:[2604,2669]},null,[],["alt",{sourceInterval:[2615,2669]},["terminal",{sourceInterval:[2615,2619]},"<:"],["terminal",{sourceInterval:[2622,2625]},"="],["terminal",{sourceInterval:[2628,2632]},":="],["terminal",{sourceInterval:[2635,2639]},"+="],["terminal",{sourceInterval:[2642,2645]},"*"],["terminal",{sourceInterval:[2648,2651]},"+"],["terminal",{sourceInterval:[2654,2657]},"?"],["terminal",{sourceInterval:[2660,2663]},"~"],["terminal",{sourceInterval:[2666,2669]},"&"]]],punctuation:["define",{sourceInterval:[2673,2709]},null,[],["alt",{sourceInterval:[2687,2709]},["terminal",{sourceInterval:[2687,2690]},"<"],["terminal",{sourceInterval:[2693,2696]},">"],["terminal",{sourceInterval:[2699,2702]},","],["terminal",{sourceInterval:[2705,2709]},"--"]]]}]);const Gt=Object.create(f.prototype);function yr(r,e){for(const t in r)if(t===e)return!0;return!1}function Ht(r,e,t){const n=new St;let l,E,$,te=!1;return(t||Bt).createSemantics().addOperation("visit",{Grammars(W){return W.children.map(G=>G.visit())},Grammar(W,G,ae,be,Te){const Ie=W.visit();l=n.newGrammar(Ie),G.child(0)&&G.child(0).visit(),be.children.map(Ge=>Ge.visit());const we=l.build();if(we.source=this.source.trimmed(),yr(e,Ie))throw U(we);return e[Ie]=we,we},SuperGrammar(W,G){const ae=G.visit();if(ae==="null")l.withSuperGrammar(null);else{if(!e||!yr(e,ae))throw ce(ae,e,G.source);l.withSuperGrammar(e[ae])}},Rule_define(W,G,ae,be,Te){E=W.visit(),$=G.children.map(at=>at.visit())[0]||[],!l.defaultStartRule&&l.ensureSuperGrammar()!==Ne.ProtoBuiltInRules&&l.withDefaultStartRule(E);const Ie=Te.visit(),we=ae.children.map(at=>at.visit())[0],Ge=this.source.trimmed();return l.define(E,$,Ie,we,Ge)},Rule_override(W,G,ae,be){E=W.visit(),$=G.children.map(we=>we.visit())[0]||[];const Te=this.source.trimmed();l.ensureSuperGrammarRuleForOverriding(E,Te),te=!0;const Ie=be.visit();return te=!1,l.override(E,$,Ie,null,Te)},Rule_extend(W,G,ae,be){E=W.visit(),$=G.children.map(we=>we.visit())[0]||[];const Te=be.visit(),Ie=this.source.trimmed();return l.extend(E,$,Te,null,Ie)},RuleBody(W,G){return n.alt(...G.visit()).withSource(this.source)},OverrideRuleBody(W,G){const ae=G.visit(),be=ae.indexOf(Gt);if(be>=0){const Te=ae.slice(0,be),Ie=ae.slice(be+1);return Ie.forEach(we=>{if(we===Gt)throw xe(we)}),new q(l.superGrammar,E,Te,Ie).withSource(this.source)}else return n.alt(...ae).withSource(this.source)},Formals(W,G,ae){return G.visit()},Params(W,G,ae){return G.visit()},Alt(W){return n.alt(...W.visit()).withSource(this.source)},TopLevelTerm_inline(W,G){const ae=E+"_"+G.visit(),be=W.visit(),Te=this.source.trimmed(),Ie=!(l.superGrammar&&l.superGrammar.rules[ae]);te&&!Ie?l.override(ae,$,be,null,Te):l.define(ae,$,be,null,Te);const we=$.map(Ge=>n.app(Ge));return n.app(ae,we).withSource(be.source)},OverrideTopLevelTerm_superSplice(W){return Gt},Seq(W){return n.seq(...W.children.map(G=>G.visit())).withSource(this.source)},Iter_star(W,G){return n.star(W.visit()).withSource(this.source)},Iter_plus(W,G){return n.plus(W.visit()).withSource(this.source)},Iter_opt(W,G){return n.opt(W.visit()).withSource(this.source)},Pred_not(W,G){return n.not(G.visit()).withSource(this.source)},Pred_lookahead(W,G){return n.lookahead(G.visit()).withSource(this.source)},Lex_lex(W,G){return n.lex(G.visit()).withSource(this.source)},Base_application(W,G){const ae=G.children.map(be=>be.visit())[0]||[];return n.app(W.visit(),ae).withSource(this.source)},Base_range(W,G,ae){return n.range(W.visit(),ae.visit()).withSource(this.source)},Base_terminal(W){return n.terminal(W.visit()).withSource(this.source)},Base_paren(W,G,ae){return G.visit()},ruleDescr(W,G,ae){return G.visit()},ruleDescrText(W){return this.sourceString.trim()},caseName(W,G,ae,be,Te){return ae.visit()},name(W,G){return this.sourceString},nameFirst(W){},nameRest(W){},terminal(W,G,ae){return G.children.map(be=>be.visit()).join("")},oneCharTerminal(W,G,ae){return G.visit()},escapeChar(W){try{return F(this.sourceString)}catch(G){throw G instanceof RangeError&&G.message.startsWith("Invalid code point ")?pe(W):G}},NonemptyListOf(W,G,ae){return[W.visit()].concat(ae.children.map(be=>be.visit()))},EmptyListOf(){return[]},_terminal(){return this.sourceString}})(r).visit()}var Ln=It(["grammar",{source:`OperationsAndAttributes {

  AttributeSignature =
    name

  OperationSignature =
    name Formals?

  Formals
    = "(" ListOf<name, ","> ")"

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

}`},"OperationsAndAttributes",null,"AttributeSignature",{AttributeSignature:["define",{sourceInterval:[29,58]},null,[],["app",{sourceInterval:[54,58]},"name",[]]],OperationSignature:["define",{sourceInterval:[62,100]},null,[],["seq",{sourceInterval:[87,100]},["app",{sourceInterval:[87,91]},"name",[]],["opt",{sourceInterval:[92,100]},["app",{sourceInterval:[92,99]},"Formals",[]]]]],Formals:["define",{sourceInterval:[104,143]},null,[],["seq",{sourceInterval:[118,143]},["terminal",{sourceInterval:[118,121]},"("],["app",{sourceInterval:[122,139]},"ListOf",[["app",{sourceInterval:[129,133]},"name",[]],["terminal",{sourceInterval:[135,138]},","]]],["terminal",{sourceInterval:[140,143]},")"]]],name:["define",{sourceInterval:[147,187]},"a name",[],["seq",{sourceInterval:[168,187]},["app",{sourceInterval:[168,177]},"nameFirst",[]],["star",{sourceInterval:[178,187]},["app",{sourceInterval:[178,186]},"nameRest",[]]]]],nameFirst:["define",{sourceInterval:[191,223]},null,[],["alt",{sourceInterval:[207,223]},["terminal",{sourceInterval:[207,210]},"_"],["app",{sourceInterval:[217,223]},"letter",[]]]],nameRest:["define",{sourceInterval:[227,257]},null,[],["alt",{sourceInterval:[242,257]},["terminal",{sourceInterval:[242,245]},"_"],["app",{sourceInterval:[252,257]},"alnum",[]]]]}]);kn(Ne.BuiltInRules),Pn(Ln);function kn(r){const e={empty(){return this.iteration()},nonEmpty(t,n,l){return this.iteration([t].concat(l.children))},self(...t){return this}};Le.BuiltInSemantics=Le.createSemantics(r,null).addOperation("asIteration",{emptyListOf:e.empty,nonemptyListOf:e.nonEmpty,EmptyListOf:e.empty,NonemptyListOf:e.nonEmpty,_iter:e.self})}function Pn(r){Le.prototypeGrammarSemantics=r.createSemantics().addOperation("parse",{AttributeSignature(e){return{name:e.parse(),formals:[]}},OperationSignature(e,t){return{name:e.parse(),formals:t.children.map(n=>n.parse())[0]||[]}},Formals(e,t,n){return t.asIteration().children.map(l=>l.parse())},name(e,t){return this.sourceString}}),Le.prototypeGrammar=r}function Mn(r){let e=0;const t=[0],n=()=>t[t.length-1],l={},E=/( *).*(?:$|\r?\n|\r)/g;let $;for(;($=E.exec(r))!=null;){const[te,Q]=$;if(te.length===0)break;const fe=Q.length,W=n(),G=e+fe;if(fe>W)t.push(fe),l[G]=1;else if(fe<W){const ae=t.length;for(;n()!==fe;)t.pop();l[G]=-1*(ae-t.length)}e+=te.length}return t.length>1&&(l[e]=1-t.length),l}const _r="an indented block",br="a dedent",xr=1114112;class $n extends vt{constructor(e){super(e.input),this.state=e}_indentationAt(e){return this.state.userData[e]||0}atEnd(){return super.atEnd()&&this._indentationAt(this.pos)===0}next(){if(this._indentationAt(this.pos)!==0){this.examinedLength=Math.max(this.examinedLength,this.pos);return}return super.next()}nextCharCode(){return this._indentationAt(this.pos)!==0?(this.examinedLength=Math.max(this.examinedLength,this.pos),xr):super.nextCharCode()}nextCodePoint(){return this._indentationAt(this.pos)!==0?(this.examinedLength=Math.max(this.examinedLength,this.pos),xr):super.nextCodePoint()}}class vr extends f{constructor(e=!0){super(),this.isIndent=e}allowsSkippingPrecedingSpace(){return!0}eval(e){const{inputStream:t}=e,n=e.userData;e.doNotMemoize=!0;const l=t.pos,E=this.isIndent?1:-1;return(n[l]||0)*E>0?(e.userData=Object.create(n),e.userData[l]-=E,e.pushBinding(new qe(0),l),!0):(e.processFailure(l,this),!1)}getArity(){return 1}_assertAllApplicationsAreValid(e,t){}_isNullable(e,t){return!1}assertChoicesHaveUniformArity(e){}assertIteratedExprsAreNotNullable(e){}introduceParams(e){return this}substituteParams(e){return this}toString(){return this.isIndent?"indent":"dedent"}toDisplayString(){return this.toString()}toFailure(e){const t=this.isIndent?_r:br;return new Ae(this,t,"description")}}const On=new j("indent"),Dn=new j("dedent"),Fn=new q(qt,"any",[On,Dn],[]),Er=new St().newGrammar("IndentationSensitive").withSuperGrammar(qt).define("indent",[],new vr(!0),_r,void 0,!0).define("dedent",[],new vr(!1),br,void 0,!0).extend("any",[],Fn,"any character",void 0).build();Object.assign(Er,{_matchStateInitializer(r){r.userData=Mn(r.input),r.inputStream=new $n(r)},supportsIncrementalParsing:!1});const Rn="17.3.0";Ne.initApplicationParser(Bt,Ht);const zn=r=>!!r.constructor&&typeof r.constructor.isBuffer=="function"&&r.constructor.isBuffer(r);function Vn(r,e){const t=Bt.match(r,"Grammars");if(t.failed())throw Ee(t);return Ht(t,e)}function jn(r,e){const t=Tr(r,e),n=Object.keys(t);if(n.length===0)throw new Error("Missing grammar definition");if(n.length>1){const E=t[n[1]].source;throw new Error(Dt(E.sourceString,E.startIdx)+"Found more than one grammar definition -- use ohm.grammars() instead.")}return t[n[0]]}function Tr(r,e){const t=Object.create(e||{});if(typeof r!="string")if(zn(r))r=r.toString();else throw new TypeError("Expected string as first argument, got "+z(r));return Vn(r,t),t}return Oe.ExperimentalIndentationSensitive=Er,Oe._buildGrammar=Ht,Oe.grammar=jn,Oe.grammars=Tr,Oe.makeRecipe=It,Oe.ohmGrammar=Bt,Oe.pexprs=Bn,Oe.version=Rn,Oe}var wt={},He={},ue={},Br;function kt(){if(Br)return ue;Br=1,Object.defineProperty(ue,"__esModule",{value:!0}),ue.FieldAnonExpr=ue.NumberExpr=ue.NameExpr=ue.RefExpr=ue.NegateExpr=ue.MathExpr=ue.MathOperator=ue.CombinatorExpr=ue.BuiltinZeroArgs=ue.BuiltinZeroArgsOperators=ue.BuiltinOneArgExpr=ue.BuiltinOneArgOperators=ue.BuiltinExpr=ue.CellRefExpr=ue.CompareExpr=ue.CompareOperator=ue.CondExpr=ue.Expression=ue.Combinator=ue.FieldExprDef=ue.FieldNamedDef=ue.FieldAnonymousDef=ue.FieldCurlyExprDef=ue.FieldBuiltinDef=ue.FieldBuiltinType=ue.Field=ue.Constructor=ue.Declaration=ue.Program=ue.ASTBase=ue.ASTRootBase=void 0;class m{}ue.ASTRootBase=m,m._attributes=[];class _ extends m{}ue.ASTBase=_;class g extends m{constructor(y){super(),this.declarations=y,this.parent=null}}ue.Program=g,g._attributes=["declarations"];class d extends _{constructor(y,L,q){super(),this.constructorDef=y,this.fields=L,this.combinator=q}}ue.Declaration=d,d._attributes=["constructorDef","fields","combinator"];class v extends _{constructor(y,L){super(),this.name=y,this.tag=L}getTagType(){return this.tag===null?null:this.tag.startsWith("$")?"binary":"hex"}}ue.Constructor=v;class h extends _{}ue.Field=h,ue.FieldBuiltinType=["#","Type"];class s extends h{constructor(y,L){super(),this.name=y,this.type=L}}ue.FieldBuiltinDef=s;class a extends h{constructor(y){super(),this.expr=y}}ue.FieldCurlyExprDef=a,a._attributes=["expr"];class B extends h{constructor(y,L,q){super(),this.name=y,this.isRef=L,this.fields=q}}ue.FieldAnonymousDef=B,B._attributes=["fields"];class c extends h{constructor(y,L){super(),this.name=y,this.expr=L}}ue.FieldNamedDef=c,c._attributes=["expr"];class C extends h{constructor(y){super(),this.expr=y}}ue.FieldExprDef=C,C._attributes=["expr"];class O extends _{constructor(y,L){super(),this.name=y,this.args=L}}ue.Combinator=O,O._attributes=["args"];class ne extends _{}ue.Expression=ne;class b extends ne{constructor(y,L,q){super(),this.left=y,this.dotExpr=L,this.condExpr=q}}ue.CondExpr=b,b._attributes=["left","condExpr"],ue.CompareOperator=["<=",">=","!=","=","<",">"];class F extends ne{constructor(y,L,q){super(),this.left=y,this.op=L,this.right=q}}ue.CompareExpr=F,F._attributes=["left","right"];class z extends ne{constructor(y){super(),this.expr=y}}ue.CellRefExpr=z,z._attributes=["expr"];class A extends ne{}ue.BuiltinExpr=A,ue.BuiltinOneArgOperators=["#<=","#<","##"];class S extends A{constructor(y,L){super(),this.name=y,this.arg=L}}ue.BuiltinOneArgExpr=S,S._attributes=["arg"],ue.BuiltinZeroArgsOperators=["#"];class o extends A{constructor(y){super(),this.name=y}}ue.BuiltinZeroArgs=o;class i extends ne{constructor(y,L){super(),this.name=y,this.args=L}}ue.CombinatorExpr=i,i._attributes=["args"],ue.MathOperator=["*","+"];class u extends ne{constructor(y,L,q){super(),this.left=y,this.op=L,this.right=q}}ue.MathExpr=u,u._attributes=["left","right"];class f extends ne{constructor(y){super(),this.expr=y}}ue.NegateExpr=f,f._attributes=["expr"];class p extends ne{}ue.RefExpr=p;class w extends p{constructor(y){super(),this.name=y}}ue.NameExpr=w;class I extends p{constructor(y){super(),this.num=y}}ue.NumberExpr=I;class N extends p{constructor(y,L){super(),this.fields=y,this.isRef=L}}return ue.FieldAnonExpr=N,N._attributes=["fields"],ue}var wr;function Pt(){if(wr)return He;wr=1,Object.defineProperty(He,"__esModule",{value:!0}),He.NodeVisitor=void 0,He.iterChildNodes=_,He.walk=g;const m=kt();function*_(v){const h=Object.getPrototypeOf(v).constructor;for(const s of h._attributes){const a=v[s];if(Array.isArray(a))for(const B of a)yield B;else a instanceof m.ASTRootBase&&(yield a)}}function*g(v){const h=[v];for(;h.length>0;){const s=h.shift();h.push(..._(s)),yield s}}class d{visit(h){const a=`visit${h.constructor.name}`,B=this[a];return typeof B=="function"?B.call(this,h):this.genericVisit(h)}genericVisit(h){for(let s of _(h))this.visit(s)}}return He.NodeVisitor=d,He}var Cr;function Gn(){if(Cr)return wt;Cr=1,Object.defineProperty(wt,"__esModule",{value:!0}),wt.withParents=_;const m=Pt();function _(g){for(let d of(0,m.walk)(g))for(let v of(0,m.iterChildNodes)(d))v.parent=d;return g}return wt}var Ct={},Nr;function Hn(){if(Nr)return Ct;Nr=1,Object.defineProperty(Ct,"__esModule",{value:!0});const m=String.raw`
TLB {
  // See:
  // https://github.com/andreypfau/TL-B-docs

  // Root definition
  Program = SourceElement*

  // Utilities
  // Override Ohm's built-in definition of space.
  space := whitespace | lineTerminator | comment

  whitespace =
    | "\t"
    | "\x0B"    -- verticalTab
    | "\x0C"    -- formFeed
    | " "
    | "\u00A0"  -- noBreakSpace
    | "\uFEFF"  -- byteOrderMark
    | "\u2000".."\u200B"
    | "\u3000"

  sourceCharacter = any
  lineTerminator = "\n" | "\r" | "\u2028" | "\u2029"

  // Comments
  comment = multiLineComment | singleLineComment
  multiLineComment = "/*" (~"*/" sourceCharacter)* "*/"
  singleLineComment = "//" (~lineTerminator sourceCharacter)*

  // Data types
  binaryDigit = "0" | "1"
  decimalDigit = "0".."9"
  hex = hexChar* "_"?
  hexChar = decimalDigit | letter

  // Identifiers
  identifier = identifierStart identifierPart*
  identifierStart = "_" | letter
  identifierPart = identifierStart | digit | ","

  // Primitives
  number = digit+

  // Builtins
  builtins_one_arg = "#<=" | "#<" | "##"
  builtins_zero_args = "#"
  builtins_field = "#" | "Type"


  // ----------
  // Base rules
  // ----------
  SourceElement = Declaration | comment
  Declaration = Constructor Fields "=" Combinator ";"


  // Constructors
  // ~~~~~~~~~~~~
  Constructor = ConstructorStart ConstructorTag?
  ConstructorStart = "!"? ("_" | identifier)
  ConstructorTag =
  	| "$" ("_" | binaryDigit+)  -- binary
    | "#" ("_" | hex)           -- hex


  // Fields
  // ~~~~~~
  Fields = FieldDefinition*
  FieldDefinition =
    | FieldBuiltinDef
    | FieldCurlyExprDef
    | FieldAnonymousDef
    | FieldNamedDef
    | FieldExprDef

  FieldBuiltinDef = "{" identifier ":" builtins_field "}"
  FieldCurlyExprDef = "{" CurlyExpression "}"
  FieldAnonymousDef = FieldAnonRef | FieldNamedAnonRef
  FieldNamedDef = identifier ":" CondExpr
  FieldExprDef = CondExpr

  FieldAnonRef = "^"? "[" FieldDefinition* "]"
  FieldNamedAnonRef = identifier ":" FieldAnonRef


  // Combinators
  // ~~~~~~~~~~~

  Combinator = identifier SimpleExpr*


  // Expressions
  // ~~~~~~~~~~~

  // First come the complex rules we only use to define fields.
  // The line between fields definition and expressions is blury at this point.
  CurlyExpression = CompareExpr
  CondExpr =
    | CondDotAndQuestionExpr
    | CondQuestionExpr
    | CondTypeExpr

  CondDotted = TypeExpr "." number
  CondDotAndQuestionExpr = ( CondDotted | Parens<CondDotted> ) "?" TypeExpr
  CondQuestionExpr = TypeExpr "?" TypeExpr
  CondTypeExpr = TypeExpr

  // Compares:
  CompareExpr =
    | CompareOperatorExpr
    | Parens<CompareExpr>
    | MathExpr

  CompareOperatorExpr =
    | MathExpr "<=" MathExpr
    | MathExpr ">=" MathExpr
    | MathExpr "!=" MathExpr
    | MathExpr "=" MathExpr
    | MathExpr "<" MathExpr
    | MathExpr ">" MathExpr

  // Base rule for field defining expressions:
  TypeExpr =
    | CellRefExpr
    | BuiltinExpr
    | CombinatorExpr
    | SimpleExpr
    | Parens<TypeExpr>

  // Math:
  MathExpr = MulExpr ("+" MulExpr)*
  // You can multiply by constant values only: 'Bit' and numbers, basically
  MulExpr = SimpleExpr ("*" RefExpr)*

  // TypeExpr's items:
  CellRefExpr = "^" ( CellRefInner | Parens<CellRefInner> )
  CellRefInner = TypeExpr

  BuiltinExpr = BuiltinOneArg | BuiltinZeroArgs
  // This needs extra 'Parens' because of '(##)' expr:
  BuiltinOneArg = ( builtins_one_arg | Parens<builtins_one_arg> ) SimpleExpr
  BuiltinZeroArgs = builtins_zero_args

  // It is different from 'Combinator' only in the quantity part:
  // we always need at least one argument here and it can be complex.
  CombinatorExpr = "(" identifier CombinatorArg+ ")"

  SimpleExpr =
    | NegateExpr
    | MathExpr
    | RefExpr
    | Parens<SimpleExpr>

  SimpleExprNoMath =
    | NegateExpr
    | RefExpr
    | Parens<SimpleExpr>

  CombinatorArg =
    | CellRefExpr
    | BuiltinExpr
    | CombinatorExpr
    | SimpleExprNoMath
    | Parens<TypeExpr>

  NegateExpr = "~" SimpleExpr
  RefExpr = RefInner | Parens<RefInner> | FieldAnonRef | BuiltinExpr | CellRefExpr
  RefInner = identifier | number


  // Helpers
  // ~~~~~~~

  // Generic rule to allow parens around some expressions:
  Parens<expr> = "(" expr ")"
}
`;return Ct.default=m,Ct}var Be={},Nt={},Ar;function Xn(){if(Ar)return Nt;Ar=1,Object.defineProperty(Nt,"__esModule",{value:!0}),Nt.withLocations=m;function m(_,g){const d=g.source.getLineAndColumn();return _.locations={line:d.lineNum,column:d.colNum},_}return Nt}var Lr;function Wn(){if(Lr)return Be;Lr=1;var m=Be&&Be.__createBinding||(Object.create?(function(s,a,B,c){c===void 0&&(c=B);var C=Object.getOwnPropertyDescriptor(a,B);(!C||("get"in C?!a.__esModule:C.writable||C.configurable))&&(C={enumerable:!0,get:function(){return a[B]}}),Object.defineProperty(s,c,C)}):(function(s,a,B,c){c===void 0&&(c=B),s[c]=a[B]})),_=Be&&Be.__setModuleDefault||(Object.create?(function(s,a){Object.defineProperty(s,"default",{enumerable:!0,value:a})}):function(s,a){s.default=a}),g=Be&&Be.__importStar||(function(){var s=function(a){return s=Object.getOwnPropertyNames||function(B){var c=[];for(var C in B)Object.prototype.hasOwnProperty.call(B,C)&&(c[c.length]=C);return c},s(a)};return function(a){if(a&&a.__esModule)return a;var B={};if(a!=null)for(var c=s(a),C=0;C<c.length;C++)c[C]!=="default"&&m(B,a,c[C]);return _(B,a),B}})();Object.defineProperty(Be,"__esModule",{value:!0}),Be.exprNodes=Be.combinatorNodes=Be.fieldNodes=Be.constructorNodes=Be.rootNodes=void 0;const d=g(kt()),v=Xn();Be.rootNodes={Program(s){return(0,v.withLocations)(new d.Program(s.children.map(a=>a.root())),s)},SourceElement(s){return(0,v.withLocations)(new d.Declaration(s.child(0).Constructor(),s.child(1).Field(),s.child(3).Combinator()),s)}},Be.constructorNodes={Constructor(s,a){const B=s.sourceString.replace(/,/g,"_");let c=null;return a.numChildren!==0&&(c=a.child(0).Constructor()),(0,v.withLocations)(new d.Constructor(B,c),s)},ConstructorTag(s){return s.sourceString}},Be.fieldNodes={Fields(s){return s.children.map(a=>a.Field())},FieldDefinition(s){return s.Field()},FieldBuiltinDef(s,a,B,c,C){return(0,v.withLocations)(new d.FieldBuiltinDef(a.sourceString,c.sourceString),s)},FieldCurlyExprDef(s,a,B){return(0,v.withLocations)(new d.FieldCurlyExprDef(a.expr()),s)},FieldAnonymousDef(s){const{name:a,isRef:B,fields:c}=s.Field();return(0,v.withLocations)(new d.FieldAnonymousDef(a,B,c),s)},FieldNamedDef(s,a,B){return(0,v.withLocations)(new d.FieldNamedDef(s.sourceString,B.expr()),s)},FieldExprDef(s){return(0,v.withLocations)(new d.FieldExprDef(s.expr()),s)},FieldAnonRef(s,a,B,c){return{name:null,isRef:s.numChildren!==0,fields:B.children.map(C=>C.Field())}},FieldNamedAnonRef(s,a,B){return Object.assign(Object.assign({},B.Field()),{name:s.sourceString})}},Be.combinatorNodes={Combinator(s,a){return(0,v.withLocations)(new d.Combinator(s.sourceString,a.children.map(B=>B.expr())),s)}},Be.exprNodes={MathExpr(s,a,B){return h(s,a,B)},MulExpr(s,a,B){return h(s,a,B)},CompareExpr(s){return s.expr()},CompareOperatorExpr(s,a,B){return(0,v.withLocations)(new d.CompareExpr(s.expr(),a.sourceString,B.expr()),a)},CondExpr(s){const{leftExpr:a,dotExpr:B,condExpr:c}=s.expr();return B===void 0&&c===void 0?a:(0,v.withLocations)(new d.CondExpr(a,B,c),s)},CondDotAndQuestionExpr(s,a,B){return Object.assign(Object.assign({},s.expr()),{condExpr:B.expr()})},CondQuestionExpr(s,a,B){return{leftExpr:s.expr(),dotExpr:null,condExpr:B.expr()}},CondTypeExpr(s){return{leftExpr:s.expr()}},CondDotted(s,a,B){return{leftExpr:s.expr(),dotExpr:new Number(B.sourceString)}},CombinatorExpr(s,a,B,c){return(0,v.withLocations)(new d.CombinatorExpr(a.sourceString,B.children.map(C=>C.expr())),s)},CellRefExpr(s,a){return(0,v.withLocations)(new d.CellRefExpr(a.expr()),s)},BuiltinExpr(s){return(0,v.withLocations)(s.expr(),s)},NegateExpr(s,a){return(0,v.withLocations)(new d.NegateExpr(a.expr()),s)},BuiltinOneArg(s,a){return(0,v.withLocations)(new d.BuiltinOneArgExpr(s.sourceString,a.expr()),s)},BuiltinZeroArgs(s){return(0,v.withLocations)(new d.BuiltinZeroArgs(s.sourceString),s)},identifier(s,a){return(0,v.withLocations)(new d.NameExpr(s.sourceString+a.sourceString),s)},number(s){return(0,v.withLocations)(new d.NumberExpr(parseInt(s.sourceString)),s)},Parens(s,a,B){return(0,v.withLocations)(a.expr(),s)},FieldAnonRef(s,a,B,c){return(0,v.withLocations)(new d.FieldAnonExpr(B.children.map(C=>C.Field()),s.numChildren!==0),a)},CombinatorArg(s){return s.expr()},SimpleExprNoMath(s){return s.expr()}};function h(s,a,B){const c=s.expr(),C=[];for(let b of a.children)C.push(b.sourceString);const O=[];for(let b of B.children){const F=b.expr();O.push(F)}if(C.length!==O.length)throw new Error("Invalid math operation");if(C.length===0)return(0,v.withLocations)(c,s);let ne=(0,v.withLocations)(new d.MathExpr(c,C[0],O[0]),s);for(let b=1;b<C.length;b++)ne=(0,v.withLocations)(new d.MathExpr(ne,C[b],O[b]),s);return ne}return Be}var kr;function Kn(){if(kr)return Pe;kr=1;var m=Pe&&Pe.__createBinding||(Object.create?(function(C,O,ne,b){b===void 0&&(b=ne);var F=Object.getOwnPropertyDescriptor(O,ne);(!F||("get"in F?!O.__esModule:F.writable||F.configurable))&&(F={enumerable:!0,get:function(){return O[ne]}}),Object.defineProperty(C,b,F)}):(function(C,O,ne,b){b===void 0&&(b=ne),C[b]=O[ne]})),_=Pe&&Pe.__setModuleDefault||(Object.create?(function(C,O){Object.defineProperty(C,"default",{enumerable:!0,value:O})}):function(C,O){C.default=O}),g=Pe&&Pe.__importStar||(function(){var C=function(O){return C=Object.getOwnPropertyNames||function(ne){var b=[];for(var F in ne)Object.prototype.hasOwnProperty.call(ne,F)&&(b[b.length]=F);return b},C(O)};return function(O){if(O&&O.__esModule)return O;var ne={};if(O!=null)for(var b=C(O),F=0;F<b.length;F++)b[F]!=="default"&&m(ne,O,b[F]);return _(ne,O),ne}})(),d=Pe&&Pe.__importDefault||function(C){return C&&C.__esModule?C:{default:C}};Object.defineProperty(Pe,"__esModule",{value:!0}),Pe.buildGrammar=B,Pe.buildAST=c;const v=g(qn()),h=Gn(),s=d(Hn()),a=Wn();function B(){return v.grammar(s.default)}function c(C,O){const ne=O.createSemantics();ne.addOperation("root",a.rootNodes),ne.addOperation("Constructor",a.constructorNodes),ne.addOperation("Field",a.fieldNodes),ne.addOperation("Combinator",a.combinatorNodes),ne.addOperation("expr",a.exprNodes);const b=O.match(C),F=ne(b).root();return(0,h.withParents)(F)}return Pe}var lt={},Pr;function Yn(){if(Pr)return lt;Pr=1,Object.defineProperty(lt,"__esModule",{value:!0}),lt.validate=g,lt.isNatField=h;const m=Pt(),_=kt();function g(B){for(const c of B.declarations)d(c)}function d(B){const c=new Set;for(const C of B.fields){const O=v(C);O&&h(C)&&c.add(O)}for(const C of B.fields)C instanceof _.FieldCurlyExprDef&&a(C.expr,c)}function v(B){return B instanceof _.FieldBuiltinDef||B instanceof _.FieldNamedDef?B.name:null}function h(B){if(B instanceof _.FieldBuiltinDef)return B.type==="#";if(B instanceof _.FieldNamedDef){const c=B.expr;if(c instanceof _.BuiltinOneArgExpr||c instanceof _.BuiltinZeroArgs)return!0}return!1}class s extends m.NodeVisitor{constructor(c){super(),this.errors=[],this.integerFields=c}visitNameExpr(c){const C=c.name[0]&&c.name[0]===c.name[0].toUpperCase();!this.integerFields.has(c.name)&&!C&&this.errors.push(`cannot use field '${c.name}' in an expression unless it is either an integer or a type`)}getErrors(){return this.errors}}function a(B,c){const C=new s(c);C.visit(B);const O=C.getErrors();if(O.length>0)throw new Error(O.join("; "))}return lt}var ct={},Mr;function Zn(){if(Mr)return ct;Mr=1,Object.defineProperty(ct,"__esModule",{value:!0}),ct.NodesCounter=void 0;const m=Pt();let _=class extends m.NodeVisitor{constructor(){super(),this.nodes={}}genericVisit(d){var v;const h=d.constructor.name;return this.nodes[h]=((v=this.nodes[h])!==null&&v!==void 0?v:0)+1,super.genericVisit(d)}get total(){return Object.values(this.nodes).reduce((d,v)=>d+v,0)}};return ct.NodesCounter=_,ct}var $r;function Jn(){if($r)return et;$r=1,Object.defineProperty(et,"__esModule",{value:!0}),et.parse=d,et.ast=v,et.counterASTNodes=h;const m=Kn(),_=Yn(),g=Zn();function d(s,a=void 0){return a===void 0&&(a=(0,m.buildGrammar)()),a.match(s)}function v(s){const a=(0,m.buildAST)(s,(0,m.buildGrammar)());return(0,_.validate)(a),a}function h(s){const a=new g.NodesCounter;return a.visit(s),a}return et}var Or;function Qn(){return Or||(Or=1,(function(m){Object.defineProperty(m,"__esModule",{value:!0}),m.MathOperator=m.BuiltinZeroArgsOperators=m.BuiltinOneArgOperators=m.CompareOperator=m.FieldBuiltinType=m.FieldAnonExpr=m.NumberExpr=m.NameExpr=m.RefExpr=m.NegateExpr=m.MathExpr=m.CombinatorExpr=m.BuiltinZeroArgs=m.BuiltinOneArgExpr=m.BuiltinExpr=m.CellRefExpr=m.CompareExpr=m.CondExpr=m.Expression=m.Combinator=m.FieldExprDef=m.FieldNamedDef=m.FieldAnonymousDef=m.FieldCurlyExprDef=m.FieldBuiltinDef=m.Field=m.Constructor=m.Declaration=m.Program=m.ASTBase=m.ASTRootBase=m.walk=m.NodeVisitor=m.counterASTNodes=m.ast=m.parse=void 0;var _=Jn();Object.defineProperty(m,"parse",{enumerable:!0,get:function(){return _.parse}}),Object.defineProperty(m,"ast",{enumerable:!0,get:function(){return _.ast}}),Object.defineProperty(m,"counterASTNodes",{enumerable:!0,get:function(){return _.counterASTNodes}});var g=Pt();Object.defineProperty(m,"NodeVisitor",{enumerable:!0,get:function(){return g.NodeVisitor}}),Object.defineProperty(m,"walk",{enumerable:!0,get:function(){return g.walk}});var d=kt();Object.defineProperty(m,"ASTRootBase",{enumerable:!0,get:function(){return d.ASTRootBase}}),Object.defineProperty(m,"ASTBase",{enumerable:!0,get:function(){return d.ASTBase}}),Object.defineProperty(m,"Program",{enumerable:!0,get:function(){return d.Program}}),Object.defineProperty(m,"Declaration",{enumerable:!0,get:function(){return d.Declaration}}),Object.defineProperty(m,"Constructor",{enumerable:!0,get:function(){return d.Constructor}}),Object.defineProperty(m,"Field",{enumerable:!0,get:function(){return d.Field}}),Object.defineProperty(m,"FieldBuiltinDef",{enumerable:!0,get:function(){return d.FieldBuiltinDef}}),Object.defineProperty(m,"FieldCurlyExprDef",{enumerable:!0,get:function(){return d.FieldCurlyExprDef}}),Object.defineProperty(m,"FieldAnonymousDef",{enumerable:!0,get:function(){return d.FieldAnonymousDef}}),Object.defineProperty(m,"FieldNamedDef",{enumerable:!0,get:function(){return d.FieldNamedDef}}),Object.defineProperty(m,"FieldExprDef",{enumerable:!0,get:function(){return d.FieldExprDef}}),Object.defineProperty(m,"Combinator",{enumerable:!0,get:function(){return d.Combinator}}),Object.defineProperty(m,"Expression",{enumerable:!0,get:function(){return d.Expression}}),Object.defineProperty(m,"CondExpr",{enumerable:!0,get:function(){return d.CondExpr}}),Object.defineProperty(m,"CompareExpr",{enumerable:!0,get:function(){return d.CompareExpr}}),Object.defineProperty(m,"CellRefExpr",{enumerable:!0,get:function(){return d.CellRefExpr}}),Object.defineProperty(m,"BuiltinExpr",{enumerable:!0,get:function(){return d.BuiltinExpr}}),Object.defineProperty(m,"BuiltinOneArgExpr",{enumerable:!0,get:function(){return d.BuiltinOneArgExpr}}),Object.defineProperty(m,"BuiltinZeroArgs",{enumerable:!0,get:function(){return d.BuiltinZeroArgs}}),Object.defineProperty(m,"CombinatorExpr",{enumerable:!0,get:function(){return d.CombinatorExpr}}),Object.defineProperty(m,"MathExpr",{enumerable:!0,get:function(){return d.MathExpr}}),Object.defineProperty(m,"NegateExpr",{enumerable:!0,get:function(){return d.NegateExpr}}),Object.defineProperty(m,"RefExpr",{enumerable:!0,get:function(){return d.RefExpr}}),Object.defineProperty(m,"NameExpr",{enumerable:!0,get:function(){return d.NameExpr}}),Object.defineProperty(m,"NumberExpr",{enumerable:!0,get:function(){return d.NumberExpr}}),Object.defineProperty(m,"FieldAnonExpr",{enumerable:!0,get:function(){return d.FieldAnonExpr}}),Object.defineProperty(m,"FieldBuiltinType",{enumerable:!0,get:function(){return d.FieldBuiltinType}}),Object.defineProperty(m,"CompareOperator",{enumerable:!0,get:function(){return d.CompareOperator}}),Object.defineProperty(m,"BuiltinOneArgOperators",{enumerable:!0,get:function(){return d.BuiltinOneArgOperators}}),Object.defineProperty(m,"BuiltinZeroArgsOperators",{enumerable:!0,get:function(){return d.BuiltinZeroArgsOperators}}),Object.defineProperty(m,"MathOperator",{enumerable:!0,get:function(){return d.MathOperator}})})(Yt)),Yt}var Re={},Dr;function Mt(){if(Dr)return Re;Dr=1,Object.defineProperty(Re,"__esModule",{value:!0}),Re.TLBDataError=Re.TLBSchemaError=Re.TLBRuntimeError=void 0;class m extends Error{details;constructor(v,h){super(v),this.name="TLBRuntimeError",this.details=h}}Re.TLBRuntimeError=m;class _ extends m{}Re.TLBSchemaError=_;class g extends m{}return Re.TLBDataError=g,Re}var Xe={},Fr;function tt(){if(Fr)return Xe;Fr=1,Object.defineProperty(Xe,"__esModule",{value:!0}),Xe.symbolMap=Xe.SymbolMap=void 0;let m=class sn{static NotExist=0;map=new Map;counter=0;getName(g){for(const[d,v]of this.map.entries())if(v===g)return d}lookupAdd(g){return this.map.has(g)?this.lookup(g):(this.counter+=1,this.map.set(g,this.counter),this.counter)}lookup(g){return this.map.get(g)||sn.NotExist}};return Xe.SymbolMap=m,Xe.symbolMap=new m,Xe}var Zt={},je={},Rr;function bt(){if(Rr)return je;Rr=1,Object.defineProperty(je,"__esModule",{value:!0}),je.Size=void 0,je.isFixedSize=m,je.packSize=_,je.unpackSize=d;function m(h){return h.minBits===h.maxBits&&h.minRefs===h.maxRefs}function _(h){return(BigInt(h.minBits*256+h.minRefs)<<32n)+BigInt(h.maxBits*256+h.maxRefs)}function g(h){if(h==null)return 0n;const s=typeof h=="bigint"?h:BigInt(h),a=(c,C,O)=>(c&C)!==0n?(c|(C|O))-C:c,B=0xfff800f8n*0x100000001n;if((s&B)!==0n){let c=a(s,0xf8n,0x7n);return c=a(c,0xfff80000n,0x7ff00n),c=a(c,0xf8n<<32n,7n<<32n),c=a(c,0xfff80000n<<32n,0x7ff00n<<32n),c}return s}function d(h){h=g(h);const s=Number(h&0xffn),a=Number(h>>8n&0x7ffn),B=Number(h>>32n&0xffn);return{minBits:Number(h>>40n&0x7ffn),minRefs:B,maxBits:a,maxRefs:s}}let v=class Me{static Any=0x7ff07n;static OneRef=0x100000001n;static Impossible=0x7ff0700000000n;size;constructor(s=Me.Impossible,a=!1){this.size=s,a&&this.normalize()}minSize(){return Number(this.size>>32n&0xffffffffn)}maxSize(){return Number(this.size&0xffffffffn)}minBits(){return this.minSize()>>8&2047}maxBits(){return this.maxSize()>>8&2047}minRefs(){return this.minSize()&255}maxRefs(){return this.maxSize()&255}isFixed(){return this.minSize()===this.maxSize()}fitsIntoCell(){return!(261892-this.minSize()&2147483776)}isPossible(){const s=this.minSize();return!(this.maxSize()-s&2147483776)}normalize(){this.size=g(this.size)}clear(){return this.size=0n,this}clearMin(){return new Me(this.size&(1n<<32n)-1n)}infiniteMax(){return this.size|=0x3ff07n,this}add(s){return new Me(this.size+s.size,!0)}addAssign(s){return this.size+=s.size,this.size=g(this.size),this}orAssign(s){const a=this.unpack(),B=s.unpack();return a.minRefs=Math.min(a.minRefs,B.minRefs),a.minBits=Math.min(a.minBits,B.minBits),a.maxRefs=Math.max(a.maxRefs,B.maxRefs),a.maxBits=Math.max(a.maxBits,B.maxBits),this.size=this.pack(a),this}repeat(s){if(s<=0)return new Me(0n);if(s===1)return new Me(this.size);const a=this.unpack();return s=Math.min(s,1024),a.maxRefs=Math.min(a.maxRefs*s,7),a.maxBits=Math.min(a.maxBits*s,2047),a.minRefs=Math.min(a.minRefs*s,7),a.minBits=Math.min(a.minBits*s,2047),new Me(this.pack(a))}repeatAtLeast(s){s=Math.min(Math.max(s,0),1024);const a=this.unpack();return a.maxRefs>0&&(a.maxRefs=7),a.maxBits>0&&(a.maxBits=2047),a.minRefs=Math.min(a.minRefs*s,7),a.minBits=Math.min(a.minBits*s,2047),new Me(this.pack(a))}static anySize(){return new Me(Me.Any)}static fixedSize(s){return new Me(BigInt(s)*0x10000000100n)}static sizeRange(s,a){const B=(BigInt(s)<<32n)+BigInt(a)<<8n;return new Me(B)}unpack(){return d(this.size)}pack(s){return _(s)}equals(s){return this.size===s.size}notEquals(s){return this.size!==s.size}toString(){const s=this.unpack(),a=m(s);let B="";return a&&(B+="="),s.minBits>=1024&&s.minRefs>=7?B+="infty":(B+=s.minBits.toString(),s.minRefs>0&&(B+=`+${s.minRefs}R`)),a||(B+="..",s.maxBits>=1024&&s.maxRefs>=7?B+="infty":(B+=s.maxBits.toString(),s.maxRefs>0&&(B+=`+${s.maxRefs}R`))),B}};return je.Size=v,je}var ut={},zr;function tr(){if(zr)return ut;zr=1,Object.defineProperty(ut,"__esModule",{value:!0}),ut.BitPrefixCollection=void 0;class m{z=0n;a=0n;b=0n;setValue(d){this.z=d,this.a=d&d-1n,this.b=d|d-1n}contains(d){return this.a<=d.a&&d.b<=this.b}}let _=class Ye{static All=1n;static Max=63n;static Min=0n;prefix;constructor(d){this.prefix=[],d!==void 0&&d!==0n&&this.prefix.push(d)}clear(){this.prefix=[]}all(){this.prefix=[Ye.All<<Ye.Max]}empty(){return this.prefix.length===0}isAll(){return this.prefix.length===1&&this.prefix[0]===Ye.All<<Ye.Max}min(){return this.prefix.length>0?this.prefix[0]:Ye.Min}mergeBack(d){if(this.prefix.length===0){this.prefix.push(d);return}let v=d,h=v&-v;for(;this.prefix.length>0;){const s=v^this.prefix[this.prefix.length-1];if(s===0n)return;if(s!==h<<1n)break;v-=h,h<<=1n,this.prefix.pop()}this.prefix.push(v)}addAssign(d){const v=this.add(d),h=!this.equals(v);return h&&(this.prefix=v.prefix),h}add(d){if(d.prefix.length===0)return this;if(this.prefix.length===0)return d;const v=new Ye;let h=0,s=0;const a=this.prefix.length,B=d.prefix.length,c=new m,C=new m;for(c.setValue(this.prefix[0]),C.setValue(d.prefix[0]);h<a&&s<B;)if(c.b<C.b||c.b===C.b&&c.a>=C.a){if(c.a<C.a&&v.mergeBack(c.z),h++,h===a)break;c.setValue(this.prefix[h])}else{if(C.a<c.a&&v.mergeBack(C.z),s++,s===B)break;C.setValue(d.prefix[s])}for(;h<a;)v.mergeBack(this.prefix[h++]);for(;s<B;)v.mergeBack(d.prefix[s++]);return v}equals(d){if(this.prefix.length!==d.prefix.length)return!1;for(let v=0;v<this.prefix.length;v++)if(this.prefix[v]!==d.prefix[v])return!1;return!0}toString(){return this.empty()?"{}":this.isAll()?"{*}":`{${this.prefix.map(v=>{let h=0,s=v;for(;(s&1n)===0n&&h<64;)s>>=1n,h++;const a=63-h;return a<=0?"*":(v>>BigInt(64-a)).toString(2).padStart(a,"0")+"*"}).join(",")}}`}};return ut.BitPrefixCollection=_,ut}var pt={},Vr;function rr(){if(Vr)return pt;Vr=1,Object.defineProperty(pt,"__esModule",{value:!0}),pt.AdmissibilityInfo=void 0;const m=an();let _=class{dimension;info;constructor(){this.dimension=0,this.info=[!1]}setAll(d=!0){this.dimension=0,this.info=[d]}clearAll(){this.setAll(!1)}extend(d){if(this.dimension<d){const v=this.info.length,h=1<<2*d;this.info.length=h;for(let s=v;s<h;s++)this.info[s]=this.info[s-v];this.dimension=d}}orAssign(d){this.extend(d.dimension);const v=this.info.length,h=d.info.length;for(let s=0,a=0;s<v;s++)this.info[s]=this.info[s]||d.info[a],a=a+1&h-1}setByPattern(d,v){this.extend(d);const h=this.info.length;for(let s=0;s<h;s++){let a=s,B=!0;for(let c=0;c<d;c++){if(!(v[c]>>(a&3)&1)){B=!1;break}a>>=2}B&&(this.info[s]=!0)}}isSetAll(){return this.dimension===0?this.info[0]:this.info.every(d=>d)}isNoneSet(){return this.info.every(d=>!d)}get(d){return this.info[d&this.info.length-1]}conflictsWith(d){return this.conflictsAt(d)>=0}conflictsAt(d){const v=this.info.length,h=d.info.length,s=Math.max(v,h);for(let a=0;a<s;a++)if(this.get(a)&&d.get(a))return a;return m.Undefined}toString(){return`[${this.info.map(d=>d?"1":"0").join("")}]`}};return pt.AdmissibilityInfo=_,pt}var jr;function an(){return jr||(jr=1,(function(m){Object.defineProperty(m,"__esModule",{value:!0}),m.Type=m.TypeArgFlags=m.TypeInteger=m.TypeKind=m.Undefined=void 0;const _=bt(),g=tr(),d=rr(),v=tt();m.Undefined=-1;var h;(function(c){c[c.Nat=0]="Nat",c[c.SignedInteger=1]="SignedInteger",c[c.UnsignedInteger=2]="UnsignedInteger"})(h||(m.TypeKind=h={}));var s;(function(c){c[c.None=0]="None",c[c.Signed=-1]="Signed",c[c.Unsigned=1]="Unsigned"})(s||(m.TypeInteger=s={}));var a;(function(c){c[c.IsType=1]="IsType",c[c.IsNat=2]="IsNat",c[c.IsPos=4]="IsPos",c[c.IsNeg=8]="IsNeg",c[c.NonConst=16]="NonConst"})(a||(m.TypeArgFlags=a={}));class B{name;typeNameId;typeIdx;parentTypeIdx;constrNum;arity;used;lastDeclared;producesNat;isFinal;isBuiltin;isEnum;isSimpleEnum;isSpecial;isPfxDeterm;isParamDeterm;isConstParamDeterm;isConstParamPfxDeterm;isParamPfxDeterm;isDeterm;hasFixedSize;anyBits;isAuto;isAnon;isUnit;isBool;isInteger;usefulDepth;constParamIdx;conflict1;conflict2;size;constructors;args;beginsWith;admissibleParams;csTrie;constructor(C,O){this.name=C,this.typeNameId=O.typeNameId??0,this.typeIdx=O.typeIdx??0,this.parentTypeIdx=O.parentTypeIdx??m.Undefined,this.constrNum=O.constrNum??0,this.arity=O.arity??m.Undefined,this.used=O.used??0,this.lastDeclared=O.lastDeclared??0,this.producesNat=O.producesNat??!1,this.isFinal=O.isFinal??!1,this.isBuiltin=O.isBuiltin??O.isFinal??!1,this.isEnum=O.isEnum??!(O.isFinal??!1),this.isSimpleEnum=O.isSimpleEnum??!(O.isFinal??!1),this.isSpecial=O.isSpecial??!1,this.isPfxDeterm=O.isPfxDeterm??!1,this.isParamDeterm=O.isParamDeterm??!1,this.isConstParamDeterm=O.isConstParamDeterm??!1,this.isConstParamPfxDeterm=O.isConstParamPfxDeterm??!1,this.isParamPfxDeterm=O.isParamPfxDeterm??!1,this.isDeterm=O.isDeterm??!1,this.hasFixedSize=O.hasFixedSize??!1,this.anyBits=O.anyBits??!1,this.isAuto=O.isAuto??!1,this.isAnon=O.isAnon??!1,this.isUnit=O.isUnit??!1,this.isBool=O.isBool??!1,this.isInteger=O.producesNat?s.Unsigned:O.isInteger??s.None,this.usefulDepth=O.usefulDepth??m.Undefined,this.constParamIdx=O.constParamIdx??m.Undefined,this.conflict1=O.conflict1??m.Undefined,this.conflict2=O.conflict2??m.Undefined,this.size=O.size??new _.Size(_.Size.Impossible),this.constructors=O.constructors??[],this.args=O.args??[],this.beginsWith=O.beginsWith??new g.BitPrefixCollection,this.admissibleParams=O.admissibleParams??new d.AdmissibilityInfo,this.csTrie=O.csTrie??null}static create(C,O,ne=!1,b=m.Undefined,F=!1,z=!1,A=m.Undefined,S=s.None){const o=v.symbolMap.lookupAdd(C);if(!C.length||!o)throw new Error(`Invalid type name: ${C}`);const i=new B(C,{typeNameId:o,typeIdx:O,parentTypeIdx:A,constrNum:0,arity:b>=0?b:0,used:0,lastDeclared:0,producesNat:ne,isFinal:F,isBuiltin:F,isEnum:!F,isSimpleEnum:!F,isSpecial:!1,isPfxDeterm:!1,isParamDeterm:!1,isConstParamDeterm:!1,isConstParamPfxDeterm:!1,isParamPfxDeterm:!1,isDeterm:!1,hasFixedSize:!1,anyBits:!1,isAuto:!1,isAnon:!1,isUnit:!1,isBool:!1,isInteger:S,usefulDepth:m.Undefined,constParamIdx:m.Undefined,conflict1:m.Undefined,conflict2:m.Undefined,size:new _.Size(_.Size.Impossible),constructors:[],args:[],beginsWith:new g.BitPrefixCollection,admissibleParams:new d.AdmissibilityInfo,csTrie:null});return z&&i.beginsWith.all(),i}static builtinType(C="",O,ne,b,F=m.Undefined,z=m.Undefined,A=!1,S=s.None){const o=ne.length,i=B.create(C,O,b,o,!0,!0,m.Undefined,S);i.isBuiltin=!0,i.isEnum=!1,i.isSimpleEnum=!1,i.isSpecial=!1,i.anyBits=A,i.setupSize(F,z);const u=C!=="#"?a.IsPos:0;for(let f=0;f<o;f++)i.args[f]=u|(ne[f]==="#"?a.IsNat:a.IsType);return i}setupSize(C=m.Undefined,O=m.Undefined){C<0?this.size=_.Size.anySize():O>=0&&O!==C?this.size=_.Size.sizeRange(O,C):(this.size=_.Size.fixedSize(C),this.hasFixedSize=!0)}findConstructorByName(C){return this.constructors.find(O=>O.constrName===C)}get prefixSize(){let C=0;for(const O of this.constructors)O.tagBits>C&&(C=O.tagBits);return C}get typeFlags(){const C=[];return this.isUnit&&C.push("(UNIT)"),this.isBool&&C.push("(BOOL)"),this.isSimpleEnum&&C.push("(SIMPLE ENUM)"),C}get sizeDisplay(){const O=[`type size ${this.size.toString()}`];return this.hasFixedSize&&O.push("(fixed)"),this.anyBits&&this.beginsWith.isAll()&&O.push("(any bits)"),O.join(" ")}toString(){const C=[],O=v.symbolMap.getName(this.typeNameId)||`type#${this.typeNameId}`;C.push(`type #${this.typeIdx}: \`${O}\`, arity ${this.arity}, ${this.constrNum} constructors`);for(const ne of this.constructors)C.push(ne.toString());for(const ne of this.typeFlags)C.push(`  ${ne}`);if(this.constrNum>1){const ne=this.prefixSize;ne>0?C.push(`  constructor detection: PFX(${ne}) `):this.isParamDeterm&&C.push("  constructor detection: PARAM ")}return C.push(`  ${this.sizeDisplay}`),C.push(`  type begins with ${this.beginsWith.toString()}`),this.arity>0&&!this.admissibleParams.isSetAll()&&C.push(`  type admissibility ${this.admissibleParams.toString()}`),C.push(""),C.join(`
`)}}m.Type=B})(Zt)),Zt}var ft={},Ur;function ei(){if(Ur)return ft;Ur=1,Object.defineProperty(ft,"__esModule",{value:!0}),ft.SrcLocation=void 0;let m=class Jt{line;column;file;constructor(g){this.line=g.line??0,this.column=g.column??0,this.file=g.file??""}static from(g){return g&&"line"in g&&"column"in g?new Jt(g):new Jt({})}};return ft.SrcLocation=m,ft}var dt={},We={},qr;function nr(){if(qr)return We;qr=1,Object.defineProperty(We,"__esModule",{value:!0}),We.TypeExpr=We.TypeExprType=void 0;const m=tt(),_=bt();var g;(function(v){v[v.Type=0]="Type",v[v.Param=1]="Param",v[v.Apply=2]="Apply",v[v.Add=3]="Add",v[v.IntConst=7]="IntConst",v[v.Tuple=8]="Tuple",v[v.Ref=9]="Ref",v[v.CondType=10]="CondType",v[v.GetBit=5]="GetBit",v[v.MulConst=6]="MulConst"})(g||(We.TypeExprType=g={}));let d=class{tp;typeApplied;args;value;isNat;isNatSubtype;negated;tchkOnly;isConstexpr;constructor(h=g.Type,s=null,a=[],B=0,c=!1,C=!1,O=!1,ne=!1,b=0){this.tp=h,this.typeApplied=s,this.args=a,this.value=B,this.isNat=c,this.isNatSubtype=C,this.negated=O,this.tchkOnly=ne,this.isConstexpr=b}toString(){return this.negated?`~${this.toStringInner()}`:this.toStringInner()}toStringInner(){switch(this.tp){case g.Type:return"Type";case g.Param:return`_${this.value+1}`;case g.Apply:{if(!this.typeApplied)return"?";const h=m.symbolMap.getName(this.typeApplied.typeNameId)||"?";if(this.args.length===0)return h;const s=this.args.map(a=>{const B=a.toString();return a.tp===g.Add||a.tp===g.MulConst?`(${B})`:B});return`${h} ${s.join(" ")}`}case g.Add:return this.args.length===2?`${this.args[0].toString()} + ${this.args[1].toString()}`:this.args.length===1?`${this.args[0].toString()} + ${this.value}`:"?";case g.MulConst:return this.args.length>=2?`${this.args[0].toString()} * ${this.args[1].toString()}`:this.args.length===1?`${this.value} * ${this.args[0].toString()}`:"?";case g.GetBit:return this.args.length>0?`${this.args[0].toString()} . ${this.value}`:"?";case g.IntConst:return`${this.value}`;case g.Tuple:return this.args.length===2?`${this.args[0].toString()} * ${this.args[1].toString()}`:"?";case g.Ref:return this.args.length>=1?`^(${this.args[0].toString()})`:"^?";case g.CondType:return this.args.length===2?`${this.args[0].toString()} ? ${this.args[1].toString()}`:"?";default:return"?"}}toNameString(){switch(this.tp){case g.Type:return"Type";case g.Param:return`_${this.value+1}`;case g.Apply:return this.typeApplied&&m.symbolMap.getName(this.typeApplied.typeNameId)||"?";case g.Add:return"+";case g.MulConst:return"*";case g.GetBit:return".";case g.IntConst:return`${this.value}`;case g.Tuple:return"Tuple";case g.Ref:return"^";case g.CondType:return"?:";default:return"?"}}toDeclarationString(h){return this.negated?`~${this.toDeclarationStringInner(h)}`:this.toDeclarationStringInner(h)}toDeclarationStringInner(h){switch(this.tp){case g.Type:return"Type";case g.Param:{const s=this.value;if(s>=0&&s<h.length){const a=m.symbolMap.getName(h[s].name);if(a)return a}return`_${s+1}`}case g.Apply:{if(!this.typeApplied)return"?";const s=m.symbolMap.getName(this.typeApplied.typeNameId)||"?";if(this.args.length===0)return s;const a=this.args.map(B=>{const c=B.toDeclarationString(h);return B.tp===g.Add||B.tp===g.MulConst?`(${c})`:c});return`${s} ${a.join(" ")}`}case g.Add:return this.args.length===2?`${this.args[0].toDeclarationString(h)} + ${this.args[1].toDeclarationString(h)}`:this.args.length===1?`${this.args[0].toDeclarationString(h)} + ${this.value}`:"?";case g.MulConst:return this.args.length>=2?`${this.args[0].toDeclarationString(h)} * ${this.args[1].toDeclarationString(h)}`:this.args.length===1?`${this.value} * ${this.args[0].toDeclarationString(h)}`:"?";case g.GetBit:return this.args.length>0?`${this.args[0].toDeclarationString(h)} . ${this.value}`:"?";case g.IntConst:return`${this.value}`;case g.Tuple:return this.args.length===2?`${this.args[0].toDeclarationString(h)} * ${this.args[1].toDeclarationString(h)}`:"?";case g.Ref:return this.args.length>=1?`^(${this.args[0].toDeclarationString(h)})`:"^?";case g.CondType:return this.args.length===2?`${this.args[0].toDeclarationString(h)} ? ${this.args[1].toDeclarationString(h)}`:"?";default:return"?"}}abstractInterpretNat(){if(!this.isNat)return 15;switch(this.tp){case g.Param:return 15;case g.IntConst:return this.abstractNatConst(this.value);case g.Add:return this.args.length===2?this.abstractAdd(this.args[0].abstractInterpretNat(),this.args[1].abstractInterpretNat()):this.args.length===1?this.abstractAdd(this.args[0].abstractInterpretNat(),this.abstractNatConst(this.value)):15;case g.MulConst:return this.args.length>=2?this.abstractMul(this.args[0].abstractInterpretNat(),this.args[1].abstractInterpretNat()):this.args.length===1?this.abstractMul(this.abstractNatConst(this.value),this.args[0].abstractInterpretNat()):15;case g.GetBit:return this.args.length>=2?this.abstractGetBit(this.args[0].abstractInterpretNat(),this.args[1].abstractInterpretNat()):15;default:return 15}}abstractNatConst(h){return h===0?1:h===1?2:h%2===0?4:8}abstractAdd(h,s){const a=[[1,2,4,8],[2,4,8,12],[4,8,12,12],[8,12,12,12]];let B=0;for(let c=0;c<4;c++)for(let C=0;C<4;C++)h&1<<c&&s&1<<C&&(B|=a[c][C]);return B}abstractMul(h,s){const a=[[1,1,1,1],[1,2,4,8],[1,4,12,12],[1,8,12,12]];let B=0;for(let c=0;c<4;c++)for(let C=0;C<4;C++)h&1<<c&&s&1<<C&&(B|=a[c][C]);return B}abstractGetBit(h,s){const a=[[1,1,1,1],[2,1,3,3],[1,3,3,3],[2,3,3,3]];let B=0;for(let c=0;c<4;c++)for(let C=0;C<4;C++)h&1<<c&&s&1<<C&&(B|=a[c][C]);return B}unpack(){return{minBits:0,minRefs:0,maxBits:0,maxRefs:0}}pack(h){return(BigInt(h.minBits*256+h.minRefs)<<32n)+BigInt(h.maxBits*256+h.maxRefs)}isPossible(){return!0}computeSize(){if(this.isNat&&!this.isNatSubtype)return new _.Size(0n);switch(this.tp){case g.Type:return new _.Size(0n);case g.Param:return _.Size.anySize();case g.Ref:return this.args.length>=1?this.args[0].computeSize().isPossible()?new _.Size(_.Size.OneRef):new _.Size(_.Size.Impossible):new _.Size(_.Size.Impossible);case g.CondType:{if(this.args.length>=2){const h=this.args[0].abstractInterpretNat();if(h&-2){let s=this.args[1].computeSize();return h&1&&(s=s.clearMin()),s}else return new _.Size(0n)}return new _.Size(_.Size.Impossible)}case g.Tuple:{if(this.args.length>=2){const h=this.args[0].abstractInterpretNat();if(h&-2){let s=this.args[1].computeSize();if(this.args[0].tp===g.IntConst)return s=s.repeat(this.args[0].value),s;if(h&1&&(s=s.clearMin()),h&12){const a=h&1?0:h&2?1:2;s=s.repeatAtLeast(a)}return s}else return new _.Size(0n)}return new _.Size(_.Size.Impossible)}case g.MulConst:{if(this.args.length>=1){if(this.value>0){let s=this.args[0].computeSize();return s=s.repeat(this.value),s}const h=this.args[0].abstractInterpretNat();if(h&-2){let s=this.args.length>=2?this.args[1].computeSize():_.Size.anySize();if(h&1&&(s=s.clearMin()),h&12){const a=h&1?0:h&2?1:2;s=s.repeatAtLeast(a)}return s}else return new _.Size(0n)}return _.Size.anySize()}case g.Apply:{if(this.typeApplied){if(this.args.length===1&&this.args[0].tp===g.IntConst){const h=this.args[0].value,s=m.symbolMap.getName(this.typeApplied.typeNameId);if(s==="##")return _.Size.fixedSize(Math.min(h,2047));if(s==="#<="){if(h===0)return _.Size.fixedSize(2047);const a=32-Math.clz32(h);return _.Size.fixedSize(a)}else if(s==="#<"){if(h<=1)return _.Size.fixedSize(2047);const a=32-Math.clz32(h-1);return _.Size.fixedSize(a)}else if(s==="int"||s==="uint"||s==="bits")return _.Size.fixedSize(Math.min(h,2047))}return this.typeApplied.size}return _.Size.anySize()}default:return _.Size.anySize()}}computeAnyBits(){if(this.isNat)return!0;switch(this.tp){case g.Type:return!0;case g.Param:return!1;case g.Ref:return!0;case g.Tuple:case g.CondType:return this.args.length===2?this.args[0].abstractInterpretNat()&-2?this.args[1].computeAnyBits():!0:!1;case g.Apply:{if(this.typeApplied){if(this.args.length===1&&this.args[0].tp===g.IntConst){const h=this.args[0].value,s=m.symbolMap.getName(this.typeApplied.typeNameId);if(s==="#<=")return!(h&h+1);if(s==="#<")return!(h&h-1)}return this.typeApplied.anyBits}return!1}default:return!1}}};return We.TypeExpr=d,We}var Gr;function on(){if(Gr)return dt;Gr=1,Object.defineProperty(dt,"__esModule",{value:!0}),dt.Constructor=void 0;const m=tr(),_=rr(),g=bt(),d=nr(),v=tt();let h=class{constrName;typeName;typeDefined;where;tag;tagBits;fieldsNum;typeArity;isFwd;isEnum;isSimpleEnum;isSpecial;hasFixedSize;anyBits;size;beginsWith;fields;params;paramNegated;paramConstVal;admissibleParams;constructor(a){this.constrName=a.constrName??0,this.typeName=a.typeName??0,this.typeDefined=a.typeDefined??null,this.where=a.where??{line:0,column:0,file:""},this.tag=a.tag??0n,this.tagBits=a.tagBits??0,this.fieldsNum=a.fieldsNum??0,this.typeArity=a.typeArity??0,this.isFwd=a.isFwd??!1,this.isEnum=a.isEnum??!1,this.isSimpleEnum=a.isSimpleEnum??!1,this.isSpecial=a.isSpecial??!1,this.hasFixedSize=a.hasFixedSize??!1,this.anyBits=a.anyBits??!1,this.size=a.size??new g.Size(g.Size.Impossible),this.beginsWith=a.beginsWith??new m.BitPrefixCollection,this.fields=a.fields??[],this.params=a.params??[],this.paramNegated=a.paramNegated??[],this.paramConstVal=a.paramConstVal??[],this.admissibleParams=a.admissibleParams??new _.AdmissibilityInfo}get displayName(){const a=v.symbolMap.getName(this.constrName)||"_";if(this.tagBits>0){let B="";return this.tagBits<=64?B=this.tag.toString(2).padStart(this.tagBits,"0"):B="?",a==="_"?`_$${B}`:`${a}$${B}`}return this.isSimpleEnum||this.tagBits===0&&this.fields.length===0?a==="_"?"_$_":`${a}$_`:this.tagBits===0&&this.fields.length>0?a==="_"?"_$_":`${a}$_`:a}formatFieldForDeclaration(a){const B=v.symbolMap.getName(a.name);let c="";if(B){let C=a.type.toDeclarationString(this.fields);(a.type.tp===d.TypeExprType.Apply&&a.type.args.length>0||a.type.tp===d.TypeExprType.MulConst&&a.type.args.length>0||a.type.tp===d.TypeExprType.Tuple&&a.type.args.length>0)&&(C=`(${C})`),c=`${B}:${C}`}else{let C=a.type.toDeclarationString(this.fields);!a.implicit&&a.type.tp!==d.TypeExprType.IntConst&&a.type.tp!==d.TypeExprType.Type&&a.type.tp!==d.TypeExprType.Param&&a.type.args.length>0&&(C=`(${C})`),c=C}return a.implicit?`{${c}}`:c}get resultType(){let B=this.typeDefined?v.symbolMap.getName(this.typeDefined.typeNameId)||`type#${this.typeDefined.typeNameId}`:v.symbolMap.getName(this.typeName)||`type#${this.typeName}`;if(this.typeDefined&&this.typeDefined.arity>0)if(this.params.length>0){const c=this.params.map(C=>{const O=C.toDeclarationString(this.fields);return C.tp===d.TypeExprType.Add||C.tp===d.TypeExprType.MulConst?`(${O})`:O});B+=" "+c.join(" ")}else{const c=[];for(const C of this.fields)if(C.implicit&&C.type.typeApplied?.name==="Type"){const O=v.symbolMap.getName(C.name);O&&c.push(O)}c.length>0&&(B+=" "+c.join(" "))}return B}get declaration(){const a=[this.displayName];for(const B of this.fields)a.push(this.formatFieldForDeclaration(B));return a.push(`= ${this.resultType}`),a.join(" ")}get sizeDisplay(){const B=[`size ${this.size.toString()}`];return this.hasFixedSize&&B.push("(fixed)"),this.hasFixedSize&&this.anyBits&&B.push("(any bits)"),B.join(" ")}toString(){const a=[],B=v.symbolMap.getName(this.constrName)||"_";a.push(`  constructor \`${B}\``),a.push(`	${this.declaration};`),a.push(`	begins with ${this.beginsWith.toString()}`),this.typeArity>0&&!this.admissibleParams.isSetAll()&&!this.admissibleParams.isNoneSet()&&a.push(`	admissibility ${this.admissibleParams.toString()}`),a.push(`	${this.sizeDisplay}`);for(const c of this.fields)a.push(`		${c.toString()}`);return a.join(`
`)}};return dt.Constructor=h,dt}var mt={},Hr;function ln(){if(Hr)return mt;Hr=1,Object.defineProperty(mt,"__esModule",{value:!0}),mt.Field=void 0;const m=tt();let _=class{fieldIdx;implicit;known;constraint;used;subrec;name;type;loc;constructor(d,v,h,s,{implicit:a=!1,known:B=!1,constraint:c=!1,used:C=!1,subrec:O=!1}={}){this.fieldIdx=d,this.name=v,this.type=h,this.loc=s,this.implicit=a,this.known=B,this.constraint=c,this.used=C,this.subrec=O}toString(){const d=this.name===0?"_":m.symbolMap.getName(this.name)||`field#${this.name}`,v=[];return v.push(`field \`${d}\`:`),v.push(this.type.toString()),v.push(`(used=${this.used?1:0})`),v.push(`(is_nat_subtype=${this.type.isNatSubtype?1:0})`),v.join(" ")}};return mt.Field=_,mt}var Xr;function ti(){if(Xr)return ot;Xr=1,Object.defineProperty(ot,"__esModule",{value:!0}),ot.Schema=void 0;const m=Qn(),_=Mt(),g=tt(),d=an(),v=ei(),h=on(),s=bt(),a=nr(),B=rr(),c=tr(),C=ln();let O=class De{builtinTypesNum=0;types=[];constExprCounter=0;constExprMap=new Map;nextAnonymousTypeIdx=0;constructor(){this.defineBuiltins()}static from(b){try{const F=(0,m.ast)(b),z=new De,A=new Map;for(const f of F.declarations){const p=f.combinator.name;A.has(p)||A.set(p,f)}const S=new Set,o=new Set,i=f=>{const p=new Set;if(f.fields)for(const w of f.fields)"expr"in w&&De.extractTypesFromExpr(w.expr,p);return Array.from(p)},u=f=>{if(z.findTypeByName(f)||S.has(f)||o.has(f))return;o.add(f);const p=A.get(f);if(p){const w=i(p);for(const I of w)u(I);z.addTypeStub(p)}o.delete(f),S.add(f)};for(const f of F.declarations)u(f.combinator.name),z.registerAnonymousTypes(f);De.lastDeclaredCounter=0,z.nextAnonymousTypeIdx=z.builtinTypesNum;for(const f of F.declarations)z.defineUserType(f);return z.recalculateSizes(),{success:!0,value:z}}catch(F){const z=F instanceof Error?F.message:String(F);return{success:!1,error:new _.TLBSchemaError(`Schema parsing failed: ${z}`)}}}static extractTypesFromExpr(b,F){if(!b)return;const z=b.constructor?.name;if(z==="CombinatorExpr"){if(b.name&&F.add(b.name),b.args)for(const A of b.args)De.extractTypesFromExpr(A,F)}else z==="CellRefExpr"?De.extractTypesFromExpr(b.expr,F):z==="NameExpr"?b.name&&F.add(b.name):z==="MathExpr"||z==="CompareExpr"?(De.extractTypesFromExpr(b.left,F),De.extractTypesFromExpr(b.right,F)):z==="NegateExpr"&&De.extractTypesFromExpr(b.expr,F)}recalculateSizes(){let b=!0,F=0;for(;b&&F<100;){b=!1;for(const z of this.userTypes){for(const S of z.constructors){const o=S.size.size;S.size=s.Size.fixedSize(S.tagBits),S.hasFixedSize=!0;for(const i of S.fields){if(i.implicit||i.constraint)continue;const u=i.type.computeSize();S.size.addAssign(u),u.isFixed()||(S.hasFixedSize=!1)}S.size.size!==o&&(b=!0)}const A=z.size.size;if(z.constructors.length>0){z.size=new s.Size(z.constructors[0].size.size,!0);for(let S=1;S<z.constructors.length;S++)z.size.orAssign(z.constructors[S].size);z.hasFixedSize=z.size.isFixed()}z.size.size!==A&&(b=!0)}F++}for(b=!0,F=0;b&&F<100;){b=!1;for(const z of this.userTypes){for(const S of z.constructors){let o=!0;for(const i of S.fields)!i.implicit&&!i.constraint&&(o=o&&i.type.computeAnyBits());o!==S.anyBits&&(S.anyBits=o,b=!0)}let A=z.beginsWith.isAll();for(const S of z.constructors)A=A&&S.anyBits;A!==z.anyBits&&(z.anyBits=A,b=!0)}F++}this.calculateAdmissibility()}calculateAdmissibility(){for(const b of this.userTypes){if(b.arity===0||b.constructors.length===0)continue;b.admissibleParams.clearAll();let F=!0;for(const z of b.constructors)if(!z.beginsWith.isAll()){F=!1;break}for(const z of b.constructors){if(z.admissibleParams.clearAll(),z.params.length>0){const A=z.params[0];if(!A.negated){const S=A.abstractInterpretNat();z.admissibleParams.dimension=0,z.admissibleParams.info=[!!(S&1),!!(S&2),!!(S&4),!!(S&8)],z.admissibleParams.dimension=1}}b.admissibleParams.orAssign(z.admissibleParams)}if(F&&b.constructors.length>1){let z=!0;for(let A=0;A<b.constructors.length&&z;A++)for(let S=A+1;S<b.constructors.length&&z;S++)b.constructors[A].admissibleParams.conflictsWith(b.constructors[S].admissibleParams);b.isParamDeterm=!0}}}static lastDeclaredCounter=0;addTypeStub(b){const F=b.combinator.name;if(F.length===0||!/[A-Z]/.test(F[0]))return;if(!this.findTypeByName(F)){const A=this.types.length,S=b.combinator.args.length,o=d.Type.create(F,A,!1,S,!1,!1);this.types.push(o),g.symbolMap.lookupAdd(F)}}registerAnonymousTypes(b){b.fields&&this.registerAnonymousTypesFromFields(b.fields)}registerAnonymousTypesFromFields(b){for(const F of b)if(F.constructor?.name==="FieldAnonymousDef"&&F.fields){const z=this.types.length,A=`TYPE_${z}`,S=d.Type.create(A,z,!1,0,!1,!0);S.isAnon=!0,this.types.push(S),this.registerAnonymousTypesFromFields(F.fields)}}get getBuiltinTypes(){return this.types.slice(0,this.builtinTypesNum)}get userTypes(){return this.types.slice(this.builtinTypesNum)}isBuiltinType(b){return b.typeIdx<this.builtinTypesNum}findTypeByName(b){if(b==="Type")return g.symbolMap.lookupAdd("Type"),d.Type.create("Type",-1,!1,0,!1,!1);const F=typeof b=="string"?g.symbolMap.lookup(b):b;if(F)return this.types.find(z=>z.typeNameId===F)}findTypeById(b){return this.types.find(F=>F.typeNameId===b)}defineUserType(b){const F=b.combinator.name;if(F.length===0||!/[A-Z]/.test(F[0])){const o=`implicitly defined type \`${F}\` must begin with an uppercase letter`;throw b.locations?new Error(`${b.locations.line}:${b.locations.column}: ${o}`):new Error(o)}const z=b.combinator.args.length,A=this.findTypeByName(F);if(!A)throw new Error(`Type ${F} not found in schema (internal error)`);const S=A.constructors.length===0;if(b.constructorDef&&b.fields){const o=b.constructorDef.name||"_",i=o==="_"?0:g.symbolMap.lookupAdd(o);let u=0n,f=0;if(b.constructorDef.tag){const x=b.constructorDef.tag;if(x.startsWith("$")){const y=x.substring(1).replace(/_/g,"");if(y==="")u=0n,f=0;else{f=y.length,u=0n;for(let L=0;L<f;L++)u=u<<1n|(y[L]==="1"?1n:0n)}}else if(x.startsWith("#")){const y=x.substring(1).replace(/_/g,"");y===""?(u=0n,f=0):(f=y.length*4,u=BigInt(`0x${y}`))}}const p=new h.Constructor({constrName:i,typeName:A.typeNameId,typeDefined:A,where:v.SrcLocation.from(b.locations),tag:u,tagBits:f,fieldsNum:b.fields.length,typeArity:z,isFwd:b.fields.length===0,isEnum:!1,isSimpleEnum:!1,isSpecial:!1,hasFixedSize:!1,anyBits:!1,size:new s.Size(s.Size.Impossible),beginsWith:new c.BitPrefixCollection,fields:[],params:[],paramNegated:[],paramConstVal:[],admissibleParams:new B.AdmissibilityInfo}),w=new Map;for(let x=0;x<b.fields.length;x++){const y=b.fields[x],L="name"in y?y.name:"",q=L?g.symbolMap.lookupAdd(L):0;let V;if(y.constructor.name==="FieldAnonymousDef"){const T=y,P=this.createAnonymousType(T.fields,v.SrcLocation.from(T.locations),w),k=new a.TypeExpr(a.TypeExprType.Apply,P,[],0,!1,!1);T.isRef?V=this.registerConstExpr(new a.TypeExpr(a.TypeExprType.Ref,null,[k])):V=this.registerConstExpr(k)}else if("type"in y&&typeof y.type=="string")if(y.type==="#"){const T=this.findTypeByName("#");V=this.registerConstExpr(new a.TypeExpr(a.TypeExprType.Apply,T,[],0,!0,!0))}else if(y.type==="Type"){const T=this.findTypeByName("Type");V=this.registerConstExpr(new a.TypeExpr(a.TypeExprType.Apply,T,[],0,!1,!1))}else V=new a.TypeExpr(a.TypeExprType.Type);else V=this.parseTypeExpr("expr"in y?y.expr:null,v.SrcLocation.from("locations"in y?y.locations:null),w);V.tp===a.TypeExprType.Tuple&&(V.isNatSubtype=!1),q!==0&&w.set(q,{idx:x,isNat:V.isNat||V.isNatSubtype});const se=y.constructor.name==="FieldBuiltinDef"||y.constructor.name==="FieldCurlyExprDef",oe=y.constructor.name==="FieldCurlyExprDef",ye=new C.Field(x,q,V,v.SrcLocation.from("locations"in y?y.locations:null),{implicit:se,known:!1,constraint:oe,used:!1,subrec:!1});p.fields.push(ye)}if(b.combinator&&b.combinator.args)for(const x of b.combinator.args){const y=this.parseTypeExpr(x,v.SrcLocation.from(b.combinator.locations||b.locations),w);p.params.push(y),p.paramNegated.push(y.negated)}for(const x of p.fields)this.markUsedParams(x.type,p.fields);if(f>0){const x=u<<64n-BigInt(f)|1n<<63n-BigInt(f);p.beginsWith=new c.BitPrefixCollection(x),p.anyBits=!1}else p.beginsWith.all(),p.anyBits=!0;p.size=s.Size.fixedSize(f),p.hasFixedSize=!0;for(const x of p.fields){if(x.implicit||x.constraint)continue;const y=x.type.computeSize();p.size.addAssign(y),y.isFixed()||(p.hasFixedSize=!1)}p.fields.length,p.hasFixedSize&&(p.anyBits=!0),p.isFwd=i===0&&f===0&&z===0&&p.fields.length===1&&!p.fields[0].implicit&&!p.fields[0].constraint;let I=0,N=0;for(const x of p.fields)!x.implicit&&!x.constraint&&I++;p.isEnum=I===0,N=z,p.isSimpleEnum=p.isEnum&&N===0,A.constructors.push(p),A.constrNum=A.constructors.length,A.isEnum=A.isEnum&&p.isEnum,A.isSimpleEnum=A.isSimpleEnum&&p.isSimpleEnum,S?(De.lastDeclaredCounter++,A.lastDeclared=De.lastDeclaredCounter,A.size=new s.Size(p.size.size,!0),A.hasFixedSize=p.hasFixedSize,A.anyBits=p.anyBits,A.beginsWith=new c.BitPrefixCollection,A.beginsWith.addAssign(p.beginsWith)):(A.size.orAssign(p.size),A.beginsWith.addAssign(p.beginsWith),A.hasFixedSize=A.size.isFixed(),A.anyBits=A.beginsWith.isAll())}else A.constrNum=1;if(z>0&&(A.args=new Array(z).fill(0)),A.arity===0&&A.constrNum>0&&A.hasFixedSize&&A.anyBits&&A.beginsWith.isAll()){const o=A.size.minSize();o===0?A.isUnit=!0:o===256&&(A.isBool=!0)}return A}get userTypesNum(){return this.types.length-this.builtinTypesNum}get typesNum(){return this.types.length}get userDefinedInfo(){const b=[];b.push(`${this.typesNum} types defined, out of them ${this.builtinTypesNum} built-in, ${this.userTypesNum} user-defined`);const F=new Set,z=f=>{if(f.tp===a.TypeExprType.Apply&&f.typeApplied){const p=f.typeApplied;p.isBuiltin&&p.typeIdx<this.builtinTypesNum&&F.add(p)}else if(f.tp===a.TypeExprType.Param&&f.isNat){const p=this.findTypeByName("#");p&&p.isBuiltin&&F.add(p)}for(const p of f.args)z(p)};for(let f=this.builtinTypesNum;f<this.typesNum;f++){const p=this.types[f];for(const w of p.constructors)for(const I of w.fields)z(I.type)}const A=Array.from(F).filter(f=>{const p=g.symbolMap.getName(f.typeNameId);return p!=="="&&p!=="<"&&p!=="<="}).map(f=>({type:f,index:this.types.indexOf(f)})).filter(f=>f.index>=0).sort((f,p)=>f.index-p.index);for(const{type:f,index:p}of A){const w=g.symbolMap.getName(f.typeNameId)||`type#${f.typeNameId}`,I=[];I.push(`built-in type #${p}: \`${w}\`, arity ${f.arity}`),I.push(`prefixes ${f.beginsWith.toString()}`);const N=f.size.toString();if(N!=="infty..infty"){const x=N.startsWith("=")?` ${N}`:` ${N}`;I.push(`size${x}`)}b.push(I.join("; "))}const S=[...this.userTypes].sort((f,p)=>f.typeIdx-p.typeIdx);for(const f of S)b.push(f.toString());b.push("****************");const o=new Map,i=f=>{f.isConstexpr>0&&o.set(f.isConstexpr,f);for(const p of f.args)i(p)};for(let f=this.builtinTypesNum;f<this.typesNum;f++){const p=this.types[f];for(const w of p.constructors){for(const I of w.fields)i(I.type);for(const I of w.params)i(I)}}const u=Array.from(o.entries()).sort((f,p)=>f[0]-p[0]);b.push(`${u.length} constant expressions:`);for(const[f,p]of u)b.push(`expr #${f}: ${p.toString()}`);return b.join(`
`)+`
`}createAnonymousType(b,F,z){let A;for(;this.nextAnonymousTypeIdx<this.types.length;){const i=this.types[this.nextAnonymousTypeIdx];if(this.nextAnonymousTypeIdx++,i.isAnon&&i.constructors.length===0){A=i;break}}if(!A)throw new Error("Internal error: no anonymous type stub available");A.isEnum=!0,A.isSimpleEnum=!1;const S=new h.Constructor({constrName:g.symbolMap.lookupAdd("_"),typeName:A.typeNameId,typeDefined:A,where:F,tag:0n,tagBits:0,fieldsNum:b.length,typeArity:0,isFwd:!1,isEnum:!1,isSimpleEnum:!1,isSpecial:!1,hasFixedSize:!0,anyBits:!0,size:new s.Size(s.Size.Impossible),beginsWith:new c.BitPrefixCollection,fields:[],params:[],paramNegated:[],paramConstVal:[],admissibleParams:new B.AdmissibilityInfo}),o=new Map(z);for(let i=0;i<b.length;i++){const u=b[i],f="name"in u?u.name:"",p=f?g.symbolMap.lookupAdd(f):0;let w;if(u.constructor.name==="FieldAnonymousDef"){const y=this.createAnonymousType(u.fields||[],v.SrcLocation.from(u.locations),o),L=new a.TypeExpr(a.TypeExprType.Apply,y,[],0,!1,!1);u.isRef?w=this.registerConstExpr(new a.TypeExpr(a.TypeExprType.Ref,null,[L])):w=this.registerConstExpr(L)}else if("type"in u&&typeof u.type=="string")if(u.type==="#"){const y=this.findTypeByName("#");w=this.registerConstExpr(new a.TypeExpr(a.TypeExprType.Apply,y,[],0,!0,!0))}else if(u.type==="Type"){const y=this.findTypeByName("Type");w=this.registerConstExpr(new a.TypeExpr(a.TypeExprType.Apply,y,[],0,!1,!1))}else w=new a.TypeExpr(a.TypeExprType.Type);else w=this.parseTypeExpr("expr"in u?u.expr:null,v.SrcLocation.from("locations"in u?u.locations:null),o);p!==0&&o.set(p,{idx:i,isNat:w.isNat||w.isNatSubtype});const I=u.constructor.name==="FieldBuiltinDef"||u.constructor.name==="FieldCurlyExprDef",N=u.constructor.name==="FieldCurlyExprDef",x=new C.Field(i,p,w,v.SrcLocation.from("locations"in u?u.locations:null),{implicit:I,known:!1,constraint:N,used:!1,subrec:!1});S.fields.push(x)}for(const i of S.fields)this.markUsedParams(i.type,S.fields);S.beginsWith.all(),S.anyBits=!0,S.size=s.Size.fixedSize(0),S.hasFixedSize=!0;for(const i of S.fields)if(!i.implicit&&!i.constraint){const u=i.type.computeSize();S.size.addAssign(u),u.isFixed()||(S.hasFixedSize=!1)}return A.constructors.push(S),A.size=new s.Size(S.size.size,!0),A.hasFixedSize=S.hasFixedSize,A.anyBits=S.anyBits,A.beginsWith.all(),A.isEnum=!1,A.isSimpleEnum=!1,A}parseTypeExpr(b,F,z){if(!b)return new a.TypeExpr(a.TypeExprType.Type);if(b.constructor.name==="NumberExpr"||"num"in b&&!("kind"in b))return this.registerConstExpr(new a.TypeExpr(a.TypeExprType.IntConst,null,[],b.num,!0,!0));if(b.constructor.name==="BuiltinOneArgExpr"||"name"in b&&"arg"in b&&!("kind"in b)){const A=b.name,S=this.findTypeByName(A);if(S){const o=this.parseTypeExpr(b.arg,F,z),i=new a.TypeExpr(a.TypeExprType.Apply,S,[o],0,S.producesNat,S.producesNat);return this.registerConstExpr(i)}}if("kind"in b)switch(b.kind){case"TLBRefType":{const A=this.parseTypeExpr(b.value,F,z),S=new a.TypeExpr(a.TypeExprType.Ref,null,[A]);return this.registerConstExpr(S)}case"TLBApplyType":{const A=b.name,S=this.findTypeByName(A);if(S){const o=[];if(b.args&&Array.isArray(b.args))for(const u of b.args)o.push(this.parseTypeExpr(u,F,z));const i=new a.TypeExpr(a.TypeExprType.Apply,S,o,0,S.producesNat,S.producesNat);return this.registerConstExpr(i)}break}case"TLBParamType":if(b.name==="#"){const A=new a.TypeExpr(a.TypeExprType.Param,null,[],0,!0,!0);return this.registerConstExpr(A)}break;case"TLBIntType":if(b.value!==void 0){const A=new a.TypeExpr(a.TypeExprType.IntConst,null,[],b.value);return this.registerConstExpr(A)}break;case"TLBTupleType":{const A=[];if(b.fields&&Array.isArray(b.fields))for(const o of b.fields)"type"in o&&A.push(this.parseTypeExpr(o.type,F,z));const S=new a.TypeExpr(a.TypeExprType.Tuple,null,A);return this.registerConstExpr(S)}case"TLBCondType":{const A=this.parseTypeExpr(b.condition,F,z),S=this.parseTypeExpr(b.value,F,z),o=new a.TypeExpr(a.TypeExprType.CondType,null,[A,S]);return this.registerConstExpr(o)}}if(b.constructor.name==="NegateExpr"){const A=this.parseTypeExpr(b.expr,F,z);if(A.tp===a.TypeExprType.IntConst)return this.registerConstExpr(A);if((A.tp===a.TypeExprType.Add||A.tp===a.TypeExprType.MulConst)&&A.args.length>=2){const o=A.args[0],i=new a.TypeExpr(o.tp,o.typeApplied,o.args,o.value,o.isNat,o.isNatSubtype,!0,o.tchkOnly,o.isConstexpr),u=new a.TypeExpr(A.tp,A.typeApplied,[i,A.args[1]],A.value,A.isNat,A.isNatSubtype,!1,A.tchkOnly,A.isConstexpr);return this.registerConstExpr(u)}const S=new a.TypeExpr(A.tp,A.typeApplied,A.args,A.value,A.isNat,A.isNatSubtype,!0,A.tchkOnly,A.isConstexpr);return this.registerConstExpr(S)}if(b.constructor.name==="CellRefExpr"){const A=this.parseTypeExpr(b.expr,F,z),S=new a.TypeExpr(a.TypeExprType.Ref,null,[A]);return this.registerConstExpr(S)}if(b.constructor.name==="CombinatorExpr"){const A=b.name,S=this.findTypeByName(A);if(S){const o=[];if(b.args&&Array.isArray(b.args))for(const u of b.args)o.push(this.parseTypeExpr(u,F,z));const i=new a.TypeExpr(a.TypeExprType.Apply,S,o,0,S.producesNat,S.producesNat);return this.registerConstExpr(i)}}if(b.constructor.name==="MathExpr"){const A=this.parseTypeExpr(b.left,F,z),S=this.parseTypeExpr(b.right,F,z),o=b.op;if(o==="+"){const i=new a.TypeExpr(a.TypeExprType.Add,null,[A,S],0,!0,!0);return this.registerConstExpr(i)}if(o==="*"){const i=A.isNat&&S.isNat,u=new a.TypeExpr(a.TypeExprType.MulConst,null,[A,S],0,i,i);return this.registerConstExpr(u)}}if(b.constructor.name==="CompareExpr"){const A=this.parseTypeExpr(b.left,F,z),S=this.parseTypeExpr(b.right,F,z),o=b.op;let i="";switch(o){case"<=":i="<=";break;case"<":i="<";break;case"=":i="=";break;case">=":i=">=";break;case">":i=">";break;case"!=":i="!=";break}if(i){const u=this.findTypeByName(i);if(u){const f=new a.TypeExpr(a.TypeExprType.Apply,u,[A,S],0,!1,!1);return this.registerConstExpr(f)}}}if(b.constructor.name==="NameExpr"){const A=b.name,S=g.symbolMap.lookup(A);if(z&&z.has(S)){const{idx:i,isNat:u}=z.get(S),f=new a.TypeExpr(a.TypeExprType.Param,null,[],i,u,u);return this.registerConstExpr(f)}const o=this.findTypeByName(A);if(o){const i=new a.TypeExpr(a.TypeExprType.Apply,o,[],0,o.producesNat,o.producesNat);return this.registerConstExpr(i)}}if("name"in b){const A=b.name;if(A==="#"){const S=new a.TypeExpr(a.TypeExprType.Param,null,[],0,!0,!0);return this.registerConstExpr(S)}else{const S=this.findTypeByName(A);if(S){const i=new a.TypeExpr(a.TypeExprType.Apply,S,[],0,S.producesNat,S.producesNat);return this.registerConstExpr(i)}const o=g.symbolMap.lookup(A);if(z&&z.has(o)){const{idx:i,isNat:u}=z.get(o),f=new a.TypeExpr(a.TypeExprType.Param,null,[],i,u,u);return this.registerConstExpr(f)}}}return new a.TypeExpr(a.TypeExprType.Type)}registerConstExpr(b){if(this.isConstantExpr(b)&&b.isConstexpr===0){const z=b.toString();this.constExprMap.has(z)||(this.constExprCounter++,this.constExprMap.set(z,this.constExprCounter)),b.isConstexpr=this.constExprMap.get(z)}return b}markUsedParams(b,F){if(b.tp===a.TypeExprType.Param){const z=b.value;if(z>=0&&z<F.length){const A=F[z];A.implicit&&(A.used=!0)}}for(const z of b.args)this.markUsedParams(z,F)}isConstantExpr(b){if(b.tp===a.TypeExprType.Apply&&(b.typeApplied&&b.typeApplied.name==="Type"||b.typeApplied&&b.typeApplied.name==="#")||b.tp===a.TypeExprType.Param||b.tp===a.TypeExprType.IntConst&&b.value===0)return!1;for(const F of b.args)if(!this.isConstantExpr(F))return!1;return!0}defineBuiltins(){this.defineBuiltinType("#",[],!0,32,32,!0,d.TypeInteger.Unsigned),this.defineBuiltinType("##",["#"],!0,32,0,!0,d.TypeInteger.Unsigned),this.defineBuiltinType("#<",["#"],!0,32,0,!1,d.TypeInteger.Unsigned),this.defineBuiltinType("#<=",["#"],!0,32,0,!1,d.TypeInteger.Unsigned),this.defineBuiltinType("Any",[],!1),this.defineBuiltinType("Cell",[],!1),this.defineBuiltinType("int",["#"],!1,257,0,!0,d.TypeInteger.Signed),this.defineBuiltinType("uint",["#"],!1,256,0,!0,d.TypeInteger.Unsigned),this.defineBuiltinType("bits",["#"],!1,1023,0,!0),this.defineBuiltinType("SnakeString",[],!1);for(let b=1;b<=257;b++)this.defineBuiltinType(`int${b}`,[],!1,b,b,!0,d.TypeInteger.Signed),b<=256&&this.defineBuiltinType(`uint${b}`,[],!1,b,b,!0,d.TypeInteger.Unsigned);for(let b=1;b<=1023;b++)this.defineBuiltinType(`bits${b}`,[],!1,b,b,!0);this.defineBuiltinType("=",["##"],!1,0,0,!0),this.defineBuiltinType("<",["##"],!1,0,0,!0),this.defineBuiltinType("<=",["##"],!1,0,0,!0),g.symbolMap.lookupAdd("#"),g.symbolMap.lookupAdd("="),g.symbolMap.lookupAdd("<"),g.symbolMap.lookupAdd("<=")}defineBuiltinType(b="",F,z,A=d.Undefined,S=d.Undefined,o=!1,i=d.TypeInteger.None){const u=this.types.length,f=d.Type.builtinType(b,u,F,z,A,S,o,i);return this.types.push(f),this.builtinTypesNum+=1,f}};return ot.Schema=O,ot}var Wr;function Kr(){return Wr||(Wr=1,(function(m){Object.defineProperty(m,"__esModule",{value:!0}),m.Constructor=m.Field=m.TypeExprType=m.TypeExpr=m.isFixedSize=m.Size=m.unpackSize=m.packSize=m.Schema=void 0;var _=ti();Object.defineProperty(m,"Schema",{enumerable:!0,get:function(){return _.Schema}});var g=bt();Object.defineProperty(m,"packSize",{enumerable:!0,get:function(){return g.packSize}}),Object.defineProperty(m,"unpackSize",{enumerable:!0,get:function(){return g.unpackSize}}),Object.defineProperty(m,"Size",{enumerable:!0,get:function(){return g.Size}}),Object.defineProperty(m,"isFixedSize",{enumerable:!0,get:function(){return g.isFixedSize}});var d=nr();Object.defineProperty(m,"TypeExpr",{enumerable:!0,get:function(){return d.TypeExpr}}),Object.defineProperty(m,"TypeExprType",{enumerable:!0,get:function(){return d.TypeExprType}});var v=ln();Object.defineProperty(m,"Field",{enumerable:!0,get:function(){return v.Field}});var h=on();Object.defineProperty(m,"Constructor",{enumerable:!0,get:function(){return h.Constructor}})})(Kt)),Kt}var Ke={},Yr;function ri(){if(Yr)return Ke;Yr=1,Object.defineProperty(Ke,"__esModule",{value:!0}),Ke.stringToBits=g,Ke.bitsToString=d,Ke.normalizeBitString=v,Ke.toCell=h;const m=er(),_=Mt();function g(s){const a=Sr.from(s,"utf-8");return new m.BitString(a,0,a.length*8)}function d(s){if(s.length%8!==0)throw new Error("Bits must be at least 8 bits");let a="";for(let B=0;B<s.length;B+=8)a+=String.fromCharCode(parseInt(`0x${s.substring(B,8).toString()}`));return a}function v(s){const a=s.length,B=Sr.alloc(Math.ceil(a/8));for(let c=0;c<a;c++){const C=Math.floor(c/8),O=7-c%8;s.at(c)&&(B[C]|=1<<O)}return new m.BitString(B,0,a)}function h(s){try{return{success:!0,value:m.Cell.fromBase64(s)}}catch{try{return{success:!0,value:m.Cell.fromHex(s)}}catch{return{success:!1,error:new _.TLBDataError("Bad BoC string")}}}}return Ke}var ht={},Zr;function ni(){if(Zr)return ht;Zr=1,Object.defineProperty(ht,"__esModule",{value:!0}),ht.MathExprEvaluator=void 0;let m=class Qt{variables;constructor(g=new Map){this.variables=g}static calculateBitsForLessThan(g){if(g<=0||g===1)return 0;const d=g-1;return d===0?0:Math.ceil(Math.log2(d+1))}static calculateBitsForLessThanOrEqual(g){return g<0||g===0?0:Math.ceil(Math.log2(g+1))}evaluate(g){if(g.kind==="TLBNumberExpr")return g.n;if(g.kind==="TLBVarExpr"){const d=this.variables.get(g.x);if(d===void 0)throw new Error(`Variable ${g.x} is not defined`);return d}if(g.kind==="TLBBinaryOp"){const d=this.evaluate(g.left),v=this.evaluate(g.right);switch(g.operation){case"+":return d+v;case"-":return d-v;case"*":return d*v;case"/":return Math.floor(d/v);case"%":return d%v;case"<<":return d<<v;case">>":return d>>v;case"&":return d&v;case"|":return d|v;case"^":return d^v;case"==":return d===v?1:0;case"!=":return d!==v?1:0;case"<":return d<v?1:0;case"<=":return d<=v?1:0;case">":return d>v?1:0;case">=":return d>=v?1:0;case"=":return d===v?1:0}}if(g.kind==="TLBUnaryOp"){const d=g.operation;switch(d){case".":{const v=g.value;if(v.kind==="TLBBinaryOp"&&v.operation==="-"){const h=this.evaluate(v.left),s=this.evaluate(v.right);return s===1?Qt.calculateBitsForLessThan(h):h-s}return v.kind==="TLBNumberExpr"?Qt.calculateBitsForLessThanOrEqual(v.n):this.evaluate(v)}case"-":return-this.evaluate(g.value);case"~":return this.evaluate(g.value);case"!":return this.evaluate(g.value)?0:1;default:throw new Error(`Unknown unary operation: ${d}`)}}throw new Error(`Unsupported expression type: ${typeof g}`)}};return ht.MathExprEvaluator=m,ht}var gt={},Jr;function cn(){if(Jr)return gt;Jr=1,Object.defineProperty(gt,"__esModule",{value:!0}),gt.error=m,gt.unwrap=_;function m(g){return g instanceof Error?g:new Error(String(g))}function _(g){if(g.success)return g.value;throw m(g.error)}return gt}var yt={},Qr;function un(){if(Qr)return yt;Qr=1,Object.defineProperty(yt,"__esModule",{value:!0}),yt.toUint8Array=m,yt.crc32=g;function m(d){const v=new Uint8Array(d.length);for(let h=0;h<d.length;h++)v[h]=d.charCodeAt(h)&255;return v}const _=-306674912;function g(d,v=4294967295){typeof d=="string"&&(d=m(d));let h=v;for(let s=0;s<d.length;s++)h^=d[s],h=h&1?h>>>1^_:h>>>1,h=h&1?h>>>1^_:h>>>1,h=h&1?h>>>1^_:h>>>1,h=h&1?h>>>1^_:h>>>1,h=h&1?h>>>1^_:h>>>1,h=h&1?h>>>1^_:h>>>1,h=h&1?h>>>1^_:h>>>1,h=h&1?h>>>1^_:h>>>1;return(h^-1)>>>0}return yt}var en;function pn(){return en||(en=1,(function(m){Object.defineProperty(m,"__esModule",{value:!0}),m.TLBRuntime=m.TLBDataError=m.TLBSchemaError=m.TLBRuntimeError=void 0,m.runtimeBySchema=z,m.runtimeBy=A;const _=er(),g=Kr(),d=tt(),v=Kr(),h=ri(),s=ni(),a=cn(),B=un(),c=Mt();Object.defineProperty(m,"TLBRuntimeError",{enumerable:!0,get:function(){return c.TLBRuntimeError}}),Object.defineProperty(m,"TLBSchemaError",{enumerable:!0,get:function(){return c.TLBSchemaError}}),Object.defineProperty(m,"TLBDataError",{enumerable:!0,get:function(){return c.TLBDataError}});function C(S){return`0b${BigInt(S.binary).toString(2).padStart(S.bitLen,"0")}`}function O(S,o){if(S.tp===v.TypeExprType.Param&&S.isNat&&S.isNatSubtype&&!S.negated)return{kind:"TLBNumberType",bits:{kind:"TLBNumberExpr",n:32},signed:!1};switch(S.tp){case v.TypeExprType.Apply:{if(!S.typeApplied)throw new Error("TypeExpr.Apply without typeApplied");const i=d.symbolMap.getName(S.typeApplied.typeNameId)||"?";if(i==="#")return{kind:"TLBNumberType",bits:{kind:"TLBNumberExpr",n:32},signed:!1};if(i==="##"){if(S.args.length===0)throw new Error("## type requires an argument");return{kind:"TLBNumberType",bits:ne(S.args[0],o),signed:!1}}if(i==="int"){if(S.args.length===0)throw new Error("int type requires an argument");return{kind:"TLBNumberType",bits:ne(S.args[0],o),signed:!0}}if(i==="uint"){if(S.args.length===0)throw new Error("uint type requires an argument");return{kind:"TLBNumberType",bits:ne(S.args[0],o),signed:!1}}if(i==="#<"){if(S.args.length===0)throw new Error("#< type requires an argument");return{kind:"TLBNumberType",bits:{kind:"TLBUnaryOp",operation:".",value:{kind:"TLBBinaryOp",operation:"-",left:ne(S.args[0],o),right:{kind:"TLBNumberExpr",n:1}}},signed:!1}}if(i==="#<="){if(S.args.length===0)throw new Error("#<= type requires an argument");return{kind:"TLBNumberType",bits:{kind:"TLBUnaryOp",operation:".",value:ne(S.args[0],o)},signed:!1}}if(i==="bits"){if(S.args.length===0)throw new Error("bits type requires an argument");return{kind:"TLBBitsType",bits:ne(S.args[0],o)}}if(i==="MsgAddress"||i==="MsgAddressInt"||i==="MsgAddressExt")return{kind:"TLBAddressType"};if(i==="Bool")return{kind:"TLBBoolType"};if(i==="Cell")return{kind:"TLBCellType"};const u=i.match(/^uint(\d+)$/);if(u)return{kind:"TLBNumberType",bits:{kind:"TLBNumberExpr",n:parseInt(u[1],10)},signed:!1};const f=i.match(/^int(\d+)$/);if(f)return{kind:"TLBNumberType",bits:{kind:"TLBNumberExpr",n:parseInt(f[1],10)},signed:!0};const p=i.match(/^bits(\d+)$/);if(p)return{kind:"TLBBitsType",bits:{kind:"TLBNumberExpr",n:parseInt(p[1],10)}};const w=S.args.map(I=>O(I,o));return{kind:"TLBNamedType",name:i,arguments:w}}case v.TypeExprType.IntConst:return{kind:"TLBNumberType",bits:{kind:"TLBNumberExpr",n:S.value},signed:!1};case v.TypeExprType.Add:{const i=S.args.length>=1?S.args[0]:null,u=S.args.length>=2?S.args[1]:null,f=S.value;let p,w;return i?p=ne(i,o):p={kind:"TLBNumberExpr",n:0},u?w=ne(u,o):f!==0?w={kind:"TLBNumberExpr",n:f}:w={kind:"TLBNumberExpr",n:0},{kind:"TLBExprMathType",initialExpr:{kind:"TLBBinaryOp",operation:"+",left:p,right:w}}}case v.TypeExprType.Param:{const i=o?.get(S.value)||`_${S.value+1}`;return S.isNat?{kind:"TLBNumberType",bits:{kind:"TLBVarExpr",x:i},signed:!1}:{kind:"TLBNamedType",name:i,arguments:[]}}case v.TypeExprType.Ref:{if(S.args.length>=1)return{kind:"TLBRefType",value:O(S.args[0],o)};throw new Error("TypeExpr.Ref without inner type")}default:{if(S.typeApplied)return{kind:"TLBNamedType",name:d.symbolMap.getName(S.typeApplied.typeNameId)||"?",arguments:[]};throw new Error(`Unsupported TypeExpr type: ${S.tp}`)}}}function ne(S,o){if(S.negated)return{kind:"TLBUnaryOp",operation:"~",value:ne(new v.TypeExpr(S.tp,S.typeApplied,S.args,S.value,S.isNat,S.isNatSubtype,!1,S.tchkOnly,S.isConstexpr),o)};switch(S.tp){case v.TypeExprType.IntConst:return{kind:"TLBNumberExpr",n:S.value};case v.TypeExprType.Param:return{kind:"TLBVarExpr",x:o?.get(S.value)||`_${S.value+1}`};case v.TypeExprType.Add:{const i=S.args.length>=1?ne(S.args[0],o):{kind:"TLBNumberExpr",n:0},u=S.args.length>=2?ne(S.args[1],o):S.value!==0?{kind:"TLBNumberExpr",n:S.value}:{kind:"TLBNumberExpr",n:0};return{kind:"TLBBinaryOp",operation:"+",left:i,right:u}}case v.TypeExprType.Apply:{if(S.typeApplied&&S.args.length===2){const i=d.symbolMap.getName(S.typeApplied.typeNameId)||"?",u=ne(S.args[0],o),f=ne(S.args[1],o);let p;switch(i){case"<=":p="<=";break;case"<":p="<";break;case"=":p="=";break;case">=":p=">=";break;case">":p=">";break;case"!=":p="!=";break;default:return{kind:"TLBNumberExpr",n:0}}return{kind:"TLBBinaryOp",operation:p,left:u,right:f}}return{kind:"TLBNumberExpr",n:0}}case v.TypeExprType.MulConst:{if(S.args.length>=2){const i=ne(S.args[0],o),u=ne(S.args[1],o);return{kind:"TLBBinaryOp",operation:"*",left:i,right:u}}else if(S.args.length===1){const i={kind:"TLBNumberExpr",n:S.value},u=ne(S.args[0],o);return{kind:"TLBBinaryOp",operation:"*",left:i,right:u}}return{kind:"TLBNumberExpr",n:0}}case v.TypeExprType.GetBit:return S.args.length>0?{kind:"TLBBinaryOp",operation:".",left:ne(S.args[0],o),right:{kind:"TLBNumberExpr",n:S.value}}:{kind:"TLBNumberExpr",n:0};default:return{kind:"TLBNumberExpr",n:0}}}function b(S,o){const i=new Map,u=o.split(";").filter(f=>f.trim());for(const f of S.userTypes){const p={name:f.name,constructors:[]};for(const w of f.constructors){const I=d.symbolMap.getName(w.constrName)||"_";let N="";for(const U of u){const D=U.trim();if(!D)continue;const K=D.lastIndexOf("=");if(K===-1||D.substring(K+1).trim().split(" ")[0]!==f.name)continue;const me=D.split(/\s|#|\$/)[0];if(me===I||I==="_"&&(me==="_"||me==="")){N=D+";";break}}let x,y;const L=I==="_"||I==="",q=/[#$]_/.test(N.split(/\s/)[0]);if(L||q)x=0,y=0;else if(w.tagBits===0){let U="";N?U=N.trim().replace(/;$/,"").replace(/\s+/g," "):U=w.declaration,x=(0,B.crc32)(U),y=32}else x=Number(w.tag),y=w.tagBits;let V=x.toString(16);const se=Math.ceil(y/4);V.length<se&&(V=V.padStart(se,"0"));const oe=`0x${V}`,ye=Array.from(N.matchAll(/\{(\w+):([#\w]+)\}/g)),T=[];for(const U of ye)T.push(U[1]);for(const U of w.fields)if(U.implicit&&!U.constraint&&U.name!==0){const D=d.symbolMap.getName(U.name);D&&!T.includes(D)&&T.push(D)}const P=[],k=new Map,re=[],j=new Map;for(let U=0;U<w.params.length;U++){const D=w.params[U],K=T[U]||(D.tp===v.TypeExprType.Param?`_${D.value+1}`:`param${U}`),de=w.paramNegated[U],me=w.paramConstVal[U]!==void 0,ie=w.paramConstVal[U],ge={variable:{name:K,type:D.isNat?"#":"Type",negated:de,isConst:me}};try{const Y=new Map;for(let R=0;R<w.params.length;R++){const H=w.params[R];if(H.tp===v.TypeExprType.Param){const Z=T[R]||`_${H.value+1}`;Y.set(H.value,Z)}}const M=ne(D,Y);ge.variable.deriveExpr=M,ge.paramExpr=M}catch{}ie!==void 0&&(ge.variable.constValue=ie),P.push(ge),k.set(K,ge);const _e={name:K,type:D.isNat?"#":"Type",negated:de};re.push(_e),j.set(K,_e)}const J=new Map;for(const U of w.fields)if(U.name!==0){const D=d.symbolMap.getName(U.name);if(D&&!j.has(D)){const K={name:D,type:"#",negated:!1,isField:!0};re.push(K),j.set(D,K)}}for(let U=0;U<w.params.length;U++){const D=w.params[U];if(D.tp===v.TypeExprType.Param){const K=T[U]||`_${D.value+1}`;J.set(D.value,K)}}const le=[],ve=[];for(const U of w.fields)if(U.constraint)try{const D=ne(U.type,J);ve.push(D)}catch{}else{const D=U.name===0?void 0:d.symbolMap.getName(U.name);try{const K=O(U.type,J);le.push({name:D,fieldType:K,subFields:[],implicit:U.implicit})}catch{}}const Ee=[];for(const U of w.params)try{Ee.push(ne(U,J))}catch{}const ce={name:I,tag:{bitLen:y,binary:oe},fields:le,constraints:ve,declaration:N,parameters:P,parametersMap:k,variables:re,variablesMap:j,tlbType:f.name,resultParameters:Ee};p.constructors.push(ce)}i.set(f.name,p)}return i}class F{schema;config;tagMap=new Map;maxSizeTag=0;types;lastTypeName;constructor(o,i={}){this.schema=o,this.config=i;const u=g.Schema.from(o);if(!u.success)throw u.error;this.types=b(u.value,o);const f=o.split("=");this.lastTypeName=f[f.length-1].split(";")[0].trim().split(" ")[0].trim(),i.autoText=i.autoText||!0;for(const p of this.types.values())for(const w of p.constructors)if(w.tag.bitLen>0){w.tag.bitLen>this.maxSizeTag&&(this.maxSizeTag=w.tag.bitLen);const I=C(w.tag);this.tagMap.set(I,{type:p,item:w})}}static from(o,i={}){try{return{success:!0,value:new F(o,i)}}catch(u){const f=u instanceof Error?u.message:"Failed to convert schema";return{success:!1,error:new c.TLBSchemaError(f,u)}}}changeSchema(o){return this.schema===o?{success:!0,value:this}:F.from(o,this.config)}decodeCell(o){return(0,a.unwrap)(this.deserialize(o))}encodeCell(o){return typeof o=="string"&&(o=JSON.parse(o)),(0,a.unwrap)(this.serialize(o)).endCell()}findByTag(o){const i=o.remainingBits,u=Math.min(this.maxSizeTag,i);for(let f=u;f>=1;f--){if(i<f)continue;const p=o.preloadUint(f),w=C({bitLen:f,binary:`0x${p.toString(16)}`}),I=this.tagMap.get(w);if(I)return I}return null}deserialize(o,i=!1){if(typeof o=="string"){const p=(0,h.toCell)(o);if(!p.success)return p;o=p.value}const u=o.asSlice();if(this.lastTypeName)try{const p=this.deserializeByTypeName(this.lastTypeName,u.clone());if(p.success)return p}catch(p){throw p instanceof Error?p:new c.TLBDataError("Failed to deserialize")}if(i){const p=this.findByTag(u);if(p)return this.deserializeConstructor(p.type,p.item,u)}const f=Array.from(this.types.keys());for(const p of f.slice().reverse()){if(p===this.lastTypeName)continue;const w=this.deserializeByTypeName(p,u.clone());if(w.success)return w}return{success:!1,error:new c.TLBDataError("No matching constructor")}}deserializeByTypeName(o,i){const u=this.types.get(o);return u?this.deserializeType(u,i):{success:!1,error:new c.TLBDataError(`Type ${o} not found in TL-B schema`)}}serialize(o){const i=o.kind;return i?this.serializeByTypeName(i,o):{success:!1,error:new c.TLBDataError("Data must by typed")}}serializeByTypeName(o,i){const u=o.indexOf("_"),f=u===-1?o:o.slice(0,u),p=this.types.get(f);if(!p)return{success:!1,error:new c.TLBDataError(`Type ${f} not found in TL-B schema`)};const w=(0,_.beginCell)();return this.serializeType(p,i,w),{success:!0,value:w}}deserializeType(o,i,u=[],f){if(o.constructors.length>1&&o.constructors.every(w=>w.tag.bitLen>0)){for(const w of o.constructors){const I=w.tag.bitLen;if(i.remainingBits>=I){const N=i.preloadUint(I),x=Number(BigInt(w.tag.binary));if(N===x){const y=this.deserializeConstructor(o,w,i,u,f);if(y.success)return y}}}return{success:!1,error:new c.TLBDataError(`Failed to deserialize type ${o.name}: no matching constructor tag found`)}}for(const p of o.constructors)try{const w=i.clone(),I=this.deserializeConstructor(o,p,w,u,f);if(I.success){const N=i.remainingBits-w.remainingBits,x=i.remainingRefs-w.remainingRefs;N>0&&i.skip(N);for(let y=0;y<x;y++)i.loadRef();return I}}catch{}return{success:!1,error:new c.TLBDataError(`Failed to deserialize type ${o.name} no matching constructor found`)}}deserializeConstructor(o,i,u,f=[],p){const w=o.constructors.length>1?`${o.name}_${i.name}`:o.name;let I=i.tag.bitLen,N=i.tag.binary;if(I===0&&i.declaration){const T=i.declaration.match(/^_#([0-9a-fA-F]+)/);if(T){const P=T[1];I=P.length*4,N="0x"+P}}if(I>0){const T=I;if(u.remainingBits<T)return{success:!1,error:new c.TLBDataError(`Not enough bits to read tag for ${w}`)};const P=u.loadUint(T),k=Number(BigInt(N));if(P!==k)return{success:!1,error:new c.TLBDataError(`Failed to deserialize type ${w}: tag mismatch (got ${P}, expected ${k})`)}}const x=new Map(p);for(const T of i.variables)x.has(T.name)||i.parameters.some(k=>k.variable?.name===T.name&&k.variable.type==="#")||x.set(T.name,void 0);for(let T=0;T<i.variables.length;T++){const P=i.variables[T],k=x.get(P.name);k!==void 0&&x.set(`_${T+1}`,k)}if(f.length>0&&i.parameters.length>0){const T=new s.MathExprEvaluator(x);for(let P=0;P<Math.min(f.length,i.parameters.length);P++){const k=i.parameters[P],re=f[P];let j;try{if(re.kind==="TLBExprMathType")j=T.evaluate(re.initialExpr);else if(re.kind==="TLBNumberType")j=T.evaluate(re.bits);else if(re.kind==="TLBNamedType"&&re.name){const J=x.get(re.name);typeof J=="number"&&(j=J)}}catch{}k.argName&&typeof j=="number"&&x.set(k.argName,j);try{if(k.variable?.name&&typeof j=="number"){const J=k.variable.name;let le=!1;if(k.paramExpr){const ve=k.paramExpr;let Ee;for(let ce=0;ce<=1024;ce++){const U=new Map(x);U.set(J,ce);const D=i.variables.findIndex(de=>de.name===J);if(D>=0&&U.set(`_${D+1}`,ce),new s.MathExprEvaluator(U).evaluate(ve)===j){Ee=ce;break}}typeof Ee=="number"&&(x.set(J,Ee),le=!0)}if(!le&&k.variable.deriveExpr&&x.get(J)===void 0){let ve;for(let Ee=0;Ee<=1024;Ee++){const ce=new Map(x);if(ce.set(J,Ee),new s.MathExprEvaluator(ce).evaluate(k.variable.deriveExpr)===j){ve=Ee;break}}typeof ve=="number"&&(x.set(J,ve),le=!0)}!le&&!k.variable.negated&&x.set(J,j)}}catch{}}}if(i.parameters.length>0)for(let T=0;T<i.parameters.length;T++){const P=i.parameters[T],k=P.variable?.name;if(k&&P.variable.type==="#"&&!P.variable.negated&&!P.variable.isConst&&x.get(k)===void 0){if(i.fields.some(J=>J.implicit&&J.name===k))continue;let j=!0;if(T<f.length){const J=f[T];if(J.kind==="TLBNamedType"&&J.name){const le=x.get(J.name);typeof le=="number"&&x.set(k,le),j=!1}else j=!1}if(j&&u.remainingBits>=32)try{const J=Number(u.loadUint(32));x.set(k,J)}catch{}}}if(i.fields.length===0&&i.parameters.length===1&&i.parameters[0].variable.type==="#"&&x.get(i.parameters[0].variable.name)===void 0&&u.remainingBits>=32)try{const T=Number(u.loadUint(32));x.set(i.parameters[0].variable.name,T)}catch{}if(f.length>0&&i.parameters.length===0&&i.variables.length>0){const T=new s.MathExprEvaluator(x),P=i.variables.filter(k=>k.type==="#");for(let k=0;k<Math.min(f.length,P.length);k++){const re=P[k],j=f[k];try{let J;j.kind==="TLBExprMathType"?J=T.evaluate(j.initialExpr):j.kind==="TLBNumberType"&&(J=T.evaluate(j.bits)),typeof J=="number"&&x.set(re.name,J)}catch{}}}let y={kind:w};if(i.fields.length===0&&i.declaration){let T=0;const P=Array.from(i.declaration.matchAll(/\(##\s*(\w+)\)/g));for(const Y of P){const M=Y.index,H=i.declaration.substring(0,M).trim();if(H.endsWith(":")||/:\s*$/.test(H))continue;const Z=Y[1],X=`anon${T++}`;let ee;if(/^\d+$/.test(Z))ee=parseInt(Z,10);else{const xe=x.get(Z);if(xe===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${Z} not found for anonymous field`)};ee=xe}if(u.remainingBits>=ee){const xe=Number(u.loadUint(ee));y[X]=xe,x.set(X,xe)}else return{success:!1,error:new c.TLBDataError(`Not enough bits to read anonymous field (need ${ee} bits)`)}}const k=i.declaration.matchAll(/(\w+):#/g);for(const Y of k){const M=Y[1];if(u.remainingBits>=32){const R=Number(u.loadUint(32));y[M]=R,x.set(M,R)}}const re=i.declaration.matchAll(/(\w+):\(##\s*(\w+)\)/g);for(const Y of re){const M=Y[1],R=Y[2];let H;if(/^\d+$/.test(R))H=parseInt(R,10);else{let Z=x.get(R);if(Z===void 0)if(i.parameters.find(ee=>ee.variable?.name===R&&ee.variable.type==="#")&&u.remainingBits>0)Z=u.remainingBits,x.set(R,Z);else return{success:!1,error:new c.TLBDataError(`Variable ${R} not found for field ${M}`)};H=Z}if(u.remainingBits>=H){const Z=Number(u.loadUint(H));y[M]=Z,x.set(M,Z)}else return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need ${H} bits)`)}}const j=i.declaration.matchAll(/(\w+):\((#<|#<=)\s+(\w+)\)/g);for(const Y of j){const M=Y[1],R=Y[2],H=Y[3];let Z;if(/^\d+$/.test(H))Z=parseInt(H,10);else{const ee=x.get(H);if(ee===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${H} not found for field ${M}`)};Z=ee}let X;if(R==="#<"?X=s.MathExprEvaluator.calculateBitsForLessThan(Z):X=s.MathExprEvaluator.calculateBitsForLessThanOrEqual(Z),u.remainingBits>=X){const ee=Number(u.loadUint(X));y[M]=ee,x.set(M,ee)}else return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need ${X} bits)`)}}const J=i.declaration.matchAll(/(\w+):int(\d+)/g);for(const Y of J){const M=Y[1],R=parseInt(Y[2],10);if(u.remainingBits>=R){const H=this.loadBigInt(u,R,!0);R>32?y[M]=H:y[M]=Number(H),R<=53&&x.set(M,Number(H))}else return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need ${R} bits)`)}}const le=i.declaration.matchAll(/(\w+):uint(\d+)/g);for(const Y of le){const M=Y[1],R=parseInt(Y[2],10);if(u.remainingBits>=R){const H=this.loadBigInt(u,R,!1);R>32?y[M]=H:y[M]=Number(H),x.set(M,Number(H))}else return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need ${R} bits)`)}}const ve=i.declaration.matchAll(/(\w+):\(int\s+([^)]+)\)/g);for(const Y of ve){const M=Y[1],R=Y[2].trim();let H;if(/^\d+$/.test(R))H=parseInt(R,10);else try{if(R.includes("+")||R.includes("-")||R.includes("*")||R.includes("/")){const Z=R.split(/([+\-*/])/);let X=0,ee="+";for(const xe of Z){const pe=xe.trim();if(pe==="+"||pe==="-"||pe==="*"||pe==="/")ee=pe;else if(/^\d+$/.test(pe)){const he=parseInt(pe,10);ee==="+"?X+=he:ee==="-"?X-=he:ee==="*"?X*=he:ee==="/"&&(X=Math.floor(X/he))}else{const he=x.get(pe);if(he===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${pe} not found for field ${M}`)};ee==="+"?X+=he:ee==="-"?X-=he:ee==="*"?X*=he:ee==="/"&&(X=Math.floor(X/he))}}H=X}else{const Z=x.get(R);if(Z===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${R} not found for field ${M}`)};H=Z}}catch{return{success:!1,error:new c.TLBDataError(`Failed to evaluate bits expression for field ${M}: ${R}`)}}if(u.remainingBits>=H){const Z=this.loadBigInt(u,H,!0);H>32?y[M]=Z:y[M]=Number(Z),x.set(M,Number(Z))}else return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need ${H} bits)`)}}const Ee=i.declaration.matchAll(/(\w+):\(uint\s+([^)]+)\)/g);for(const Y of Ee){const M=Y[1],R=Y[2].trim();let H;if(/^\d+$/.test(R))H=parseInt(R,10);else try{if(R.includes("+")||R.includes("-")||R.includes("*")||R.includes("/")){const Z=R.split(/([+\-*/])/);let X=0,ee="+";for(const xe of Z){const pe=xe.trim();if(pe==="+"||pe==="-"||pe==="*"||pe==="/")ee=pe;else if(/^\d+$/.test(pe)){const he=parseInt(pe,10);ee==="+"?X+=he:ee==="-"?X-=he:ee==="*"?X*=he:ee==="/"&&(X=Math.floor(X/he))}else{const he=x.get(pe);if(he===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${pe} not found for field ${M}`)};ee==="+"?X+=he:ee==="-"?X-=he:ee==="*"?X*=he:ee==="/"&&(X=Math.floor(X/he))}}H=X}else{const Z=x.get(R);if(Z===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${R} not found for field ${M}`)};H=Z}}catch{return{success:!1,error:new c.TLBDataError(`Failed to evaluate bits expression for field ${M}: ${R}`)}}if(u.remainingBits>=H){const Z=this.loadBigInt(u,H,!1);H>32?y[M]=Z:y[M]=Number(Z),x.set(M,Number(Z))}else return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need ${H} bits)`)}}const ce=i.declaration.matchAll(/(\w+):bits(\d+)/g);for(const Y of ce){const M=Y[1],R=parseInt(Y[2],10);if(u.remainingBits>=R){const H=u.loadBits(R);this.config.autoText&&R%8===0?y[M]=(0,h.bitsToString)(H):R===1?y[M]=H.at(0):y[M]=(0,h.normalizeBitString)(H)}else return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need ${R} bits)`)}}const U=i.declaration.matchAll(/(\w+):\(bits\s+([^)]+)\)/g);for(const Y of U){const M=Y[1],R=Y[2].trim();let H;if(/^\d+$/.test(R))H=parseInt(R,10);else try{if(R.includes("+")||R.includes("-")||R.includes("*")||R.includes("/")){const Z=R.split(/([+\-*/])/);let X=0,ee="+";for(const xe of Z){const pe=xe.trim();if(pe==="+"||pe==="-"||pe==="*"||pe==="/")ee=pe;else if(/^\d+$/.test(pe)){const he=parseInt(pe,10);ee==="+"?X+=he:ee==="-"?X-=he:ee==="*"?X*=he:ee==="/"&&(X=Math.floor(X/he))}else{const he=x.get(pe);if(he===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${pe} not found for field ${M}`)};ee==="+"?X+=he:ee==="-"?X-=he:ee==="*"?X*=he:ee==="/"&&(X=Math.floor(X/he))}}H=X}else{const Z=x.get(R);if(Z===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${R} not found for field ${M}`)};H=Z}}catch{return{success:!1,error:new c.TLBDataError(`Failed to evaluate bits expression for field ${M}: ${R}`)}}if(u.remainingBits>=H){const Z=u.loadBits(H);this.config.autoText&&H%8===0?y[M]=(0,h.bitsToString)(Z):H===1?y[M]=Z.at(0):y[M]=(0,h.normalizeBitString)(Z)}else return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need ${H} bits)`)}}const D=i.declaration.matchAll(/(\w+):\((uint|int)\s+\(([^)]+)\)\)/g);for(const Y of D){const M=Y[1],R=Y[2],H=Y[3].trim();let Z;if(/^\d+$/.test(H))Z=parseInt(H,10);else try{if(H.includes("+")||H.includes("-")||H.includes("*")||H.includes("/")){const X=H.split(/([+\-*/])/);let ee=0,xe="+";for(const pe of X){const he=pe.trim();if(he==="+"||he==="-"||he==="*"||he==="/")xe=he;else if(/^\d+$/.test(he)){const Se=parseInt(he,10);xe==="+"?ee+=Se:xe==="-"?ee-=Se:xe==="*"?ee*=Se:xe==="/"&&(ee=Math.floor(ee/Se))}else{const Se=x.get(he);if(Se===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${he} not found for field ${M}`)};xe==="+"?ee+=Se:xe==="-"?ee-=Se:xe==="*"?ee*=Se:xe==="/"&&(ee=Math.floor(ee/Se))}}Z=ee}else{const X=x.get(H);if(X===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${H} not found for field ${M}`)};Z=X}}catch{return{success:!1,error:new c.TLBDataError(`Failed to evaluate bits expression for field ${M}: ${H}`)}}if(u.remainingBits>=Z){const X=this.loadBigInt(u,Z,R==="int");if(Z>32)y[M]=X,Z<=53&&x.set(M,Number(X));else{const xe=Number(X);y[M]=xe,x.set(M,xe)}}else return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need ${Z} bits)`)}}const K=[],de=/(\w+):\((\w+)/g;let me;for(;(me=de.exec(i.declaration))!==null;){const Y=me[1],M=me[2],R=me.index+me[0].length;if(M==="##"||M==="#<"||M==="#<="||M==="bits")continue;let H=1,Z=R;for(;Z<i.declaration.length&&H>0;Z++)i.declaration[Z]==="("?H++:i.declaration[Z]===")"&&H--;if(H===0){const X=i.declaration.substring(R,Z-1).trim();K.push({fieldName:Y,typeName:M,argsStr:X,index:me.index})}}for(const Y of K){const M=Y.fieldName,R=Y.typeName,H=Y.argsStr;if(!this.types.get(R))return{success:!1,error:new c.TLBDataError(`Type ${R} not found for field ${M}`)};const X=[];if(H.trim()){let pe=H.trim();for(;pe.length>0&&(pe=pe.trim(),!!pe);){if(pe.startsWith("(")){let Fe=0,ze=0;for(;ze<pe.length;ze++)if(pe[ze]==="(")Fe++;else if(pe[ze]===")"&&(Fe--,Fe===0))break;if(Fe!==0){const ke=pe.indexOf(" "),rt=ke>=0?pe.substring(0,ke):pe;X.push({kind:"TLBNamedType",name:rt,arguments:[]}),pe=ke>=0?pe.substring(ke+1):"";continue}const Ze=pe.substring(1,ze);pe=pe.substring(ze+1).trim();const Je=Ze.match(/^([a-z_][a-zA-Z0-9_]*|\d+)\s*([+\-*/])\s*([a-z_][a-zA-Z0-9_]*|\d+)$/);if(Je){const ke=Je[1],rt=Je[2],Ue=Je[3],xt=/^\d+$/.test(ke)?{kind:"TLBNumberExpr",n:parseInt(ke,10)}:{kind:"TLBVarExpr",x:ke},$t=/^\d+$/.test(Ue)?{kind:"TLBNumberExpr",n:parseInt(Ue,10)}:{kind:"TLBVarExpr",x:Ue};X.push({kind:"TLBExprMathType",initialExpr:{kind:"TLBBinaryOp",operation:rt,left:xt,right:$t}})}else if(/^\d+$/.test(Ze)){const ke=parseInt(Ze,10);X.push({kind:"TLBNumberType",bits:{kind:"TLBNumberExpr",n:ke},signed:!1})}else X.push({kind:"TLBNamedType",name:Ze,arguments:[]});continue}const he=pe.indexOf(" "),Se=he>=0?pe.substring(0,he):pe;if(pe=he>=0?pe.substring(he+1):"",Se.startsWith("^")){const Fe=Se.substring(1);X.push({kind:"TLBRefType",value:{kind:"TLBNamedType",name:Fe,arguments:[]}})}else if(/^\d+$/.test(Se)){const Fe=parseInt(Se,10);X.push({kind:"TLBNumberType",bits:{kind:"TLBNumberExpr",n:Fe},signed:!1})}else/^[a-z_][a-zA-Z0-9_]*$/.test(Se)?x.has(Se)?X.push({kind:"TLBNamedType",name:Se,arguments:[]}):X.push({kind:"TLBNamedType",name:Se,arguments:[]}):X.push({kind:"TLBNamedType",name:Se,arguments:[]})}}const ee={kind:"TLBNamedType",name:R,arguments:X},xe=this.deserializeFieldType(ee,u,x,i,X);y[M]=xe,typeof xe=="number"&&x.set(M,xe)}let ie=i.declaration;for(;ie.length>0;){const Y=ie.match(/(\w+):\^\[/);if(!Y)break;const M=Y[1],R=Y.index;let H=0,Z=R+Y[0].length,X=!1;for(;Z<ie.length;Z++)if(ie[Z]==="[")H++;else if(ie[Z]==="]"){if(H===0){X=!0;break}H--}if(!X)break;const ee=ie.substring(R+Y[0].length,Z);if(u.remainingRefs===0)return{success:!1,error:new c.TLBDataError(`No more references available for field ${M}`)};const pe=u.loadRef().beginParse(!0),he=this.deserializeInlineCell(ee,pe,x);if(he.success)y[M]=he.value;else return he;ie=ie.substring(Z+1)}const ge=i.declaration.matchAll(/(\w+):\^(\w+)/g);for(const Y of ge){const M=Y[1],R=Y[2];if(u.remainingRefs===0)return{success:!1,error:new c.TLBDataError(`No more references available for field ${M}`)};const H=u.loadRef();if(R==="Cell")y[M]=H;else{const Z=this.types.get(R);if(Z){const X=H.beginParse(!0),ee=this.deserializeType(Z,X,[],x);if(ee.success)y[M]=ee.value;else return ee}else return{success:!1,error:new c.TLBDataError(`Type ${R} not found for field ${M}`)}}}const _e=i.declaration.matchAll(/(\w+):([A-Z][a-zA-Z0-9_]*)/g);for(const Y of _e){const M=Y[1],R=Y[2],H=i.declaration.substring(0,Y.index);if(H.endsWith("(")||H.endsWith("^"))continue;if(R==="Bool"){if(u.remainingBits>=1){const X=u.loadBit();y[M]=X===!0}else return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need 1 bit for Bool)`)};continue}if(R==="MsgAddress"||R==="MsgAddressInt"||R==="MsgAddressExt"){if(u.remainingBits<2)return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need at least 2 bits for MsgAddress)`)};const X=u.preloadUint(2);if(X===0)u.loadUint(2),y[M]=null;else if(X===1){if(u.loadUint(2),u.remainingBits<9)return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need at least 9 bits for len)`)};const ee=u.loadUint(9);if(u.remainingBits<ee)return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${M} (need ${ee} bits for external_address)`)};const xe=u.loadUintBig(ee);y[M]=new _.ExternalAddress(xe,ee)}else y[M]=u.loadAddress();continue}const Z=this.types.get(R);if(Z){const X=this.deserializeType(Z,u,[],x);if(X.success)y[M]=X.value;else return X}}}let L=0;for(const T of i.fields){const P=T.name||`anon${L++}`;if(!T.implicit){if(T.subFields.length>0){if(u.remainingRefs===0)return{success:!1,error:new c.TLBDataError(`No more references available for field ${P}`)};const k=u.loadRef();if(T.subFields.length===1){const re=T.subFields[0];if(re.fieldType.kind==="TLBCellType")y[P]=k;else if(re.fieldType.kind==="TLBNamedType"){const j=k.beginParse(!0),J=this.types.get(re.fieldType.name);if(J){let le;if(J.constructors.length>0){const Ee=J.constructors[0],ce=new s.MathExprEvaluator(x),U=re.fieldType.arguments??[],D=new Map(x);if(Ee.parameters.length>0){for(let K=0;K<Math.min(U.length,Ee.parameters.length);K++){const de=Ee.parameters[K],me=U[K];try{let ie;me.kind==="TLBExprMathType"?ie=ce.evaluate(me.initialExpr):me.kind==="TLBNumberType"&&(ie=ce.evaluate(me.bits)),typeof ie=="number"&&de.variable.type==="#"&&!de.variable.negated&&D.set(de.variable.name,ie)}catch{}}le=D}}const ve=this.deserializeType(J,j,re.fieldType.arguments,le);if(ve.success)y[P]=ve.value;else return ve}else return{success:!1,error:new c.TLBDataError(`Type ${re.fieldType.name} not found`)}}else{const j=k.beginParse(!0);y[P]=this.deserializeField(re,j,x,i,f)}}else{const re=k.beginParse(!0),j={};for(const J of T.subFields){const le=J.name||`anon${L++}`;j[le]=this.deserializeField(J,re,x,i,f)}y[P]=j}}else if(y[P]=this.deserializeField(T,u,x,i,f),T.fieldType.kind==="TLBNamedType"&&typeof y[P]=="object"&&y[P]!==null)for(let k=0;k<T.fieldType.arguments.length;k++){const re=T.fieldType.arguments[k],j=T.fieldType.name;let J;if(j==="Unary"?J=y[P].n:J=y[P][`res${k}`],typeof J=="number"){let le;if(re.kind==="TLBExprMathType"?le=re.initialExpr:re.kind==="TLBNumberType"&&(le=re.bits),le){let ve;le.kind==="TLBVarExpr"?ve=le.x:le.kind==="TLBUnaryOp"&&le.operation==="~"&&le.value.kind==="TLBVarExpr"&&(ve=le.value.x),ve&&x.get(ve)===void 0&&x.set(ve,J)}}}}}if(i.parameters.length>0)for(const T of i.parameters)try{if(T.variable?.name&&T.variable.deriveExpr&&x.get(T.variable.name)===void 0){const P=new s.MathExprEvaluator(x).evaluate(T.variable.deriveExpr);x.set(T.variable.name,P)}}catch{}if(i.variables.length>0){for(const T of i.variables)if(T.type==="#"&&!T.negated&&!T.isConst&&x.get(T.name)===void 0){if(p&&p.has(T.name)){const k=p.get(T.name);if(typeof k=="number"){x.set(T.name,k);continue}}const P=y[T.name];if(typeof P=="number"){x.set(T.name,P);continue}}}for(let T=0;T<i.variables.length;T++){const P=i.variables[T];let k=x.get(P.name);k===void 0&&(k=x.get(`_${T+1}`),k!==void 0&&x.set(P.name,k)),k!==void 0&&x.set(`_${T+1}`,k)}const q=new s.MathExprEvaluator(x),V=new Map;for(const T of i.constraints)try{let P;try{if(P=q.evaluate(T),P===1)continue}catch(k){if(T.kind==="TLBBinaryOp"&&T.operation==="="){const j=this.solveEquality(T,x,q);if(j){x.set(j.name,j.value),V.set(j.name,j.value);continue}}const re=k instanceof Error?k.message:String(k);if(re.includes("not defined"))continue;throw new c.TLBDataError(`Constraint evaluation failed for ${o.name}: ${re}`)}if(P!==1&&T.kind==="TLBBinaryOp"&&T.operation==="="){const k=this.solveEquality(T,x,q);if(k){x.set(k.name,k.value),V.set(k.name,k.value);continue}}if(P!==1)return{success:!1,error:new c.TLBDataError(`Failed to deserialize type ${w} due to constraint violation`)}}catch(P){return{success:!1,error:new c.TLBDataError(`Failed to evaluate constraint for type ${w}: ${P instanceof Error?P.message:String(P)}`)}}const se={kind:w},oe=new Set(["kind"]);let ye=0;for(const T of i.fields){if(T.implicit)continue;const P=T.name||`anon${ye++}`,k=y[P];k!==void 0&&(se[P]=k,oe.add(P))}for(const[T,P]of V){if(T.startsWith("_res"))continue;let k=T;if(T.startsWith("_")){const re=parseInt(T.substring(1),10);!isNaN(re)&&re>=1&&re<=i.variables.length&&(k=i.variables[re-1].name)}oe.has(k)||(se[k]=P,oe.add(k))}for(const T of i.variables)if(!oe.has(T.name)){let P=y[T.name];P===void 0&&(P=x.get(T.name)),P===void 0&&o.name==="Unary"&&T.name==="n"&&(P=x.get("_1")??x.get("param0")),P!==void 0&&(se[T.name]=P,oe.add(T.name))}for(const T of Object.keys(y))oe.has(T)||(se[T]=y[T]);if(i.resultParameters&&i.resultParameters.length>0)for(let T=0;T<i.resultParameters.length;T++)try{const P=i.resultParameters[T];let k;if(P.kind==="TLBVarExpr"){k=P.x;const j=x.get(k);if(typeof j=="number"){o.name==="Unary"?(se.n=j,oe.add("n")):i.parameters.some(J=>J.variable?.name===k)&&(oe.has(k)||(se[k]=j,oe.add(k)));continue}}const re=q.evaluate(P);if(o.name==="Unary")se.n=re,oe.add("n");else if(k&&i.parameters.some(j=>j.variable?.name===k))oe.has(k)||(se[k]=re,oe.add(k));else{const j=`_res${T}`;oe.has(j)||(se[j]=re,oe.add(j))}}catch{}if(o.name==="Unary"&&se.n===void 0){const T=x.get("n")??x.get("_1");T!==void 0&&(se.n=T,oe.add("n"))}return w==="ExprType"&&typeof se.x=="number"&&(se.x=BigInt(se.x)),{success:!0,value:se}}serializeInlineCell(o,i,u,f){let p=o.trim();for(;p.length>0;){const w=p.match(/^(\w+):\^\[/);if(w){const y=w[1];let L=0,q=w[0].length,V=!1;for(;q<p.length;q++)if(p[q]==="[")L++;else if(p[q]==="]"){if(L===0){V=!0;break}L--}if(!V)return{success:!1,error:new c.TLBDataError(`Unmatched brackets in inline cell reference for field ${y}`)};const se=p.substring(w[0].length,q),oe=i[y];if(oe!==void 0){const ye=(0,_.beginCell)(),T=this.serializeInlineCell(se,oe,ye,f);if(!T.success)return T;u.storeRef(ye.endCell())}p=p.substring(q+1).trim();continue}const I=p.match(/^(\w+):#/);if(I){const y=I[1],L=i[y];L!==void 0&&(u.storeUint(L,32),f.set(y,Number(L))),p=p.substring(I[0].length).trim();continue}const N=p.match(/^(\w+):\(##\s*(\w+)\)/);if(N){const y=N[1],L=N[2],q=i[y];if(q!==void 0){let V;if(/^\d+$/.test(L))V=parseInt(L,10);else{const se=f.get(L);if(se===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${L} not found for field ${y}`)};V=se}u.storeUint(q,V),f.set(y,Number(q))}p=p.substring(N[0].length).trim();continue}const x=p.trim();if(x===p)break;p=x}return{success:!0,value:void 0}}deserializeInlineCell(o,i,u){const f={};let p=o.trim();for(;p.length>0;){const w=p.match(/^(\w+):\^\[/);if(w){const y=w[1];let L=0,q=w[0].length,V=!1;for(;q<p.length;q++)if(p[q]==="[")L++;else if(p[q]==="]"){if(L===0){V=!0;break}L--}if(!V)return{success:!1,error:new c.TLBDataError(`Unmatched brackets in inline cell reference for field ${y}`)};const se=p.substring(w[0].length,q);if(i.remainingRefs===0)return{success:!1,error:new c.TLBDataError(`No more references available for inline cell field ${y}`)};const ye=i.loadRef().beginParse(!0),T=this.deserializeInlineCell(se,ye,u);if(T.success)f[y]=T.value;else return T;p=p.substring(q+1).trim();continue}const I=p.match(/^(\w+):#/);if(I){const y=I[1];if(i.remainingBits<32)return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${y}`)};f[y]=Number(i.loadUint(32)),u.set(y,f[y]),p=p.substring(I[0].length).trim();continue}const N=p.match(/^(\w+):\(##\s*(\w+)\)/);if(N){const y=N[1],L=N[2];let q;if(/^\d+$/.test(L))q=parseInt(L,10);else{const V=u.get(L);if(V===void 0)return{success:!1,error:new c.TLBDataError(`Variable ${L} not found for field ${y}`)};q=V}if(i.remainingBits<q)return{success:!1,error:new c.TLBDataError(`Not enough bits to read field ${y} (need ${q} bits)`)};f[y]=Number(i.loadUint(q)),u.set(y,f[y]),p=p.substring(N[0].length).trim();continue}const x=p.trim();if(x===p)break;p=x}return{success:!0,value:f}}deserializeField(o,i,u,f,p){const w=this.deserializeFieldType(o.fieldType,i,u,f,p);if(o.name&&(o.fieldType.kind==="TLBNumberType"||o.fieldType.kind==="TLBVarIntegerType"||o.fieldType.kind==="TLBBoolType")){const I=Number(w);u.set(o.name,I);const N=f.variables.findIndex(x=>x.name===o.name);N!==-1&&u.set(`_${N+1}`,I)}if(w&&typeof w=="object"){for(const I of f.parameters)if(I.variable?.type==="#"&&!I.variable.negated&&u.get(I.variable.name)===void 0){const N=this.extractNumericProperty(w,I.variable.name);if(typeof N=="number"){const x=N;u.set(I.variable.name,x);const y=f.variables.findIndex(L=>L.name===I.variable.name);y!==-1&&u.set(`_${y+1}`,x)}}}return w}extractNumericProperty(o,i){if(!(!o||typeof o!="object")){if(typeof o[i]=="number")return o[i];for(const u of Object.keys(o)){const f=o[u];if(f&&typeof f=="object"){const p=this.extractNumericProperty(f,i);if(typeof p=="number")return p}}}}deserializeFieldType(o,i,u,f,p){const w=new s.MathExprEvaluator(u);switch(o.kind){case"TLBNumberType":{let I;try{I=w.evaluate(o.bits)}catch(L){if(o.bits.kind==="TLBVarExpr"){const q=o.bits.x,V=u.get(q);if(typeof V=="number")I=V;else if(f?.parameters.find(oe=>oe.variable?.name===q&&oe.variable.type==="#")&&i.remainingBits>0){const oe=i.remainingBits;u.set(q,oe),I=oe}else{let oe=!1;if(f?.parameters?.length&&p?.length){for(let ye=0;ye<Math.min(f.parameters.length,p.length);ye++){const T=f.parameters[ye],P=p[ye];if(T.variable?.type==="#")try{let k;P.kind==="TLBExprMathType"?k=new s.MathExprEvaluator(u).evaluate(P.initialExpr):P.kind==="TLBNumberType"&&(k=new s.MathExprEvaluator(u).evaluate(P.bits)),typeof k=="number"&&(u.set(T.variable.name,k),oe=!0)}catch{}}if(oe)I=new s.MathExprEvaluator(u).evaluate(o.bits);else throw L}else throw L}}else{let q=!1;if(f?.parameters?.length&&p?.length){for(let V=0;V<Math.min(f.parameters.length,p.length);V++){const se=f.parameters[V],oe=p[V];if(se.variable?.type==="#")try{let ye;oe.kind==="TLBExprMathType"?ye=new s.MathExprEvaluator(u).evaluate(oe.initialExpr):oe.kind==="TLBNumberType"&&(ye=new s.MathExprEvaluator(u).evaluate(oe.bits)),typeof ye=="number"&&(u.set(se.variable.name,ye),q=!0)}catch{}}if(q)I=new s.MathExprEvaluator(u).evaluate(o.bits);else throw L}else throw L}}const N=this.loadBigInt(i,I,o.signed),x=o.maxBits,y=x!==void 0?x<=32:!1;return!y&&I>32?N:y||I<=32?Number(N):N}case"TLBBoolType":return o.value!==void 0?o.value:i.loadBit();case"TLBBitsType":{const I=w.evaluate(o.bits),N=i.loadBits(I);return this.config.autoText&&I%8===0?(0,h.bitsToString)(N):I===1?N.at(0):(0,h.normalizeBitString)(N)}case"TLBNamedType":{const I=f.parametersMap.get(o.name);if(I&&I.variable.type==="Type"){const T=f.parameters.findIndex(P=>P.variable.name===I.variable.name);if(T>=0&&p[T])return this.deserializeFieldType(p[T],i,u,f,p)}if(o.name==="Bool")return i.loadBit()===!0;if(o.name==="MsgAddress"||o.name==="MsgAddressInt"||o.name==="MsgAddressExt"){if(i.remainingBits<2)return null;const T=i.preloadUint(2);if(T===0)return i.loadUint(2),null;if(T===1){i.loadUint(2);const P=i.loadUint(9),k=i.loadUintBig(P);return new _.ExternalAddress(k,P)}else return i.loadAddress()}if(o.name==="Any"){const T=(0,_.beginCell)(),P=i.remainingBits;for(P>0&&T.storeBits(i.loadBits(P));i.remainingRefs>0;)T.storeRef(i.loadRef());return T.endCell()}if(o.name==="HashmapE"){const T=o.arguments??[];if(T.length<2)throw new c.TLBDataError("HashmapE requires two arguments: key size (n) and value type (X)");const P=T[0];let k;if(P.kind==="TLBExprMathType")k=w.evaluate(P.initialExpr);else if(P.kind==="TLBNumberType")k=w.evaluate(P.bits);else if(P.kind==="TLBNamedType"&&P.name){const J=u.get(P.name);if(J===void 0)throw new c.TLBDataError(`Variable ${P.name} not found for HashmapE key size argument`);k=J}else throw new c.TLBDataError("HashmapE first argument must be a numeric expression or parameter reference");const re=T[1];if(i.loadBit()===!1)return k>32?_.Dictionary.empty(_.Dictionary.Keys.BigUint(k)):_.Dictionary.empty(_.Dictionary.Keys.Uint(k));{if(i.remainingRefs===0)throw new c.TLBDataError("HashmapE hme_root requires a reference");const le=i.loadRef().beginParse(!0),ve=Ee=>{if(re.kind==="TLBRefType"){if(Ee.remainingRefs===0)throw new c.TLBDataError("HashmapE value requires a reference for TLBRefType");const U=Ee.loadRef().beginParse(!0);return this.deserializeFieldType(re.value,U,new Map(u),f,p)}else return this.deserializeFieldType(re,Ee,new Map(u),f,p)};if(k>32){const Ee=le.loadDictDirect(_.Dictionary.Keys.BigUint(k),{serialize:()=>{},parse:ve});return Ee.size===0?_.Dictionary.empty(_.Dictionary.Keys.BigUint(k)):Ee}else{const Ee=le.loadDictDirect(_.Dictionary.Keys.Uint(k),{serialize:()=>{},parse:ve});return Ee.size===0?_.Dictionary.empty(_.Dictionary.Keys.Uint(k)):Ee}}}if(o.name==="#<"||o.name==="#<="){const T=o.arguments??[];if(T.length===0)throw new c.TLBDataError(`${o.name} requires an argument`);const P=T[0];let k;if(P.kind==="TLBExprMathType")k=w.evaluate(P.initialExpr);else if(P.kind==="TLBNumberType")k=w.evaluate(P.bits);else if(P.kind==="TLBNamedType"&&P.name){const j=u.get(P.name);if(j===void 0)throw new c.TLBDataError(`Variable ${P.name} not found for ${o.name} argument`);k=j}else throw new c.TLBDataError(`Invalid argument type for ${o.name}`);let re;if(o.name==="#<"?re=s.MathExprEvaluator.calculateBitsForLessThan(k):re=s.MathExprEvaluator.calculateBitsForLessThanOrEqual(k),i.remainingBits<re)throw new c.TLBDataError(`Not enough bits to read ${o.name} (need ${re} bits)`);return Number(i.loadUint(re))}const N=o.name.match(/^uint(\d+)$/);if(N){const T=parseInt(N[1],10);if(i.remainingBits<T)throw new c.TLBDataError(`Not enough bits to read uint${T} (need ${T} bits)`);return Number(i.loadUint(T))}const x=o.name.match(/^int(\d+)$/);if(x){const T=parseInt(x[1],10);if(i.remainingBits<T)throw new c.TLBDataError(`Not enough bits to read int${T} (need ${T} bits)`);return Number(i.loadInt(T))}const y=o.name.match(/^bits(\d+)$/);if(y){const T=parseInt(y[1],10);if(i.remainingBits<T)throw new c.TLBDataError(`Not enough bits to read bits${T} (need ${T} bits)`);return i.loadBits(T)}const L=this.types.get(o.name);if(!L)throw new c.TLBDataError(`Type ${o.name} not found in TL-B schema`);const q=o.arguments??[],V=new Map,se=new s.MathExprEvaluator(u),oe=new Map;if(L.constructors.length>0&&q.length>0){const T=L.constructors[0],P=Math.min(q.length,T.parameters.length);for(let k=0;k<P;k++){const re=T.parameters[k],j=q[k];if(re.variable?.type==="#"){if(re.variable.negated&&f){const J=f.parameters.find(le=>le.variable?.name===re.variable.name&&le.variable.type==="#");J&&J.variable.negated&&oe.set(re.variable.name,re.variable.name)}try{let J;if(j.kind==="TLBExprMathType")J=se.evaluate(j.initialExpr);else if(j.kind==="TLBNumberType")J=se.evaluate(j.bits);else if(j.kind==="TLBNamedType"&&j.name)if(f?.parameters.find(ve=>ve.variable?.name===j.name&&ve.variable.type==="#"))oe.set(re.variable.name,j.name);else{const ve=u.get(j.name);typeof ve=="number"&&(J=ve)}typeof J=="number"&&V.set(re.variable.name,J)}catch{}}}}const ye=(0,a.unwrap)(this.deserializeType(L,i,q,V));if(oe.size>0&&ye&&typeof ye=="object")for(const[T,P]of oe.entries()){let k=this.extractNumericProperty(ye,T);typeof k!="number"&&(k=this.extractNumericProperty(ye,P)),typeof k=="number"&&u.set(P,k)}if(q.length>0&&ye&&typeof ye=="object"&&f)for(let T=0;T<Math.min(q.length,L.constructors[0]?.parameters.length??0);T++){const P=q[T],k=L.constructors[0]?.parameters[T];if(P.kind==="TLBNamedType"&&P.name&&k?.variable?.type==="#"&&f.parameters.find(j=>j.variable?.name===P.name&&j.variable.type==="#")&&!u.has(P.name)){const j=this.extractNumericProperty(ye,k.variable.name);typeof j=="number"&&u.set(P.name,j)}}if(ye&&typeof ye=="object"){if(o.name==="VarUInteger"||o.name==="VarInteger"){if("value"in ye)return BigInt(ye.value)}else if(o.name==="Grams"&&"amount"in ye)return BigInt(ye.amount)}return ye}case"TLBCoinsType":return i.loadCoins();case"TLBAddressType":{if(i.remainingBits<2)return null;const I=i.preloadUint(2);if(I===0)return i.loadUint(2),null;if(I===1){i.loadUint(2);const N=i.loadUint(9),x=i.loadUintBig(N);return new _.ExternalAddress(x,N)}else return i.loadAddress()}case"TLBCellType":return i.asCell();case"TLBCellInsideType":{if(i.remainingRefs===0)throw new c.TLBDataError("No more references available for TLBCellInsideType");const I=i.loadRef();if(o.value.kind==="TLBCellType")return I;const N=I.beginParse();return this.deserializeFieldType(o.value,N,u,f,p)}case"TLBRefType":{if(i.remainingRefs===0)throw new c.TLBDataError("No more references available for TLBRefType");const I=i.loadRef();if(o.value.kind==="TLBCellType"||o.value.kind==="TLBNamedType"&&o.value.name==="Cell")return I;const N=I.beginParse();return this.deserializeFieldType(o.value,N,u,f,p)}case"TLBHashmapType":{const I=w.evaluate(o.key),N=L=>this.deserializeFieldType(o.value,L,new Map(u),f,p),x=()=>_.Dictionary.empty(_.Dictionary.Keys.BigUint(I)),y=()=>_.Dictionary.empty(_.Dictionary.Keys.Uint(I));if(I>32){const L=o.directStore?i.loadDictDirect(_.Dictionary.Keys.BigUint(I),{serialize:()=>{},parse:N}):i.loadDict(_.Dictionary.Keys.BigUint(I),{serialize:()=>{},parse:N});return L.size===0?x():L}else{const L=o.directStore?i.loadDictDirect(_.Dictionary.Keys.Uint(I),{serialize:()=>{},parse:N}):i.loadDict(_.Dictionary.Keys.Uint(I),{serialize:()=>{},parse:N});return L.size===0?y():L}}case"TLBVarIntegerType":{const I=w.evaluate(o.n);return o.signed?i.loadVarIntBig(I):i.loadVarUintBig(I)}case"TLBMultipleType":{const I=w.evaluate(o.times),N=[];for(let x=0;x<I;x++)N.push(this.deserializeFieldType(o.value,i,u,f,p));return N}case"TLBCondType":return w.evaluate(o.condition)?this.deserializeFieldType(o.value,i,u,f,p):void 0;case"TLBTupleType":{const I=i.loadRef();return(0,_.parseTuple)(I)}default:throw new c.TLBDataError(`Unsupported field type: ${o.kind}`)}}serializeType(o,i,u){let f=i.kind,p;if(!f)if(o.constructors.length===1)p=o.constructors[0],f=p.name==="_"?o.name:`${o.name}_${p.name}`;else if(o.constructors.length>0)p=o.constructors[0],f=p.name==="_"?o.name:`${o.name}_${p.name}`;else throw new c.TLBDataError("Data must by typed (kind property missing)");if(f&&!p)if(f.startsWith(o.name+"_")){const L=f.substring(o.name.length+1);p=o.constructors.find(q=>q.name===L)}else f===o.name?o.constructors.length>0&&(p=o.constructors[0]):p=o.constructors.find(L=>L.name===f);if(!p)throw new c.TLBDataError(`Constructor not found for type ${f||o.name}`);let w=p.tag.bitLen,I=p.tag.binary;if(w===0&&p.declaration){const L=p.declaration.match(/^_#([0-9a-fA-F]+)/);if(L){const q=L[1];w=q.length*4,I="0x"+q}}if(w>0){const L=BigInt(I);u.storeUint(L,w)}const N=new Map;if(p.parameters.length>0){for(const L of p.parameters)if(L.variable?.name&&L.variable.type==="#")if(L.variable.isConst&&L.variable.constValue!==void 0)N.set(L.variable.name,L.variable.constValue);else{const q=i[L.variable.name];typeof q=="number"&&N.set(L.variable.name,q)}}else if(p.variables.length>0){const L=new Set(p.fields.map(q=>q.name));for(const q of p.variables)if(q.type==="#"&&!q.negated&&!q.isConst&&!L.has(q.name)){const V=i[q.name];typeof V=="number"&&N.set(q.name,V)}}for(let L=0;L<p.variables.length;L++){const q=p.variables[L];let V=N.get(q.name);if(V===void 0&&i[q.name]!==void 0){const se=i[q.name];typeof se=="number"?V=se:typeof se=="bigint"?V=Number(se):typeof se=="boolean"&&(V=se?1:0)}V!==void 0&&(N.set(q.name,V),N.set(`_${L+1}`,V))}let x=0;for(const L of p.fields){if(L.implicit)continue;const q=L.name||`anon${x++}`,V=i[q];V!==void 0&&this.serializeField(L,V,u,N)}if(p.fields.length===0&&p.declaration){let L=0;const q=Array.from(p.declaration.matchAll(/\(##\s*(\w+)\)/g));for(const ce of q){const U=ce.index,K=p.declaration.substring(0,U).trim();if(K.endsWith(":")||/:\s*$/.test(K))continue;const de=ce[1],me=`anon${L++}`,ie=i[me];if(ie!==void 0){let ge;if(/^\d+$/.test(de))ge=parseInt(de,10);else{const _e=N.get(de);if(_e===void 0)throw new c.TLBDataError(`Variable ${de} not found for anonymous field`);ge=_e}u.storeUint(ie,ge),N.set(me,Number(ie))}}const V=p.declaration.matchAll(/(\w+):#/g);for(const ce of V){const U=ce[1],D=i[U];D!==void 0&&(u.storeUint(D,32),N.set(U,Number(D)))}const se=p.declaration.matchAll(/(\w+):\(##\s*(\w+)\)/g);for(const ce of se){const U=ce[1],D=ce[2],K=i[U];if(K!==void 0){let de;if(/^\d+$/.test(D))de=parseInt(D,10);else{const me=N.get(D);if(me===void 0)throw new c.TLBDataError(`Variable ${D} not found for field ${U}`);de=me}u.storeUint(K,de),N.set(U,Number(K))}}const oe=p.declaration.matchAll(/(\w+):\((#<|#<=)\s+(\w+)\)/g);for(const ce of oe){const U=ce[1],D=ce[2],K=ce[3],de=i[U];if(de!==void 0){let me;if(/^\d+$/.test(K))me=parseInt(K,10);else{const ge=N.get(K);if(ge===void 0)throw new c.TLBDataError(`Variable ${K} not found for field ${U}`);me=ge}let ie;D==="#<"?ie=s.MathExprEvaluator.calculateBitsForLessThan(me):ie=s.MathExprEvaluator.calculateBitsForLessThanOrEqual(me),u.storeUint(de,ie),N.set(U,Number(de))}}const ye=p.declaration.matchAll(/(\w+):int(\d+)/g);for(const ce of ye){const U=ce[1],D=parseInt(ce[2],10),K=i[U];K!==void 0&&(u.storeInt(K,D),N.set(U,Number(K)))}const T=p.declaration.matchAll(/(\w+):uint(\d+)/g);for(const ce of T){const U=ce[1],D=parseInt(ce[2],10),K=i[U];K!==void 0&&(u.storeUint(K,D),N.set(U,Number(K)))}const P=p.declaration.matchAll(/(\w+):\(int\s+([^)]+)\)/g);for(const ce of P){const U=ce[1],D=ce[2].trim(),K=i[U];if(K!==void 0){let de;if(/^\d+$/.test(D))de=parseInt(D,10);else try{if(D.includes("+")||D.includes("-")||D.includes("*")||D.includes("/")){const me=D.split(/([+\-*/])/);let ie=0,ge="+";for(const _e of me){const Y=_e.trim();if(Y==="+"||Y==="-"||Y==="*"||Y==="/")ge=Y;else if(/^\d+$/.test(Y)){const M=parseInt(Y,10);ge==="+"?ie+=M:ge==="-"?ie-=M:ge==="*"?ie*=M:ge==="/"&&(ie=Math.floor(ie/M))}else{const M=N.get(Y);if(M===void 0)throw new c.TLBDataError(`Variable ${Y} not found for field ${U}`);ge==="+"?ie+=M:ge==="-"?ie-=M:ge==="*"?ie*=M:ge==="/"&&(ie=Math.floor(ie/M))}}de=ie}else{const me=N.get(D);if(me===void 0)throw new c.TLBDataError(`Variable ${D} not found for field ${U}`);de=me}}catch{throw new c.TLBDataError(`Failed to evaluate bits expression for field ${U}: ${D}`)}u.storeInt(K,de),N.set(U,Number(K))}}const k=p.declaration.matchAll(/(\w+):\(uint\s+([^)]+)\)/g);for(const ce of k){const U=ce[1],D=ce[2].trim(),K=i[U];if(K!==void 0){let de;if(/^\d+$/.test(D))de=parseInt(D,10);else try{if(D.includes("+")||D.includes("-")||D.includes("*")||D.includes("/")){const me=D.split(/([+\-*/])/);let ie=0,ge="+";for(const _e of me){const Y=_e.trim();if(Y==="+"||Y==="-"||Y==="*"||Y==="/")ge=Y;else if(/^\d+$/.test(Y)){const M=parseInt(Y,10);ge==="+"?ie+=M:ge==="-"?ie-=M:ge==="*"?ie*=M:ge==="/"&&(ie=Math.floor(ie/M))}else{const M=N.get(Y);if(M===void 0)throw new c.TLBDataError(`Variable ${Y} not found for field ${U}`);ge==="+"?ie+=M:ge==="-"?ie-=M:ge==="*"?ie*=M:ge==="/"&&(ie=Math.floor(ie/M))}}de=ie}else{const me=N.get(D);if(me===void 0)throw new c.TLBDataError(`Variable ${D} not found for field ${U}`);de=me}}catch{throw new c.TLBDataError(`Failed to evaluate bits expression for field ${U}: ${D}`)}u.storeUint(K,de),N.set(U,Number(K))}}const re=p.declaration.matchAll(/(\w+):bits(\d+)/g);for(const ce of re){const U=ce[1];parseInt(ce[2],10);const D=i[U];if(D!==void 0){let K;if(typeof D=="string")K=(0,h.stringToBits)(D);else if(D instanceof _.BitString)K=D;else throw new c.TLBDataError(`Field ${U} must be a string or BitString for bits type`);u.storeBits(K)}}const j=p.declaration.matchAll(/(\w+):\(bits\s+([^)]+)\)/g);for(const ce of j){const U=ce[1],D=ce[2].trim(),K=i[U];if(K!==void 0){let de;if(/^\d+$/.test(D))de=parseInt(D,10);else try{if(D.includes("+")||D.includes("-")||D.includes("*")||D.includes("/")){const ie=D.split(/([+\-*/])/);let ge=0,_e="+";for(const Y of ie){const M=Y.trim();if(M==="+"||M==="-"||M==="*"||M==="/")_e=M;else if(/^\d+$/.test(M)){const R=parseInt(M,10);_e==="+"?ge+=R:_e==="-"?ge-=R:_e==="*"?ge*=R:_e==="/"&&(ge=Math.floor(ge/R))}else{const R=N.get(M);if(R===void 0)throw new c.TLBDataError(`Variable ${M} not found for field ${U}`);_e==="+"?ge+=R:_e==="-"?ge-=R:_e==="*"?ge*=R:_e==="/"&&(ge=Math.floor(ge/R))}}de=ge}else{const ie=N.get(D);if(ie===void 0)throw new c.TLBDataError(`Variable ${D} not found for field ${U}`);de=ie}}catch{throw new c.TLBDataError(`Failed to evaluate bits expression for field ${U}: ${D}`)}let me;if(typeof K=="string")me=(0,h.stringToBits)(K);else if(K instanceof _.BitString)me=K;else throw new c.TLBDataError(`Field ${U} must be a string or BitString for bits type`);u.storeBits(me)}}const J=p.declaration.matchAll(/(\w+):\((\w+)(?:\s+([^)]+))?\)/g);for(const ce of J){const U=ce[1],D=ce[2],K=ce[3]||"",de=i[U];if(D!=="##"&&!(D==="#<"||D==="#<=")&&D!=="bits"&&de!==void 0){if(!this.types.get(D))throw new c.TLBDataError(`Type ${D} not found for field ${U}`);const ie=[];if(K.trim()){let _e=K.trim();for(;_e.length>0&&(_e=_e.trim(),!!_e);){if(_e.startsWith("(")){let R=0,H=0;for(;H<_e.length;H++)if(_e[H]==="(")R++;else if(_e[H]===")"&&(R--,R===0))break;if(R!==0){const ee=_e.indexOf(" "),xe=ee>=0?_e.substring(0,ee):_e;ie.push({kind:"TLBNamedType",name:xe,arguments:[]}),_e=ee>=0?_e.substring(ee+1):"";continue}const Z=_e.substring(1,H);_e=_e.substring(H+1).trim();const X=Z.match(/^([a-z_][a-zA-Z0-9_]*|\d+)\s*([+\-*/])\s*([a-z_][a-zA-Z0-9_]*|\d+)$/);if(X){const ee=X[1],xe=X[2],pe=X[3],he=/^\d+$/.test(ee)?{kind:"TLBNumberExpr",n:parseInt(ee,10)}:{kind:"TLBVarExpr",x:ee},Se=/^\d+$/.test(pe)?{kind:"TLBNumberExpr",n:parseInt(pe,10)}:{kind:"TLBVarExpr",x:pe};ie.push({kind:"TLBExprMathType",initialExpr:{kind:"TLBBinaryOp",operation:xe,left:he,right:Se}})}else if(/^\d+$/.test(Z)){const ee=parseInt(Z,10);ie.push({kind:"TLBNumberType",bits:{kind:"TLBNumberExpr",n:ee},signed:!1})}else ie.push({kind:"TLBNamedType",name:Z,arguments:[]});continue}const Y=_e.indexOf(" "),M=Y>=0?_e.substring(0,Y):_e;if(_e=Y>=0?_e.substring(Y+1):"",M.startsWith("^")){const R=M.substring(1);ie.push({kind:"TLBRefType",value:{kind:"TLBNamedType",name:R,arguments:[]}})}else if(/^\d+$/.test(M)){const R=parseInt(M,10);ie.push({kind:"TLBNumberType",bits:{kind:"TLBNumberExpr",n:R},signed:!1})}else/^[a-z_][a-zA-Z0-9_]*$/.test(M)?N.has(M)?ie.push({kind:"TLBNamedType",name:M,arguments:[]}):ie.push({kind:"TLBNamedType",name:M,arguments:[]}):ie.push({kind:"TLBNamedType",name:M,arguments:[]})}}const ge={kind:"TLBNamedType",name:D,arguments:ie};this.serializeFieldType(ge,de,u,N)}}let le=p.declaration;for(;le.length>0;){const ce=le.match(/(\w+):\^\[/);if(!ce)break;const U=ce[1],D=ce.index;let K=0,de=D+ce[0].length,me=!1;for(;de<le.length;de++)if(le[de]==="[")K++;else if(le[de]==="]"){if(K===0){me=!0;break}K--}if(!me)break;const ie=le.substring(D+ce[0].length,de),ge=i[U];if(ge!==void 0){const _e=(0,_.beginCell)(),Y=this.serializeInlineCell(ie,ge,_e,N);if(!Y.success)throw Y.error;u.storeRef(_e.endCell())}le=le.substring(de+1)}const ve=p.declaration.matchAll(/(\w+):([A-Z][a-zA-Z0-9_]*)/g);for(const ce of ve){const U=ce[1],D=ce[2],K=i[U],de=p.declaration.substring(0,ce.index);if(de.endsWith("(")||de.endsWith("^"))continue;if(D==="Bool"){K!==void 0&&u.storeBit(K?1:0);continue}if(D==="MsgAddress"||D==="MsgAddressInt"||D==="MsgAddressExt"){if(K!==void 0)if(K==null)u.storeUint(0,2);else if(K instanceof _.ExternalAddress)u.storeUint(1,2),u.storeUint(K.bits,9),u.storeUint(K.value,K.bits);else{let ie=K;typeof ie=="string"&&(ie=_.Address.parse(ie)),u.storeAddress(ie)}continue}const me=this.types.get(D);me&&K!==void 0&&this.serializeType(me,K,u)}const Ee=p.declaration.matchAll(/(\w+):\^(\w+)/g);for(const ce of Ee){const U=ce[1],D=ce[2],K=i[U];if(K!==void 0)if(D==="Cell")if(K instanceof _.Cell)u.storeRef(K);else throw new c.TLBDataError(`Field ${U} must be a Cell instance for ^Cell type`);else{const de=this.types.get(D);if(de){const me=(0,_.beginCell)();this.serializeType(de,K,me),u.storeRef(me.endCell())}else throw new c.TLBDataError(`Type ${D} not found for field ${U}`)}}}const y=new s.MathExprEvaluator(N);for(const L of p.constraints)if(y.evaluate(L)!==1)throw new c.TLBDataError(`Constraint failed for type ${o.name}, constructor ${p.name}`)}serializeField(o,i,u,f){o.name&&(o.fieldType.kind==="TLBNumberType"||o.fieldType.kind==="TLBVarIntegerType"||o.fieldType.kind==="TLBBoolType")&&f.set(o.name,Number(i)),this.serializeFieldType(o.fieldType,i,u,f)}serializeFieldType(o,i,u,f){const p=new s.MathExprEvaluator(f);switch(o.kind){case"TLBNumberType":{const w=p.evaluate(o.bits);o.signed?u.storeInt(i,w):u.storeUint(i,w);break}case"TLBBoolType":{if(o.value!==void 0)break;u.storeBit(i?1:0);break}case"TLBBitsType":{const w=p.evaluate(o.bits);if(typeof i=="string"&&(i=(0,h.stringToBits)(i)),i instanceof _.BitString){if(i.length!==w)throw new c.TLBDataError(`BitString length mismatch: expected ${w} bits, got ${i.length} bits`);u.storeBits(i)}else throw new c.TLBDataError(`Value must be a string or BitString for bits type, got ${typeof i}`);break}case"TLBNamedType":{if(o.name==="Bool"){u.storeBit(i?1:0);break}if(o.name==="Maybe"){const I=o.arguments??[];if(I.length<1)throw new c.TLBDataError("Maybe requires one argument: the inner type (X)");const N=I[0];if(i&&typeof i=="object"&&"kind"in i)if(i.kind==="Maybe_nothing")u.storeBit(0);else if(i.kind==="Maybe_just"&&"value"in i)u.storeBit(1),this.serializeFieldType(N,i.value,u,f);else throw new c.TLBDataError(`Invalid Maybe value: expected Maybe_nothing or Maybe_just, got ${i.kind}`);else i==null?u.storeBit(0):(u.storeBit(1),this.serializeFieldType(N,i,u,f));break}if(o.name==="MsgAddress"||o.name==="MsgAddressInt"||o.name==="MsgAddressExt"){i==null?u.storeUint(0,2):i instanceof _.ExternalAddress?(u.storeUint(1,2),u.storeUint(i.bits,9),u.storeUint(i.value,i.bits)):(typeof i=="string"&&(i=_.Address.parse(i)),u.storeAddress(i));break}if(o.name==="HashmapE"){const I=o.arguments??[];if(I.length<2)throw new c.TLBDataError("HashmapE requires two arguments: key size (n) and value type (X)");const N=I[0];let x;if(N.kind==="TLBExprMathType")x=p.evaluate(N.initialExpr);else if(N.kind==="TLBNumberType")x=p.evaluate(N.bits);else if(N.kind==="TLBNamedType"&&N.name){const V=f.get(N.name);if(V===void 0)throw new c.TLBDataError(`Variable ${N.name} not found for HashmapE key size argument`);x=V}else throw new c.TLBDataError("HashmapE first argument must be a numeric expression or parameter reference");const y=I[1],L=i;if(!L||L.size===0)u.storeBit(0);else{u.storeBit(1);const V=(0,_.beginCell)();if(x>32){const se=_.Dictionary.empty(_.Dictionary.Keys.BigUint(x),_.Dictionary.Values.Cell());for(const[oe,ye]of L){const T=(0,_.beginCell)();this.serializeFieldType(y,ye,T,new Map(f));const P=typeof oe=="bigint"?oe:BigInt(oe);se.set(P,T.endCell())}V.storeDict(se)}else{const se=_.Dictionary.empty(_.Dictionary.Keys.Uint(x),_.Dictionary.Values.Cell());for(const[oe,ye]of L){const T=(0,_.beginCell)();this.serializeFieldType(y,ye,T,new Map(f));const P=typeof oe=="number"?oe:Number(oe);se.set(P,T.endCell())}V.storeDict(se)}u.storeRef(V.endCell())}break}if(o.name==="#<"||o.name==="#<="){const I=o.arguments??[];if(I.length===0)throw new c.TLBDataError(`${o.name} requires an argument`);const N=I[0];let x;if(N.kind==="TLBExprMathType")x=p.evaluate(N.initialExpr);else if(N.kind==="TLBNumberType")x=p.evaluate(N.bits);else if(N.kind==="TLBNamedType"&&N.name){const L=f.get(N.name);if(L===void 0)throw new c.TLBDataError(`Variable ${N.name} not found for ${o.name} argument`);x=L}else throw new c.TLBDataError(`Invalid argument type for ${o.name}`);let y;o.name==="#<"?y=s.MathExprEvaluator.calculateBitsForLessThan(x):y=s.MathExprEvaluator.calculateBitsForLessThanOrEqual(x),u.storeUint(i,y);break}const w=this.types.get(o.name);if(!w)throw new c.TLBDataError(`Type ${o.name} not found in TL-B schema`);if(i!=null&&typeof i!="object")if(o.name==="VarUInteger"){if(!o.arguments||o.arguments.length<1)throw new c.TLBDataError("VarUInteger requires argument n");const I=o.arguments[0];let N;if(I.kind==="TLBExprMathType")N=p.evaluate(I.initialExpr);else if(I.kind==="TLBNumberType")N=p.evaluate(I.bits);else if(I.kind==="TLBNamedType"&&I.name){const L=f.get(I.name);if(L===void 0)throw new c.TLBDataError(`Variable ${I.name} not found for VarUInteger`);N=L}else throw new c.TLBDataError("Invalid argument for VarUInteger");const x=BigInt(i);let y=0;if(x>0n){y=0;let L=x;for(;L>0n;)L>>=8n,y++}i={kind:"var_uint",n:N,len:y,value:x}}else if(o.name==="VarInteger"){if(!o.arguments||o.arguments.length<1)throw new c.TLBDataError("VarInteger requires argument n");const I=o.arguments[0];let N;if(I.kind==="TLBExprMathType")N=p.evaluate(I.initialExpr);else if(I.kind==="TLBNumberType")N=p.evaluate(I.bits);else if(I.kind==="TLBNamedType"&&I.name){const L=f.get(I.name);if(L===void 0)throw new c.TLBDataError(`Variable ${I.name} not found for VarInteger`);N=L}else throw new c.TLBDataError("Invalid argument for VarInteger");const x=BigInt(i);let y=0;if(x!==0n&&x!==0n)for(y=1;;){const L=BigInt(y*8),q=-(1n<<L-1n),V=(1n<<L-1n)-1n;if(x>=q&&x<=V)break;y++}i={kind:"var_int",n:N,len:y,value:x}}else o.name==="Grams"&&(i={kind:"nanograms",amount:i});this.serializeType(w,i,u);break}case"TLBCoinsType":{u.storeCoins(i);break}case"TLBAddressType":{i==null?u.storeUint(0,2):i instanceof _.ExternalAddress?(u.storeUint(1,2),u.storeUint(i.bits,9),u.storeUint(i.value,i.bits)):(typeof i=="string"&&(i=_.Address.parse(i)),u.storeAddress(i));break}case"TLBCellType":{u.storeRef(i);break}case"TLBCellInsideType":{const w=(0,_.beginCell)();this.serializeFieldType(o.value,i,w,f),u.storeRef(w.endCell());break}case"TLBRefType":{if(o.value.kind==="TLBCellType"){if(i instanceof _.Cell)u.storeRef(i);else throw new c.TLBDataError("Value must be a Cell instance for TLBRefType with TLBCellType inner type");break}if(o.value.kind==="TLBNamedType"&&o.value.name==="Cell"){if(i instanceof _.Cell)u.storeRef(i);else throw new c.TLBDataError("Value must be a Cell instance for TLBRefType with Cell inner type");break}const w=(0,_.beginCell)();this.serializeFieldType(o.value,i,w,f),u.storeRef(w.endCell());break}case"TLBHashmapType":{const w=p.evaluate(o.key),I=_.Dictionary.empty(_.Dictionary.Keys.BigInt(w),_.Dictionary.Values.Cell());if(i)for(const[N,x]of Object.entries(i)){const y=(0,_.beginCell)();this.serializeFieldType(o.value,x,y,new Map(f)),I.set(BigInt(N),y.endCell())}u.storeDict(I);break}case"TLBVarIntegerType":{const w=p.evaluate(o.n);o.signed?u.storeVarInt(i,w):u.storeVarUint(i,w);break}case"TLBMultipleType":{const w=p.evaluate(o.times);for(let I=0;I<w;I++)this.serializeFieldType(o.value,i[I],u,f);break}case"TLBCondType":{p.evaluate(o.condition)&&this.serializeFieldType(o.value,i,u,f);break}case"TLBTupleType":{const w=(0,_.serializeTuple)(i);u.storeRef(w);break}default:throw new c.TLBDataError(`Unsupported field type: ${o.kind}`)}}solveEquality(o,i,u){if(o.kind!=="TLBBinaryOp"||o.operation!=="=")return null;const f=y=>y.kind==="TLBVarExpr"?i.get(y.x)===void 0?y.x:null:y.kind==="TLBBinaryOp"?f(y.left)||f(y.right):y.kind==="TLBUnaryOp"?f(y.value):null,p=f(o.left),w=f(o.right);if(p&&w||!p&&!w)return null;const I=p||w,N=p?o.left:o.right,x=p?o.right:o.left;try{const y=u.evaluate(x),L=(V,se)=>{if(V.kind==="TLBVarExpr"&&V.x===I)return se;if(V.kind==="TLBUnaryOp"&&V.operation==="~")return L(V.value,se);if(V.kind==="TLBBinaryOp"){if(V.operation==="+")try{const oe=u.evaluate(V.left);return L(V.right,se-oe)}catch{const oe=u.evaluate(V.right);return L(V.left,se-oe)}if(V.operation==="-")try{const oe=u.evaluate(V.left);return L(V.right,oe-se)}catch{const oe=u.evaluate(V.right);return L(V.left,se+oe)}}return null},q=L(N,y);if(q!==null)return{name:I,value:q}}catch{}return null}loadBigInt(o,i,u=!1){return u?o.loadIntBig(i):o.loadUintBig(i)}}m.TLBRuntime=F;function z(S){return(0,a.unwrap)(F.from(S))}function A(S){if(typeof S=="string")return(0,a.unwrap)(F.from(S));throw new c.TLBSchemaError("Not implemented")}})(Wt)),Wt}var tn;function ii(){if(tn)return Qe;tn=1,Object.defineProperty(Qe,"__esModule",{value:!0}),Qe.decodeCell=g,Qe.encodeCell=d,Qe.replacer=v;const m=er(),_=pn();function g(h,s){return(0,_.runtimeBy)(h).decodeCell(s)}function d(h,s){return(0,_.runtimeBy)(h).encodeCell(s)}function v(h,s){return typeof s=="bigint"||s instanceof m.Address||s instanceof m.ExternalAddress||s instanceof m.BitString?s.toString():s instanceof m.Cell?s.toBoc().toString("base64"):s}return Qe}var _t={},rn;function si(){return rn||(rn=1,Object.defineProperty(_t,"__esModule",{value:!0}),_t.blockSchema=void 0,_t.blockSchema=`// https://github.com/ton-blockchain/ton/raw/774371bdc9f6107fd05106c1fd559e8903e0513d/crypto/block/block.tlb
unit$_ = Unit;
true$_ = True;
// EMPTY False;
bool_false$0 = Bool;
bool_true$1 = Bool;
bool_false$0 = BoolFalse;
bool_true$1 = BoolTrue;
nothing$0 {X:Type} = Maybe X;
just$1 {X:Type} value:X = Maybe X;
left$0 {X:Type} {Y:Type} value:X = Either X Y;
right$1 {X:Type} {Y:Type} value:Y = Either X Y;
pair$_ {X:Type} {Y:Type} first:X second:Y = Both X Y;

bit$_ (## 1) = Bit;
/*
 *
 *   FROM hashmap.tlb
 *
 */
// ordinary Hashmap / HashmapE, with fixed length keys
//
hm_edge#_ {n:#} {X:Type} {l:#} {m:#} label:(HmLabel ~l n) 
          {n = (~m) + l} node:(HashmapNode m X) = Hashmap n X;

hmn_leaf#_ {X:Type} value:X = HashmapNode 0 X;
hmn_fork#_ {n:#} {X:Type} left:^(Hashmap n X) 
           right:^(Hashmap n X) = HashmapNode (n + 1) X;

hml_short$0 {m:#} {n:#} len:(Unary ~n) {n <= m} s:(n * Bit) = HmLabel ~n m;
hml_long$10 {m:#} n:(#<= m) s:(n * Bit) = HmLabel ~n m;
hml_same$11 {m:#} v:Bit n:(#<= m) = HmLabel ~n m;

unary_zero$0 = Unary ~0;
unary_succ$1 {n:#} x:(Unary ~n) = Unary ~(n + 1);

hme_empty$0 {n:#} {X:Type} = HashmapE n X;
hme_root$1 {n:#} {X:Type} root:^(Hashmap n X) = HashmapE n X;

// true#_ = True;
_ {n:#} _:(Hashmap n True) = BitstringSet n;

//  HashmapAug, hashmap with an extra value 
//   (augmentation) of type Y at every node
//
ahm_edge#_ {n:#} {X:Type} {Y:Type} {l:#} {m:#} 
  label:(HmLabel ~l n) {n = (~m) + l} 
  node:(HashmapAugNode m X Y) = HashmapAug n X Y;
ahmn_leaf#_ {X:Type} {Y:Type} extra:Y value:X = HashmapAugNode 0 X Y;
ahmn_fork#_ {n:#} {X:Type} {Y:Type} left:^(HashmapAug n X Y)
  right:^(HashmapAug n X Y) extra:Y = HashmapAugNode (n + 1) X Y;

ahme_empty$0 {n:#} {X:Type} {Y:Type} extra:Y 
          = HashmapAugE n X Y;
ahme_root$1 {n:#} {X:Type} {Y:Type} root:^(HashmapAug n X Y) 
  extra:Y = HashmapAugE n X Y;

// VarHashmap / VarHashmapE, with variable-length keys
//
vhm_edge#_ {n:#} {X:Type} {l:#} {m:#} label:(HmLabel ~l n) 
           {n = (~m) + l} node:(VarHashmapNode m X) 
           = VarHashmap n X;
vhmn_leaf$00 {n:#} {X:Type} value:X = VarHashmapNode n X;
vhmn_fork$01 {n:#} {X:Type} left:^(VarHashmap n X) 
             right:^(VarHashmap n X) value:(Maybe X) 
             = VarHashmapNode (n + 1) X;
vhmn_cont$1 {n:#} {X:Type} branch:Bit child:^(VarHashmap n X) 
            value:X = VarHashmapNode (n + 1) X;

// nothing$0 {X:Type} = Maybe X;
// just$1 {X:Type} value:X = Maybe X;

vhme_empty$0 {n:#} {X:Type} = VarHashmapE n X;
vhme_root$1 {n:#} {X:Type} root:^(VarHashmap n X) 
            = VarHashmapE n X;

//
// PfxHashmap / PfxHashmapE, with variable-length keys
//                           constituting a prefix code
//

phm_edge#_ {n:#} {X:Type} {l:#} {m:#} label:(HmLabel ~l n) 
           {n = (~m) + l} node:(PfxHashmapNode m X) 
           = PfxHashmap n X;

phmn_leaf$0 {n:#} {X:Type} value:X = PfxHashmapNode n X;
phmn_fork$1 {n:#} {X:Type} left:^(PfxHashmap n X) 
            right:^(PfxHashmap n X) = PfxHashmapNode (n + 1) X;

phme_empty$0 {n:#} {X:Type} = PfxHashmapE n X;
phme_root$1 {n:#} {X:Type} root:^(PfxHashmap n X) 
            = PfxHashmapE n X;
/*
 *
 *  END hashmap.tlb
 *
 */
//
// TON BLOCK LAYOUT
//
addr_none$00 = MsgAddressExt;
addr_extern$01 len:(## 9) external_address:(bits len) 
             = MsgAddressExt;
anycast_info$_ depth:(#<= 30) { depth >= 1 }
   rewrite_pfx:(bits depth) = Anycast;
addr_std$10 anycast:(Maybe Anycast) 
   workchain_id:int8 address:bits256  = MsgAddressInt;
addr_var$11 anycast:(Maybe Anycast) addr_len:(## 9) 
   workchain_id:int32 address:(bits addr_len) = MsgAddressInt;
_ _:MsgAddressInt = MsgAddress;
_ _:MsgAddressExt = MsgAddress;
//
var_uint$_ {n:#} len:(#< n) value:(uint (len * 8))
         = VarUInteger n;
var_int$_ {n:#} len:(#< n) value:(int (len * 8)) 
        = VarInteger n;
nanograms$_ amount:(VarUInteger 16) = Grams;

_ grams:Grams = Coins;

//
extra_currencies$_ dict:(HashmapE 32 (VarUInteger 32)) 
                 = ExtraCurrencyCollection;
currencies$_ grams:Grams other:ExtraCurrencyCollection 
           = CurrencyCollection;
//
int_msg_info$0 ihr_disabled:Bool bounce:Bool bounced:Bool
  src:MsgAddressInt dest:MsgAddressInt 
  value:CurrencyCollection ihr_fee:Grams fwd_fee:Grams
  created_lt:uint64 created_at:uint32 = CommonMsgInfo;
ext_in_msg_info$10 src:MsgAddressExt dest:MsgAddressInt 
  import_fee:Grams = CommonMsgInfo;
ext_out_msg_info$11 src:MsgAddressInt dest:MsgAddressExt
  created_lt:uint64 created_at:uint32 = CommonMsgInfo;

int_msg_info$0 ihr_disabled:Bool bounce:Bool bounced:Bool
  src:MsgAddress dest:MsgAddressInt 
  value:CurrencyCollection ihr_fee:Grams fwd_fee:Grams
  created_lt:uint64 created_at:uint32 = CommonMsgInfoRelaxed;
ext_out_msg_info$11 src:MsgAddress dest:MsgAddressExt
  created_lt:uint64 created_at:uint32 = CommonMsgInfoRelaxed;

tick_tock$_ tick:Bool tock:Bool = TickTock;

_ fixed_prefix_length:(Maybe (## 5)) special:(Maybe TickTock)
  code:(Maybe ^Cell) data:(Maybe ^Cell)
  library:(Maybe ^Cell) = StateInit;

// StateInitWithLibs is used to validate sent and received messages
_ fixed_prefix_length:(Maybe (## 5)) special:(Maybe TickTock)
  code:(Maybe ^Cell) data:(Maybe ^Cell)
  library:(HashmapE 256 SimpleLib) = StateInitWithLibs;

simple_lib$_ public:Bool root:^Cell = SimpleLib;

message$_ {X:Type} info:CommonMsgInfo
  init:(Maybe (Either StateInit ^StateInit))
  body:(Either X ^X) = Message X;

message$_ {X:Type} info:CommonMsgInfoRelaxed
  init:(Maybe (Either StateInit ^StateInit))
  body:(Either X ^X) = MessageRelaxed X;
  
_ (Message Any) = MessageAny;

//
interm_addr_regular$0 use_dest_bits:(#<= 96) 
  = IntermediateAddress;
interm_addr_simple$10 workchain_id:int8 addr_pfx:uint64 
  = IntermediateAddress;
interm_addr_ext$11 workchain_id:int32 addr_pfx:uint64
  = IntermediateAddress;
msg_envelope#4 cur_addr:IntermediateAddress 
  next_addr:IntermediateAddress fwd_fee_remaining:Grams 
  msg:^(Message Any) = MsgEnvelope;
msg_metadata#0 depth:uint32 initiator_addr:MsgAddressInt initiator_lt:uint64 = MsgMetadata;
msg_envelope_v2#5 cur_addr:IntermediateAddress
  next_addr:IntermediateAddress fwd_fee_remaining:Grams
  msg:^(Message Any)
  emitted_lt:(Maybe uint64)
  metadata:(Maybe MsgMetadata) = MsgEnvelope;
//
msg_import_ext$000 msg:^(Message Any) transaction:^Transaction 
              = InMsg;
msg_import_ihr$010 msg:^(Message Any) transaction:^Transaction 
    ihr_fee:Grams proof_created:^Cell = InMsg;
msg_import_imm$011 in_msg:^MsgEnvelope
    transaction:^Transaction fwd_fee:Grams = InMsg;
msg_import_fin$100 in_msg:^MsgEnvelope 
    transaction:^Transaction fwd_fee:Grams = InMsg;
msg_import_tr$101  in_msg:^MsgEnvelope out_msg:^MsgEnvelope 
    transit_fee:Grams = InMsg;
msg_discard_fin$110 in_msg:^MsgEnvelope transaction_id:uint64 
    fwd_fee:Grams = InMsg;
msg_discard_tr$111 in_msg:^MsgEnvelope transaction_id:uint64 
    fwd_fee:Grams proof_delivered:^Cell = InMsg;
msg_import_deferred_fin$00100 in_msg:^MsgEnvelope
    transaction:^Transaction fwd_fee:Grams = InMsg;
msg_import_deferred_tr$00101 in_msg:^MsgEnvelope out_msg:^MsgEnvelope = InMsg;
//
import_fees$_ fees_collected:Grams 
  value_imported:CurrencyCollection = ImportFees;

_ (HashmapAugE 256 InMsg ImportFees) = InMsgDescr;

msg_export_ext$000 msg:^(Message Any)
    transaction:^Transaction = OutMsg;
msg_export_imm$010 out_msg:^MsgEnvelope 
    transaction:^Transaction reimport:^InMsg = OutMsg;
msg_export_new$001 out_msg:^MsgEnvelope 
    transaction:^Transaction = OutMsg;
msg_export_tr$011  out_msg:^MsgEnvelope 
    imported:^InMsg = OutMsg;
msg_export_deq$1100 out_msg:^MsgEnvelope
    import_block_lt:uint63 = OutMsg;
msg_export_deq_short$1101 msg_env_hash:bits256
    next_workchain:int32 next_addr_pfx:uint64
    import_block_lt:uint64 = OutMsg;
msg_export_tr_req$111 out_msg:^MsgEnvelope 
    imported:^InMsg = OutMsg;
msg_export_deq_imm$100 out_msg:^MsgEnvelope 
    reimport:^InMsg = OutMsg;
msg_export_new_defer$10100 out_msg:^MsgEnvelope
    transaction:^Transaction = OutMsg;
msg_export_deferred_tr$10101  out_msg:^MsgEnvelope
    imported:^InMsg = OutMsg;

_ enqueued_lt:uint64 out_msg:^MsgEnvelope = EnqueuedMsg;

_ (HashmapAugE 256 OutMsg CurrencyCollection) = OutMsgDescr;

_ (HashmapAugE 352 EnqueuedMsg uint64) = OutMsgQueue;

processed_upto$_ last_msg_lt:uint64 last_msg_hash:bits256 = ProcessedUpto;
// key is [ shard:uint64 mc_seqno:uint32 ]  
_ (HashmapE 96 ProcessedUpto) = ProcessedInfo;

ihr_pending$_ import_lt:uint64 = IhrPendingSince;
_ (HashmapE 320 IhrPendingSince) = IhrPendingInfo;

// key - created_lt
_ messages:(HashmapE 64 EnqueuedMsg) count:uint48 = AccountDispatchQueue;
// key - sender address, aug - min created_lt
_ (HashmapAugE 256 AccountDispatchQueue uint64) = DispatchQueue;

out_msg_queue_extra#0 dispatch_queue:DispatchQueue out_queue_size:(Maybe uint48) = OutMsgQueueExtra;

_ out_queue:OutMsgQueue proc_info:ProcessedInfo
  extra:(Maybe OutMsgQueueExtra) = OutMsgQueueInfo;

storage_extra_none$000 = StorageExtraInfo;
storage_extra_info$001 dict_hash:uint256 = StorageExtraInfo;

storage_used$_ cells:(VarUInteger 7) bits:(VarUInteger 7) = StorageUsed;

storage_info$_ used:StorageUsed storage_extra:StorageExtraInfo last_paid:uint32
              due_payment:(Maybe Grams) = StorageInfo;

account_none$0 = Account;
account$1 addr:MsgAddressInt storage_stat:StorageInfo
          storage:AccountStorage = Account;

account_storage$_ last_trans_lt:uint64
    balance:CurrencyCollection state:AccountState 
  = AccountStorage;

account_uninit$00 = AccountState;
account_active$1 _:StateInit = AccountState;
account_frozen$01 state_hash:bits256 = AccountState;

acc_state_uninit$00 = AccountStatus;
acc_state_frozen$01 = AccountStatus;
acc_state_active$10 = AccountStatus;
acc_state_nonexist$11 = AccountStatus;

account_descr$_ account:^Account last_trans_hash:bits256 
  last_trans_lt:uint64 = ShardAccount;

depth_balance$_ split_depth:(#<= 30) balance:CurrencyCollection = DepthBalanceInfo;

_ (HashmapAugE 256 ShardAccount DepthBalanceInfo) = ShardAccounts;

transaction$0111 account_addr:bits256 lt:uint64 
  prev_trans_hash:bits256 prev_trans_lt:uint64 now:uint32
  outmsg_cnt:uint15
  orig_status:AccountStatus end_status:AccountStatus
  ^[ in_msg:(Maybe ^(Message Any)) out_msgs:(HashmapE 15 ^(Message Any)) ]
  total_fees:CurrencyCollection state_update:^(HASH_UPDATE Account)
  description:^TransactionDescr = Transaction;

!merkle_update#04 {X:Type} old_hash:bits256 new_hash:bits256 old_depth:uint16 new_depth:uint16
  old:^X new:^X = MERKLE_UPDATE X;
update_hashes#72 {X:Type} old_hash:bits256 new_hash:bits256
  = HASH_UPDATE X;
!merkle_proof#03 {X:Type} virtual_hash:bits256 depth:uint16 virtual_root:^X = MERKLE_PROOF X;

acc_trans#5 account_addr:bits256
            transactions:(HashmapAug 64 ^Transaction CurrencyCollection)
            state_update:^(HASH_UPDATE Account)
          = AccountBlock;

_ (HashmapAugE 256 AccountBlock CurrencyCollection) = ShardAccountBlocks;
//
tr_phase_storage$_ storage_fees_collected:Grams 
  storage_fees_due:(Maybe Grams)
  status_change:AccStatusChange
  = TrStoragePhase;

acst_unchanged$0 = AccStatusChange;  // x -> x
acst_frozen$10 = AccStatusChange;    // init -> frozen
acst_deleted$11 = AccStatusChange;   // frozen -> deleted

tr_phase_credit$_ due_fees_collected:(Maybe Grams)
  credit:CurrencyCollection = TrCreditPhase;

tr_phase_compute_skipped$0 reason:ComputeSkipReason
  = TrComputePhase;
tr_phase_compute_vm$1 success:Bool msg_state_used:Bool 
  account_activated:Bool gas_fees:Grams
  ^[ gas_used:(VarUInteger 7)
  gas_limit:(VarUInteger 7) gas_credit:(Maybe (VarUInteger 3))
  mode:int8 exit_code:int32 exit_arg:(Maybe int32)
  vm_steps:uint32
  vm_init_state_hash:bits256 vm_final_state_hash:bits256 ]
  = TrComputePhase;
cskip_no_state$00 = ComputeSkipReason;
cskip_bad_state$01 = ComputeSkipReason;
cskip_no_gas$10 = ComputeSkipReason;
cskip_suspended$110 = ComputeSkipReason;

tr_phase_action$_ success:Bool valid:Bool no_funds:Bool
  status_change:AccStatusChange
  total_fwd_fees:(Maybe Grams) total_action_fees:(Maybe Grams)
  result_code:int32 result_arg:(Maybe int32) tot_actions:uint16
  spec_actions:uint16 skipped_actions:uint16 msgs_created:uint16 
  action_list_hash:bits256 tot_msg_size:StorageUsed
  = TrActionPhase;

tr_phase_bounce_negfunds$00 = TrBouncePhase;
tr_phase_bounce_nofunds$01 msg_size:StorageUsed
  req_fwd_fees:Grams = TrBouncePhase;
tr_phase_bounce_ok$1 msg_size:StorageUsed
  msg_fees:Grams fwd_fees:Grams = TrBouncePhase;
//
trans_ord$0000 credit_first:Bool
  storage_ph:(Maybe TrStoragePhase)
  credit_ph:(Maybe TrCreditPhase)
  compute_ph:TrComputePhase action:(Maybe ^TrActionPhase)
  aborted:Bool bounce:(Maybe TrBouncePhase)
  destroyed:Bool
  = TransactionDescr;

trans_storage$0001 storage_ph:TrStoragePhase
  = TransactionDescr;

trans_tick_tock$001 is_tock:Bool storage_ph:TrStoragePhase
  compute_ph:TrComputePhase action:(Maybe ^TrActionPhase)
  aborted:Bool destroyed:Bool = TransactionDescr;
//
split_merge_info$_ cur_shard_pfx_len:(## 6)
  acc_split_depth:(## 6) this_addr:bits256 sibling_addr:bits256
  = SplitMergeInfo;
trans_split_prepare$0100 split_info:SplitMergeInfo
  storage_ph:(Maybe TrStoragePhase)
  compute_ph:TrComputePhase action:(Maybe ^TrActionPhase)
  aborted:Bool destroyed:Bool
  = TransactionDescr;
trans_split_install$0101 split_info:SplitMergeInfo
  prepare_transaction:^Transaction
  installed:Bool = TransactionDescr;

trans_merge_prepare$0110 split_info:SplitMergeInfo
  storage_ph:TrStoragePhase aborted:Bool
  = TransactionDescr;
trans_merge_install$0111 split_info:SplitMergeInfo
  prepare_transaction:^Transaction
  storage_ph:(Maybe TrStoragePhase)
  credit_ph:(Maybe TrCreditPhase)
  compute_ph:TrComputePhase action:(Maybe ^TrActionPhase)
  aborted:Bool destroyed:Bool
  = TransactionDescr;

smc_info#076ef1ea actions:uint16 msgs_sent:uint16
  unixtime:uint32 block_lt:uint64 trans_lt:uint64 
  rand_seed:bits256 balance_remaining:CurrencyCollection
  myself:MsgAddressInt global_config:(Maybe Cell) = SmartContractInfo;
//
//
out_list_empty$_ = OutList 0;
out_list$_ {n:#} prev:^(OutList n) action:OutAction
  = OutList (n + 1);
action_send_msg#0ec3c86d mode:(## 8) 
  out_msg:^(MessageRelaxed Any) = OutAction;
action_set_code#ad4de08e new_code:^Cell = OutAction;
action_reserve_currency#36e6b809 mode:(## 8)
  currency:CurrencyCollection = OutAction;
libref_hash$0 lib_hash:bits256 = LibRef;
libref_ref$1 library:^Cell = LibRef;
action_change_library#26fa1dd4 mode:(## 7)
  libref:LibRef = OutAction;

out_list_node$_ prev:^Cell action:OutAction = OutListNode;
//
//
shard_ident$00 shard_pfx_bits:(#<= 60) 
  workchain_id:int32 shard_prefix:uint64 = ShardIdent;

ext_blk_ref$_ end_lt:uint64
  seq_no:uint32 root_hash:bits256 file_hash:bits256 
  = ExtBlkRef;

block_id_ext$_ shard_id:ShardIdent seq_no:uint32
  root_hash:bits256 file_hash:bits256 = BlockIdExt;

master_info$_ master:ExtBlkRef = BlkMasterInfo;

shard_state#9023afe2 global_id:int32
  shard_id:ShardIdent 
  seq_no:uint32 vert_seq_no:#
  gen_utime:uint32 gen_lt:uint64
  min_ref_mc_seqno:uint32
  out_msg_queue_info:^OutMsgQueueInfo
  before_split:(## 1)
  accounts:^ShardAccounts
  ^[ overload_history:uint64 underload_history:uint64
  total_balance:CurrencyCollection
  total_validator_fees:CurrencyCollection
  libraries:(HashmapE 256 LibDescr)
  master_ref:(Maybe BlkMasterInfo) ]
  custom:(Maybe ^McStateExtra)
  = ShardStateUnsplit;
  
_ ShardStateUnsplit = ShardState;
split_state#5f327da5 left:^ShardStateUnsplit right:^ShardStateUnsplit = ShardState;

shared_lib_descr$00 lib:^Cell publishers:(Hashmap 256 True)
  = LibDescr;

block_info#9bc7a987 version:uint32 
  not_master:(## 1) 
  after_merge:(## 1) before_split:(## 1) 
  after_split:(## 1) 
  want_split:Bool want_merge:Bool
  key_block:Bool vert_seqno_incr:(## 1)
  flags:(## 8) { flags <= 1 }
  seq_no:# vert_seq_no:# { vert_seq_no >= vert_seqno_incr } 
  { prev_seq_no:# } { ~prev_seq_no + 1 = seq_no } 
  shard:ShardIdent gen_utime:uint32
  start_lt:uint64 end_lt:uint64
  gen_validator_list_hash_short:uint32
  gen_catchain_seqno:uint32
  min_ref_mc_seqno:uint32
  prev_key_block_seqno:uint32
  gen_software:flags . 0?GlobalVersion
  master_ref:not_master?^BlkMasterInfo 
  prev_ref:^(BlkPrevInfo after_merge)
  prev_vert_ref:vert_seqno_incr?^(BlkPrevInfo 0)
  = BlockInfo;

prev_blk_info$_ prev:ExtBlkRef = BlkPrevInfo 0;
prev_blks_info$_ prev1:^ExtBlkRef prev2:^ExtBlkRef = BlkPrevInfo 1;

block#11ef55aa global_id:int32
  info:^BlockInfo value_flow:^ValueFlow
  state_update:^(MERKLE_UPDATE ShardState) 
  extra:^BlockExtra = Block;

block_extra in_msg_descr:^InMsgDescr
  out_msg_descr:^OutMsgDescr
  account_blocks:^ShardAccountBlocks
  rand_seed:bits256
  created_by:bits256
  custom:(Maybe ^McBlockExtra) = BlockExtra;
//
value_flow#b8e48dfb ^[ from_prev_blk:CurrencyCollection 
  to_next_blk:CurrencyCollection
  imported:CurrencyCollection
  exported:CurrencyCollection ]
  fees_collected:CurrencyCollection
  ^[
  fees_imported:CurrencyCollection
  recovered:CurrencyCollection
  created:CurrencyCollection
  minted:CurrencyCollection
  ] = ValueFlow;

value_flow_v2#3ebf98b7 ^[ from_prev_blk:CurrencyCollection
  to_next_blk:CurrencyCollection
  imported:CurrencyCollection
  exported:CurrencyCollection ]
  fees_collected:CurrencyCollection
  burned:CurrencyCollection
  ^[
  fees_imported:CurrencyCollection
  recovered:CurrencyCollection
  created:CurrencyCollection
  minted:CurrencyCollection
  ] = ValueFlow;

//
//
bt_leaf$0 {X:Type} leaf:X = BinTree X;
bt_fork$1 {X:Type} left:^(BinTree X) right:^(BinTree X) 
          = BinTree X;

fsm_none$0 = FutureSplitMerge;
fsm_split$10 split_utime:uint32 interval:uint32 = FutureSplitMerge;
fsm_merge$11 merge_utime:uint32 interval:uint32 = FutureSplitMerge;

shard_descr#b seq_no:uint32 reg_mc_seqno:uint32
  start_lt:uint64 end_lt:uint64
  root_hash:bits256 file_hash:bits256 
  before_split:Bool before_merge:Bool
  want_split:Bool want_merge:Bool
  nx_cc_updated:Bool flags:(## 3) { flags = 0 }
  next_catchain_seqno:uint32 next_validator_shard:uint64
  min_ref_mc_seqno:uint32 gen_utime:uint32
  split_merge_at:FutureSplitMerge
  fees_collected:CurrencyCollection
  funds_created:CurrencyCollection = ShardDescr;

shard_descr_new#a seq_no:uint32 reg_mc_seqno:uint32
  start_lt:uint64 end_lt:uint64
  root_hash:bits256 file_hash:bits256 
  before_split:Bool before_merge:Bool
  want_split:Bool want_merge:Bool
  nx_cc_updated:Bool flags:(## 3) { flags = 0 }
  next_catchain_seqno:uint32 next_validator_shard:uint64
  min_ref_mc_seqno:uint32 gen_utime:uint32
  split_merge_at:FutureSplitMerge
  ^[ fees_collected:CurrencyCollection
     funds_created:CurrencyCollection ] = ShardDescr;

_ (HashmapE 32 ^(BinTree ShardDescr)) = ShardHashes;

bta_leaf$0 {X:Type} {Y:Type} extra:Y leaf:X = BinTreeAug X Y;
bta_fork$1 {X:Type} {Y:Type} left:^(BinTreeAug X Y) 
           right:^(BinTreeAug X Y) extra:Y = BinTreeAug X Y;

_ fees:CurrencyCollection create:CurrencyCollection = ShardFeeCreated;
_ (HashmapAugE 96 ShardFeeCreated ShardFeeCreated) = ShardFees;

_ config_addr:bits256 config:^(Hashmap 32 ^Cell) 
  = ConfigParams;

validator_info$_
  validator_list_hash_short:uint32 
  catchain_seqno:uint32
  nx_cc_updated:Bool
= ValidatorInfo;

validator_base_info$_
  validator_list_hash_short:uint32 
  catchain_seqno:uint32
= ValidatorBaseInfo;

_ key:Bool max_end_lt:uint64 = KeyMaxLt;
_ key:Bool blk_ref:ExtBlkRef = KeyExtBlkRef;

_ (HashmapAugE 32 KeyExtBlkRef KeyMaxLt) = OldMcBlocksInfo;


counters#_ last_updated:uint32 total:uint64 cnt2048:uint64 cnt65536:uint64 = Counters; 
creator_info#4 mc_blocks:Counters shard_blocks:Counters = CreatorStats; 
block_create_stats#17 counters:(HashmapE 256 CreatorStats) = BlockCreateStats;
block_create_stats_ext#34 counters:(HashmapAugE 256 CreatorStats uint32) = BlockCreateStats;

masterchain_state_extra#cc26
  shard_hashes:ShardHashes
  config:ConfigParams
  ^[ flags:(## 16) { flags <= 1 }
     validator_info:ValidatorInfo
     prev_blocks:OldMcBlocksInfo
     after_key_block:Bool
     last_key_block:(Maybe ExtBlkRef)
     block_create_stats:(flags . 0)?BlockCreateStats ]
  global_balance:CurrencyCollection
= McStateExtra;

ed25519_pubkey#8e81278a pubkey:bits256 = SigPubKey;  // 288 bits
ed25519_signature#5 R:bits256 s:bits256 = CryptoSignatureSimple;  // 516 bits
_ CryptoSignatureSimple = CryptoSignature;
sig_pair$_ node_id_short:bits256 sign:CryptoSignature = CryptoSignaturePair;  // 256+x ~ 772 bits

certificate#4 temp_key:SigPubKey valid_since:uint32 valid_until:uint32 = Certificate;  // 356 bits
certificate_env#a419b7d certificate:Certificate = CertificateEnv;  // 384 bits
signed_certificate$_ certificate:Certificate certificate_signature:CryptoSignature
  = SignedCertificate;  // 356+516 = 872 bits
// certificate_signature is the signature of CertificateEnv (with embedded certificate) with persistent key
chained_signature#f signed_cert:^SignedCertificate temp_key_signature:CryptoSignatureSimple
  = CryptoSignature;   // 4+(356+516)+516 = 520 bits+ref (1392 bits total)
// temp_key_signature is the signature of whatever was originally intended to be signed with temp_key from certificate

masterchain_block_extra#cca5
  key_block:(## 1)
  shard_hashes:ShardHashes
  shard_fees:ShardFees
  ^[ prev_blk_signatures:(HashmapE 16 CryptoSignaturePair)
     recover_create_msg:(Maybe ^InMsg)
     mint_msg:(Maybe ^InMsg) ]
  config:key_block?ConfigParams
= McBlockExtra;

//
//  CONFIGURATION PARAMETERS
//

validator#53 public_key:SigPubKey weight:uint64 = ValidatorDescr;
validator_addr#73 public_key:SigPubKey weight:uint64 adnl_addr:bits256 = ValidatorDescr;
validators#11 utime_since:uint32 utime_until:uint32 
  total:(## 16) main:(## 16) { main <= total } { main >= 1 } 
  list:(Hashmap 16 ValidatorDescr) = ValidatorSet;
validators_ext#12 utime_since:uint32 utime_until:uint32 
  total:(## 16) main:(## 16) { main <= total } { main >= 1 } 
  total_weight:uint64 list:(HashmapE 16 ValidatorDescr) = ValidatorSet;

_ config_addr:bits256 = ConfigParam 0;
_ elector_addr:bits256 = ConfigParam 1;
_ minter_addr:bits256 = ConfigParam 2;  // ConfigParam 0 is used if absent
_ fee_collector_addr:bits256 = ConfigParam 3;  // ConfigParam 1 is used if absent
_ dns_root_addr:bits256 = ConfigParam 4;  // root TON DNS resolver

burning_config#01
  blackhole_addr:(Maybe bits256)
  fee_burn_num:# fee_burn_denom:# { fee_burn_num <= fee_burn_denom } { fee_burn_denom >= 1 } = BurningConfig;
_ BurningConfig = ConfigParam 5;

_ mint_new_price:Grams mint_add_price:Grams = ConfigParam 6;
_ to_mint:ExtraCurrencyCollection = ConfigParam 7;

capabilities#c4 version:uint32 capabilities:uint64 = GlobalVersion;
_ GlobalVersion = ConfigParam 8;  // all zero if absent
_ mandatory_params:(Hashmap 32 True) = ConfigParam 9;
_ critical_params:(Hashmap 32 True) = ConfigParam 10;

cfg_vote_cfg#36 min_tot_rounds:uint8 max_tot_rounds:uint8 min_wins:uint8 max_losses:uint8 min_store_sec:uint32 max_store_sec:uint32 bit_price:uint32 cell_price:uint32 = ConfigProposalSetup;
cfg_vote_setup#91 normal_params:^ConfigProposalSetup critical_params:^ConfigProposalSetup = ConfigVotingSetup;
_ ConfigVotingSetup = ConfigParam 11;

cfg_proposal#f3 param_id:int32 param_value:(Maybe ^Cell) if_hash_equal:(Maybe uint256) 
  = ConfigProposal;
cfg_proposal_status#ce expires:uint32 proposal:^ConfigProposal is_critical:Bool
  voters:(HashmapE 16 True) remaining_weight:int64 validator_set_id:uint256 
  rounds_remaining:uint8 wins:uint8 losses:uint8 = ConfigProposalStatus;

wfmt_basic#1 vm_version:int32 vm_mode:uint64 = WorkchainFormat 1;
wfmt_ext#0 min_addr_len:(## 12) max_addr_len:(## 12) addr_len_step:(## 12)
  { min_addr_len >= 64 } { min_addr_len <= max_addr_len } 
  { max_addr_len <= 1023 } { addr_len_step <= 1023 }
  workchain_type_id:(## 32) { workchain_type_id >= 1 }
  = WorkchainFormat 0;

wc_split_merge_timings#0
  split_merge_delay:uint32 split_merge_interval:uint32
  min_split_merge_interval:uint32 max_split_merge_delay:uint32
  = WcSplitMergeTimings;

//workchain#a5 enabled_since:uint32 min_split:(## 8) max_split:(## 8)
//  { min_split <= max_split } { max_split <= 60 }

workchain#a6 enabled_since:uint32 monitor_min_split:(## 8)
  min_split:(## 8) max_split:(## 8) { monitor_min_split <= min_split }
  basic:(## 1) active:Bool accept_msgs:Bool flags:(## 13) { flags = 0 }
  zerostate_root_hash:bits256 zerostate_file_hash:bits256
  version:uint32 format:(WorkchainFormat basic)
  = WorkchainDescr;

workchain_v2#a7 enabled_since:uint32 monitor_min_split:(## 8)
  min_split:(## 8) max_split:(## 8) { monitor_min_split <= min_split }
  basic:(## 1) active:Bool accept_msgs:Bool flags:(## 13) { flags = 0 }
  zerostate_root_hash:bits256 zerostate_file_hash:bits256
  version:uint32 format:(WorkchainFormat basic)
  split_merge_timings:WcSplitMergeTimings
  persistent_state_split_depth:(## 8) { persistent_state_split_depth <= 63 }
  = WorkchainDescr;

_ workchains:(HashmapE 32 WorkchainDescr) = ConfigParam 12;

complaint_prices#1a deposit:Grams bit_price:Grams cell_price:Grams = ComplaintPricing; 
_ ComplaintPricing = ConfigParam 13;

block_grams_created#6b masterchain_block_fee:Grams basechain_block_fee:Grams
  = BlockCreateFees;
_ BlockCreateFees = ConfigParam 14;

_ validators_elected_for:uint32 elections_start_before:uint32 
  elections_end_before:uint32 stake_held_for:uint32
  = ConfigParam 15;
  
_ max_validators:(## 16) max_main_validators:(## 16) min_validators:(## 16) 
  { max_validators >= max_main_validators } 
  { max_main_validators >= min_validators } 
  { min_validators >= 1 }
  = ConfigParam 16;

_ min_stake:Grams max_stake:Grams min_total_stake:Grams max_stake_factor:uint32 = ConfigParam 17;

_#cc utime_since:uint32 bit_price_ps:uint64 cell_price_ps:uint64 
  mc_bit_price_ps:uint64 mc_cell_price_ps:uint64 = StoragePrices;
_ (Hashmap 32 StoragePrices) = ConfigParam 18;

_ global_id:int32 = ConfigParam 19;

gas_prices#dd gas_price:uint64 gas_limit:uint64 gas_credit:uint64 
  block_gas_limit:uint64 freeze_due_limit:uint64 delete_due_limit:uint64 
  = GasLimitsPrices;

gas_prices_ext#de gas_price:uint64 gas_limit:uint64 special_gas_limit:uint64 gas_credit:uint64 
  block_gas_limit:uint64 freeze_due_limit:uint64 delete_due_limit:uint64 
  = GasLimitsPrices;

gas_flat_pfx#d1 flat_gas_limit:uint64 flat_gas_price:uint64 other:GasLimitsPrices
  = GasLimitsPrices;

config_mc_gas_prices#_ GasLimitsPrices = ConfigParam 20;
config_gas_prices#_ GasLimitsPrices = ConfigParam 21;

param_limits#c3 underload:# soft_limit:# { underload <= soft_limit }
  hard_limit:# { soft_limit <= hard_limit } = ParamLimits;
block_limits#5d bytes:ParamLimits gas:ParamLimits lt_delta:ParamLimits
  = BlockLimits;
  
config_mc_block_limits#_ BlockLimits = ConfigParam 22;
config_block_limits#_ BlockLimits = ConfigParam 23;

// msg_fwd_fees = (lump_price + ceil((bit_price * msg.bits + cell_price * msg.cells)/2^16)) nanograms
// ihr_fwd_fees = ceil((msg_fwd_fees * ihr_price_factor)/2^16) nanograms
// bits in the root cell of a message are not included in msg.bits (lump_price pays for them)
msg_forward_prices#ea lump_price:uint64 bit_price:uint64 cell_price:uint64
  ihr_price_factor:uint32 first_frac:uint16 next_frac:uint16 = MsgForwardPrices;

// used for messages to/from masterchain
config_mc_fwd_prices#_ MsgForwardPrices = ConfigParam 24;
// used for all other messages
config_fwd_prices#_ MsgForwardPrices = ConfigParam 25;

catchain_config#c1 mc_catchain_lifetime:uint32 shard_catchain_lifetime:uint32 
  shard_validators_lifetime:uint32 shard_validators_num:uint32 = CatchainConfig;

catchain_config_new#c2 flags:(## 7) { flags = 0 } shuffle_mc_validators:Bool
  mc_catchain_lifetime:uint32 shard_catchain_lifetime:uint32
  shard_validators_lifetime:uint32 shard_validators_num:uint32 = CatchainConfig;

consensus_config#d6 round_candidates:# { round_candidates >= 1 }
  next_candidate_delay_ms:uint32 consensus_timeout_ms:uint32
  fast_attempts:uint32 attempt_duration:uint32 catchain_max_deps:uint32
  max_block_bytes:uint32 max_collated_bytes:uint32 = ConsensusConfig;

consensus_config_new#d7 flags:(## 7) { flags = 0 } new_catchain_ids:Bool
  round_candidates:(## 8) { round_candidates >= 1 }
  next_candidate_delay_ms:uint32 consensus_timeout_ms:uint32
  fast_attempts:uint32 attempt_duration:uint32 catchain_max_deps:uint32
  max_block_bytes:uint32 max_collated_bytes:uint32 = ConsensusConfig;

consensus_config_v3#d8 flags:(## 7) { flags = 0 } new_catchain_ids:Bool
  round_candidates:(## 8) { round_candidates >= 1 }
  next_candidate_delay_ms:uint32 consensus_timeout_ms:uint32
  fast_attempts:uint32 attempt_duration:uint32 catchain_max_deps:uint32
  max_block_bytes:uint32 max_collated_bytes:uint32 
  proto_version:uint16 = ConsensusConfig;

consensus_config_v4#d9 flags:(## 7) { flags = 0 } new_catchain_ids:Bool
  round_candidates:(## 8) { round_candidates >= 1 }
  next_candidate_delay_ms:uint32 consensus_timeout_ms:uint32
  fast_attempts:uint32 attempt_duration:uint32 catchain_max_deps:uint32
  max_block_bytes:uint32 max_collated_bytes:uint32
  proto_version:uint16 catchain_max_blocks_coeff:uint32 = ConsensusConfig;

_ CatchainConfig = ConfigParam 28;
_ ConsensusConfig = ConfigParam 29;

_ fundamental_smc_addr:(HashmapE 256 True) = ConfigParam 31;
_ prev_validators:ValidatorSet = ConfigParam 32;
_ prev_temp_validators:ValidatorSet = ConfigParam 33;
_ cur_validators:ValidatorSet = ConfigParam 34;
_ cur_temp_validators:ValidatorSet = ConfigParam 35;
_ next_validators:ValidatorSet = ConfigParam 36;
_ next_temp_validators:ValidatorSet = ConfigParam 37;

validator_temp_key#3 adnl_addr:bits256 temp_public_key:SigPubKey seqno:# valid_until:uint32 = ValidatorTempKey;
signed_temp_key#4 key:^ValidatorTempKey signature:CryptoSignature = ValidatorSignedTempKey;
_ (HashmapE 256 ValidatorSignedTempKey) = ConfigParam 39;

misbehaviour_punishment_config_v1#01 
  default_flat_fine:Grams default_proportional_fine:uint32
  severity_flat_mult:uint16 severity_proportional_mult:uint16
  unpunishable_interval:uint16
  long_interval:uint16 long_flat_mult:uint16 long_proportional_mult:uint16
  medium_interval:uint16 medium_flat_mult:uint16 medium_proportional_mult:uint16
   = MisbehaviourPunishmentConfig;
_ MisbehaviourPunishmentConfig = ConfigParam 40;

size_limits_config#01 max_msg_bits:uint32 max_msg_cells:uint32 max_library_cells:uint32 max_vm_data_depth:uint16
  max_ext_msg_size:uint32 max_ext_msg_depth:uint16 = SizeLimitsConfig;
size_limits_config_v2#02 max_msg_bits:uint32 max_msg_cells:uint32 max_library_cells:uint32 max_vm_data_depth:uint16
  max_ext_msg_size:uint32 max_ext_msg_depth:uint16 max_acc_state_cells:uint32 max_acc_state_bits:uint32
  max_acc_public_libraries:uint32 defer_out_queue_size_limit:uint32 max_msg_extra_currencies:uint32
  max_acc_fixed_prefix_length:uint8 = SizeLimitsConfig;
_ SizeLimitsConfig = ConfigParam 43;

// key is [ wc:int32 addr:uint256 ]
suspended_address_list#00 addresses:(HashmapE 288 Unit) suspended_until:uint32 = SuspendedAddressList;
_ SuspendedAddressList = ConfigParam 44;

precompiled_smc#b0 gas_usage:uint64 = PrecompiledSmc;
precompiled_contracts_config#c0 list:(HashmapE 256 PrecompiledSmc) = PrecompiledContractsConfig;
_ PrecompiledContractsConfig = ConfigParam 45;

oracle_bridge_params#_ bridge_address:bits256 oracle_mutlisig_address:bits256 oracles:(HashmapE 256 uint256) external_chain_address:bits256 = OracleBridgeParams;
_ OracleBridgeParams = ConfigParam 71; // Ethereum bridge
_ OracleBridgeParams = ConfigParam 72; // Binance Smart Chain bridge
_ OracleBridgeParams = ConfigParam 73; // Polygon bridge

// Note that chains in which bridge, minter and jetton-wallet operate are fixated
jetton_bridge_prices#_ bridge_burn_fee:Coins bridge_mint_fee:Coins
                       wallet_min_tons_for_storage:Coins
                       wallet_gas_consumption:Coins
                       minter_min_tons_for_storage:Coins
                       discover_gas_consumption:Coins = JettonBridgePrices;

jetton_bridge_params_v0#00 bridge_address:bits256 oracles_address:bits256 oracles:(HashmapE 256 uint256) state_flags:uint8 burn_bridge_fee:Coins = JettonBridgeParams;
jetton_bridge_params_v1#01 bridge_address:bits256 oracles_address:bits256 oracles:(HashmapE 256 uint256) state_flags:uint8 prices:^JettonBridgePrices external_chain_address:bits256 = JettonBridgeParams;

_ JettonBridgeParams = ConfigParam 79; // ETH->TON token bridge
_ JettonBridgeParams = ConfigParam 81; // BNB->TON token bridge
_ JettonBridgeParams = ConfigParam 82; // Polygon->TON token bridge


//
//  PROOFS
//
block_signatures_pure#_ sig_count:uint32 sig_weight:uint64
  signatures:(HashmapE 16 CryptoSignaturePair) = BlockSignaturesPure;
block_signatures#11 validator_info:ValidatorBaseInfo pure_signatures:BlockSignaturesPure = BlockSignatures;
block_proof#c3 proof_for:BlockIdExt root:^Cell signatures:(Maybe ^BlockSignatures) = BlockProof;

chain_empty$_ = ProofChain 0;
chain_link$_ {n:#} root:^Cell prev:n?^(ProofChain n) = ProofChain (n + 1);
top_block_descr#d5 proof_for:BlockIdExt signatures:(Maybe ^BlockSignatures) 
  len:(## 8) { len >= 1 } { len <= 8 } chain:(ProofChain len) = TopBlockDescr;

//
//  COLLATED DATA
//
top_block_descr_set#4ac789f3 collection:(HashmapE 96 ^TopBlockDescr) = TopBlockDescrSet;

//
//  VALIDATOR MISBEHAVIOR COMPLAINTS
//
prod_info#34 utime:uint32 mc_blk_ref:ExtBlkRef state_proof:^(MERKLE_PROOF Block)
  prod_proof:^(MERKLE_PROOF ShardState) = ProducerInfo;
no_blk_gen from_utime:uint32 prod_info:^ProducerInfo = ComplaintDescr;
no_blk_gen_diff prod_info_old:^ProducerInfo prod_info_new:^ProducerInfo = ComplaintDescr;
validator_complaint#bc validator_pubkey:bits256 description:^ComplaintDescr created_at:uint32 severity:uint8 reward_addr:uint256 paid:Grams suggested_fine:Grams suggested_fine_part:uint32 = ValidatorComplaint;
complaint_status#2d complaint:^ValidatorComplaint voters:(HashmapE 16 True) vset_id:uint256 weight_remaining:int64 = ValidatorComplaintStatus;

//
//  TVM REFLECTION
//
vm_stk_null#00 = VmStackValue;
vm_stk_tinyint#01 value:int64 = VmStackValue;
vm_stk_int#0201_ value:int257 = VmStackValue;
vm_stk_nan#02ff = VmStackValue;
vm_stk_cell#03 cell:^Cell = VmStackValue;
_ cell:^Cell st_bits:(## 10) end_bits:(## 10) { st_bits <= end_bits }
  st_ref:(#<= 4) end_ref:(#<= 4) { st_ref <= end_ref } = VmCellSlice;
vm_stk_slice#04 _:VmCellSlice = VmStackValue;
vm_stk_builder#05 cell:^Cell = VmStackValue;
vm_stk_cont#06 cont:VmCont = VmStackValue;
vm_tupref_nil$_ = VmTupleRef 0;
vm_tupref_single$_ entry:^VmStackValue = VmTupleRef 1;
vm_tupref_any$_ {n:#} ref:^(VmTuple (n + 2)) = VmTupleRef (n + 2);
vm_tuple_nil$_ = VmTuple 0;
vm_tuple_tcons$_ {n:#} head:(VmTupleRef n) tail:^VmStackValue = VmTuple (n + 1);
vm_stk_tuple#07 len:(## 16) data:(VmTuple len) = VmStackValue;

vm_stack#_ depth:(## 24) stack:(VmStackList depth) = VmStack;
vm_stk_cons#_ {n:#} rest:^(VmStackList n) tos:VmStackValue = VmStackList (n + 1);
vm_stk_nil#_ = VmStackList 0;

_ cregs:(HashmapE 4 VmStackValue) = VmSaveList;
gas_limits#_ remaining:int64 _:^[ max_limit:int64 cur_limit:int64 credit:int64 ]
  = VmGasLimits;
_ libraries:(HashmapE 256 ^Cell) = VmLibraries;

vm_ctl_data$_ nargs:(Maybe uint13) stack:(Maybe VmStack) save:VmSaveList
cp:(Maybe int16) = VmControlData;
vmc_std$00 cdata:VmControlData code:VmCellSlice = VmCont;
vmc_envelope$01 cdata:VmControlData next:^VmCont = VmCont;
vmc_quit$1000 exit_code:int32 = VmCont;
vmc_quit_exc$1001 = VmCont;
vmc_repeat$10100 count:uint63 body:^VmCont after:^VmCont = VmCont; 
vmc_until$110000 body:^VmCont after:^VmCont = VmCont;
vmc_again$110001 body:^VmCont = VmCont;
vmc_while_cond$110010 cond:^VmCont body:^VmCont
after:^VmCont = VmCont;
vmc_while_body$110011 cond:^VmCont body:^VmCont
after:^VmCont = VmCont;
vmc_pushint$1111 value:int32 next:^VmCont = VmCont;

//
//  DNS RECORDS
//
_ (HashmapE 256 ^DNSRecord) = DNS_RecordSet;

chunk_ref$_ {n:#} ref:^(TextChunks (n + 1)) = TextChunkRef (n + 1);
chunk_ref_empty$_ = TextChunkRef 0;
text_chunk$_ {n:#} len:(## 8) data:(bits (len * 8)) next:(TextChunkRef n) = TextChunks (n + 1);
text_chunk_empty$_ = TextChunks 0;
text$_ chunks:(## 8) rest:(TextChunks chunks) = Text;
dns_text#1eda _:Text = DNSRecord;

dns_next_resolver#ba93 resolver:MsgAddressInt = DNSRecord;  // usually in record #-1

dns_adnl_address#ad01 adnl_addr:bits256 flags:(## 8) { flags <= 1 }
  proto_list:flags . 0?ProtoList = DNSRecord;  // often in record #2
proto_list_nil$0 = ProtoList;
proto_list_next$1 head:Protocol tail:ProtoList = ProtoList;
proto_http#4854 = Protocol;

dns_smc_address#9fd3 smc_addr:MsgAddressInt flags:(## 8) { flags <= 1 }
  cap_list:flags . 0?SmcCapList = DNSRecord;   // often in record #1
cap_list_nil$0 = SmcCapList;
cap_list_next$1 head:SmcCapability tail:SmcCapList = SmcCapList;
cap_method_seqno#5371 = SmcCapability;
cap_method_pubkey#71f4 = SmcCapability;
cap_is_wallet#2177 = SmcCapability;
cap_name#ff name:Text = SmcCapability;

dns_storage_address#7473 bag_id:bits256 = DNSRecord;

//
// PAYMENT CHANNELS
//

chan_config$_  init_timeout:uint32 close_timeout:uint32 a_key:bits256 b_key:bits256 
  a_addr:^MsgAddressInt b_addr:^MsgAddressInt channel_id:uint64 min_A_extra:Grams = ChanConfig;

chan_state_init$000  signed_A:Bool signed_B:Bool min_A:Grams min_B:Grams expire_at:uint32 A:Grams B:Grams = ChanState;
chan_state_close$001 signed_A:Bool signed_B:Bool promise_A:Grams promise_B:Grams expire_at:uint32 A:Grams B:Grams = ChanState;
chan_state_payout$010 A:Grams B:Grams = ChanState;

chan_promise$_ channel_id:uint64 promise_A:Grams promise_B:Grams = ChanPromise;
chan_signed_promise#_ sig:(Maybe ^bits512) promise:ChanPromise = ChanSignedPromise;

chan_msg_init#27317822 inc_A:Grams inc_B:Grams min_A:Grams min_B:Grams channel_id:uint64 = ChanMsg;
chan_msg_close#f28ae183 extra_A:Grams extra_B:Grams promise:ChanSignedPromise  = ChanMsg;
chan_msg_timeout#43278a28 = ChanMsg;
chan_msg_payout#37fe7810 = ChanMsg;

chan_signed_msg$_ sig_A:(Maybe ^bits512) sig_B:(Maybe ^bits512) msg:ChanMsg = ChanSignedMsg;

chan_op_cmd#912838d1 msg:ChanSignedMsg = ChanOp;


chan_data$_ config:^ChanConfig state:^ChanState = ChanData;
`),_t}var nn;function ai(){return nn||(nn=1,(function(m){Object.defineProperty(m,"__esModule",{value:!0}),m.crc32=m.blockSchema=m.unwrap=m.TLBSchemaError=m.TLBRuntimeError=m.TLBDataError=m.runtimeBy=m.runtimeBySchema=m.TLBRuntime=m.decodeCell=m.encodeCell=m.replacer=void 0;var _=ii();Object.defineProperty(m,"replacer",{enumerable:!0,get:function(){return _.replacer}}),Object.defineProperty(m,"encodeCell",{enumerable:!0,get:function(){return _.encodeCell}}),Object.defineProperty(m,"decodeCell",{enumerable:!0,get:function(){return _.decodeCell}});var g=pn();Object.defineProperty(m,"TLBRuntime",{enumerable:!0,get:function(){return g.TLBRuntime}}),Object.defineProperty(m,"runtimeBySchema",{enumerable:!0,get:function(){return g.runtimeBySchema}}),Object.defineProperty(m,"runtimeBy",{enumerable:!0,get:function(){return g.runtimeBy}});var d=Mt();Object.defineProperty(m,"TLBDataError",{enumerable:!0,get:function(){return d.TLBDataError}}),Object.defineProperty(m,"TLBRuntimeError",{enumerable:!0,get:function(){return d.TLBRuntimeError}}),Object.defineProperty(m,"TLBSchemaError",{enumerable:!0,get:function(){return d.TLBSchemaError}});var v=cn();Object.defineProperty(m,"unwrap",{enumerable:!0,get:function(){return v.unwrap}});var h=si();Object.defineProperty(m,"blockSchema",{enumerable:!0,get:function(){return h.blockSchema}});var s=un();Object.defineProperty(m,"crc32",{enumerable:!0,get:function(){return s.crc32}})})(Xt)),Xt}var At=ai();const oi="message#_ len:(## 7) { len <= 127 } text:(bits (len * 8)) = Message;",li="te6cckEBAQEAFwAAKSioyuboQNrK5ubCzspA0txAxsrY2Whv0fw=";class Lt{bocFormat=1;boc="";data="{}";runtime=At.unwrap(At.TLBRuntime.from(""));constructor(_,g,d){this.updateSchema(_),g?this.updateBoc(g):d&&this.updateData(d)}get state(){return{bocFormat:this.bocFormat,schema:this.runtime.schema,boc:this.boc,data:this.data}}static get default(){return new Lt(oi,li)}static from(_){const g=new Lt(_);return g.updateSchema(_),g}updateSchema(_,g=0){if(!_||_.trim()==="")return{success:!1,error:new Error("Schema cannot be empty")};if(_=_.replace("block.tlb",At.blockSchema),this.runtime.schema===_)return{success:!0,value:this.state};const d=this.runtime.changeSchema(_);return d.success?(this.runtime=d.value,g===0?this.updateBoc(this.boc):this.updateData(this.data)):d}updateBoc(_){if(!_||_.trim()==="")return this.boc="",this.data="{}",{success:!0,value:this.state};this.boc=_;try{const g=this.runtime.decodeCell(this.boc);this.data=JSON.stringify(g,At.replacer,2)}catch(g){return{success:!1,error:new Error(`Parse ${g instanceof Error?g.message:"unknown error"}`)}}return{success:!0,value:this.state}}updateData(_){this.data=_.trim();try{const g=JSON.parse(this.data),d=this.runtime.encodeCell(g).toBoc();switch(this.bocFormat){case 0:this.boc=d.toString("hex");break;case 1:default:this.boc=d.toString("base64")}}catch(g){return{success:!1,error:new Error(`Encode ${g instanceof Error?g.message:"unknown error"}`)}}return{success:!0,value:this.state}}}class ci{processor;schemaField=null;bocField=null;dataField=null;schemaErrorSpan=null;bocErrorSpan=null;dataErrorSpan=null;isUpdating=!1;constructor(){this.processor=Lt.default,this.initializeUI(),this.setupEventListeners(),this.updateFieldsFromCore()}initializeUI(){this.schemaField=document.querySelector('textarea[name="schema"]'),this.bocField=document.querySelector('textarea[name="boc"]'),this.dataField=document.querySelector('textarea[name="data"]'),this.schemaErrorSpan=document.getElementById("schema-error"),this.bocErrorSpan=document.getElementById("boc-error"),this.dataErrorSpan=document.getElementById("data-error")}setupEventListeners(){this.schemaField&&this.schemaField.addEventListener("input",_=>{const g=_.target;this.handleSchemaChange(g.value)}),this.bocField&&this.bocField.addEventListener("input",_=>{const g=_.target;this.handleBocChange(g.value)}),this.dataField&&this.dataField.addEventListener("input",_=>{const g=_.target;this.handleDataChange(g.value)})}handleSchemaChange(_){if(this.isUpdating)return;const g=this.processor.updateSchema(_);this.handleResult(g,"schema")}handleBocChange(_){this.isUpdating||this.handleResult(this.processor.updateBoc(_),"boc")}handleDataChange(_){if(this.isUpdating)return;const g=this.processor.updateData(_);this.handleResult(g,"data")}handleResult(_,g){_.success?(this.hideFieldError(g),this.updateFieldsFromData(_.value)):this.showFieldError(_.error.message,g)}updateFieldsFromCore(){this.updateFieldsFromData(this.processor.state)}updateFieldsFromData(_){this.isUpdating=!0;try{this.schemaField&&this.schemaField.value!==_.schema&&(this.schemaField.value=_.schema),this.bocField&&this.bocField.value!==_.boc&&(this.bocField.value=_.boc),this.dataField&&this.dataField.value!==_.data&&(this.dataField.value=_.data)}finally{this.isUpdating=!1}}showFieldError(_,g){let d=null,v=null;switch(g){case"schema":d=this.schemaErrorSpan,v=this.schemaField;break;case"boc":d=this.bocErrorSpan,v=this.bocField;break;case"data":d=this.dataErrorSpan,v=this.dataField;break}d&&v&&(d.textContent=_,d.style.display="inline",v.classList.add("field-error-border"))}hideFieldError(_){let g=null,d=null;switch(_){case"schema":g=this.schemaErrorSpan,d=this.schemaField;break;case"boc":g=this.bocErrorSpan,d=this.bocField;break;case"data":g=this.dataErrorSpan,d=this.dataField;break}g&&d&&(g.style.display="none",d.classList.remove("field-error-border"))}}new ci;
