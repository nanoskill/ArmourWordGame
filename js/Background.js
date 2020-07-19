class Background
{
    constructor(images, speed)
    {
        this.images  = images;
        this.speed   = speed;
        this.bgs     = [{x:0, img:random(this.images)}];

        this.bgs[0].img.resize(0, windowWidth / 3);
        this.bgs[0].img.drawingContext.imageSmoothingEnabled = false;
    }

    draw()
    {
        for (const bg of this.bgs) 
        {
            image(bg.img, bg.x, windowHeight - bg.img.height);
        }
    }

    update()
    {
        for (let i = 0 ; i < this.bgs.length ; i++) {
            this.bgs[i].x -= this.speed;
            if(this.bgs[i].x < -this.bgs[i].img.width)
                this.bgs.splice(i, 1);
            if(this.bgs.length == 1)
            {
                this.bgs.push({x:this.bgs[this.bgs.length - 1].img.width, img:random(this.images)});
                this.bgs[this.bgs.length - 1].img.resize(0, windowWidth / 3);
            }
        }
    }
}