import { tabbable, focusable } from 'tabbable';

const accordions = document.querySelectorAll('.purdue-accordion__title > button');
let id = window.location.hash;

accordions.forEach((el) => {
	setTabbable(el);
	el.addEventListener('click', (event) => {
        const element = el.parentElement.parentElement.parentElement.parentElement.parentElement;
        const sameLevelAccordions = element.parentElement.querySelectorAll(':scope > .purdue-accordion-wrap');
        purdueBlocksToggleAccordion(element, (element.classList.contains('is-open')) ? true : false);
       
        sameLevelAccordions.forEach((ele) => {
            const control = ele.querySelector('.purdue-accordion__title > button');
            if(control !== event.target) {
                purdueBlocksToggleAccordion(ele, true);
            }
        });   
        
         element.scrollIntoView({behavior: "instant"});
    })
})

function setTabbable(el) {

	const content = el.parentElement.parentElement.querySelector('.purdue-accordion__content');
	const canTab = el.getAttribute('aria-expanded')
	let items = [];

	if(canTab === 'true') {
		items = focusable(content, { displayCheck: true });
	} else {
		items = tabbable(content);
	}

	items.forEach((e) => {
		e.setAttribute('tabindex', canTab === 'true' ? 0 : -1);
	});
}
function hashToggleAccordion (id) {

    if (id) {
        const el = document.querySelector(id);  
        if (el) {
            const element = el.parentElement.parentElement.parentElement;
            el.scrollIntoView({ behavior: "smooth" });
            if (el.classList.contains('purdue-accordion')) {
                element.scrollIntoView();
                //window.scrollTop = el.offsetTop;
                el.parentElement.parentElement.parentElement.parentElement
                purdueBlocksToggleAccordion(element, false);
                let close = el.parentElement.closest('.purdue-accordion'); 
                while(close) {
                    purdueBlocksToggleAccordion(close, false);
                    close = close.parentElement.closest('.purdue-accordion'); 
                }            
            }
        }
    }
    
}

window.addEventListener("popstate", function() {

    hashToggleAccordion(location.hash);

});


document.addEventListener("DOMContentLoaded", function(){

       hashToggleAccordion(id);

})

function purdueBlocksToggleAccordion(el, close = false) {
	const content = el.querySelector('.purdue-accordion__content');
    const control = el.querySelector('.purdue-accordion__title button');

    (close) ? el.classList.remove('is-open') : el.classList.add('is-open');

    content.setAttribute('hidden', close)
    content.setAttribute('aria-hidden', close);
    control.setAttribute('aria-expanded', close ? false : true);
	setTabbable(control)
}
