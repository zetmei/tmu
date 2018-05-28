/////////////////////////////////////////////////////////////////////////////
$(function(){

	//首頁-最新消息-slider
	$(document).foundation({
		  orbit: {
		    animation: 'slide',
		    timer_speed: 5000,
		    pause_on_hover: true,
		    animation_speed: 500,
		    navigation_arrows: true
		  }
	});

//結束
});

/////////////////複製評核結果///////////////////////////////////////
$(function(){
	//radio切換頁籤
    $('input[name="radiotab"]').click(function () {
        $(this).parents('.radio_color').addClass('text-primary').parents('.radio_wrap').siblings().find('.radio_color').removeClass('text-primary');


    });


	//刪除名單
    $('.delete').click(
            function(){
                   $(this).parents('.id_wrap').fadeOut(0);
            }  
    );

    //軟體更新,每一個被點到都執行
      $('.radio_color').each(function(){

                $(this).click(
                   function(){     
                   //自己的打開 
                   $(this).siblings('.radio_box').slideDown(500);
                    $(this).parents('.radio_wrap').siblings().find('.radio_box').slideUp(500);

                  }
               );

      });

      
//結束
});

/////////////////房東物件///////////////////////////////////////
$(function(){
//商品內容頁小圖清單切換大圖
            $(".show_box img").eq(0).fadeIn(0).siblings().fadeOut(0);
            $('.list_box li').mouseover(
                   function(){  
                        // alert('123');
                        var NOW=$(this).index();        
                        $(".show_box img").eq(NOW).fadeIn(0).siblings().fadeOut(0);
                        $('.list_box li').eq(NOW).find('a').addClass('active');
                        $('.list_box li').eq(NOW).siblings().find('a').removeClass('active');
                  }
            );

      
//結束
});