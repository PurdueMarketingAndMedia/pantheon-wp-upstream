document.addEventListener("DOMContentLoaded", () => {
	const postGrids = document.querySelectorAll(".purdue-home-post-grid");
	postGrids.forEach((grid) => {
		const form = grid.querySelector("form");   // or grid.closest("form")
		if (form) {
			form.addEventListener('change', () => {
				const filterButton = form.querySelector('.purdue-home-post-grid__filter-button');
				if (filterButton) filterButton.classList.remove('hide');
			});
			const filters = form.querySelectorAll("fieldset > button");
			filters.forEach((x) => {
				x.addEventListener("click", () => toggleAccordion(x));
			});
			const order = form.querySelectorAll('.order-field');
			order.forEach((x) => {
				x.addEventListener('click', (e) => {
					form.submit();
				});
			})

			// Selected-filter chips: clear the matching field, then submit.
			const chips = form.querySelectorAll('.filter-elected-term');
			chips.forEach((chip) => {
				chip.addEventListener('click', (e) => {
					e.preventDefault();

					const category = chip.dataset.category;
					if (!category) return; // e.g. the static "Purdue News" chip

					const value = chip.value;
					const safeValue = (window.CSS && CSS.escape) ? CSS.escape(value) : value;

					// Checkbox group: name="<category>[]" (category / taxonomy / custom_post_type)
					const checkbox = form.querySelector(
						`input[type="checkbox"][name="${category}[]"][value="${safeValue}"]`
					);

					if (checkbox) {
						checkbox.checked = false;
					} else {
						const field = form.querySelector(`[name="${category}"]`);
						if (!field) return; // nothing to clear -> don't reload
						field.value = '';
					}

					form.submit();
				});
			});

			// Clear-button next to the search input: empty the field, then submit.
			const clearButton = form.querySelector('.clear-button');
			if (clearButton) {
				clearButton.addEventListener('click', () => {
					const searchField = form.querySelector('.search-field');
					if (searchField) searchField.value = '';
					form.submit();
				});
			}
		}
		initLoadMore(grid);
		initAutocomplete(grid);
	});
});


const autoComplete = async (
	resultsContainer,
	searchInput,
	message,
	queryArg,
	args,
	grid,
	load
) => {


	const excludeCats = queryArg.excludeCat;
	let queryArgs = JSON.parse(JSON.stringify(args));
	queryArgs.excludeCat = excludeCats;
	const response = await fetch(
		siteHomeURL + "/wp-json/purdue-home/v1/post-select/",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(queryArgs),
		}
	);

	const result = await response
		.json()
		.catch((error) => console.error("Error parsing JSON:", error));
	const total = result.find(item => item.total !== undefined)?.total;

	resultsContainer.innerHTML = "";
	const searchLive = document.querySelector('.search-live');

	if (total > 0) {

		const removeTotal = (array, total) => {
			return array.filter(item => item.total !== total);
		};

		searchLive.innerText = `${total} suggestions found`

		const updatedResult = removeTotal(result, total);

		Object.entries(updatedResult).forEach(([key, value]) => {

			const li = document.createElement("li");
			li.id = 'aria-' + key;
			li.textContent = value.title;
			li.setAttribute("tabindex", "-1");
			resultsContainer.appendChild(li);

			function updateSearch() {
				searchInput.setAttribute("value", li.innerHTML);
				searchInput.value = li.textContent;
				resultsContainer.classList.add("hide");
			}

			li.addEventListener("click", (e) => {
				e.preventDefault();
				updateSearch();
			})
			li.addEventListener("keypress", (event) => {
				if (event.key === "Enter") {
					updateSearch();
				}
			})
		});

	} else {
		const li = document.createElement("li");
		searchLive.innerText = `No results found.`;
		li.innerHTML = "No results found.";
		li.classList.add('no-results')
		resultsContainer.appendChild(li);
	}
}

