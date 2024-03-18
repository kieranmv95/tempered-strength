import { query } from '@/db';
import { ITeamResponse } from '@/types/ITeam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import BackButton from '@/components/BackButton';
import { Box } from '@/components/DesignSystemElements';

async function getTeam(id: string) {
  try {
    const teams = (await query(
      `SELECT * FROM teams WHERE id = ${id}`,
    )) as ITeamResponse[];

    const users = (await query(`
    SELECT u.username, u.id
    FROM users u
    JOIN teams t ON u.id = t.ownerUserId
    WHERE t.id = '${id}'
  
    UNION
  
    SELECT u.username, u.id
    FROM users u
    JOIN userTeams ut ON u.id = ut.userId
    WHERE ut.teamId = '${id}';`)) as { username: string; id: string }[];

    return {
      team: teams[0],
      users: users,
    };
  } catch {
    return {
      team: null,
      users: null,
    };
  }
}

export default async function Team({ params }: { params: { teamId: string } }) {
  const { userId } = auth();
  const { team, users } = await getTeam(params.teamId);

  if (!team || !users) {
    return (
      <div className="px-4 py-12 container mx-auto">
        <h2 className="text-2xl font-bold lg:text-4xl mb-6">Team not found!</h2>
        <Link
          className="bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded inline-flex gap-2 items-center cursor-pointer"
          href={'/teams'}
        >
          Back to teams
        </Link>
      </div>
    );
  }

  const myUsername = users.find(user => user.id === userId);

  if (!myUsername) {
    return (
      <div className="px-4 py-12 container mx-auto">
        <h2 className="text-2xl font-bold lg:text-4xl mb-6">{team.name}</h2>
        <p className="mb-3">You are not a member of {team.name}</p>
        <p className="mb-3">You can join teams from the teams screen</p>
        <Link
          className="bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded inline-flex gap-2 items-center cursor-pointer"
          href={'/teams'}
        >
          Back to teams
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 container mx-auto">
      <BackButton href="/teams">Back to teams</BackButton>
      <h2 className="text-2xl font-bold lg:text-4xl mb-6">{team.name}</h2>
      {!!team.password.length && (
        <div className="mb-4">
          <p className="mb-1">
            This is a private group, to invite members they will need the join
            code. Join Code:
          </p>
          <p className="bg-zinc-600 inline-block py-1 px-2 rounded">
            {team.password}
          </p>
        </div>
      )}
      {team.description && (
        <p className="mb-3">Description: {team.description}</p>
      )}
      <p className="text-xl font-bold lg:text-2xl mb-3">Members</p>
      <div className="grid gap-3">
        {users.map(user => (
          <div
            key={user.id}
            className="grid grid-cols-[1fr_auto] justify-between items-center gap-2"
          >
            <Box small>
              <p>
                {user.username}
                {user.id === team.ownerUserId && ' - Admin'}
                {user.username === myUsername?.username && ' - You'}
              </p>
            </Box>
            <div className="flex gap-2 h-full">
              <Link
                href={`/user/${user.username}`}
                className="cursor-pointer bg-blue-600 text-white rounded-xl w-11 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
              {user.username !== myUsername?.username && (
                <Link
                  href={`/compare/${myUsername?.username}/${user.username}`}
                  className="cursor-pointer bg-egwene-500 text-rand-500 rounded-xl flex items-center justify-center px-2"
                >
                  Compare
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
