class Pipe
{
	constructor(top, bottom, lebar)
	{
		this.top 		= top;
		this.bottom 	= bottom;
		this.x 			= windowWidth;
		this.w 			= lebar;
		this.highlight 	= false;
		this.scoring 	= false;
	}
	
	hits(char)
	{
		if(char.pos.y-33 < this.top || char.pos.y+33 > height - this.bottom)
		{
			if(char.pos.x+22 > this.x && char.pos.x-22 < this.x + this.w)
			{
				return true;
			}
		}
		return false;
	}
	
	show() 
	{
		fill(255, 200);
		noStroke();
		if(this.highlight)
		{
		 	fill(255, 0, 0);
		}
		rect(this.x, 0, this.w, this.top);
		rect(this.x, windowHeight - this.bottom, this.w, this.bottom);
	}	  

	update()
	{
		this.x -= speed;
	}

	with(char)
	{
		if(!this.scoring)
		{
			if(char.pos.y > this.top && char.pos.y < height - this.bottom)
			{
				if(char.pos.x > this.x && char.pos.x < this.x + this.w)
				{
					this.scoring = true;
					return true;
				}
			}
		}
		return false;
	}

	offscreen() 
	{
		if(this.x < -this.w)
		{
			return true;
		} 
		else 
		{
			return false;
		}
	}
}