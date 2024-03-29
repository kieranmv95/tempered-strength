import UserPublicProfile from '@/components/UserPublicProfile';
import CopyUrlToClipboard from '@/components/CopyUrlToClipboard';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import { Box, Container, Title } from '@/components/DesignSystemElements';
import UserClient from '@/services/UserService';

const getUserData = async (username: string) => {
  return UserClient.getUserPublicProfile(username);
};

const getUsername = async (userId: string) => {
  return UserClient.getUsernameByUserId(userId);
};

export default async function Page() {
  const { userId } = auth();
  const username = (await getUsername(userId || '')) as string;
  const user = await getUserData(username);

  return (
    <>
      <Container>
        <Title className="mb-6">PUBLIC PROFILE</Title>
        <Box>
          <p>
            Below is a representation of what a user will see when they search
            for yourself or navigate tou your public profile!
          </p>
          <h2 className="text-xl font-bold lg:text-2xl mb-3 mt-6">
            Share your profile with the world!
          </h2>
          <p className="mb-4">
            Now you have a public profile, you can start sharing it with your
            friends! Simply click the button below, or copy the link from the
            text box to get started
          </p>
          <CopyUrlToClipboard
            url={`https://temperedstrength.com/user/${username}`}
          >
            Copy profile URL
          </CopyUrlToClipboard>
        </Box>
      </Container>
      <div className="relative grid justify-center">
        <div className="h-[4px] w-full bg-red-700 absolute top-[18px] left-0 z-[2]" />
        <div className="h-[2px] w-full bg-red-300 absolute top-[19px] left-0 z-[3]" />
        <div className="inline-block mx-auto bg-red-300 p-2 text-red-700 font-bold rounded z-[4] border border-red-700">
          Public Profile Below
        </div>
      </div>
      {!user.length ? (
        <div className="px-4 py-12 container mx-auto">
          <h2 className="text-xl font-bold lg:text-2xl mb-3 mt-6">
            Nothing to see here!
          </h2>
          <p className="mb-3">
            Don&apos;t worry, nothings broken, you just need to start logging
            exercises
          </p>
          <Link
            href="/exercises"
            className="block bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
          >
            Log your first Exercise
          </Link>
        </div>
      ) : (
        <UserPublicProfile
          username={username}
          user={user}
          copyToClipboard={false}
        />
      )}
    </>
  );
}
