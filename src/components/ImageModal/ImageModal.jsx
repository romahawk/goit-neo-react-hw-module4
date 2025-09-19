import ReactModal from "react-modal";
import css from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

export default function ImageModal({ isOpen, onRequestClose, image }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={css.overlay}
      className={css.content}
      shouldCloseOnOverlayClick
    >
      {image && (
        <figure className={css.figure}>
          <img
            className={css.img}
            src={image.urls?.regular}
            alt={image.alt_description ?? "Large"}
          />
          <figcaption className={css.caption}>
            <div>
              <strong>{image.user?.name}</strong>
              {image.user?.username && <> @{image.user.username}</>}
            </div>
            <div>❤️ {image.likes} {image.description ? `• ${image.description}` : ""}</div>
          </figcaption>
        </figure>
      )}
    </ReactModal>
  );
}
