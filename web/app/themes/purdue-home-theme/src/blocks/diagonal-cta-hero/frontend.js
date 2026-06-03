import { flipBtnState } from '../../utils/flipBtnState.js';
const diagonalHeroes = document.querySelectorAll(".purdue-home-diagonal-cta-hero");
if (diagonalHeroes && diagonalHeroes.length > 0) {
  diagonalHeroes.forEach((diagonalHeroe) => {
    const btn = diagonalHeroe.querySelector('.cta-btnctrl');
    const video = diagonalHeroe.querySelector("video");

    btn.addEventListener("click", () => {
      if (btn.classList.contains('cta-play')) {
        video.play();
      } else {
        video.pause();
      }
      flipBtnState(btn);
    });

    if (video && video.classList.contains("no-loop")) {
      video.addEventListener("ended", (event) => {
        flipBtnState(btn, false);
      });
    }
    if(video && (video.paused || video.ended) && !video.classList.contains("no-loop")){
      video.addEventListener("play", ()=>{        console
        flipBtnState(btn, true);
      });
      video.addEventListener("pause", ()=>{        console
        flipBtnState(btn, false);
      });
    }
  });
}
