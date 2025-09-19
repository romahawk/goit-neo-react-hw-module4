import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.wrap}>
      <ClipLoader size={28} />
    </div>
  );
}
