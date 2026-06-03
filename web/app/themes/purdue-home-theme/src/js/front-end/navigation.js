const nav_opens = document.querySelectorAll(".navbar-open");
const nav_closes = document.querySelectorAll(".navbar-close");
const body = document.querySelector("html");
let firstFocusableElement;
let lastFocusableElement;

let navbar_info = document.querySelector(".navbar-find-info");
let closeBtn = document.querySelector(".navbar-close");

function trapFocus(event, top_menu, closeBtn) {

  const focusableElements = Array.from(top_menu.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), iframe'
  )).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
  if (closeBtn && closeBtn.classList.contains("is-active") && closeBtn.offsetParent !== null && !focusableElements.includes(closeBtn))
    focusableElements.unshift(closeBtn);


  if (focusableElements.length === 0) return;


  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (event.key === "Tab") {
    if (event.shiftKey) {
      // Shift+Tab: cycle to last if at first
      if (document.activeElement.isSameNode(firstFocusableElement)) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      // Tab: cycle to first if at last
      if (document.activeElement.isSameNode(firstFocusableElement)) {
        event.preventDefault();
        focusableElements[1].focus();
      }
      if (document.activeElement.isSameNode(lastFocusableElement)) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }

  if (event.key === "Escape") {

    top_menu.classList.remove("is-active");
    setTimeout(() => {
      top_menu.classList.add("is-hidden");
    }, 500);

    closeBtn.classList.remove("is-active");
    closeBtn.classList.add("is-hidden");
    body.classList.remove("no-scroll");
    nav_opens.forEach((nav) => {
      if (nav.hasAttribute("aria-expanded")) {
        nav.setAttribute("aria-expanded", false);
      }
      nav.classList.add("is-active");
      nav.classList.remove("is-hidden");
    });
  }

}

if (navbar_info) {
  //Trap focus inside Search Menu when open
  navbar_info.addEventListener("keydown", (event) => trapFocus(event, navbar_info, closeBtn));
}
if (closeBtn) {
  closeBtn.addEventListener("keydown", (event) => trapFocus(event, navbar_info, closeBtn));
}


document.addEventListener("focusin", function (e) {
  if (navbar_info.classList.contains("is-active") && !navbar_info.contains(e.target)) {
    const focusableElements = Array.from(navbar_info.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), iframe'
    )).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);

    const closeBtn = document.querySelector(".navbar-close");

    if (
      closeBtn &&
      closeBtn.classList.contains("is-active") &&
      closeBtn.offsetParent !== null &&
      !focusableElements.includes(closeBtn)
    ) {
      focusableElements.unshift(closeBtn);
    }


    if (focusableElements.length === 0) return;

    if (focusableElements.length) {
      focusableElements[0].focus();
    }
  }


});


const expandSelect = (select) => {
  select.size = select.options.length;
  select.classList.add("has-select-expand");
  select.addEventListener("click", () => {
    select.size = 1;
    select.classList.remove("has-select-expand");
  });
};
if (nav_opens && nav_opens.length > 0) {
  const top_menu = document.querySelector(
    `[data-menu='${nav_opens[0].dataset.target}']`
  );
  nav_opens.forEach((nav_open) => {

    nav_open.addEventListener("click", () => {
      if (top_menu) {
        top_menu.classList.remove("is-hidden");
        top_menu.classList.add("is-active");
        body.classList.add("no-scroll");
        nav_opens.forEach((nav) => {
          if (nav.hasAttribute("aria-expanded")) {
            nav.setAttribute("aria-expanded", true);
          }
          nav.classList.remove("is-active");
          nav.classList.add("is-hidden");
        });


        if (nav_closes && nav_closes.length > 0) {
          nav_closes.forEach((nav_close) => {
            nav_close.classList.add("is-active");
            nav_close.classList.remove("is-hidden");
          });
        }
      }
    });

    nav_open.addEventListener("keydown", (event) => {
      setTimeout(() => {
        closeBtn.focus();
      }, 1);

    })

  });




  if (nav_closes && nav_closes.length > 0) {
    nav_closes.forEach((nav_close) => {
      nav_close.addEventListener("click", () => {
        nav_closes.forEach((nav_close) => {
          nav_close.classList.remove("is-active");
          nav_close.classList.add("is-hidden");
        });
        if (top_menu) {
          top_menu.classList.remove("is-active");
          setTimeout(() => {
            top_menu.classList.add("is-hidden");
          }, 500);

          body.classList.remove("no-scroll");
          nav_opens.forEach((nav) => {
            if (nav.hasAttribute("aria-expanded")) {
              nav.setAttribute("aria-expanded", false);
            }
            nav.classList.add("is-active");
            nav.classList.remove("is-hidden");
          });
        }
      });
    });
  }
}

