import "./style.scss";
import Flower from "../../flower.svg";
import Nature from "../../nature.jpg";
class BaseButton {
  #buttonClass = "btnAdd";
  render(text) {
    const btnEl = document.createElement("button");
    const imageEl = document.createElement("img");
    const imageEl1 = document.createElement("img");
    btnEl.innerText = text;
    btnEl.classList.add(this.#buttonClass);

    btnEl.onclick = () => {
      imageEl.src = Flower;
      imageEl1.src = Nature;
      body.appendChild(imageEl);
      body.appendChild(imageEl1);
    };
    const body = document.querySelector("body");
    body.appendChild(btnEl);
  }
}

export default BaseButton;
