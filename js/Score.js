class Score
{
    constructor()
    {
        this.value  = 0;
        this.x      = windowWidth - 15;
        this.y      = 65;
    }
    show()
    {
        push();
        textSize(50);
        fill(44, 62, 80);
        textAlign(RIGHT, BOTTOM);
        text(this.value, this.x, this.y);
        pop();
    }

    

    hitLetter()
    {
        this.value += 10;
    }

    correctWord(am)
    {
        this.value += am*20;
    }

    wrongWord(am)
    {
        this.value -= am*5;
    }
}