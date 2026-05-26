import { getWallpapers } from "../services/wallpapers.js";
import { useEffect, useState } from "react";

import ImageFluid from "../components/ImageFluid.jsx";
import CreateWallpaperForm from "../components/CreateWallpaperForm.jsx";
import Button from "../components/Button.jsx";

const WALLPAPERS_PER_PAGE = 12;

const HomePage = () => {
  const [wallpapers, setWallpapers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  if (wallpapers.length === 0) {
    return <p>No wallpapers available</p>;
  }

  // makes one page button for each page of wallpapers
  const makePageBtns = (pages) => {
    const pageBtnsTmp = [];
    for (let i = 0; i < pages; i++) {
      let btnClass = "m-1 border border-blue-500 text-blue-500";
      if (i + 1 === currentPage) {
        // do not remove the space
        btnClass += " " + "text-white bg-blue-500";
      }
      pageBtnsTmp.push(
        <Button
          key={i + 1}
          className={btnClass + " flex-1"}
          onClick={() => {
            setCurrentPage(i + 1);
          }}
        >
          {i + 1}
        </Button>,
      );
    }
    return pageBtnsTmp;
  };

  // figure out what wallpapers are shown on this page
  const getCurrentPageWallpapers = () => {
    const wallpapersTmp = [];

    const startIdx = (currentPage - 1) * WALLPAPERS_PER_PAGE;
    const endIdx = currentPage * WALLPAPERS_PER_PAGE;

    for (let i = startIdx; i < endIdx && i < wallpapers.length; i++) {
      wallpapersTmp.push(wallpapers[i]);
    }
    return wallpapersTmp;
  };

  // determine # of pages and make btns, wallpapers accordingly
  const pages = Math.ceil(wallpapers.length / WALLPAPERS_PER_PAGE);
  const pageBtns = makePageBtns(pages);
  const currentPageWallpapers = getCurrentPageWallpapers();

  return (
    <>
      <main className="flex flex-wrap justify-center">
        {currentPageWallpapers.map((w) => (
          <ImageFluid
            key={w.id}
            src={w.url}
            className="grow-0 sm:shrink-0 w-xs h-48 m-1"
          />
        ))}
      </main>
      {/* page controls */}
      <div className="flex overflow-x-auto max-w-xs p-1 mx-auto">
        {pageBtns}
      </div>
      <CreateWallpaperForm onCreate={addCreatedWallpaper} />
    </>
  );
};

export default HomePage;
