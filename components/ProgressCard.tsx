import ProgressCardItem from "./ProgressCardItem";

type Props = {
  level: string;
  talkingLvl: number;
  listeningLvl: number;
  readingLvl: number;
  writingLvl: number;
  lessons: number;
  className?: string;
};

const ProgressCard = ({
  level,
  talkingLvl,
  listeningLvl,
  readingLvl,
  writingLvl,
  lessons,
  className,
}: Props) => {
  return (
    <div
      className={`relative w-full bg-white border border-border rounded-3xl p-8 shadow-xl space-y-6 ${className}`}
    >
      <div className="flex justify-between gap-5">
        <h3 className="">Postęp</h3>
        <p className="text-text-sub font-bold">{level}</p>
      </div>
      <div className="space-y-4">
        <ProgressCardItem
          name="Mówienie"
          progress={talkingLvl}
          color="bg-main"
        />
        <ProgressCardItem
          name="Słuchanie"
          progress={listeningLvl}
          color="bg-green-500"
        />
        <ProgressCardItem
          name="Czytanie"
          progress={readingLvl}
          color="bg-purple-500"
        />
        <ProgressCardItem
          name="Pisanie"
          progress={writingLvl}
          color="bg-amber-500"
        />
      </div>
      <div className="flex gap-3 justify-between border-t pt-6 border-t-border">
        <p className="">Odbyte lekcje</p>
        <h3 className="">{lessons}</h3>
      </div>
    </div>
  );
};
export default ProgressCard;
