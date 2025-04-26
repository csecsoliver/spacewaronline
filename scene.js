import * as engine from './engine.js';

export class Planet extends engine.Sprite {
  constructor(x = 400, y = 300, image, force = 1) {
    super(x, y, image, 0, 1.5);
    
    this.visibility = true; 
  }
  tick() {
    super.tick();
    for (const element of engine.sprites) {
      if (typeof element.explode === "function" && element !== this) {
        const dx = this.x - element.x;
        const dy = this.y - element.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = 1000 / (distance * distance);
        if (distance > 250 ) {
          continue;
        }
        element.movementvector.add(new Victor(dx, dy).normalize().multiplyScalar(force));
        if (distance < this.width / 2) {
          element.explode();
        }

      }
        
    }
  }
}