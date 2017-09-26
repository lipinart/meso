var cfid = null; // Идентификатор таймера закрытия лайтбокса и подложки


function closeFormMessage() {
	clearTimeout(cfid);
	$('form').trigger("reset");
	$('#shadow, #thankyou').fadeOut(500);
	return false;
}

$(document).ready(function() {
	
	// Маска для телефона
	$(".telephone").mask("+7 (999) 999-99-99");


	$('#flip-slider').flippage({
		width: 320,
		height: 320
	});
	
	// Закрывание всех форм по нажатию на крестик
	$(document).on('click', 'a.btn-close', function() {
		closeFormMessage();
	});


	// Закрывание всех форм по нажатию на затемненный блок
	$(document).on('click', '#shadow, #thankyou', function() {
		closeFormMessage();
	});

	// Закрывание всего по клавише "ESC"
	$(document).on('keydown', function(e) {
		if(e.keyCode == 27) {
			closeFormMessage();
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
			$('#shadow, #thankyou').fadeIn(500);
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

