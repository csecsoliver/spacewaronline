import * as engine from './engine.js';

export class Planet extends engine.Sprite {
  constructor(x = 400, y = 300, image) {
    super(x, y, image, 0, 1);
    this.width = 64; 
    this.height = 64; 
    this.visibility = true; 
  }
  tick() {
    super.tick();
    for (const element of engine.sprites) {
      if (typeof element.explode === "function" && element !== this) {
        const dx = this.x - element.x;
        const dy = this.y - element.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = 1000  / (distance * distance); // Gravitational force
        element.movementvector.add(new Victor(dx, dy).normalize().multiplyScalar(force));
        if (distance < this.width/2) {
          // Collision detected
          element.explode(); // Call the explode method of the spaceship
        }
      }
        
    }
  }
}