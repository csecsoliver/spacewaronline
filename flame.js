import { Sprite } from './engine.js';

export class Flame extends Sprite {
    constructor(x, y, facing = 0, engine) {
        super(x, y, "./images/flame-", -1, 1, engine);
        this.intensity = 1;
        this.decay = 0.01;
        this.offsetVector = new Victor(Math.cos((facing * 22.5) * (Math.PI / 180)), Math.sin((facing * 22.5) * (Math.PI / 180)));
        this.offsetVector.rotateDeg(-90);
        this.x -= this.offsetVector.x * 10;
        this.y -= this.offsetVector.y * 10;
    }

    tick() {
        super.tick();
        this.intensity -= this.decay;
        if (this.intensity <= 0) {
            const index = this.engine.sprites.indexOf(this);
            if (index > -1) {
                this.engine.sprites.splice(index, 1);
            }
        }
    }

    draw() {
        this.engine.ctx.save();
        this.engine.ctx.globalAlpha = this.intensity;
        super.draw();
        this.engine.ctx.restore();
    }
}