import {CustomActiveClass, check_resize} from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

document.addEventListener("DOMContentLoaded", function() {
//hot spot button functionality
const hotspot_buttons=document.querySelectorAll('.hot-spot-button')
    if(hotspot_buttons && hotspot_buttons.length>0){
        hotspot_buttons.forEach((button)=>{
            const parentElement = button.parentElement.parentElement.parentElement;
            const target = document.getElementById(button.dataset.target);
            const link = target.querySelector('a');
            if(link){
                link.setAttribute("tabindex", "-1");
            }
             target.setAttribute("tabindex", "-1");
            if(parentElement.classList.contains('is-active')){                
                button.setAttribute("tabindex", "0");
               
            }else{
                button.parentElement.setAttribute("tabindex", "-1");
                button.setAttribute("tabindex", "-1");
            }
        })
    }
})

const hotspot_buttons=document.querySelectorAll('.hot-spot-button')
if(hotspot_buttons && hotspot_buttons.length>0){

    hotspot_buttons.forEach((button)=>{
        const target = document.getElementById(button.dataset.target);
        const link = target.querySelector('a');

        button.addEventListener("click", (event)=>{

            button.setAttribute("aria-expanded", button.getAttribute("aria-expanded") === "true" ? "false" : "true");
            
			if(event.target.classList.contains('is-active')){
                event.target.classList.remove('is-active')
				target.classList.remove('is-active')
                target.setAttribute("tabindex", "-1");
                link.setAttribute("tabindex", "-1");
            }else{
            	event.target.classList.add('is-active')
				target.classList.add('is-active')
                link.setAttribute("tabindex", "0");
                target.setAttribute("tabindex", "0");
            }

        })
		
        if(button.parentElement.parentElement.querySelector('.image')){
            button.parentElement.parentElement.querySelector('.image').addEventListener("click", ()=>{
                target.classList.remove('is-active');
                button.classList.remove('is-active');
                target.setAttribute("tabindex", "-1");
                link.setAttribute("tabindex", "-1");
            })
        }

        if(button.parentElement.previousElementSibling){
            button.parentElement.previousElementSibling.addEventListener("click", ()=>{
                target.classList.remove('is-active');
                button.classList.remove('is-active');
                target.setAttribute("tabindex", "-1");
                link.setAttribute("tabindex", "-1");
            })
        }
        if(button.parentElement.nextElementSibling){
            button.parentElement.nextElementSibling.addEventListener("click", ()=>{
                target.classList.remove('is-active');
                button.classList.remove('is-active');
                target.setAttribute("tabindex", "-1");
                link.setAttribute("tabindex", "-1");
            })
        }
    })
}


//desktop hot spot
const hs_desktop = document.querySelectorAll('.purdue-home-slide__hot-spot-desktop');

if(hs_desktop && hs_desktop.length>0){
	for (let i = 0; i < hs_desktop.length; i++) {
	let glide = new Glide(hs_desktop[i], {
		type: 'carousel',
		perView: 1
	});
	const nextButton = hs_desktop[i].querySelector('.arrow--left');
	const prevButton = hs_desktop[i].querySelector('.arrow--right');
	nextButton.addEventListener('click', function (event) {
		event.preventDefault();	  
		glide.go('<');
	})
	
	prevButton.addEventListener('click', function (event) {
		event.preventDefault();	  
		glide.go('>');
	})
    
  glide.slides_count = hs_desktop[i].querySelectorAll('.glide__slide').length;
  glide.controls = hs_desktop[i].querySelector('.slider-controls');
  glide.on('resize', () => {
    check_resize(glide);
  });
  glide.on('run', function() {

    const hotspot_buttons=hs_desktop[i].querySelectorAll('.hot-spot-button');

    if(hotspot_buttons && hotspot_buttons.length>0){
      hotspot_buttons.forEach((button)=>{
            const dataTarget = document.getElementById(button.dataset.target);
            const link = dataTarget.querySelector('a');
            
            if(link){
                link.setAttribute("tabindex", "-1");
            }
            
            dataTarget.setAttribute("tabindex", "-1");
            let parentElement = button.parentElement.parentElement.parentElement;
            setTimeout(() => {
                if(parentElement.classList.contains('is-active')){                
                 button.setAttribute("tabindex", "0");
            }else{
                button.setAttribute("tabindex", "-1");
            }
            }, 500);
            
          const modal = button.dataset.target;
          const target = document.getElementById(modal);
          target.classList.remove('is-active');
          button.classList.remove('is-active');
      })
  }
  })
  glide.mount({CustomActiveClass,});
  check_resize(glide);
}}

//mobile hot spot
const hs_mobile = document.querySelectorAll('.purdue-home-slide__hot-spot-mobile');

if(hs_mobile && hs_mobile.length>0){
	for (let i = 0; i < hs_mobile.length; i++) {
	let glide = new Glide(hs_mobile[i], {
		type: 'carousel',
		perView: 1
	});
	const nextButton = hs_mobile[i].querySelector('.arrow--left');
	const prevButton = hs_mobile[i].querySelector('.arrow--right');
	nextButton.addEventListener('click', function (event) {
		event.preventDefault();	  
		glide.go('<');
	})
	
	prevButton.addEventListener('click', function (event) {
		event.preventDefault();	  
		glide.go('>');
	})
  glide.slides_count = hs_mobile[i].querySelectorAll('.glide__slide').length;
  glide.controls = hs_mobile[i].querySelector('.slider-controls');
  glide.on('resize', () => {
    check_resize(glide);
  });
  glide.mount({CustomActiveClass});
  check_resize(glide);

  const hs_slides = hs_mobile[i].querySelectorAll('.glide__slide');
    hs_slides.forEach((slide)=>{
        if (slide.classList.contains('glide__slide--active')){
            slide.setAttribute("z-index", "0");
        }else{
            slide.setAttribute("z-index", "-1");
        }
    })

    function setTabIndexMobile(hotspot_content){

        if(hotspot_content && hotspot_content.length>0){      
                
                hotspot_content.forEach((content)=>{
                    
                    const link = content.querySelector('a');          
                    let parentElement = content.parentElement.parentElement;

                    setTimeout(() => {
                        if(parentElement.classList.contains('is-active')){      
                        if(link){
                            link.setAttribute("tabindex", "0");
                        }          
                        parentElement.setAttribute("tabindex", "0");
                    }else{
                        if(link){
                            link.setAttribute("tabindex", "-1");
                        }                        
                        parentElement.setAttribute("tabindex", "-1");
                    }
                    }, 500);

            })
        }
    }

    const hotspot_content=hs_mobile[i].querySelectorAll('.hot-spot-content');

     setTabIndexMobile(hotspot_content);


    glide.on('run', function() {

     setTabIndexMobile(hotspot_content);

    })


}}