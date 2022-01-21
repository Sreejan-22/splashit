import { lazy, Suspense } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "react-loader-spinner";
const Images = lazy(() =>
  import("../../components/ImageContainer/ImageContainer")
);

const Home = () => {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <Loader
            type="Oval"
            color="#3f3f3f"
            height={50}
            width={50}
            style={{ textAlign: "center" }}
          />
        }
      >
        <Images />
      </Suspense>
    </>
  );
};

export default Home;
