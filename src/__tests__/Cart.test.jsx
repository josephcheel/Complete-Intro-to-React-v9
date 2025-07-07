import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

test("snapshot with nothing in the cart inline", () => {
  const { asFragment } = render(<Cart cart={[]} />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="cart"
      >
        <h2>
          Cart
        </h2>
        <ul />
        <p>
          Total €0.00
        </p>
        <button>
          Checkout
        </button>
      </div>
    </DocumentFragment>
  `);
});

test("snapshot with nothing in the cart", () => {
  const { asFragment } = render(<Cart cart={[]} />);
  expect(asFragment()).toMatchSnapshot();
});
