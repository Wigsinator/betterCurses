import { log } from "./helpers.js"

export async function clearEffects(actor){
  var filtered = actor.effects.filter(x => x.data.label === "betterCurses");
  var promiseList = [];
  for (var effect of filtered) {
    log(`Clearing Effect ${effect.id}`);
    promiseList.push(actor.deleteEmbeddedEntity("ActiveEffect", effect.id));
  }
  if (promiseList) {
    log("Promise List:")
    log(promiseList);
    await Promise.all(promiseList);
  }
}