// Load games
let gamesList = [];
let games = [];

getGames();

async function getGames() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/gamehub");
    const data = await response.json();
    gamesList = data;
    renderGames();
    // console.log(gamesList);
  } catch (error) {
    console.log("ERROR!", error);
  }
}

function renderGames() {
  document.getElementById("game-row").innerHTML = `

    ${gamesList.data
      .map(function (game) {
        return `
        <div id="games-in-list">
        <a href="game_spacewar.html">
                <img
                  src="${game.image.url}"
                  class="gameCover"
                  alt="${game.image.alt}"
                >
              </a>
              <div class="div-btn-add-to-shopping-cart" onclick="addToCart('${game.id}')">
                <a class="btn btn-add-to-shopping-cart">
                  <span class="material-symbols-outlined size-32">
                  add_shopping_cart
                  </span>
                </a>
              </div>
              <p class="game-title">${game.title}</p>
              <div class="game-details">
                <p class="price">$ ${game.price}</p>
                <a class="btn btn-details" href="game_spacewar.html">DETAILS</a>
              </div>
              </div>
        `;
      })
      .join("")}
    `;

  document.getElementById("shopping-cart").innerHTML = `
    <a href="shopping-cart.html"
                  ><span class="material-symbols-outlined size-36"
                    >shopping_cart</span
                  >CART (${cart.length})</a
                >
    `;
}

// let cart;

// renderGames();

// Create cart array
let cartList = JSON.parse(localStorage.getItem("cartList"));
let cart;

if (JSON.parse(localStorage.getItem("cartList")) === null) {
  cart = [];
} else {
  cart = cartList;
}
// Add to cart function

function addToCart(id) {
  //check if the product is already in the cart

  if (cart.some((item) => item.id === id)) {
    alert("Product already in the cart");
  } else {
    const item = gamesList.data.find((game) => game.id === id);
    cart.push(item);
    document.getElementById("shopping-cart").innerHTML = `
    <a href="shopping-cart.html"
                  ><span class="material-symbols-outlined size-36"
                    >shopping_cart</span
                  >CART (${cart.length})</a
                >
    `;
    localStorage.setItem("cartList", JSON.stringify(cart));
    let cartList = JSON.parse(localStorage.getItem("cartList"));
    console.log(cartList);
  }
}
