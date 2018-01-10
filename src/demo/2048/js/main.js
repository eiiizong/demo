
var board = [],
	//得分
	score = 0,
	//
	has_conflicted = [],
	//
	startX = 0,
	//
	startY = 0,
	//
	endX = 0,
	//
	endY = 0,
	//
	success_string = 'Success',
	//
	gameover_string = 'Game Over';

$(function () {
	prepare_for_mobile();
	new_game();
});

function new_game() {
	//初始化棋盘
	init(); 
	//随机在两个格子生成数字
	generate_one_number();
	generate_one_number();
}

//初始化棋盘
function init() {
	$('.mask').hide();
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			//获取所有的格子
			var grid_cell = $('#grid_cell_' + i + '_' + j);
			//将背景格子分开展现
			grid_cell.css({
				'top': get_pos_top(i, j),
				'left': get_pos_left(i, j)
			});
		}
	}
	
	for (let i = 0; i < 4; i++) {
		// [[], [], [], []]
		board[i] = [];
		// [[], [], [], []]
		has_conflicted[i] = [];
		for (let j = 0; j < 4; j++) {
			board[i][j] = 0;//[[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
			//[[false,false,false,false], [false,false,false,false], [false,false,false,false], [false,false,false,false]]
			has_conflicted[i][j] = false;
		}
	}
	
	update_board_view();
	//初始化得分为 0
	score = 0;
	//更新得分
	update_score(score);
	
}

//更新棋盘视图
function update_board_view() {
	//移除所有类名 number_cell的div
	$('.number_cell').remove();
	//循环遍历
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			//添加16个class="number_cell"的格子
			$('#grid_container').append('<div class="number_cell" id="number_cell_' + i + '_' + j + '"></div>');
			//获取刚添加的格子
			var number_cell = $('#number_cell_' + i + '_' + j);
			//判断该格子的数值是否为 0 分别设置不同的样式
			if (board[i][j] === 0) {
				number_cell.css({
					'width': '0px',
					'height': '0px',
					'top': get_pos_top(i, j) + cell_side_length / 2,
					'left': get_pos_left(i, j) + cell_side_length / 2
				});
			} else {
				number_cell.css({
					'width': cell_side_length,
					'height': cell_side_length,
					'top': get_pos_top(i, j),
					'left': get_pos_left(i, j),
					//为不同的数字设置不同的背景颜色和字体颜色
					'background-color': get_number_background_color(board[i][j]),
					'color': get_number_color(board[i][j]) 
				});
				number_cell.text(board[i][j]);
			}
			has_conflicted[i][j] = false;
		}
	}
	//设置行高让字体居中
	$('.number_cell').css({
		'line-height': cell_side_length + 'px',
		'font-size': 0.6 * cell_side_length + 'px'
	});
}

function generate_one_number() {
	//如果所有格子都不为 0，则无法生成新的数字
	if (nospace(board)) {
		return false;
	}
	
	//随机一个位置生成数字
	var randX = parseInt(Math.floor(Math.random() * 4));//0-3
	var randY = parseInt(Math.floor(Math.random() * 4));//0-3
	
	var time = 0;
	//循环50次查找是否有为0的格子 找到则退出
	while (time < 50) {
		if (board[randX][randY] == 0) {
			break;
		}
		randX = parseInt(Math.floor(Math.random() * 4));
		randY = parseInt(Math.floor(Math.random() * 4));
		time++;
	}
	//如果遍历50次仍然没有找到0 就依次遍历所有
	if (time == 50) {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (board[i][j] == 0) {
					randX = i;
					randY = j;
				}
			}
		}
	}
	
	var rand_number = Math.random() < 0.5 ? 2 : 4;
	board[randX][randY] = rand_number;
	//动画效果出现
	show_number_with_animation(randX, randY, rand_number);
	return true;
}

$(document).keydown(function (event) {
	//如果得分为success_string
	if ($('#score').text() == success_string) {
		new_game();
		return;
	}
	//针对上下左右按键进行补贴的操作
	switch (event.keyCode) {
		case 37: //left
		case 65: 
			event.preventDefault();//阻止默认行为
			if (move_left()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			}
			break;
		case 38: //up
		case 87:
			event.preventDefault();
			if (move_up()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			}
			break;
		case 39: //right
		case 68: 
			event.preventDefault();
			if (move_right()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			}
			break;
		case 40: //down
		case 83: 
			event.preventDefault();
			if (move_down()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			}
			break;
		default:
			break;
	}
});

document.addEventListener('touchstart', function (event) {
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
});

