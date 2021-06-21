const request=require('request');


const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=cefaf36fa6a3b1182f4f0c390f64a901&query='+latitude+','+longitude;
    request({url:url,json:true},(err,res)=>{
        if(err)
        {
            callback('Unable to connect to the service.',undefined);
        }
        else if(res.body.error)
        {
            callback('Unable to find match try again later.',undefined);
        }
        else{
            callback(undefined,'There is '+res.body.current.temperature+' degree temperature outside But it feels like '+res.body.current.feelslike);
        }
    })
}


module.exports=forecast;