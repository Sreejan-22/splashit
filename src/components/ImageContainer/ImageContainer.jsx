import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ImageContainer.css";
import { fetchImages, searchImages } from "../../api/api";
import Modal from "../Modal/Modal";
import Loader from "react-loader-spinner";

const ImageContainer = ({ showFilters }) => {
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [selectedURL, setSelectedURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPages((prevCount) => prevCount + 1);
      }
    })
  );

  useEffect(() => {
    if (location.pathname.includes("/search")) {
      setPages(1);
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    setLoading(true);
    if (location.pathname.includes("/search")) {
      const searchParams = new URLSearchParams(location.search);
      searchImages(searchParams, pages)
        .then((res) => {
          if (pages > 1) {
            setImages((prevImages) => setImages([...prevImages, ...res]));
          } else {
            setImages(res);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      fetchImages(pages)
        .then((res) => {
          if (pages > 1) {
            setImages((prevImages) => setImages([...prevImages, ...res]));
          } else {
            setImages(res);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [pages, location.pathname, location.search]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <div
      className={`image-container ${
        showFilters ? "image-container-filters" : ""
      }${location.pathname === "/" ? "image-container-sm" : ""}`}
    >
      {images &&
        images.map((image) => {
          return (
            // used event delegation to have only one event listener in parent instead of one event listener for every image
            <div
              className="grid-image-wrapper"
              key={image.id}
              ref={setLastElement}
              onClick={(e) => {
                if (e.target.tagName === "IMG") {
                  if (window.screen.width >= 768) {
                    setSelectedURL(e.target.src);
                  }
                }
              }}
            >
              <img
                src={image.urls.small}
                alt=""
                className="grid-img"
                // onClick={() => {
                //   if (window.screen.width >= 768) {
                //     setSelectedURL(image.urls.small);
                //   }
                // }}
              />
            </div>
          );
        })}
      {!loading &&
      location.pathname.includes("/search") &&
      images &&
      images.length === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
          No results found
        </h1>
      ) : null}
      {loading && (
        <Loader
          type="Oval"
          color="#3f3f3f"
          height={50}
          width={50}
          style={{ gridColumn: "1 / 5", justifySelf: "center" }}
        />
      )}
      {selectedURL && (
        <Modal url={selectedURL} setSelectedURL={setSelectedURL} />
      )}
    </div>
  );
};

export default ImageContainer;
