import BackButton from "@/components/BackButton";

const NotEnoughDataToCompare = () => (
  <div className="text-center">
    <div className="inline-block mx-auto mt-12">
      <BackButton href="/compare">Back to compare</BackButton>
    </div>
    <h1 className="text-2xl">
      One of the users was not found or hasn&apos;t not logged any lifts yet!
    </h1>
  </div>
);

export default NotEnoughDataToCompare;
