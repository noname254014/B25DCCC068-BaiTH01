# ShopMini – BaiTH03

Ứng dụng cửa hàng mini được xây dựng bằng **React + TypeScript + Vite**, sử dụng **Context API** cho theme/xác thực và **Redux Toolkit** cho dữ liệu sản phẩm/giỏ hàng.

## 1. Công nghệ sử dụng

- React 18 và TypeScript strict mode.
- Vite cho môi trường phát triển và build.
- React Router DOM cho điều hướng trang.
- Redux Toolkit (`configureStore`, `createSlice`, `createAsyncThunk`) và React Redux.
- Context API với `ThemeContext` và `AuthContext`.
- Fake Store API: <https://fakestoreapi.com/products>.

## 2. Chức năng đã triển khai

- Trang chủ `/`: tải sản phẩm từ Fake Store API, hiển thị lưới responsive và tìm kiếm theo tên.
- Chi tiết `/products/:id`: hiển thị thông tin sản phẩm và thêm vào giỏ hàng.
- Giỏ hàng `/cart`: tăng/giảm số lượng, xóa sản phẩm, hiển thị tổng số lượng và tổng tiền.
- Đăng nhập `/login`: đăng nhập mô phỏng; tên đăng nhập tùy chọn, mật khẩu bắt buộc là `123456`.
- Thanh toán `/checkout`: protected route; chưa đăng nhập sẽ chuyển tới `/login`, sau đăng nhập quay lại URL ban đầu. Đặt hàng sẽ xóa giỏ hàng và hiện thông báo thành công.
- Đường dẫn không tồn tại: hiển thị trang 404.
- Header dùng chung: số lượng giỏ hàng, tài khoản, đăng xuất và chuyển theme sáng/tối.
- Theme và trạng thái đăng nhập được lưu trong `localStorage` để giữ lại sau khi tải lại trang. Mật khẩu không được lưu.
- Giao diện hỗ trợ điện thoại, máy tính bảng và desktop.

## 3. Cấu trúc thư mục

```text
src/
├── app/
│   ├── store.ts
│   └── hooks.ts
├── features/
│   ├── products/productsSlice.ts
│   └── cart/cartSlice.ts
├── contexts/
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
├── components/
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── ProtectedRoute.tsx
├── layouts/MainLayout.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── LoginPage.tsx
│   ├── CheckoutPage.tsx
│   └── NotFoundPage.tsx
├── types/index.ts
├── App.tsx
├── main.tsx
└── styles.css
```

## 4. Phân chia và lý do lựa chọn state

| Nơi quản lý | Dữ liệu | Lý do |
|---|---|---|
| `useState` | Từ khóa tìm kiếm, nội dung form đăng nhập, lỗi form, trạng thái thông báo thêm giỏ/đặt hàng | Đây là state giao diện cục bộ, chỉ một trang hoặc một component cần sử dụng; không cần chia sẻ toàn ứng dụng. |
| `ThemeContext` | `theme`, hàm `toggleTheme()` | Theme ảnh hưởng nhiều component (đặc biệt Header và toàn bộ giao diện), nên Context giúp chia sẻ mà không phải truyền props qua nhiều cấp. |
| `AuthContext` | `user`, `login()`, `logout()` | Thông tin xác thực được Header, LoginPage và ProtectedRoute cùng sử dụng; Context phù hợp cho trạng thái người dùng toàn cục có logic tương đối đơn giản. |
| Redux `products` | Danh sách sản phẩm, trạng thái `idle/loading/succeeded/failed`, lỗi API | Dữ liệu đến từ API và có trạng thái tải bất đồng bộ; `createAsyncThunk` và slice giúp chuẩn hóa vòng đời request, đồng thời cho phép nhiều trang dùng chung dữ liệu. |
| Redux `cart` | Các sản phẩm trong giỏ và số lượng từng sản phẩm | Giỏ hàng được dùng ở ProductCard, Header, CartPage và CheckoutPage; Redux giúp quản lý cập nhật tập trung và tạo selector tính tổng số lượng/tổng tiền. |

### Một số điểm triển khai

- `useTheme()` và `useAuth()` là custom hook; chúng báo lỗi rõ ràng khi được gọi ngoài Provider.
- `fetchProducts` dùng `createAsyncThunk`, kiểm tra HTTP response và xác thực dữ liệu nhận về từ API bằng `unknown` cùng type guard `isProduct`.
- `selectCartTotalQuantity` và `selectCartTotalPrice` là selector được memoize bằng `createSelector`.
- `ProtectedRoute` lưu `location` vào state của `Navigate`; LoginPage dùng lại pathname, query string và hash sau khi đăng nhập thành công.
- TypeScript bật `strict`, `noUnusedLocals`, `noUnusedParameters` và `noUncheckedIndexedAccess`. Không khai báo `any` trong source code.

## 5. Cài đặt và chạy chương trình

Yêu cầu Node.js 18 trở lên (khuyến nghị Node.js 20 hoặc 22).

```bash
# 1. Cài dependencies
npm install

# 2. Chạy môi trường phát triển
npm run dev

# 3. Kiểm tra TypeScript
npm run typecheck

# 4. Build production
npm run build

# 5. Xem thử bản build
npm run preview
```

Mở địa chỉ Vite in ra trong terminal (thường là `http://localhost:5173`). Máy cần kết nối Internet để tải danh sách sản phẩm từ Fake Store API.

## 6. Tài khoản đăng nhập thử

- Tên đăng nhập: nhập tên bất kỳ, không để trống.
- Mật khẩu: `123456`.

Đây là đăng nhập mô phỏng phía client phục vụ bài thực hành, không phải hệ thống xác thực bảo mật và không có backend.

## 7. Đẩy bài lên GitHub

GitHub không chấp nhận dấu cách trong tên repository. Có thể đặt theo dạng `MASINHVIEN-BaiTH03` (thay `MASINHVIEN` bằng mã sinh viên của bạn).

```bash
# Khởi tạo Git trong thư mục dự án
 git init
 git add .
 git commit -m "Complete ShopMini BaiTH03"
 git branch -M main

# Thay USERNAME và MASINHVIEN bằng thông tin của bạn
 git remote add origin https://github.com/USERNAME/MASINHVIEN-BaiTH03.git
 git push -u origin main
```

Nếu đã tạo repository và Git báo remote `origin` tồn tại, dùng:

```bash
git remote set-url origin https://github.com/USERNAME/MASINHVIEN-BaiTH03.git
git push -u origin main
```

**Trước khi nộp:**

1. Thay `MASINHVIEN` và `USERNAME` trong lệnh Git bằng thông tin thật.
2. Kiểm tra repository có `README.md` và đầy đủ source code.
3. Không commit `node_modules/` hoặc `dist/` (đã được loại trừ trong `.gitignore`).
4. Nếu repository để Private, mời tài khoản GitHub `anhttptit` vào repository với quyền phù hợp.
5. Sao chép URL repository và dán vào phần nội dung trả lời trên Slink.

## 8. Giới hạn của bản thực hành

- API Fake Store chỉ cung cấp dữ liệu sản phẩm mẫu.
- Đăng nhập và thanh toán đều mô phỏng ở frontend; không có thanh toán thật, đơn hàng không được gửi tới máy chủ.
- Giỏ hàng được giữ trong Redux state trong phiên chạy hiện tại; tải lại trang sẽ khởi tạo giỏ hàng rỗng. Theme và người dùng đăng nhập được lưu riêng trong `localStorage`.
