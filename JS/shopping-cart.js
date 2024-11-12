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

function renderShoppingCartContent() {
  if (JSON.parse(localStorage.getItem("cartList") === null)) {
    document.getElementById("shopping-cart-items").innerHTML = `
    <div class="div-flex-row contact-content">
        <div class="shopping-cart">
          <h1 class="page-header">Shopping Cart</h1>
          <div class="shopping-cart-content">
            <div class="empty-shopping-cart">
              <div class="div-text-empty-shopping-cart">
                <p class="text-empty-shopping-cart">NO GAMES?</p>
                <p class="text-empty-shopping-cart">NO FUN!</p>
              </div>
              <div class="div-shopping-cart-button">
                <a class="btn btn-shopping-cart-empty" href="games.html"
                  >Find something to play</a
                >
              </div>
            </div>
          </div>
        </div>
        <img
          id="shopping-cart-picture"
          src="assets/images/florian-olivo-Mf23RF8xArY-unsplash-downscaled.png"
          alt="Guy gaming on a computer"
        />
      </div>
    `;
  } else {
    console.log(cartList);
    document.getElementById("shopping-cart-items").innerHTML = `
    <div class="shopping-cart-with-item-content">
     <div>
       <h1 class="page-header">Shopping Cart</h1>
     </div>
    ${cartList
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
         <p>${item.price}</p>
         <a href="#button-press">
           <span class="material-symbols-outlined"> delete_forever </span>
         </a>
       </div>
     </div>
     

    `;
      })
      .join("")}
      <div class="div-total-to-pay">
       <div class="total-to-pay">
         <p>TOTAL</p>
         <p>$13.99</p>
       </div>
     </div>
       <div class="div-shopping-cart-buttons">
       <a class="btn btn-shopping-cart" id="checkout-button" href="#checkout">
         Checkout
       </a>
       <a
         class="btn btn-shopping-cart"
         id="continue-shopping"
         href="games.html"
       >
         Continue shopping
       </a>
     </div>
   </div>
      `;
  }
}

// $cartList.data.map(function (item) {
//   return

renderShoppingCartContent();
