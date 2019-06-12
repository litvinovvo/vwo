// https://github.com/lazd/iNoBounce/
window.bodyScrollLock = new (function() {
	const isiOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
	let startY = -1;

	// Store enabled status
	let enabled = false;
	
	let hasPassiveEvents = false;
	if (typeof window !== 'undefined') {
	  const passiveTestOptions = {
	    get passive() {
	      hasPassiveEvents = true;
	      return undefined;
	    }
	  };
	  window.addEventListener('testPassive', null, passiveTestOptions);
	  window.removeEventListener('testPassive', null, passiveTestOptions);
	}
	
	function preventDefault(event) {
	  const e = rawEvent || window.event;
	  if (e.touches.length > 1) return true;
	  if (e.preventDefault) e.preventDefault();

	  return false;
	};

	function handleTouchmove(event) {
		let el = event.target;
		const isTargetElementTotallyScrolled = el.scrollHeight - el.scrollTop <= el.clientHeight;
		const clientY = event.targetTouches[0].clientY - startY;

		  if (el.scrollTop === 0 && clientY > 0) {
			return preventDefault(event);
		  }
		  if (isTargetElementTotallyScrolled && clientY < 0) {
			return preventDefault(event);
		  }
		  event.stopPropagation();
		  return true;
	};

	this.enable = function() {
		if (enabled) { return; };

			// Listen to a couple key touch events
			//console.log('add event');
			const content = document.querySelector('.content');
			content.ontouchstart = event => {
				if (event.targetTouches.length === 1) {
				   startY = event.targetTouches[0].clientY;
				}
			};
			content.ontouchmove = event => {
				if (event.targetTouches.length === 1) {
				  handleTouchmove(event);
				}
			};
			document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);

		enabled = true;
	};

	this.disable = function() {
		if (!enabled) { return; };

			const content = document.querySelector('.content');
			content.ontouchstart = null;
			content.ontouchmove = null;
			document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);

		enabled = false;
	};

	this.isEnabled = function() {
		return enabled;
	};
});
