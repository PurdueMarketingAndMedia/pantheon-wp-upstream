document.addEventListener( 'DOMContentLoaded', () => {
	const triggers = document.querySelectorAll(
		'.category-link-panel .has-submenu .category-link-panel__submenu-trigger'
	);

	triggers.forEach( ( button ) => {
		button.addEventListener( 'click', () => {
			toggleSubmenu( button );
		} );

		button.addEventListener( 'keydown', ( e ) => {
			if ( e.key === 'Enter' || e.key === ' ' ) {
				e.preventDefault();
				toggleSubmenu( button );
			}
		} );
	} );

	// Close open submenus on Escape, return focus to the trigger
	document.addEventListener( 'keydown', ( e ) => {
		if ( e.key !== 'Escape' ) return;

		document.querySelectorAll(
			'.category-link-panel .has-submenu .category-link-panel__submenu-trigger[aria-expanded="true"]'
		).forEach( ( button ) => {
			closeSubmenu( button );
			button.focus();
		} );
	} );

	// Close open submenus when clicking outside
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
