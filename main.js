const video = document.querySelector("#myVideo");
const currentTime = document.querySelector(".current")
const totalTime = document.querySelector(".total")
const urlBtn = document.getElementById("urlBtn");
const playPauseBtn = document.querySelector(".play-pause");
const videoContainer = document.querySelector("section");
const miniBtn = document.querySelector(".mini-btn");
const fullBtn = document.querySelector(".full-btn");
const volumeBtn = document.querySelector(".volume-btn");
const volumeSlider = document.getElementById("vol-slider");
const progressBar = document.getElementById("progress-bar");
const seek = document.querySelector(".seek")
//////////////////////////////////////////////////

/////////////////////////////////////////// Real Time DATABASE ///////////////////////////////////////////
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfD7sEdS4d25lfq3TOzb9Vw8wXiNGEDlA",
  authDomain: "watchtogether-d4d1a.firebaseapp.com",
  databaseURL: "https://watchtogether-d4d1a-default-rtdb.firebaseio.com",
  projectId: "watchtogether-d4d1a",
  storageBucket: "watchtogether-d4d1a.appspot.com",
  messagingSenderId: "273247284108",
  appId: "1:273247284108:web:7eb3867bdb372c8727c4a9",
  measurementId: "G-2T83JS8LHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
import { getDatabase, set, ref, onValue, update,remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
const database = getDatabase();
// Get the real-time database reference
const myVideo = ref(database, 'videos');

// Update the current time in the database when it changes
// initialize video Data 
function initialize(src,dur){
    set(myVideo, {
        vidSrc:src,
        total:dur,
        time: 0,
        playing:false
    }).then(()=>{
        console.log("writed")
    },()=>{
        console.log("failed")
    });
}

function updateStatus(playing){
    update(myVideo,{
        time:video.currentTime,
        playing: playing
    });
}

video.addEventListener("play",()=>{
    videoContainer.classList.remove("paused")
    updateStatus(true)
})

video.addEventListener("pause",()=>{
    updateStatus(false)
})

seek.addEventListener("input",(e)=>{
    skipAhead(e)
    update(myVideo,{
        time:video.currentTime
    });
})

// Update the video player when the current time changes in the database
onValue(myVideo, (snapshot) => {
    if (snapshot.exists()){
        const videoData = snapshot.val();
        const vidSrc = videoData.vidSrc;
        videoContainer.classList.remove("hide");
        
        if (video.src !== vidSrc) {
            video.src = vidSrc;
        }
        
        const totalTime = videoData.total;
        const currentTime = videoData.time;
        const playing = videoData.playing;
        
        setTotalTime(totalTime); 
    
        if (playing) {
            video.play();
            video.currentTime = currentTime;
        } else {
            video.pause();
            console.log(playing)
            videoContainer.classList.add("paused");
        }
    
        // Only update the video player if the time is different
        if (Math.abs(video.currentTime - currentTime) > 0.1) {
            video.currentTime = currentTime;
        }
    }
});

///////////////////////////////////////////////////////////////////

// add video src 
urlBtn.addEventListener("click", () => {
    const vidSrc = document.getElementById("vidSrc").value;
    video.src = vidSrc;

    video.addEventListener("loadeddata", () => {
        console.log("Video loaded");

        remove(myVideo).then(() => {
            console.log("Removed old video");
            initialize(vidSrc, video.duration);
        }).catch((error) => {
            console.error("Failed to remove old video", error);
        });
    },{ once: true });
});



// timeline and duration CONTROL /////////////////////
function formatTime(duration){
    const result = new Date(duration * 1000).toISOString().substr(11, 8);
    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
};

function setTotalTime(myDuration){
    const total = formatTime(myDuration);
    totalTime.innerHTML = `${total.minutes}:${total.seconds}`;
    const videoDuration = Math.round(video.duration);
    progressBar.setAttribute('max',videoDuration)
    seek.setAttribute('max',videoDuration)
};

video.addEventListener("timeupdate",()=>{
    let curent = formatTime(video.currentTime);
    currentTime.textContent =`${curent.minutes}:${curent.seconds}`;
    updateProgress();
})

function updateProgress() {
    seek.value = Math.floor(video.currentTime);
    progressBar.value = Math.floor(video.currentTime);
}

// the input range is moved 
function skipAhead(event) {
    const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
    video.currentTime = skipTo;
    progressBar.value = skipTo;
    seek.value = skipTo;
}

// play and pause buttons CONTROL /////////////////////
function togglePlay(){
    video.paused ? video.play() : video.pause();
    videoContainer.classList.toggle("paused")
}

playPauseBtn.addEventListener("click",togglePlay);
video.addEventListener("click",togglePlay);

// full screen button CONTROL /////////////////////
fullBtn.addEventListener("click",()=>{
    if(document.fullscreenElement == null){
        videoContainer.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
})
document.addEventListener("fullscreenchange",()=>{
    videoContainer.classList.toggle("full-screen",document.fullscreenElement)
})

// mini screen button CONTROL /////////////////////
miniBtn.addEventListener("click",()=>{
    videoContainer.classList.toggle("mini-screen");
    if(videoContainer.classList.contains("mini-screen")){
        video.requestPictureInPicture()
    }else{
        document.exitPictureInPicture();
    }
})

video.addEventListener("leavepictureinpicture",()=>{
    videoContainer.classList.remove("mini-screen");
});

// volume CONTROL /////////////////////
volumeBtn.addEventListener("click",()=>{
    video.muted = !video.muted;
})

volumeSlider.addEventListener("input",e=>{
    video.volume = e.target.value;
    video.muted = e.target.value === 0;
})

video.addEventListener("volumechange",()=>{
    volumeSlider.value = video.volume;
    let volumeLevel;
    if(video.muted || video.volume === 0){
        volumeSlider.value = 0;
        volumeLevel = "muted";
    }
    else if (video.volume >= 0.5){
        volumeLevel = "high"
    }else{
        volumeLevel = "low"
    }
    videoContainer.dataset.volume = volumeLevel;
})
