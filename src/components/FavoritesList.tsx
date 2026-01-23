import { useAppSelector, useAppDispatch } from "../store/hooks";
import { removeFavorite } from "../store/api/favoritesSlice";
import styles from "./FavoritesList.module.css";

const FavoritesList = () => {
  const favorites = useAppSelector((state) => state.favorites.cities);
  const dispatch = useAppDispatch();

  if (favorites.length === 0) {
    return <p className={styles.empty}>No favorite cities yet ⭐</p>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>⭐ Favorite Cities</h3>
      <ul className={styles.list}>
        {favorites.map((city) => (
          <li key={city.id} className={styles.item}>
            <span>
              {city.name}, {city.country}
            </span>
            <button
              onClick={() => dispatch(removeFavorite(city.id))}
              className={styles.removeBtn}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
