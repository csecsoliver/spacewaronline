import * as engine from './engine.js';
export class Flame extends engine.Sprite {
    constructor(x, y, facing = 0) {
        super(x,y,engine.spriteImages[`flame`], 0);
        this.intensity = 1;
        this.decay = 0.01;
    }
    tick (){
    
        super.tick();
        this.intensity -= this.decay; 
        if (this.intensity   <=0){
            engine.sprites.splice(engine.sprites.indexOf(this),1);
        }
    }
    draw() {
        engine.ctx.save();
        engine.ctx.globalAlpha = this.intensity;
        super.draw();
        engine.ctx.restore();

    }
}