const diagonalHeroes = document.querySelectorAll(".purdue-home-diagonal-hero");
if (diagonalHeroes && diagonalHeroes.length > 0) {
  diagonalHeroes.forEach((diagonalHeroe) => {
    const pauseButton = diagonalHeroe.querySelector(".cta-pause");
    const playButton = diagonalHeroe.querySelector(".cta-play");
    const video = diagonalHeroe.querySelector("video");
    if (pauseButton) {
      pauseButton.addEventListener("click", () => {
        video.pause();
        pauseButton.classList.remove("is-active");
        playButton.classList.add("is-active");
      });
    }
    if (playButton) {
      playButton.addEventListener("click", () => {
        video.play();
        playButton.classList.remove("is-active");
        pauseButton ? pauseButton.classList.add("is-active") : "";
      });
    }
    if (video && video.classList.contains("no-loop")) {
      video.addEventListener("ended", (event) => {
        playButton.classList.add("is-active");
      });
    }
    if(video && (video.paused || video.ended) && !video.classList.contains("no-loop")){
      pauseButton ? pauseButton.classList.remove("is-active") : "";
      video.addEventListener("play", ()=>{
        pauseButton ? pauseButton.classList.add("is-active") : "";
      });
    }
  });
}
