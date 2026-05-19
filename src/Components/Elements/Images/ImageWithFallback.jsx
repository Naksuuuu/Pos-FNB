import { memo } from "react";

import defaultImage from "@/Assets/default-image.svg";

const ImageWithFallback = memo(({ src, alt, className, ...props }) => {
  return (
    <img
      src={src || defaultImage}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = defaultImage;
      }}
      alt={alt}
      className={className}
      {...props}
    />
  );
});
export { ImageWithFallback };
