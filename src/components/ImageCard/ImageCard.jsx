import css from "./ImageCard.module.css";

export default function ImageCard({ image, onClick }) {
  const src = image.urls?.small;
  const alt = image.alt_description ?? "Image";
  return (
    <div className={css.card} onClick={onClick} role="button" tabIndex={0}>
      <img className={css.img} src={src} alt={alt} loading="lazy" />
    </div>
  );
}
