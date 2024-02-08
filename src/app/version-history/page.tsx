export default function Page() {
  return (
    <div className="px-4 py-12 container mx-auto">
      <h2 className="text-2xl font-bold lg:text-4xl mb-6">VERSION HISTORY</h2>

      <div className="grid gap-4">
        <div className="p-4 bg-zinc-700 rounded-sm">
          <div className="px-3 py-2 bg-blue-600 inline-block rounded">
            v0.2.0
          </div>

          <ul className="list-disc pl-4 mt-4 space-y-1">
            <li>Onboarding screen for first login</li>
            <li>Add friendly username</li>
          </ul>
        </div>
        <div className="p-4 bg-zinc-700 rounded-sm">
          <div className="px-3 py-2 bg-blue-600 inline-block rounded">
            v0.1.0
          </div>

          <ul className="list-disc pl-4 mt-4 space-y-1">
            <li>User Sign up and sign in flow implemented</li>
            <li>Homepage implemented</li>
            <li>Version history implemented</li>
            <li>Dashboard page implemented</li>
            <li>Exercises list page added</li>
            <li>Ability to add exercises from exercises page</li>
            <li>Ability to add exercises from exercises page</li>
            <li>exercises/[exercise] page implemented</li>
            <li>
              ability to add exercises on exercises/[exercise] page implemented
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
