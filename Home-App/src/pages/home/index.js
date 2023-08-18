import BaseButton from "../../components/BaseButtons/BaseButton";
import BaseHeader from "../../components/BaseHeader/BaseHeader";
import BaseProducts from "../../components/BaseList/BaseListContainer";
// import _ from "loadsh";
// import React from "react";

const lists = ["benz", "Pride", "Cerato"];
// Call function
const BaseButtonCl = new BaseButton();
const BaseHeaderCl = new BaseHeader();
const BaseList = new BaseProducts(lists, "Header of list");

BaseHeaderCl.render("Home");
BaseButtonCl.render("hello new webpack");
BaseList.render();
