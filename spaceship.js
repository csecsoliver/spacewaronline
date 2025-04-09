import * as engine from './engine.js';

export class Spaceship extends engine.Sprite {
    constructor(x, y, controls, facing = 0, player = 0) {
        super(x,y,engine.spriteImages[`ship${player}`], facing);




        this.thrust = controls[0];
        this.rotateLeft = controls[1];
        this.rotateRight = controls[2];
        this.fire = controls[3];
        this.warp = controls[4];
        this.player = player;
        this.visibility = true;
        this.rotateRightCooldown = 0;
        this.rotateLeftCooldown = 0;
        this.warpCooldown =0;
    }

    explode() {

        this.hide();

    }
    tick(){

        for (const key of engine.pressedKeys) {

            switch (key) {
                case this.thrust:
                    const thrustVector = new Victor(Math.cos((this.facing*22.5)*(Math.PI/180)),Math.sin((this.facing*22.5)*(Math.PI/180)));
                    thrustVector.multiplyScalar(0.05);
                    thrustVector.rotateDeg(-90);
                    this.movementvector.add(thrustVector);

                    break;
                case this.rotateLeft:
                    if (this.rotateLeftCooldown === 0){
                        this.rotateLeftCooldown = 10;
                        if (this.facing ===  0){
                            this.facing = 15;
                            break;
                        }
                        this.facing -=1;
                        break;
                    }

                    this.rotateLeftCooldown -=1;

                    break;
                case this.rotateRight:
                    if (this.rotateRightCooldown === 0){
                        this.rotateRightCooldown = 10;
                        if (this.facing ===  15){
                            this.facing = 0;
                        } else {
                            this.facing +=1;
                        }
                    } else{
                        this.rotateRightCooldown -=1;
                    }
                    break;
                case this.fire:
                    console.log("fire");
                    break;
                case this.warp:
                    if (this.warpCooldown <= 0){
                        this.goTo(Math.random()*800,Math.random()*600, this.facing);
                        this.warpCooldown = 360;
                    }

                    break;
            }
            if (this.movementvector.length >=1.0){
                this.movementvector.multiplyScalar(0.5)
            }
        }
        while (this.movementvector.length() >=engine.speed_of_shit*0.5){
            this.movementvector.multiplyScalar(0.99999);
        }

        this.warpCooldown -=1;
        console.log(this.movementvector.length());
        super.tick();
    }
}