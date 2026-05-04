const tabGroups=[...document.querySelectorAll(".purdue-home-tabs")]
if(tabGroups&&tabGroups.length>0){
tabGroups.forEach((tabs)=>{
    const headers=[...tabs.querySelectorAll(".purdue-home-tabs__header")]
    const panels=[...tabs.querySelectorAll(".purdue-home-tabs__panel")]
    const panelsContainer=panels[0].parentElement
    const arrow=tabs.querySelector(".arrow")
    const activeHeader=tabs.querySelector(".purdue-home-tabs__header.active")
    if(arrow){
        arrow.style.top=activeHeader.offsetTop+activeHeader.offsetHeight/2+"px"
    }

    headers.forEach((header,index)=>{
        let clHeader = header.cloneNode(true);
        clHeader.id="accrdion-"+clHeader.id
        clHeader.classList.remove("purdue-home-tabs__header")
        clHeader.classList.add("purdue-home-tabs__header-mobile")
        clHeader.setAttribute("role", "button")
        panelsContainer.insertBefore(clHeader, panels[index])
    })
    let newHeaders=[...tabs.querySelectorAll(".purdue-home-tabs__header-mobile")]

    headers.forEach((header, index)=>{
        header.addEventListener('click', ()=>{
            panels.forEach((panel,i)=>{
                if(index===i){
                    panel.classList.add('active')   

                }else{
                    panel.classList.remove('active')
                }
            })
            headers.forEach((h,i)=>{
                if(index===i){
                    h.classList.add('active')
                    h.setAttribute('aria-selected',"true")            
                }else{
                    h.classList.remove('active')
                    h.setAttribute('aria-selected',"false")
                }
            })
            newHeaders.forEach((h,i)=>{
                if(index===i){
                    h.classList.add('active')
                    h.setAttribute('aria-selected',"true")            
                }else{
                    h.classList.remove('active')
                    h.setAttribute('aria-selected',"false")
                }
            })
            if(arrow){
                arrow.style.top=header.offsetTop+header.offsetHeight/2+"px"
            }
        })
    })
    newHeaders.forEach((header, index) => {
        header.addEventListener('click', (e) => {
            panels.forEach((panel, i) => {
                if (index === i) {
                    panel.classList.contains('active') ? panel.classList.remove('active') : panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
            newHeaders.forEach((h, i) => {
                if (index === i) {
                    if (header.classList.contains("active")) {
                        header.classList.remove('active');
                        header.setAttribute('aria-selected', "false");
                    } else {
                        header.classList.add('active');
                        header.setAttribute('aria-selected', "true");
                    }
                } else {
                    h.classList.remove('active');
                    h.setAttribute('aria-selected', "false");
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

            // Move the arrow to the corresponding desktop tab
            if (arrow && headers[index]) {
                arrow.style.top = headers[index].offsetTop + headers[index].offsetHeight / 2 + "px";
            }
        });
    })
})
}






function updateVerticalTabsFromHash(hash) {
    if (hash) {
        const targetDataName = hash.substring(1);
        const allPanels = document.querySelectorAll('.purdue-home-tabs__panel');
        const allHeaders = document.querySelectorAll('.purdue-home-tabs__header');
        const targetPanel = document.querySelector(`.purdue-home-tabs__panel[data-name="${targetDataName}"]`);
        let targetHeader = null;

        // remove "active" class from all panels and headers
        allPanels.forEach(panel => panel.classList.remove('active'));
        allHeaders.forEach(header => header.classList.remove('active'));

        if (targetPanel) {
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
                // Update arrow position on hash change
                const arrowInGroup = targetHeader.closest('.purdue-home-tabs').querySelector('.arrow');
                if (arrowInGroup) {
                    arrowInGroup.style.top = targetHeader.offsetTop + targetHeader.offsetHeight / 2 + "px";
                }
            }

            // find the parent with class "purdue-home-tabs" and scroll to it
            let parentElement = targetPanel;
            while (parentElement) {
                if (parentElement && parentElement.classList.contains('purdue-home-tabs')) {
                    parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                    break; // stop searching once found
                }
                parentElement = parentElement.parentElement;
            }
        }
    }
}
function updateArrowPosition(tabs) {
    const arrow = tabs.querySelector(".arrow");
    const activeHeader = tabs.querySelector(".purdue-home-tabs__header.active");
    if (arrow && activeHeader) {
        arrow.style.top = activeHeader.offsetTop + activeHeader.offsetHeight / 2 + "px";
    }
}
window.onload = function () {
    if (!location.hash) {
        tabGroups.forEach(tabs => {
            const headers = tabs.querySelectorAll(".purdue-home-tabs__header");
            const panels = tabs.querySelectorAll(".purdue-home-tabs__panel");
            const mobileHeaders = tabs.querySelectorAll(".purdue-home-tabs__header-mobile");

            // Remove active class from all headers, panels, and mobile headers
            headers.forEach(h => h.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            mobileHeaders.forEach(mh => mh.classList.remove('active'));

            // Add active class to the first header, panel, and mobile header if they exist
            if (headers.length > 0 && panels.length > 0) {
                const firstHeader = headers[0];
                firstHeader.classList.add('active');
                firstHeader.setAttribute('aria-selected', 'true');
                panels[0].classList.add('active');

                // Move the arrow to the first tab on initial load without a hash
                const arrow = tabs.querySelector(".arrow");
                if (arrow && firstHeader) {
                    arrow.style.top = firstHeader.offsetTop + firstHeader.offsetHeight / 2 + "px";
                }
            }
            if (mobileHeaders.length > 0) {
                mobileHeaders[0].classList.add('active');
                mobileHeaders[0].setAttribute('aria-selected', 'true');
            }
            updateArrowPosition(tabs);
        });
    } else {
        updateVerticalTabsFromHash(location.hash);
    }
};

window.addEventListener("popstate", function () {
    updateVerticalTabsFromHash(location.hash);
});

window.addEventListener('resize', function () {
    const isDesktop = window.innerWidth >= 768; // Tablet and up
    tabGroups.forEach(tabs => {
        const headers = tabs.querySelectorAll(".purdue-home-tabs__header");
        const panels = tabs.querySelectorAll(".purdue-home-tabs__panel");
        const mobileHeaders = tabs.querySelectorAll(".purdue-home-tabs__header-mobile");
        const activeHeader = tabs.querySelector(".purdue-home-tabs__header.active");

        if (isDesktop) {
            if (!activeHeader && headers.length > 0 && panels.length > 0) {
                // No active header: activate the first
                headers.forEach(h => h.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                mobileHeaders.forEach(mh => mh.classList.remove('active'));

                headers[0].classList.add('active');
                headers[0].setAttribute('aria-selected', 'true');
                panels[0].classList.add('active');
            } else if (activeHeader) {
                // There is an active header: activate the corresponding panel
                panels.forEach(p => p.classList.remove('active'));
                const ariaControls = activeHeader.getAttribute('aria-controls');
                let correspondingPanel = null;
                if (ariaControls) {
                    correspondingPanel = tabs.querySelector(`.purdue-home-tabs__panel#${CSS.escape(ariaControls)}`);
                }
                if (correspondingPanel) {
                    correspondingPanel.classList.add('active');
                } else if (panels.length > 0) {
                    panels[0].classList.add('active'); // fallback
                }
            }
        }
        updateArrowPosition(tabs);
    });
});
