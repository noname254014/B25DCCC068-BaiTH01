import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useAuth } from "../contexts/AuthContext";
import { clearCart, selectCartItems, selectCartTotalPrice, selectCartTotalQuantity } from "../features/cart/cartSlice";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      return;
    }
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="state-panel order-success-panel" role="status">
        <span className="success-check">✓</span>
        <span className="eyebrow">HOÀN TẤT</span>
        <h1>Đặt hàng thành công!</h1>
        <p>Cảm ơn {user?.username}. Đơn hàng mô phỏng của bạn đã được ghi nhận.</p>
        <p className="muted-text">Giỏ hàng đã được làm trống.</p>
        <Link className="button button-primary" to="/">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="state-panel empty-cart-panel">
        <span className="state-icon">🧺</span>
        <h1>Chưa có sản phẩm để thanh toán</h1>
        <p>Hãy thêm sản phẩm vào giỏ hàng trước khi đặt hàng.</p>
        <Link className="button button-primary" to="/">Đến cửa hàng</Link>
      </div>
    );
  }

  return (
    <section className="page-section checkout-page">
      <div className="page-title-block">
        <span className="eyebrow">BƯỚC CUỐI CÙNG</span>
        <h1>Thanh toán</h1>
        <p className="muted-text">Kiểm tra lại đơn hàng trước khi hoàn tất.</p>
      </div>

      <div className="checkout-layout">
        <div className="checkout-details card-surface">
          <div className="checkout-section-heading">
            <span className="step-number">1</span>
            <div><h2>Thông tin khách hàng</h2><p>Thông tin tài khoản đang đăng nhập</p></div>
          </div>
          <div className="customer-info-row"><span>Người mua</span><strong>{user?.username}</strong></div>
          <div className="customer-info-row"><span>Trạng thái</span><span className="account-status">Đã đăng nhập</span></div>

          <div className="checkout-section-heading checkout-products-heading">
            <span className="step-number">2</span>
            <div><h2>Sản phẩm trong đơn</h2><p>{totalQuantity} sản phẩm</p></div>
          </div>
          <div className="checkout-product-list">
            {items.map(({ product, quantity }) => (
              <div className="checkout-product-row" key={product.id}>
                <img src={product.image} alt={product.title} />
                <div className="checkout-product-name"><strong>{product.title}</strong><span>Số lượng: {quantity}</span></div>
                <strong>{formatPrice(product.price * quantity)}</strong>
              </div>
            ))}
          </div>
        </div>

        <aside className="order-summary checkout-summary">
          <h2>Chi tiết thanh toán</h2>
          <div className="summary-row"><span>Tạm tính</span><span>{formatPrice(totalPrice)}</span></div>
          <div className="summary-row"><span>Vận chuyển</span><span className="free-shipping">Miễn phí</span></div>
          <div className="summary-divider" />
          <div className="summary-row summary-total"><strong>Tổng thanh toán</strong><strong>{formatPrice(totalPrice)}</strong></div>
          <button className="button button-primary checkout-button" type="button" onClick={handlePlaceOrder}>
            Đặt hàng <span>→</span>
          </button>
          <p className="secure-note">🔒 Đây là quy trình thanh toán mô phỏng, không phát sinh giao dịch thật.</p>
          <Link className="text-link" to="/cart">← Quay lại giỏ hàng</Link>
        </aside>
      </div>
    </section>
  );
}
