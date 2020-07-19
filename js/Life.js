class Life
{
    constructor()
    {
        this.life     = 1;
        this.countImg;
        this.img      = loadImage('assets/img/hearts.png');
    }
    
    show()
    {
        fill(0, 200);
        this.countImg = this.life;
        /*if(this.life > 3)
        {
            this.countImg = 3;
            textSize(40);
            fill(44, 62, 80);
            textAlign(CENTER, CENTER);
            text(this.life+"x", 160, 31);
        }*/
        for (let i = 0 ; i < this.countImg * 40 ; i += 40) 
        {
            image(this.img, 20+i, 17, 30, 30);
        }
    }

    dec()
    {
        this.life--;
    }

    inc()
    {
        this.life++;
    }
}