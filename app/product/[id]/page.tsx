const products = [
  {
    name: "রানিগোলাপি কম্বো",
    offerPrice: "2000 Tk",
    regularPrice: "2800 Tk",
    image: "/products/IMG_1410.jpg",
    description: "Beautiful premium quality fashion combo.",
  },
  {
    name: "সাদা লাল কম্বো",
    offerPrice: "2000 Tk",
    regularPrice: "2800 Tk",
    image: "/products/IMG_1552.jpg",
    description: "Elegant design with premium fabric.",
  },
  {
    name: "পারপেল কম্বো",
    offerPrice: "2000 Tk",
    regularPrice: "2800 Tk",
    image: "/products/WhatsApp Image 2026-08-04 at 9.03.59 PM.jpeg",
    description: "Stylish collection for modern fashion.",
  },
  {
    name: "গোলাপি কম্বো",
    offerPrice: "2000 Tk",
    regularPrice: "2800 Tk",
    image: "/products/IMG_1451.jpg",
    description: "Premium fashion combo for special occasions.",
  },
];


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const product = products[Number(id)];

  if (!product) {
    return (
      <h1>
        Product Not Found
      </h1>
    );
  }

  return (
    <main className="product-details">

      <img
        src={product.image}
        alt={product.name}
      />

      <div>
        <h1>
          {product.name}
        </h1>

        <h2 className="offer">
          Offer Price: {product.offerPrice}
        </h2>

        <p className="regular">
          Regular Price: {product.regularPrice}
        </p>

        <p>
          {product.description}
        </p>

        <a
  href={`https://wa.me/+880 1877-392997?text=আমি ${product.name} অর্ডার করতে চাই`}
  target="_blank"
>
  <button>
    Order Now
  </button>
</a>
      </div>

    </main>
  );
}