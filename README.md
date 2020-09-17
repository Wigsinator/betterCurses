# betterCurses
Better Curses module for Foundry VTT


## List of functionality to create

- [x] Be able to set flags
- [ ] Define information within curse items
    - [ ] Create space within items for Curse information
    - [ ] Add checkbox for "Is Curse"
    - [ ] Add string for curse damage formula
    - [ ] Add string for curse name
    - [ ] Set of 4 checkboxes to define what the curse triggers on (mw, rw, ms, rs)
- [ ] Hijack rollDamage
    - [ ] Add @`curseName` to parts
    - [ ] Add curse damage formula for rollData[`curseName`]
    - [ ] Try to find a way to do this without breaking other modules