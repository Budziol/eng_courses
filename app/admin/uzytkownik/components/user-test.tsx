import { User } from "@prisma/client";
import { getUserTest } from "../actions/getUserTest";

type Props = {
  user: User;
};

const UserTest = async ({ user }: Props) => {
  const { test } = await getUserTest(user.id);

  return !test ? (
    <p className="">Brak</p>
  ) : (
    <div className="space-y-6">
      <div className="flex gap-3 items-center">
        <p className="">Wynik: </p>
        <p className="text-text-sub text-2xl font-bold">{test.score}</p>
      </div>
      <div className="">
        <p className="mb-4">Pytania</p>
        <div className="max-h-[260px] overflow-y-scroll">
          {test.answers.map((a, i) => (
            <div key={a.id} className="flex gap-3 items-center">
              <p className="">{a.question.questionText}</p>
              <p
                className={`${a.option.isCorrect ? "text-green-500" : "text-red-500"}`}
              >
                {a.option.optionText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserTest;
