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

        // 0: Tractor, 1: Tank
        if (key(22 /*V*/)) {this.car++; this.car %= 2;}
    }

    setPalette(to: number) {
        // Default red
        poke4(PALETTE_MAP * 2 + 1, 1);
        poke4(PALETTE_MAP * 2 + 2, 2);
        poke4(PALETTE_MAP * 2 + 3, 3);
        poke4(PALETTE_MAP * 2 + 4, 4);
        if (to == 1) { // Green
            poke4(PALETTE_MAP * 2 + 1, 8);
            poke4(PALETTE_MAP * 2 + 2, 7);
            poke4(PALETTE_MAP * 2 + 3, 6);
            poke4(PALETTE_MAP * 2 + 4, 5);
        }
        else if (to == 2) { // Blue
            poke4(PALETTE_MAP * 2 + 1, 8);
            poke4(PALETTE_MAP * 2 + 2, 9);
            poke4(PALETTE_MAP * 2 + 3, 10);
            poke4(PALETTE_MAP * 2 + 4, 11);
        }
        else if (to == 3) { // Warm
            poke4(PALETTE_MAP * 2 + 2, 9);
            poke4(PALETTE_MAP * 2 + 3, 6);
        }
        else if (to == 4) { // Grey
            poke4(PALETTE_MAP * 2 + 1, 15);
            poke4(PALETTE_MAP * 2 + 2, 14);
            poke4(PALETTE_MAP * 2 + 3, 13);
            poke4(PALETTE_MAP * 2 + 4, 12);
        }
        else if (to == 5) { // Metal
            poke4(PALETTE_MAP * 2 + 1, 15);
            poke4(PALETTE_MAP * 2 + 2, 7);
            poke4(PALETTE_MAP * 2 + 3, 10);
            poke4(PALETTE_MAP * 2 + 4, 12);
        }
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
        var index = ((this.angle + 22.5) / 45) % 8;
        print(index, 84, 100, undefined, undefined, 1, true);
        this.setPalette(this.color);
        this.setWheelPalette(t);
        spr(256 + (this.car * 32) + Math.floor(index) * 2, this.x-8, this.y-8, 0, 1, 0, 0, 2, 2);
    }
}
