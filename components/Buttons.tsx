"use client";

type PrimaryButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = ({
  children,
  className = "",
  disabled = false,
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`
        flex gap-3 items-center justify-center w-full px-6 py-3 text-sm rounded-4xl
        bg-main text-white font-medium shadow
        transition-colors duration-200
        whitespace-nowrap
        ${
          disabled
            ? "bg-main/60 cursor-not-allowed"
            : "hover:bg-main-hover cursor-pointer"
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({
  children,
  className = "",
  disabled = false,
  type = "submit",
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`flex gap-3 items-center justify-center w-full px-6 py-3 text-sm rounded-4xl border border-border text-text-sub whitespace-nowrap shadow font-medium transition-colors duration-200         ${
        disabled
          ? "bg-white hover:bg-muted cursor-not-allowed"
          : "bg-white hover:bg-muted cursor-pointer"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const GhostButton = ({
  children,
  className = "",
  disabled = false,
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`flex gap-3 items-center justify-center w-full px-6 py-3 text-sm rounded-4xl text-main hover:bg-main/10 whitespace-nowrap cursor-pointer font-semibold ${className} transition-colors duration-200`}
      {...props}
    >
      {children}
    </button>
  );
};
