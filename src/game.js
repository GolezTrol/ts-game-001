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

var Player = /** @class */ function() {
 function Player(_a) {
  var x = _a.x, y = _a.y, angle = _a.angle, speed = _a.speed;
  this.MaxSteer = 3;
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.speed = speed;
  this.steer = 0;
  this.color = 0;
  this.car = 0;
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
  this.angle += this.steer;
  this.angle = (this.angle + 360) % 360;
  var rad = this.angle / 360 * Math.PI * 2;
  this.x += Math.cos(rad) * this.speed;
  this.y += Math.sin(rad) * this.speed;
  this.x = (this.x + screen.width) % screen.width;
  this.y = (this.y + screen.height) % screen.height;
  // 0:red, 1:green, 2: blue, 3: warm/rainbow, 4: greyscale, 5: metal
  if (keyp(3 /*C*/, 1e3, 1e3)) {
   ++this.color;
   this.color %= 6;
  }
  // 0: Tractor, 1: Tank, 2: 8x8, 3: [...], 4: quarter 
  if (keyp(22 /*V*/, 1e3, 1e3)) {
   this.car++;
   this.car %= 5;
  }
 };
 Player.prototype.setPalette = function(to, flipHighlight) {
  // A car can use 4 colors changing colors, as well as changing greyscales for the wheels
  // The changing colors are 1,2,3 and 4, which are dark purple, red, orange and yellow.
  // The other colors are also ranges of 4 dark to light colors, to get another color style in the car.
  // Depending on the car, the lightest and darkest color can be used as highlight, and will be swapped.
  var colors;
  if (to == 1) {
   // Green
   colors = [ 9, 7, 6, 5 ];
  } else if (to == 2) {
   // Blue
   colors = [ 8, 9, 10, 11 ];
  } else if (to == 3) {
   // Warm
   colors = [ 1, 9, 6, 4 ];
  } else if (to == 4) {
   // Grey
   colors = [ 15, 14, 13, 12 ];
  } else if (to == 5) {
   // Metal
   colors = [ 15, 7, 10, 12 ];
  } else {
   // Red, default
   colors = [ 1, 2, 3, 4 ];
  }
  if (flipHighlight) {
   colors = [ colors[3], colors[1], colors[2], colors[0] ];
  }
  poke4(PALETTE_MAP * 2 + 1, colors[0]);
  poke4(PALETTE_MAP * 2 + 2, colors[1]);
  poke4(PALETTE_MAP * 2 + 3, colors[2]);
  poke4(PALETTE_MAP * 2 + 4, colors[3]);
 };
 Player.prototype.setWheelPalette = function(t) {
  // White stays white, black stays black, but the three grays can shift 
  // to light (lightest becoming white) or dark (darkest becoming black)
  poke4(PALETTE_MAP * 2 + 13, 13);
  poke4(PALETTE_MAP * 2 + 14, 14);
  poke4(PALETTE_MAP * 2 + 15, 15);
  var delay = 3;
  var i = Math.floor(t % (4 * delay) / delay);
  if (i == 0) {
   poke4(PALETTE_MAP * 2 + 13, 14);
   poke4(PALETTE_MAP * 2 + 14, 13);
   poke4(PALETTE_MAP * 2 + 15, 15);
  } else if (i == 1) {
   poke4(PALETTE_MAP * 2 + 13, 13);
   poke4(PALETTE_MAP * 2 + 14, 13);
   poke4(PALETTE_MAP * 2 + 15, 14);
  } else if (i == 2) {
   poke4(PALETTE_MAP * 2 + 13, 14);
   poke4(PALETTE_MAP * 2 + 14, 13);
   poke4(PALETTE_MAP * 2 + 15, 14);
  } else if (i == 3) {}
 };
 Player.prototype.draw = function(t) {
  this.setWheelPalette(t);
  if (this.car < 2) {
   this.setPalette(this.color, false);
   var index = (this.angle + 22.5) / 45 % 8;
   print(index, 84, 100, undefined, undefined, 1, true);
   spr(256 + this.car * 32 + Math.floor(index) * 2, this.x - 8, this.y - 8, 0, 1, 0, 0, 2, 2);
  } else if (this.car >= 2 && this.car <= 3) {
   this.setPalette(this.color, false);
   var index = (this.angle + 11.25) / 22.5 % 16;
   print(index, 84, 100, undefined, undefined, 1, true);
   spr(320 + (this.car - 2) * 16 + Math.floor(index), this.x - 4, this.y - 4, 6, 1, 0, 0, 1, 1);
  } else if (this.car == 4) {
   var index = (this.angle + 11.25) / 22.5 % 16;
   var spriteIndex = Math.floor(index);
   print(spriteIndex, 84, 100, undefined, undefined, 1, true);
   var rotate = Math.floor(spriteIndex / 4);
   print(rotate, 84, 110, undefined, undefined, 1, true);
   var r = 0;
   switch (rotate) {
    case 0:
    r = 0;
    break;

    case 1:
    r = 1;
    break;

    case 2:
    r = 2;
    break;

    case 3:
    r = 3;
    break;

    default:
    r = 0;
    break;
   }
   var flipHighlight = [ 4, 5, 8, 9, 11, 14, 15 ].indexOf(spriteIndex) > -1;
   spriteIndex %= 4;
   print(x, 84, 120, undefined, undefined, 1, true);
   this.setPalette(this.color, flipHighlight);
   spr(352 + (this.car - 4) * 16 + spriteIndex * 2, this.x - 4, this.y - 4, 0, 1, 0, r, 2, 2);
  }
 };
 return Player;
}();

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
  if (this.player === undefined) return;
  if (btnp(this.left)) this.player.steerLeft();
  if (btnp(this.right)) this.player.steerRight();
  if (btnp(this.fire)) this.player.fire();
 };
 return ButtonController;
}(Controller);

