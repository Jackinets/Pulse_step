(function($) {    
	//Tabs
	$(function() {
		$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
		});        
	}); 
	
	//Switch "Подробнее" - "Назад"
	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back'); 
	
	// Modal
	$(function () {        
	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});    
	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');    
	})   

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});
});
	// Forms validating
	function validateForms (form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Пожалуйста, введите свое имя",
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
				  required: "Пожалуйста, введите свой e-mail, чтобы мы могли с Вами связаться",
				  email: "Ваш e-mail должен быть в формате: name@domain.com"
				}
			  }    
			});           
	};

	validateForms ('#consultation-form');
	validateForms ('#consultation form');
	validateForms ('#order form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");
	
	
	
	
	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});
	
	//Pageup
	$(window).scroll(function () {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();    
		}
	});

	// Smooth scroll
	$("a[href^='#up']").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
});
	
})(jQuery);

//Slider
const slider = tns({
	container: '.carousel__inner',
	items: 1,
	slideBy: 'page',        
	controls: false,
	nav: true,
	navPosition: "bottom",    
	responsive: {		 
		320: {
			edgePadding: 20,
			gutter: 20,
			nav: true
		},
		576: {
			nav: true
		},

		768: {
			nav: true,
		},

		992: {
			nav: false
		},
		
		1200: {
			nav: false
		}
	}
});

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev')
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next')
});

new WOW().init();




