function cost() {
	$('.estimate-payments').each(function(){
		$(this).find('.final-cost').val(
			$(this).find('.car-cost').val().replace(/\,/g, '').replace(/\$/g, '').replace(/\ /g, '') -
			$(this).find('.downPayment').val().replace(/\,/g, '').replace(/\$/g, '').replace(/\ /g, '') -
			$(this).find('.tradeIn').val().replace(/\,/g, '').replace(/\$/g, '').replace(/\ /g, '')
		);

		if( $(this).find('.final-cost').val() <= 0) {
			$(this).find('.final-cost').val(0);
		}
	});
}

function calcResults() {
	var loan = 0;
	$('.estimate-payments').each(function(){
		$(this)
		.accrue({
			response_output_div: $('.loan-overview').eq(loan).find('.monthly-payment .results'),
			response_basic:
				'$%payment_amount%',
			error_text: "\u2014\u2014\u2014",
		})
		.accrue({
			response_output_div: $('.loan-overview').eq(loan).find('.total-interest .results'),
			response_basic:
				'$%total_interest%',
			error_text: "\u2014\u2014\u2014",
		})
		.accrue({
			response_output_div: $('.loan-overview').eq(loan).find('.total-cost .results'),
			response_basic:
				'$%total_payments%',
			error_text: "\u2014\u2014\u2014",
		});

		loan = loan + 1;
	});
}

$(function(){
	cost();
	calcResults();

	$('.results.button').on('click', function(){
		$('.payment-overview').toggleClass('view-results');
		$(this).find('i').toggleClass('fa-rotate-180');
	});

	$('.dollar-field').keypress(function (e) {
		if (e.which !== 8 && e.which !== 0 && e.which !== 44 && e.which !== 188 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});

	$('body').on('keyup click', '.estimate-payments input', function(){
		cost();
		calcResults();
	});

	$('.rate').mask('99.999%',{
		placeholder:"_"
	});

	$('.loans-list').on('click', 'li', function(){
		$('.loans-list li').removeClass('active');

		if( $(this).hasClass('add-loan') ) {
			$('.estimate-payments').eq(0).clone().insertAfter( $('.estimate-payments').last() );
			$('.estimate-payments').removeClass('active').last().addClass('active');
			$('<li>Loan ' +  ($('.loans-list li').length) + '</li>').insertBefore( $('.loans-list li').last() );
			$('.loans-list li').last().prev().addClass('active');
			$('.loan-overview').eq(0).clone().insertAfter( $('.loan-overview').last() );

			cost();
			calcResults();

		} else {
			$(this).addClass('active');
			var activeLoan = 0;
			$('.loans-list li').each(function(){
				if( !$(this).hasClass('active') ) {
					activeLoan = activeLoan + 1;
				} else {
					$('.estimate-payments').removeClass('active').eq(activeLoan).addClass('active');

					return true;
				}
			});
		}
	});


});

if (window.navigator.standalone == true) {
	$(function() {
		$(document).on("touchmove", function(evt) { evt.preventDefault() });
		$(document).on("touchmove", ".scrollable", function(evt) { evt.stopPropagation() });
	});
}