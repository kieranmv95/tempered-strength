import BackButton from "@/components/BackButton";

const UsersNotFound = () => (
  <div className="text-center">
    <div className="inline-block mx-auto mt-12">
      <BackButton href="/compare">Back to compare</BackButton>
    </div>
    <h1 className="text-2xl">
      Users not found or users have not logged any lifts yet!
    </h1>
  </div>
);

export default UsersNotFound;
