import "./style.scss";
import BackgroundImage1 from "./car-1.jpeg";
import BackgroundImage2 from "./car-2.jpeg";
import BackgroundImage3 from "./car-3.jpeg";

const bgList = [BackgroundImage1, BackgroundImage2, BackgroundImage3];
export default class Gallery {
  #counter = 0;
  render() {
    const bodyDomElement = document.querySelector("body");
    const mainEl = document.createElement("main");
    for (const image of bgList) {
      const imageParent = document.createElement("div");
      const imageEl = document.createElement("img");
      imageEl.src = bgList[this.#counter];
      imageEl.alt = "collection";
      imageEl.className = "image";
      imageParent.classList.add("image-container");
      imageParent.appendChild(imageEl);
      import("ImageCaption/imageCaption").then((ImageCaptionModule) => {
        const ImageCaption = ImageCaptionModule.default;
        const imageCaption = new ImageCaption();
        imageCaption.render("some caption text for imagae", imageParent);
      });
      mainEl.appendChild(imageParent);
    }

    bodyDomElement.appendChild(mainEl);

    this.#counter += 1;
  }
}
