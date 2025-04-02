import {ctx, spaceships} from './data.js';
export class Spaceship {
    constructor(x, y, controls, facing = 0, player) {
        this.x = x;
        this.y = y;

        this.controls = controls;
        this.image = spaceships[player]

        this.thrust = controls[0];
        this.rotateLeft = controls[1];
        this.rotateRight = controls[2];
        this.fire = controls[3];
        this.warp = controls[4];

        this.facing = facing;

        this.movementvector = new Victor(0,0)
        this.visibility = true;

    }
    goTo(x, y, facing) {
        this.x = x;
        this.y = y;
        this.velocity =0;

    }

    explode() {

        this.visibility = false;

    }
    draw() {
        if (this.visibility) {
            // Draw the spaceship at (this.x, this.y) with rotation this.angle
            // Use canvas 2D context to draw the spaceship


        }
    }
    tick(){
        this.x += this.movementvector.x;
        this.y += this.movementvector.y;
        window.ke
    }


}