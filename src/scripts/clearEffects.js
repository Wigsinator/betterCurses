import { log } from "./helpers.js"

export function clearEffects(actor){
  var filtered = actor.effects.filter(x => x.data.label === "betterCurses");
  for (var effect of filtered) {
    log(`Clearing Effect`)
    actor.deleteEmbeddedEntity("ActiveEffect", effect.id);
  }
}