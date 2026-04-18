import { PrimaryLink } from "@/components/Links";

type Props = {
  score: number;
};

const TestScore = ({ score }: Props) => {
  return (
    <div className="flex flex-col gap-6 p-6 text-center">
      <h2 className="text-center text-2xl">Test poziomujący</h2>
      <p className="text-center text-sm">Twój wynik:</p>
      <p className="text-text-sub text-2xl font-bold">{score}</p>
      <PrimaryLink href="/panel">Powrót</PrimaryLink>
    </div>
  );
};
export default TestScore;
