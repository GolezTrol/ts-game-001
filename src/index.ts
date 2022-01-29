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

let screen = { width: 240, height: 136 };

let game = new Game();

function TIC(): void {
  game.tic(t);
  t++;
}
