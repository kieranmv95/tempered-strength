import TeamsDirectory from '@/components/TeamsDirectory';
import UserTeamsDirectory from '@/components/UserTeamsDirectory';
import CreateTeam from '@/components/CreateTeam/CreateTeam';

export default function Teams() {
  return (
    <div className="px-4 py-12 container mx-auto">
      <h2 className="text-2xl font-bold lg:text-4xl mb-6">Teams</h2>

      <div className="grid gap-4">
        <CreateTeam />
        <UserTeamsDirectory />
        <TeamsDirectory />
      </div>
    </div>
  );
}
