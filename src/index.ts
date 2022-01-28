// title: Drive Reloaded
// author: GolezTrol
// desc: My First Typescript as well as My First TIC. Could it become a recreation of my famous QBasic game?
// script:  js

let t: number = 1;
let x: number;
let y: number;

class Player{
  x: number; 
  y: number;
  angle: number;
  speed: number;
  steer: number;

  constructor(x: number, y: number, angle: number, speed: number){
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.steer = 0;
  }
}

class Game {
  player: Player;

  constructor() {
    this.player = new Player(100, 100, 0, 60);
  }
}

let game = new Game();

function TIC(): void {
  // small trick to ensure that everything is loaded before init() call
  if (t === 1) {
    init();
  }

  if (btn(0)) {
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

  cls(0); //13);
  spr(1 + Math.floor((t % 60) / 30) * 2, x, y, 14, 3, 0, 0, 2, 2);
  spr(256 + Math.floor((t % 90) / 12) * 2, game.player.x, game.player.y, 0, 1, 0, 0, 2, 2);
  print("HELLO WORLD!", 84, 84);
  t++;
}

function init(): void {
  x = 96;
  y = 24;
}
