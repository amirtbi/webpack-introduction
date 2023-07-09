import BaseButton from "./components/BaseButtons/BaseButton";
import BaseHeader from "./components/BaseHeader/BaseHeader";
// Call function
const BaseButtonCl = new BaseButton();
const BaseHeaderCl = new BaseHeader();

BaseHeaderCl.render();
BaseButtonCl.render("hello new webpack");
let name = "hosein";


if(process.env.NODE_ENV==='production'){
    console.log("production")
}else{
    console.log("development")
}
// BaseButtonCl.notHanldeMethod()