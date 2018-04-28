Zepto(function($) {
	//页面加载之后默认操作
	$('.payment_deductible .span_r .input_integral').attr('disabled', 'true');
	$('.payment_deductible .span_r .span_sprice').addClass('color_999').removeClass('color_pink'); //价格文字变灰
	$('.payment_deductible .span_r .span_sprice').val('0');
	var oldguimi_currency = $('#guimi_currency').val();

	//是否选择金币支付
	//	$("#btn_checkbox").on('click', function() {
	//		if(!$("#btn_checkbox").is(':checked')) {
	//			//不选择
	//			$('.payment_deductible .span_r .input_integral').attr('disabled', 'true');
	//			$('.payment_deductible .span_r .span_sprice').addClass('color_999').removeClass('color_pink'); //价格文字变灰
	//		} else {
	//			$('.payment_deductible .span_r .input_integral').removeAttr('disabled');
	//			$('.payment_deductible .span_r .span_sprice').addClass('color_pink').removeClass('color_999'); //价格文字还原
	//		}
	//	});

	//选择金币弹窗
	$('#choice_gcoin').on('click', function() {
		$('.park_bg').toggle();
		//		$('.choice_guibi').slideDown().fadeIn(600);
		$('.choice_guibi').toggle();
	})
	//关闭选择金币弹窗
	$('.choice_guibi .btn_parkclose').on('click', function() {
		$('.park_bg').toggle();
		$('.choice_guibi').toggle();
	})

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
function toSuccessful(event) {
	console.info(event)
	if(event == 1) {
		//跳转到已完成页面
		window.open('successfulTrade.html')
	} else {
		window.open('../html/onePay/newUserBinding.html')
	}
}

/**限制input只能小数点后两位
 * 实时动态强制更改用户录入
 * arg1 inputObject
 **/
function amount(th) {
	var spriceValue = th.value;
	var regStrs = [
		['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
		['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
		['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
		['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
	];
	console.info("spriceValue", spriceValue.length)

	for(i = 0; i < regStrs.length; i++) {
		var reg = new RegExp(regStrs[i][0]);
		th.value = th.value.replace(reg, regStrs[i][1]);
		console.info(th.value)
	}
	if(spriceValue.length > 3) {
		if(spriceValue < 0.01) {
			showError('输入的金额不能小于0.01，请重新输入');
			th.value='';
		}
	}

}

/**
 * 录入完成后，输入模式失去焦点后对录入进行判断并强制更改，并对小数点进行0补全
 * arg1 inputObject
 * 其实有一种可以更快速的JavaScript内置函数可以提取杂乱数据中的数字：
 * parseFloat('10');
 **/
function overFormat(th) {
	var v = th.value;
	if(v === '') {
		v = '0.00';
	} else if(v === '0') {
		v = '0.00';
	} else if(v === '0.') {
		v = '0.00';
	} else if(/^0+\d+\.?\d*.*$/.test(v)) {
		v = v.replace(/^0+(\d+\.?\d*).*$/, '$1');
		v = inp.getRightPriceFormat(v).val;
	} else if(/^0\.\d$/.test(v)) {
		v = v + '0';
	} else if(!/^\d+\.\d{2}$/.test(v)) {
		if(/^\d+\.\d{2}.+/.test(v)) {
			v = v.replace(/^(\d+\.\d{2}).*$/, '$1');
		} else if(/^\d+$/.test(v)) {
			v = v + '.00';
		} else if(/^\d+\.$/.test(v)) {
			v = v + '00';
		} else if(/^\d+\.\d$/.test(v)) {
			v = v + '0';
		} else if(/^[^\d]+\d+\.?\d*$/.test(v)) {
			v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1');
		} else if(/\d+/.test(v)) {
			v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1');
			ty = false;
		} else if(/^0+\d+\.?\d*$/.test(v)) {
			v = v.replace(/^0+(\d+\.?\d*)$/, '$1');
			ty = false;
		} else {
			v = '0.00';
		}
	}
	th.value = v;
}
//弹窗错误提示
function showError(txt) {
	document.getElementById('showError').style.display = 'block';
	document.getElementById('errorTxt').innerHTML = txt;
	setTimeout(function() {
		document.getElementById('showError').style.display = 'none';
		document.getElementById('errorTxt').innerHTML = '';
	}, 2000)
}