import Link from "next/link";
import AddToCart from "./components/AddToCart";

const products = [
  {
    name: "রানিগোলাপি কম্বো",
    offerPrice: "2000 Tk",
    regularPrice: "2800 Tk",
    image: "/products/IMG_1410.jpg",
  },
  {
    name: "সাদা লাল কম্বো",
    offerPrice: "2000 Tk",
    regularPrice: "2800 Tk",
    image: "/products/IMG_1552.jpg",
  },
  {
    name: "পারপেল কম্বো",
    offerPrice: "2000 Tk",
    regularPrice: "2800 Tk",
    image: "/products/WhatsApp Image 2026-08-04 at 9.03.59 PM.jpeg",
  },
  {
    name: "গোলাপি কম্বো",
    offerPrice: "2000 Tk",
    regularPrice: "2800 Tk",
    image: "/products/IMG_1451.jpg",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div>
          <h1>Discover Your Style</h1>

          <p>
            Premium fashion collection designed for modern lifestyle.
          </p>

          <Link href="/#products">
            <button>Shop Now</button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Shop By Category</h2>

        <div className="category-grid">

          <div className="category-card">
            <h3>New Arrival</h3>
            <p>Latest fashion trends</p>
          </div>

          <div className="category-card">
            <h3>Combo Collection</h3>
            <p>Beautiful matching sets</p>
          </div>

          <div className="category-card">
            <h3>Premium Collection</h3>
            <p>Exclusive designs</p>
          </div>

        </div>
      </section>

      {/* Products */}
      <section className="products" id="products">
        <h2>Featured Collection</h2>

        <div className="product-grid">

          {products.map((product, index) => (
            <div className="card" key={index}>

              {/* Product Image */}
              <Link href={`/product/${index}`}>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />
              </Link>

              {/* Product Name */}
              <h3>{product.name}</h3>

              {/* Offer Price */}
              <p className="offer">
                Offer Price: {product.offerPrice}
              </p>

              {/* Regular Price */}
              <p className="regular">
                Regular Price: {product.regularPrice}
              </p>

              {/* Add To Cart */}
              <AddToCart product={product} />

              {/* Product Details */}
              <Link href={`/product/${index}`}>
                <button>
                  View Details
                </button>
              </Link>

            </div>
          ))}

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">

        <div className="footer-content">

          {/* Brand */}
          <div>
            <h2>FASHION STORE</h2>

            <p>
              Premium fashion collection for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3>Quick Links</h3>

            <Link href="/">
              Home
            </Link>

            <Link href="/#products">
              Shop
            </Link>

            <Link href="/">
              About
            </Link>

            <Link href="/">
              Contact
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h3>Contact</h3>

            <p>
              Email: fashionstore@gmail.com
            </p>

            <p>
              Phone: +880 1XXX-XXXXXX
            </p>
          </div>

        </div>

        <p className="copyright">
          © 2026 Fashion Store. All Rights Reserved.
        </p>

      </footer>
    </>
  );
}