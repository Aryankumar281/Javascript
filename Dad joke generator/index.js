const btn = document.querySelector(".joke-btn");
const joke = document.querySelector(".joke");
const apiKey = "KHuqlyjhFMF5ldOYDAxY+Q==vn7JWDWZiYPcFUcg";

const options = {
    method: "GET",
    headers: {
        "X-Api-Key": apiKey,
    },
};
const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1";

async function getJoke(){
    joke.innerText =  "Updating...";
    btn.disabled = true;
    btn.innerText = "Loading...";
    const response = await fetch(apiURL,options);
    const data = await response.json();
    btn.disabled = false;
    btn.innerText = "Tell me a joke";
    console.log(data);
    joke.innerText =  data[0].joke;
}

btn.addEventListener("click",getJoke);
