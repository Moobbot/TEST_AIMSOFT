self.addEventListener('message', (event) => {
	var file = event.data;
	// Tạo một FileReader để đọc file văn bản
	var reader = new FileReader();
	// Đọc file văn bản
	reader.readAsText(file);
	reader.onload = () => {
		var text = reader.result;
		var words = text.replace(/[.,]/g, '').split(' '); // Tách từ
		/*
		 * 1. File văn bản chỉ sử dụng ký tự alphabet, không chứa số.
		 * 2. File văn bản chỉ chứa các ký tự đặc biệt sau: '.', ',', ' '
		 */
		var validChars = [' ', ',', '.']; // Danh sách các ký tự đặc biệt cho phép
		var alphabetChars = /^[a-zA-Z]+$/; // Regex để kiểm tra ký tự alphabet
		for (let i = 0; i < words.length; i++) {
			if (!alphabetChars.test(words[i]) && !validChars.includes(words[i])) {
				self.postMessage({
					error: `File có kí tự không được phép. File văn bản chỉ sử dụng ký tự alphabet, không chứa số. File văn bản chỉ chứa các ký tự đặc biệt sau: '.', ',', ' '.`,
				});
				break;
				// Ký tự không thuộc danh sách các ký tự đặc biệt cho phép hoặc không phải là ký tự alphabet hoặc số
			}
		}
		//* 3. kiểm tra file có ít hơn 3 từ khác nhau
		var uniqueWords = new Set(words).size;
		if (uniqueWords < 3) {
			self.postMessage({ error: 'File không đủ 3 từ khác nhau.' });
			return;
		}
		//* 4. tính toán top 3 từ xuất hiện nhiều nhất
		const wordCounts = {};
		words.forEach((word) => {
			const lowercaseWord = word.toLowerCase();
			if (lowercaseWord in wordCounts) {
				wordCounts[lowercaseWord]++;
			} else {
				wordCounts[lowercaseWord] = 1;
			}
		});
		//Sắp xếp từ theo số lượng xuất hiện
		const sortedWordCounts = Object.entries(wordCounts).sort(
			(a, b) => b[1] - a[1],
		);
		const topThreeWords = sortedWordCounts
			.slice(0, 3)
			.map(([word, count]) => ({ word, count }));

		// gửi kết quả về cho main thread
		self.postMessage({ uniqueWords, topThreeWords });
	};
});
