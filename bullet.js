import * as engine from './engine.js';
// Bullet class
export class Bullet extends engine.Sprite {
    constructor(x, y, image, facing = -1, movementvec = 0, scale = 1, enemy = null) {
        super(x, y, image, facing, scale)
        this.radius = 3
        this.speedmulti = 5
        this.iscolliding = false
        this.enemyspaceship = enemy
        this.bulletAlive = 2
        this.isdeleted = false
        this.movementvector.x = movementvec.x
        this.movementvector.y = movementvec.y
        setTimeout(()=>{
            this.delete()
        } , this.bulletAlive * 1000)
    }

    CollidingWithSpaceship(){
        let SquaredDistance = (this.x - this.enemyspaceship.x) ** 2 + (this.y - this.enemyspaceship.y) ** 2;

        if (SquaredDistance <= (30) ** 2) return true;
        else return false;
    }

    delete(){
        if(this.isdeleted == false){
            // this.hide();
            engine.sprites.splice(engine.sprites.indexOf(this) , 1)
        }
        
        this.isdeleted = true

    }

    tick() {
        const thrustVector = new Victor(Math.cos((this.facing * 22.5) * (Math.PI / 180)), Math.sin((this.facing * 22.5) * (Math.PI / 180)));
        thrustVector.multiplyScalar(this.speedmulti);
        thrustVector.rotateDeg(-90);

        this.movementvector = thrustVector;
        if(this.CollidingWithSpaceship()){
            this.enemyspaceship.explode()
            this.delete()
        }
        super.tick()
    }
}
