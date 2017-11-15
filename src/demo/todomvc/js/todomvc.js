(function (window) {
	'use strict';

	var myTodomvc = angular.module('myTodomvc', []);
	myTodomvc.controller('myTodomvcController', ['$scope', function ($scope) {
		//文本框需要一个模型
		$scope.text = '';

		//任务列表模型
		//每一个任务的结构 {id: 1, text: '学习', completed: true}
		$scope.todos = [
			{id: 1, text: '学习', completed: false},
			{id: 2, text: '吃饭', completed: false},
			{id: 3, text: '睡觉', completed: true}
		];

		//记录ID（不重复）
		function getID () {
			var id = Math.random();
			for (var i = 0 ; i < $scope.todos.length ; i++) {
				if(id === $scope.todos[i].id) {
					id = getID();
					break;
				}
			}
			return id;
		}

		//添加函数
		$scope.add = function () {
			if ($scope.text === "") {
				return;
			}
			$scope.todos.unshift({
				id: Math.random(),
				text: $scope.text,
				completed: false
			});

			//清空文本框
			$scope.text = "";
		}

		//删除模块
		$scope.remove = function (id) {
			for (var i = 0 ; i < $scope.todos.length ; i++) {
				if(id === $scope.todos[i].id) {
					$scope.todos.splice(i, 1);
					break;
				}
			}
		};

		//清除已完成任务
		$scope.clear = function () {
			var arr = [];
			for (var i = 0 ; i < $scope.todos.length ; i++) {
				if(!$scope.todos[i].completed) {
					arr.unshift($scope.todos[i]);
				}
			}
			$scope.todos = arr;
		}

		//判断clearCompleted 按钮是否可点击
		$scope.exsitCompleted = function () {
			for (var i = 0 ; i < $scope.todos.length ; i++) {
				if($scope.todos[i].completed) {
					return true;
				}
			}
			return false;
		}

		//判断当前编辑的元素
		$scope.currentId = -1;
		$scope.editing = function (id) {
			$scope.currentId = id;
		}

		$scope.save = function () {
			$scope.currentId = -1;
		}

		var now = true;
		$scope.toggleAll = function () {
			for (var i = 0 ; i < $scope.todos.length ; i++) {
				$scope.todos[i].completed = now;
			}
			now = !now;
		}
	}]);

})(window);
