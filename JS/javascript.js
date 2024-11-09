fetch("https://docs.noroff.dev/docs/v2/e-commerce/gamehub")
  .then((response) => response.json())
  .then((json) => console.log(json));
