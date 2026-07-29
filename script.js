const PRODUCTS = {
  whey: {
    name: "Whey Protein",
    price: 1999,
    qtyId: "quantity-whey"
  },

  creatine: {
    name: "Creatine",
    price: 999,
    qtyId: "quantity-creatine"
  },

  gainer: {
    name: "Mass Gainer",
    price: 2449,
    qtyId: "quantity-gainer"
  }
};

let quantities = {
  whey: 0,
  creatine: 0,
  gainer: 0
};

let cartItems = [];


function totalItems() {
  return cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
}


function cartTotal() {
  return cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}


function changeQuantity(id, amount) {

  quantities[id] = Math.max(
    0,
    quantities[id] + amount
  );

  document.getElementById(
    PRODUCTS[id].qtyId
  ).textContent = quantities[id];
}


function addToCart(id) {

  const product = PRODUCTS[id];

  if (quantities[id] < 1) {
    quantities[id] = 1;

    document.getElementById(
      product.qtyId
    ).textContent = "1";
  }

  const existing = cartItems.find(
    item => item.id === id
  );

  if (existing) {

    existing.quantity++;

  } else {

    cartItems.push({
      id: id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  updateCart();

  alert(
    "💪 " +
    product.name +
    " added to cart!"
  );
}


function updateCart() {

  const count = totalItems();
  const total = cartTotal();

  document.getElementById(
    "cartCount"
  ).textContent = count;

  document.getElementById(
    "cartTotal"
  ).textContent = "₹" + total;


  const box = document.getElementById(
    "cartItems"
  );


  if (cartItems.length === 0) {

    box.innerHTML =
      '<p class="no-results">Your cart is empty.</p>';

    return;
  }


  box.innerHTML = cartItems.map(
    (item, index) => `

      <div class="cart-item">

        <div>
          <strong>${item.name}</strong>
          <br>
          <small>
            ₹${item.price} × ${item.quantity}
          </small>
        </div>

        <div>
          <strong>
            ₹${item.price * item.quantity}
          </strong>

          <br>

          <button
            onclick="removeItem(${index})">
            ❌ Remove
          </button>
        </div>

      </div>

    `
  ).join("");
}


function removeItem(index) {

  if (
    index < 0 ||
    index >= cartItems.length
  ) {
    return;
  }

  const removed = cartItems[index];

  quantities[removed.id] = 0;

  document.getElementById(
    PRODUCTS[removed.id].qtyId
  ).textContent = "0";

  cartItems.splice(index, 1);

  updateCart();
}


function resetCart() {

  cartItems = [];

  quantities = {
    whey: 0,
    creatine: 0,
    gainer: 0
  };


  Object.values(PRODUCTS).forEach(
    product => {

      const element =
        document.getElementById(
          product.qtyId
        );

      if (element) {
        element.textContent = "0";
      }

    }
  );


  updateCart();

  closeCart();
}


function openCart() {

  document
    .getElementById("cartOverlay")
    .classList.remove("hidden");

  updateCart();
}


function closeCart(event) {

  const overlay =
    document.getElementById("cartOverlay");


  if (
    !event ||
    event.target === overlay
  ) {

    overlay.classList.add("hidden");
  }
}


function openCheckout() {

  if (cartItems.length === 0) {

    alert("🛒 Your cart is empty!");

    return;
  }


  closeCart();

  document
    .getElementById("checkoutOverlay")
    .classList.remove("hidden");
}


function closeCheckout(event) {

  const overlay =
    document.getElementById(
      "checkoutOverlay"
    );


  if (
    !event ||
    event.target === overlay
  ) {

    overlay.classList.add("hidden");
  }
}


function searchProduct() {

  const input =
    document
      .getElementById("search")
      .value
      .trim()
      .toLowerCase();


  const cards =
    document.querySelectorAll(
      ".product-card"
    );


  let visible = 0;


  cards.forEach(card => {

    const name =
      card.dataset.name
        .toLowerCase();


    const show =
      name.includes(input);


    card.style.display =
      show ? "" : "none";


    if (show) {
      visible++;
    }

  });


  document
    .getElementById("noResults")
    .classList.toggle(
      "hidden",
      visible !== 0
    );
}


function checkout() {

  const name =
    document
      .getElementById("name")
      .value
      .trim();


  const phone =
    document
      .getElementById("phone")
      .value
      .trim();


  const address =
    document
      .getElementById("address")
      .value
      .trim();


  if (
    !name ||
    !phone ||
    !address
  ) {

    alert(
      "⚠️ Please fill all details!"
    );

    return;
  }


  if (cartItems.length === 0) {

    alert(
      "🛒 Your cart is empty!"
    );

    return;
  }


  const orderId =
    Math.floor(
      Math.random() * 900000
    ) + 100000;


  const productsText =
    cartItems
      .map(item =>
        `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`
      )
      .join("\n");


  const total = cartTotal();


  const message =
`🛒 New Order

🆔 Order ID: ${orderId}

👤 Name: ${name}
📱 Phone: ${phone}
🏠 Address: ${address}

💪 Products:
${productsText}

💰 Total: ₹${total}`;


  if (
    typeof saveOrder === "function"
  ) {

    saveOrder(
      name,
      phone,
      address,
      productsText,
      total
    );

  }


  window.open(
    "https://api.whatsapp.com/send?phone=918264028870&text=" +
    encodeURIComponent(message),
    "_blank"
  );


  resetCart();


  document.getElementById(
    "name"
  ).value = "";

  document.getElementById(
    "phone"
  ).value = "";

  document.getElementById(
    "address"
  ).value = "";


  closeCheckout();
}


document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateCart();

  }
);
