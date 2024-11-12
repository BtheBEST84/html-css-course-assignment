let cartList = JSON.parse(localStorage.getItem("cartList"));
let cart;

if (JSON.parse(localStorage.getItem("cartList")) === null) {
  cart = [];
} else {
  cart = cartList;
}

function renderCart() {
  document.getElementById("shopping-cart").innerHTML = `
    <a href="shopping-cart.html"
                  ><span class="material-symbols-outlined size-36"
                    >shopping_cart</span
                  >CART (${cart.length})</a
                >
    `;
}

renderCart();
