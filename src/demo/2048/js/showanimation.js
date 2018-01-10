//数字显示动画
function show_number_with_animation (i, j, rand_number) {
	//将要显示的数字放到指定位置
	var number_cell = $('#number_cell_' + i + '_' + j);
	number_cell.css({
		'background-color': get_number_background_color(rand_number),
		'color': get_number_color(rand_number)
	});
	number_cell.text(rand_number);
	number_cell.animate({
		width: cell_side_length,
		height: cell_side_length,
		top: get_pos_top(i, j),
		left: get_pos_left(i, j)
	}, 50);
}
//移动动画效果
function show_move_animation (fromX, fromY, toX, toY) {
	var number_cell = $('#number_cell_' + fromX + '_' + fromY);
	number_cell.animate({
		top: get_pos_top(toX, toY),
		left: get_pos_left(toX, toY)
	}, 200);
}
//更新得分
function update_score (score) {
	$('#score').text(score);
}
