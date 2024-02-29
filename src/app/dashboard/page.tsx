import Account from '@/app/dashboard/Account';
import Block from '@/components/Block';
import {
  faDumbbell,
  faUser,
  faUsers,
  faHeartPulse,
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  return (
    <div className="px-4 py-12 container mx-auto">
      <h1 className="text-2xl font-bold lg:text-4xl mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Block
          icon={faUser}
          title="Account"
          description="Customise your username and add your weight in the user Account Section"
          url={{
            href: '/account',
            title: 'Account',
          }}
        >
          <Account />
        </Block>
        <Block
          icon={faDumbbell}
          title="Exercises"
          description="Log and track all your exercises in one place"
          url={{
            href: '/exercises',
            title: 'Exercises',
          }}
        />
        <Block
          icon={faUsers}
          title="Teams"
          description="Build custom teams and add your friends, and easy way to quickly
            compare"
          url={{
            href: '/teams',
            title: 'Teams',
          }}
        />
        <Block
          icon={faHeartPulse}
          title="Workouts"
          description="Start logging workouts, featuring CrossFit and Hyrox workouts"
          url={{
            href: '/workouts',
            title: 'Workouts',
          }}
        />
      </div>
    </div>
  );
}
