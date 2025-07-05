import { useEffect, useState } from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("Pepperoni");
  const [pizzaSize, setpizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    if (selectedPizza) {
      price = intl.format(selectedPizza.sizes[pizzaSize]);
      console.log(selectedPizza.sizes);
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

  return (
    <div className="order">
      <h2>Order Page</h2>
      <form>
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
            <button type="submit">Add to Cart</button>
            <div className="order-pizza">
              {!selectedPizza ? (
                <h1>loading pizza lol</h1>
              ) : (
                <Pizza
                  name={selectedPizza.name}
                  description={selectedPizza.description}
                  images={selectedPizza.image}
                />
              )}
              <p>{price}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
