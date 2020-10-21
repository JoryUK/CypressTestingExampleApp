import React from "react";
import { Photo } from "./Photo";

export const Photos = ({ photos }) => {
  return (
    <div className="photos">
      {photos.map(photo => (
        <Photo key={photo.id} photo={photo} />
      ))}
    </div>
  );
};
