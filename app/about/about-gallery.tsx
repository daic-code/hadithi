"use client";

import { useEffect, useState } from "react";

type AboutGalleryProps = {
  images: string[];
};

export function AboutGallery({ images }: AboutGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 5_000);

    return () => window.clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  return (
    <section className="about-gallery" aria-label="Hadithi Events photo gallery">
      {images.map((image, index) => (
        <div
          aria-hidden={index !== activeIndex}
          className={`about-image${index === activeIndex ? " is-active" : ""}`}
          key={image}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      {hasMultipleImages && (
        <div className="gallery-dots" aria-label="Choose a gallery image">
          {images.map((image, index) => (
            <button
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={index === activeIndex ? "is-active" : undefined}
              key={image}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      )}
    </section>
  );
}
