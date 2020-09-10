// Import function
import { curse } from "./scripts/curse.js"

Hooks.on("init", function() {
    console.log("betterCurses | Intializing")
})

Hooks.on("setup", function() {
    console.log("betterCurses | Setup")
    window.BetterCurses = {
        curse: curse
    }
})