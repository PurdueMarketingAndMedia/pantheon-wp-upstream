document.addEventListener('DOMContentLoaded', () => {

	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
	const $aside = document.querySelector('.side-nav');
	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
  
	  // Add a click event on each of them
	  $navbarBurgers.forEach( el => {
		el.addEventListener('click', () => {
  
		  // Get the target from the "data-target" attribute
		  const target = el.dataset.target;
		  const $target = Array.prototype.slice.call(document.querySelectorAll(target), 0);
		  const $navBar = document.querySelector('.purdue-navbar-white');
		  const $button = document.querySelector('.purdue-navbar-black>.navbar-end');
		  const expanded = el.getAttribute('aria-expanded') === "false" ? true : false;
		  el.setAttribute('aria-expanded', expanded);  
		  // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		  el.classList.toggle('is-active');
		  if($aside){
			$aside.classList.toggle('is-active');
		  }
		  $target.forEach(t=>t.classList.toggle('is-active'));  
		  if($navBar){
			$navBar.classList.toggle('is-active');
		  }
		  if($button){
			$button.classList.toggle('is-active');
		  }
		});
	  });
	}

	let width = document.body.clientWidth;
	let dropdowns = Array.prototype.slice.call(document.querySelectorAll('.navbar-dropdown'), 0);
	dropdowns.forEach( el => {
		let subDropdowns = Array.prototype.slice.call(el.querySelectorAll('.submenu'), 0);
		if(width < 1023 && el.style.display !== "none" && subDropdowns.lenght > 0){
			subDropdowns.forEach(e =>{
				Array.prototype.slice.call(e.querySelectorAll('.navbar-dropdown-submenu'), 0).style.display = "block";
			})
		}
	})

	// sidenav
	// on page load open current dropdown
	const $currentpage=window.location.href;
	if($aside){
		const $sidenav=$aside.querySelector('.navbar-menu');
		//top level menu
		const $navbar_topitems=Array.prototype.slice.call($sidenav.querySelectorAll('.navbar-item:not(.submenu)'), 0);
		//submenu
		const $navbar_subitems=Array.prototype.slice.call($sidenav.querySelectorAll('.submenu'), 0);
		if ($navbar_topitems.length> 0) {
			$navbar_topitems.forEach((el)=>{
				const $href=el.firstChild.getAttribute('href');
				if($href===$currentpage){
					el.classList.add('active');
					if(el.classList.contains('has-dropdown')){
						const $dropdown_link=el.querySelector('.navbar-link');
						const $dropdown_content=el.querySelector('.navbar-dropdown');
						$dropdown_link.classList.add('navbar-link-open');
						$dropdown_content.classList.add('is-active');
					}
				}
			})
		}
		if($navbar_subitems.length>0){
			$navbar_subitems.forEach((el)=>{
				const $href=el.firstChild.getAttribute('href');				
				if($currentpage.includes($href)){
					el.classList.add('active');
					el.parentElement.parentElement.classList.add('active');
					el.parentElement.parentElement.firstChild.classList.add('navbar-link-open');
					el.parentElement.classList.add('is-active');
				}
				el.addEventListener('click', (e) => {
					let clicked = e.target;
					$navbar_subitems.forEach((ea)=>{
						if(ea!==clicked){
							ea.classList.remove('active');
						}

					})
					el.classList.add('active');
					if(width<=1024){

	
					// close menu dropdown
					$navbarBurgers.forEach( el => {
									
						// Get the target from the "data-target" attribute
						const target = el.dataset.target;
						const $target = Array.prototype.slice.call(document.querySelectorAll(target), 0);
						const expanded = el.getAttribute('aria-expanded') === "false" ? true : false;
						el.setAttribute('aria-expanded', expanded);  
						// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
						el.classList.toggle('is-active');
						if($aside){
							$aside.classList.toggle('is-active');
						}
						$target.forEach(t=>t.classList.toggle('is-active'));  
						});

					}
				})
			})
		}
		//on click open drop down
		const $outerSideDropdowns=Array.prototype.slice.call($sidenav.querySelectorAll('.has-dropdown:not(.submenu)'), 0);
		if ($outerSideDropdowns.length > 0) {
			$outerSideDropdowns.forEach(el=>{
				const $dropdown_link=el.querySelector('.navbar-link');
				const $dropdown_content=el.querySelector('.navbar-dropdown');
				$dropdown_link.addEventListener('click', () => {
					event.preventDefault();
					$dropdown_link.classList.toggle('navbar-link-open');
					const expanded = el.getAttribute('aria-expanded') === "true" ? false : true;
					el.setAttribute('aria-expanded', expanded);  
					$dropdown_content.classList.toggle('is-active');
					$dropdown_content.style.height=$dropdown_content.scrollHeight + "px";
					window.location.href=$dropdown_link.href;
				})
			})
		}
	
	}

});