//create accordion buttons
const collapsedGlobalMenus = document.querySelectorAll(
  ".navbar-find-info,.purdue-second-nav.desktop-hidden"
);
if (collapsedGlobalMenus.length > 0) {
  collapsedGlobalMenus.forEach((collapsedGlobalMenu) => {
    let modifier = "top";
    if (collapsedGlobalMenu.classList.contains("purdue-second-nav")) {
      modifier = "section";
    }
    const accordionHeaders = collapsedGlobalMenu.querySelectorAll(
      ".navbar-link, .navbar-link-submenu"
    );
    if (accordionHeaders.length > 0) {
      accordionHeaders.forEach((item, index) => {
        const content = item.nextElementSibling;
        if (content) {
          const clonelink = item;
          if (
            clonelink.classList.contains("is-active-page") &&
            window.location.href !== clonelink.href
          ) {
            clonelink.classList.remove("is-active-page");
            clonelink.removeAttribute("aria-current");
          }
          clonelink.classList.remove("navbar-link", "navbar-link-submenu");
          clonelink.setAttribute("aria-haspopup", "false");
          const cloneLi = document.createElement("li");
          cloneLi.classList.add("navbar-item", "cloned-item");
          cloneLi.appendChild(clonelink);
          content.insertBefore(cloneLi, content.querySelector("li"));
          content.id = modifier + "-menu-item-" + index;
          content.classList.add("hide");
          const button = document.createElement("button");
          button.classList.add("accordion__heading");
          button.innerHTML = item.innerHTML;
          button.setAttribute("aria-controls", content.id);
          button.setAttribute("aria-expanded", "false");
          content.parentElement.insertBefore(button, content);
        }
      });
    }
    const activePage = collapsedGlobalMenu.querySelector(".is-active-page");
    if (activePage) {
      if (
        activePage.parentElement.parentElement.classList.contains(
          "navbar-dropdown-submenu"
        )
      ) {
        activePage.parentElement.parentElement.classList.remove("hide");
        activePage.parentElement.parentElement.classList.add("show");
        activePage.parentElement.parentElement.previousElementSibling.classList.add(
          "is-open"
        );
        activePage.parentElement.parentElement.previousElementSibling.setAttribute(
          "aria-expanded",
          "true"
        );
        activePage.parentElement.parentElement.parentElement.parentElement.classList.remove(
          "hide"
        );
        activePage.parentElement.parentElement.parentElement.parentElement.classList.add(
          "show"
        );
        activePage.parentElement.parentElement.parentElement.parentElement.previousElementSibling.setAttribute(
          "aria-expanded",
          "true"
        );
        activePage.parentElement.parentElement.parentElement.parentElement.previousElementSibling.classList.add(
          "is-open"
        );
      }
      if (
        activePage.parentElement.parentElement.classList.contains(
          "navbar-dropdown"
        )
      ) {
        activePage.parentElement.parentElement.classList.remove("hide");
        activePage.parentElement.parentElement.classList.add("show");
        activePage.parentElement.parentElement.previousElementSibling.setAttribute(
          "aria-expanded",
          "true"
        );
        activePage.parentElement.parentElement.previousElementSibling.classList.add(
          "is-open"
        );
      }
    }
  });
}
//if anchor link is on the same page, close the menu
const links = document.querySelectorAll(
  ".navbar-quick-links a, .navbar-other-links-wrapper a, .navbar-find-info__menu a"
);
const href = window.location.href.replace(location.hash, "");
if (links.length > 0) {
  links.forEach((link) => {
    if (link.href.includes(href)) {
      const hash = link.href.replace(href, "");
      if (hash) {
        link.addEventListener("click", (e) => {
          const el = document.querySelector(hash);
          if (el) {
            if (nav_opens && nav_opens.length > 0) {
              const top_menu = document.querySelector(
                `[data-menu='${nav_opens[0].dataset.target}']`
              );

              nav_closes.forEach((nav_close) => {
                nav_close.classList.remove("is-active");
                nav_close.classList.add("is-hidden");
              });
              if (top_menu) {
                top_menu.classList.remove("is-active");
                setTimeout(() => {
                  top_menu.classList.add("is-hidden");
                }, 500);

                body.classList.remove("no-scroll");
                nav_opens.forEach((nav) => {
                  nav.setAttribute("aria-expanded", false);
                  nav.classList.add("is-active");
                  nav.classList.remove("is-hidden");
                });
              }
            }
            const select = el.querySelector("select");
            if (select) {
              expandSelect(select);
            }
          }
        });
      }
    }
  });
}
const sticky_second_navs = document.querySelectorAll(
  ".header--global.header--two-rows .second-nav-sticky"
);
//set header position if there is a top alert
const top_alert = document.querySelector(".alert-widget.modal");
if (top_alert) {
  const height = top_alert.scrollHeight
  const page_content = document.querySelector(".site")
  const mobile_menu = document.querySelector(".navbar-find-info.is-global")
  const width = window.innerWidth
  if (width <= 1215 && mobile_menu) {
    mobile_menu.style.top = height + "px"
  }
  page_content.style.top = height + "px"
  window.addEventListener("resize", () => {
    const newHeight = top_alert.offsetHeight
    page_content.style.top = newHeight + "px"
    const width = window.innerWidth
    if (width <= 1215 && mobile_menu) {
      mobile_menu.style.top = newHeight + "px"
    }
  })

  const close_top_alert = top_alert.querySelector(".modal-close")
  close_top_alert.addEventListener("click", () => {
    page_content.style.top = "0px"
    const width = window.innerWidth
    if (width <= 1215 && mobile_menu) {
      mobile_menu.style.top = "0px"
    }
  })
}
//sticky header
const top_nav = document.querySelector(
  ".header--global:not(.header--two-rows)"
);
if (top_nav) {
  const sticky = top_nav.offsetTop;
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > sticky) {
      top_nav.classList.add("is-fixed-top");
    } else {
      top_nav.classList.remove("is-fixed-top");
    }
  });
}

if (sticky_second_navs.length > 0) {
  sticky_second_navs.forEach((sticky_second_nav) => {
    const sticky = sticky_second_nav.offsetTop;
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        sticky_second_nav.classList.add("is-fixed-top");
        if (top_alert) {
          sticky_second_nav.style.top = top_alert.offsetHeight + "px"
        }
      } else {
        sticky_second_nav.classList.remove("is-fixed-top");
        if (top_alert) {
          sticky_second_nav.style.top = "auto"
        }
      }
    });
  })

}