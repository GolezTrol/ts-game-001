# ts-game-001

Learning Typescript, amongst other things

Trying to make a [TIC80](https://tic80.com/) game.

TIC80 is a virtual tiny game console, in which you can write games using a limited set of JavaScript.

So far I have

2021-01-27
- Managed to build TIC80 1.0 dev in PRO mode. 
  - Didn't have VS 2017, and couldn't get it to work with VS 2019.
  - I did manage to build it with mingw, but couldn't find how to pass the 'PRO' build option on the command line.
  - I set `BUILD_PRO` to `TRUE` in `CMakeList.txt`, and that did the trick.
- Found out that I somehow have been mixing versions of TIC80-typescript. 
  - My cartridge file is useless, as was a part of the config. 
  - This version seems to always load `game.js`, which is expected to be a PRO cartridge, containing at least the sprites, etc. 
  - It then loads `compressed.js`, which seems to replace the loaded code. *)
  - When you save the cartridge, it is saved to `game.js`, which contains then the updated sprites. It also contains the code, which is a bit redundant for version control purposes, but it is how it is. It's tempting to make changes to the code in the TIC environment, but those should be made in `index.ts`.

*) Confirmed, it runs:
```
TIC80 
  --skip            # skip intro animation for faster testing
  --keepcmd         # re-run cmd on every reload 
  --fs={projectdir} # set file system/working dir
  --cmd             # commands to run
       load game.js               # load entire cartridge
       & load compressed.js code  # load only the code
       & run                      
    
```

- Current modus operandi:
  - Can run with F1, which runs `tsc80 run`. This launches my self-built TIC80-dev-PRO, loads the game, and loads the new compiled code.
  - Changes to the code are automatically recompiled. Reloading the game with `ctrl+r` to see the changes immediately.
  - Looks like I may actually write some Typescript next time ...

2021-01-26
- Created a default TIC80 cartridge file.
- Fetched and installed [tic80-typescript](https://github.com/scambier/tic80-typescript), which should allow me to write typescript, and embed it as JavaScript in my TIC80 'cartridge' file.
- Installed the [F5 Anything extension for VS Code](https://marketplace.visualstudio.com/items?itemName=discretegames.f5anything)
- Made a launch config to compile and run config with F5.
