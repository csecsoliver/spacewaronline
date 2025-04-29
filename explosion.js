import * as engine from './engine.js';

export class Explosion extends engine.Sprite {
    constructor(x, y) {
        super(x, y, engine.spriteImages[`explosion`], -1, 2);
        this.intensity = 1;
        this.decay = 0.03;
    }
    tick() {

        super.tick();
        this.intensity -= this.decay;
        if (this.intensity <= 0) {
            this.intensity =0;
        }
    }
    draw() {
        engine.ctx.save();
        engine.ctx.globalAlpha = this.intensity;
        super.draw();
        engine.ctx.restore();

    }
}