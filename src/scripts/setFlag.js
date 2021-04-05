import { log } from "./helpers.js"

export async function setFlag(targetId, curserId, curse) {
  let target = canvas.tokens.get(targetId).actor;
  let curser = canvas.tokens.get(curserId).actor;

  log(`Target is ${target.name}; Id is: ${targetId}`);
  log(`Curser is ${curser.name}; Id is: ${curserId}`);
  log(`Curse is ${curse}`);

  let enabled = false;
  let targetInList = false;
  let list = curser.getFlag('betterCurses',curse)
  if (list !== null && list !== undefined) {
    enabled = true;
    targetInList = list.includes(target.id);
  }

  if (targetInList) {
    log(`Already targetting target, removing curse`); 
    if (list.length == 1) {
      list = null;
    } else {
      let index = list.indexOf(target.id);
      list.splice(index, 1);
    }
    await curser.setFlag('betterCurses',curse,list);
  } else if (enabled) {
    log(`Already targetting other target, adding to list`); 
    list.push(target.id);
    await curser.setFlag('betterCurses',curse,list);
  } else {
    log(`Adding new curse`); 
    await curser.setFlag('betterCurses',curse,[target.id]);
  }
}