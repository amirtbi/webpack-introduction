import "./style.scss";
class BaseHeader {
  render(pageTitle) {
    const headerEl = document.createElement("header");
    headerEl.innerText = "header component in page" + pageTitle;
    headerEl.classList.add("custom-header");

    const body = document.querySelector("body");
    body.append(headerEl);
  }
}

export default BaseHeader;
