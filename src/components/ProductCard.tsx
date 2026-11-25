import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/products/${product.id}`}>
        <div className="product-image-wrap">
          <img className="product-image" src={product.image} alt={product.title} loading="lazy" />
        </div>
      </Link>
      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <Link className="product-title-link" to={`/products/${product.id}`}>
          <h2 className="product-title">{product.title}</h2>
        </Link>
        <div className="product-card-bottom">
          <strong className="product-price">{formatPrice(product.price)}</strong>
          <button
            className="button button-primary add-button"
            type="button"
            onClick={() => dispatch(addToCart(product))}
            aria-label={`Thêm ${product.title} vào giỏ hàng`}
          >
            + Thêm
          </button>
        </div>
      </div>
    </article>
  );
}