var PALETTE_MAP = 16368;

var Game = /** @class */ function() {
 function Game() {
  this.player = new Player({
   x: 100,
   y: 100,
   angle: 0,
   speed: .7
  });
  var controller = new ButtonController(2, 3, 0);
  this.player.controller = controller;
  controller.player = this.player;
 }
 Game.prototype.tic = function(t) {
  poke(16376, 10);
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
/// <reference path="./core/player.ts"/>
/// <reference path="./core/controller.ts"/>
/// <reference path="./core/game.ts"/>
var t = 1;

var x;

var y;

var screen = {
 width: 240,
 height: 136
};

var game = new Game();

function TIC() {
 game.tic(t);
 t++;
}
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
// 000:000000000000000000000000000000000000cddf000044330000434300003333
// 001:000000000000000000000000000000000000000000de00004333000032320000
// 002:00000000000000000000000f00000003000000430000043300004343000fc433
// 003:0000000000000000f0000000df0000003df0000032e000003300000032300000
// 004:0000000000000000000000000000000000000c4400000d4300000e3400000e33
// 005:00000000000000000000000000000000433d0000323e0000231e0000311f0000
// 006:000000000000000000000000000000000000000f000000fd000000d400000004
// 007:000000000000000000000000f0000000e3000000432000003332000033232f00
// 008:0000000000000000000000000000000000000000000000000000de0000004434
// 009:0000000000000000000000000000000000000000cdde00004333000033210000
// 010:0000000000000000000000000000000000000df0000043e0000d4333000fe433
// 011:0000000000000000000000000000000000000000000000000df0000022df0000
// 012:0000000000000000000000000000000000000d4400000e430000003200000033
// 013:000000000000000000000000000000003e0000002f0000002000000020000000
// 014:00000000000000000000000000000000000000000000fd04000fd43300fe4333
// 015:000000000000000000000000fd000000d3300000432d000033ef000032000000
// 016:00002323000031210000deff0000000000000000000000000000000000000000
// 017:2121000000ef0000000000000000000000000000000000000000000000000000
// 018:0000fd3300000fe0000000000000000000000000000000000000000000000000
// 019:232ef0003221e0000e2100000fe0000000000000000000000000000000000000
// 020:0000000300000002000000d3000000e300000000000000000000000000000000
// 021:220000003200000021e0000011f0000000000000000000000000000000000000
// 022:000000430000fd430000d4320000031e000000ef000000000000000000000000
// 023:2321df00321df00010ef00000000000000000000000000000000000000000000
// 024:00004333000033230000ef000000000000000000000000000000000000000000
// 025:323200002321000012110000deef000000000000000000000000000000000000
// 026:000003430000004300000d4400000fd3000000fe0000000f0000000000000000
// 027:322ef00023210000321000002100000010000000000000000000000000000000
// 028:0000c4430000d4330000d3320000e32100000000000000000000000000000000
// 029:21d0000012e0000021e0000011f0000000000000000000000000000000000000
// 030:0002323200002312000001210000001e0000000f000000000000000000000000
// 031:200000001e000000ef000000f000000000000000000000000000000000000000
// 032:000000000000000000000000000dcede000ddede000344430004433300034313
// 033:000000000000000000000000deded000deded000434340003434300013333300
// 034:0000000000000000000000ee00000eee00000eee000eeeee000eeeee000fdeee
// 035:0000000000000000f0000000ee000000eef00000eeee0000eeeee000eeeeef00
// 036:0000000000000000000000000000dd650000cd550000ee560000dd560000ee66
// 037:0000000000000000000000006567e0005667d000666ff0007667e000667ff000
// 038:000000000000000000000000000000e00000000e000000fe00000eee0000eee0
// 039:000000000000000000000000fee00000dee00000eeeee000eeeeee00eeeeee00
// 040:000000000000000000000000000deded000deded000565650006565600666667
// 041:000000000000000000000000edecd000ededd000655560006665500067656000
// 042:0000000000000000e0000000ee0000ef00ee0eee00eeeeee000eeeee00eeeeee
// 043:00000000000000000000000000000000e0000000ee000000eef0e0000eee0000
// 044:000000000000000000000006000dd566000ee656000dd566000ee656000dd567
// 045:000000000000000000000000767e000076ff0000767e000076ff0000777e0000
// 046:00000000000000000000000f000000ee00000eee0000feee000eeeee00feeeee
// 047:0000ee000000e000e0ee0000eeee0000eee00000eeee0000eeeee000eeeef000
// 048:000433320003222100077f7f000edfef00000000000000000000000000000000
// 049:11111100133330007f7f7000efefe00000000000000000000000000000000000
// 050:0000eee0000e0fee000000ee0000000e00000000000000000000000000000000
// 051:eeeeee00eeeee000eeeeee00eee0ee00fe0000ee0000000e0000000000000000
// 052:0000dd560000ee650000dd560000ee650000dd56000000000000000000000000
// 053:7777e000676ff0006767e000676ff0006767e000600000000000000000000000
// 054:000feeee000eeeee0000eeee00000eee0000eeee0000ee0e000e000000ee0000
// 055:eeeeef00eeeee000eeef0000eee00000ee000000f00000000000000000000000
// 056:00077777000666670007f7f7000efefe00000000000000000000000000000000
// 057:6666500076666000f7f77000fefde00000000000000000000000000000000000
// 058:00feeeee000eeeee0000eeee00000fee000000ee0000000f0000000000000000
// 059:eeedf000eeeee000eeeee000eee00000eee00000ee0000000000000000000000
// 060:000ee666000dd567000ee566000cd555000dd656000000000000000000000000
// 061:67ff0000667e000066ff0000667d0000567e0000000000000000000000000000
// 062:00eeeeee00eeeeee000eeeee00000eed00000eef000000000000000000000000
// 063:0eee0000eee00000ef000000e00000000e000000000000000000000000000000
// 064:66666666666666666fe33fe663229226622292166fe11fe66666666666666666
// 065:666666666fe666666331166663229fe66fe292166661121666666fe666666666
// 066:66f66666633e6666f32216666e229f66661922e6666f21666666e66666666666
// 067:666666666f33f6666e32e6666622216666199166666f22f6666e11e666666666
// 068:6666666666f33f6666e32e66661221666619916666f22f6666e22e6666666666
// 069:66666666666f22f6666e22e666132166661991666f22f6666e22e66666666666
// 070:66666f666666e2166661322f66fa22e66e3291666622f666666e666666666666
// 071:6666666666666ef6666112266efa3226633a2ef6632116666ef6666666666666
// 072:66666666666666666ef11ef6633a3216632a21166ef11ef66666666666666666
// 073:666666666ef6666663311666632a3ef66efa22166661111666666ef666666666
// 074:66666666666e66666622f6666e32a16666fa22e66661221f6666e21666666f66
// 075:666666666e22e6666f32f666661aa16666132166666e21e6666f11f666666666
// 076:6666666666e22e6666f22f66661aa1666613216666e21e6666f11f6666666666
// 077:66666666666e22e6666f31f6661aa166661321666e32e6666f11f66666666666
// 078:666666666666e666666f3266661a21e66e32af66f2221666621e666666f66666
// 079:66666666666666666fe11fe66322a2166222a1166fe11fe66666666666666666
// 080:666666666dedede6634433366433444661331116631133366dedede666666666
// 081:6de66666634de66664343de661334336631314466de13116666de33666666de6
// 096:000000000000000000000000000edede000edede000224440002433300022333
// 097:000000000000000000000000deded000deded000222220004444440033333300
// 098:0000000000000000000eded0000edede0002244e000243340002233300021333
// 099:000000000000000000000000ded00000deded000222ed0004442200033344400
// 100:000000000000000d0000002d00000022000002210000223300dd243300dee433
// 101:00000000d0000000ee000000edd000001dee000031edd000312dee003122edd0
// 102:00000000000000000000000000ee222200dd242100ee433300dd4333000ee433
// 103:0000000000000000000000002ee000002dd000001ee000001dd0000031ee0000
// 112:0002133300022111000edede000edede00000000000000000000000000000000
// 113:1111110022222000deded000deded00000000000000000000000000000000000
// 114:00022113000eded1000edede0000000e00000000000000000000000000000000
// 115:1113330022211100ded22000deded000000ed000000000000000000000000000
// 116:000edd440000dee200000edd000000de0000000e000000000000000000000000
// 117:43122de02431200022431000e2243000dd000000de0000000000000000000000
// 118:000dd243000ee243000dd2430000ee240000dd24000000040000000000000000
// 119:12dd000012ee000012dd0000312ee000312dd000310000000000000000000000
// </SPRITES>

// <WAVES>
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:010001000100010001000100010001000100010001000100010001000100010001000100010001000100010001000100010001000100010001000100008000000000
// </SFX>

// <PALETTE>
// 000:1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57
// </PALETTE>

