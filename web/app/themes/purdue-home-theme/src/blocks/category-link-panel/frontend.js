document.addEventListener( 'DOMContentLoaded', () => {
	const submenuItems = document.querySelectorAll( '.category-link-panel .has-submenu' );

	submenuItems.forEach( ( item ) => {
		const trigger = item.querySelector( '.category-link-panel__submenu-trigger' );
		const submenu = item.querySelector( '.category-link-panel__submenu' );
		if ( ! trigger || ! submenu ) return;

		// Focusable links inside this submenu, in DOM order. Read live each time
		// so we never hold a stale list.
		const getLinks = () => Array.from( submenu.querySelectorAll( 'a[href]' ) );

		trigger.addEventListener( 'click', () => toggleSubmenu( trigger ) );

		// Keyboard on the trigger: toggle with Enter/Space, open + dive into the
		// submenu with the arrow keys.
		trigger.addEventListener( 'keydown', ( e ) => {
			switch ( e.key ) {
				case 'Enter':
				case ' ':
					e.preventDefault();
					toggleSubmenu( trigger );
					break;
				case 'ArrowDown': {
					e.preventDefault();
					openSubmenu( trigger );
					const links = getLinks();
					if ( links[ 0 ] ) links[ 0 ].focus();
					break;
				}
				case 'ArrowUp': {
					e.preventDefault();
					openSubmenu( trigger );
					const links = getLinks();
					if ( links.length ) links[ links.length - 1 ].focus();
					break;
				}
			}
		} );

		// Roving arrow-key navigation between the submenu links.
		submenu.addEventListener( 'keydown', ( e ) => {
			const links = getLinks();
			const idx = links.indexOf( document.activeElement );
			if ( idx === -1 ) return;

			switch ( e.key ) {
				case 'ArrowDown':
					e.preventDefault();
					( links[ idx + 1 ] || links[ 0 ] ).focus(); // wrap to first
					break;
				case 'ArrowUp':
					e.preventDefault();
					// From the first link, step back up to the trigger; otherwise
					// move to the previous link.
					( idx === 0 ? trigger : links[ idx - 1 ] ).focus();
					break;
				case 'Home':
					e.preventDefault();
					links[ 0 ].focus();
					break;
				case 'End':
					e.preventDefault();
					links[ links.length - 1 ].focus();
					break;
			}
		} );

		// Close the dropdown once focus leaves the item entirely (Tab/Shift+Tab
		// out, or focus moving anywhere else). The rAF defers the check until the
		// browser has settled focus on its new target, so moving between the
		// trigger and its own links doesn't close the menu.
		item.addEventListener( 'focusout', () => {
			requestAnimationFrame( () => {
				if ( ! item.contains( document.activeElement ) ) {
					closeSubmenu( trigger );
				}
			} );
		} );
	} );

	// Close open submenus on Escape, return focus to the trigger.
	document.addEventListener( 'keydown', ( e ) => {
		if ( e.key !== 'Escape' ) return;

		document.querySelectorAll(
			'.category-link-panel .has-submenu .category-link-panel__submenu-trigger[aria-expanded="true"]'
		).forEach( ( button ) => {
			closeSubmenu( button );
			button.focus();
		} );
	} );

	// Close open submenus when clicking outside (covers clicks on non-focusable
	// areas that wouldn't fire a focusout).
	document.addEventListener( 'click', ( e ) => {
		document.querySelectorAll( '.category-link-panel .has-submenu.is-open' ).forEach( ( item ) => {
			if ( ! item.contains( e.target ) ) {
				closeSubmenu( item.querySelector( '.category-link-panel__submenu-trigger' ) );
			}
		} );
	} );

	function toggleSubmenu( button ) {
		const isExpanded = button.getAttribute( 'aria-expanded' ) === 'true';
		isExpanded ? closeSubmenu( button ) : openSubmenu( button );
	}

	function openSubmenu( button ) {
		button.setAttribute( 'aria-expanded', 'true' );
		button.closest( 'li' ).classList.add( 'is-open' );
		const submenu = button.nextElementSibling;
		if ( submenu ) submenu.removeAttribute( 'hidden' );
	}

	function closeSubmenu( button ) {
		if ( ! button ) return;
		button.setAttribute( 'aria-expanded', 'false' );
		button.closest( 'li' ).classList.remove( 'is-open' );
		const submenu = button.nextElementSibling;
		if ( submenu ) submenu.setAttribute( 'hidden', '' );
	}
} );
