TIME = 300  // Number of milliseconds an action takes


$('body').on('click', '.slider ul a', function() {
	slider = $(this).parents('.slider');
	if ( slider.find('.cover').is(':visible') ) {
		slider.find('.cover').fadeOut(TIME);
		var TIME = 0;
	}
	slider.find('ul li.active').removeClass('active')
	                           .animate({backgroundColor: '#eee'}, TIME);
	$(this).parent().addClass('active')
	                .animate({backgroundColor: '#fd8'}, TIME);
	offset = $(this.hash).offset().left - slider.find('.slides').offset().left;
	slider.find('.slideswrap').animate({scrollLeft:offset}, TIME);
	return false;
});
function adjust_slides() {
	$('.slider').each(function() {
		$(this).find('.slides div').css('width', $(this).width()-40);
	});
}
var resizeTimer;
$(window).resize(function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(adjust_slides, 50);
});


function init() {
	$('.slideswrap').css('overflow-x', 'hidden');
	$('.slider .cover').css('display', '-webkit-box').css('display', 'box');
	setTimeout(adjust_slides, 50);

	$('.email').each(function() {
		$(this).html( $(this).html().replace('@@@', '@').replace(/@@@/g, '.') );
		$(this).attr('href', $(this).attr('href').replace('@@@', '@').replace(/@@@/g, '.') );
	});
}
$(init);


$('body').on('click', 'header a', function() {
	var href = $(this).attr('href');
	$('#main').load(href + ' #main', function(response, status, xhr) {
		if (status == 'success') {
			history.pushState(null, null, href);
			$(init);
			ga('send', 'pageview');
		}
	});
	return false;
});
