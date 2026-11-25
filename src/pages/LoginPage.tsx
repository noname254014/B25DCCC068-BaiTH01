import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate, type Location } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface LoginLocationState {
  from?: Location;
}

export function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationState = location.state as LoginLocationState | null;
  const destination = navigationState?.from
    ? `${navigationState.from.pathname}${navigationState.from.search}${navigationState.from.hash}`
    : "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = login(username, password);

    if (success) {
      setError("");
      navigate(destination, { replace: true });
      return;
    }

    setError("Tên đăng nhập không được để trống và mật khẩu phải là 123456.");
  };

  if (user) {
    return (
      <div className="auth-layout">
        <div className="auth-card">
          <span className="auth-icon">👋</span>
          <h1>Bạn đã đăng nhập</h1>
          <p className="muted-text">Xin chào, {user.username}.</p>
          <Link className="button button-primary full-width" to="/">Về cửa hàng</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-logo">S</div>
        <span className="eyebrow">CHÀO MỪNG TRỞ LẠI</span>
        <h1>Đăng nhập</h1>
        <p className="muted-text">Đăng nhập để tiếp tục đến bước thanh toán.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Nhập tên đăng nhập"
            autoComplete="username"
            required
          />
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
            required
          />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary full-width button-large" type="submit">Đăng nhập</button>
        </form>

        <div className="demo-credentials">
          <strong>Thông tin đăng nhập mô phỏng</strong>
          <span>Tên đăng nhập: tùy chọn</span>
          <span>Mật khẩu: <code>123456</code></span>
        </div>
        <Link className="text-link auth-back-link" to="/">← Quay về cửa hàng</Link>
      </div>
    </div>
  );
}
