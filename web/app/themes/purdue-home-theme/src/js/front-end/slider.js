import Glide from "@glidejs/glide";
import { key } from "@wordpress/icons";

function siblings(node) {
  if (node && node.parentNode) {
    var n = node.parentNode.firstChild;
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== node) {
        matched.push(n);
      }
    }

    return matched;
  }

  return [];
}


let isKeyboardNav = false;

// Only treat Tab as “navigation intent”

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.glide:not(.purdue-home-slider--news)').forEach(slider => {
    slider.querySelectorAll('.glide__slide').forEach(slide => {
      if (slide.classList.contains('is-active')) {
        slide.inert = false;
        slide.setAttribute("aria-hidden", "false");
        slide.setAttribute("tabindex", "0");
      } else {
        slide.inert = true;
        slide.setAttribute("aria-hidden", "true");
        slide.setAttribute("tabindex", "-1");
      }
    });
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' || e.key.startsWith('Arrow')) {
    isKeyboardNav = true;
    document.querySelectorAll('.glide:not(.purdue-home-slider--news)').forEach(slider => {
      slider.querySelectorAll('.glide__slide').forEach(slide => {
        if (slide.classList.contains('is-active')) {
          slide.inert = false;
          slide.setAttribute("aria-hidden", "false");
          slide.setAttribute("tabindex", "0");
        } else {
          slide.inert = true;
          slide.setAttribute("aria-hidden", "true");
          slide.setAttribute("tabindex", "-1");
        }
      });
    });
  }
});

// Any pointer interaction cancels it
['mousedown', 'pointerdown', 'touchstart', 'mouseover'].forEach(evt => {

  document.querySelectorAll('.glide:not(.purdue-home-slider--news)').forEach(slider => {
    document.addEventListener(evt, () => {
      isKeyboardNav = false;
      slider.querySelectorAll('.glide__slide').forEach(slide => {
        slide.inert = false;
        slide.setAttribute("aria-hidden", "false");
        slide.setAttribute("tabindex", "0");
      });
    });
  });
});

['mouseup', 'pointerup', 'touchend', 'mouseout'].forEach(evt => {

  document.querySelectorAll('.glide:not(.purdue-home-slider--news)').forEach(slider => {
    document.addEventListener(evt, () => {
      isKeyboardNav = false;
      slider.querySelectorAll('.glide__slide').forEach(slide => {
        slide.inert = true;
        slide.setAttribute("aria-hidden", "true");
        slide.setAttribute("tabindex", "-1");
      });
    });
  });
});




const check_resize = (glide) => {
  if (glide.slides_count <= glide.settings.perView) {
    glide.update({ startAt: 0 }).disable();
    glide.controls.classList.add("hidden");
  } else {
    glide.enable();
    glide.controls.classList.remove("hidden");
  }
};

const CustomActiveClass = (Glide, Components, Events) => {
  const Component = {
    mount() {
      this.changeActiveSlide();
    },

    changeActiveSlide() {

      const slide = Components.Html.slides[Glide.index];
      const bullets = Components.Controls.items[0];
      const bullet = [...bullets.children].find(
        (bullet) => bullet.getAttribute("data-glide-dir") === `=${Glide.index}`
      );

      const slideType = Glide.settings.type;
      let useInert = false;
      if (slideType === "slide" && isKeyboardNav) {
        useInert = true;
      }

      if (bullet) {
        bullet.classList.remove("is-next", "is-prev");
        bullet.classList.add("is-active");
        bullet.setAttribute("aria-current", "true");
      }

      slide.classList.remove("is-next", "is-prev");
      slide.classList.add("is-active");
      slide.setAttribute("aria-current", "true");
      if (useInert) {
        slide.inert = false;
        slide.setAttribute("aria-hidden", "false");
      } else {
        slide.setAttribute("aria-hidden", "false");
      }
      //slide.inert = false;
      slide.setAttribute("tabindex", "0");



      siblings(slide).forEach((sibling) => {
        sibling.classList.remove("is-active", "is-next", "is-prev");
        sibling.removeAttribute("aria-current");
        if (useInert) {
          sibling.inert = true;
          sibling.setAttribute("aria-hidden", "true");
        } else {
          sibling.setAttribute("aria-hidden", "true");
        }
        //sibling.inert = true;
        sibling.setAttribute("tabindex", "-1");


      });
      siblings(bullet).forEach((sibling) => {
        sibling.classList.remove("is-active", "is-next", "is-prev");
        sibling.removeAttribute("aria-current");
      });

      if (slide.nextElementSibling) {
        slide.nextElementSibling.classList.add("is-next");
      }

      if (slide.previousElementSibling) {
        slide.previousElementSibling.classList.add("is-prev");
      }
      if (bullet && bullet.nextElementSibling) {
        bullet.nextElementSibling.classList.add("is-next");
      }

      if (bullet && bullet.previousElementSibling) {
        bullet.previousElementSibling.classList.add("is-prev");
      }

    },
  };

  Events.on("run", () => {
    Component.changeActiveSlide();
  });

  return Component;
};

const changeFocusOnSlideChange = (Glide, Components, Events) => {

  const Component = {


    changeFocus() {
      const activeSlide = Components.Html.slides[Glide.index];

      if (!activeSlide) return;

      activeSlide.tabIndex = 0;
      activeSlide.inert = false;
      activeSlide.focus();

    },
  };

  Events.on('run.after', () => {
    Component.changeFocus();
  });


  return Component;
};


const link_cards = document.querySelectorAll(".purdue-home-link-cards__slider");
if (link_cards && link_cards.length > 0) {
  for (let i = 0; i < link_cards.length; i++) {
    const type =
      link_cards[i].classList.contains(
        "purdue-home-link-cards__slider--loop"
      ) && link_cards[i].querySelectorAll(".glide__slide").length > 4
        ? "carousel"
        : "slide";
    let glide = new Glide(link_cards[i].querySelector(".glide"), {
      type: type,
      perView: 4,
      gap: 24,
      breakpoints: {
        1407: {
          perView: 3,
        },
        1024: {
          perView: 2,
        },
        767: {
          perView: 1,
        },
      },
      keyboard: false,
    });
    const nextButton = link_cards[i].querySelector(".arrow--left");
    const prevButton = link_cards[i].querySelector(".arrow--right");
    nextButton.addEventListener("click", function (event) {
      event.preventDefault();
      glide.go("<");
    });

    prevButton.addEventListener("click", function (event) {
      event.preventDefault();
      glide.go(">");
    });
    glide.slides_count = link_cards[i].querySelectorAll(
      ".glide__slide:not(.glide__slide--clone)"
    ).length;
    glide.controls = link_cards[i].querySelector(".slider-controls");
    glide.on("resize", () => {
      check_resize(glide);
    });

    let mount = false;

    const hasActiveClass = link_cards[i].closest('.purdue-home-tabs-horizontal__panel')?.classList.contains('active');
    if (hasActiveClass) {
      glide.mount({ CustomActiveClass, changeFocusOnSlideChange });
    } else {
      glide.mount({ CustomActiveClass, changeFocusOnSlideChange });
    }
    check_resize(glide);


    const observer = new MutationObserver(() => {
      const panel = link_cards[i].closest('.purdue-home-tabs-horizontal__panel');

      if (panel && panel.classList.contains('active')) {
        let settings = glide.settings;
        glide.mount({ CustomActiveClass, changeFocusOnSlideChange });
        glide.on("resize", () => {
          check_resize(glide);
        });
        check_resize(glide);
        observer.disconnect();

      }
    });

    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });

  }
}

export { check_resize, CustomActiveClass, changeFocusOnSlideChange };
