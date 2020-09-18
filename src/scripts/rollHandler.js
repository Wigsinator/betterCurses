export function setupRollHandler() {
    // Patch the Core Roll 
    const og_rollDamage = game.dnd5e.entities.Item5e.prototype.rollDamage;
    game.dnd5e.entities.Item5e.prototype.rollDamage = function rollDamage({event, spellLevel=null, versatile=false}={}) {
        rollDamageWrapper({event, spellLevel, versatile}, this, og_rollDamage);
    };
}


function rollDamageWrapper({event, spellLevel=null, versatile=false}={}, base_item, og_rollDamage) {
    console.log('betterCurses | Intercepting item damage roll');
    // Get preliminary information
    const itemData = base_item.data.data;
    const actor = base_item.actor;
    const targetList = game.user.targets.ids
    if (targetList[0] == undefined || targetList[0] == null) {
        return og_rollDamage.call(base_item, {event, spellLevel, versatile});
    }
    const target = canvas.tokens.get(targetList[0]).actor;
    
    // Info to know if curse applies
    let type = itemData.actionType.substring(0,2);
    var list;
    let curses = new Map;
    
    for (var item of actor.items.entries){
        console.log("betterCurses | Scanning item " + item);
        if (item.getFlag("betterCurses", "isCurse") && item.getFlag("betterCurses", type)) {
            console.log("betterCurses | "+ item.getFlag("betterCurses", "curseName"));
            list = target.getFlag('betterCurses', item.getFlag("betterCurses", "curseName"));
            if (list && list.includes(actor.id)){
                curses.set(item.getFlag("betterCurses", "curseName"), item.getFlag("betterCurses", "formula"))
            }
        }
    }
    console.log(curses);
    // Get Parts
    let parts = itemData.damage.parts[0][0];
    const parts_og = itemData.damage.parts[0][0];
    
    for (var curse of curses.keys()){
        console.log("betterCurses | Applying Curse "+curse);
        parts += " + @item." + curse;
        itemData[curse] = curses.get(curse);
    }

    itemData.damage.parts[0][0] = parts;
    
    console.log('betterCurses | Running original damage roll');
    let promise = og_rollDamage.call(base_item, {event, spellLevel, versatile});
    
    console.log("betterCurses | Cleanup");
    itemData.damage.parts[0][0] = parts_og;

    for (var curse of curses.keys()){
        console.log("betterCurses | Removing Curse "+curse);
        delete itemData.curse;
    }

    return promise
}