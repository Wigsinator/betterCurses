import { log } from "./helpers.js"
import { setFlag } from "./setFlag.js"
import { applyEffects } from "./applyEffects.js"

export function curse(curse){
    let user = game.user;
    let selectedId = ChatMessage.getSpeaker().token;

    for (let targetId of user.targets.ids){
        setFlag(targetId, selectedId, curse)
    }
    if (user.targets.ids.length === 1){
        applyEffects(canvas.tokens.get(selectedId).actor, canvas.tokens.get(targets[0]).actor)
    }
}