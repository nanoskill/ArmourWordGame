class PowerUp
{
    constructor()
    {
        this.hintImg = loadImage('assets/img/hint.png');
        this.slowImg = loadImage('assets/img/slow.png');
        this.lifeImg = loadImage('assets/img/hearts.png');
        this.hint    = 3;
        this.slow    = 2;
        this.life    = 0;
    }
    
    show()
    {
        textSize(40);
        image(this.hintImg, (windowWidth / 2) - 100, 17, 30, 30);
        textAlign(LEFT);
        text(": " + this.hint, (windowWidth / 2) - 70, 47);

        image(this.slowImg, (windowWidth / 2) + 20, 17, 30, 30);
        textAlign(LEFT);
        text(": " + this.slow, (windowWidth / 2) + 50, 47);
        
        textSize(25);
        text("z", (windowWidth/2)-110, 50);
        text("x", (windowWidth/2)+10, 50);
    }
}