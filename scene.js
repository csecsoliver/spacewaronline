import { Sprite } from './engine.js';
import { Spaceship } from './spaceship.js';

export class Planet extends Sprite {
    constructor(x = 400, y = 300, image, facing, scale, engine) {
        super(x, y, image, -1, 1.5, engine);
        this.visibility = true;
    }

    tick() {
        super.tick();
        for (const element of this.engine.sprites) {
            if (element instanceof Spaceship && element !== this) {
                const dx = this.x - element.x;
                const dy = this.y - element.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const force = 1000 / (distance * distance);
                if (distance > 250) {
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