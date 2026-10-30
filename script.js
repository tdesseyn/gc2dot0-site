(function(){
var q=document.getElementById('q');if(!q)return;
var items=[].slice.call(document.querySelectorAll('ol.eps li'));
var idx={};var data=window.GC2||[];for(var i=0;i<data.length;i++){idx[data[i][0]]=data[i][1];}
var cnt=document.getElementById('count');var empty=document.getElementById('empty');var feat=document.getElementById('feat');
function run(){var v=q.value.toLowerCase().trim();var words=v.split(/\s+/).filter(Boolean);var shown=0;
items.forEach(function(li){var t=idx[li.id]||li.textContent.toLowerCase();var ok=words.every(function(w){return t.indexOf(w)>-1});li.hidden=!ok;if(ok)shown++;});
cnt.textContent=v?shown+' of '+items.length+' episodes match':items.length+' episodes, newest first';
empty.hidden=shown>0; if(feat)feat.hidden=!!v;}
q.addEventListener('input',run);
var m=location.hash.match(/^#q=(.+)$/);if(m){q.value=decodeURIComponent(m[1]);}
run();
})();
