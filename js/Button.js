class Button
{
    constructor(letter, x, y, width)
    {
        this.clicked    = false;                                //apakah button sudah diclick
        this.letter     = letter;                               //huruf pada button
        this.textColor  = new Colour(52, 73, 94);               //warna text
        this.x          = x;                                    //posisi x image
        this.y          = y;                                    //posisi y image
        this.width      = width;                                //lebar image
        this.image      = loadImage('assets/img/clouds.png');   //image button
    }
    show()
    {
        push();

        if(this.image != null){
            image(this.image, this.x + (this.width * 0.1), this.y, this.width * 0.8, this.width * 0.8);
            textSize(this.width * 0.3);

            if(this.letter.type != "")
                this.textColor = this.letter.colour;
            else
                this.textColor = new Colour(52, 73, 94);
            this.textColor.filling();
            text(this.letter.letter, this.x + (this.width * 0.45), this.y + (this.width * 0.50));
        }

        pop();
    }

    didClicked()
    {
        this.clicked = true;
    }

    unClicked()
    {
        this.clicked = false;
    }

    hide()
    {
        if(this.letter.type != "")
            powerUpCandidate.push(this.letter);
        this.image = null;
    }

    unHide()
    {
        this.image = loadImage('assets/img/clouds.png');
    }
    
}