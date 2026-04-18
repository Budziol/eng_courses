import { getUserLevel } from "@/app/(dashboard)/panel/actions/getUserLevel";
import ProgressCard from "../../../../components/ProgressCard";
import { PrimaryLink } from "../../../../components/Links";

const LevelWrapper = async () => {
  const level = await getUserLevel();

  return (
    <ProgressCard
      level={level.Level}
      talkingLvl={level.speaking}
      listeningLvl={level.listening}
      readingLvl={level.reading}
      writingLvl={level.writing}
      lessons={level.Lessons}
      className="rounded-lg"
    />
  );
};
export default LevelWrapper;
