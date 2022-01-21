import React, { Suspense } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "react-loader-spinner";
import "./Home.css";
const Images = React.lazy(() =>
  import("../../components/ImageContainer/ImageContainer")
);

const LoaderComp = () => {
  return (
    <Loader
      type="Oval"
      color="#3f3f3f"
      height={50}
      width={50}
      style={{ textAlign: "center" }}
    />
  );
};

const Home = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoaderComp />}>
        <Images />
      </Suspense>
    </>
  );
};

export default Home;
