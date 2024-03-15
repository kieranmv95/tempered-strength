import Block from '@/components/Block';
import {
  faDumbbell,
  faUser,
  faUsers,
  faHeartPulse,
} from '@fortawesome/free-solid-svg-icons';
import AccountWarning from '@/app/dashboard/AccountWarning';
import { Container, Title } from '@/components/DesignSystemElements';

export default function Dashboard() {
  return (
    <Container>
      <Title className="mb-6">DASHBOARD</Title>

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
    </Container>
  );
}
