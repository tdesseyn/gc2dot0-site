
// click-to-load youtube embeds (keeps the page fast; youtube loads only when asked)
document.querySelectorAll('.yt').forEach(function (box) {
  var btn = box.querySelector('.yt-play'); if (!btn) return;
  btn.addEventListener('click', function () {
    var id = box.getAttribute('data-id');
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    f.title = btn.getAttribute('aria-label') || 'video';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.setAttribute('allowfullscreen', '');
    btn.replaceWith(f);
  });
});
// "join" buttons in the header scroll to the nearest signup form on the current page
document.querySelectorAll('a[href="#join"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var t = document.getElementById('join'); if (!t) return;
    e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    var inp = t.querySelector('iframe'); if (inp) setTimeout(function(){ try{inp.focus()}catch(_){} }, 600);
  });
});

// analytics (goatcounter events). the beehiiv form is an iframe, so the page sees a tap into it
// ("newsletter-form-tap") and any success message beehiiv posts back ("newsletter-signup").
// beehiiv's own subscriber list (referring site) is the source of truth for real signups.
(function () {
  function gc(name) { try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: name, title: name, event: true }); } catch (_) {} }
  var tapped = false, signed = false;
  window.addEventListener('blur', function () {
    setTimeout(function () {
      var a = document.activeElement;
      if (!tapped && a && a.tagName === 'IFRAME' && /beehiiv/.test(a.src || '')) { tapped = true; gc('newsletter-form-tap'); }
    }, 0);
  });
  window.addEventListener('message', function (e) {
    if (signed || !/beehiiv/.test(e.origin || '')) return;
    var d = e.data; try { d = typeof d === 'string' ? d : JSON.stringify(d); } catch (_) { return; }
    if (/success|subscribed/i.test(d || '')) { signed = true; gc('newsletter-signup'); }
  });
})();
