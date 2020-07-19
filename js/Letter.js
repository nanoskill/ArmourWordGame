class Letter
{
    constructor(letter, x, y, color, type)
    {
        this.colour = color;
        this.letter = letter;
        this.type   = type;
        this.y      = y;
        this.x      = width + x;
        this.hit    = false;
    }
    show()
    {
        push();
        
        if(this.hit)
        {
            fill(255,255);
        } 
        else 
        {
            this.colour.filling();
            textSize(45);
            ellipse(this.x, this.y, 60, 60);
            textAlign(CENTER, CENTER);
            if(this.type == "")
            {
                fill(44, 62, 80);
            } 
            else 
            {
                fill(255,255,255);
            }
            text(this.letter, this.x, this.y);
        }

        pop();
        
        textFont(fontFam);
    }
    update()
    {
        this.x -= speed;
    }
    isHit()
    {
        return this.hit;
    }
    hits(char, letter)
    {
        if(this.hit)
        {
            return false;
        }
        if(dist(char.pos.x, char.pos.y, letter.x, letter.y) < 60)
        {
            this.hit = true;
            return true;
        }
        this.hit = false;
		return false;
    }
    offscreen() 
    {
        if(this.x < -width)
        {
			return true;
        }
        else 
        {
			return false;
		}
	}
}