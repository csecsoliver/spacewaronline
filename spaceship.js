import * as engine from './engine.js';
import * as bullet from './bullet.js';
import * as flame from './flame.js';
import * as explosion from './explosion.js'
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
        this.fireCooldown =0;
        this.explosion = document.createElement("img");
        this.explosion.src = "./images/explosion-000.png"
        
    }

    explode() {
        if (!this.alive){
            return;
        }
        const explosionn = new explosion.Explosion(this.x, this.y);
        explosionn.draw();
        engine.sprites.push(explosionn)
        

        let enemy = null;
        engine.sprites.forEach(player => {
            if(player instanceof Spaceship)
            {
                if(player.fire != this.fire){
                    enemy = player
                }
                }})
        this.hide();
        this.alive = false;
        let title = document.getElementById('win')
        if(title.style.display != 'block'){
            title.innerText=`Player ${enemy.player+1} Wins`
        }
        title.style.display = 'block'
        
        
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
                    // console.log(finalVector);
                    if (this.movementvector.length() < finalVector.length() && this.movementvector.length() > engine.speed_of_shit *0.5){

                        // console.log("slow down to thrust");
                        break;
                    } else{

                        this.movementvector.add(thrustVector);

                        
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
                    if (this.fireCooldown <= 0 && this.alive){
                        engine.sprites.forEach(player => {
                            if(player instanceof Spaceship)
                            {
                                if(player.fire != this.fire){
                                    let newBullet = new bullet.Bullet(this.x, this.y, "./images/torpedo-big-", this.facing, this.movementvector ,1, player)
                                    engine.sprites.push(newBullet)
                                    // console.log(player)
                                }
                            }
                        })
                        this.fireCooldown = 180;
                    }

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
        this.fireCooldown -=1;
        super.tick();
    }
}