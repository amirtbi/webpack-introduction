import Header from "../../components/BaseHeader/BaseHeader";
import Gallery from "../../components/imageGallery/imageGallery";
// import _ from "loadsh";
import React from "react";
// Classes

const HeaderCl = new Header();
const GalleryCl = new Gallery();

HeaderCl.render("Gallery");
GalleryCl.render();

// Importing shared button component from Home app
import("HomeApp/HomeBaseButton").then((HomeAppButtonModule) => {
  const HomeAppButton = HomeAppButtonModule.default;
  const SharedButton = new HomeAppButton();
  SharedButton.render("Shared button");
});

import("HomeApp/HomeBaseList").then((HomeBaseListModule) => {
  const HomeListModule = HomeBaseListModule.default;
  const HomeList = new HomeListModule(["Green", "Red", "Blue"], "Colors");
  HomeList.render();
});