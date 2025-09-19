import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { searchImages } from "./services/unsplash";

const PER_PAGE = 12;

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError("");
        const data = await searchImages(query, page, PER_PAGE);
        if (cancelled) return;

        setItems((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
        setTotalPages(data.total_pages ?? 0);
      } catch (e) {
        const msg =
          e?.response?.status === 403
            ? "Rate limit reached or invalid key. Check your Unsplash Access Key."
            : e?.response?.status === 401
            ? "Unauthorized: check VITE_UNSPLASH_ACCESS_KEY value."
            : e?.message || "Failed to load images. Try again later.";
        setError(msg);
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [query, page]);

  const onSearchSubmit = (newQuery) => {
    const q = newQuery.trim();
    if (!q) {
      toast.error("Please enter a search term 🔎");
      return;
    }
    if (q === query) return;
    setQuery(q);
    setPage(1);
    setItems([]);
    setTotalPages(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onLoadMore = () => setPage((p) => p + 1);

  const onImageClick = (img) => {
    setModalImage(img);
    setModalOpen(true);
  };

  const canLoadMore = useMemo(
    () => items.length > 0 && page < totalPages,
    [items.length, page, totalPages]
  );

  return (
    <>
      {/* Sticky blue header with centered search */}
      <SearchBar onSubmit={onSearchSubmit} />

      {/* Content area */}
      <div className="container page">
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <ImageGallery items={items} onImageClick={onImageClick} />
            {loading && <Loader />}
            {canLoadMore && !loading && <LoadMoreBtn onClick={onLoadMore} />}
          </>
        )}
      </div>

      <ImageModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        image={modalImage}
      />
      <Toaster position="top-center" />
    </>
  );
}
