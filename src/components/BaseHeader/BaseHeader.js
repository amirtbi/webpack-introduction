import "./style.scss";
class BaseHeader {
  render() {
    const headerEl = document.createElement("header");
    headerEl.innerText = "header component";
    headerEl.classList.add("custom-header");

    const body = document.querySelector("body");
    body.append(headerEl);
  }
}

export default BaseHeader;
