import TeamsDirectory from '@/components/TeamsDirectory';
import UserTeamsDirectory from '@/components/UserTeamsDirectory';
import CreateTeam from '@/components/CreateTeam/CreateTeam';
import { Container, Title } from '@/components/DesignSystemElements';

export default function Teams() {
  return (
    <Container>
      <Title className="mb-6">TEAMS</Title>
      <div className="grid gap-4 lg:gap-6">
        <CreateTeam />
        <UserTeamsDirectory />
        <TeamsDirectory />
      </div>
    </Container>
  );
}
