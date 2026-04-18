import { RevealItem } from "@/components/anim/reveal-item";
import { GhostButton, PrimaryButton } from "@/components/Buttons";
import ClockIcon from "@/components/Icons/ClockIcon";
import { PrimaryLink, SecondaryLink } from "@/components/Links";
import { LevelDetails } from "@/utils/types";
import { MoveRight } from "lucide-react";

const colorStyles = {
  green: {
    border: "border-green-500/30",
    bg: "bg-green-500/20",
    text: "text-green-600",
  },
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/20",
    text: "text-blue-600",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/20",
    text: "text-purple-600",
  },
};

type LevelsCardProps = LevelDetails & {
  i: number;
};

const LevelsCard = ({
  range,
  name,
  shortDesc,
  description,
  timeToComplete,
  topics,
  color,
  i,
}: LevelsCardProps) => {
  const styles = colorStyles[color];

  return (
    <RevealItem>
      <div
        className={`relative bg-card rounded-3xl border ${styles.border} overflow-hidden group hover:shadow-lg transition-all duration-300 bg-white`}
      >
        <div className={`p-6 ${styles.bg}`}>
          <span className={`text-sm font-semibold ${styles.text}`}>
            {range}
          </span>
          <h3 className="mt-2">{name}</h3>
          <p className="text-sm">{shortDesc}</p>
        </div>
        <div className="flex flex-col gap-6 justify-between p-6">
          <p className="text-sm">{description}</p>
          <div className="flex flex-col items-center justify-center">
            <ClockIcon />
            <p className="text-xs">{timeToComplete} lekcji</p>
          </div>
          <div className="space-y-2">
            <p className="uppercase text-xs">tematy</p>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-main/20 px-2 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          {i === 1 ? (
            <PrimaryLink
              href="/rejestracja"
              className="w-full! flex justify-center items-center gap-3"
            >
              Rozpocznij <MoveRight size={16} />
            </PrimaryLink>
          ) : (
            <SecondaryLink
              href="/rejestracja"
              className="w-full! flex justify-center items-center gap-3"
            >
              Rozpocznij <MoveRight size={16} />
            </SecondaryLink>
          )}
        </div>
      </div>
    </RevealItem>
  );
};
export default LevelsCard;
