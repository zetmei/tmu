//宣告window的東西不要放fonction裡面
var $win = $(window);

/////////////////////////////////////北醫layout共用物////////////////////////////////////////
$(function(){

    //foundation(banner換圖,最新消息slider)
    $(document).foundation();

   //手機選單
   $('.menu-icon').click(
            function(){
                  $(".nav-mobile").slideToggle()
            }  
    );


//結束
});
/////////////////////////////////////做網頁時網頁共用物/////////////////////////////////////////
$(function(){
	//取消連結虛線
    $("a").focus(function(){
         $(this).blur();
     }); 
    $("button").focus(function(){
         $(this).blur();
     }); 

	//判定IE8
    $(function(){
	     var WHAT = navigator.userAgent;
	     if(WHAT.match(/(MSIE 5.0|MSIE 6.0|MSIE 7.0|MSIE 8.0)/)){
	      // alert("123")
	     window.location="update.html";
     }
    });

    //支援IE9 placeholder
    var Browser = {
            IsIe: function () {
                return navigator.appVersion.indexOf("MSIE") != -1;
            },
            Navigator: navigator.appVersion,
            Version: function() {
                var version = 999; // we assume a sane browser
                if (navigator.appVersion.indexOf("MSIE") != -1)
                    // bah, IE again, lets downgrade version number
                    version = parseFloat(navigator.appVersion.split("MSIE")[1]);
                return version;
            }
        };

    if (Browser.IsIe() && Browser.Version() <= 9) {
         // Placeholder fix for IE
          $('input').focus(function() {
            var i = $(this);
            if(i.val() == i.attr('placeholder')) {
              i.val('').removeClass('placeholder');
              if(i.hasClass('password')) {
                i.removeClass('password');
                this.type='password';
              }     
            }
          }).blur(function() {
            var i = $(this);  
            if(i.val() == '' || i.val() == i.attr('placeholder')) {
              if(this.type=='password') {
                i.addClass('password');
                this.type='text';
              }
              i.addClass('placeholder').val(i.attr('placeholder'));
            }
          }).blur().parents('form').submit(function() {
            //if($(this).validationEngine('validate')) { // If using validationEngine
              $(this).find('[placeholder]').each(function() {
                var i = $(this);
                if(i.val() == i.attr('placeholder'))
                  i.val('');
                  i.removeClass('placeholder');

              })
            //}
          });
    }
   if (Browser.IsIe() && Browser.Version() <= 9) {
         // Placeholder fix for IE
          $('textarea').focus(function() {
            var i = $(this);
            if(i.val() == i.attr('placeholder')) {
              i.val('').removeClass('placeholder');
              if(i.hasClass('password')) {
                i.removeClass('password');
                this.type='password';
              }     
            }
          }).blur(function() {
            var i = $(this);  
            if(i.val() == '' || i.val() == i.attr('placeholder')) {
              if(this.type=='password') {
                i.addClass('password');
                this.type='text';
              }
              i.addClass('placeholder').val(i.attr('placeholder'));
            }
          }).blur().parents('form').submit(function() {
            //if($(this).validationEngine('validate')) { // If using validationEngine
              $(this).find('[placeholder]').each(function() {
                var i = $(this);
                if(i.val() == i.attr('placeholder'))
                  i.val('');
                  i.removeClass('placeholder');

              })
            //}
          });
    }


//結束
});

////////////////////////////////////////////////視窗resize、翻轉
$(window).on("resize orientationchange",function(){

            var _width = $win.width();         
               
            if(_width>=1024){
               //  $(".search_open").hide();
               // $(".search_more").show();
            }else{
              // $(".search_open").show();
              //  $(".search_close").hide();
            };  
      

 }).resize();