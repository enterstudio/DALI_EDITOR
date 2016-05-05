/**
 * XMLWriter - XML generator for Javascript, based on .NET's XMLTextWriter.
 * Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Licensed under BSD (http://www.opensource.org/licenses/bsd-license.php)
 * Date: 3/12/2008
 * @version 1.0.0
 * @author Ariel Flesler
 * http://flesler.blogspot.com/2008/03/xmlwriter-for-javascript.html
 */
function XMLWriter(a,b){if(a)this.encoding=a;if(b)this.version=b};(function(){XMLWriter.prototype={encoding:'ISO-8859-1',version:'1.0',formatting:'indented',indentChar:'\t',indentation:1,newLine:'\n',writeStartDocument:function(a){this.close();this.stack=[];this.standalone=a},writeEndDocument:function(){this.active=this.root;this.stack=[]},writeDocType:function(a){this.doctype=a},writeStartElement:function(c,d){if(d)c=d+':'+c;var a=this,b=a.active,e={n:c,a:{},c:[]};if(b){b.c.push(e);this.stack.push(b)}else a.root=e;a.active=e},writeEndElement:function(){this.active=this.stack.pop()||this.root},writeAttributeString:function(a,b){if(this.active)this.active.a[a]=b},writeString:function(a){if(this.active)this.active.c.push(a)},writeElementString:function(a,b,c){this.writeStartElement(a,c);this.writeString(b);this.writeEndElement()},writeCDATA:function(a){this.writeString('<![CDATA['+a+']]>')},writeComment:function(a){this.writeString('<!-- '+a+' -->')},flush:function(){var a=this,b='',c='',d=a.indentation,e=a.formatting.toLowerCase()=='indented',f='<?xml version="'+a.version+'" encoding="'+a.encoding+'"';if(a.stack&&a.stack[0])a.writeEndDocument();if(a.standalone!==undefined)f+=' standalone="'+!!a.standalone+'"';f+=' ?>';f=[f];if(a.doctype&&a.root)f.push('<!DOCTYPE '+a.root.n+' '+a.doctype+'>');if(e){while(d--)b+=a.indentChar}if(a.root)k(a.root,c,b,f);return f.join(e?a.newLine:'')},close:function(){var a=this;if(a.root)j(a.root);a.active=a.root=a.stack=null},getDocument:window.ActiveXObject?function(){var a=new ActiveXObject('Microsoft.XMLDOM');a.async=!1;a.loadXML(this.flush());return a}:function(){return(new DOMParser()).parseFromString(this.flush(),'text/xml')}};function j(a){var l=a.c.length;while(l--){if(typeof a.c[l]=='object')j(a.c[l])}a.n=a.a=a.c=null};function k(a,b,c,d){var e=b+'<'+a.n,f=a.c.length,g,h,i=0;for(g in a.a)e+=' '+g+'="'+a.a[g]+'"';e+=f?'>':' />';d.push(e);if(f){do{h=a.c[i++];if(typeof h=='string'){if(f==1)return d.push(d.pop()+h+'</'+a.n+'>');else d.push(b+c+h)}else if(typeof h=='object')k(h,b+c,c,d)}while(i<f);d.push(b+'</'+a.n+'>')}}})();