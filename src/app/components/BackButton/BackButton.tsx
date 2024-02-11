import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";

type BackButtonProps = {
  href: string;
  children: React.ReactNode;
};

const BackButton = ({ href, children }: BackButtonProps) => (
  <Link
    href={href}
    className="hover:underline mb-5 block text-sm flex gap-2 align-middle"
  >
    <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" /> {children}
  </Link>
);

export default BackButton;
