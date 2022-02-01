class Player{
    MaxSteer: number = 3;

    x: number; 
    y: number;
    angle: number;
    speed: number;
    steer: number;
    controller: ITic | undefined;
    color: number;
    car: number;
  
    constructor({ x, y, angle, speed }: { x: number; y: number; angle: number; speed: number; }){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.steer = 0;
        this.color = 0;
        this.car = 0;
    }

    steerLeft(): void {
        if (this.steer > 0-this.MaxSteer) this.steer--;
    }
    steerRight(): void{
        if (this.steer < this.MaxSteer) this.steer++;
    }
    fire(): void{

    }
    tic(t: number): void {
        this.controller?.tic(t);
        this.angle += this.steer;
        this.angle = (this.angle + 360) % 360;
        var rad = this.angle / 360 * Math.PI*2;
        this.x += Math.cos(rad) * this.speed;
        this.y += Math.sin(rad) * this.speed;
        this.x = (this.x + screen.width) % screen.width;
        this.y = (this.y + screen.height) % screen.height;

        // 0:red, 1:green, 2: blue, 3: warm/rainbow, 4: greyscale, 5: metal
        if (keyp(3 /*C*/, 1000, 1000)) { ++this.color; this.color %= 6;}

        // 0: Tractor, 1: Tank, 2: 8x8, 3: [...], 4: quarter 
        if (keyp(22 /*V*/, 1000, 1000)) {this.car++; this.car %= 5;}
    }

    setPalette(to: number, flipHighlight: boolean) {
        // A car can use 4 colors changing colors, as well as changing greyscales for the wheels
        // The changing colors are 1,2,3 and 4, which are dark purple, red, orange and yellow.
        // The other colors are also ranges of 4 dark to light colors, to get another color style in the car.
        // Depending on the car, the lightest and darkest color can be used as highlight, and will be swapped.
        var colors:number[];
        if (to == 1) { // Green
            colors = [9,7,6,5]
        }
        else if (to == 2) { // Blue
            colors = [8,9,10,11]
        }
        else if (to == 3) { // Warm
            colors = [1,9,6,4]
        }
        else if (to == 4) { // Grey
            colors = [15,14,13,12]
        }
        else if (to == 5) { // Metal
            colors = [15,7,10,12]
        }
        else { // Red, default
            colors = [1,2,3,4]
        }

        if (flipHighlight) {
            colors = [colors[3],colors[1],colors[2],colors[0]];
        }

        poke4(PALETTE_MAP * 2 + 1, colors[0]);
        poke4(PALETTE_MAP * 2 + 2, colors[1]);
        poke4(PALETTE_MAP * 2 + 3, colors[2]);
        poke4(PALETTE_MAP * 2 + 4, colors[3]);
    }

    setWheelPalette(t: number){
        // White stays white, black stays black, but the three grays can shift 
        // to light (lightest becoming white) or dark (darkest becoming black)
        poke4(PALETTE_MAP * 2 + 13, 13);
        poke4(PALETTE_MAP * 2 + 14, 14);
        poke4(PALETTE_MAP * 2 + 15, 15);
        var delay = 3;
        var i = Math.floor(t % (4*delay) / delay);
        if (i == 0) {
            poke4(PALETTE_MAP * 2 + 13, 14);
            poke4(PALETTE_MAP * 2 + 14, 13);
            poke4(PALETTE_MAP * 2 + 15, 15);
        }
        else if (i == 1) {
            poke4(PALETTE_MAP * 2 + 13, 13);
            poke4(PALETTE_MAP * 2 + 14, 13);
            poke4(PALETTE_MAP * 2 + 15, 14);
        }
        else if (i == 2) {
            poke4(PALETTE_MAP * 2 + 13, 14);
            poke4(PALETTE_MAP * 2 + 14, 13);
            poke4(PALETTE_MAP * 2 + 15, 14);
        }
        else if (i == 3) {
        }
    }

    draw(t: number): void {
        this.setWheelPalette(t);
        
        if (this.car < 2) {
            this.setPalette(this.color, false);
            var index = ((this.angle + 22.5) / 45) % 8;
            print(index, 84, 100, undefined, undefined, 1, true);
            spr(256 + (this.car * 32) + Math.floor(index) * 2, this.x-8, this.y-8, 0, 1, 0, 0, 2, 2);
        }
        else if (this.car >= 2 && this.car <= 3) {
            this.setPalette(this.color, false);
            var index = ((this.angle + 11.25) / 22.5) % 16;
            print(index, 84, 100, undefined, undefined, 1, true);
            spr(320 + ((this.car-2) * 16) + Math.floor(index), this.x-4, this.y-4, 6, 1, 0, 0, 1, 1);
        }
        else if (this.car == 4){
            var index = ((this.angle + 11.25) / 22.5) % 16;
            var spriteIndex = Math.floor(index);
            print(spriteIndex, 84, 100, undefined, undefined, 1, true);
            var rotate = Math.floor(spriteIndex / 4);
            print(rotate, 84, 110, undefined, undefined, 1, true);

            var r:0|1|2|3 = 0;
            switch (rotate) {
                case 0: r = 0; break;
                case 1: r = 1; break;
                case 2: r = 2; break;
                case 3: r = 3; break;
                default: r = 0; break;
            }

            var flipHighlight = [4,5,8,9,11,14,15].indexOf(spriteIndex) > -1
            spriteIndex %= 4;
            print(x, 84, 120, undefined, undefined, 1, true);

            this.setPalette(this.color, flipHighlight);
            spr(352 + ((this.car-4) * 16) + spriteIndex * 2, this.x-4, this.y-4, 0, 1, 0, r, 2, 2);
        }

    }
}
