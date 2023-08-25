const url = window.location.pathname;

if (url === "/home-app-page") {
  import("HomeApp/HomeAppPage").then((HomeAppPageModule) => {
    const products = [
      {
        category: "Cars",
        items: [
          { name: "Benz", price: "2000" },
          { name: "Ferrari", price: "10000" },
        ],
      },
      {
        category: "Motorbik",
        items: [
          { name: "Saipa", price: "2000" },
          { name: "Irankhodro", price: "10000" },
        ],
      },
    ];
    const HomeAppModule = HomeAppPageModule.default;
    const HomeApp = new HomeAppModule();
    HomeApp.render(products);
  });
} else if (url === "/gallery-app-page") {
  import("GalleryApp/GalleryAppPage").then((GalleryAppModule) => {
    const GalleryModule = GalleryAppModule.default;
    const GalleryApp = new GalleryModule();
    GalleryApp.render();
  });
}
