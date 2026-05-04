window.addEventListener("load", function () {
  const alertPage = document.querySelector(".alert-page-widget");
  if (alertPage) {
    const showMultiple = document.querySelector(".show-multiple-times");
    // Check if the user has already seen the modal
    if (!localStorage.getItem("seenModal") || showMultiple) {
      const alertPage = document.querySelector(".alert-page-widget");
      if (alertPage) {
        alertPage.classList.add("is-active");
        localStorage.setItem("seenModal", "true");
      }
    }
    const linkButton = alertPage.querySelector(".alert-page__link");
    if (linkButton && /\/#$/.test(linkButton.href)) {
      linkButton.addEventListener("click", (event) => {
        event.preventDefault();
        alertPage.classList.remove("is-active");
      });
    }
  }
});
