var __extends = this && this.__extends || function() {
 var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || {
   __proto__: []
  } instanceof Array && function(d, b) {
   d.__proto__ = b;
  } || function(d, b) {
   for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return extendStatics(d, b);
 };
 return function(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
   this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
 };
}();

/// <reference path="player.ts"/>
/// <reference path="controller.ts"/>
var Game = /** @class */ function() {
 function Game() {
  this.screen = {
   width: 240,
   height: 236
  };
  this.player = new Player(100, 100, 0, 60);
  var controller = new ButtonController(2, 3, 0);
  this.player.controller = controller;
  controller.player = this.player;
 }
 Game.prototype.tic = function(t) {
  //poke(0x03FF8, 10)
  cls(0);
 //13);
  this.player.tic(t);
  this.player.draw(t);
 };
 return Game;
}();

// title: Drive Reloaded
// author: GolezTrol
// desc: My First Typescript as well as My First TIC. Could it become a recreation of my famous QBasic game?
// script:  js
// NOTE module style imports don't work in TIC: import {Game, Player} from './core/game'; 
/// <reference path="./core/game.ts"/>
var t = 1;

var x;

var y;

var game = new Game();

function TIC() {
 // small trick to ensure that everything is loaded before init() call
 if (t === 1) {
  init();
 }
 game.tic(t);
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
    
      cls(0); //13);
      spr(1 + Math.floor((t % 60) / 30) * 2, x, y, 14, 3, 0, 0, 2, 2);
      spr(256 + Math.floor((t % 90) / 12) * 2, game.player.x, game.player.y, 0, 1, 0, 0, 2, 2);
      print("HELLO WORLD!", 84, 84);*/ t++;
}

function init() {
 x = 96;
 y = 24;
}

var Controller = /** @class */ function() {
 function Controller() {}
 return Controller;
}();

var ButtonController = /** @class */ function(_super) {
 __extends(ButtonController, _super);
 function ButtonController(left, right, fire) {
  var _this = _super.call(this) || this;
  _this.left = left;
  _this.right = right;
  _this.fire = fire;
  return _this;
 }
 ButtonController.prototype.tic = function(t) {
  /*if (this.player === undefined) return;

        if (btnp(this.left)) this.player.steerLeft();
        if (btnp(this.right)) this.player.steerRight();
        if (btnp(this.fire)) this.player.fire();*/};
 return ButtonController;
}(Controller);

var Player = /** @class */ function() {
 function Player(x, y, angle, speed) {
  this.MaxSteer = 3;
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.speed = speed;
  this.steer = 0;
 }
 Player.prototype.steerLeft = function() {
  if (this.steer > 0 - this.MaxSteer) this.steer--;
 };
 Player.prototype.steerRight = function() {
  if (this.steer < this.MaxSteer) this.steer++;
 };
 Player.prototype.fire = function() {};
 Player.prototype.tic = function(t) {
  var _a;
  (_a = this.controller) === null || _a === void 0 ? void 0 : _a.tic(t);
 };
 Player.prototype.draw = function(t) {
  var index = (this.angle + 22.5) / 45;
  spr(256 + Math.floor(index) * 2, this.x, this.y, 0, 1, 0, 0, 2, 2);
 };
 return Player;
}();
// <TILES>
// 001:eccccccccc888888caaaaaaaca888888cacccccccacc0ccccacc0ccccacc0ccc
// 002:ccccceee8888cceeaaaa0cee888a0ceeccca0ccc0cca0c0c0cca0c0c0cca0c0c
// 003:eccccccccc888888caaaaaaaca888888cacccccccacccccccacc0ccccacc0ccc
// 004:ccccceee8888cceeaaaa0cee888a0ceeccca0cccccca0c0c0cca0c0c0cca0c0c
// 017:cacccccccaaaaaaacaaacaaacaaaaccccaaaaaaac8888888cc000cccecccccec
// 018:ccca00ccaaaa0ccecaaa0ceeaaaa0ceeaaaa0cee8888ccee000cceeecccceeee
// 019:cacccccccaaaaaaacaaacaaacaaaaccccaaaaaaac8888888cc000cccecccccec
// 020:ccca00ccaaaa0ccecaaa0ceeaaaa0ceeaaaa0cee8888ccee000cceeecccceeee
// </TILES>

// <SPRITES>
// 000:0000000000000000000000000000000000000d4400000e430000003200000033
// 001:000000000000000000000000000000003e0000002f0000002000000020000000
// 002:00000000000000000000000000000000000000000000fd04000fd43300fe4333
// 003:000000000000000000000000fd000000d3300000432d000033ef000032000000
// 004:000000000000000000000000000000000000cddf000044330000434300003333
// 005:000000000000000000000000000000000000000000de00004333000032320000
// 006:00000000000000000000000f00000003000000430000043300004343000fc433
// 007:0000000000000000f0000000df0000003df0000032e000003300000032300000
// 008:0000000000000000000000000000000000000c4400000d4300000e3400000e33
// 009:00000000000000000000000000000000433d0000323e0000231e0000311f0000
// 010:000000000000000000000000000000000000000f000000fd000000d400000004
// 011:000000000000000000000000f0000000e3000000432000003332000033232f00
// 012:0000000000000000000000000000000000000000000000000000de0000004434
// 013:0000000000000000000000000000000000000000cdde00004333000033210000
// 014:0000000000000000000000000000000000000df0000043e0000d4333000fe433
// 015:0000000000000000000000000000000000000000000000000df0000022df0000
// 016:0000c4430000d4330000d3320000e32100000000000000000000000000000000
// 017:21d0000012e0000021e0000011f0000000000000000000000000000000000000
// 018:0002323200002312000001210000001e0000000f000000000000000000000000
// 019:200000001e000000ef000000f000000000000000000000000000000000000000
// 020:00002323000031210000deff0000000000000000000000000000000000000000
// 021:2121000000ef0000000000000000000000000000000000000000000000000000
// 022:0000fd3300000fe0000000000000000000000000000000000000000000000000
// 023:232ef0003221e0000e2100000fe0000000000000000000000000000000000000
// 024:0000000300000002000000d3000000e300000000000000000000000000000000
// 025:220000003200000021e0000011f0000000000000000000000000000000000000
// 026:000000430000fd430000d4320000031e000000ef000000000000000000000000
// 027:2321df00321df00010ef00000000000000000000000000000000000000000000
// 028:00004333000033230000ef000000000000000000000000000000000000000000
// 029:323200002321000012110000deef000000000000000000000000000000000000
// 030:000003430000004300000d4400000fd3000000fe0000000f0000000000000000
// 031:322ef00023210000321000002100000010000000000000000000000000000000
// </SPRITES>

// <WAVES>
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000304000000000
// </SFX>

// <PALETTE>
// 000:1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57
// </PALETTE>

