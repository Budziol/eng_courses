const DashboardHeader = ({
  name,
  heading,
  text,
}: {
  name?: string;
  heading: string;
  text?: string;
}) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold">{heading}</h1>
      {name && <p className="">Witaj ponownie {name}</p>}
      {text && <p className="">{text}</p>}
    </div>
  );
};
export default DashboardHeader;
