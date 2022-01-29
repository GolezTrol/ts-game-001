// title: Drive Reloaded
// author: GolezTrol
// desc: My First Typescript as well as My First TIC. Could it become a recreation of my famous QBasic game?
// script:  js

// NOTE module style imports don't work in TIC: import {Game, Player} from './core/game'; 
/// <reference path="./core/player.ts"/>
/// <reference path="./core/controller.ts"/>
/// <reference path="./core/game.ts"/>

let t: number = 1;
let x: number;
let y: number;

let game = new Game();

function TIC(): void {
  // small trick to ensure that everything is loaded before init() call
  if (t === 1) {
    init();
  }

/*  if (btn(0)) {
    y--;
  }
  if (btn(1)) {
    y++;
  }
  if (btn(2)) {
    x--;
  }
  if (btn(3)) {
    x++;
  }
  */
  cls(0); //13);
  spr(1 + Math.floor((t % 60) / 30) * 2, x, y, 14, 3, 0, 0, 2, 2);
  //spr(256 + Math.floor((t % 90) / 12) * 2, game.player.x, game.player.y, 0, 1, 0, 0, 2, 2);
  print("HELLO WORLD!", 84, 84);

  game.tic(t);
  t++;
}

function init(): void {
  x = 96;
  y = 24;
}
