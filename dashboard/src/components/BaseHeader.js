import "./style.css";
export default class BaseHeader {
  render(navItems) {
    const bodyEl = document.querySelector("body");
    const headerEl = document.createElement("header");
    const ulEl = document.createElement("ul");
    ulEl.classList.add("list-container");
    headerEl.classList.add("header-container");

    for (const nav of navItems) {
      const liEl = document.createElement("li");
      liEl.classList.add("list");
      liEl.innerHTML += `<a href=${nav.url}>${nav.name}</a>`;
      ulEl.append(liEl);
    }
    headerEl.appendChild(ulEl);
    bodyEl.appendChild(headerEl);
  }
}
