import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="state-panel not-found-panel">
      <span className="not-found-code">404</span>
      <span className="eyebrow">KHÔNG TÌM THẤY TRANG</span>
      <h1>Oops! Lạc mất rồi.</h1>
      <p>Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi.</p>
      <Link className="button button-primary" to="/">Quay về trang chủ</Link>
    </div>
  );
}
