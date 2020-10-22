import { log } from "./helpers.js"
import { setFlag } from "./setFlag.js"
import { applyEffects } from "./applyEffects.js"
import { clearEffects } from "./clearEffects.js"

export async function curse(curse){
    let user = game.user;
    let selectedId = ChatMessage.getSpeaker().token;

    for (let targetId of user.targets.ids){
        await setFlag(targetId, selectedId, curse)
    }
    if (user.targets.ids.length === 1){
        await clearEffects(canvas.tokens.get(selectedId).actor);
        applyEffects(canvas.tokens.get(selectedId).actor, canvas.tokens.get(user.targets.ids[0]).actor);
    }
}