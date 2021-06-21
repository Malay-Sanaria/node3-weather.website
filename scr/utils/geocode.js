const request=require('request');
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibWFsYXlzYW5hcmlhIiwiYSI6ImNrcGdxdWdwODAwMmgzMnFsb2dqeHplNm4ifQ.CDcLWZG2uWn5QTwja1FqpQ';
    request({url:url,json:true},(err,res)=>{
        if(err)
        {
            callback('Unable to connect to the service.',undefined);
        }
        else if (res.body.features.length==0)
        {
            callback('Unable to find this location, try again later.',undefined);
        }
        else{
            callback(undefined,{
                longitude:res.body.features[0].center[0],
                latitude:res.body.features[0].center[1],
                location: res.body.features[0].place_name
            })
        }
    })
}


module.exports=geocode;