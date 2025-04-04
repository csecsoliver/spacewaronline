
import {Spaceship} from "./spaceship.js"
import * as engine from "./engine.js"


console.log("frame script loaded")
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("canvas").width = 800;
    document.getElementById("canvas").height = 600;
    document.getElementById("canvas").style.border = "1px solid white";
    engine.sprites.push(new Spaceship(50, 50, ["KeyW", "KeyA", "KeyD", "Tab", "Backquote"], 0,0));
    gameloop();
})

function gameloop(){
    requestAnimationFrame(gameloop);
    engine.gametick();

}