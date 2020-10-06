import { log } from "./helpers.js"
import { clearEffects } from "./clearEffects.js"
import { applyEffects } from "./applyEffects.js"

export function setupControlHook(){
  return Hooks.on("controlToken", (controlledToken, selected) => {
    clearEffects(controlledToken.actor);
    let targets = game.user.targets.ids;
    if (selected && targets.length == 1) {
      applyEffects(controlledToken.actor, canvas.tokens.get(targets[0]).actor)
    }
  })
}

export function setupTargetHook(){
  return Hooks.on("targetToken", handleTarget => {
    log(`Token Target changed`)
    let targets = game.user.targets.ids;
    let controlledTokens = canvas.tokens.controlled
    log(controlledTokens)
    if (targets.length == 1){
      for (var controlledToken of controlledTokens){
        applyEffects(controlledToken.actor, canvas.tokens.get(targets[0]).actor)
      }
    } else {
      for (var controlledToken of controlledTokens){
        clearEffects(controlledToken.actor)
      }
    }
  })
}