import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  updateQuantity,
} from "../features/cart/cartSlice";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  return (
    <section className="page-section">
      <div className="page-title-block">
        <span className="eyebrow">GIỎ HÀNG CỦA BẠN</span>
        <h1>Giỏ hàng</h1>
        <p className="muted-text">Bạn đang có {totalQuantity} sản phẩm trong giỏ.</p>
      </div>

      {items.length === 0 ? (
        <div className="state-panel empty-cart-panel">
          <span className="state-icon">🛒</span>
          <h2>Giỏ hàng đang trống</h2>
          <p>Hãy khám phá cửa hàng và thêm những sản phẩm bạn yêu thích.</p>
          <Link className="button button-primary" to="/">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {items.map(({ product, quantity }) => (
              <article className="cart-item" key={product.id}>
                <Link className="cart-item-image" to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.title} />
                </Link>
                <div className="cart-item-info">
                  <span className="product-category">{product.category}</span>
                  <Link className="cart-item-title" to={`/products/${product.id}`}>{product.title}</Link>
                  <strong className="product-price">{formatPrice(product.price)}</strong>
                  <button className="remove-link" type="button" onClick={() => dispatch(removeFromCart(product.id))}>Xóa sản phẩm</button>
                </div>
                <div className="quantity-control" aria-label={`Số lượng ${product.title}`}>
                  <button
                    type="button"
                    aria-label="Giảm số lượng"
                    disabled={quantity <= 1}
                    onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))}
                  >−</button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    aria-label="Tăng số lượng"
                    onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))}
                  >+</button>
                </div>
                <strong className="cart-line-total">{formatPrice(product.price * quantity)}</strong>
              </article>
            ))}
            <Link className="text-link back-shopping" to="/">← Tiếp tục mua sắm</Link>
          </div>

          <aside className="order-summary">
            <h2>Tóm tắt đơn hàng</h2>
            <div className="summary-row"><span>Số lượng</span><span>{totalQuantity}</span></div>
            <div className="summary-row"><span>Tạm tính</span><span>{formatPrice(totalPrice)}</span></div>
            <div className="summary-row"><span>Phí vận chuyển</span><span className="free-shipping">Miễn phí</span></div>
            <div className="summary-divider" />
            <div className="summary-row summary-total"><strong>Tổng cộng</strong><strong>{formatPrice(totalPrice)}</strong></div>
            <Link className="button button-primary checkout-button" to="/checkout">Tiến hành thanh toán <span>→</span></Link>
            <p className="secure-note">🔒 Thanh toán mô phỏng cho mục đích học tập.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