// Search autocomplete: as the visitor types, fetch title suggestions from
// purdue_get_posts (rest.php) using the grid's data-args (so suggestions respect
// the block's filters), render them in an accessible listbox under the field, and
// trap keyboard focus inside the search box (small built-in trap) while the
// list is open. Arrow keys move real focus between the input and the suggestions.
// Reuses autoComplete() for the fetch + list rendering; enabled only when the
// block's addAutoComplete attribute is on.
const initAutocomplete = (grid) => {
	const searchField = grid.querySelector(".search-field");
	if (!searchField) return;

	const gridData = grid.querySelector(".purdue-home-cta-grid__grid");
	let baseArgs = {};
	try {
		baseArgs = JSON.parse((gridData && gridData.dataset.args) || "{}") || {};
	} catch (e) {
		baseArgs = {};
	}

	// Only run when the block opted in.
	if (!baseArgs.addAutoComplete) return;

	const searchForm = grid.querySelector(".search-form");
	if (!searchForm) return;

	// Build (or reuse) the dropdown + screen-reader live region.
	let resultsContainer = searchForm.querySelector("#autocomplete-results");
	if (!resultsContainer) {
		resultsContainer = document.createElement("ul");
		resultsContainer.id = "autocomplete-results";
		resultsContainer.className = "autocomplete-results hide";
		resultsContainer.setAttribute("role", "listbox");
		searchForm.appendChild(resultsContainer);
	}

	let searchLive = searchForm.querySelector("span.search-live");
	if (!searchLive) {
		searchLive = document.createElement("span");
		searchLive.className = "search-live is-sr-only";
		searchLive.setAttribute("aria-live", "polite");
		searchLive.setAttribute("role", "status");
		searchForm.appendChild(searchLive);
	}

	// Minimal, dependency-free focus trap. While active, Tab/Shift+Tab cycle
	// through the focusable elements inside the search box instead of leaving it.
	// Built lazily and only bound while the dropdown is open. (Escape is handled by
	// the keydown logic below, which closes the list and frees focus.)
	let trap = null;
	const ensureTrap = () => {
		if (trap) return trap;

		const focusableSelector =
			'a[href], button:not([disabled]), input:not([disabled]), ' +
			'select:not([disabled]), textarea:not([disabled]), ' +
			'[tabindex]:not([tabindex="-1"])';

		const focusable = () =>
			Array.from(searchForm.querySelectorAll(focusableSelector)).filter(
				(el) =>
					el.offsetWidth > 0 ||
					el.offsetHeight > 0 ||
					el === document.activeElement
			);

		const onKeydown = (event) => {
			if (event.key !== "Tab") return;
			const items = focusable();
			if (!items.length) return;
			const first = items[0];
			const last = items[items.length - 1];
			const active = document.activeElement;
			if (event.shiftKey) {
				if (active === first || !searchForm.contains(active)) {
					event.preventDefault();
					last.focus();
				}
			} else if (active === last || !searchForm.contains(active)) {
				event.preventDefault();
				first.focus();
			}
		};

		trap = {
			enable() {
				// Idempotent: openList runs on every keystroke, so avoid stacking.
				searchForm.removeEventListener("keydown", onKeydown);
				searchForm.addEventListener("keydown", onKeydown);
			},
			disable() {
				searchForm.removeEventListener("keydown", onKeydown);
			},
		};
		return trap;
	};

	// The selectable suggestions (excludes the "no results" placeholder).
	const suggestions = () =>
		Array.from(resultsContainer.querySelectorAll("li")).filter(
			(li) => !li.classList.contains("no-results")
		);

	const openList = () => {
		resultsContainer.classList.remove("hide");
		searchField.setAttribute("aria-expanded", "true");
		ensureTrap().enable();
	};

	const closeList = () => {
		resultsContainer.innerHTML = "";
		resultsContainer.classList.add("hide");
		searchField.setAttribute("aria-expanded", "false");
		if (trap) trap.disable();
	};

	const focusItem = (idx) => {
		const items = suggestions();
		if (!items.length) return;
		const i = ((idx % items.length) + items.length) % items.length;
		items.forEach((el) => el.classList.remove("active"));
		items[i].classList.add("active");
		items[i].focus();
	};

	const selectItem = (li) => {
		if (!li) return;
		searchField.value = li.textContent;
		closeList();
		searchField.focus();
		const form = searchField.closest('form');
		form.submit();
	};

	let debounce;
	searchField.addEventListener("input", () => {
		const term = searchField.value.trim();
		window.clearTimeout(debounce);

		if (term.length < 2) {
			closeList();
			searchLive.innerText = "";
			return;
		}

		debounce = window.setTimeout(() => {
			// Replay the grid's query with the typed term in autocomplete mode.
			const args = Object.assign({}, baseArgs, {
				search: term,
				autocomplete: true,
				paged: 1,
				posts_per_page: 16,
			});

			openList();

			autoComplete(resultsContainer, searchField, null, baseArgs, args, grid).then(
				() => {
					// Make each suggestion a focusable listbox option: tabindex 0 so
					// it can receive real focus AND so the focus trap counts it as
					// tabbable (otherwise the trap would yank focus back to the input).
					suggestions().forEach((li, i) => {
						li.setAttribute("role", "option");
						li.setAttribute("tabindex", "0");
						if (!li.id) {
							li.id = "autocomplete-option-" + i;
						}
					});
				}
			);
		}, 200);
	});

	// Arrow-key navigation moves real focus between the input and the suggestions.
	// Bound to the form so it fires whether focus is on the input or on an option.
	searchForm.addEventListener("keydown", (event) => {
		if (resultsContainer.classList.contains("hide")) return;

		const items = suggestions();
		if (!items.length) return;

		const focusedIndex = items.indexOf(document.activeElement);
		const onField = document.activeElement === searchField;

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				focusItem(onField ? 0 : focusedIndex + 1);
				break;
			case "ArrowUp":
				event.preventDefault();
				if (onField) {
					focusItem(items.length - 1);
				} else if (focusedIndex <= 0) {
					items.forEach((el) => el.classList.remove("active"));
					searchField.focus();
				} else {
					focusItem(focusedIndex - 1);
				}
				break;
			case "Enter":
				// On a focused suggestion, select it; otherwise let the form submit
				// and run the normal search.
				if (focusedIndex > -1) {
					event.preventDefault();
					selectItem(items[focusedIndex]);
				}
				break;
			case "Escape":
				event.preventDefault();
				closeList();
				searchField.focus();
				break;
		}
	});

	// Selecting a suggestion by mouse closes the list and returns focus to input.
	resultsContainer.addEventListener("click", (event) => {
		const li = event.target.closest("li");
		if (li && !li.classList.contains("no-results")) {
			selectItem(li);
		}
	});

	// Dismiss the suggestions when a click lands outside the search box.
	document.addEventListener("click", (event) => {
		if (!searchForm.contains(event.target)) {
			closeList();
		}
	});

	// Wire the little "x" clear button to reset the field + suggestions.
	const clearButton = searchForm.querySelector(".clear-button");
	if (clearButton) {
		clearButton.addEventListener("click", () => {
			searchField.value = "";
			closeList();
			searchField.focus();
		});
	}
};

