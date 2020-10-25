import { log } from "./helpers.js"

function clearCursesOnActor(actor){
  log(`Clearing Curses on ${actor.data.name}`);
  actor.data.flags.betterCurses = {};
}

export function clearCursesOnControlledActors(){
  let controlledTokens = canvas.tokens.controlled;
  log(controlledTokens);
  for (var controlledToken of controlledTokens){
    clearCursesOnActor(controlledToken.actor);
  }
  return controlledTokens.length;
}