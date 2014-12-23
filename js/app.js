$( document ).ready(function() {
	function updateLang() {
		$("body").i18n();
		if (i18n.lng() === "de") {
			$(".fb").attr("href", "https://www.facebook.com/pages/A-Little-Less-Desperation-Deutsch/384194471747151");
		} else {
			$(".fb").attr("href", "https://www.facebook.com/pages/A-Little-Less-Desperation/484452821695159");
		}
	};
	i18n.init({ fallbackLng: 'en' }, function(t) {
		updateLang();
	});

	$("#nav_gallery").click(function(event) {
		event.preventDefault();
		blueimp.Gallery($('#links a'), $('#blueimp-gallery').data());
	});
	$("#carousel_gallery").click(function(event) {
		event.preventDefault();
		blueimp.Gallery($('#links a'), $('#blueimp-gallery').data());
	});

	var openGalleryVideo = function() {
		blueimp.Gallery([
			{
				title: 'Teaser',
				href: 'https://www.youtube.com/watch?v=Z0oz86GNwIY',
				type: 'text/html',
				youtube: 'Z0oz86GNwIY',
				poster: 'https://img.youtube.com/vi/Z0oz86GNwIY/maxresdefault.jpg'
			},
			{
				title: 'In Science Fiction Filmen sieht man ja manchmal, wie im Notfall der Reaktorkern eines Raumschiffs abgeworfen werden muss. Aber was genau passiert dabei eigentlich? Nun, in unserem Raumschiff haben wir diesen komplizierten Vorgang einmal gefilmt!',
				type: 'text/html',
				href: 'https://www.youtube.com/watch?v=_mr1P1MLfXk',
				youtube: '_mr1P1MLfXk',
				poster: 'https://img.youtube.com/vi/_mr1P1MLfXk/maxresdefault.jpg'
			},
			{
				title: 'Deaf Bird Entertainment',
				type: 'text/html',
				href: 'https://www.youtube.com/watch?v=mjEcdoySM00',
				youtube: 'mjEcdoySM00',
				poster: 'https://img.youtube.com/vi/mjEcdoySM00/maxresdefault.jpg'
			}
		], $('#blueimp-gallery').data());
	}
	/*$("#open_video-gallery").click(function(event) {
		event.preventDefault();
		openGalleryVideo();
	});*/
	$("#nav_gallery_video").click(function(event) {
		event.preventDefault();
		openGalleryVideo();
	});

	$(".lang_switch").click(function(event) {
		event.preventDefault();
		var theLang = $(this).data("lang");
		if (i18n.lng() !== theLang) {
			i18n.setLng(theLang, function() {
				updateLang();
			});
		};
	});
	$("#impressum").click(function(event) {
		$("#termsModal").modal();
	});

	$("#termsModal").on('show.bs.modal', function (event) {
		//var button = $(event.relatedTarget) // Button that triggered the modal
		//var recipient = button.data('whatever') // Extract info from data-* attributes
		// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
		// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
		var modal = $(this)
		//modal.find('.modal-title').text('New message to ' + recipient)

		var location = "./locales/"+i18n.lng()+"/impressum.md";

		$.ajax({
			url: location,
			type: 'get',
			dataType: 'html',
			async: false,
			success: function(data) {
				var htmlData = markdown.toHTML(data);
				modal.find('.modal-body').html(htmlData);
			}
		});
	});

	/*function loadNews() {
		var location = "./locales/"+i18n.lng()+"/news.md";

		$.ajax({
			url: location,
			type: 'get',
			dataType: 'html',
			async: false,
			success: function(data) {
				var htmlData = markdown.toHTML(data);
				$("#news_content").empty().html(htmlData);
			}
		});
	}
	loadNews();*/

	function autocollapse() {
		var $collapsable = $(".thorwe-collapse"),
			$oncollapse = $("#thorwe-oncollapse");

		if (window.innerWidth < 768) {
			if ($collapsable.css("display") == "none") {
				$collapsable.css("display", "block");
				$oncollapse.css("display", "none");
			}
			return;
		}

		if ($collapsable.css("display") == "block") {
			if ($('#autocollapse').innerHeight() > 50) {
				$collapsable.css("display", "none");
				$oncollapse.css("display", "block");
			}
		} else {
			$collapsable.css("display", "block");
			$oncollapse.css("display", "none");
			if ($('#autocollapse').innerHeight() > 50) {
				$collapsable.css("display", "none");
				$oncollapse.css("display", "block");
			}
		}		
	}
	$(window).on('resize', autocollapse);
	autocollapse();

	function moveToCarusel() {
		if (($(window).scrollTop() > 0) || $('.navbar-collapse').hasClass("collapsing") || $('.navbar-collapse').hasClass("in"))
			return;
		
		var offset = $(".carousel-inner").offset(),
			posX = offset.left - $(window).scrollLeft(),
			posY = offset.top - $(window).scrollTop(),
			width = $(".carousel-inner").width(),
			height = $(".carousel-inner").height();

		posX = posX + (width / 2) - ($("#logo").width() / 2);
		posY = posY + (height / 2) - ($("#logo").height() / 2);

		// substract current image position
		offset = $("#logo").offset();
		posX -= offset.left - $(window).scrollLeft();
		posY -= offset.top - $(window).scrollTop();

		//console.log(posX, posY);
		move('#logo')
		.x(posX)
		.y(posY)
		.scale(2)
		.end();
	};
	function rotateLogo(amount) {
		if ($('.navbar-collapse').hasClass("collapsing") || $('.navbar-collapse').hasClass("in"))
			return;
		
		if (typeof amount !== "number")
			amount = 20;
		
		move('#logo')
		.rotate(amount).then()
		.rotate(amount * -1).pop()
		.end();
	};
	$('#myCarousel').on('slide.bs.carousel', function (evt) {
		if ($(window).scrollTop() > 0)
			return;
		
		if ($(evt.relatedTarget).attr("id") === "title") {
			moveToCarusel();
		} else {
			rotateLogo((evt.direction === "right")?-20:20);
		}
	});
	moveToCarusel();
	//$('#myCarousel').on('slid.bs.carousel', function (evt) {});

	var navMarginTop = $("#autocollapse").offset().top,
		updateNavOnScroll = function() {
			var $nav = $("#autocollapse");
			//console.log($nav.offset().top);
			if($(window).scrollTop() > navMarginTop) {
				if (!$nav.hasClass("navbar-fixed-top")) {
					$('body').css("padding-top", "50px");
					$nav.addClass("navbar-fixed-top");
					//$(".marketing").css("padding-top", $("#autocollapse").height());
					rotateLogo(10);
				}
			} else {
				if ($nav.hasClass("navbar-fixed-top")) {
					$nav.removeClass("navbar-fixed-top");
					$('body').css("padding-top", "");
					//$(".marketing").css("padding-top", 0);
					/*if ($(".carousel-inner > .active").attr("id") == "title")
						moveToCarusel();
					else
						rotateLogo(10);*/
					$('#myCarousel').carousel(1);
					//moveToCarusel();
				}
			}	
		};	
	$(document).scroll(updateNavOnScroll);
	updateNavOnScroll();
	
	$('body').scrollspy({ target: '#navbar-wrapper-container' });

	$('a[href*=#]:not([href=#])').delay(1000).click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: (target.selector == "#home") ? 0 : (target.offset().top + (($("#autocollapse").hasClass("navbar-fixed-top"))?0:60)) // - parseFloat($('body').css("padding-top"))
				}, 1000);
				return false;
			}
		}
	});
	//Executed on page load with URL containing an anchor tag.
	if($(location.href.split("#")[1])) {
		var target = $('#'+location.href.split("#")[1]);
		if (target.length) {
			$('html,body').animate({
				scrollTop: (target.selector == "#home") ? 0 : (target.offset().top + (($("#autocollapse").hasClass("navbar-fixed-top"))?0:60)) // - parseFloat($('body').css("padding-top"))
			}, 1000);
			return false;
		}
	}
	
	$(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });	// fix for height problem on very small devices for fixed-top nav

	// small devices view -> on open change image
	$('.navbar-collapse').on('show.bs.collapse', function() {
		$("#logo").css("display", "none");
		$("#logo_symbol").css("display", "inline");
		$("#logo_text").css("display", "inline");
	});
	$('.navbar-collapse').on('hidden.bs.collapse', function() {
		$("#logo").css("display", "block");
		$("#logo_symbol").css("display", "none");
		$("#logo_text").css("display", "none");
	});
	
});