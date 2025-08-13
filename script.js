console.log("let do JS");

async function getsongs() {
  let a = await fetch("http://127.0.0.1:3000/video_84-SPOTIFY-CLONE/songs/");
  let response = await a.text();
  console.log(response);

  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.getElementsByTagName("a");
  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }

  return songs;
}

async function main() {
  let songs = await getsongs();
  console.log(songs);

  // Render the song list
  let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML += `<li>${song}</li>`;
  }

  // Create a button for user to click
  let button = document.createElement("button");
  button.innerText = "Play First Song";
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    var audio = new Audio(songs[0]);
    audio.preload = "auto";
    audio.play();

    // Check if metadata is already loaded
    if (audio.readyState >= 1) {
      console.log("Immediate log:", audio.duration, audio.currentSrc, audio.currentTime);
    } else {
      audio.addEventListener("loadeddata", () => {
        console.log("loadeddata log:", audio.duration, audio.currentSrc, audio.currentTime);
      });
    }
  });
}

main();
