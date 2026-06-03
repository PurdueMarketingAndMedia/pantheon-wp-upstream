document.addEventListener( 'DOMContentLoaded', () => {
	const origin = window.location.origin;

	// Current-page detection (is-active / aria-current) and the associated
	// auto-expansion of ancestor sections are handled server-side in render.php
	// so the state is correct on first paint and without JS. This file covers
	// the interactive bits: external-link markup, click-to-toggle, and filter.

	// ── External link detection ───────────────────────────────────────────────
	// Inject ↗ icon on any sidebar link whose hostname differs from this site.
	document.querySelectorAll( '.scn-nav__link' ).forEach( ( link ) => {
		const href = link.getAttribute( 'href' ) || '';
		if ( ! href || href.startsWith( '#' ) || href.startsWith( 'mailto:' ) || href.startsWith( 'tel:' ) ) return;

		let isExternal = false;
		try {
			const url = new URL( href, origin );
			isExternal = url.origin !== origin;
		} catch ( e ) {}

		if ( isExternal ) {
			link.setAttribute( 'target', '_blank' );
			link.setAttribute( 'rel', 'noopener noreferrer' );
			link.classList.add( 'scn-nav__link--external' );

			// Wrap existing content in a span so the icon flows inline with
			// the text rather than becoming a separate flex child that gets
			// pushed to the far right of the link.
			const labelSpan = document.createElement( 'span' );
			labelSpan.className = 'scn-nav__label';
			while ( link.firstChild ) {
				labelSpan.appendChild( link.firstChild );
			}
			link.appendChild( labelSpan );

			const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
			svg.setAttribute( 'class', 'scn-nav__icon scn-nav__icon--external' );
			svg.setAttribute( 'viewBox', '0 0 24 24' );
			svg.setAttribute( 'fill', 'none' );
			svg.setAttribute( 'stroke', 'currentColor' );
			svg.setAttribute( 'stroke-width', '1.5' );
			svg.setAttribute( 'stroke-linecap', 'round' );
			svg.setAttribute( 'stroke-linejoin', 'round' );
			svg.setAttribute( 'aria-hidden', 'true' );
			svg.setAttribute( 'focusable', 'false' );
			svg.innerHTML = '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>';

			// Screen-reader-only cue that this link opens in a new tab.
			const srText = document.createElement( 'span' );
			srText.className = 'screen-reader-text';
			srText.textContent = ' (opens in a new tab)';

			// Glue the final word and the icon into one nowrap unit so the arrow
			// can never wrap onto a line by itself when a long label wraps.
			const tail = document.createElement( 'span' );
			tail.className = 'scn-nav__label-end';
			const lastText = labelSpan.lastChild;
			if ( lastText && lastText.nodeType === Node.TEXT_NODE ) {
				const text = lastText.textContent.replace( /\s+$/, '' );
				const sp = text.lastIndexOf( ' ' );
				if ( sp >= 0 ) {
					lastText.textContent = text.slice( 0, sp + 1 );
					tail.textContent = text.slice( sp + 1 );
				} else {
					lastText.textContent = '';
					tail.textContent = text;
				}
			}
			tail.appendChild( srText );
			tail.appendChild( svg );
			labelSpan.appendChild( tail );
		}
	} );

	// ── L1 expand / collapse ──────────────────────────────────────────────────
	document.querySelectorAll( '.scn-nav__trigger--l1' ).forEach( ( trigger ) => {
		trigger.addEventListener( 'click', () => {
			const isExpanded = trigger.getAttribute( 'aria-expanded' ) === 'true';
			const children = document.getElementById( trigger.getAttribute( 'aria-controls' ) );
			trigger.setAttribute( 'aria-expanded', String( ! isExpanded ) );
			if ( children ) children.hidden = isExpanded;
			trigger.closest( '.scn-nav__item--l1' ).classList.toggle( 'is-open', ! isExpanded );
		} );
	} );

	// ── L2 expand / collapse ──────────────────────────────────────────────────
	document.querySelectorAll( '.scn-nav__trigger--l2' ).forEach( ( trigger ) => {
		trigger.addEventListener( 'click', () => {
			const isExpanded = trigger.getAttribute( 'aria-expanded' ) === 'true';
			const children = document.getElementById( trigger.getAttribute( 'aria-controls' ) );
			trigger.setAttribute( 'aria-expanded', String( ! isExpanded ) );
			if ( children ) children.hidden = isExpanded;
			trigger.closest( '.scn-nav__item--l2' ).classList.toggle( 'is-open', ! isExpanded );
		} );
	} );

	// ── Filter ───────────────────────────────────────────────────────────────
	document.querySelectorAll( '.scn-block' ).forEach( ( block ) => {
		const input = block.querySelector( '.scn-filter__input' );
		if ( ! input ) return;

		const status = block.querySelector( '.scn-filter__status' );
		const items = block.querySelectorAll( '.scn-nav__item' );
		// Count only leaves (the links/actions users care about) for result-count announcements.
		const leafItems = Array.from( items ).filter( ( item ) => {
			return ! item.querySelector( ':scope > .scn-nav__children' );
		} );

		// Snapshot each item's text + its original expanded state so we can restore
		// everything when the filter is cleared.
		const snapshots = new Map();
		items.forEach( ( item ) => {
			const label = item.querySelector( ':scope > .scn-nav__link, :scope > .scn-nav__trigger' );
			const text = ( label?.textContent || '' ).trim().toLowerCase();
			const childrenList = item.querySelector( ':scope > .scn-nav__children' );
			const trigger = item.querySelector( ':scope > .scn-nav__trigger' );
			snapshots.set( item, {
				text,
				wasOpen: item.classList.contains( 'is-open' ),
				childrenHidden: childrenList ? childrenList.hidden : null,
				triggerExpanded: trigger ? trigger.getAttribute( 'aria-expanded' ) : null,
			} );
		} );

		// Debounce status updates so we don't announce on every keystroke.
		let statusTimer = null;
		const announce = ( msg ) => {
			if ( ! status ) return;
			clearTimeout( statusTimer );
			statusTimer = setTimeout( () => {
				// Clear first to force re-announcement even if the text is the same.
				status.textContent = '';
				requestAnimationFrame( () => { status.textContent = msg; } );
			}, 300 );
		};

		const MIN_QUERY_LENGTH = 3;

		const applyFilter = ( query ) => {
			const q = query.trim().toLowerCase();

			if ( q.length < MIN_QUERY_LENGTH ) {
				// Too-short queries are treated the same as empty so the
				// menu fully reverts until the user types the threshold.
				items.forEach( ( item ) => {
					const snap = snapshots.get( item );
					item.classList.remove( 'is-hidden' );
					item.classList.toggle( 'is-open', snap.wasOpen );
					const childrenList = item.querySelector( ':scope > .scn-nav__children' );
					if ( childrenList && snap.childrenHidden !== null ) {
						childrenList.hidden = snap.childrenHidden;
					}
					const trigger = item.querySelector( ':scope > .scn-nav__trigger' );
					if ( trigger && snap.triggerExpanded !== null ) {
						trigger.setAttribute( 'aria-expanded', snap.triggerExpanded );
					}
				} );
				block.classList.remove( 'is-filter-empty' );
				if ( status ) status.textContent = '';
				return;
			}

			// Match if the item's own text contains q.
			const matches = new Set();
			items.forEach( ( item ) => {
				const snap = snapshots.get( item );
				if ( snap.text.includes( q ) ) matches.add( item );
			} );

			// An expandable container (L1/L2 with a children list) isn't
			// actionable on its own — its trigger only toggles children.
			// Drop it from matches if nothing inside matches, so we don't
			// surface an empty expanded panel. Deepest-first so pruning a
			// nested container can cascade into emptying its parent.
			const itemDepth = ( item ) => {
				let depth = 0;
				let ancestor = item.parentElement?.closest( '.scn-nav__item' );
				while ( ancestor ) {
					depth++;
					ancestor = ancestor.parentElement?.closest( '.scn-nav__item' );
				}
				return depth;
			};
			const containers = Array.from( items )
				.filter( ( item ) => !! item.querySelector( ':scope > .scn-nav__children' ) )
				.sort( ( a, b ) => itemDepth( b ) - itemDepth( a ) );
			containers.forEach( ( container ) => {
				const childList = container.querySelector( ':scope > .scn-nav__children' );
				const hasMatchingDescendant = Array.from(
					childList.querySelectorAll( '.scn-nav__item' )
				).some( ( descendant ) => matches.has( descendant ) );
				if ( ! hasMatchingDescendant ) matches.delete( container );
			} );

			// Any ancestor of a match also matches so parents stay visible.
			matches.forEach( ( item ) => {
				let ancestor = item.parentElement?.closest( '.scn-nav__item' );
				while ( ancestor ) {
					matches.add( ancestor );
					ancestor = ancestor.parentElement?.closest( '.scn-nav__item' );
				}
			} );

			items.forEach( ( item ) => {
				const isMatch = matches.has( item );
				item.classList.toggle( 'is-hidden', ! isMatch );

				if ( isMatch ) {
					const childrenList = item.querySelector( ':scope > .scn-nav__children' );
					const trigger = item.querySelector( ':scope > .scn-nav__trigger' );
					if ( childrenList ) childrenList.hidden = false;
					if ( trigger ) trigger.setAttribute( 'aria-expanded', 'true' );
					item.classList.add( 'is-open' );
				}
			} );

			const leafMatches = leafItems.filter( ( item ) => matches.has( item ) ).length;
			block.classList.toggle( 'is-filter-empty', leafMatches === 0 );

			if ( leafMatches === 0 ) {
				announce( 'No matches found.' );
			} else if ( leafMatches === 1 ) {
				announce( '1 result.' );
			} else {
				announce( `${ leafMatches } results.` );
			}
		};

		input.addEventListener( 'input', ( e ) => applyFilter( e.target.value ) );
		input.addEventListener( 'keydown', ( e ) => {
			if ( e.key === 'Escape' ) {
				input.value = '';
				applyFilter( '' );
			}
		} );
	} );
} );