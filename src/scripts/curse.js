import { setFlag } from "./setFlag.js"

export function curse(curse){
    let user = game.user;
    let selectedId = ChatMessage.getSpeaker().token;

    for (let targetId of user.targets.ids){
        setFlag(targetId, selectedId, curse)
    }
}