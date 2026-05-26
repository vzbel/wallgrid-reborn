import { getWallpapers } from "../services/wallpapers.js";
import { useEffect, useState } from "react";
import Image from "../components/Image";

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

  if (!wallpapers) {
    return <p>Loading...</p>;
  }
  return (
    <main className="flex flex-wrap justify-center">
      {wallpapers.map((w) => (
        <Image
          key={w.id}
          src={w.url}
          className="grow-0 sm:shrink-0 w-xs h-48 m-1"
        />
      ))}
    </main>
  );
};

export default HomePage;
