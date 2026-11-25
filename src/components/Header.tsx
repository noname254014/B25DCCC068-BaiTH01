import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectCartTotalQuantity } from "../features/cart/cartSlice";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export function Header() {
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="ShopMini - Trang chủ">
          <span className="brand-mark">S</span>
          <span>Shop<span className="brand-accent">Mini</span></span>
        </Link>

        <nav className="main-nav" aria-label="Điều hướng chính">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Cửa hàng
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Giỏ hàng
          </NavLink>
        </nav>

        <div className="header-actions">
          <Link className="cart-indicator" to="/cart" aria-label={`Giỏ hàng có ${totalQuantity} sản phẩm`}>
            <span aria-hidden="true">🛒</span>
            <span className="cart-count">{totalQuantity}</span>
          </Link>
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Chuyển sang giao diện tối" : "Chuyển sang giao diện sáng"}
            title={theme === "light" ? "Giao diện tối" : "Giao diện sáng"}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {user ? (
            <div className="account-area">
              <span className="user-greeting">Xin chào, <strong>{user.username}</strong></span>
              <button className="button button-quiet button-small" type="button" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link className="button button-primary button-small" to="/login">Đăng nhập</Link>
          )}
        </div>
      </div>
    </header>
  );
}
