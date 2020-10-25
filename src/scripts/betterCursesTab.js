var makeActive = false;

export function initSheetTab() {
  Hooks.on(`renderItemSheet5e`, (app, html, data) => {
    addBetterCursesTab(app, html, data);
  });
}

async function addBetterCursesTab(app,html,data) {
  let item = app.object;
  if (["loot"].includes(item.type)) return;

  // Define the properties for curse items
  if (!hasProperty(item.data, "flags.betterCurses.isCurse")) setProperty(item.data, "flags.betterCurses.isCurse", false);
  if (!hasProperty(item.data, "flags.betterCurses.curseName")) setProperty(item.data, "flags.betterCurses.curseName", "");
  if (!hasProperty(item.data, "flags.betterCurses.formula")) setProperty(item.data, "flags.betterCurses.formula", "");
  if (!hasProperty(item.data, "flags.betterCurses.mwak")) setProperty(item.data, "flags.betterCurses.mwak", false);
  if (!hasProperty(item.data, "flags.betterCurses.rwak")) setProperty(item.data, "flags.betterCurses.rwak", false);
  if (!hasProperty(item.data, "flags.betterCurses.msak")) setProperty(item.data, "flags.betterCurses.msak", false);
  if (!hasProperty(item.data, "flags.betterCurses.rsak")) setProperty(item.data, "flags.betterCurses.rsak", false);

  // Create the tab
  let tabSelector = html.find(`.tabs`),
    settingsContainer = html.find(`.sheet-body`),
    betterCursesTabString = `<a class="item" data-tab="betterCurses">${game.i18n.localize("betterCurses.Title")}</a>`,
    tab = tabSelector.append($(betterCursesTabString));

  if (settingsContainer.length === 0) settingsContainer = html.find(`.primary-body`);

  let betterCursesTabTemplate = await renderTemplate("./modules/betterCurses/templates/betterCurses-tab.html", {
    flags: item.data.flags
  });
  let extraTab = settingsContainer.append(betterCursesTabTemplate);

  if (makeActive && app._tabs[0]) app._tabs[0].activate("betterCurses");
  makeActive = false;
  
   // intercept Input Click and set Tab
  html.find('.betterCurses input[type="checkbox"]').click(ev => {
    makeActive = true;
  });

  html.find('.betterCurses input[type="text"]').click(ev => {
    makeActive = true;
  });

}