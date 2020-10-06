// Import functions
import { log } from "./scripts/helpers.js"
import { curse } from "./scripts/curse.js"
import { initSheetTab } from "./scripts/betterCursesTab.js"
import { setupControlHook, setupTargetHook } from "./scripts/setupHooks.js"
 
function i18n(key) {
    return game.i18n.localize(key);
}

Hooks.once("init", function() {
    game.settings.register("betterCurses", "debug", {
        name: i18n("betterCurses.debug.name"),
        hint: i18n("betterCurses.debug.hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
    log("Init Done");
});

Hooks.once("setup", function() {
    window.BetterCurses = {
        curse: curse
    };
    log("Setup Done");
});

Hooks.once("ready", function() {
    initSheetTab();
    var control = setupControlHook();
    var target = setupTargetHook();
    log(`Control: ${control}; Target: ${target}`);
    log("Ready Done");
});