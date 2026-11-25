import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { fetchProducts } from "../features/products/productsSlice";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const [added, setAdded] = useState(false);
  const productId = Number(id);
  const validId = Number.isInteger(productId) && productId > 0;
  const product = validId ? items.find((item) => item.id === productId) : undefined;

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setAdded(true);
    }
  };

  if (!validId) {
    return (
      <div className="state-panel">
        <h2>Sản phẩm không hợp lệ</h2>
        <Link className="text-link" to="/">Quay về cửa hàng</Link>
      </div>
    );
  }

  if (status === "idle" || status === "loading") {
    return <div className="state-panel" role="status"><span className="loading-spinner" /><p>Đang tải thông tin sản phẩm...</p></div>;
  }

  if (status === "failed") {
    return (
      <div className="state-panel error-panel" role="alert">
        <h2>Không thể tải sản phẩm</h2>
        <p>{error}</p>
        <button className="button button-primary" type="button" onClick={() => void dispatch(fetchProducts())}>Thử lại</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="state-panel">
        <span className="state-icon">📦</span>
        <h2>Không tìm thấy sản phẩm</h2>
        <p>Sản phẩm này không tồn tại hoặc đã được gỡ khỏi cửa hàng.</p>
        <Link className="button button-primary" to="/">Về trang chủ</Link>
      </div>
    );
  }

  return (
    <section className="page-section">
      <div className="breadcrumb"><Link to="/">Cửa hàng</Link><span>/</span><span>Chi tiết sản phẩm</span></div>
      <div className="detail-layout">
        <div className="detail-image-panel">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>
        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <div className="detail-divider" />
          <h2>Mô tả sản phẩm</h2>
          <p className="detail-description">{product.description}</p>
          <div className="detail-actions">
            <button className="button button-primary button-large" type="button" onClick={handleAddToCart}>
              + Thêm vào giỏ hàng
            </button>
            <Link className="button button-secondary button-large" to="/cart">Xem giỏ hàng</Link>
          </div>
          {added && <p className="inline-success" role="status">✓ Đã thêm sản phẩm vào giỏ hàng.</p>}
        </div>
      </div>
    </section>
  );
}
