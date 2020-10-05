import React, { useEffect, useState } from "react";
import { Album } from "./Album";

export const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    console.log("Loading Albums Data");
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(response => response.json())
      .then(json => setAlbums(json));
  }, []);
  return (
    <div className="albums">
      {albums.map(album => (
        <Album key={album.id} album={album} />
      ))}
    </div>
  );
};
