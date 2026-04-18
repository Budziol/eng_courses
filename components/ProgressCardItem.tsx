type Props = {
  name: string;
  progress: number;
  color: string;
};

const ProgressCardItem = ({ name, progress, color }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 justify-between">
          <p className="">{name}</p>
          <p className="">{progress}%</p>
        </div>
        <div className="h-2 rounded-full overflow-hidden bg-main/20">
          <div
            className={`h-full rounded-full ${color}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default ProgressCardItem;
