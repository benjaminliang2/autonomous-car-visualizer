class Car{
    constructor(x,y, width, height){
        this.x = x ;
        this.y = y;
        this.width = width ;
        this.height = height;
        
        this.speed = 0;
        this.acceleration = 0.1;
        this.topSpeed = 1.0;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls();
    }
    update(){
        if(this.controls.forward){
            this.speed += this.acceleration;
        } 
        if(this.controls.backward){
            this.speed -= this.acceleration;
        }
        if(this.speed > this.topSpeed){
            this.speed = this.topSpeed;
        }
        if(this.speed < -this.topSpeed){
            this.speed = -this.topSpeed;
        }
        if(this.speed < 0){
            this.speed += this.friction;
        }
        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if(Math.abs(this.speed)< this.friction){
            this.speed = 0;
        }
        if(this.speed != 0){
            const flip = this.speed>0 ? 1: -1;
            if(this.controls.right){
                this.angle -= 0.03 * flip;
            }
            if(this.controls.left){
                this.angle += 0.03 * flip;
            }
        }
        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
    }
    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            - this.width / 2, // origin is middle of car
            - this.height / 2,
            this.width,
            this.height
        )
        ctx.fill();
        ctx.restore();
    }
}