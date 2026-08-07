import type React from "react";

/**
 * Stand-in artwork for posts with no featured image set in the CMS.
 *
 * Previously lived in the static `articles.ts`, where every card used it
 * unconditionally. Now it is only the fallback: a post with `featuredImage`
 * renders the real thing.
 */
export const RIG_IMAGE_STYLE: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 62% 88%, rgba(251,146,60,0.75), rgba(251,146,60,0) 42%), linear-gradient(180deg, #171717 0%, #292524 46%, #7c2d12 82%, #c2410c 100%)",
};
