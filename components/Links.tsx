"use client";

import Link from "next/link";
import React, { ComponentProps } from "react";
import { GhostButton, PrimaryButton, SecondaryButton } from "./Buttons";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  linkClassName?: string;
} & ComponentProps<typeof Link>;

export const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="hover:text-white transition-colors duration-300"
    >
      {children}
    </Link>
  );
};

export const DefaultLink = ({
  href,
  children,
  linkClassName,
}: {
  href: string;
  children: React.ReactNode;
  linkClassName?: string;
}) => {
  return (
    <Link
      href={href}
      className={`text-main hover:text-main-hover hover:underline transition-colors duration-300 ${linkClassName}`}
    >
      {children}
    </Link>
  );
};

export const PrimaryLink = ({
  href,
  children,
  className,
  linkClassName,
  ...props
}: Props) => {
  return (
    <Link href={href} className={linkClassName} {...props}>
      <PrimaryButton className={className}>{children}</PrimaryButton>
    </Link>
  );
};

export const SecondaryLink = ({
  href,
  children,
  className,
  linkClassName,
  ...props
}: Props) => {
  return (
    <Link href={href} className={linkClassName}>
      <SecondaryButton className={className}>{children}</SecondaryButton>
    </Link>
  );
};

export const GhostLink = ({
  href,
  children,
  className,
  linkClassName,
  ...props
}: Props) => {
  return (
    <Link href={href} className={linkClassName}>
      <GhostButton className={className}>{children}</GhostButton>
    </Link>
  );
};
