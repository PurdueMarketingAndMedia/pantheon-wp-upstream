const cards = document.querySelectorAll(".purdue-home-cta-card--vertical .flex-container");


function setCardHeights(cards) {

    if (cards.length === 0) return; // Exit the function if there are no cards to process

    cards.forEach(card => {
        card.style.height = 'auto';
        card.style.minHeight = 'auto';
    });

    let cardHeight = cards[0].getBoundingClientRect().height; // Get the height of the first card
    let cardHeight2 = cards[1].getBoundingClientRect().height; // Get the height of the second card

    // If the second card is taller than the first, update the cardHeight variable
    if (cardHeight2 >= cardHeight) {
        cards[0].style = `min-height: ${cardHeight2}px !important`; // Set the height of the first card to match the second card
        cardHeight = cardHeight2; // Update the cardHeight variable to the new height
    } else {
        cards[1].style = `min-height: ${cardHeight}px !important`; // Set the height of the second card to match the first card
    }
}

document.addEventListener("DOMContentLoaded", function () {

    setCardHeights(cards);

});

window.addEventListener("resize", function () {

    if (window.innerWidth >= 768) {
        setCardHeights(cards);
    } else {
        cards.forEach(card => {
            card.style = ""; // Reset the height of both cards to their default values
        });
    }
});


window.addEventListener('load', function () {

    const conf = document.querySelector('.gform_confirmation_message');
    if (conf) {
        window.scrollTo({
            behavior: 'smooth',
            top:
                conf.getBoundingClientRect().top -
                document.body.getBoundingClientRect().top -
                200,
        })
    }

});