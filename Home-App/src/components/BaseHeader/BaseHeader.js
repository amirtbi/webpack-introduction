import "./style.scss";
class BaseHeader {
  render(pageTitle) {
    const headerEl = document.createElement("header");

    headerEl.innerHTML = `<nav>
    <ul>
      <li>${pageTitle}</li>
    </ul>
    </nav>`;
    headerEl.classList.add("custom-header");

    const body = document.querySelector("body");
    body.prepend(headerEl);
  }
}

export default BaseHeader;
