const flippingCards = document.querySelectorAll(".flipping-card");
if (flippingCards.length > 0) {
  flippingCards.forEach((card) => {
    const flippingIcons = card.querySelectorAll(".flipping-icon");
    flippingIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
    });
  });
}
