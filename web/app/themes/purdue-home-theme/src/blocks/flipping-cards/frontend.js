const flippingCards = document.querySelectorAll(".flipping-card");
if (flippingCards.length > 0) {
  flippingCards.forEach((card) => {
    const flippingIcons = card.querySelectorAll(".flipping-icon");
    flippingIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        card.classList.toggle("flipped");
        let flipped = false;
        if(card.classList.contains('flipped')) {
          flipped = true;
        }

        const selector = flipped ? '.flipping-icon.back' : '.flipping-icon.front';

        card.querySelector('.flipping-icon.front').setAttribute('tabindex', (flipped) ? -1 : 0);
        card.querySelector('.flipping-card-front').setAttribute('aria-hidden', (flipped) ? true : false);
        card.querySelector('.flipping-icon.back').setAttribute('tabindex', (flipped) ? 0 : -1);
        card.querySelector('.flipping-card-back').setAttribute('aria-hidden', (flipped) ? false : true);

        card.querySelector('.flipping-card-front').inert = (flipped) ? true : false;
        card.querySelector('.flipping-card-back').inert = (flipped) ? false : true;
        
        card.querySelector(selector).focus();
      });
    });
  });
}
