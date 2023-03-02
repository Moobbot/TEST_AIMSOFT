(function ($) {
	//! Bài 1
	var comments; // Lưu trữ dữ liệu từ file json
	// Tạo danh sách comments
	var commentList = [];
	var comment_tree = '';
	//* Load data from comments.json file
	$.getJSON('./comments.json', function (data, textStatus, jqXHR) {
		// Sắp xếp các comment theo thời gian tăng dần
		data.sort((a, b) => a.createdAt - b.createdAt);
		//Gán kết quả sắp xếp để xử lý
		comments = data;
	});
	//* Chức năng lấy thời gian trôi qua kể từ ngày được truyền vào "creation_time"
	function get_time_elapsed(creation_time) {
		const d = new Date();
		// console.log(d.getTime());
		// console.log(creation_time);
		var time_elapsed = d.getTime() - creation_time; // Thời gian từ lúc comment đến hiện tại
		var seconds = time_elapsed / 1000;

		if (seconds < 60) return Math.round(seconds) + ' giây trước';
		// console.log(Math.round(seconds) + ' giây trước');

		var minutes = seconds / 60;
		if (minutes < 60) return Math.round(minutes) + ' phút trước';

		var hours = minutes / 60;
		if (hours < 24) return Math.round(hours) + ' giờ trước';

		var date = hours / 24;
		if (date < 365) return Math.round(date) + ' ngày trước';

		var year = date / 365;
		return Math.round(year) + ' năm trước';
	}
	//* Định nghĩa một hàm để xây dựng đệ quy cây bình luận
	function build_comment_tree(comment, indent) {
		var time_elapsed = get_time_elapsed(comment['createdAt']);
		var dash = '-';
		var leve_indent = '-';
		for (i = 0; i < indent; i++) leve_indent += dash;

		comment_tree += `${leve_indent} ${comment.username} - ${time_elapsed}: ${comment.content} <br>`;
		// console.log(		// 	`${indent}${comment.username} - ${time_elapsed}: ${comment.content}`,		// );
		comments.forEach((element) => {
			if (
				element['replyingTo'] !== null &&
				element['replyingTo'] === comment['id']
			) {
				build_comment_tree(element, indent + 3);
			}
		});
	}
	setTimeout(() => {
		// Bắt đầu xây dựng cây bình luận
		// console.log(comments);
		comments.forEach((element) => {
			if (element['replyingTo'] == null) {
				comment_tree += `<p class = "sublist-item">`;
				build_comment_tree(element, 0);
				comment_tree += `</p>`;
			}
		});
		// console.log(comment_tree);
		$('#bai1').html(`${comment_tree}`);
	}, 300);
	/* ======================== */
})(window.jQuery);
