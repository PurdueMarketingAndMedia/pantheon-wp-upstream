const youtube = [
  ...document.querySelectorAll(
    ".youtube-video,lite-youtube, .modal-youtube-video"
  ),
];

const layover = document.querySelector("html");

if (youtube && youtube.length > 0) {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
const pauseOtherVideos = (players, id) => {
  players.forEach((pl) => {
    if (pl.id !== id) {
      if (
        typeof pl.player.getPlayerState === "function" &&
        pl.player.getPlayerState() === 1
      ) {
        pl.player.pauseVideo();
      } else if (typeof pl.player.pause === "function") {
        pl.player.pause();
      }
    }
  });
};
let players = [];
//cta caard: on hover preview, on click play youtube
const cta_cards = document.querySelectorAll(
  ".purdue-home-cta-card:not(.purdue-home-cta-card--vimeo)"
);
if (cta_cards.length > 0) {
  cta_cards.forEach((card) => {
    const card_video_element = card.querySelector("video");
    if (card_video_element !== null) {
      card_video_element.loop = true; // Make sure the video loops
      card_video_element.muted = true; // Make sure the video is muted
      card.addEventListener("mouseover", () => {
        card_video_element.play();
      });

      card.addEventListener("mouseout", () => {
        card_video_element.pause();
      });
    }
    const card_iframe_element = card.querySelector(".youtube-video");
    const card_iframe_container = card.querySelector(".iframe-container");
    const card_text_container = card.querySelector(".flex-container");
    const card_background_container = card.querySelector(".image");

    let aspectRatio = {
      height: "390",
      width: "640",
    }

    if (card_background_container && card_background_container.classList.contains("is-9by16")) {
      aspectRatio = {
        height: "750",
        width: "422",
      }
    }else{
      aspectRatio = {
      height: "390",
      width: "640",
      }
    }

    if (card_iframe_element) {
      let checkYT = setInterval(function () {
        if (YT && YT.loaded) {
          let player = new YT.Player(card_iframe_element.id, {
            height: aspectRatio.height,
            width: aspectRatio.width,
            videoId: card_iframe_element.id,
            playerVars: {
              rel: 0,
              html5: 1,
            },
            events: {
              onReady: function (event) {
                card.addEventListener("click", (event) => {
                  event.preventDefault();
                  card_text_container.style.display = "none";
                  card_background_container.style.display = "none";
                  card_iframe_container.classList.remove("is-sr-only");
                  if (player) {
                    setTimeout(() => player.playVideo(), 500);
                  }
                  pauseOtherVideos(players, card_iframe_element.id);
                });
              },
              onStateChange: function (event) {
                setTimeout(function () {
                  if (
                    event.target.getPlayerState() == 0 ||
                    event.target.getPlayerState() == 2
                  ) {
                    card_text_container.style.display = "flex";
                    card_background_container.style.display = "block";
                    card_iframe_container.classList.add("is-sr-only");
                  }
                }, 500);
                if (
                  typeof event.target.getPlayerState === "function" &&
                  event.target.getPlayerState() === 1
                ) {
                  pauseOtherVideos(players, card_iframe_element.id);
                }
              },
            },
          });
          players.push({
            id: card_iframe_element.id,
            player: player,
          });
          clearInterval(checkYT);
        }
      }, 1000);
      checkYT;
    }
  });
}
//Youtube in modal
const yt_modal = document.querySelectorAll(".modal-youtube-video");
if (yt_modal && yt_modal.length > 0) {
  yt_modal.forEach((youtube) => {
    const yt_modal_id = youtube.id;
    let video_Id = youtube.id;
    if (youtube.classList.contains("alert-video")) {
      video_Id = youtube.dataset.id;
    }
    let checkYT = setInterval(function () {
      if (YT && YT.loaded) {
        let player = new YT.Player(yt_modal_id, {
          height: "390",
          width: "640",
          videoId: video_Id,
          playerVars: {
            rel: 0,
            html5: 1,
          },
          events: {
            onReady: function (event) {
              (
                document.querySelectorAll(
                  ".modal-close, .modal-card-head .delete, .modal-card-foot .button, .modal-background, .alert-page__link"
                ) || []
              ).forEach((close) => {
                close.addEventListener("click", () => {
                  player.pauseVideo();
                });
              });
            },
            onStateChange: function (event) {
              if (
                typeof event.target.getPlayerState === "function" &&
                event.target.getPlayerState() === 1
              ) {
                pauseOtherVideos(players, yt_modal_id);
              }
              if (
                typeof event.target.getPlayerState === "function" &&
                event.target.getPlayerState() === 0
              ) {
                const activeModal = document.querySelector(".modal.is-active");

                if (activeModal) {
                  activeModal.classList.remove("is-active");
                  layover.classList.remove("no-scroll-page");
                }
              }
            },
          },
        });
        players.push({
          id: yt_modal_id,
          player: player,
        });
        clearInterval(checkYT);
      }
    }, 1000);
    checkYT;
  });
}
//youtube lite
const ytl_list = document.querySelectorAll("lite-youtube");
if (ytl_list && ytl_list.length > 0) {
  ytl_list.forEach((youtube) => {
    youtube.parentNode.classList.add(
      "youtube-lite-container",
      "purdue-home-cta-card"
    );
    const videoIdLite = youtube.getAttribute("videoid");
    let playBtnEl = youtube.querySelector(".lty-playbtn");

    if (!youtube.style.backgroundImage) {
      const posterUrl = `https://i.ytimg.com/vi/${videoIdLite}/maxresdefault.jpg`;
      youtube.style.backgroundImage = `url("${posterUrl}")`;
    }

    // Set up play button, and its visually hidden label
    if (!playBtnEl) {
      playBtnEl = document.createElement("div");
      playBtnEl.classList.add("flex-container--align-center", "lty-playbtn");
      youtube.append(playBtnEl);
      playText = document.createElement("span");
      playText.classList.add("cta-link", "purdue-home-cta-card__link");
      playText.innerHTML = "Watch Video";
      playBtnEl.append(playText);
      playIcon = document.createElement("img");
      playIcon.classList.add("cta-icon", "cta-icon--play");
      playIcon.src =
        "https://www.purdue.edu/home/wp-content/themes/purdue-home-theme/imgs/play_icon_gold.svg";
      playBtnEl.append(playIcon);
    }

    const iframeEl = youtube.querySelector(".iframe-element");
    if (!iframeEl) {
      const params = new URLSearchParams(youtube.getAttribute("params") || []);
      params.append("autoplay", "1");
      params.append("enablejsapi", "1");
      const host = window.location.protocol + "//" + window.location.host;
      params.append("origin", host);
      const iframeEl = document.createElement("div");
      iframeEl.id = videoIdLite;
      // AFAIK, the encoding here isn't necessary for XSS, but we'll do it only because this is a URL
      // https://stackoverflow.com/q/64959723/89484
      iframeEl.dataset.src = `https://www.youtube.com/embed/${encodeURIComponent(
        videoIdLite
      )}?${params.toString()}`;
      iframeEl.classList.add("iframe-element", "screen-reader-text");
      youtube.append(iframeEl);
    }
    const checkYTLite = setInterval(() => {
      if (YT && YT.loaded) {
        const player = new YT.Player(videoIdLite, {
          height: "390",
          width: "640",
          videoId: videoIdLite,
          playerVars: {
            html5: 1,
          },
          events: {
            onReady: function () {
              youtube.addEventListener("click", (event) => {
                event.preventDefault();
                !youtube.classList.contains("lyt-activated")
                  ? youtube.classList.add("lyt-activated")
                  : "";
                youtube
                  .querySelector(".iframe-element")
                  .classList.contains("screen-reader-text")
                  ? youtube
                      .querySelector(".iframe-element")
                      .classList.remove("screen-reader-text")
                  : "";
                player.playVideo();
                pauseOtherVideos(players, videoIdLite);
              });
            },
            onStateChange: function (event) {
              if (
                typeof event.target.getPlayerState === "function" &&
                event.target.getPlayerState() === 1
              ) {
                pauseOtherVideos(players, videoIdLite);
              }
            },
          },
        });
        players.push({
          id: videoIdLite,
          player: player,
        });
        clearInterval(checkYTLite);
      }
    }, 1000);
    checkYTLite;
  });
}
//cta banner: auto play when in view
document.addEventListener("DOMContentLoaded", function () {
  const ctaBanner = document.querySelectorAll(
    ".purdue-home-cta-banner, .purdue-home-media-grid"
  );

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.play();
          entry.target.loop = true;
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    ctaBanner.forEach((banner) => {
      const videos = banner.querySelectorAll("video");
      if (videos.length > 0) {
        videos.forEach((video) => {
          lazyBackgroundObserver.observe(video);
        });
      }
    });
  }
});

