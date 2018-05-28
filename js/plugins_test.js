/*/////////////////////////////////////////////////////////////////////////////
【 plugins.js外掛插件 請麻煩集中放這裡 多謝 】 海棠設計 Web Designer 林位青 alan lin
////////////////////////////////////////////////////////////////////////////*/
var d = new Date();
var month = d.getMonth();
var year = d.getFullYear();
var date = d.getDate();
var day = d.getDay();
var monthsArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
var monthsShorthand = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
var daysArray = new Array("Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun");
var eventsArray = new Array();
var dmPriority = "m";
var meetingTime = new Array();
var notes = new Array();
var timestamp = new Array();

;(function($){
	$.score = function(base, abbreviation, offset){
		offset = offset || 0;
		
		if(abbreviation.length == 0) return 0.9;
		if(abbreviation.length > base.length) return 0.0;
		
		for(var i = abbreviation.length; i > 0; i--){
			var sub_abbreviation = abbreviation.substring(0,i);
			var index = base.indexOf(sub_abbreviation);
			
			if(index < 0) continue;
			if(index + abbreviation.length > base.length + offset) continue;
			
			var next_string = base.substring(index+sub_abbreviation.length);
			var next_abbreviation = null;
			
			if(i >= abbreviation.length) next_abbreviation = '';
			else next_abbreviation = abbreviation.substring(i);
			
			var remaining_score = $.score(next_string, next_abbreviation,offset+index);
			
			if(remaining_score > 0){
				var score = base.length-next_string.length;
				
				if(index != 0){
					var j = 0;
					var c = base.charCodeAt(index-1);
					if(c==32 || c == 9){
						for(var j=(index-2); j >= 0; j--) {
							c = base.charCodeAt(j);
							score -= ((c == 32 || c == 9) ? 1 : 0.15);
						}
					}
					else{
						score -= index;
					}
				}
				score += remaining_score * next_string.length;
				score /= base.length;;
				return score;
			}
		}
		return 0.0;
	}
})(jQuery);

function pad(n, l){
	n = n+"";
	while(n.length < l){
		n = "0"+n;
	}
	return n;
}

function getDays(m, y){
	var monthLengthArray = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	y += Math.floor(m / 12);
	m = m % 12;
	if(m < 0){
		m += 12;
	}
	
	var dayNumber = monthLengthArray[m];
	if(m == 1 && (y % 4) == 0 && ((y % 100) != 0 || (y % 400) == 0)){
		dayNumber++;
	}
	
	return dayNumber;
}
function getDateDays(tMonth, month, year, date){
	var dayNumber = date;
	
	while(tMonth != month){
		if(tMonth > month){
			tMonth--;
		}
		dayNumber -= getDays(tMonth, year);
		if(tMonth < month){
			tMonth++;
		}
	}
	
	return dayNumber;
}

function createCalender(obj){
	var iHTML = '';
	iHTML += '<div class="in">';
		iHTML += '<div class="header">';
			iHTML += '<div class="searchHolder">';
				iHTML += '<input type="button" class="home" value="" />';
			iHTML += '</div>';
			iHTML += '<div class="arrowHolder">';
				iHTML += '<input type="button" class="arrow left" value="" />';
				iHTML += '<input type="button" class="arrow right" value="" />';
			iHTML += '</div>';
			iHTML += '<h1 class="monthYear"></h1>';
		iHTML += '</div>';
		iHTML += '<div class="days">';
		for(var i = 0; i < 7; i++){
			iHTML += '<div>'+daysArray[i]+'</div>';
		}
		iHTML += '</div>';
		iHTML += '<div class="dates"></div>';
	iHTML += '</div>';
	
	var calenderBigBG = new Image();
	var modalBG = new Image();
	var searchSubmit = new Image();
	var searchText = new Image();
	
	
	
	obj.innerHTML = iHTML;
}

