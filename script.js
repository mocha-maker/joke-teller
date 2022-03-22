// HTML Elements
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Text to VoiceRSS API Access
const apiKey = '5b59ee178c6d40b3b835f93a188d06f1';

// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

async function getJoke() {
    const apiURL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';
    let joke = 'Hahaha...';

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        // Get Joke if Two Part or One Part
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = `${data.joke}`;
        }
        // Send joke to VoiceRSS API
        tellJoke(joke);
        toggleButton();
        console.log("Did you laugh?");

    } catch (error) {
        // Catch error
        console.log('Joke not found.');
    }
}

// Call VoiceRSS API
function tellJoke(joke) {
    VoiceRSS.speech({
        key: apiKey,
        src: joke,
        hl: 'en-us',
        v: 'Amy',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false    })

}

// Button Listener
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton)

// On Load
