TIME = 300  // Number of milliseconds an action takes


$('.email').each(function() {
	$(this).html( $(this).html().replace('@@@', '@').replace(/@@@/g, '.') );
	$(this).attr('href', $(this).attr('href').replace('@@@', '@').replace(/@@@/g, '.') );
});


$('#slideswrap').css('overflow-x', 'hidden');
$('#slider ul a').click(function() {
	if ( $('#slider .cover').is(':visible') ) {
		$('#slider .cover').fadeOut(TIME);
		var TIME = 0;
	}
	$('#slider ul li.active').removeClass('active')
	                         .animate({backgroundColor: '#eee'}, TIME);
	$('> li', this).addClass('active')
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
$('#slider .cover').css('display', '-webkit-box').css('display', 'box');
setTimeout(adjust_slides, 50);
