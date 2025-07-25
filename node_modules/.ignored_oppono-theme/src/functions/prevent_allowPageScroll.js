export function allowPageScroll(element = window) {
  element.removeEventListener && element.removeEventListener('DOMMouseScroll', preventScrollDefault, false);
  element.removeEventListener('wheel', preventScrollDefault);
  element.removeEventListener('mousewheel', preventScrollDefault);
  element.removeEventListener('touchmove', preventScrollDefault);
  element.removeEventListener('keydown', preventKeydownDefault);
  document.body.removeEventListener('touchmove', preventScrollDefault);
}

export function preventPageScroll(element = window) {
  element.addEventListener && element.addEventListener('DOMMouseScroll', preventScrollDefault, false);
  element.addEventListener('wheel', preventScrollDefault, {passive: false});
  element.addEventListener('mousewheel', preventScrollDefault, {passive: false});
  element.addEventListener('touchmove', preventScrollDefault, {passive: false});
  element.addEventListener('keydown', preventKeydownDefault, {passive: false});
  document.body.addEventListener('touchmove', preventScrollDefault, {passive: false});
}


function preventScrollDefault(e) {
  (e = e || window.event).preventDefault && e.preventDefault();
  e.returnValue = false;
}

function preventKeydownDefault(e) {
  var r = {
    37: 1,
    38: 1,
    39: 1,
    40: 1,
    32: 1,
    33: 1,
    34: 1,
    35: 1,
    36: 1,
  };
  if (r[e.keyCode]) {
    preventScrollDefault(e);
    return false;
  }
}