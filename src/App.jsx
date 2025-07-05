import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Order from "./Order";

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>

      <Order />
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
