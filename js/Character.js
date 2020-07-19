class Character
{
    constructor()
    {
        this.pos         = createVector(windowWidth / 2, windowHeight / 2);
        this.isColliding = false;
        this.image       = loadImage('assets/img/balloon.png');
        this.dieState    = false;
        this.diePos      = null;
    }
    
    draw()
    {
        push();
        if(this.dieState)
        {
            tint(255,0,0,200);
            image(this.image, this.diePos.x-35, this.diePos.y-35, 70, 70);
            tint(255, 127);
        }
        image(this.image, this.pos.x-35, this.pos.y-35, 70, 70);
        // noStroke();
        // fill(random(255), random(255), random(255));
        // ellipse(this.pos.x, this.pos.y, 30, 30);

        pop();
    }

    kill()
    {
        this.diePos = createVector(this.pos.x, this.pos.y);
        this.dieState = true;
    }

    respawn()
    {
        this.dieState = false;
    }
    
    update()
    {
        var mousePos = createVector(mouseX, mouseY).sub(this.pos);

        if(Math.abs(mouseX - this.pos.x) < 2 && Math.abs(mouseY - this.pos.y) < 2) return;
        
        var dir = mousePos.setMag(mousePos.mag() / 10);
        this.pos.add(dir);
    }
}