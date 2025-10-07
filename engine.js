/**
 * @class Engine
 * @description Manages the game canvas, rendering context, sprites, and the main game loop.
 */
export class Engine {
    /**
     * @param {HTMLCanvasElement} canvas The canvas element to render to.
     */
    constructor(canvas) {
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext("2d");
        /** @type {Sprite[]} */
        this.sprites = [];
        /** @type {Set<string>} */
        this.pressedKeys = new Set();
        /** @type {Object.<string, any>} */
        this.variables = {};

        document.addEventListener("keydown", (event) => {
            this.pressedKeys.add(event.code);
            event.preventDefault();
        });

        document.addEventListener("keyup", (event) => {
            this.pressedKeys.delete(event.code);
            event.preventDefault();
        });
    }

    /**
     * @description The main game loop. Clears the canvas and calls tick() on all sprites.
     */
    gametick() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.sprites.length; i++) {
            this.sprites[i].tick();
        }
    }
}

/**
 * @class Sprite
 * @description Represents a game object with position, appearance, and behavior.
 */
export class Sprite {
    /**
     * @param {number} x The x-coordinate of the sprite.
     * @param {number} y The y-coordinate of the sprite.
     * @param {string} image The base path to the sprite's images.
     * @param {number} [facing=0] The initial facing direction of the sprite (0-15).
     * @param {number} [scale=1] The scaling factor for the sprite's image.
     * @param {Engine} engine The game engine instance.
     */
    constructor(x, y, image, facing = 0, scale = 1, engine) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.facing = facing;
        this.movementvector = new Victor(0, 0);
        this.visibility = true;
        this.images = [];
        this.alive = true;
        this.width = 0;
        this.height = 0;
        this.scale = scale;
        this.engine = engine;
        this.loaded = false;
        let imagesToLoad = (this.facing === -1) ? 1 : 16;

        const onImageLoad = () => {
            imagesToLoad--;
            if (imagesToLoad === 0) {
                this.loaded = true;
            }
        };

        for (let i = 0; i < 16; i++) {
            const element = new Image();
            element.src = this.image + String(i).padStart(3, "0") + ".png";
            element.onload = () => {
                if (this.width === 0 || element.naturalWidth > this.width) {
                    this.width = element.naturalWidth * this.scale;
                }
                if (this.height === 0 || element.naturalHeight > this.height) {
                    this.height = element.naturalHeight * this.scale;
                }
                onImageLoad();
            };
            this.images.push(element);
            if (this.facing === -1) {
                this.facing = 0;
                break;
            }
        }
    }

    /**
     * @description Moves the sprite to a new position.
     * @param {number} x The new x-coordinate.
     * @param {number} y The new y-coordinate.
     * @param {number} [facing=this.facing] The new facing direction.
     */
    goTo(x, y, facing = this.facing) {
        this.x = x;
        this.y = y;
        this.facing = facing;
        this.movementvector = new Victor(0, 0);
    }

    /**
     * @description Hides the sprite, so it is not rendered.
     */
    hide() {
        this.visibility = false;
    }

    /**
     * @description Shows the sprite, so it is rendered.
     */
    show() {
        this.visibility = true;
    }

    /**
     * @description Draws the sprite on the canvas.
     */
    draw() {
        if (!this.loaded) {
            return;
        }
        this.engine.ctx.drawImage(this.images[this.facing], this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    /**
     * @description Updates the sprite's state for the current frame.
     */
    tick() {
        if (this.visibility) {
            this.draw();
        }
        if (this.x >= this.engine.canvas.width) {
            this.x = -24;
        } else if (this.x <= -25) {
            this.x = this.engine.canvas.width - 1;
        }
        if (this.y >= this.engine.canvas.height) {
            this.y = -24;
        } else if (this.y <= -25) {
            this.y = this.engine.canvas.height - 1;
        }
        this.x += this.movementvector.x;
        this.y += this.movementvector.y;
    }

    /**
     * @description Accelerates the sprite by a given vector.
     * @param {number} x The x component of the acceleration.
     * @param {number} y The y component of the acceleration.
     */
    accelerate(x, y) {
        this.movementvector.x += x;
        this.movementvector.y += y;
    }
}