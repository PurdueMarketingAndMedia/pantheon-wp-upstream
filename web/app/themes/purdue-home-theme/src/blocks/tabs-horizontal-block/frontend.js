const tabGroups = [...document.querySelectorAll(".purdue-home-tabs-horizontal")];

if (tabGroups && tabGroups.length > 0) {
    tabGroups.forEach((tabs) => {
        const headers = [...tabs.querySelectorAll(".purdue-home-tabs-horizontal__header")];
        const tabList = tabs.querySelector(".purdue-home-tabs-horizontal__headers");
        const panels = [...tabs.querySelectorAll(".purdue-home-tabs-horizontal__panel")];
        const panelsContainer = panels[0].parentElement;
        const arrow = tabs.querySelector(".arrow");

        const scrollable = document.querySelector('.purdue-home-tabs-horizontal__headers');

        let isDown = false;
        let startX;
        let scrollStart;


        function checkScrollPosition() {

            if (scrollable.scrollLeft === 0) {
                scrollable.classList.remove("scoll-end");
                scrollable.classList.remove("scrolling");
                scrollable.classList.add("scroll-start");
            } else if (scrollable.scrollLeft + scrollable.clientWidth >= scrollable.scrollWidth) {
                scrollable.classList.add("scroll-end");
                scrollable.classList.remove("scrolling");
                scrollable.classList.remove("scroll-start");
            } else {
                scrollable.classList.add("scrolling");
                scrollable.classList.remove("scoll-end");
                scrollable.classList.remove("scroll-start");
            }
        }

        scrollable.addEventListener("pointerdown", e => {
            isDown = true;
            e.stopImmediatePropagation();
            pageX = e.pageX;
            startX = pageX - scrollable.offsetLeft;
            scrollStart = scrollable.scrollLeft;
            checkScrollPosition()
        });

        scrollable.addEventListener("mouseleave", e => {
            isDown = false;
            e.stopImmediatePropagation();
            checkScrollPosition();
        });

        scrollable.addEventListener("mouseup", e => {
            e.stopImmediatePropagation();
            isDown = false;
            checkScrollPosition();
        });

        scrollable.addEventListener("mousemove", e => {
            if (!isDown) return;
            e.stopImmediatePropagation();
            const x = e.pageX - scrollable.offsetLeft;
            const deviation = x - startX;
            scrollable.scrollLeft = scrollStart - deviation;
            checkScrollPosition()
        });

        scrollable.addEventListener("mousedown", e => {
            isDown = true;
            checkScrollPosition()
            e.stopImmediatePropagation;
        })

        scrollable.addEventListener('wheel', (event) => {
            event.preventDefault(); // Prevent vertical scrolling

            scrollable.scrollLeft += event.deltaY; // Adjust scroll horizontally

            checkScrollPosition();

            if (event.deltaY === 0) {
                scrollable.scrollLeft += event.deltaX;
                checkScrollPosition();
            }

        }, {
            passive: false
        });

        let headerpos = "";

        function checkOffsetLeft() {
            if (tabs.querySelector(".section > .container")) {
                let tabsOffSet = tabs.querySelector(".section > .container").getBoundingClientRect().left;
                let activeHeaderCheck = tabs.querySelector(".purdue-home-tabs-horizontal__header.active h3");
                if (activeHeaderCheck && arrow) {
                    let headerLeft = activeHeaderCheck.getBoundingClientRect().left;
                    let headerWidth = activeHeaderCheck.getBoundingClientRect().width;
                    headerpos = headerLeft - tabsOffSet + (headerWidth / 2);
                    arrow.style.left = headerpos + "px";
                }
            }
        }

// window.addEventListener("resize", () => {
//     checkOffsetLeft();
// });
window.addEventListener("resize", () => {
    tabGroups.forEach(tabs => {
        const headers = tabs.querySelectorAll(".purdue-home-tabs-horizontal__header");
        const panels = tabs.querySelectorAll(".purdue-home-tabs-horizontal__panel");
        const arrow = tabs.querySelector(".arrow");
        const container = tabs.querySelector(".section > .container");

        // Find the index of the active panel (default to 0 if none)
        let activePanelIndex = Array.from(panels).findIndex(p => p.classList.contains('active'));
        if (activePanelIndex === -1) activePanelIndex = 0;

        // Remove .active from all headers and panels
        headers.forEach((h, i) => {
            h.classList.toggle('active', i === activePanelIndex);
            h.setAttribute('aria-selected', i === activePanelIndex ? 'true' : 'false');
        });
        panels.forEach((p, i) => {
            p.classList.toggle('active', i === activePanelIndex);
        });

        // Move the arrow to the active header
        const activeHeader = headers[activePanelIndex];
        if (arrow && container && activeHeader) {
            const tabsOffSet = container.getBoundingClientRect().left;
            const headerLeft = activeHeader.getBoundingClientRect().left;
            const headerWidth = activeHeader.offsetWidth;
            const headerPos = headerLeft - tabsOffSet + (headerWidth / 2);
            arrow.style.left = headerPos + "px";
        }
    });

    // Existing call to checkOffsetLeft (keep this if needed)
    checkOffsetLeft();
});







        tabList.addEventListener("scroll", () => {
            checkOffsetLeft();
        })

        headers.forEach((header, index) => {
            let clHeader = header.cloneNode(true);
            clHeader.id = "accrdion-" + clHeader.id
            clHeader.classList.remove("purdue-home-tabs-horizontal__header")
            clHeader.classList.add("purdue-home-tabs-horizontal__header-mobile")
            clHeader.setAttribute("role", "button")
            panelsContainer.insertBefore(clHeader, panels[index])
        })
        let newHeaders = [...tabs.querySelectorAll(".purdue-home-tabs-horizontal__header-mobile")]

        headers.forEach((header, index) => {
            header.addEventListener('click', e => {
                console.log('Header clicked'); // Debugging log
                if (isDown) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    isDown = false;
                    return
                }

                panels.forEach((panel, i) => {
                    if (index === i) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
                headers.forEach((h, i) => {
                    if (index === i) {
                        h.classList.add('active');
                        h.setAttribute('aria-selected', "true");
                    } else {
                        h.classList.remove('active');
                        h.setAttribute('aria-selected', "false");
                    }
                });
                newHeaders.forEach((h, i) => {
                    if (index === i) {
                        h.classList.add('active');
                        h.setAttribute('aria-selected', "true");
                    } else {
                        h.classList.remove('active');
                        h.setAttribute('aria-selected', "false");
                    }
                });

                checkOffsetLeft();
            });
        });

        newHeaders.forEach((header, index) => {
            header.addEventListener('click', (e) => {
                panels.forEach((panel, i) => {
                    if (index === i) {
                        panel.classList.contains('active') ? panel.classList.remove('active') : panel.classList.add('active')

                    } else {
                        panel.classList.remove('active')
                    }
                })
                newHeaders.forEach((h, i) => {
                    if (index === i) {
                        if (header.classList.contains("active")) {
                            header.classList.remove('active')
                            header.setAttribute('aria-selected', "false")
                        } else {
                            header.classList.add('active')
                            header.setAttribute('aria-selected', "true")
                        }
                    } else {
                        h.classList.remove('active')
                        h.setAttribute('aria-selected', "false")
                    }
                })
                headers.forEach((h, i) => {
                    if (index === i) {
                        h.classList.add('active')
                        h.setAttribute('aria-selected', "true")
                    } else {
                        h.classList.remove('active')
                        h.setAttribute('aria-selected', "false")
                    }
                })

            })
        })

        // Initial arrow placement
        const initialActiveHeader = tabs.querySelector(".purdue-home-tabs-horizontal__header.active");
        if (arrow && initialActiveHeader && tabs.querySelector(".section > .container")) {
            let tabsOffSet = tabs.querySelector(".section > .container").getBoundingClientRect().left;
            let initialActiveHeaderCheck = initialActiveHeader.querySelector("h3");
            if (initialActiveHeaderCheck) {
                let headerLeft = initialActiveHeaderCheck.getBoundingClientRect().left;
                let headerWidth = initialActiveHeaderCheck.getBoundingClientRect().width;
                let initialHeaderPos = headerLeft - tabsOffSet + (headerWidth / 2);
                arrow.style.left = initialHeaderPos + "px";
            }
        }
    })
}


function updateTabsFromHash(hash) {
    if (hash) {
        const targetDataName = hash.substring(1);
        const allPanels = document.querySelectorAll('.purdue-home-tabs-horizontal__panel');
        const allHeaders = document.querySelectorAll('.purdue-home-tabs-horizontal__header');
        const targetPanel = document.querySelector(`.purdue-home-tabs-horizontal__panel[data-name="${targetDataName}"]`);
        let targetHeader = null;

       

        if (targetPanel) {
             // remove "active" class from all panels and headers
            allPanels.forEach(panel => panel.classList.remove('active'));
            allHeaders.forEach(header => header.classList.remove('active'));

            targetPanel.classList.add('active');

            // Get the id of the target panel
            const targetPanelId = targetPanel.getAttribute('id');

            // Find the header that has an aria-controls attribute matching the target panel's id
            targetHeader = Array.from(allHeaders).find(header =>
                header.getAttribute('aria-controls') === targetPanelId
            );

            if (targetHeader) {
                targetHeader.classList.add('active');
                targetHeader.setAttribute('aria-selected', 'true');
            }

            // find the parent with class "purdue-home-tabs-horizontal" and scroll to it
            let parentElement = targetPanel;
            while (parentElement) {
                if (parentElement && parentElement.classList.contains('purdue-home-tabs-horizontal')) {
                    parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                    const arrowInGroup = parentElement.querySelector('.arrow');
                    const activeHeaderInGroup = parentElement.querySelector('.purdue-home-tabs-horizontal__header.active');
                    const containerInGroup = parentElement.querySelector(".section > .container");

                    if (arrowInGroup && activeHeaderInGroup && containerInGroup) {
                        const tabsOffSet = containerInGroup.getBoundingClientRect().left;
                        const headerLeft = activeHeaderInGroup.getBoundingClientRect().left;
                        const headerWidth = activeHeaderInGroup.offsetWidth;
                        const headerpos = headerLeft - tabsOffSet + (headerWidth / 2);
                        arrowInGroup.style.left = headerpos + "px";
                    }
                    break; // stop searching once found
                }
                parentElement = parentElement.parentElement;
            }
        }
    }
}

window.onload = function () {
    if (!location.hash) {
        tabGroups.forEach(tabs => {
            const headers = tabs.querySelectorAll(".purdue-home-tabs-horizontal__header");
            const panels = tabs.querySelectorAll(".purdue-home-tabs-horizontal__panel");

            // Remove active class from all headers and panels
            headers.forEach(h => h.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active class to the first header and panel if they exist
            if (headers.length > 0 && panels.length > 0) {
                headers[0].classList.add('active');
                headers[0].setAttribute('aria-selected', 'true');
                panels[0].classList.add('active');

                // Move the arrow to the first tab
                const arrow = tabs.querySelector(".arrow");
                const firstHeader = headers[0];
                const container = tabs.querySelector(".section > .container");

                if (arrow && firstHeader && container) {
                    const tabsOffSet = container.getBoundingClientRect().left;
                    const headerLeft = firstHeader.getBoundingClientRect().left;
                    const headerWidth = firstHeader.offsetWidth;
                    const initialHeaderPos = headerLeft - tabsOffSet + (headerWidth / 2);
                    arrow.style.left = initialHeaderPos + "px";
                }
            }
        });
    } else {
        updateTabsFromHash(location.hash);
    }
};

window.addEventListener("popstate", function () {
    updateTabsFromHash(location.hash);
});

window.addEventListener('DOMContentLoaded', function () {
    const tabGroups = document.querySelectorAll(".purdue-home-tabs-horizontal");
    tabGroups.forEach(tabs => {
        const headers = tabs.querySelectorAll(".purdue-home-tabs-horizontal__header");
        const mobileHeaders = tabs.querySelectorAll(".purdue-home-tabs-horizontal__header-mobile");
        const panels = tabs.querySelectorAll(".purdue-home-tabs-horizontal__panel");

        // Remove .active from all headers, mobile headers, and panels
        headers.forEach(h => {
            h.classList.remove('active');
            h.setAttribute('aria-selected', 'false');
        });
        mobileHeaders.forEach(h => h.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        // Set .active only on the first of each
        if (headers.length > 0) {
            headers[0].classList.add('active');
            headers[0].setAttribute('aria-selected', 'true');
        }
        if (mobileHeaders.length > 0) {
            mobileHeaders[0].classList.add('active');
        }
        if (panels.length > 0) {
            panels[0].classList.add('active');
        }
    });
});