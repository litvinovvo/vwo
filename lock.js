// https://github.com/lazd/iNoBounce/
window.bodyScrollLock = new (function() {
	const isiOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
	let startY = -1;
	let scrollableElement = false;

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
	
	function preventDefault(rawEvent) {
	  const e = rawEvent || window.event;
	  if (e.touches.length > 1) return true;
	  if (e.preventDefault) e.preventDefault();

	  return false;
	};

	function handleTouchmove(event) {
		const isTargetElementTotallyScrolled = scrollableElement.scrollHeight - scrollableElement.scrollTop <= scrollableElement.clientHeight;
		const clientY = event.targetTouches[0].clientY - startY;

		  if (scrollableElement.scrollTop === 0 && clientY > 0) {
			return preventDefault(event);
		  }
		  if (isTargetElementTotallyScrolled && clientY < 0) {
			return preventDefault(event);
		  }
		  event.stopPropagation();
		  return true;
	};

	this.enable = function(element) {
		scrollableElement = element;
		if (enabled) { return; };

			// Listen to a couple key touch events
			//console.log('add event');
			//const content = document.querySelector('.content');
			scrollableElement.ontouchstart = event => {
				if (event.targetTouches.length === 1) {
				   startY = event.targetTouches[0].clientY;
				}
			};
			scrollableElement.ontouchmove = event => {
				if (event.targetTouches.length === 1) {
				  handleTouchmove(event);
				}
			};
			document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);

		enabled = true;
	};

	this.disable = function() {
		if (!enabled) { return; };

			//const content = document.querySelector('.content');
			scrollableElement.ontouchstart = null;
			scrollableElement.ontouchmove = null;
			document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);

		enabled = false;
	};

	this.isEnabled = function() {
		return enabled;
	};
});
