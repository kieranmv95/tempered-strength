"use client";

import BackButton from "@/components/BackButton";

const NotEnoughDataToCompare = () => (
  <div className="text-center px-4">
    <div className="inline-block mx-auto mt-12">
      <BackButton>Back to compare</BackButton>
    </div>
    <h1>
      One of the users was not found or hasn&apos;t not logged any lifts yet!
    </h1>
  </div>
);

export default NotEnoughDataToCompare;
