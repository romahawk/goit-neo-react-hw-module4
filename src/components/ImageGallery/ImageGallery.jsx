import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ items, onImageClick }) {
  if (!items?.length) return null;
  return (
    <ul className={css.list}>
      {items.map((img) => (
        <li key={img.id} className={css.item}>
          <ImageCard image={img} onClick={() => onImageClick(img)} />
        </li>
      ))}
    </ul>
  );
}
