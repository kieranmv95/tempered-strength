import Block from '@/components/Block';
import {
  faDumbbell,
  faUser,
  faUsers,
  faHeartPulse,
} from '@fortawesome/free-solid-svg-icons';
import AccountWarning from '@/app/dashboard/AccountWarning';

export default function Dashboard() {
  return (
    <div className="px-4 py-12 container mx-auto">
      <h1 className="text-2xl font-bold lg:text-4xl mb-6">DASHBOARD</h1>

      <AccountWarning />

      <div className="grid mb-4 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <Block
          icon={faUser}
          title="Account"
          description="Customise your username and add your weight in the user Account Section"
          url={{
            href: '/account',
            title: 'Account',
          }}
        />
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
