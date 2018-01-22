class Character
{
    constructor()
    {
        this.pos = createVector(windowWidth/2, windowHeight/2);
    }
    
    draw()
    {
        push();
        noStroke();
        fill(random(255), random(255), random(255));
        ellipse(this.pos.x, this.pos.y, 30,30);
        pop();
    }
    
    update()
    {
        var mousePos = createVector(mouseX, mouseY).sub(this.pos);
        if(Math.abs(mouseX - this.pos.x) < 2 && Math.abs(mouseY - this.pos.y) < 2) return;     
        var dir = mousePos.setMag(mousePos.mag()/10);
        this.pos.add(dir);
    }
}