function fillCalender(obj, tMonth, tYear, highlight){
	var calenderObj = obj.parentNode.parentNode;
	var mod = ((day - getDateDays(tMonth, month, year, date)) % 7);
	if(mod < 0){
		mod += 7;
	}
	if(tMonth < month){
		mod = 6 - mod;
	}
	var targetYear = Math.floor(tMonth / 12) + tYear;
	var targetMonth = tMonth % 12;
	if(targetMonth < 0){
		targetMonth += 12;
	}
	
	var iHTML = "";
	var c = 0;
	for(var i = 0; i < mod; i++){
		iHTML += '<div class="out">'+(getDays(tMonth-1, tYear)-mod+i+1)+'</div>';
		c++;
	}
	for(var i = 1; i <= getDays(tMonth, tYear); i++){
		var classVal = "date";
		if(highlight == i){
			classVal += " searched";
		}
		if(date == i && month == tMonth && year == tYear){
			classVal += " today";
		}
		
		var span = 0;
		var orders = 0;
		var importantJ;
		for(var j = 0; j < eventsArray.length; j++){
			if(eventsArray[j][0] == calenderObj){
				importantJ = j;
				for(var k = 0; k < eventsArray[j][1].length; k++){
					if(i == eventsArray[j][1][k][1] && targetMonth+1 == eventsArray[j][1][k][0] && targetYear == eventsArray[j][1][k][2]){
						span++;
						if(eventsArray[j][1][k][3]!=""){orders++;}
					}
				}
			}
		}
		var onClickVal = "";
		if(span == 0){
			span = "";
			onClickVal = ' onclick="showDateDetails('+importantJ+', '+i+', '+targetMonth+', '+targetYear+')"';
		}
		else{
			if(orders>0){
			span = "<span>"+orders+" 筆預約</span>";
			}else{
			span = "";	
			}
			classVal += " highlight";
			onClickVal = ' onclick="showDateDetails('+importantJ+', '+i+', '+targetMonth+', '+targetYear+')"';
		}
		var divid = targetYear+"_"+targetMonth+"_"+i;
		iHTML += '<div class="'+classVal+'" id="'+divid+'"'+onClickVal+'><p class="number">'+i+'</p>'+span+'</div>';
		c++;
	}
	mod = 8 - (c % 7);
	if((mod >= 0 && mod < 8) || c <= 28){
		for(var i = 1; i < mod; i++){
			iHTML += '<div class="out">'+i+'</div>';
			c++;
		}
	}
	obj.innerHTML = iHTML;
	if(c > 35){
		calenderObj.style.height = "465px";
	}
	else{
		calenderObj.style.height = "400px";
	}
	
	
	jQuery(".monthYear", obj.parentNode).each(function(){
		this.innerHTML = monthsArray[targetMonth]+" "+targetYear;
	});
}

function changeDate(arrowCounterP, obj, highlight){
	var Dir = "left";
	if(arrowCounterP < arrowCounter){
		Dir = "right";
	}
	jQuery(".dates", obj).fadeOut(200, function(){
		jQuery(".dates", obj).each(function(){
			fillCalender(this, month+arrowCounterP, year, highlight);
		});
		jQuery(".header", obj).effect("shake", {times: 1, distance: 10, direction: Dir}, 100);
		$(this).fadeIn(500);
	});
	
	return arrowCounterP;
}


function showDateDetails(j, targetDay, targetMonth, targetYear){
    var datesArray = eventsArray[j][1];
    var iHTML = "";
	for (var k = 0; k < datesArray.length; k++) {
		if(targetDay == datesArray[k][1] && targetMonth+1 == datesArray[k][0] && targetYear == datesArray[k][2]){
			//iHTML += "<h1>"+datesArray[k][2]+"/"+datesArray[k][0]+"/"+datesArray[k][1]+"</h1><p>"+datesArray[k][4]+"</p>";
			iHTML += "<h1>"+targetYear+"/"+(targetMonth+1)+"/"+targetDay+"</h1><p>"+datesArray[k][4]+"</p>";
		}
	}
	
	var box = jQuery(".date", eventsArray[j][0]).get(targetDay-1);
	
	$("#calenderModal:hidden").fadeIn(100, function () {
	    $("#dateInfoBox:hidden").fadeIn(100);
	});
	
	$("#dateInfoBox").draggable({cancel: 'button', handle: 'h1:first'});
	
	$("#dateInfoBox").each(function(){
		
	    set_dateInfoBox(targetYear, targetMonth, targetDay);

		var offset = $(box).offset();
		
		this.style.top = (offset.top)+"px";
		this.style.left =(offset.left+243)+"px";;

		//jQuery("#dateInfoScroller", this).each(function () {
		//	this.innerHTML = iHTML;
		//});
	});
}
function hideInfoBox(){
	$("#dateInfoBox").fadeOut(200, function(){
		$("#calenderModal").fadeOut(400);
	});
}

var arrowCounter = 0;
jQuery.fn.magiCalender = function(priority, customDays, customMonths, customMonthsShort){
	if(customDays) daysArray = customDays;
	if(customMonths) monthsArray = customMonths;
	if(customMonthsShort) monthsShorthand = customMonthsShort;
	if(priority) dmPriority = priority;
	this.each(function(){
		this.style.overflow = "hidden";
		var allDates = new Array();
		jQuery(".event", this).each(function(){
			var dates = new Array();
			var date = jQuery("h2", this).get(0).innerHTML.split(/[.\\/]/);
			for(var i = 0; i < 3; i++){
				dates[i] = parseFloat(date[i]);
			}
			dates[3] = jQuery("h1", this).get(0).innerHTML;
			dates[4] = jQuery("p", this).get(0).innerHTML;
			allDates.push(dates);
		});
		eventsArray.push(new Array(this, allDates));
		
		createCalender(this);
		
		var calender = this;
		
		jQuery(".dates", this).each(function(){
			fillCalender(this, month, year);
		});
		jQuery(".arrow.left", this).click(function(){
			this.blur();
			if(arrowCounter>0){arrowCounter = changeDate(arrowCounter-1, calender);}
			
		});
		jQuery(".arrow.right", this).click(function(){
			this.blur();
			if(arrowCounter<3){arrowCounter = changeDate(arrowCounter+1, calender);}
		});
		
		jQuery(".home", this).click(function(){
			this.blur();
			arrowCounter = changeDate(0, calender);
		});
	});
	
	$("body").each(function(){
		var modal = document.createElement("div");
		modal.id = "calenderModal";
		this.appendChild(modal);
		
		
		var dateInfo = document.createElement("div");
		dateInfo.id = "dateInfoBox";
		iHTML = "";
		iHTML += '<a href="javascript: hideInfoBox();" style="line-height:0;"><div class="cross"></div></a>';
		iHTML += '<div id="dateInfoDate"></div>';
		iHTML += '<div id="dateInfoScroller"></div>';		
		iHTML += '<a href="javascript:;" onClick="setTeacherTime();">確認</a>';
		
		dateInfo.innerHTML = iHTML;
		modal.appendChild(dateInfo);
	});
};

