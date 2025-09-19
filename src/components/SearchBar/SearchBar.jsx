import { useState } from "react";
import { toast } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) {
      toast.error("Please enter a search term 🔎");
      return;
    }
    onSubmit(q);
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className={css.button} type="submit">Search</button>
      </form>
    </header>
  );
}
