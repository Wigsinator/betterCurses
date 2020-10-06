export function log(data, force = false) {
  if (force || game.settings.get('betterCurses', 'debug')) {
    if (typeof data === 'string') console.log(`betterCurses | ${data}`);
    else console.log(data);
  }
}