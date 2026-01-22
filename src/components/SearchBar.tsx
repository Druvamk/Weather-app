import { useState, type FormEvent } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (city: string) => void;
  placeholder?: string;
}

function SearchBar({
  onSearch,
  placeholder = "Search for a city...",
}: SearchBarProps) {
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedCity = city.trim();
    if (trimmedCity) {
      onSearch(trimmedCity);
      setCity("");
    }
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div
        className={`${styles.searchInputWrapper} ${isFocused ? styles.focused : ""}`}
      >
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="submit"
          className={styles.searchButton}
          aria-label="Search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15.0001 15M17 10C17 13.3137 14.3137 16 11 16C7.68629 16 5 13.3137 5 10C5 6.68629 7.68629 4 11 4C14.3137 4 17 6.68629 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
