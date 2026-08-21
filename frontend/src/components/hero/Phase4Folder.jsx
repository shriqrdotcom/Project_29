import { motion, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import { P3T } from "../../data/cards";

// The folder UI that assembles behind/around the 2x3 grid:
//  - white folder panel (fades + scales in behind the cards)
//  - "Business" row + "Create" pill on top of the white panel
//  - dark "Personal" tab that slides down into place (overlapping card tops)
export const Phase4Folder = ({ progress, mult }) => {
  const { folderBg, tab } = P3T;

  const bgOpacity = useTransform(progress, folderBg, [0, 1]);
  const bgScale = useTransform(progress, folderBg, [0.94, 1]);
  const tabOpacity = useTransform(progress, tab, [0, 1]);

  const W = 512 * mult;
  const H = 456 * mult;
  const cx = 217 * mult; // grid centre x offset
  const cy = 60 * mult; // folder centre y offset
  const tabW = 478 * mult;
  const tabH = 50 * mult;
  const tabBase = -97 * mult; // tab overlaps the top card row
  const tabY = useTransform(progress, tab, [tabBase - 60, tabBase]);

  return (
    <>
      {/* white folder panel (behind the cards) */}
      <div className="absolute inset-0 z-[15] flex items-center justify-center">
        <motion.div
          style={{ x: cx, y: cy, width: W, height: H, opacity: bgOpacity, scale: bgScale }}
          data-testid="folder-bg"
          className="rounded-[28px] bg-white shadow-[0_30px_80px_-30px_rgba(15,15,18,0.25),0_10px_25px_-10px_rgba(15,15,18,0.06)] border border-neutral-100/80"
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <span className="font-display text-[15px] font-semibold text-neutral-900">
              Business
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-white px-3.5 py-1 text-[12px] font-medium text-neutral-700 shadow-sm">
              <Plus size={12} strokeWidth={2} /> Create
            </span>
          </div>
        </motion.div>
      </div>

      {/* dark "Personal" tab (in front of the card tops) */}
      <div className="absolute inset-0 z-[45] flex items-center justify-center">
        <motion.div
          style={{ x: cx, y: tabY, width: tabW, height: tabH, opacity: tabOpacity }}
          data-testid="folder-tab"
          className="pointer-events-none relative"
        >
          {/* Custom SVG folder-tab profile matching Reference Image 1 */}
          <svg
            className="absolute inset-0 h-full w-full drop-shadow-sm"
            viewBox="0 0 1000 64"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 0 18 Q 0 0 18 0 L 710 0 Q 726 0 738 7 L 764 21 Q 774 26 790 26 L 982 26 Q 1000 26 1000 42 L 1000 46 Q 1000 64 982 64 L 18 64 Q 0 64 0 46 Z"
              fill="#161618"
            />
          </svg>
          <div className="relative z-10 flex h-full items-center px-6">
            <span className="text-[14px] font-medium text-white tracking-[-0.01em]">
              Personal
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
};

