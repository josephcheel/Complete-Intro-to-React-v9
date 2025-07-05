import { useContext, useEffect, useState } from "react";
import Pizza from "./Pizza";
import Cart from "./Cart";
import { CartContext } from "./contexts";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setpizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    if (selectedPizza) {
      price = intl.format(selectedPizza.sizes[pizzaSize]);
    }
  }

  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJSON = await pizzaRes.json();
    setPizzaTypes(pizzaJSON);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ cart: cart }), // Same as body: JSON.stringify({ cart }),
    });
    setCart([]);
    setLoading(false);
  }
  return (
    <section className="order-page">
      <section className="order">
        <h2>Order Page</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([
              ...cart,
              { pizza: selectedPizza, size: pizzaSize, price },
            ]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                onChange={(e) => setPizzaType(e.target.value)}
                name="pizza-type"
                value={pizzaType}
              >
                {/* <option value="Pepperoni">The Pepperoni Pizza</option>
              <option value="Hawaiian">The Hawaiian Pizza</option>
              <option value="Americano">The Americano Pizza</option> */}
                {pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    type="radio"
                    name="pizza-size"
                    value="S"
                    checked={pizzaSize === "S"}
                    onChange={(e) => setpizzaSize(e.target.value)}
                    id="pizza-s"
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="pizza-size"
                    value="M"
                    checked={pizzaSize === "M"}
                    onChange={(e) => setpizzaSize(e.target.value)}
                    id="pizza-m"
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="pizza-size"
                    value="L"
                    checked={pizzaSize === "L"}
                    onChange={(e) => setpizzaSize(e.target.value)}
                    id="pizza-l"
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          {!selectedPizza ? (
            <h1>loading pizza lol</h1>
          ) : (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                images={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          )}
        </form>
      </section>
      {loading ? (
        <h2>LOADING ...</h2>
      ) : (
        <Cart cart={cart} checkout={checkout} />
      )}
    </section>
  );
}
