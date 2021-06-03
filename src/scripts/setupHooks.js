import { log, GetAllFlags } from "./helpers.js"
import { clearEffects } from "./clearEffects.js"
import { applyEffects } from "./applyEffects.js"

export function setupControlHook(){
  return Hooks.on("controlToken", (controlledToken, selected) => {
    if (GetAllFlags(controlledToken, 'multilevel-tokens')) return;
    clearEffects(controlledToken.actor).then(() => {
      let targetIds = Array.from(game.user.targets, t=> t.id);
      if (selected && targetIds.length == 1) {
        applyEffects(controlledToken.actor, canvas.tokens.get(targetIds[0]).actor);
      }
    });
  })
}

export function setupTargetHook(){
  return Hooks.on("targetToken", handleTarget => {
    log(`Token Target changed`)
    let targetIds = Array.from(game.user.targets, t=> t.id);
    let controlledTokens = canvas.tokens.controlled;
    log(controlledTokens);
    if (targetIds.length == 1){
      for (var controlledToken of controlledTokens){
        if (GetAllFlags(controlledToken, 'multilevel-tokens')) continue;
        applyEffects(controlledToken.actor, canvas.tokens.get(targetIds[0]).actor);
      }
    } else {
      for (var controlledToken of controlledTokens){
        if (GetAllFlags(controlledToken, 'multilevel-tokens')) continue;
        clearEffects(controlledToken.actor);
      }
    }
  })
}