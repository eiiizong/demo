document_width = window.screen.availWidth;
grid_container_width = 0.92 * document_width;
cell_side_length = 0.18 * document_width;
cell_space = 0.04 * document_width;

function get_pos_top (i, j) {
	return cell_space + i * (cell_space + cell_side_length);
}

function get_pos_left (i, j) {
	return cell_space + j * (cell_space + cell_side_length);
}

//设置不同数字的不同背景颜色的函数
function get_number_background_color (number) {
	switch (number) {
		case 2: return '#eee4da'; break;
		case 4: return '#ede0c8'; break;
		case 8: return '#f2b179'; break;
		case 16: return '#f59563'; break;
		case 32: return '#f67c5f'; break;
		case 64: return '#f65e3b'; break;
		case 128: return '#edcf72'; break;
		case 256: return '#edcc61'; break;
		case 512: return '#9c0'; break;
		case 1024: return '#33b5e5'; break;
		case 2048: return '#09c'; break;
		case 4096: return '#a6c'; break;
		case 8192: return '#93c'; break;
	}
	return 'black';
}

//设置不同数字的不同字体颜色的函数
function get_number_color (number) {
	if (number <= 4) {
		return '#776e65';
	}
	return '#fff';
}

//判断格子是否为0，为随机显示数字做准备
function nospace (board) {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			//如果有为0时，返回false
			if (board[i][j] == 0) {
				return false;
			}
		}
	}
	return true;
}

//判断能否上下左右移动，返回true或者false
function can_move_left (board) {
	for (let i = 0; i < 4; i++) {
		for (let j = 1; j < 4; j++) {
			//判断空格是否有不为0的数字 如果有则执行
			if (board[i][j] != 0) {
				//左移
				//同一行相临的的两个数相同或者有空格
				//左边第一列的值是否为0不判断，只看同行相邻的值是否一致
				
				//判断不为0的数字的左边是否为0或者与相邻的空格相同 隔一个或者两个空格相同的数字也包含其中
				if (board[i][j-1] == 0 || board[i][j] ==  board[i][j-1]) {
					return true;
				}
			}
		}
	}
	return false;
}
//判断能否右移
//右边第一列的值是否为0不判断，只看同行相邻的值是否一致
function can_move_right (board) {
	for (let i = 0; i < 4; i++) {
		for (let j = 2; j >=0; j--) {
			if (board[i][j] != 0) {
				if (board[i][j+1] == 0 || board[i][j] == board[i][j+1]) {
					return true;
				}
			}
		}
	}
	return false;
}

//上移
//上边第一列的值是否为0不判断，只看同列相邻的值是否一致
function can_move_up(board) {
	for (let j = 0; j < 4; j++) {
		for (let i = 1; i < 4; i++) {
			if (board[i][j] != 0) {
				if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

//下移
//下边第一列的值是否为0不判断，只看同列相邻的值是否一致
function can_move_down(board) {
	for (let j = 0; j < 4; j++) {
		for (let i = 2; i >= 0; i--) {
			if (board[i][j] != 0) {
				if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

//返回true或者false
function no_block_horizontal (row, col1, col2, board) {
	for (let i = col1 + 1; i < col2; i++) {
		//如果这个空格不为0，则返回false
		if (board[row][i] != 0) {
			return false;
		}
	}
	return true;
}

function no_block_vertical (col, row1, row2, board) {
	for (let i = row1 + 1; i < row2; i++) {
		if (board[i][col] != 0) {
			return false;
		}
	}
	return true;
}

//判断棋盘是否还能移动，返回true或者false 不能移动返回true
function nomove(board) {
	if (can_move_down(board) || can_move_up(board) || can_move_right(board) || can_move_left(board)) {
		return false;
	}
	return true;
}





