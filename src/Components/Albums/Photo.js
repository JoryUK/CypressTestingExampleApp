import React from "react";

export const Photo = ({ photo }) => {
  return (
    <div className="photo" title={photo.title}>
      <img src={photo.thumbnailUrl} alt={photo.title} />
    </div>
  );
};
