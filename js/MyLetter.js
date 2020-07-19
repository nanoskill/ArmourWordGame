class MyLetter
{
    constructor()
    {
        this.letter     = "";
        this.letters    = [];
        this.x          = windowWidth/2;
        this.y          = 100;
        this.active     = true;
        this.colour     = new Colour(44, 62, 80);
    }
    show()
    {
        push();

        if(this.active)
        {
            textSize(55);
            this.colour.filling();
            textAlign(CENTER);
            text(this.letter, this.x, this.y);
        }

        pop();
    }
    delete()
    {
        this.active = true;
        this.letter = "";
        while(this.letters.length!=0) {
            this.letters.splice(0, 1);
        }
    }
    setMax(max){
        this.max = max; 
    }
    setLetter(letter)
    {
        if(this.letter.length >= this.max*2){
            this.letter  = this.letter.substring(2);
            this.letters = subset(this.letters, 1);
        } 
        this.letter += letter.letter + " ";
        this.letters.push(letter);
    }
    getLetter()
    {
        return this.letters;
    }
}