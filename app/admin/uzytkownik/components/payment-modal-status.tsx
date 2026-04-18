import { PrimaryButton } from "@/components/Buttons";

type Props = {
  isError: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const PaymentModalStatus = ({ isError, children, onClose }: Props) => {
  return (
    <div className="text-center space-y-6">
      <h3 className="text-main uppercase">{isError ? "Błąd!" : "Suckes!"}</h3>
      <p className="">{children}</p>
      <PrimaryButton className="w-fit! mx-auto" onClick={() => onClose()}>
        Zamknij
      </PrimaryButton>
    </div>
  );
};
export default PaymentModalStatus;
