import * as engine from './engine.js';
export class Flame extends engine.Sprite {
    constructor(x, y, facing = 0) {
        super(x,y,engine.spriteImages[`flame`], 0);
        this.intensity = 1;
        this.decay = 0.01;
        this.offsetVector = new Victor(Math.cos((facing*22.5)*(Math.PI/180)),Math.sin((facing*22.5)*(Math.PI/180)));
        this.offsetVector.rotateDeg(-90);
        this.x -= this.offsetVector.x*10;
        this.y -= this.offsetVector.y*10;

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