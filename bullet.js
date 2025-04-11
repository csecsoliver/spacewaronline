import * as engine from './engine.js';

// Bullet settings
const bulletSpeed = 10; // Pixels per frame
const fireRate = 10; // Frames between shots
let player1FireCooldown = 0;
let player2FireCooldown = 0;
const bullets = [];



// Bullet class
export class Bullet extends engine.Sprite {
    constructor(x, y, image, facing = -1, scale = 1) {
        super(x,y,image,facing,scale)
        this.radius = 3
    }

}
