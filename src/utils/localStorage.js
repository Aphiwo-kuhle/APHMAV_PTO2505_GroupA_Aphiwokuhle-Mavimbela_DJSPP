export const getFavourites = () => {
  const data = localStorage.getItem("favourites");
  return data ? JSON.parse(data) : [];
};

export const saveFavourites = (favs) => {
  localStorage.setItem("favourites", JSON.stringify(favs));
};