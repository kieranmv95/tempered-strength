import BackButton from '@/components/BackButton';

const UsersNotFound = () => (
  <div className="text-center py-4">
    <div className="inline-block mx-auto mt-12">
      <BackButton>Back to compare</BackButton>
    </div>
    <h1>Users not found or users have not logged any lifts yet!</h1>
  </div>
);

export default UsersNotFound;
