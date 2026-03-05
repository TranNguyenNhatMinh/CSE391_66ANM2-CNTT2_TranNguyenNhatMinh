## BTTH03: JS nền tảng, DOM & Sự kiện

### 1. JavaScript là gì?
- **JavaScript** là ngôn ngữ lập trình chạy chủ yếu trên **trình duyệt** (Chrome, Edge, Firefox, ...), ngoài ra còn có thể chạy ở **server** (ví dụ: Node.js).
- Trình duyệt tải file HTML, sau đó tải và thực hiện các đoạn mã JavaScript được liên kết (thông qua thẻ `<script>`).

### 2. Vai trò của HTML, CSS, JavaScript
- **HTML**: Xây dựng cấu trúc, nội dung của trang (tiêu đề, đoạn văn, hình ảnh, nút bấm, biểu mẫu, ...).
- **CSS**: Định dạng giao diện (màu sắc, kích thước, bố cục, font chữ, khoảng cách, ...).
- **JavaScript**: Thêm **tương tác**, **xử lý logic**, thay đổi nội dung/kiểu dáng động, phản hồi hành động của người dùng (click, nhập liệu, cuộn trang, ...).

### 3. Biến & kiểu dữ liệu cơ bản
- **Biến**: dùng để lưu trữ giá trị trong chương trình.
  - `let` / `const` để khai báo biến trong JS hiện đại.
- **Kiểu dữ liệu cơ bản**:
  - `number`: số, ví dụ `20`, `3.14`.
  - `string`: chuỗi ký tự, ví dụ `"Hello"`, `'An'`.
  - `boolean`: chỉ có 2 giá trị `true` hoặc `false`.
- Có thể dùng `typeof` để kiểm tra kiểu của một giá trị, ví dụ: `typeof 20 // "number"`.

### 4. Cấu trúc điều khiển `if/else`, vòng lặp
- **if/else** cho phép chương trình “rẽ nhánh” theo điều kiện:
  - Nếu điều kiện đúng → chạy khối lệnh tương ứng.
  - Nếu điều kiện sai → chuyển sang nhánh `else if` hoặc `else`.
- Ví dụ: phân loại học lực dựa trên biến `score`.
- Vòng lặp (for, while) giúp lặp lại 1 khối lệnh nhiều lần (nội dung chi tiết sẽ được luyện tập thêm ở các buổi sau).

### 5. Hàm (function)
- **Hàm** là một khối code có tên, có thể nhận **tham số** và trả về **giá trị**.
- Lợi ích:
  - Tái sử dụng code, tránh lặp lại.
  - Tách nhỏ chương trình thành các phần dễ hiểu, dễ bảo trì.
- Ví dụ:
  - `tinhDiemTrungBinh(m1, m2, m3)` trả về điểm trung bình 3 môn.
  - `xepLoai(avg)` nhận điểm trung bình, trả về chuỗi `"Giỏi"`, `"Khá"`, `"Trung bình"` hoặc `"Yếu"`.

### 6. DOM & Sự kiện
- **DOM (Document Object Model)**: mô hình biểu diễn trang HTML dưới dạng **cây các đối tượng**.
  - Mỗi thẻ HTML (như `<p>`, `<button>`, `<input>`) tương ứng với một **node** trong cây DOM.
  - JavaScript có thể **truy cập** và **thay đổi** nội dung, thuộc tính, style của các node này.
- Một số thao tác DOM cơ bản:
  - `document.getElementById("status")`: lấy phần tử có `id="status"`.
  - `element.textContent = "Nội dung mới"`: thay đổi nội dung văn bản.
  - `document.body.style.backgroundColor = "red"`: đổi màu nền trang.
- **Sự kiện (event)**:
  - `"click"`: xảy ra khi người dùng nhấn chuột.
  - `"input"`: xảy ra khi giá trị trong ô nhập thay đổi.
  - Dùng `addEventListener` để “lắng nghe” và xử lý sự kiện:
    - `btnHello.addEventListener("click", function () { ... });`

### 7. jQuery (nhận diện)
- **jQuery** là một thư viện JavaScript giúp thao tác DOM và xử lý sự kiện **ngắn gọn** và **dễ dùng** hơn so với JS thuần.
- Ví dụ so sánh:
  - JS thuần:
    - `document.getElementById("btnHello").addEventListener("click", function () { ... });`
  - jQuery:
    - `$("#btnHello").on("click", function () { ... });`
- jQuery giúp:
  - Viết code DOM/sự kiện ngắn hơn.
  - Xử lý khác biệt giữa các trình duyệt cũ.

### 8. Mục tiêu sau buổi lab
Sau khi hoàn thành các file trong folder `TH3`:
- Nắm được:
  - Khái niệm cơ bản về JavaScript, vai trò so với HTML/CSS.
  - Biến, kiểu dữ liệu, if/else, hàm đơn giản.
  - Cách dùng Console để thử nghiệm mã JS.
  - Cách thao tác DOM (lấy phần tử, đổi nội dung, đổi style).
  - Cách lắng nghe và xử lý sự kiện `click`, `input`.
- Nhận biết được jQuery là gì và vì sao người ta dùng nó.

