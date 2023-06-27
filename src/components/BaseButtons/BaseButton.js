import "./style.scss";

class BaseButton {
  buttonClass = "btnAdd";
  render(text) {
    const btnEl = document.createElement("button");

    btnEl.innerText = text;
    btnEl.classList.add(this.buttonClass);

    btnEl.onclick = () => {
      alert("clicked button");
    };
    const body = document.querySelector("body");
    body.appendChild(btnEl);
  }
}

export default BaseButton;
