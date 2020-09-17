export function setFlag(targetId, curserId, curse) {
  let target = canvas.tokens.get(targetId).actor;
  let curser = canvas.tokens.get(curserId).actor;

  console.log('betterCurses | Target is '+ target.name+ '; Id is: '+ targetId);
  console.log('betterCurses | Curser is '+ curser.name+ '; Id is: '+ curserId);
  console.log('betterCurses | Curse is '+ curse);

  let enabled = false;
  let curserInList = false;
  let list = target.getFlag('betterCurses',curse)
  if (list !== null && list !== undefined) {
    enabled = true;
    curserInList = list.includes(curser.id);
  }

  if (curserInList) {
    console.log("betterCurses | Already cursed by curser, removing curse"); 
    if (list.length == 1) {
      list = null;
    } else {
      let index = list.indexOf(curser.id);
      list.splice(index, 1);
    }
    target.setFlag('betterCurses',curse,list);
  } else if (enabled) {
    console.log("betterCurses | Already cursed by other curser, adding to list"); 
    list.push(curser.id);
    target.setFlag('betterCurses',curse,list);
  } else {
    console.log("betterCurses | Adding new curse"); 
    target.setFlag('betterCurses',curse,[curser.id]);
  }
}