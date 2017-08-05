var cfid = null; // Идентификатор таймера закрытия лайтбокса и подложки

function closeFormMessage() {
	clearTimeout(cfid);
	$('#shadow, #thankyou').fadeOut(700);
}

$(document).ready(function() {
	
	if (window.innerWidth < 992) {
		$(".owl-carousel").owlCarousel({
			responsive:{
				0:{
					items:1,
					nav:true
				},
				480:{
					items:2,
					nav:true
				},
				615:{
					items:3,
					nav:true
				},
				992:{
					items:4,
					nav:true
				},
				1200:{
					items:5
				}
			}
		});
	}
	$(window).resize(function() {
	    	if (window.innerWidth < 992) {
			$(".owl-carousel").owlCarousel({
				responsive:{
					0:{
						items:1,
						nav:true
					},
					480:{
						items:2,
						nav:true
					},
					615:{
						items:3,
						nav:true
					},
					992:{
						items:4,
						nav:true
					},
					1200:{
						items:5
					}
				}
			});
		}
		else{
			$(".owl-carousel").trigger('destroy.owl.carousel');
		}
	});
	//плавный скрол к экрану лендинга	
	$('a[href^="#tab"]').on('click', function(e){
		e.preventDefault();
		var t = 1000;
		var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
		$('html,body').stop().animate({ scrollTop: $(d).offset().top }, t);
	});
	
	// Маска для телефона
	$(".telephone").mask("+7 (999) 999-99-99");
	
	// Закрывание всех форм по нажатию на крестик
	$(document).on('click', 'a.close-btn', function() {
		$('#shadow').fadeOut(700);
		$(this).parent('div').fadeOut(700);
		return false;
	});

	// Закрывание всех форм по нажатию на затемненный блок
	$(document).on('click', '#shadow', function() {
		$('#shadow, #thankyou').fadeOut(700);
		return false;
	});

	// Закрывание всего по клавише "ESC"
	$(document).on('keydown', function(e) {
		if(e.keyCode == 27) {
			$('#shadow, #thankyou').fadeOut(700);
		}
	});

	// Отправка email
	$('.callback form').submit(function() {
	    $('input[name="phone"]').removeClass('error');
	    var name = $(this).find("input[name='name']").val();
		var phone = $(this).find("input[name='phone']").val();

		if(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i.test(phone) != true) {
			$(this).find("input[name='phone']").addClass('error');
		}
		
		if($('.error').length == 0) {
			$('#shadow, #thankyou').fadeIn(700);
			clearTimeout(cfid);
			cfid = setTimeout(closeFormMessage, 5000);
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: new FormData(this),
				contentType: false,
				cache: false,
				processData: false,
					success: function(data) {
					//yaCounter45054092.reachGoal('FormFilling');
					//ga('send','event','button','click','FormFilling');
					$('*[name="name"]').val('');
					$('*[name="phone"]').val('');
					//console.log(data);
				},
				error: function() {
					$('*[name="name"]').val('');
					$('*[name="phone"]').val('');
					//console.log(data);
				}
			});
		}
		
		return false;
	});
	
	// Удаление ошибок
	$(document).on('focus', 'input[type="text"], input[type="tel"]', function() {
        $('*').removeClass('error');
    });
});