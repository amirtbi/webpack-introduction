import CardList from "../../components/HomeCardList/HomeCardList";

// const products = [
//   {
//     category: "Cars",
//     items: [
//       { name: "Benz", price: "2000" },
//       { name: "Ferrari", price: "10000" },
//     ],
//   },
//   {
//     category: "Motorbik",
//     items: [
//       { name: "Saipa", price: "2000" },
//       { name: "Irankhodro", price: "10000" },
//     ],
//   },
// ];

class HomeApp {
  render(products) {
    const cardListCL = new CardList(products);
    cardListCL.render();
  }
}

export default HomeApp;
