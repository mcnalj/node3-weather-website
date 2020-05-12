const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    
    messageOne.textContent = 'Loading . . .'
    messageTwo.textContent = ''

    const fetchURL = '/weather?address=' + location
    fetch(fetchURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                const message = "The temperature is " + data.forecast.temperature + " and it feels like " + data.forecast.feelslike + " ^degrees."
                messageTwo.textContent = message
                console.log(data.forecast)
                console.log(data.location)
            }
        })
    })
    

})