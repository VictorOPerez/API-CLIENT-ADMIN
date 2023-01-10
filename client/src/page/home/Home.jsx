import Featured from "../../components/featured/Featured.jsx";
import FeuturedProperties from "../../components/featuredProperties/FeuturedProperties.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Header from "../../components/header/Header.jsx";
import MailList from "../../components/mailList/MailList.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import PropertyLIst from "../../components/propertyLIst/PropertyLIst.jsx";
import "./home.css";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeConteiner">
        <Featured />
        <h1 className="homeTitle">Broese by property type</h1>
        <PropertyLIst />
        <h1 className="homeTitle">Homes gusts love</h1>
        <FeuturedProperties />
      </div>
      <MailList />
      <Footer />
    </div>
  );
}

export default Home;
