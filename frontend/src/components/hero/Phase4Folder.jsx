import { motion, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import { P3T } from "../../data/cards";

// The folder UI that assembles behind/around the 2x3 grid:
//  - white folder panel (fades + scales in behind the cards)
//  - "Business" row + "Create" pill on top of the white panel
//  - dark "Personal" tab that slides down into place (in front of card tops)
export const Phase4Folder = ({ progress, mult }) => {
  const { folderBg, tab } = P3T;

  const bgOpacity = useTransform(progress, folderBg, [0, 1]);
  const bgScale = useTransform(progress, folderBg, [0.94, 1]);
  const tabOpacity = useTransform(progress, tab, [0, 1]);

  const W = 512 * mult;
  const H = 384 * mult;
  const cx = 217 * mult; // grid centre x offset
  const cy = 16 * mult; // folder centre y offset
  const tabBase = -104 * mult; // tab sits just above the top card row
  const tabY = useTransform(progress, tab, [tabBase - 70, tabBase]);

  return (
    <>
      {/* white folder panel (behind the cards) */}
      <div className="absolute inset-0 z-[15] flex items-center justify-center">
        <motion.div
          style={{ x: cx, y: cy, width: W, height: H, opacity: bgOpacity, scale: bgScale }}
          data-testid="folder-bg"
          className="rounded-[22px] bg-white shadow-[0_30px_80px_-40px_rgba(15,15,18,0.4)]"
        >
          <div className="flex items-center justify-between px-6 pt-4">
            <span className="font-display text-[15px] font-semibold text-neutral-900">
              Business
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1 text-[12px] font-medium text-neutral-700">
              <Plus size={12} /> Create
            </span>
          </div>
        </motion.div>
      </div>

      {/* dark "Personal" tab (in front of the card tops) */}
      <div className="absolute inset-0 z-[45] flex items-center justify-center">
        <motion.div
          style={{ x: cx, y: tabY, width: W, opacity: tabOpacity }}
          data-testid="folder-tab"
          className="pointer-events-none"
        >
          <div className="flex h-11 w-full items-center rounded-b-[16px] rounded-tr-[16px] bg-neutral-900 px-6">
            <span className="text-[14px] font-medium text-white">Personal</span>
          </div>
        </motion.div>
      </div>
    </>
  );
};
