// https://github.com/lazd/iNoBounce/
window.bodyScrollLock = new (function() {
	const isiOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
	let startY = -1;

	// Store enabled status
	let enabled = false;
	const preventDefault = rawEvent => {
	  const e = rawEvent || window.event;
	  if (e.touches.length > 1) return true;
	  if (e.preventDefault) e.preventDefault();

	  return false;
	};

	const handleTouchmove = function(evt) {
		if (evt.targetTouches.length !== 1) {
		  return;
		}
		
		let el = evt.target;
		const isTargetElementTotallyScrolled = el.scrollHeight - el.scrollTop <= el.clientHeight;
		const clientY = event.targetTouches[0].clientY - startY;

		  if (el.scrollTop === 0 && clientY > 0) {
		    evt.preventDefault();
		    return false;
		  }
		  if (isTargetElementTotallyScrolled && clientY < 0) {
		    evt.preventDefault();
		    return false;
		  }
		  evt.stopPropagation();
		  return true;
	};

	const handleTouchstart = function(evt) {
		if (evt.targetTouches.length !== 1) {
			return;
		}
		startY = evt.targetTouches[0].clientY;
	};

	this.enable = function() {
		if (enabled) { return; };
		if (isiOS) {
			// Listen to a couple key touch events
			//console.log('add event');
			const content = document.querySelector('.content');
			content.ontouchstart = event => handleTouchstart(event);
			content.ontouchmove = event => handleTouchmove(event);
			document.addEventListener('touchmove', event => event.preventDefault(), { passive: false });
		} else {
			document.body.style.overflow = 'hidden';
		}
		enabled = true;
	};

	this.disable = function() {
		if (!enabled) { return; };
		if (isiOS) {
			const content = document.querySelector('.content');
			content.ontouchstart = null;
			content.ontouchmove = null;
			document.removeEventListener('touchmove', event => event.preventDefault(), { passive: false });
		} else {
			document.body.style.overflow = '';
		}
		enabled = false;
	};

	this.isEnabled = function() {
		return enabled;
	};
});
