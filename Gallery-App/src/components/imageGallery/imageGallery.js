import BackgroundImage1 from "./image-1.jpg";
import BackgroundImage2 from "./image-2.jpg";
import BackgroundImage3 from "./image-3.jpeg";

const bgList = [BackgroundImage1, BackgroundImage2, BackgroundImage3];
export default class Gallery {
  #counter = 0;
  render() {
    const imageEl = document.createElement("img");
    imageEl.src = bgList[this.#counter];
    imageEl.alt = "collection";

    const bodyDomElement = document.querySelector("body");

    bodyDomElement.appendChild(imageEl);
    this.#counter += 1;
  }
}
