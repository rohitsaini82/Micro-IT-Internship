import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/Items.css";

function Items() {
  const targetUrl = "https://dummyjson.com/products";
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(targetUrl);
        setItems(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
      }
    }
    fetchData();
  }, []);

  // Log items when they update
  useEffect(() => {
    if (items.length > 0) {
      console.log("First Item:", items[0]);
    }
  }, [items]);

  return items.length < 1 ? (
    <div>Loading...</div>
  ) : (
    <div className="container">
      <div className="flex just-items" style={{ width: "80vw", marginTop: "6em", overflowX: "scroll" }}>
        {items.map((obj) => (
          <ItemCard key={obj.id} id={obj.id} title={obj.title} image={obj.thumbnail} price={obj.price} category={obj.category} />
        ))}
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";

function ItemCard({ id, image, title, price, category, addToCart }) {
  return (
    <div className="itemCard boxShadow">
      {/* Image Section */}
      <div className="part" style={{ height: "50%" }}>
        <img src={image} style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={title} />
      </div>

      {/* Details Section */}
      <div className="part detail-part" style={{ height: "50%" }}>
        <h4 className="left-title">{category || "Category"}</h4>
        <p className="p-title">{title || "Product Title"}</p>
        <div className="left-title price">
          <p>{price ? `$${price}` : "Price Not Available"}</p>
        </div>

        {/* Buttons */}
        <div className="button-container">
          <button className="add-to-cart" onClick={() => addToCart(id)}>🛒 Add to Cart</button>
          <Link to={`/product/${id}`} className="preview-btn">🔍 Preview</Link>
        </div>
      </div>
    </div>
  );
}



export default Items;