document.addEventListener('touchmove', function (event) {
	event.preventDefault();
});

document.addEventListener('touchend', function (event) {
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;
	
	var deltaX = endX - startX;
	var deltaY = endY - startY;
	
	if (Math.abs(deltaX) < 0.3 * document_width && Math.abs(deltaY) < 0.3 * document_width) {
		return;
	}
	if ($('#score').text() == success_string) {
		new_game();
		return;
	}
	
	//X
	if (Math.abs(deltaX) >= Math.abs(deltaY)) {
		if (deltaX > 0) {
			// move right
			if (move_right()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			}
		} else {
			//move left
			if (move_left()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			}
		}
	} else {
		if (deltaY > 0) {
			// move down
			if (move_down()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			} 
		} else {
			//move up
			if (move_up()) {
				setTimeout('generate_one_number()', 210);
				setTimeout('is_gameover()', 300);
			}
		}
	}
});

//左移 返回true或者false
function move_left () {
	//如果不能向左移动则退出函数
	if (!can_move_left(board)) {
		return false;
	}
	
	//move left
	for (let i = 0; i < 4; i++) {
		for (let j = 1; j < 4; j++) {
			//如果该空格有数字不为0
			if (board[i][j] != 0) {
				for (let k = 0; k < j; k++) {
					//如果为真
					if (board[i][k] == 0 && no_block_horizontal(i, k, j, board)) {
						//前两个参数是原本位置，后两个参数是要移动到的位置
						show_move_animation(i, j, i, k);
						//ik位置的数字变为ij的值
						board[i][k] = board[i][j];
						//原来的ij变为0
						board[i][j] = 0;
						break;
					} else if (board[i][k] == board[i][j] && no_block_horizontal(i, k, j, board) && !has_conflicted[i][k]) {
						show_move_animation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						update_score(score);
						has_conflicted[i][k] = true;
						break;
					}
				}
			}
		}
	}
	setTimeout('update_board_view()', 200);
	return true;
}

function move_right() {
	if (!can_move_right(board)) {
		return false;
	}
	//move right
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > j; k--) {
					if (board[i][k] == 0 && no_block_horizontal(i, j, k, board)) {
						show_move_animation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[i][k] == board[i][j] && no_block_horizontal(i, j, k, board) && !has_conflicted[i][k]) {
						show_move_animation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						update_score(score);
						has_conflicted[i][k] = true;
						break;
					}
				}
			}
		}
	}
	setTimeout('update_board_view()', 200);
	return true;
}

function move_up() {
	if (!can_move_up(board)) {
		return false;
	}
	//move up
	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < i; k++) {
					if (board[k][j] == 0 && no_block_vertical(j, k, i, board)) {
						show_move_animation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[k][j] == board[i][j] && no_block_vertical(j, k, i, board) && !has_conflicted[k][j]) {
						show_move_animation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[k][j];
						update_score(score);
						has_conflicted[k][j] = true;
						break;
					}
				}
			}
		}
	}
	setTimeout('update_board_view()', 200);
	return true;
}

function move_down() {
	if (!can_move_down(board)) {
		return false;
	}
	//move down
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > i; k--) {
					if (board[k][j] == 0 && no_block_vertical(j, i, k, board)) {
						show_move_animation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					} else if (board[k][j] == board[i][j] && no_block_vertical(j, i, k, board) && !has_conflicted[k][j]) {
						show_move_animation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[k][j];
						update_score(score);
						has_conflicted[k][j] = true;
						break;
					}
				}
			}
		}
	}
	setTimeout('update_board_view()', 200);
	return true;	
}

function is_gameover() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 2048) {
				update_score(success_string);
				return;
			}
		}
	}
	if (nospace(board) && nomove(board)) {
		gameover();
	}
	
}

function gameover() {
	//update_score(gameover_string);
	//$('#new_game_button').css('background-color', '#fff');
	$('.mask').show();
	$('new_game_button2').on('click', init);
	
}

function prepare_for_mobile() {
	if (document_width > 500) {
		grid_container_width = 500;
		cell_side_length = 100;
		cell_space = 20;
	}
	$('#grid_container').css('width', grid_container_width - 2 * cell_space);
	$('#grid_container').css('height', grid_container_width - 2 * cell_space);
	$('#grid_container').css('padding', cell_space);
	$('#grid_container').css('border-radius', 0.02 * grid_container_width);
	$('.grid_cell').css('width', cell_side_length);
	$('.grid_cell').css('height', cell_side_length);
	$('.grid_cell').css('border-radius', 0.02 * grid_container_width);
}