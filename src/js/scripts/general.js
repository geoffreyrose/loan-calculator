function cost() {
	$('.final-cost').val(
		$('[name="car-cost"]').val().replace(/\,/g, '').replace(/\$/g, '').replace(/\ /g, '') -
		$('[name="downPayment"]').val().replace(/\,/g, '').replace(/\$/g, '').replace(/\ /g, '') -
		$('[name="tradeIn"]').val().replace(/\,/g, '').replace(/\$/g, '').replace(/\ /g, '')
	);

	$('[type="range"]').each(function(){
		var value = $(this).val();
		// if( $(this).hasClass('three-decimal') ) {
		// 	value = parseFloat(value).toFixed(3);
		// }
		$(this).next().find('input').val(value);
	});

	if( $('.final-cost').val() <= 0) {
		$('.final-cost').val(0);
	}
}

$(function(){
	$('.results.button').on('click', function(){
		$('.payment-overview').toggleClass('view-results');
		$(this).find('i').toggleClass('fa-rotate-180');
	});

	$('.dollar-field').keypress(function (e) {
		if (e.which !== 8 && e.which !== 0 && e.which !== 44 && e.which !== 188 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});

	cost();
	$('.estimate-payments input').on('keyup click', function(){
		cost();
	});

	// $('.rate').priceFormat({
	// 	prefix: '',
	// 	suffix: '%'
	// });
	$('.rate').mask('99.999%',{
		placeholder:"_"
	});

	$(".estimate-payments")
	.accrue({
		response_output_div: ".monthly-payment .results",
		response_basic:
			'$%payment_amount%',
		error_text: "\u2014\u2014\u2014",
	})
	.accrue({
		response_output_div: ".total-interest .results",
		response_basic:
			'$%total_interest%',
		error_text: "\u2014\u2014\u2014",
	})
	.accrue({
		response_output_div: ".total-cost .results",
		response_basic:
			'$%total_payments%',
		error_text: "\u2014\u2014\u2014",
	});
});