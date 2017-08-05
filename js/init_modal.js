var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
$(function() {
    function TemplateRefresh() {
        ModalRefresh();
    }
    $(window).resize(function() {
        TemplateRefresh();
    });
    TemplateRefresh();

    function ModalRefresh() {
        if ($('.modal').is(':visible')) {
            var modalBlock = $('.modal:visible .modal-block'),
                width = parseInt(modalBlock.width()),
                height = parseInt(modalBlock.height());
            if ($(window).height() > height + 20) {
                modalBlock.addClass('modal-top').removeClass('margin-t-b').css('margin-top', -1 * (height / 2));
            } else {
                modalBlock.addClass('margin-t-b').removeClass('modal-top');
            }
            if ($(window).width() > width) {
                modalBlock.addClass('modal-left').removeClass('margin-l').css('margin-left', -1 * (width / 2));
            } else {
                modalBlock.addClass('margin-l').removeClass('modal-left');
            }
        }
    }
    $(document).on('click', 'a[data-modal]', function() {
		
		if(isMobile.any()){
		//действие, которое нужно сделать, если браузер мобильный
		console.info($('#header_tel').text());
		window.open('tel:' + $('#tel-num').text());
		}else{
			var modalWindow = $('div#' + $(this).attr('data-modal'));
			if (modalWindow.length) {
				modalWindow.fadeIn('fast');
				$('body').addClass('modal-show');
				ModalRefresh();
				return false;
			}
		}
    });

    function ModalHide() {
        $('.modal:visible').fadeOut('fast', function() {
            $('body').removeClass('modal-show');
        });
    }
    $(document).on('click', '.icon-close, .modal', function(event) {
        if (event.target != this) return false;
        else
            ModalHide();
    }).on('keydown', function(key) {
        if (key.keyCode == 27) ModalHide();
    }).on('click', '.modal > *', function(event) {
        event.stopPropagation();
        return true;
    }).on('submit', '#kmacb-form form', function() {
		
		$('#kmacb-form form input[name=phone]').removeClass('error');
		var name = $('#kmacb-form form input[name=name]').val(),
            phone = $('#kmacb-form form input[name=phone]').val();

		if(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i.test(phone) != true) {
			$("#kmacb-form form input[name=phone]").addClass('error');
		}
		
		if($('#kmacb-form form input[name=phone].error').length == 0) {
			ModalHide();
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
					yaCounter45054092.reachGoal('FormFilling');
					ga('send','event','button','click','FormFilling');
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