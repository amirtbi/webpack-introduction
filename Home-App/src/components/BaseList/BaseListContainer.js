import "./style.scss";
export class ProductCl {
  constructor(lists, title) {
    this.lists = lists;
    this.title = title;
  }
  render() {
    // Elements
    const ulEl = document.createElement("ul");
    ulEl.className = "lists";

    const bodyEl = document.querySelector("body");

    const ulTextNode = document.createTextNode("Titles");

    ulEl.prepend(ulTextNode);
    // listEl.prepend(this.title);
    // Adding data
    for (const list of this.lists) {
      const listEl = document.createElement("li");
      listEl.className = "list-item";
      const textNode = document.createTextNode(list);
      console.log("list", list);
      listEl.appendChild(textNode);
      ulEl.append(listEl);
    }
    // Add ulEl to body
    bodyEl.append(ulEl);
  }
}

export default ProductCl;
