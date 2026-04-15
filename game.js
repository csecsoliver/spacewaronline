
import {Spaceship} from "./spaceship.js";
import {Planet} from "./scene.js";
import * as engine from "./engine.js";
const player1_binds = {
    "thrust":"KeyW",
    "left":"KeyA",
    "right": "KeyD",
    "fire": "Tab",
    "warp": "Backquote",
};
const player2_binds = {
    "thrust":"ArrowUp",
    "left":"ArrowLeft",
    "right": "ArrowRight",
    "fire": "ShiftRight",
    "warp": "Enter",
};

console.log("frame script loaded");
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("canvas").width = 800;
    document.getElementById("canvas").height = 600;
    
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

function setbinding(element){

    console.log(element);
    switch (element.parentElement.parentElement.id) {
        case "player1":
            element.innerText = "Press a key to bind";
            element.addEventListener("keydown", (event) => {
                player1_binds[element.id] = event.code;
                console.log(player1_binds);
                engine.sprites.find((element)=>element.player === 0)[element.getAttribute("data-bind")] = event.code;
                element.innerText = "Set keybind";
                console.log(event.code);
                console.log(element.parentElement.firstElementChild.innerHTML);

                element.parentElement.firstElementChild.innerHTML = event.code;
            }, {once: true});

            break;
        case "player2":
            element.innerText = "Press a key to bind";
            element.addEventListener("keydown", (event) => {
                player2_binds[element.id] = event.code;
                console.log(player2_binds);
                engine.sprites.find((element)=>element.player === 1)[element.getAttribute("data-bind")] = event.code;
                element.innerText = "Set keybind";
                console.log(event.code);
                console.log(element.parentElement.firstElementChild.innerHTML);
                element.parentElement.firstElementChild.innerHTML = event.code;
            }, {once: true});
            break;
        case _:
            console.log("Unknown element: ", element);
            break;
    }
    
}

