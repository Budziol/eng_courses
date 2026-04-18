import { Check } from "lucide-react";

const FormHint = ({ isValid }: { isValid: boolean }) => {
  if (isValid) {
    return (
      <span className="bg-main rounded-full w-3 h-3 flex items-center justify-center">
        <Check size={8} color="white" />
      </span>
    );
  }

  return (
    <span className="bg-main/20 border border-border rounded-full w-3 h-3"></span>
  );
};

export default FormHint;
