import React, { useEffect, useState } from "react";
import { Photos } from "./Photos";

var toCamelCase = function (str) {
  return str
    .split(/ /g)
    .map(word => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
    .join(" ");
};

export const Album = ({ album }) => {
  const [photos, setPhotos] = useState(null);
  const loadPhotos = () => {
    console.log(`Loading Photos Data; Album:'${album.id}'`);
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`)
      .then(response => response.json())
      .then(json => setPhotos(json));
  };
  useEffect(() => {
    if (album.id < 10) loadPhotos();
  }, []);
  return (
    <div className="album">
      <h1>Name: {toCamelCase(album.title)}</h1>
      {!photos && (
        <button data-cy={"loadPhotos"} onClick={loadPhotos}>
          Show Photos
        </button>
      )}
      {photos && <Photos photos={photos} />}
    </div>
  );
};
