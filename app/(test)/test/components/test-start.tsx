import { PrimaryButton } from "@/components/Buttons";
import { startTest } from "../actions/startTest";

const TestStart = () => {
  return (
    <form action={startTest}>
      <div className="flex flex-col gap-6 p-6">
        <h2 className="text-center text-2xl">Test poziomujący</h2>
        <p className="text-center text-sm">
          Kliknij poniższy przycisk aby rozpocząć test.
        </p>
        <p className="text-center text-sm">
          Test nie odzwierciedla twojego aktualnego poziomu, jest on tylko
          poglądowy. Twój prawdziwy poziom określimy podczas naszego pierwszego
          spotkania.
        </p>
        <PrimaryButton type="submit">Rozpocznij test</PrimaryButton>
      </div>
    </form>
  );
};
export default TestStart;
