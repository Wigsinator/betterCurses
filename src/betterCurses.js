// Import function
import { curse } from "./scripts/curse.js"
import { initSheetTab } from "./scripts/betterCursesTab.js"
import { setupRollHandler } from "./scripts/rollHandler.js"

Hooks.once("init", function() {
    console.log("betterCurses | Intializing");
});

Hooks.once("setup", function() {
    console.log("betterCurses | Setup");
    window.BetterCurses = {
        curse: curse
    };
});

Hooks.once("ready", function() {
    console.log("betterCurses | Ready");
    initSheetTab();
    setupRollHandler();
});