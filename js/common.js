var cfid = null; // Идентификатор таймера закрытия лайтбокса и подложки

function closeFormMessage() {
	clearTimeout(cfid);
	$('#shadow, #thankyou').fadeOut(700);
}

$(document).ready(function() {
	
	// Маска для телефона
	$(".telephone").mask("+7 (999) 999-99-99");

		//Slider init
	$('.owl-custom').owlCarousel({
		items:1,
		nav: false,
		margin: 10,
		loop: true,
		autoplay: true,
		autoplayTimeout: 2500,
		responsive:{
	        0:{
	        	items:1
	        },
	        960:{
	        	items:2
	        }
	    }
	});	
	
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
	
	$('.callback form').submit(function(e) {
		e.preventDefault();
		
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
					yaCounter45834738.reachGoal('FormFilling');
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
});


