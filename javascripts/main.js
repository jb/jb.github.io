TIME = 300  // Number of milliseconds an action takes


$('body').on('click', '#slider ul a', function() {
	if ( $('#slider .cover').is(':visible') ) {
		$('#slider .cover').fadeOut(TIME);
		var TIME = 0;
	}
	$('#slider ul li.active').removeClass('active')
	                         .animate({backgroundColor: '#eee'}, TIME);
	$(this).parent().addClass('active')
	                .animate({backgroundColor: '#fd8'}, TIME);
	offset = $(this.hash).offset().left - $('#slides').offset().left;
	$('#slideswrap').animate({scrollLeft:offset}, TIME);
	return false;
});
function adjust_slides() {
	width = $('#slider').width();
	$('#slides').children('div').width(width-40);
}
var resizeTimer;
$(window).resize(function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(adjust_slides, 50);
});


function init() {
	$('#slideswrap').css('overflow-x', 'hidden');
	$('#slider .cover').css('display', '-webkit-box').css('display', 'box');
	setTimeout(adjust_slides, 50);

	$('.email').each(function() {
		$(this).html( $(this).html().replace('@@@', '@').replace(/@@@/g, '.') );
		$(this).attr('href', $(this).attr('href').replace('@@@', '@').replace(/@@@/g, '.') );
	});
}
$(init);


$('body').on('click', 'header a', function() {
	var href = $(this).attr('href');
	history.pushState(null, null, href);
	$('#main').load(href + ' #main', function() {
		$(init);
		ga('send', 'pageview');
	});
	return false;
});
