import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const api = axios.create({
  baseURL: "https://api.unsplash.com",
  // use params auth to avoid header being stripped by shields/adblockers
  params: {
    client_id: ACCESS_KEY,
  },
  timeout: 12000,
});

// Normalized response: { results, total, total_pages }
export async function searchImages(query, page = 1, perPage = 12) {
  if (!ACCESS_KEY) {
    throw new Error("Missing VITE_UNSPLASH_ACCESS_KEY");
  }
  const { data } = await api.get("/search/photos", {
    params: {
      query,
      page,
      per_page: perPage,
      orientation: "landscape",
    },
  });
  return data;
}
