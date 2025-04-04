
export const ctx = document.getElementById("canvas").getContext("2d");
export const canvas = document.getElementById("canvas");
export const spriteImages = {
    "ship0": "./images/xform-big-",
    "ship1": "./images/ywing-big-",
    "planet": "./images/planet",
} // path/to/image(000.png)
export var sprites = [];
export var pressedKeys = new Set([]);
document.addEventListener("keydown", (event) => {
    pressedKeys.add(event.code);
    // console.log(pressedKeys);
    event.preventDefault();
})
document.addEventListener("keyup", (event) => {
    pressedKeys.delete(event.code);
    // console.log(pressedKeys);
    event.preventDefault();
})
export function gametick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < sprites.length; i++) {

        sprites[i].tick();
    }


}
export class Sprite {
    constructor(x, y, image, facing = 0) {
        this.x = x;
        this.y = y;
        this.image = image; // path/to/image(000.png)
        this.facing = facing; // the image number 1 through 15
        this.movementvector = new Victor(0,0)
        this.visibility = true;
        // noinspection JSPrimitiveTypeWrapperUsage
        this.images = [];

        for (let i = 0; i < 16; i++) {
            const element = new Image();
            element.src = this.image + String(i).padStart(3, "0") + ".png";
            this.images.push(element);
        }

    }

    goTo(x, y, facing) {
        this.x = x;
        this.y = y;
        this.facing = facing;
    }
    hide() {
        this.visibility = false;
    }
    show() {
        this.visibility = true;
    }
    draw() {

        ctx.drawImage(this.images[this.facing], this.x, this.y);
    }
    tick(){
        if (this.visibility) {
            // Draw the spaceship at (this.x, this.y) with rotation this.angle
            // Use canvas 2D context to draw the spaceship
            this.draw()
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