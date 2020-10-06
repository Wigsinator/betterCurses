export function clearEffects(actor){
  var filtered = actor.effects.filter(x => x.data.label === "betterCurses");
  for (var effect of filtered) {
    console.log("betterCurses | Clearing Effect")
    actor.deleteEmbeddedEntity("ActiveEffect", effect.id);
  }
}