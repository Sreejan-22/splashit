import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "4rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem" }}>404</h1>
      <br />
      <br />
      <br />
      <h1>Ooops, looks like something went wrong</h1>
      <br />
      <br />
      <br />
      <button
        style={{
          backgroundColor: "#3db46d",
          color: "white",
          border: "none",
          outline: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontSize: "1rem",
          padding: "0.5rem 0.75rem",
        }}
        onClick={() => navigate("/")}
      >
        Back Home
      </button>
    </div>
  );
};

export default NotFound;
