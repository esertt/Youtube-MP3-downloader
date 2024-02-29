import { apiKey, apiHost } from "./api.js"

const form = document.querySelector("#youtubeForm")
const linkİnput = document.querySelector("#link")
const popUp = document.querySelector(".musicReady")
const alertMessage = document.querySelector(".alerMessage")
const ApiUrl = "https://youtube-mp36.p.rapidapi.com/dl?id="
const options= {
    'method': 'GET',
    'headers': {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost
    }
}
let isMusicReady = true
let musicLink = ""
let musicData
let musicName

form.addEventListener("submit", formOnSumit)

//functions
async function getData(id){
    const response = await fetch(ApiUrl + id, options)
    const result = await response.json()
    return result
}

async function formOnSumit(e){
    e.preventDefault()
    switch(linkİnput.value){
        case "":
            popUp.innerHTML = ""
            break
        default:            
            let youtubeId = findId(linkİnput.value)
            musicData = await getData(youtubeId)
            console.log(musicData)
            if(musicData.status != "" && musicData.status === "ok"){
                musicLink = musicData.link
                musicName = musicData.title
                popUp.innerHTML = `<h2>${musicName}</h2> \"><button type=\"button\" onclick=\"location.href= \'${musicLink}\'\">Download</button>`
                alertMessage.innerHTML = ""  
            }
            else{
                alertMessage.innerHTML = `<h2> ${musicData.error} </h2>`
                popUp.innerHTML = ""
            }
        }
        linkİnput.value = ""
}

function findId(userInput){
    const Id = userInput.indexOf('watch?v=') + 8
    return userInput.substring(Id)
}
