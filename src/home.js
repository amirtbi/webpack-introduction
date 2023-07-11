import BaseButton from "./components/BaseButtons/BaseButton";
import BaseHeader from "./components/BaseHeader/BaseHeader";
import _ from "loadsh";

// Call function
const BaseButtonCl = new BaseButton();
const BaseHeaderCl = new BaseHeader();

BaseHeaderCl.render(_.upperFirst("home"));
BaseButtonCl.render("hello new webpack");
