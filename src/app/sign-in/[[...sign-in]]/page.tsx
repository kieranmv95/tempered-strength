import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="container px-4 mx-auto flex justify-center pt-12">
      <SignIn />
    </div>
  );
}
