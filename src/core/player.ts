class Player{
    MaxSteer: number = 3;
    x: number; 
    y: number;
    angle: number;
    speed: number;
    steer: number;
    controller: ITic | undefined;
  
    constructor({ x, y, angle, speed }: { x: number; y: number; angle: number; speed: number; }){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.steer = 0;
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
    }

    draw(t: number): void {
        var index = ((this.angle + 22.5) / 45) % 8;
        print(index, 84, 100);

        spr(256 + Math.floor(index) * 2, this.x-8, this.y-8, 0, 1, 0, 0, 2, 2);
    }
}
