import Glide from "@glidejs/glide";

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

      if (bullet) {
        bullet.classList.remove("is-next", "is-prev");
        bullet.classList.add("is-active");
      }
      slide.classList.remove("is-next", "is-prev");
      slide.classList.add("is-active");

      siblings(slide).forEach((sibling) => {
        sibling.classList.remove("is-active", "is-next", "is-prev");
      });
      siblings(bullet).forEach((sibling) => {
        sibling.classList.remove("is-active", "is-next", "is-prev");
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

    glide.mount({ CustomActiveClass });
    check_resize(glide);
  }
}

export { check_resize, CustomActiveClass };
