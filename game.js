import { Spaceship } from "./spaceship.js";
import { Planet } from "./scene.js";
import { Engine } from "./engine.js";

const player1_binds = {
    "thrust": "KeyW",
    "left": "KeyA",
    "right": "KeyD",
    "fire": "Tab",
    "warp": "Backquote",
};
const player2_binds = {
    "thrust": "ArrowUp",
    "left": "ArrowLeft",
    "right": "ArrowRight",
    "fire": "ShiftRight",
    "warp": "Enter",
};

const spriteImages = {
    "ship0": "./images/xform-big-",
    "ship1": "./images/ywing-big-",
    "planet": "./images/planet-",
    "flame": "./images/flame-",
    "explosion": "./images/boom-big-"
};

let engine;

function setbinding(element) {
    console.log(element);
    const parentId = element.parentElement.parentElement.id;
    const dataBind = element.getAttribute("data-bind");

    if (parentId === "player1") {
        element.innerText = "Press a key to bind";
        element.addEventListener("keydown", (event) => {
            player1_binds[dataBind] = event.code;
            const playerSprite = engine.sprites.find((e) => e.player === 0);
            if (playerSprite) {
                playerSprite[dataBind] = event.code;
            }
            element.innerText = "Set keybind";
            element.parentElement.firstElementChild.innerHTML = event.code;
        }, { once: true });
    } else if (parentId === "player2") {
        element.innerText = "Press a key to bind";
        element.addEventListener("keydown", (event) => {
            player2_binds[dataBind] = event.code;
            const playerSprite = engine.sprites.find((e) => e.player === 1);
            if (playerSprite) {
                playerSprite[dataBind] = event.code;
            }
            element.innerText = "Set keybind";
            element.parentElement.firstElementChild.innerHTML = event.code;
        }, { once: true });
    } else {
        console.log("Unknown element: ", element);
    }
}

console.log("frame script loaded");
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 600;

    engine = new Engine(canvas);
    engine.variables = {
        "fireCooldown": 180,
        "warpCooldown": 360,
    };

    engine.sprites.push(new Spaceship(100, 100, spriteImages["ship0"], [player1_binds["thrust"], player1_binds["left"], player1_binds["right"], player1_binds["fire"], player1_binds["warp"]], 6, 0, engine));
    engine.sprites.push(new Spaceship(700, 500, spriteImages["ship1"], [player2_binds["thrust"], player2_binds["left"], player2_binds["right"], player2_binds["fire"], player2_binds["warp"]], 14, 1, engine));
    engine.sprites.push(new Planet(400, 300, spriteImages["planet"], 0, 1, engine));
    
    document.querySelectorAll('#player1 button, #player2 button').forEach(button => {
        button.addEventListener('click', () => setbinding(button));
    });

    gameloop();
});

function gameloop() {
    requestAnimationFrame(gameloop);
    engine.gametick();

    let dead_counter = 0;
    for (let i = 0; i < engine.sprites.length; i++) {
        if (!engine.sprites[i].alive) {
            dead_counter++;
        }
    }
    if (dead_counter > 1) {
        location.reload();
        engine.sprites = [];
        console.error("Game Over, reloading...");
    }
}