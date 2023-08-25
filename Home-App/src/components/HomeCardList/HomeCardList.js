import "./style.scss";

export default class CardList {
  constructor(products) {
    this.products = products;
  }

  createListItem(products) {
    for (const product of products) {
      const liEl = document.createElement("li");
      liEl.innerHTML = `
              <div class='item-container'>
               <p>${product.name}</p>
               <p>${product.price}</p>   
              </div>
              `;
      liEl.classList.add("list-item");
      return liEl;
    }
  }
  createList() {
    for (const row of this.products) {
      const ulEl = document.createElement("ul");
      console.log("Row", row);
      for (const product of row.items) {
        const liEl = document.createElement("li");
        liEl.innerHTML = `
                <div class='item-container'>
                 <p>${product.name}</p>
                 <p>${product.price}</p>   
                </div>
                `;
        liEl.classList.add("list-item");
        ulEl.classList.add("card-container");
        ulEl.appendChild(liEl);
        this.cardEl.appendChild(ulEl);
      }
    }
  }
  render() {
    // Create card container
    this.cardEl = document.createElement("div");
    const titleEl = document.createElement("h1");
    titleEl.innerHTML = "Row of Vehicles";
    this.cardEl.prepend(titleEl);
    const bodEl = document.querySelector("body");
    // Styles

    this.createList();

    this.cardEl.classList.add("product-wrapper");

    bodEl.append(this.cardEl);
  }
}
