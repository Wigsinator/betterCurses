# betterCurses
Better Curses module for Foundry VTT


## List of functionality to create

- [x] Be able to set flags
- [x] Define information within curse items
    - [x] Create space within items for Curse information
    - [x] Add checkbox for "Is Curse"
    - [x] Add string for curse damage formula
    - [x] Add string for curse name
    - [x] Set of 4 checkboxes to define what the curse triggers on (mw, rw, ms, rs)
- [x] Hijack rollDamage
    - [x] Add @`curseName` to parts
    - [x] Add curse damage formula for rollData[`curseName`]
    - [x] Try to find a way to do this without breaking other modules