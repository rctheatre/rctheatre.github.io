/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Carousels
				carousels: {
					speed: 4,
					fadeIn: true,
					fadeDelay: 250
				},

				tickers: {
					fadeIn: true,
					fadeDelay: 250,
					speed: 4
				}

		};

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '961px',   '1280px' ],
			narrow:    [ '841px',   '960px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			speed: 350,
			noOpenerFade: true,
			alignment: 'center'
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Nav.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Carousels.
		$('.carousel').each(function() {

			var	$t = $(this),
				$forward = $('<span class="forward"></span>'),
				$backward = $('<span class="backward"></span>'),
				$reel = $t.children('.reel'),
				$items = $reel.children('article');

			var	pos = 0,
				leftLimit,
				rightLimit,
				itemWidth,
				reelWidth,
				timerId;

			// Items.
				if (settings.carousels.fadeIn) {

					$items.addClass('loading');

					$t.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						enter: function() {

							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);

							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();

								if (x.length <= limit) {

									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;

								}

								xf.removeClass('loading');

							}, settings.carousels.fadeDelay);

						}
					});

				}

			// Main.
				$t._update = function() {
					pos = 0;
					rightLimit = (-1 * reelWidth) + $window.width();
					leftLimit = 0;
					$t._updatePos();
				};

				$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

			// Forward.
				$forward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos -= settings.carousels.speed;

							if (pos <= rightLimit)
							{
								window.clearInterval(timerId);
								pos = rightLimit;
							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Backward.
				$backward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos += settings.carousels.speed;

							if (pos >= leftLimit) {

								window.clearInterval(timerId);
								pos = leftLimit;

							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Init.
				$window.on('load', function() {

					reelWidth = $reel[0].scrollWidth;

					if (browser.mobile) {

						$reel
							.css('overflow-y', 'hidden')
							.css('overflow-x', 'scroll')
							.scrollLeft(0);
						$forward.hide();
						$backward.hide();

					}
					else {

						$reel
							.css('overflow', 'visible')
							.scrollLeft(0);
						$forward.show();
						$backward.show();

					}

					$t._update();

					$window.on('resize', function() {
						reelWidth = $reel[0].scrollWidth;
						$t._update();
					}).trigger('resize');

				});

				$(this).on('mouseenter', function() {
					$(this).find('.overlay').stop().fadeTo('fast', 0);
				}).on('mouseleave', function() {
					$(this).find('.overlay').stop().fadeTo('fast', 1);
				});

		});

	// Ticker.
	let images = ["images/header.svg", "images/banner-digital-web.png"]; // Replace with your image paths
	let currentIndex = 0;

	function showNextImage() {
		// Calculate the new index
		let newIndex = (currentIndex + 1) % images.length;

		// The current ticker image element
		const currentTickerImg = document.querySelector('.ticker');

		// Create a new image element for the new image
		const newTickerImg = document.createElement('img');
		newTickerImg.src = images[newIndex];
		newTickerImg.className = "ticker slide-in-right"; // Positioned off-screen to the right

		// Append the new image to the image slider
		const imageSlider = currentTickerImg.parentNode;
		imageSlider.appendChild(newTickerImg);

		// Before starting the animation, raise the z-index of the new image
		newTickerImg.style.zIndex = 2; // Above the old image

		// As the new image slides in, change the z-index of the old image to be below
		setTimeout(() => {
			currentTickerImg.style.zIndex = 1;
			newTickerImg.classList.remove('slide-in-right'); // This will start the sliding in animation
		}, 0); // Immediately execute this, no need for delay

		// Slide out the current image
		currentTickerImg.classList.add('slide-out-left');

		// After the slide-out transition completes, remove the old image
		setTimeout(() => {
			currentTickerImg.remove();
			// Reset z-index of the new image if required (optional)
			// newTickerImg.style.zIndex = 1;
		}, 500); // Matches the transition duration

		// Update the currentIndex to the new image
		currentIndex = newIndex;
	}

	function showPreviousImage() {
		// Calculate the new index
		let newIndex = (currentIndex + 1) % images.length;

		// The current ticker image element
		const currentTickerImg = document.querySelector('.ticker');

		// Create a new image element for the new image
		const newTickerImg = document.createElement('img');
		newTickerImg.src = images[newIndex];
		newTickerImg.className = "ticker slide-in-left"; // Positioned off-screen to the right

		// Append the new image to the image slider
		const imageSlider = currentTickerImg.parentNode;
		imageSlider.appendChild(newTickerImg);

		// Before starting the animation, raise the z-index of the new image
		newTickerImg.style.zIndex = 2; // Above the old image

		// As the new image slides in, change the z-index of the old image to be below
		setTimeout(() => {
			currentTickerImg.style.zIndex = 1;
			newTickerImg.classList.remove('slide-in-left'); // This will start the sliding in animation
		}, 0); // Immediately execute this, no need for delay

		// Slide out the current image
		currentTickerImg.classList.add('slide-out-right');

		// After the slide-out transition completes, remove the old image
		setTimeout(() => {
			currentTickerImg.remove();
			// Reset z-index of the new image if required (optional)
			// newTickerImg.style.zIndex = 1;
		}, 500); // Matches the transition duration

		// Update the currentIndex to the new image
		currentIndex = newIndex;
	}

	document.querySelector('.right-arrow').addEventListener('click', showNextImage);
	document.querySelector('.left-arrow').addEventListener('click', showPreviousImage);
		
})(jQuery);