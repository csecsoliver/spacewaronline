import * as engine from './engine.js';
import * as bullet from './bullet.js';
import * as flame from './flame.js';
export class Spaceship extends engine.Sprite {
    constructor(x, y, controls, facing = 0, player = 0) {
        super(x,y,engine.spriteImages[`ship${player}`], facing);




        this.thrust = controls[0];
        this.rotateLeft = controls[1];
        this.rotateRight = controls[2];
        this.fire = controls[3];
        this.warp = controls[4];
        this.player = player; // player number zero indexed
        this.visibility = true; // to draw or not to draw
        this.rotateRightCooldown = 0; // cooldown for rotate right in ticks (frames)
        this.rotateLeftCooldown = 0; // cooldown for rotate left in ticks (frames)
        this.warpCooldown =0; // cooldown for warp in ticks (frames) 
        this.flameCooldown =0;
    }

    explode() {

        this.hide();
        this.alive = false;
        console.log("Spaceship exploded!");

    }
    tick(){

        for (const key of engine.pressedKeys) {

            switch (key) {
                case this.thrust:
                    if (this.alive){
                        if (this.flameCooldown == 0){
                            engine.sprites.push(new flame.Flame(this.x, this.y, this.facing));
                            this.flameCooldown = 10;
                        } else{
                            this.flameCooldown-=1;
                        }
                    }
                    const thrustVector = new Victor(Math.cos((this.facing*22.5)*(Math.PI/180)),Math.sin((this.facing*22.5)*(Math.PI/180)));
                    thrustVector.multiplyScalar(0.07);
                    thrustVector.rotateDeg(-90);
                    const finalVector = this.movementvector.clone();
                    finalVector.add(thrustVector);
                    console.log(finalVector);
                    if (this.movementvector.length() < finalVector.length() && this.movementvector.length() > engine.speed_of_shit *0.5){
                        
                        console.log("slow down to thrust");
                        break;
                    } else{
                        
                        this.movementvector.add(thrustVector);

                        console.log("Movement vector exceeds final vector length.");
                    }
                    
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
                    // Math.cos((this.facing*22.5)*(Math.PI/180)),Math.sin((this.facing*22.5)*(Math.PI/180))
                    let newBullet = new bullet.Bullet(this.x, this.y, "./images/torpedo-big-", this.facing, 1)
                    engine.sprites.push(newBullet)
                    break;
                case this.warp:
                    if (this.warpCooldown <= 0){
                        this.goTo(Math.random()*800,Math.random()*600, this.facing);
                        this.warpCooldown = 360;
                    }

                    break;
            }
            if (this.movementvector.length >=1.0){
                this.movementvector.multiplyScalar(0.5);
            }
        }
        while (this.movementvector.length() >=engine.speed_of_shit){
            this.movementvector.multiplyScalar(0.99999);
        }
        this.movementvector.multiplyScalar(0.997);


        this.warpCooldown -=1;
        // console.log(this.movementvector.length());
        super.tick();
    }
}