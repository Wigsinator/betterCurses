import { log } from "./helpers.js"

export async function setFlag(targetId, curserId, curse) {
  let target = canvas.tokens.get(targetId).actor;
  let curser = canvas.tokens.get(curserId).actor;

  log(`Target is ${target.name}; Id is: ${targetId}`);
  log(`Curser is ${curser.name}; Id is: ${curserId}`);
  log(`Curse is ${curse}`);

  let enabled = false;
  let curserInList = false;
  let list = target.getFlag('betterCurses',curse)
  if (list !== null && list !== undefined) {
    enabled = true;
    curserInList = list.includes(curser.id);
  }

  if (curserInList) {
    log(`Already cursed by curser, removing curse`); 
    if (list.length == 1) {
      list = null;
    } else {
      let index = list.indexOf(curser.id);
      list.splice(index, 1);
    }
    await target.setFlag('betterCurses',curse,list);
  } else if (enabled) {
    log(`Already cursed by other curser, adding to list`); 
    list.push(curser.id);
    await target.setFlag('betterCurses',curse,list);
  } else {
    log(`Adding new curse`); 
    await target.setFlag('betterCurses',curse,[curser.id]);
  }
}