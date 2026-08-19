import { motion, useTransform } from "framer-motion";
import { ARTIST_TAGS } from "../../data/cards";

// Speech-bubble artist tags that attach to the artwork composition. They fade
// up into place (no bounce / no rotation) once the stack is assembling.
const Tag = ({ tag, progress, ex }) => {
  const opacity = useTransform(progress, tag.appear, [0, 1]);
  const y = useTransform(progress, tag.appear, [12, 0]);
  const isRed = tag.variant === "red";

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        style={{ opacity, y, x: tag.x * ex, translateY: tag.y * ex }}
        data-testid={`artist-tag-${tag.id}`}
        className="relative"
      >
        <div
          className={`relative rounded-[14px] px-3.5 py-1.5 text-[12px] font-medium text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)] ${
            isRed ? "bg-[#b23a2e]" : "bg-neutral-900"
          }`}
        >
          {tag.handle}
          <span
            className={`absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 ${
              isRed ? "bg-[#b23a2e]" : "bg-neutral-900"
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
};

export const ArtistTags = ({ progress, ex }) => (
  <div className="pointer-events-none absolute inset-0 z-[80] hidden sm:block">
    {ARTIST_TAGS.map((tag) => (
      <Tag key={tag.id} tag={tag} progress={progress} ex={ex} />
    ))}
  </div>
);
