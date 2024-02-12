import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container px-4 mx-auto flex justify-center pt-12">
      <div>
        <div className="max-w-[400px] md:ml-8">
          <h1 className="text-4xl mb-3 font-bold">Sign up</h1>
          <p className="mb-6">
            Totally free, get logging right away and share and compare with your
            friends!
          </p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
