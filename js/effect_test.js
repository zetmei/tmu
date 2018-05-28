/*/////////////////////////////////////////////////////////////////////////////
/*/////////////////////////////////////////////////////////////////////////////
/* 【 effect.js自行撰寫 請麻煩集中放這裡 多謝 】 海棠設計 Web Designer 林位青 alan lin*/
////////////////////////////////////////////////////////////////////////////*/
/*------------------------------------------------------------------
img[hover] 威力加強版2012.06
------------------------------------------------------------------*/
$(function() {     
	$('INPUT[type=image][hover], img[hover]').hover(function() {         
		$(this).attr('tmp', $(this).attr('src')).attr('src', $(this).attr('hover'))
		.attr('hover', $(this).attr('tmp')).removeAttr('tmp');})
		.each(function(){$('<img />').attr('src', $(this).attr('hover'));
	});
	$('.fade').append('<span class="hover"></span>').each(function () {
	  var $span = $('> span.hover', this).css('opacity', 0).css('position','absolute').css('top', 0).css('left', 0);
	  $(this).hover(function () {$span.stop().fadeTo(1000, 1);}, function () {$span.stop().fadeTo(1000, 0);});
	});
});
/*------------------------------------------------------------------
以下當內文高小於 使用者螢幕 變更內文高 讓FOOTER齊下
------------------------------------------------------------------*/
$(function(){
	
	var otherHeight =395;
	var wHeight = $(window).height() - otherHeight;
	var cHeight = $("div#content").height();
	
	$(window).load(function(){		
		//alert(wHeight +" / "+ cHeight);
		if(cHeight<wHeight){
			$("div#content").height(wHeight);
		}
	});
	
	$(window).resize(function(){
		wHeight = $(window).height() - otherHeight;
		if(cHeight<wHeight){
			$("div#content").height(wHeight);
		}
	});	
});
/*------------------------------------------------------------------
css3 PIE   checkbox
------------------------------------------------------------------*/
$(function(){
	$("input,textarea").not("input[type=image],input[type=radio],input[type=checkbox]").addClass("input_style");
	$("select").addClass("select_style");
	
});
/*
$(function() { if (window.PIE) { $('div#content div#left_nav ul#member').each(function() { PIE.attach(this); }); } }); 
$(function() { if (window.PIE) { $('input,textarea').each(function() { PIE.attach(this); }); } }); */
/*------------------------------------------------------------------

------------------------------------------------------------------*/
$(function(){
	//div#header ul#main_nav li:not(.main_nav0,.main_nav11),
	$("div#content div#right_div ul#news li:not(#News_Content_ICON),div#right_div ul#news li div.ICONF").click(function () {
		document.location.href = $(this).find("a").attr('href');;
		//window.open("news_content.html");;
	});
	$("div#header ul#main_nav li.main_nav0").click(function () {
		//alert('Please login');
	});
});

$(function(){
	$("div#content div#right_div #lease ul#room_info").click(function () {
		document.location.href = $(this).find("li.title a").attr('href');;
		//window.open("news_content.html");;
	});
});

/*------------------------------------------------------------------
visitation_notes.html
------------------------------------------------------------------*/
$(function(){
	$('div#content div#right_div #visitation_table tr.none').css('background-color','#f1ede5').hover(function(){
		$(this).css('background-color','#fff');
	},function(){
		$(this).css('background-color','#f1ede5');
	});
	var visitation_tr = $("div#content div#right_div #visitation_table tr.no");
	for (var i = 0; i < visitation_tr.length; i++)
	{
	    visitation_tr.find("td:lt(4)").css("cursor", "pointer");
	    visitation_tr.find("td:lt(4)").click(function () {
	        document.location.href = $(this).parents().find("a").attr('href');
	    });
	}

	
});
/*------------------------------------------------------------------
rent_content.html
------------------------------------------------------------------*/
	$(function(){
		// 先取得相關的區塊及預設要先顯示那一個
		var $block = $('#room_images'), 
			$link = $block.find('.link li'), 
			$showBox = $block.find('.showbox'), 
			_default = 0, 
			timer, speed = 3000;
		
		// 幫 $link a 加入一個 span.triangle, 用來產生三角形用
		$link.append('<span class="triangle"></span>');
		
		// 當滑鼠移到 $link 上時
		$link.mouseover(function(){
			var $this = $(this);
			
			// 修改 $showBox 中的超連結及圖片
			$showBox.html('<img src="'+$this.find('img').attr('src')+'" />');
			// 幫被滑鼠移上去的 li 加上 .on
			$this.addClass('on').siblings('.on').removeClass('on');
		}).click(function(){
			// 如果是點擊到 $link 時則取消連結功能
			return false;
		}).eq(_default).mouseover();
		
		var timer, speed = 3000
		$block.hover(function(){
			// 當滑鼠移入時, 停止計時器
			clearTimeout(timer);
		}, function(){
			// 當滑鼠移出時, 啟動計時器
			timer = setTimeout(auto, speed);
		});
		
		// 用來自動輪播使用
		function auto(){
			var _index = $link.filter('.on').index();
			_index = (_index + 1) % $link.length;

			$link.eq(_index).mouseover();
			timer = setTimeout(auto, speed);
		}
		
		// 啟動計時器
		timer = setTimeout(auto, speed);
	});
/*------------------------------------------------------------------
news_content.html 字放大
------------------------------------------------------------------*/
$(function(){
	var _dafaultFOntSize = $('#News_Content,#Finance_Content').css('font-size');
	$('#News_Content_ICON .big,#Finance_Content_ICON .big').click(function(){
		// 取得目前的字型大小並轉成數字
		// 接著 * 1.2 後無條件進位
		var _currentFontSize = $('#News_Content,#Finance_Content').css('font-size'),
			_fontSizeNum = parseInt(_currentFontSize, 10),
			_newFontSizeNum = Math.ceil(_fontSizeNum * 1.2);	
		// 設定新的字型大小
		$('#News_Content,#Finance_Content').css('font-size', _newFontSizeNum);
	});
	$('#News_Content_ICON .middle,#Finance_Content_ICON .middle').click(function(){
		// 設定回預設的字型大小
		$('#News_Content,#Finance_Content').css('font-size', _dafaultFOntSize);
	});
	$('#News_Content_ICON .small,#Finance_Content_ICON .small').click(function(){
		// 取得目前的字型大小並轉成數字
		// 接著 * 0.8 後無條件進位
		var _currentFontSize = $('#News_Content,#Finance_Content').css('font-size'),
			_fontSizeNum = parseInt(_currentFontSize, 10),
			_newFontSizeNum = Math.ceil(_fontSizeNum * 0.8);	
		// 設定新的字型大小
		$('#News_Content,#Finance_Content').css('font-size', _newFontSizeNum);
	});
});
	
/*------------------------------------------------------------------
visitation_list.php
------------------------------------------------------------------*/
$(function(){
	$(".calender").magiCalender();	
});