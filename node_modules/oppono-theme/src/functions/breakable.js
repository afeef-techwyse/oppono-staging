export function breakable(text) {
  return text.split('\n').map((item) => `${item}${'\n'}`).concat('');
}