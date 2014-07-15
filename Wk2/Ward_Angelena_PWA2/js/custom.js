// JavaScript Document
$(document).ready(function(){
	
	$('.tabs').click(function(){
		if ($(this).parent().is('.open')) {
			$(this).closest('.mytabs').find('.about').animate({'height':'0'},500);
			$(this).closest('.mytabs').removeClass('hide');
		}else{
			var newHeight = $(this).closest('.mytabs').find('.about2').height() + 'px';
			$(this).closest('.mytabs').find('.about').animate({'height':newHeight},500);
			$(this).closest('.mytabs').addClass('open');
		}
	});
	
});

