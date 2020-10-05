export function setupControlHook(){
  return Hooks.on("controlToken", (controlledToken, selected) => {
    if (!selected) {
      clearEffects(controlledToken.actor);
    } else {
      let targets = game.user.targets.ids;
      if (targets.length == 1){
        applyEffects(controlledToken.actor, canvas.tokens.get(targets[0]).actor)
      }
    }
  })
}

export function setupTargetHook(){
  return Hooks.on("targetToken", handleTarget => {
    console.log("betterCurses | Token Target changed")
    let targets = game.user.targets.ids;
    let controlledTokens = canvas.tokens.controlled
    console.log(controlledTokens)
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

function clearEffects(actor){
  var filtered = actor.effects.filter(x => x.data.label === "betterCurses");
  for (var effect of filtered) {
    console.log("betterCurses | Clearing Effect")
    actor.deleteEmbeddedEntity("ActiveEffect", effect.id);
  }
}

function applyEffects(actor, target){
  const types = ["mwak","rwak","msak","rsak"];
  for (var item of actor.items.entries) {
    console.log("betterCurses | Scanning item " + item);
    if (item.getFlag("betterCurses", "isCurse")) {
      console.log("betterCurses | "+ item.getFlag("betterCurses", "curseName"));
      var list = target.getFlag('betterCurses', item.getFlag("betterCurses", "curseName"));
      if (list && list.includes(actor.id)) {
        const effectData = {
          label: "betterCurses",
          changes: []
        }
        for (var type of types) {
          if (item.getFlag("betterCurses", type)) {
            effectData.changes.push({key: "data.bonuses."+type+".damage", value: item.getFlag("betterCurses","formula"), mode: ACTIVE_EFFECT_MODES.ADD});
          }
        }
        console.log("betterCurses | Applying Effect")
        console.log(effectData)
        actor.createEmbeddedEntity("ActiveEffect", effectData);
      }
    }
  }
}