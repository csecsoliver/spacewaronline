import { Sprite } from './engine.js';

export class Explosion extends Sprite {
    constructor(x, y, engine) {
        super(x, y, "./images/boom-big-", -1, 2, engine);
        this.intensity = 1;
        this.decay = 0.03;
    }

    tick() {
        super.tick();
        this.intensity -= this.decay;
        if (this.intensity <= 0) {
            this.intensity = 0;
        }
    }

    draw() {
        this.engine.ctx.save();
        this.engine.ctx.globalAlpha = this.intensity;
        super.draw();
        this.engine.ctx.restore();
    }
}