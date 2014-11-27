$( document ).ready(function() {
	i18n.init({ fallbackLng: 'en' }, function(t) {
		$("body").i18n();
	});

	$("#nav_gallery").click(function() {
		event.preventDefault();
		blueimp.Gallery($('#links a'), $('#blueimp-gallery').data());
	});
	$("#carousel_gallery").click(function() {
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
				type: 'video/*',
				poster: 'img/deaf_bird.png',
				sources: [
					{
						href: 'http://www.alld-game.net/.cm4all/mediadb/.reactor%20core%20ejection.mp4/video.webm',
						type: 'video/webm'
					},
					{
						href: 'http://www.alld-game.net/.cm4all/mediadb/.reactor%20core%20ejection.mp4/video.mp4',
						type: 'video/mp4'
					},
					{
						href: 'http://www.alld-game.net/.cm4all/mediadb/.reactor%20core%20ejection.mp4/video.ogv',
						type: 'video/ogg'
					}
				]
			},
			/*,
            {
                title: 'LES TWINS - An Industry Ahead',
                type: 'text/html',
                youtube: 'zi4CIXpx7Bg'
            },
            {
                title: 'KN1GHT - Last Moon',
                type: 'text/html',
                vimeo: '73686146',
                poster: 'img/deaf_bird.png'
            }*/
			{
				title: 'Deaf Bird Entertainment',
				type: 'video/*',
				poster: 'img/deaf_bird.png',
				sources: [
					{
						href: 'http://www.alld-game.net/.cm4all/mediadb/.Deaf%20Bird%20Entertainment%20Splash.mp4/video.webm',
						type: 'video/webm'
					},
					{
						href: 'http://www.alld-game.net/.cm4all/mediadb/.Deaf%20Bird%20Entertainment%20Splash.mp4/video.mp4',
						type: 'video/mp4'
					},
					{
						href: 'http://www.alld-game.net/.cm4all/mediadb/.Deaf%20Bird%20Entertainment%20Splash.mp4/video.ogv',
						type: 'video/ogg'
					}
				]
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
		//console.log("Switchting to", theLang);
		if (i18n.lng() !== theLang) {
			i18n.setLng(theLang, function() {
				//console.log("Language switched to", theLang);
				$("body").i18n();
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

	function loadNews() {
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
	loadNews();

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
	$(document).on('ready', autocollapse);
	$(window).on('resize', autocollapse);

	function moveToCarusel() {
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

		console.log(posX, posY);
		move('#logo')
		.x(posX)
		.y(posY)
		.scale(2)
		.end();
	};
	$('#myCarousel').on('slide.bs.carousel', function (evt) {
		if ($(evt.relatedTarget).attr("id") === "title") {
			moveToCarusel();
		} else {
			var rotation = 20;
			if (evt.direction === "right")
				rotation *= -1;

			move('#logo')
			.rotate(rotation).then().rotate(rotation * -1).pop()
			.end();
		}
	});
	moveToCarusel();

	$('#myCarousel').on('slid.bs.carousel', function (evt) {
		// do something…
	});

	$(document).scroll(function () {
		/*var windowscroll = $(window).scrollTop();
        var navHeight = $('#navWrapper').height();
        if(windowscroll >= $("#actionMenu").offset().top) {
            $('#pageHeader').removeClass('minimal');
            $('#pageHeader').addClass('minimal');
            if ($(window).width() > 800) {
                $('#systemNotification').css('top',navHeight);
            }
            else {
                $('#systemNotification').css('top','0');
            }
        }
        else if($("#actionMenu").offset().top > windowscroll) {
            $('#pageHeader').removeClass('minimal');
            if ($(window).width() > 800) {
                $('#systemNotification').css('top',navHeight);
            }
            else {
                $('#systemNotification').css('top','0');
            }
        }*/
	});
});