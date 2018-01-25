class Pipe
{
	constructor(top, bottom, lebar)
	{
		this.top = top;
		this.bottom = bottom;
		this.x = width;
		this.w = lebar;
		this.highlight = false;
	}
	
	hits(char){
		if(char.pos.y < this.top || char.pos.y > height - this.bottom){
			if(char.pos.x > this.x && char.pos.x < this.x + this.w){
				this.highlight = true;
				return true;
			}
		}
		this.highlight = false;
		return false;
	}
	show() {
		fill(255);
		noStroke();
		 if(this.highlight){
		 	fill(255, 0, 0);
		 }
		rect(this.x, 0, this.w, this.top);
		rect(this.x, windowHeight-this.bottom, this.w, this.bottom);
	}	  

	update(){
		this.x -= speed;
	}

	offscreen() {
		if(this.x < -this.w){
			return true;
		} else {
			return false;
		}
	}
}