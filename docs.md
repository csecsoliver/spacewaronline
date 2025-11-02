# Game Engine Documentation

This document provides instructions on how to use the reusable game engine. The engine is built around two core classes: `Engine` and `Sprite`.

## `Engine` Class

The `Engine` class is the heart of the game. It manages the canvas, rendering, game loop, and user input.

### Setting up the Engine

To use the engine, you first need to import it and create an instance by passing a canvas element to its constructor.

```javascript
import { Engine } from "./engine.js";

const canvas = document.getElementById("canvas");
const engine = new Engine(canvas);
```

### Properties

-   `engine.canvas`: The HTML canvas element the engine is rendering to.
-   `engine.ctx`: The 2D rendering context of the canvas.
-   `engine.sprites`: An array containing all the sprite objects in the game. To add a sprite to the game, push it to this array.
-   `engine.pressedKeys`: A `Set` containing the `event.code` strings of all currently pressed keys.
-   `engine.variables`: A general-purpose object to store any game-specific variables, such as cooldowns or scores.

### Methods

-   `engine.gametick()`: This method clears the canvas and calls the `tick()` method on every sprite in the `engine.sprites` array. It should be called once per frame, typically within a `requestAnimationFrame` loop.

### Game Loop

The game loop is managed by continuously calling `engine.gametick()`.

```javascript
function gameloop() {
    requestAnimationFrame(gameloop);
    engine.gametick();
}

gameloop();
```

## `Sprite` Class

The `Sprite` class is the base class for all game objects. You should extend this class to create your own game objects with custom behaviors.

### Creating a Sprite

To create a custom sprite, extend the `Sprite` class and call the `super()` constructor with the necessary parameters.

```javascript
import { Sprite } from "./engine.js";

class MySprite extends Sprite {
    constructor(x, y, image, engine) {
        super(x, y, image, 0, 1, engine);
    }

    tick() {
        // Custom logic for each frame
        super.tick(); // Handles basic movement and drawing
    }
}
```

### Constructor

`new Sprite(x, y, image, facing, scale, engine)`

-   `x`, `y`: The coordinates for the center of the sprite.
-   `image`: The base path to the sprite's images (e.g., `"./images/my-sprite-"`). The engine will append `000.png`, `001.png`, etc.
-   `facing`: An integer from 0 to 15 representing the direction the sprite is facing (in 22.5-degree increments).
-   `scale`: A number to scale the sprite's size.
-   `engine`: The `Engine` instance.

### Properties

-   `sprite.x`, `sprite.y`: The current position of the sprite.
-   `sprite.movementvector`: A `Victor` object representing the sprite's velocity.
-   `sprite.visibility`: A boolean that determines if the sprite is rendered.
-   `sprite.alive`: A boolean indicating if the sprite is "alive." This can be used for game logic.
-   `sprite.loaded`: A boolean indicating if the sprite's images have finished loading.

### Methods

-   `sprite.tick()`: Updates the sprite's state. By default, it handles movement and drawing. You should override this method to add custom behavior.
-   `sprite.draw()`: Renders the sprite on the canvas.
-   `sprite.goTo(x, y, facing)`: Teleports the sprite to a new position and resets its movement vector.
-   `sprite.accelerate(x, y)`: Adds to the sprite's `movementvector`.
-   `sprite.hide()` / `sprite.show()`: Toggles the sprite's visibility.