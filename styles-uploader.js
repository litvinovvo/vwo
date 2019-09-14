/* eslint-disable */
(function(g){var c=function(c,e,k){var d=g.document,b=d.createElement("link"),a;e?a=e:(a=(d.body||d.getElementsByTagName("head")[0]).childNodes,a=a[a.length-1]);var h=d.styleSheets;b.rel="stylesheet";b.href=c;b.media="only x";a.parentNode.insertBefore(b,e?a:a.nextSibling);var f=function(a){for(var d=b.href,c=h.length;c--;)if(h[c].href===d)return a();setTimeout(function(){f(a)})};b.onloadcssdefined=f;f(function(){b.media=k||"all"});return b};"undefined"!==typeof module?module.exports=c:g.loadCSS=c})("undefined"!==
typeof global?global:this);
function onloadCSS(a,b){a.onload=function(){a.onload=null;b&&b.call(a)};if("isApplicationInstalled"in navigator&&"onloadcssdefined"in a)a.onloadcssdefined(b)};
/* eslint-enable */

/* eslint-disable no-var, prefer-const, object-shorthand, prefer-template,
prefer-arrow-callback, prefer-destructuring, no-param-reassign, comma-dangle */
(function() {
	'use strict';

	var before = document.getElementById('lazyStylesPlaceholder');
	var i,
		length,
		cssCount,
		div,
		href;
	var loaded = 0;
	var wrapper = document.createElement('div');
	var divs = [];
	var CustomEvent = function(event, params) {
		var evt,
			origPrevent;

		params = params || {
			bubbles: false,
			cancelable: false,
			detail: undefined
		};

		evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		origPrevent = evt.preventDefault;
		evt.preventDefault = function() {
			origPrevent.call(this);

			try {
				Object.defineProperty(this, 'defaultPrevented', {
					get: function() {
						return true;
					}
				});
			} catch (e) {
				this.defaultPrevented = true;
			}
		};

		return evt;
	};

	CustomEvent.prototype = window.Event.prototype;

	if (typeof window.stylesheets !== 'undefined' && window.stylesheets.length) {
		cssCount = window.stylesheets.length;
		length = cssCount;

		for (i = 0; i < length; i++) {
			href = window.stylesheets[i];

			if (href.trim() && !/builder2\/fonts|googleapis\.com/.test(href)) {
				div = document.createElement('div');

				div.setAttribute('id', 'a' + window.stylesheets[i].match(/([^/]+)\.css$/)[1]);
				divs.push(div);
				wrapper.appendChild(div);
			} else {
				cssCount--;
			}

			window.loadCSS(window.stylesheets[i], before);
			/* jshint loopfunc:true */
			before.previousSibling.addEventListener('error', function() {
				loaded++;
			});
			/* jshint loopfunc:false */
		}

		document.body.appendChild(wrapper);
		waiting();

		delete window.stylesheets;
	} else {
		cssLoaded();
	}

	function waiting() {
    setTimeout(cssLoaded, 300);
    return;
  
		var id = setInterval(function() {
			var j = 0;
			var divCount = divs.length;

			for (; j < divCount; j++) {
				if (divs[j] && divs[j].clientWidth === 0) {
					divs[j] = false;

					if (++loaded === cssCount) {
						clearInterval(id);
						wrapper.parentNode.removeChild(wrapper);
						setTimeout(cssLoaded, 300);
					}
				}
			}
		}, 300);
	}

	function cssLoaded() {
		document.body.dispatchEvent(new CustomEvent('cssloaded', {
			bubbles: true
		}));

		document.body.setAttribute('data-css-loaded', 'true');
		document.body.className = document.body.className ? document.body.className + ' __css-loaded' : '__css-loaded';

		if (before !== null) {
			document.head.removeChild(before);
		}
	}
}());
/* eslint-enable no-var, prefer-const, object-shorthand, prefer-template,
prefer-arrow-callback, prefer-destructuring, no-param-reassign, comma-dangle */
