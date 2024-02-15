"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import React from "react";
import copy from "copy-to-clipboard";

const CopyUrlToClipboard = ({
  children,
  url,
}: {
  children: React.ReactNode;
  url?: string;
}) => {
  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      copy(url ? url : window.location.href);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div
      className="cursor-pointer hover:underline p-4 inline-flex gap-2 items-center"
      onClick={copyToClipboard}
    >
      <FontAwesomeIcon icon={faLink} className="w-4 h-4" /> {children}
    </div>
  );
};

export default CopyUrlToClipboard;
