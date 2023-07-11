import Header from "./components/BaseHeader/BaseHeader";
import Gallery from "./components/imageGallery/imageGallery";
import _ from "loadsh";
// Classes

const HeaderCl = new Header();
const GalleryCl = new Gallery();

HeaderCl.render(_.upperFirst("gallery"));
GalleryCl.render();
