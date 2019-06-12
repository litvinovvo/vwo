// https://github.com/lazd/iNoBounce/
window.bodyScrollLock = new (function() {
	const isiOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
	// Stores the Y position where the touch started
	let startY = -1;

	// Store enabled status
	let enabled = false;
	
	const preventDefault = rawEvent => {
	  const e = rawEvent || window.event;

	  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom)
	  if (e.touches.length > 1) return true;

	  if (e.preventDefault) e.preventDefault();

	  return false;
	};

	const handleTouchmove = function(evt) {
		// Get the element that was scrolled upon
		if (evt.targetTouches.length !== 1) {
		  return;
		}
		
		let el = evt.target;
		// Allow zooming
// 		const zoom = window.innerWidth / window.document.documentElement.clientWidth;
// 		if (evt.touches.length > 1 || zoom !== 1) {
// 			return;
// 		}
		//console.log('handle move', el);

		// Check all parent elements for scrollability
		//while (el !== document.body && el !== document) {
			// Get some style properties
			
// 			const style = window.getComputedStyle(el);

// 			if (!style) {
// 				// If we've encountered an element we can't compute the style for, get out
// 				console.log('no style');
// 				break;
// 			}

			// Ignore range input element
// 			if (el.nodeName === 'INPUT' && el.getAttribute('type') === 'range') {
// 				console.log('input');
// 				return;
// 			}

// 			const scrolling = style.getPropertyValue('-webkit-overflow-scrolling');
// 			const overflowY = style.getPropertyValue('overflow-y');
// 			const height = parseInt(style.getPropertyValue('height'), 10);

// 			// Determine if the element should scroll
// 			const isScrollable = scrolling === 'touch' && (overflowY === 'auto' || overflowY === 'scroll');
// 			const canScroll = el.scrollHeight > el.offsetHeight;
			
// 			console.log('scrollable', el, isScrollable, canScroll);

			//if (isScrollable && canScroll) {
				const isTargetElementTotallyScrolled = el.scrollHeight - el.scrollTop <= el.clientHeight;
				const clientY = event.targetTouches[0].clientY - startY;


				  if (el.scrollTop === 0 && clientY > 0) {
				    // element is at the top of its scroll
				    return preventDefault(evt);
				  }

				  if (isTargetElementTotallyScrolled && clientY < 0) {
				    // element is at the top of its scroll
				    return preventDefault(evt);
				  }

				  evt.stopPropagation();
				  return true;
				
			//}

			// Test the next parent
			//el = el.parentNode;
			//console.log('next', el);
		//}

		// Stop the bouncing -- no parents are scrollable
		//console.log('no scrollable parent');
		//evt.preventDefault();
		//return false;
	};

	const handleTouchstart = function(evt) {
		if (evt.targetTouches.length === 1) {
		  // detect single touch
		  // initialClientY = event.targetTouches[0].clientY;
		  startY = evt.targetTouches[0].clientY;
		  //console.log('touch start', startY);
		}
		
		//startY = evt.touches ? evt.touches[0].screenY : evt.screenY;
		//console.log('touch start', startY);
	};

	this.enable = function() {
		if (enabled) { return; };
		if (isiOS) {
			// Listen to a couple key touch events
			//console.log('add event');
			const content = document.querySelector('.content');
			content.addEventListener('touchstart', handleTouchstart, { passive : false });
			content.addEventListener('touchmove', handleTouchmove, { passive : false });
		} else {
			document.body.style.overflow = 'hidden';
		}

		enabled = true;
	};

	this.disable = function() {
		if (!enabled) { return; };
		if (isiOS) {
			// Stop listening
			// console.log('remove events');
			const content = document.querySelector('.content');
			content.removeEventListener('touchstart', handleTouchstart, false);
			content.removeEventListener('touchmove', handleTouchmove, false);
		} else {
			document.body.style.overflow = '';
		}
		
		enabled = false;
	};

	this.isEnabled = function() {
		return enabled;
	};
});
