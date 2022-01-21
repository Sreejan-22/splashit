import { useEffect, useRef, useState } from "react";
import { fetchImages } from "../../api/api";
import Modal from "../../components/Modal/Modal";
import Loader from "react-loader-spinner";
import "./Home.css";

const ImageContainer = () => {
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
    setLoading(true);
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
  }, [pages]);

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
    <div className="image-container">
      {images &&
        images.map((image) => {
          return (
            <div
              className="grid-image-wrapper"
              key={image.id}
              ref={setLastElement}
            >
              <img
                src={image.urls.small}
                alt=""
                className="grid-img"
                onClick={() => {
                  if (window.screen.width >= 768) {
                    setSelectedURL(image.urls.small);
                  }
                }}
              />
            </div>
          );
        })}
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