// Infinite-scroll "Load More": replays the page-1 query (read from the grid's
// data-args) for the next page via purdue_get_posts (rest.php), then appends the
// returned cards. Only the `paged` value changes between requests, so each click
// advances the WP_Query offset by one page.
const initLoadMore = (grid) => {
	const loadMoreBtn = grid.querySelector(".load");
	if (!loadMoreBtn) return;

	const gridData = grid.querySelector(".purdue-home-cta-grid__grid");
	const cardsContainer = grid.querySelector(
		".purdue-home-cta-grid__cards .columns"
	);
	if (!gridData || !cardsContainer) return;

	let baseArgs;
	try {
		baseArgs = JSON.parse(gridData.dataset.args || "{}");
	} catch (e) {
		return;
	}
	if (!baseArgs || typeof baseArgs !== "object") return;

	let currentPaged = parseInt(baseArgs.paged, 10) || 1;
	let isFetching = false;

	const endpoint =
		(typeof siteHomeURL !== "undefined" ? siteHomeURL : "") +
		"/wp-json/purdue-home/v1/post-select/";

	const postTotal = grid.querySelector(".post-total");

	loadMoreBtn.addEventListener("click", async (e) => {
		e.preventDefault();
		e.stopImmediatePropagation();
		if (isFetching) return;
		isFetching = true;
		loadMoreBtn.classList.add("is-loading");

		const nextPaged = currentPaged + 1;
		const body = Object.assign({}, baseArgs, {
			paged: nextPaged,
			autocomplete: false,
		});

		try {
			const response = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const result = await response.json();
			const html = result && result.html ? result.html : "";

			if (html) {
				cardsContainer.insertAdjacentHTML("beforeend", html);
				currentPaged = nextPaged;
			}

			if (postTotal && result && typeof result.total !== "undefined") {
				postTotal.innerHTML = result.total;
			}

			const totalPages = result ? parseInt(result.pages, 10) : 0;
			if (!html || (totalPages && currentPaged >= totalPages)) {
				loadMoreBtn.classList.add("hide");
			}
		} catch (err) {
			console.error("Load more failed:", err);
		} finally {
			isFetching = false;
			loadMoreBtn.classList.remove("is-loading");
		}
	});
};

const toggleAccordion = (header) => {
	const content = header.nextElementSibling;
	header.classList.toggle("is-open");
	if (header.getAttribute("aria-expanded") === "false") {
		header.setAttribute("aria-expanded", "true");
	} else {
		header.setAttribute("aria-expanded", "false");
	}
	if (content) {
		content.classList.toggle("hide");
	}
};