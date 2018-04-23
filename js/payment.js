$(document).ready(function() {
	//页面加载之后默认操作
	$('.payment_deductible .span_r .input_integral').attr('disabled', 'true');
	$('.payment_deductible .span_r .span_sprice').addClass('color_999').removeClass('color_pink'); //价格文字变灰
	$('.payment_deductible .span_r .span_sprice').val('0');
	var oldguimi_currency = $('#guimi_currency').val();
	console.info("oldguimi_currency--", oldguimi_currency)
	//是否选择金币支付
	$("#btn_checkbox").on('click', function() {
		if(!$("#btn_checkbox").is(':checked')) {
			//不选择
			$('.payment_deductible .span_r .input_integral').attr('disabled', 'true');
			$('.payment_deductible .span_r .span_sprice').addClass('color_999').removeClass('color_pink'); //价格文字变灰
		} else {
			$('.payment_deductible .span_r .input_integral').removeAttr('disabled');
			$('.payment_deductible .span_r .span_sprice').addClass('color_pink').removeClass('color_999'); //价格文字还原
		}
	});

})
// Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9
function OnInput(event) {
	var oldguimi_currency = document.getElementById('guimi_currency').innerText;
	//当输入价格大于总龟米币时
	if(parseFloat(event.target.value) > parseFloat(oldguimi_currency)) {
		document.getElementById('input_integral').value = oldguimi_currency;
	} else {
		document.getElementById('input_integral').value = event.target.value;
	}

}
// Internet Explorer 兼容ie9一下
function OnPropChanged(event) {
	if(event.propertyName.toLowerCase() == "value") {
		var oldguimi_currency = document.getElementById('guimi_currency').innerText;
		//当输入价格大于总龟米币时
		if(parseFloat(event.target.value) > parseFloat(oldguimi_currency)) {
			document.getElementById('input_integral').value = oldguimi_currency;
		} else {
			document.getElementById('input_integral').value = event.target.value;
		}
	}
}
//支付完成之后的跳转判断
function toSuccessful(event){
	console.info(event)
	if(event==1){
		//跳转到已完成页面
		window.open('successfulTrade.html')
	}else{
		window.open('../html/oneYardPayment/newUserBinding.html')
	}
}
