import { log } from "./helpers.js"

export function applyEffects(actor, target){
  const types = ["mwak","rwak","msak","rsak"];
  for (var item of actor.items) {
    log(`Scanning item ${item.data.name}`);
    if (item.getFlag("betterCurses", "isCurse")) {
      log(`Handling curse ${item.getFlag("betterCurses", "curseName")}`);
      var targets = actor.getFlag('betterCurses', item.getFlag("betterCurses", "curseName"));
      if (targets && targets.includes(target.id)) {
        const effectData = {
          label: "betterCurses",
          changes: []
        }
        for (var type of types) {
          if (item.getFlag("betterCurses", type)) {
            effectData.changes.push({key: `data.bonuses.${type}.damage`, value: `+${item.getFlag("betterCurses","formula")}`, mode: CONST.ACTIVE_EFFECT_MODES.ADD});
          }
        }
        log(`Applying Effect`)
        log(effectData)
        actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
      }
    }
  }
}