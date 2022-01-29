interface IPlayer{
    steerLeft(): void;
    steerRight(): void;
    fire(): void;
}

class Controller{
    player: IPlayer | undefined;

    constructor(){}
}

class ButtonController extends Controller {
    left: number;
    right: number;
    fire: number;

    constructor(left: number, right: number, fire: number){
        super();
        this.left = left;
        this.right = right;
        this.fire = fire;
    }

    tic(t: number): void {
        /*if (this.player === undefined) return;

        if (btnp(this.left)) this.player.steerLeft();
        if (btnp(this.right)) this.player.steerRight();
        if (btnp(this.fire)) this.player.fire();*/
    }
}