function set_dateInfoBox(_year, _month, _day){
    /*
        meetingTime[i] = x
		notes[i] = y
        i：
        0:8-9     1:9-10     2:10-11    3:11-12    4:12-13
        5:14-15   6:15-16    7:17-18    8:18-19    9:19-20
        10:20-21  11:21-22
        x：
        0:不顯示    1:未選取    2:已選取    3:無法選取
		y：注解文字
    */
    
	$.ajax({
		url: 'load_time.php',
		type: 'post',
		dataType: 'json',
		data: 'y='+_year+'&m='+(_month + 1)+'&d='+_day ,
		beforeSend: function() {
			$("#dateInfoDate").html("");
			$("#dateInfoScroller").html("");
		},
		success: function(json) {
			meetingTime=json["meetingTime"];
			notes=json["notes"];
			timestamp=json["timestamp"];
		    //顯示日期
			iHTML = "<h1>" + _year + "/" + (_month + 1) + "/" + _day + "</h1>";
			$("#dateInfoDate").html(iHTML);
		
			//顯示時間
			$("#dateInfoScroller").html("");
			var startTime = 8;

		    //全選選項
			var box = $("<div></div>");
			box.addClass("squaredFour");
			var obj = $("<input>");
			obj.attr("type", "checkbox");
			obj.attr("name", "all_date_start");
			obj.attr("id", "squaredFour_selectAll");
			obj.click(function () { selectAllDateInfoBox(this); });
			iHTML = '<label for="squaredFour_selectAll"></label>';
			iHTML += "<span>全選</span>";
			iHTML += '<input type="hidden" name="date_select" value="'+_year + "/" + (_month + 1) + "/" + _day+'" id="date_select">';
			box.append(obj);
			box.append(iHTML);
			$("#dateInfoScroller").append(box);

		    //加入選項
			for (i = 0; i < meetingTime.length; i++) {
				if (meetingTime[i] != 0) {
					box = $("<div></div>");
					box.addClass("squaredFour");
					obj = $("<input>");
					obj.attr("type", "checkbox");
					obj.attr("name", "date_start[]");
					obj.attr("value", timestamp[i]);
					obj.attr("id", "squaredFour" + parseInt(startTime + i));
					iHTML = '<label for="squaredFour' + parseInt(startTime + i) + '"></label>';
					iHTML += "<span>" + parseInt(startTime + i) + ":00-" + parseInt(startTime + i + 1) + ":00 <span class='student_booking'>" + notes[i] + "</span></span>";
					switch (meetingTime[i]) {
						case 2:
							obj.attr("checked", "checked");
							break;
						case 3:
							box.addClass("disabled");
							obj.attr("disabled", "disabled");
							break;
					}
		
					box.append(obj);
					box.append(iHTML);
					$("#dateInfoScroller").append(box);
				}
			}
			
		}
	});
}

function selectAllDateInfoBox(e) {
    var objs = $("#dateInfoScroller").find("input[type=checkbox]");
    objs.attr("checked", $(e).attr("checked"));
}

function setTeacherTime(){
	var date_start = $('input[name=\'date_start[]\']:checked').map(function () {
	  return this.value;
	}).get();
	var date_select=$('input[name=\'date_select\']').val();
	//alert(date_select);
	$.ajax({
		url: 'setTeacherTime.php',
		type: 'post',
		dataType: 'json',
		data: 'data='+date_start+'&date_select='+date_select ,
		success: function(json) {
			if(json["error"]){
				alert(json["error"]);
			}else{
			
			set_dateInfoBox(json["y"],json["m"],json["d"]);
			
			if(json["nums"]==0){
				$('#'+json["y"]+'_'+json["m"]+'_'+json["d"]).removeClass("highlight");
			}else{
				$('#'+json["y"]+'_'+json["m"]+'_'+json["d"]).addClass("highlight");
			}
			if(json["success"]){alert(json["success"]);}
			}
			hideInfoBox();
		}
	});

}