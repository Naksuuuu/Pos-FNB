import { memo } from "react";

import defaultImage from "@/Assets/default-image.svg";

const ImageWithFallback = memo(({ src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      onError={(e) => {
        e.target.onError = "";
        e.target.src = defaultImage;
      }}
      alt={alt}
      className={className}
      {...props}
    />
  );
});
export { ImageWithFallback };
