/*
Theme Name: Lopio
Description: Coming Soon
Author: Bluminethemes
Theme URI: http://bluminethemes.com/preview/html/lopio/
Author URI: https://creativemarket.com/Bluminethemes
Version: 1.0.0
*/

(function($) {
	"use strict";

	/* ------------------------------------------------------------------------ */
	/*	BOOTSTRAP FIX FOR WINPHONE 8 AND IE10
	/* ------------------------------------------------------------------------ */
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style")
		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport{width:auto!important}"
			)
		)
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
	}

	function detectIE() {
		if ($.browser.msie && $.browser.version == 9) {
			return true;
		}
		if ($.browser.msie && $.browser.version == 8) {
			return true;
		}
		return false;
	}

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}


	// BEGIN WINDOW.LOAD FUNCTION
	$(window).load(function() {

		/* ------------------------------------------------------------------------ */
		/*	PRELOADER
		/* ------------------------------------------------------------------------ */
		var preloaderDelay = 350,
			preloaderFadeOutTime = 800;

		function hidePreloader() {
			var loadingAnimation = $('#loading-animation'),
				preloader = $('#preloader');

			loadingAnimation.fadeOut();
			preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		}

		hidePreloader();

	});

	//BEGIN DOCUMENT.READY FUNCTION
	jQuery(document).ready(function($) {

		$.browser.chrome = $.browser.webkit && !!window.chrome;
		$.browser.safari = $.browser.webkit && !window.chrome;

		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$('body').addClass('mobile');
		}

		if ($.browser.chrome) {
			$('body').addClass('chrome');
		}

		if ($.browser.safari) {
			$('body').addClass('safari');
		}


		/* ------------------------------------------------------------------------ */
		/*	NICE SCROLL
		/* ------------------------------------------------------------------------ */
		$("html").niceScroll({
			cursorcolor: '#fff',
			cursoropacitymin: '0',
			cursoropacitymax: '1',
			cursorwidth: '3px',
			zindex: 10000,
			horizrailenabled: false,
			enablekeyboard: false,
		});


		/* ------------------------------------------------------------------------ */
		/*	ANIMATED ELEMENTS
		/* ------------------------------------------------------------------------ */
		if( !$('body').hasClass('mobile') ) {

			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility': 'visible'
				});
			} else {
				/* Starting Animation on Load */
				$(window).load(function() {
					$('.onstart').each( function() {
						var elem = $(this);
						if ( !elem.hasClass('visible') ) {
							var animationDelay = elem.data('animation-delay');
							var animation = elem.data('animation');
							if ( animationDelay ) {
								setTimeout(function(){
									elem.addClass( animation + " visible" );
								}, animationDelay);
							} else {
								elem.addClass( animation + " visible" );
							}
						}
					});
				});
			}
		}


		/* ------------------------------------------------------------------------ */
		/*	PAGE
		/* ------------------------------------------------------------------------ */
		function setSectionHeight() {
			var navigationHeight = $(".site-nav").height();
			var section = $('section');
			var windowHeight = getWindowHeight();

			if ( section.hasClass('fullscreen') ) {
				$('section.fullscreen').css( 'min-height', windowHeight );
			}
		}

		setSectionHeight();

		$(window).on('resize', function () {
			setSectionHeight();
		});


		/* ------------------------------------------------------------------------ */
		/*	BACKGROUNDS
		/* ------------------------------------------------------------------------ */
		function initPageBackground() {
			if($('body').hasClass('image-background')) { // IMAGE BACKGROUND

				$("body").backstretch([
					"images/aag07.jpg"
				]);

			} else  if( $('body').hasClass('slideshow-background') ) { // SLIDESHOW BACKGROUND

				$("body").backstretch([
					"images/aag07.jpg",
					"images/aag07.jpg",
				], {duration: 3000, fade: 1200});

			} else if($('body').hasClass('parallax-background')) { // PARALLAX BACKGROUND

				$.parallaxify({
					positionProperty: 'transform',
					responsive: true,
					motionType: 'natural',
					mouseMotionType: 'performance',
					motionAngleX: 70,
					motionAngleY: 70,
					alphaFilter: 0.5,
					adjustBasePosition: true,
					alphaPosition: 0.025,
				});

			} else if($('body').hasClass('youtube-background')) { // YOUTUBE VIDEO BACKGROUND
				if($('body').hasClass('mobile')) {

					// Default background on mobile devices
					$("body").backstretch([
						"images/aag07.jpg"
					]);

				} else {

					$(".player").each(function() {
						$(".player").mb_YTPlayer();
					});

				}
			} else if($('body').hasClass('mobile')) { // MOBILE BACKGROUND - Image background instead of video on mobile devices
				if($('body').hasClass('video-background')) {

					// Default background on mobile devices
					$("body").backstretch([
						"images/aag07.jpg"
					]);

				}
			}
		}

		initPageBackground();


		/* ------------------------------------------------------------------------ */
		/*	IOS
		/* ------------------------------------------------------------------------ */
		function iosdetect() {
			var deviceAgent = navigator.userAgent.toLowerCase();
			var $iOS = deviceAgent.match(/(iphone|ipod|ipad)/);

			if ($iOS) {
				var divs = $('#home');
				var vid = $('#video_background');
				var h = window.innerHeight;
				var divh = $("#home").height();
				divs.css({ "position": "relative", "top": (h-divh)/2, "margin-top": "0" });
				vid.css({ "display": "none"});
				$(window).resize(function() {
					var divs = $('#home');
					var h = window.innerHeight;
					var divh = $("#home").height();
					divs.css({ "position": "relative", "top": (h-divh)/2, "margin-top": "0" });
				});

				// use fancy CSS3 for hardware acceleration
			}
		}

		iosdetect();


		/* ------------------------------------------------------------------------ */
		/*	MAILCHIMP
		/* ------------------------------------------------------------------------ */
		$('.mailchimp').ajaxChimp({
			callback: mailchimpCallback,
			url: "//everydayfaraday.us12.list-manage.com/subscribe/post?u=7488e36366b347d298539fbf0&amp;id=b970405ab8" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
		});

		function mailchimpCallback(resp) {
			 if (resp.result === 'success') {
				$('.success-message').html(resp.msg).fadeIn(1000);
				$('.error-message').fadeOut(500);

			} else if(resp.result === 'error') {
				$('.error-message').html(resp.msg).fadeIn(1000);
			}
		}

		$('#email').focus(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$('#email').keydown(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$("#email").click(function() {
			$("#email").val('');
		});


		/* ------------------------------------------------------------------------ */
		/*	PLACEHOLDER
		/* ------------------------------------------------------------------------ */
		$('input, textarea').placeholder();


		/* ------------------------------------------------------------------------ */
		/*	CONTACT FORM
		/* ------------------------------------------------------------------------ */
		function initContactForm() {

			var scrollElement = $('html,body'),
				contactForm = $('.contact-form');

			contactForm.on('submit', function() {

				var requiredFields = $(this).find('.required'),
					formData = contactForm.serialize(),
					formAction = $(this).attr('action'),
					formSubmitMessage = $('.response-message');

				requiredFields.each(function() {

					if( $(this).val() == "" ) {

						$(this).addClass('input-error');

					} else {

						$(this).removeClass('input-error');
					}

				});

				function validateEmail(email) {
					var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return exp.test(email);
				}

				var emailField = $('.contact-form-email');

				if( !validateEmail(emailField.val()) ) {

					emailField.addClass("input-error");

				}

				if ($(".contact-form :input").hasClass("input-error")) {
					return false;
				} else {

					$.post(formAction, formData, function(data) {
						formSubmitMessage.text(data);

						requiredFields.val("");

						setTimeout(function() {
							formSubmitMessage.slideUp();
						}, 5000);
					});

				}

				return false;

			});

		}
		initContactForm();

	});
	//END DOCUMENT.READY FUNCTION

})(jQuery);
