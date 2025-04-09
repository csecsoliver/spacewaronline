
import {Spaceship} from "./spaceship.js"
import * as engine from "./engine.js"
const player1_binds = {
    "thrust":"KeyW",
    "left":"KeyA",
    "right": "KeyD",
    "fire": "Tab",
    "warp": "Backquote",
}
const player2_binds = {
    "thrust":"ArrowUp",
    "left":"ArrowLeft",
    "right": "ArrowRight",
    "fire": "ControlRight",
    "warp": "ShiftRight",
}

console.log("frame script loaded")
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("canvas").width = 800;
    document.getElementById("canvas").height = 600;
    document.getElementById("canvas").style.border = "1px solid white";
    
    engine.sprites.push(new Spaceship(50, 50, [player1_binds["thrust"], player1_binds["left"], player1_binds["right"], player1_binds["fire"], player1_binds["warp"]], 0,0));
    gameloop();
    for (const element of [...document.getElementById("player1").children, ...document.getElementById("player2").children]) {
        element.lastChild.onclick = (event) => setbinding(event.target);
    }

})

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
                engine.sprites.find((element)=>element.player === 0)[element.id] = event.code;
                element.innerText = "Set keybind";
            }, {once: true});

            break;
        case "player2":
            element.innerText = "Press a key to bind";
            element.addEventListener("keydown", (event) => {
                player2_binds[element.id] = event.code;
                console.log(player2_binds);
                engine.sprites.find((element)=>element.player === 1)[element.id] = event.code;
                element.innerText = "Set keybind";
            }, {once: true});
            break;
        case _:
            console.log("Unknown element: ", element);
            break;
    }
    
}