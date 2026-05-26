/**
 * form to add a new wallpaper to the database
 *
 * props
 * onCreate: a function that receives the wallpaper after it is created.
 *
 */

import { useState } from "react";
import { inputBaseClasses } from "../baseClasses.js";

import { createWallpaper } from "../services/wallpapers.js";

import ImageFluid from "./ImageFluid.jsx";
import Button from "./Button.jsx";

const MAX_DESC_LENGTH = 150;
const LOGO = "/logo.png";

const CreateWallpaperForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    url: "",
    desc: "",
  });

  // add wallpaper to db
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createWallpaper(form.url, form.desc);
      if (res.data) {
        alert("successfully created wallpaper");
        onCreate(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("failed to create wallpaper");
    }
  };

  // change form state when user types in inputs
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-sm mx-auto rounded-sm outline outline-gray-200 shadow-xs p-3"
    >
      <ImageFluid src={LOGO} className="w-10 h-10 mb-4" />
      <h2 className="font-medium">create wallpaper</h2>
      <p className="text-sm">add a new background to our collection</p>

      {/* image url */}
      <label htmlFor="" className="block my-4">
        url
        <input
          type="url"
          id="url"
          name="url"
          className={inputBaseClasses}
          value={form.url}
          onChange={handleInputChange}
          required
        />
      </label>

      {/* wallpaper description */}
      <label htmlFor="" className="block my-4">
        description
        <textarea
          type="text"
          id="desc"
          name="desc"
          className={`${inputBaseClasses} resize-none`}
          value={form.desc}
          maxLength={MAX_DESC_LENGTH}
          onChange={handleInputChange}
        ></textarea>
      </label>

      <Button
        type="submit"
        className="text-sm w-full bg-blue-500 text-white hover:bg-blue-600"
      >
        submit wallpaper
      </Button>
    </form>
  );
};

export default CreateWallpaperForm;
