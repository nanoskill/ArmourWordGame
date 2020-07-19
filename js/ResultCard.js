class ResultCard
{
    constructor(word, correctness)
    {
        this.pos = createVector(100*random(1, windowWidth/100), windowHeight/3*2);
        this.word = word;
        this.color = correctness&1?color(6, 117, 62):color(255,0,0);
        this.correctness = correctness;
        
    }

    draw()
    {
        push();
        textSize(55);
        textAlign(CENTER);
        fill(this.color);
        
        text(this.word, this.pos.x, this.pos.y);
        textSize(20);
        let scr;
        if(this.correctness&2) scr = 0;
        else if(this.correctness&1) scr = '+'+(this.word.length*20);
        else scr = '-'+(this.word.length*5);

        fill(0, this.color.levels[3]);
        text(scr, this.pos.x, this.pos.y+25);
        pop();
        this.pos.y -= 1;
        this.color.levels[3] -= 3;
    }
}