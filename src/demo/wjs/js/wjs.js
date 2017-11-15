//自定义 JS 
$(function() {
	function resize() {
		//获取当前屏幕宽度
		var windowWidth = $(window).width();
		//判断当前屏幕宽度是否小于768px
		var isScreenSmall = windowWidth < 768;
		//遍历 .images
		$('#slider-eiiizong .item > .images').each(function(index,ele) {
			//将DOM对象转换为jQuery对象
			var $image = $(ele);
			//获取 HTML 标签中 的属性 data-images-* 的值
			var dataImage = isScreenSmall?'images-xs':'image-lg';
			var imageSrc = $image.data(dataImage);
			$image.css('backgroundImage','url('+ imageSrc +')');
			if(isScreenSmall) {
				$image.html('<img src="'+ imageSrc +'" />');
			} else {
				$image.empty();
			}
		});
		
		//给产品列表在移动端访问时添加滚动条
		var width = 30;
		$('.scorll ul li').each(function(i,e) {
			width += $(e).width();
		});
		if($(window).width() < width) {
			$('.scorll ul')
			.css('width',width)
			.parent()
			.css('overflow-x',"scroll");
		}else {
			$('.scorll ul')
			.css('width',"100%")
			.parent()
			.css('overflow',"hidden");
		}
	}
	resize();
	//triggle() 方法触发函数执行一次
	$(window).on('resize',resize);
	
	//小图标提示
	$('[data-toggle="tooltip"]').tooltip();
	
	//新闻
	$('#news .nav-stacked a').on('click', function() {
		var datas = $(this).data('title');
		$('#news .row .col-md-offset-3 > p').text(datas);
	});
	
	
	//手机端左右滑动轮播图
	var slider = $('#slider-eiiizong');
	var startX, entX;
	var num = 50;
	slider.on('touchstart',function(e) {
		startX = e.originalEvent.changedTouches[0].clientX;
		console.log(startX);
	});
	slider.on('touchmove',function(e) {
		endX = e.originalEvent.changedTouches[0].clientX;
		var abs = Math.abs(endX-startX);
		var fx = endX-startX>0?'prev':'next';
		if(abs >= num) {
			$(this).carousel(fx);
		}
	});
	
	
});
