//! Bài 2
// lấy thẻ container
const container = document.getElementById('drag-drop-container');

//* thêm sự kiện Drag and Drop

// Bắt sự kiện khi kéo thả file và Ngăn hành động mặc định trình duyệt xảy ra
container.addEventListener('dragover', (event) => {
	event.preventDefault();
});
// Bắt sự kiện khi kéo và thả vào container & xử lý file được kéo thả vào
container.addEventListener('drop', (event) => {
	event.preventDefault();
	const file = event.dataTransfer.files[0]; //Thông tin file

	//* 1. Kiểm tra định dạng file
	if (!file.name.endsWith('.txt')) {
		alert('File không hợp lệ. Chỉ chấp nhận file văn bản có định dạng ".txt".');
		return;
	}

	//*. Sử dụng Web Worker để xử lý văn bản

	// Tạo một Web Worker để xử lý văn bản
	const worker = new Worker('./worker.js');
	// Truyền file vào Web Worker để xử lý
	worker.postMessage(file);

	// Đợi kết quả từ Web Worker
	worker.onmessage = (message) => {
		if (message.data.error) {
			alert(message.data.error);
		} else {
			const { uniqueWords, topThreeWords } = message.data;
			var text = '';
			topThreeWords.forEach(({ word, count }, index) => {
				text += `\n${index + 1}. ${word}: ${count} lần`;
			});
			// Hiển thị kết quả
			alert(
				`Tổng số từ khác nhau: ${uniqueWords}\n3 từ xuất hiện nhiều nhất: ${text}`,
			);
		}
	};
});
