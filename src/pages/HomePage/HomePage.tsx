import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <main className="home-page-main-container">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default HomePage;
