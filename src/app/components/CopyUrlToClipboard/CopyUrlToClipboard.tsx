"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import React from "react";

const CopyUrlToClipboard = ({ children }: { children: React.ReactNode }) => {
  const url = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  return (
    <div
      className="cursor-pointer hover:underline p-4 inline-block"
      onClick={copyToClipboard}
    >
      <FontAwesomeIcon icon={faLink} className="w-4 h-4" /> {children}
    </div>
  );
};

export default CopyUrlToClipboard;
