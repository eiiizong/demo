$(function(){function o(){var o=$(window).width()<768;$("#slider-eiiizong .item > .images").each(function(i,n){var t=$(n),e=o?"images-xs":"image-lg",c=t.data(e);t.css("backgroundImage","url("+c+")"),o?t.html('<img src="'+c+'" />'):t.empty()});var i=30;$(".scorll ul li").each(function(o,n){i+=$(n).width()}),$(window).width()<i?$(".scorll ul").css("width",i).parent().css("overflow-x","scroll"):$(".scorll ul").css("width","100%").parent().css("overflow","hidden")}o(),$(window).on("resize",o),$('[data-toggle="tooltip"]').tooltip(),$("#news .nav-stacked a").on("click",function(){var o=$(this).data("title");$("#news .row .col-md-offset-3 > p").text(o)});var i,n=$("#slider-eiiizong");n.on("touchstart",function(o){i=o.originalEvent.changedTouches[0].clientX,console.log(i)}),n.on("touchmove",function(o){endX=o.originalEvent.changedTouches[0].clientX;var n=Math.abs(endX-i),t=endX-i>0?"prev":"next";n>=50&&$(this).carousel(t)})});