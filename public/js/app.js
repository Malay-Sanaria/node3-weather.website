console.log('Client side java script file is loaded.');



const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const m1=document.querySelector('#m1')
const m2=document.querySelector('#m2')



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    m1.textContent='Loading...'
    m2.textContent=""
    fetch('http://localhost:3000/weather?address='+location).then((res)=>{
    res.json().then((data)=>{
        if(data.err)
        {
            m1.textContent=data.err;
        }
        else{
        m1.textContent=data.location;
        m2.textContent=data.forecast;
    }})
})

})