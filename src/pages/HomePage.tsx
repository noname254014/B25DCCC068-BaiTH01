import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ProductCard } from "../components/ProductCard";
import { fetchProducts } from "../features/products/productsSlice";

export function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase("vi-VN");
    if (!keyword) {
      return items;
    }
    return items.filter((product) =>
      product.title.toLocaleLowerCase("vi-VN").includes(keyword),
    );
  }, [items, search]);

  return (
    <section className="page-section">
      <div className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">CHÀO MỪNG ĐẾN VỚI SHOPMINI</span>
          <h1>Món đồ bạn cần,<br /><span>ngay trong tầm tay.</span></h1>
          <p>Khám phá bộ sưu tập sản phẩm được tuyển chọn dành cho cuộc sống mỗi ngày.</p>
        </div>
        <div className="hero-decoration" aria-hidden="true">
          <span className="hero-orbit orbit-one" />
          <span className="hero-orbit orbit-two" />
          <span className="hero-bag">🛍️</span>
          <span className="hero-sparkle sparkle-one">✦</span>
          <span className="hero-sparkle sparkle-two">✧</span>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="eyebrow">BỘ SƯU TẬP</span>
          <h2>Sản phẩm nổi bật</h2>
          <p className="muted-text">Tìm thấy món đồ phù hợp với bạn.</p>
        </div>
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm theo tên sản phẩm..."
            aria-label="Tìm kiếm sản phẩm theo tên"
          />
          {search && (
            <button type="button" className="search-clear" onClick={() => setSearch("")} aria-label="Xóa từ khóa">
              ×
            </button>
          )}
        </label>
      </div>

      {status === "loading" && (
        <div className="state-panel" role="status">
          <span className="loading-spinner" />
          <p>Đang tải danh sách sản phẩm...</p>
        </div>
      )}

      {status === "failed" && (
        <div className="state-panel error-panel" role="alert">
          <span className="state-icon">⚠️</span>
          <h3>Chưa thể tải sản phẩm</h3>
          <p>{error}</p>
          <button className="button button-primary" type="button" onClick={() => void dispatch(fetchProducts())}>
            Thử lại
          </button>
        </div>
      )}

      {status === "succeeded" && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {status === "succeeded" && filteredProducts.length === 0 && (
        <div className="state-panel">
          <span className="state-icon">🔎</span>
          <h3>Không tìm thấy sản phẩm</h3>
          <p>Thử tìm bằng một từ khóa khác nhé.</p>
          <button className="button button-secondary" type="button" onClick={() => setSearch("")}>Xóa tìm kiếm</button>
        </div>
      )}
    </section>
  );
}
