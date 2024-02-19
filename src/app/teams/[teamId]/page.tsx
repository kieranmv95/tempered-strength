import TeamsDirectory from "@/components/TeamsDirectory";
import UserTeamsDirectory from "@/components/UserTeamsDirectory";
import CreateTeam from "@/components/CreateTeam/CreateTeam";
import { query } from "@/db";
import { IExercise } from "@/app/api/user/exercises/route";
import { ITeamResponse } from "@/types/Team";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPlus,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import BackButton from "@/components/BackButton";

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
      team: {
        ...teams[0],
        password: !!teams[0].password.length,
      },
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
          className="inline-block bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded inline-flex gap-2 items-center cursor-pointer"
          href={"/teams"}
        >
          Back to teams
        </Link>
      </div>
    );
  }

  const myUsername = users.find((user) => user.id === userId);

  if (!myUsername) {
    return (
      <div className="px-4 py-12 container mx-auto">
        <h2 className="text-2xl font-bold lg:text-4xl mb-6">{team.name}</h2>
        <p className="mb-3">You are not a member of {team.name}</p>
        <p className="mb-3">You can join teams from the teams screen</p>
        <Link
          className="inline-block bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded inline-flex gap-2 items-center cursor-pointer"
          href={"/teams"}
        >
          Back to teams
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 container mx-auto">
      <BackButton href="/compare">Back to compare</BackButton>
      <h2 className="text-2xl font-bold lg:text-4xl mb-6">{team.name}</h2>
      {team.description && <p className="mb-3">{team.description}</p>}
      <p className="text-xl font-bold lg:text-2xl mb-3">Members</p>
      <div className="grid gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-[1fr_auto] justify-between items-center gap-2"
          >
            <div className="grid bg-zinc-700 px-3 rounded-sm h-11 items-center">
              <p>
                {user.username}
                {user.id === team.ownerUserId && " - Owner"}
                {user.username === myUsername?.username && " - You"}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/user/${user.username}`}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-sm h-11 px-3 flex items-center justify-center"
              >
                Profile
              </Link>
              {user.username !== myUsername?.username && (
                <Link
                  href={`/compare/${myUsername?.username}/${user.username}`}
                  className="cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-sm h-11 px-3 flex items-center justify-center"
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
