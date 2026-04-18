type Props = {
  isSmall?: boolean;
};

const Loader = () => {
  return (
    <div className="flex-1 w-full h-full flex items-center justify-center">
      <div
        className={`border-muted border-t-main rounded-full animate-spin w-[48px] h-[48px] border-6`}
      ></div>
    </div>
  );
};
export default Loader;
