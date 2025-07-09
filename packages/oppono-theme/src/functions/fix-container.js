export function fixContainer() {
  if (window.innerWidth > 1920) {
    document.documentElement.style.fontSize = `${1920 / 1440 * 10}px`;
  }
  else if (window.innerWidth >= 992) {
    document.documentElement.style.fontSize = `${10 * window.innerWidth / 1440}px`;
  }
  else if (window.innerWidth < 992 && window.innerWidth >= 768) {
    document.documentElement.style.fontSize = `${10}px`;
  }
  else if (window.innerWidth < 768 && window.innerWidth >= 576) {
    document.documentElement.style.fontSize = `${10 * window.innerWidth / 768}px`;
  }
  else if (window.innerWidth < 576 && window.innerWidth >= 376) {
    document.documentElement.style.fontSize = `${10}px`;
  }
  else {
    document.documentElement.style.fontSize = `${10 * window.innerWidth / 375}px`;
  }
}