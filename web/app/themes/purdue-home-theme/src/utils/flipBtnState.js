export function flipBtnState(btn, forceState = null) {
	if (!btn) return;

	const icon = btn.querySelector('i');

	const isPlay = btn.classList.contains('cta-play');
	const isPause = btn.classList.contains('cta-pause');

	const shouldPause =
		forceState === null
			? isPlay
			: forceState === true;

	const aria = btn.getAttribute('aria-label');
	const toggle = btn.dataset.toggleLabel;

	if (forceState === null || (
		shouldPause && isPlay ||
		!shouldPause && isPause
	)) {
		btn.setAttribute('aria-label', toggle);
		btn.dataset.toggleLabel = aria;
	}

	if (shouldPause) {
		btn.classList.remove('cta-play');
		btn.classList.add('cta-pause');

		icon?.classList.add('fa-circle-pause', 'cta-pause-icon');
		icon?.classList.remove('fa-circle-play', 'cta-play-icon');
	} else {
		btn.classList.add('cta-play');
		btn.classList.remove('cta-pause');

		icon?.classList.add('fa-circle-play', 'cta-play-icon');
		icon?.classList.remove('fa-circle-pause', 'cta-pause-icon');
	}
}
