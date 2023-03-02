/*
  !- Comment trả lời sẽ thuộc sublist của comment gốc (trường replyingTo)
  !- Các comment được sắp xếp theo thời gian comment (trường createdAt)
  !- Comment cần hiển thị được đủ thông tin gồm:
  !- Tên user comment (trường username)
  !- Thời gian comment được tạo tính tới thời điểm hiện tại (trường createdAt, có dạng “2 phút trước”)
 * Kiểu object
  {
		* "id": 18, -> id Comment
		* "content": "18. Lorem ipsum dolor sit amet.", -> Nội dung Comment
		* "createdAt": 1666242158465, -> Thời gian tạo
		* "score": 2, -> Không đụng đến không ???
		* "username": "user18", -> Người comment
		* "replyingTo": 14  -> Trả lời tin nhắn nào
	},
*/
