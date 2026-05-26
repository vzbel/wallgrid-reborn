import { getWallpapers } from "../services/wallpapers.js";
import { useEffect, useState } from "react";

import ImageFluid from "../components/ImageFluid.jsx";
import CreateWallpaperForm from "../components/CreateWallpaperForm.jsx";

const HomePage = () => {
  const [wallpapers, setWallpapers] = useState(null);

  // get all wallpapers
  useEffect(() => {
    getWallpapers()
      .then((res) => {
        setWallpapers(res.data);
      })
      .catch(console.error);
  }, []);

  // adds the wallpaper created w/ the create form
  // to the wallpapers list for display
  const addCreatedWallpaper = (wallpaper) => {
    setWallpapers(wallpapers.concat(wallpaper));
  };

  if (!wallpapers) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className="flex flex-wrap justify-center">
        {wallpapers.map((w) => (
          <ImageFluid
            key={w.id}
            src={w.url}
            className="grow-0 sm:shrink-0 w-xs h-48 m-1"
          />
        ))}
      </main>
      <CreateWallpaperForm onCreate={addCreatedWallpaper} />
    </>
  );
};

export default HomePage;
