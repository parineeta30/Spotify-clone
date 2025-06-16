console.log("Welcome to Spotify");
//Initialise the variables

let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Akuma no Ko ", filepath: "song/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Usee BigGirltt: ", filepath: "song/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Bauklotze", filepath: "song/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Erwin's theme", filepath: "song/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Barricades", filepath: "song/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Under the Tree", filepath: "song/6.mp3", coverPath: "covers/6.jpg" },


]

function playSong(index) {
    audioElement.src = songs[index].filepath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}


songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play()

//Handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


//Listen to events
audioElement.addEventListener('timeupdate', () => {

    //update seekBar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

function updatePlayPauseIcons() {
    makeAllPlays();
    const currentPlayBtn = document.getElementById(songIndex);
    if (currentPlayBtn) {
        currentPlayBtn.classList.remove('fa-play-circle');
        currentPlayBtn.classList.add('fa-pause-circle');
    }
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        //  audioElement.src = `song/${songIndex+1}.mp3`;
        //  masterSongName.innerText = songs[songIndex].songName;
        //  audioElement.currentTime = 0;
        //  audioElement.play();
        //  gif.style.opacity = 1;
        //   masterPlay.classList.remove('fa-play-circle');
        // masterPlay.classList.add('fa-pause-circle'); 
        playSong(songIndex);

    });
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0
    } else {
        songIndex += 1;
    }
    //  audioElement.src = `song/${songIndex+1}.mp3`;
    //  masterSongName.innerText = songs[songIndex].songName;
    //  audioElement.currentTime = 0;
    //  audioElement.play();
    // masterPlay.classList.remove('fa-play-circle');
    // masterPlay.classList.add('fa-pause-circle'); 
    playSong(songIndex);

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    } else {
        songIndex -= 1;
    }
    //  audioElement.src = `song/${songIndex+1}.mp3`;
    //  masterSongName.innerText = songs[songIndex].songName;
    //  audioElement.currentTime = 0;
    //  audioElement.play();
    // masterPlay.classList.remove('fa-play-circle');
    // masterPlay.classList.add('fa-pause-circle');
    playSong(songIndex);


})

audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    // audioElement.src = songs[songIndex].filepath;
    // masterSongName.innerText = songs[songIndex].songName;
    // audioElement.currentTime = 0;
    // audioElement.play();
    // updatePlayPauseIcons();
    playSong(songIndex);
    updatePlayPauseIcons();

});
