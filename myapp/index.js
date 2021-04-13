const express=require('express')
const app=express()
var date = new Date();
/*weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";*/
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
    }
}
const checkTime=(req,res,next)=>{
    const thisDay = date.getDay();
    const thisHour = date.getHours();
    if(!(thisDay > 0 && thisDay <6 && thisHour>9 && thisHour<17)){
        console.log("You are on work hours!");
        next()
    }
    else{
        res.send('<h3>Sorry! come back on work hours</h3>')  
        console.log("Sorry! come back on work hours");
        }
    
}

app.use(checkTime)

app.use(express.static("Public"))
app.get('/',(req,res)=>{ 
    res.sendFile(__dirname+"/Public/Home.html")
})

const port=5000
app.listen(port,()=>{
console.log(`server running on port ${port}`)
})