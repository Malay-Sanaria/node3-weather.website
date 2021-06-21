const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'../public')))
const temppath=path.join(__dirname,'../templates/views');
app.set('views',temppath);
const partialspath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialspath)

const port=process.env.PORT || 3000
app.get('',(req,res)=>{
    res.render('index',{
        tittle:'Weather',
        name:'Malay sanaria'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        tittle:'Creta',
        name:'malay sanaria'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        text:'This is some helpfull text.',
        tittle:'Help',
        name:'Malay Sanaria'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
         return res.send({
              err:'Address must be needed'
          })
    }
    var n=req.query.address
     geocode(req.query.address,(err,data={})=>{
         if(err){
             return res.send({err})
         }
        forecast(data.latitude,data.longitude,(err,forecastdata)=>{
            if(err){
                return res.send({err})
            }
            res.send({
                forecast:forecastdata,
                location:data.location,
                address:req.query.address
            })    
     })
})
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
       return  res.send({
            error:"You must provide a search term."
        })
    }
    console.log(req.query.search)
    res.send({
        product:''
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        tittle:'404',
        name:'Malay Sanaria',
        errorm:'Help module does not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        tittle:'404',
        name:'Malay Sanaria',
        errorm:'PAGE NOT FOUND'
    })
})

app.listen(port,()=>{
    console.log('Server is up on '+port);
})
console.log(n)
