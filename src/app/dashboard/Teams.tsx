'use client';

import Link from 'next/link';

const Teams = () => {
  return (
    <div className="bg-zinc-700 p-4">
      <h2 className="text-xl font-bold mb-3">Teams</h2>
      <p className="mb-3">
        Build custom teams and add your friends, and easy way to quickly compare
      </p>
      <Link
        className="inline-block bg-blue-600 hover:bg-blue-700 click:bg-red-600 py-2 px-4 rounded"
        href="/teams"
      >
        Go to teams
      </Link>
    </div>
  );
};

export default Teams;
