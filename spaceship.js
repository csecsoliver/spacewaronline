import { Sprite } from './engine.js';
import { Bullet } from './bullet.js';
import { Flame } from './flame.js';
import { Explosion } from './explosion.js'

export class Spaceship extends Sprite {
    constructor(x, y, image, controls, facing = 0, player = 0, engine) {
        super(x, y, image, facing, 1, engine);

        this.thrust = controls[0];
        this.rotateLeft = controls[1];
        this.rotateRight = controls[2];
        this.fire = controls[3];
        this.warp = controls[4];
        this.player = player;
        this.visibility = true;
        this.rotateRightCooldown = 0;
        this.rotateLeftCooldown = 0;
        this.warpCooldown = 0;
        this.flameCooldown = 0;
        this.fireCooldown = 0;
        this.explosion = document.createElement("img");
        this.explosion.src = "./images/explosion-000.png"
    }

    explode() {
        if (!this.alive) {
            return;
        }
        const explosionn = new Explosion(this.x, this.y, this.engine);
        this.engine.sprites.push(explosionn)

        let enemy = null;
        this.engine.sprites.forEach(player => {
            if (player instanceof Spaceship) {
                if (player.fire != this.fire) {
                    enemy = player
                }
            }
        })
        this.hide();
        this.alive = false;
        let title = document.getElementById('win')
        if (title.style.display != 'block') {
            title.innerText = `Player ${enemy.player + 1} Wins`
        }
        title.style.display = 'block'
        console.log("Spaceship exploded!");
    }

    tick() {
        for (const key of this.engine.pressedKeys) {
            switch (key) {
                case this.thrust:
                    if (this.alive) {
                        if (this.flameCooldown == 0) {
                            this.engine.sprites.push(new Flame(this.x, this.y, this.facing, this.engine));
                            this.flameCooldown = 10;
                        } else {
                            this.flameCooldown -= 1;
                        }
                    }
                    const thrustVector = new Victor(Math.cos((this.facing * 22.5) * (Math.PI / 180)), Math.sin((this.facing * 22.5) * (Math.PI / 180)));
                    thrustVector.multiplyScalar(0.07);
                    thrustVector.rotateDeg(-90);
                    this.movementvector.add(thrustVector);
                    break;
                case this.rotateLeft:
                    if (this.rotateLeftCooldown === 0) {
                        this.rotateLeftCooldown = 10;
                        if (this.facing === 0) {
                            this.facing = 15;
                            break;
                        }
                        this.facing -= 1;
                        break;
                    }
                    this.rotateLeftCooldown -= 1;
                    break;
                case this.rotateRight:
                    if (this.rotateRightCooldown === 0) {
                        this.rotateRightCooldown = 10;
                        if (this.facing === 15) {
                            this.facing = 0;
                        } else {
                            this.facing += 1;
                        }
                    } else {
                        this.rotateRightCooldown -= 1;
                    }
                    break;
                case this.fire:
                    if (this.fireCooldown <= 0 && this.alive) {
                        this.engine.sprites.forEach(player => {
                            if (player instanceof Spaceship) {
                                if (player.fire != this.fire) {
                                    let newBullet = new Bullet(this.x, this.y, "./images/torpedo-big-", this.facing, this.movementvector, 1, player, this.engine)
                                    this.engine.sprites.push(newBullet)
                                }
                            }
                        })
                        this.fireCooldown = this.engine.variables.fireCooldown;
                    }
                    break;
                case this.warp:
                    if (this.warpCooldown <= 0) {
                        this.goTo(Math.random() * this.engine.canvas.width, Math.random() * this.engine.canvas.height, this.facing);
                        this.warpCooldown = this.engine.variables.warpCooldown;
                    }
                    break;
            }
        }
        this.movementvector.multiplyScalar(0.997);
        this.warpCooldown -= 1;
        this.fireCooldown -= 1;
        super.tick();
    }
}