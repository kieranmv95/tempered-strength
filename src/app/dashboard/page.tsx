import Exercises from '@/app/dashboard/Exercises';
import Teams from '@/app/dashboard/Teams';
import Account from '@/app/dashboard/Account';

export default function Dashboard() {
  return (
    <div className="px-4 py-12 container mx-auto">
      <h1 className="text-2xl font-bold lg:text-4xl mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 gap-6">
        <Account />
        <Exercises />
        <Teams />
      </div>
    </div>
  );
}