//vimeo
function getVimeoId(url) {
  const regEx =
    /(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/?(showcase\/)*([0-9))([a-z]*\/)*([0-9]{6,11})[?]?.*/;
  const match = url?.match(regEx);
  return match && match.length == 7 ? match[6] : null;
}

const vimeo = [
  ...document.querySelectorAll(
    ".modal-vimeo-video, .embed-vimeo-video, .wp-block-embed-vimeo iframe, lite-vimeo, .vimeo-video-hero"
  ),
];



if (vimeo && vimeo.length > 0) {
  let tag = document.createElement("script");
  tag.src = "https://player.vimeo.com/api/player.js";
  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  const vimeoLite = document.querySelectorAll("lite-vimeo");
  vimeoLite.forEach((video) => {
    video.parentNode.classList.add(
      "youtube-lite-container",
      "purdue-home-cta-card"
    );
    const videoIdLite = video.getAttribute("videoid");
    const hashParameter = video.getAttribute("h");

    let playBtnEl = video.querySelector(".lty-playbtn");
    if (!video.style.backgroundImage) {
      let posterUrl = "";
      if( hashParameter != null){
        posterUrl = `https://vumbnail.com/${videoIdLite}:${hashParameter}.jpg`;
      }else{
        posterUrl = `https://vumbnail.com/${videoIdLite}.jpg`;
      }
      
      video.style.backgroundImage = `url("${posterUrl}")`;
    }

    // Set up play button, and its visually hidden label
    if (!playBtnEl) {
      playBtnEl = document.createElement("div");
      playBtnEl.classList.add("flex-container--align-center", "lty-playbtn");
      video.append(playBtnEl);
      playText = document.createElement("span");
      playText.classList.add("cta-link", "purdue-home-cta-card__link");
      playText.innerHTML = "Watch Video";
      playBtnEl.append(playText);
      playIcon = document.createElement("img");
      playIcon.classList.add("cta-icon", "cta-icon--play");
      playIcon.src =
        "https://www.purdue.edu/home/wp-content/themes/purdue-home-theme/imgs/play_icon_gold.svg";
      playBtnEl.append(playIcon);
    }

    const iframeEL = video.querySelector(".iframe-element");
    if (!iframeEL) {
      const iframeEl = document.createElement("iframe");
      iframeEl.id = videoIdLite;
      const params = new URLSearchParams([]);
      
      if( hashParameter != null){
        params.append("h", hashParameter);
      }
      params.append("autoplay", "1");
      params.append("muted", "1");
      params.append("controls", "1");
      iframeEl.src = `https://player.vimeo.com/video/${videoIdLite}?${params.toString()}`;
      iframeEl.setAttribute("allow", "fullscreen");
      iframeEl.classList.add("iframe-element", "screen-reader-text");
      video.append(iframeEl);
      vimeo.push(iframeEl);
    }
  });

  let checkVimeo = setInterval(function () {
    if (vimeo) {
      vimeo.forEach((iframe) => {
        if (iframe.tagName.toLowerCase() !== "lite-vimeo") {
          if (!iframe.id && iframe.src) {
            iframe.id = getVimeoId(iframe.src);
          }
          var player = new Vimeo.Player(iframe, {
            id: iframe.id,
          });
          players.push({
            id: iframe.id,
            player: player,
          });
          if (iframe.classList.contains("iframe-element")) {
            iframe.parentElement.addEventListener("click", (event) => {
              event.preventDefault();
              !event.target.classList.contains("lyt-activated")
                ? event.target.classList.add("lyt-activated")
                : "";
              iframe.classList.contains("screen-reader-text")
                ? iframe.classList.remove("screen-reader-text")
                : "";
              player.play();
            });
          }
          if (iframe.classList.contains("vimeo-video-hero")) {
            const card = iframe.parentElement.parentElement;
            if (card && card.classList.contains("purdue-home-cta-card")) {
              const card_text_container = card.querySelector(".flex-container");
              const card_background_container = card.querySelector(".image");
              const card_iframe_container =
                card.querySelector(".iframe-container");

              card.addEventListener("click", (event) => {
                event.preventDefault();
                card_text_container.style.display = "none";
                card_background_container.style.display = "none";
                card_iframe_container.classList.remove("is-sr-only");
                player.play();
              });
            }
          }
          player.on("play", function (event) {
            pauseOtherVideos(players, iframe.id);
          });
          (
            document.querySelectorAll(
              ".modal-close, .modal-card-head .delete, .modal-card-foot .button, .modal-background"
            ) || []
          ).forEach((close) => {
            close.addEventListener("click", () => {
              player.pause();
            });
          });
        }
      });
      clearInterval(checkVimeo);
    }
  }, 100);
  checkVimeo;
}