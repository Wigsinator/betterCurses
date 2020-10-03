Hooks.on("targetToken", handleTarget => function() =>{
  let targets = game.user.targets.ids;
  let controlledTokens = canvas.tokens.controlled
  if (targets.length == 1){
    for (controlledToken of controlledTokens){
      applyEffects(controlledToken.actor, canvas.tokens.get(targets[0]).actor)
    }
  } else {
    for (controlledToken of controlledTokens){
      clearEffects(controlToken.actor)
    }
  }
})
Hooks.on("controlToken", (controlledToken, selected) => {
  if (!selected) {
    clearEffects(controlledToken.actor);
  } else {
    let targets = game.user.targets.ids;
    if (targets.length == 1){
      applyEffects(controlledToken.actor, canvas.tokens.get(targets[0]).actor)
    }
  }
})