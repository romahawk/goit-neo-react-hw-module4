import css from "./ImageCard.module.css";

export default function ImageCard({ image, onClick }) {
  const src = image?.urls?.small ?? image?.urls?.thumb ?? "";
  const alt = image?.alt_description ?? "Image";

  return (
    <div className={css.card}>
      <img
        className={css.img}
        src={src}
        alt={alt}
        loading="lazy"
        onClick={onClick}
      />
    </div>
  );
}
