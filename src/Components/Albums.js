import React, { useEffect, useState } from "react";
import { Album } from "./Album";

const loadAlbumData = setAlbums => {
  return () => {
    console.log("Loading Albums Data");
    var http = new XMLHttpRequest();
    http.open("GET", "https://jsonplaceholder.typicode.com/albums", true);
    http.addEventListener("load", resp => {
      console.log("Albums -> resp.responseJSON", resp.target.responseText);
      const json = JSON.parse(resp.target.responseText);
      setAlbums(json);
    });
    http.send();
  };
};

const fetchAlbumData = setAlbums => {
  return () => {
    console.log("Fetching Album Data");
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(resp => resp.json())
      .then(json => setAlbums(json));
  };
};

export const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(fetchAlbumData(setAlbums), []);
  return (
    <div className="albums">
      {albums.map(album => (
        <Album key={album.id} album={album} />
      ))}
    </div>
  );
};
