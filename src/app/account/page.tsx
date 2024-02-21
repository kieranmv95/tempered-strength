import UpdateUserDetails from '@/app/account/UpdateUserDetails';

export default function Account() {
  return (
    <div className="px-4 py-12 container mx-auto">
      <h1 className="text-2xl font-bold lg:text-4xl mb-3">Account</h1>
      <p className="mb-6">Click the field to update/change the value</p>
      <UpdateUserDetails />
    </div>
  );
}
