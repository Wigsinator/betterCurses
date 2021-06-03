import { log } from "./helpers.js"

export async function clearEffects(actor){
  var filteredIds = actor.effects.filter(x => x.data.label === "betterCurses").map(x => x.id);
  await actor.deleteEmbeddedDocuments("ActiveEffect", filteredIds);
}