export function log(data, force = false) {
  if (force || game.settings.get('betterCurses', 'debug')) {
    if (typeof data === 'string') console.log(`betterCurses | ${data}`);
    else console.log(data);
  }
}

export function GetAllFlags(entity, scope) {
    const scopes = game.getPackageScopes();
    if (!scopes.includes(scope)) return;
    return getProperty(entity.data.flags, scope);
}