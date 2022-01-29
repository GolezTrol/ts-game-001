interface ITic{
    tic(t: number): void;
}

class Game {
    player: Player;

    constructor() {
        this.player = new Player({ x: 100, y: 100, angle: 0, speed: 0.5 });
        var controller = new ButtonController(2, 3, 0);
        this.player.controller = controller;
        controller.player = this.player;
    }

    tic(t: number){
        poke(0x03FF8, 10)
        cls(0); //13);

        this.player.tic(t);

        this.player.draw(t);
    }
}
