import { Sprite } from './engine.js';

export class Bullet extends Sprite {
    constructor(x, y, image, facing = -1, movementvec = 0, scale = 1, enemy = null, engine) {
        super(x, y, image, facing, scale, engine);
        this.radius = 3;
        this.speedmulti = 5;
        this.iscolliding = false;
        this.enemyspaceship = enemy;
        this.bulletAlive = 2;
        this.isdeleted = false;
        this.movementvector.x = movementvec.x;
        this.movementvector.y = movementvec.y;
        setTimeout(() => {
            this.delete()
        }, this.bulletAlive * 1000);
    }

    collidingWithSpaceship() {
        let squaredDistance = (this.x - this.enemyspaceship.x) ** 2 + (this.y - this.enemyspaceship.y) ** 2;
        return squaredDistance <= (30) ** 2;
    }

    delete() {
        if (this.isdeleted == false) {
            const index = this.engine.sprites.indexOf(this);
            if (index > -1) {
                this.engine.sprites.splice(index, 1);
            }
        }
        this.isdeleted = true;
    }

    tick() {
        const thrustVector = new Victor(Math.cos((this.facing * 22.5) * (Math.PI / 180)), Math.sin((this.facing * 22.5) * (Math.PI / 180)));
        thrustVector.multiplyScalar(this.speedmulti);
        thrustVector.rotateDeg(-90);

        this.movementvector = thrustVector;
        if (this.collidingWithSpaceship()) {
            this.enemyspaceship.explode();
            this.delete();
        }
        super.tick();
    }
}