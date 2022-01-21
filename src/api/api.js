require("dotenv").config();

const baseURL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export async function fetchImages(pageNumber) {
  // Food and Drink for Winter collection photos in the landing page
  const response = await fetch(
    `${baseURL}/collections/1528792/photos?page=${pageNumber}&per_page=24`,
    {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function searchImages(searchParams, pageNumber) {
  const response = await fetch(
    `${baseURL}/search/photos?${searchParams}&${new URLSearchParams({
      page: pageNumber,
      per_page: 24,
    })}`,
    {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    }
  );

  const data = await response.json();
  return data.results;
}
