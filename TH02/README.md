# BaiTH02 — Khí Tượng

Ứng dụng React + TypeScript + Vite theo dõi thời tiết hiện tại và dự báo 7 ngày cho 8 thành phố Việt Nam. Dữ liệu lấy từ Open-Meteo (không cần API key). Giao diện Glassmorphism kết hợp kiến trúc tách component, hook, service và test.

## Yêu cầu

- Node.js 20.19+ hoặc 22.12+ (khuyến nghị bản LTS).
- npm và kết nối Internet khi tải dữ liệu thời tiết.

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở địa chỉ Vite in ra trong terminal (thường là `http://localhost:5173`).

## Kiểm tra và build

```bash
npm test
npm run build
npm run preview
```

- `npm test`: chạy Vitest.
- `npm run build`: kiểm tra TypeScript và tạo bản build trong `dist/`.
- `npm run preview`: chạy thử bản production.

## Chức năng

- 8 thành phố: Hà Nội, Hải Phòng, Thừa Thiên Huế, Đà Nẵng, Nha Trang, Đà Lạt, TP. Hồ Chí Minh, Cần Thơ.
- Làm nổi bật thành phố đang chọn; tìm kiếm không phân biệt dấu (ví dụ `da nang`, `hcm`).
- Thời tiết hiện tại: biểu tượng Lucide, mô tả, nhiệt độ, độ ẩm, tốc độ gió, thời điểm cập nhật.
- Dự báo 7 ngày: thứ/ngày, biểu tượng, nhiệt độ cao nhất/thấp nhất.
- Trạng thái chưa chọn, đang tải, lỗi và nút Thử lại.
- Chuyển °C/°F tại client, không gọi lại API.
- Responsive: dưới 768px xếp dọc; từ 768px trở lên bố cục 2 cột.
- Yêu thích lưu trong `localStorage`; lọc danh sách chỉ xem yêu thích.
- Màu nền/gradient đổi theo nhóm thời tiết (glassmorphism).
- Unit/component tests cho tiện ích thời tiết, danh sách thành phố và API.

## Cấu trúc

```
TH02/
├── src/
│   ├── components/
│   ├── data/cities.ts
│   ├── hooks/
│   ├── services/
│   ├── types/weather.ts
│   ├── utils/weather.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── README.md
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## API

Endpoint `/v1/forecast` của Open-Meteo dùng `current` và `daily`, `timezone=Asia/Ho_Chi_Minh`, `forecast_days=7`. Không cần API key. Xem [tài liệu Open-Meteo](https://open-meteo.com/en/docs).

## Nộp GitHub và Slink

1. Tạo repository tên `<MÃ_SINH_VIÊN>-BaiTH02` (không dùng dấu cách trong tên repo). Ví dụ: `B25DCCC068-BaiTH02`.
2. Trong thư mục project:

```bash
git init
git add .
git commit -m "feat: build Vietnam weather dashboard"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<MÃ_SINH_VIÊN>-BaiTH02.git
git push -u origin main
```

3. Kiểm tra `node_modules/` và `dist/` không xuất hiện trên GitHub.
4. Nếu repository private, mời GitHub username `anhttptit` làm collaborator.
5. Dán URL repository vào phần trả lời trên Slink.

## Checklist giao diện trước khi nộp

- Chưa chọn thành phố thì không hiện dữ liệu thời tiết giả.
- Bấm từng thành phố sẽ tải đúng tọa độ và làm nổi bật lựa chọn.
- Mô phỏng lỗi mạng để kiểm tra nút Thử lại.
- Chuyển °C sang °F không tạo thêm yêu cầu API.
- Tìm `da nang` vẫn ra Đà Nẵng.
- Thêm/bỏ yêu thích, tải lại trang và kiểm tra còn được lưu.
- Thử chiều rộng màn hình 390px và 768px.
- Dự báo đủ 7 ngày, nhiệt độ và biểu tượng khớp từng ngày.
