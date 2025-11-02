
import {Spaceship} from "./spaceship.js";
import {Planet} from "./scene.js";
import * as engine from "./engine.js";
const player1_binds = {
    "thrust":"KeyW",
    "rotateLeft":"KeyA",
    "rotateRight": "KeyD",
    "fire": "Tab",
    "warp": "Backquote",
};
const player2_binds = {
    "thrust":"ArrowUp",
    "rotateLeft":"ArrowLeft",
    "rotateRight": "ArrowRight",
    "fire": "ShiftRight",
    "warp": "Enter",
};

if (localStorage.getItem("player1_binds")) {
    Object.assign(player1_binds, JSON.parse(localStorage.getItem("player1_binds")));
}
if (localStorage.getItem("player2_binds")) {
    Object.assign(player2_binds, JSON.parse(localStorage.getItem("player2_binds")));
}

console.log("frame script loaded");
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("canvas").width = 800;
    document.getElementById("canvas").height = 600;
    updateUIWithBinds();
    engine.sprites.push(new Spaceship(100, 100, [player1_binds["thrust"], player1_binds["left"], player1_binds["right"], player1_binds["fire"], player1_binds["warp"]],6,0));
    engine.sprites.push(new Spaceship(700, 500, [player2_binds["thrust"], player2_binds["left"], player2_binds["right"], player2_binds["fire"], player2_binds["warp"]], 14,1));
    engine.sprites.push(new Planet(400, 300, engine.spriteImages["planet"]));
    for (const element of [...document.getElementById("player1").children, ...document.getElementById("player2").children]) {
        element.lastChild.onclick = (event) => setbinding(event.target);
    }
    gameloop();

});

function gameloop(){
    requestAnimationFrame(gameloop);
    engine.gametick();

}

function setbinding(element) {
    const player_id = element.parentElement.parentElement.id;
    const player_binds = (player_id === "player1") ? player1_binds : player2_binds;
    const player_num = (player_id === "player1") ? 0 : 1;

    if (!player_binds) {
        console.log("Unknown element: ", element);
        return;
    }

    element.innerText = "Press a key to bind";
    element.addEventListener("keydown", (event) => {
        const bind_key = element.getAttribute("data-bind");
        player_binds[bind_key] = event.code;
        localStorage.setItem(`${player_id}_binds`, JSON.stringify(player_binds));

        engine.sprites.find((sprite) => sprite.player === player_num)[bind_key] = event.code;
        element.innerText = "Set keybind";
        element.parentElement.firstElementChild.innerHTML = event.code;
    }, {once: true});
}

function updateUIWithBinds() {
    for (const [key, value] of Object.entries(player1_binds)) {
        const button = document.querySelector(`#player1 button[data-bind=${key}]`);
        if (button) {
            button.parentElement.firstElementChild.innerHTML = value;
        }
    }
    for (const [key, value] of Object.entries(player2_binds)) {
        const button = document.querySelector(`#player2 button[data-bind=${key}]`);
        if (button) {
            button.parentElement.firstElementChild.innerHTML = value;
        }
    }
}

