let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
let cart = [...cartList];

function renderCart() {
  document.getElementById("shopping-cart").innerHTML = `
    <a href="shopping-cart.html">
      <span class="material-symbols-outlined size-36">shopping_cart</span>
      CART (${cart.length})
    </a>
  `;
}

renderCart();

let total = cartList
  .reduce((accumulator, current) => accumulator + (current.price || 0), 0)
  .toFixed(2);

function renderShoppingCartContent() {
  document.getElementById("shopping-cart-items").innerHTML = `
    <div class="shopping-cart-with-item-content">
      <div>
        <h1 class="page-header">Shopping Cart</h1>
      </div>
      ${cart
        .map(function (item) {
          return `
          <div class="shopping-cart-items">
            <div class="shopping-cart-item-title">
              <div class="game-title-with-in-stock">
                <img
                  class="shopping-cart-item-picture"
                  src="${item.image.url}"
                  alt="Game cover"
                />
                <p>In stock</p>
              </div>
              <p>${item.title}</p>
            </div>
            <div class="shopping-cart-item-price">
              <p>$${item.price}</p>
              <a href="#button-press">
                <span class="material-symbols-outlined" onclick="deleteFromCart('${item.id}')">delete_forever</span>
              </a>
            </div>
          </div>
          `;
        })
        .join("")}
      <div class="div-total-to-pay">
        <div class="total-to-pay">
          <p>TOTAL</p>
          <p>$${total}</p>
        </div>
      </div>
      <div class="div-shopping-cart-buttons">
        <a class="btn btn-shopping-cart" id="checkout-button" onClick="checkOut()">Checkout</a>
        <a class="btn btn-shopping-cart" id="continue-shopping" href="games.html">Continue shopping</a>
      </div>
    </div>
  `;
}

renderShoppingCartContent();

function deleteFromCart(id) {
  // Remove the item with the given ID from the cart
  cart = cart.filter((game) => game.id !== id);

  if (cart.length === 0) {
    // If cart is empty, remove it from localStorage
    localStorage.removeItem("cartList");
  } else {
    // Update localStorage with the new cart
    localStorage.setItem("cartList", JSON.stringify(cart));
  }

  // Recalculate the total after deletion
  total = cart.reduce(
    (accumulator, current) => accumulator + (current.price || 0),
    0
  );

  // Rerender the cart icon and shopping cart items
  renderCart();
  renderShoppingCartContent();
}

function checkOut() {
  if (cart.length < 1) {
    document.getElementById("shopping-cart-items").innerHTML = `
    
        <div class="modal">
          <h2>You have to add games</h2>
          <div class="modal-content">
            <a class="close" href="games.html">&times;</a>
            <span class="material-symbols-outlined" id="checked"> X </span>
          </div>
        </div>
    
    `;
  } else {
    document.getElementById("shopping-cart-items").innerHTML = `
    
        <div class="modal">
          <h2>Successfully checked out</h2>
          <div class="modal-content">
            <a class="close" href="index.html">&times;</a>
            <span class="material-symbols-outlined" id="checked"> check </span>
          </div>
        </div>
    
    `;
    localStorage.removeItem("cartList");
  }
}
