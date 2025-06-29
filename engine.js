export const ctx = document.getElementById("canvas").getContext("2d");
export const canvas = document.getElementById("canvas");
export const spriteImages = {
    "ship0": "./images/xform-big-",
    "ship1": "./images/ywing-big-",
    "planet": "./images/planet-",
    "flame": "./images/flame-",
    "explosion": "./images/boom-big-"
}; // path/to/image(000.png)
export var sprites = [];

export var variables = {
    "fireCooldown": 180,
    "warpCooldown": 360,
};

sprites.find((element)=>element.player === 0);
export var pressedKeys = new Set([]);
document.addEventListener("keydown", (event) => {
    pressedKeys.add(event.code);
    // console.log(pressedKeys);
    event.preventDefault();
});
document.addEventListener("keyup", (event) => {
    pressedKeys.delete(event.code);
    // console.log(pressedKeys);
    event.preventDefault();
});
export function gametick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let dead_counter = 0;
    for (let i = 0; i < sprites.length; i++) {

        sprites[i].tick();
        if (!sprites[i].alive) {
            dead_counter ++;
        }
    }
    if (dead_counter > 1) {
        location.reload();
        sprites = [];
        console.error("Game Over, reloading...");
    }


}
export class Sprite {
    constructor(x, y, image, facing = 0, scale = 1) {
        this.x = x;
        this.y = y;
        this.image = image; // path/to/image(000.png)
        this.facing = facing; // the image number 0 through 15
        this.movementvector = new Victor(0,0);
        this.visibility = true;

        this.images = [];
        this.alive= true;
        this.width = 0;
        this.height = 0;
        this.scale = scale;
        for (let i = 0; i < 16; i++) {
            
            const element = new Image();
            element.src = this.image + String(i).padStart(3, "0") + ".png";
            element.onload = () => {
                // Update the sprite dimensions based on the first loaded image, or keep max values
                if (this.width === 0 || element.naturalWidth > this.width) {
                    this.width = element.naturalWidth* this.scale;
                }
                if (this.height === 0 || element.naturalHeight > this.height) {
                    this.height = element.naturalHeight* this.scale;
                }
            };
            
            this.images.push(element);
            if (this.facing === -1) {
                this.facing = 0;
                break; // Stop loading images if facing is not specified
            }
        }


    }

    goTo(x, y, facing = this.facing) {
        this.x = x;
        this.y = y;
        this.facing = facing;
        this.movementvector = new Victor(0,0);
    }
    hide() {
        this.visibility = false;
    }
    show() {
        this.visibility = true;
    }
    draw() {

        ctx.drawImage(this.images[this.facing], this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        // ctx.beginPath();
        // ctx.strokeStyle = "red";
        // ctx.moveTo(this.x - 10, this.y);
        // ctx.lineTo(this.x + 10, this.y);
        // ctx.moveTo(this.x, this.y - 10);
        // ctx.lineTo(this.x, this.y + 10);
        // ctx.stroke();
        // ctx.beginPath();
        // ctx.moveTo(this.x-this.width/2, this.y-this.height/2);
        // ctx.lineTo(this.x+this.width/2, this.y-this.height/2);
        // ctx.lineTo(this.x+this.width/2, this.y+this.height/2);
        // ctx.lineTo(this.x-this.width/2, this.y+this.height/2);
        // ctx.lineTo(this.x-this.width/2, this.y-this.height/2);
        // ctx.stroke();

    }
    tick(){
        if (this.visibility) {
            // Draw the spaceship at (this.x, this.y) with rotation this.angle
            // Use canvas 2D context to draw the spaceship
            this.draw();
        }
        if (this.x >= 800){
            this.x = -24;
        } else if (this.x <=-25){
            this.x = 799;
        }
        if (this.y >= 600){
            this.y = -24;

        } else if (this.y <=-25){
            this.y = 599;
        }
        this.x += this.movementvector.x;
        this.y += this.movementvector.y;

    }
    accelerate(x, y) {
        this.movementvector.x += x;
        this.movementvector.y += y;
    }
}

export const speed_of_shit = 10;