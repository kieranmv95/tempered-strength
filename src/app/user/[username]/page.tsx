import BackButton from '@/components/BackButton';
import UserPublicProfile from '@/components/UserPublicProfile';
import UserClient from '@/services/UserService';
import { Container, Title } from '@/components/DesignSystemElements';

const getUserData = async (username: string) => {
  const user = await UserClient.getUserPublicProfile(username);

  if (!user.length) {
    return null;
  } else {
    return user;
  }
};

type PageProps = {
  params: {
    username: string;
  };
};

export default async function Page({ params }: PageProps) {
  const user = await getUserData(params.username);

  if (!user) {
    return (
      <Container>
        <BackButton>Back</BackButton>
        <Title className="mb-6">NOT FOUND</Title>
        <p>user not found or user has not logged any lifts yet!</p>
      </Container>
    );
  }

  return (
    <UserPublicProfile authedBack username={params.username} user={user} />
  );
}
