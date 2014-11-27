jQuery("document").ready(function($){
	$('a[href*=#]:not([href=#])').delay(1000).click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			&& location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				if ($(window).width() > 800) {
					$('html,body').animate({
						scrollTop: target.offset().top - 35
					}, 1000);
					return false;
				}
				else {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		}
	});
	//Executed on page load with URL containing an anchor tag.
	if($(location.href.split("#")[1])) {
		var target = $('#'+location.href.split("#")[1]);
		if (target.length) {
			if ($(window).width() > 800) {
				$('html,body').animate({
					scrollTop: target.offset().top - 35
				}, 5);
				return false;
			}
			else {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 5);
				return false;
			}
		}
	}
});