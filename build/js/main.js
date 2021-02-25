'use strict';

var body = $('body');
var DURATION = 300;
var mobileBreakpoint = 992;

function setOverlay(cb) {
	var overlay = $('<div class="overlay"></div>');
	overlay.on('click', cb);
	return overlay;
}


/* Modal */
(function(){
	$(document).ready(function() {
		$(".fancybox").fancybox();
	});
})();

/* Plan markers */
(function(){
	addMarker();

	setTimeout(function () {
		showPlanDetail();
	}, 700);

	function addMarker() {
		$.getJSON('data/plan.json', function (data) {
			var parent = $('.plan'),
				tar = parent.find('.plan__image'),
				coords = data.coords;

			coords.forEach(function (elem, index) {
				var top = elem.top,
					left = elem.left;

				$('<svg data-index="' + index + '" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="outer" cx="17" cy="17" r="17" fill="#677B83"/><circle cx="17" cy="17" r="5.1" fill="#F9F9F9"/></svg>').css({
					top: top + '%',
					left: left + '%'
				}).appendTo(tar);
			});
		});
	}

	function showPlanDetail() {
		var parent = $('.plan'),
			markers = parent.find('.plan__image svg'),
			anchor = parent.find('.plan__anchor'),
			caption = parent.find('.plan__caption'),
			bg = parent.find('.plan__wrapper');

		markers.click(function () {
			var that = $(this);

			$.getJSON('data/plan.json', function (data) {
				var content = data.content,
					curContent = content[that.attr('data-index')],
					card = $('.plan-card');

				card.find('img').attr('src', curContent.img);
				card.find('.plan-card__digit').text(curContent.digit);
				card.find('.plan-card__link').attr('href', curContent.href);
				card.find('.plan-card__link span').text(curContent.title);
				card.find('.plan-card__date').text(curContent.date);
			});

			markers.fadeOut(300);
			anchor.fadeOut(300);

			setTimeout(function () {
				bg.addClass('inactive');
			}, 300);

			setTimeout(function () {
				caption.fadeIn(300);
			}, 600);
		});

		$(document).mouseup(function (e) {
			if ($('.plan .plan__caption').is(':visible')) {
				if (!caption.is(e.target) && caption.has(e.target).length === 0) {
					caption.fadeOut(300);
					bg.removeClass('inactive');
					markers.fadeIn(300);
					anchor.fadeIn(300);
				}
			}
		});
	}
})();

/* Services slider */
(function(){
	var servicesSlider = new Swiper('.__js_services-slider', {
		pagination: {
			el: '.services-slider-pagi'
		},
		navigation: {
			prevEl: '.services-slider-prev',
			nextEl: '.services-slider-next'
		},
		speed: 300,
		loop: true,
		loopedSlides: 7
	});

	var servicesThumbs = new Swiper('.__js_services-thumbs', {
		slideToClickedSlide: true,
		loop: true,
		loopedSlides: 7,
		slidesPerView: 'auto'
	});

	servicesSlider.controller.control = servicesThumbs;
	servicesThumbs.controller.control = servicesSlider;
})();

/* Projects slider */
(function(){
	var projectsSlider = new Swiper('.__js_projects-slider', {
		pagination: {
			el: '.projects-pagi'
		},
		navigation: {
			prevEl: '.projects-prev',
			nextEl: '.projects-next'
		},
		speed: 300,
		slidesPerView: 'auto',
		spaceBetween: 10,
		loop: true
	});
})();

/* Clients slider */
(function(){
	var projectsSlider = new Swiper('.__js_clients-slider', {
		pagination: {
			el: '.clients-pagi'
		},
		navigation: {
			prevEl: '.clients-prev',
			nextEl: '.clients-next'
		},
		speed: 300,
		slidesPerView: 'auto',
		centeredSlides: true
	});
})();

/* News slider */
(function(){
	var projectsSlider = new Swiper('.__js_news-slider', {
		pagination: {
			el: '.news-pagi'
		},
		navigation: {
			prevEl: '.news-prev',
			nextEl: '.news-next'
		},
		speed: 300,
		slidesPerView: 'auto',
		spaceBetween: 10,
		loop: true
	});
})();
