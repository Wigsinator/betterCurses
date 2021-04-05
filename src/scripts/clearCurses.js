import { log } from "./helpers.js"

function clearCursesOnActor(actor){
  if (typeof(actor.data.flags.betterCurses) == "object"){
    log(`Clearing Curses on ${actor.data.name}`);
    Object.keys(actor.data.flags.betterCurses).forEach(a => actor.unsetFlag("betterCurses",a));
  } 
}

export function clearCursesOnControlledActors(){
  let controlledTokens = canvas.tokens.controlled;
  log(controlledTokens);
  for (var controlledToken of controlledTokens){
    clearCursesOnActor(controlledToken.actor);
  }
  return controlledTokens.length;
}

export function totalReset(){
  game.actors.forEach(actor => clearCursesOnActor(actor));
  Object.values(game.actors.tokens).forEach(actor => clearCursesOnActor(actor));
}