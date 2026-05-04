const modals = document.querySelectorAll(".modal");
const windowHTML = document.querySelector("html");
const bodyWindow = document.querySelector("body");

function openModal(el) {
  el.classList.add("is-active");
  if (
    el.classList.contains("instagram-feed-modal")
  ) {
    const iframes = el.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.src = iframe.dataset.src;
    });
  }  

   let modalContent = el.querySelector('.modal-content');
   let modalVideo = el.querySelector('.modal-youtube-video');
   let modalClose = el.querySelector('.modal-close');

    //Set focusable elements
    if(modalClose){
      modalClose.setAttribute('tabindex', '0');
    }
    if(modalContent){
      modalContent.setAttribute('tabindex', '0');
    }
    if(modalVideo){
      modalVideo.setAttribute('tabindex', '0');
    }
}

function closeModal(el) {
  el.classList.remove("is-active");
  if (
    el.classList.contains("instagram-feed-modal")
  ) {
    const iframes = el.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.src = "";
    });
  }


   let modalContent = el.querySelector('.modal-content');
   let modalVideo = el.querySelector('.modal-youtube-video');
   let modalClose = el.querySelector('.modal-close');

    //Set focusable elements
    if(modalClose){
      modalClose.removeAttribute('tabindex');
    }
    if(modalContent){
      modalContent.removeAttribute('tabindex');
    }
    if(modalVideo){
      modalVideo.removeAttribute('tabindex');
    }
}

function closeAllModals() {
  (modals || []).forEach((modal) => {
    closeModal(modal);
  });
}



// Add a click event on buttons to open a specific modal
(document.querySelectorAll(".modal-trigger") || []).forEach((trigger) => {

  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('tabindex', '0');

  const modal = trigger.dataset.target;

  const target = document.getElementById(modal); 

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(target);
    windowHTML.classList.add("no-scroll-page");
  });

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.code === "Space") {          
        e.preventDefault();
        openModal(target);
        windowHTML.classList.add("no-scroll-page");
        target.querySelector('.modal-content').focus();
      }
        
    
  });
});

// Add a click event on various child elements to close the parent modal
(
  document.querySelectorAll(
    ".modal-close, .modal-card-head .delete, .modal-card-foot .button, .modal-background"
  ) || []
).forEach((close) => {
  const target = close.closest(".modal");

  close.addEventListener("click", () => {
    closeModal(target);
    windowHTML.classList.remove("no-scroll-page");
  });
});

// Add a keyboard event to close all modals
document.addEventListener("keydown", (event) => {
  const e = event || window.event;

  if (e.key === "Escape") {
    // Escape key
    closeAllModals();
    windowHTML.classList.remove("no-scroll-page");
  }
});


let lightboxPlayers = [];
let firstFocusableElement;
let lastFocusableElement;

if (modals && modals.length > 0) {
  modals.forEach((t) => {   

    //Turn off html5 video player on close
    const els = t.querySelectorAll(
      ".modal-close, .modal-card-head .delete, .modal-card-foot .button"
    );
    const video = t.querySelector("video");
    if (video) {
      if (els.lenght > 0) {
        els.forEach((el) => {
          el.addEventListener("click", () => {
            video.pause();
          });
        });
      }
    }

    //Turn off video player on close
    const youtube = t.querySelector(".youtube-video");
    if (youtube) {
      let checkYT = setInterval(function () {
        if (typeof YT !== "undefined" && YT.loaded) {
          let lightboxPlayer = new YT.Player(youtube.id, {
            events: {
              onReady: function (e) {
                if (els.lenght > 0) {
                  els.forEach((el) => {
                    el.addEventListener("click", () => {
                      lightboxPlayer.pauseVideo();
                    });
                  });
                }
              },
            },
          });
          lightboxPlayers.push({
            id: youtube.id,
            player: lightboxPlayer,
          });
          clearInterval(checkYT);
        }
      }, 100);
      checkYT;
    }

  function trapFocus(event) {
    const focusableElements = t.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), iframe'
    );

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (event.key === "Tab") {
      if (event.shiftKey) {
        // Shift+Tab: cycle to last if at first
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // Tab: cycle to first if at last
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
    if (event.key === "Escape") {
      closeModal(t);
      windowHTML.classList.remove("no-scroll-page");
    }
  }

  t.addEventListener("keydown", trapFocus);
  
  document.addEventListener("focusin", function(e) {
    if (t.classList.contains("is-active")) {
      if (!t.contains(e.target)) {
        // Focus has moved outside the modal, bring it back in
        const focusableElements = t.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), iframe'
        );
        if (focusableElements.length) {
          focusableElements[0].focus();
        }
      
      }
    }
  });

  })


}

document.addEventListener("DOMContentLoaded", (event) => {

  let id = window.location.hash;

  if(id){
   let element =  document.querySelector(id);
   let modal = element.dataset.target;
   const target = document.getElementById(modal);
   
   setTimeout(() => {
      openModal(target);
      windowHTML.classList.add("no-scroll-page");
   }, "500");
  
  }
});

