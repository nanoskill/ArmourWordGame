class Timer
{
    constructor()
    {
        this.maxTime    = 0;
        this.time;
        this.currTime;
        this.active     = false;        //penanda timer active atau tidak
        this.interval   = 0;            //interval pengurangan waktu
        this.timeLength = windowWidth;  //panjang waktu
        this.r          = 0;            //warna merah
        this.g          = 255;          //warna hijau
    }

    setTimer(time)
    {
        this.maxTime    = time;
        this.time       = time;
        this.interval   = windowWidth/this.time;
        this.active     = true;
        this.timeLength = windowWidth;
        this.r          = 0;
        this.g          = 255;
    }

    addTime(time)
    {
        if(this.time + time >= this.maxTime)
            this.setTimer(this.maxTime);
        else
        {
            timer.time += time;
            timer.timeLength += timer.interval*time;
        }
    }

    deactive()
    {
        this.active     = false;
        this.time       = 0;
    }

    show()
    {
        push();
        
        if (Math.floor(millis() / 60) != this.currTime && this.active)
        {
            this.currTime    = Math.floor(millis() / 10);
            this.timeLength -= this.interval;
            this.time--;
            if(this.timeLength)
            {
                this.r = map(this.maxTime-this.time, 0, this.maxTime, 0, 255);
                this.g = map(this.time, 0, this.maxTime, 0, 255);
            }

        }
        if(this.active)
        {
            fill(this.r, this.g, 0);
            rect(0, 0, this.timeLength, 10);
        }
        
        pop();
    }

    timeIt()
    {
        this.time -= 1;
    }
}