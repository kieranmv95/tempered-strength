export default function Page() {
  return (
    <div className="px-4 py-12 md:mx-auto w-full max-w-[600px]">
      <h2 className="text-2xl font-bold lg:text-4xl mb-6">
        How is strength calculated
      </h2>
      <div className="space-y-3">
        <p>
          To compare users, we first need to determine a strength score, using
          the strength score we can compare the two and see the difference in
          percent, but how do we determine the strength score?
        </p>
        <p>
          The calculation is relatively simple we take all the exercises that
          both users have logged (for accuracy) and then we divide that by the
          users body weight so for example if a user benches 100 kg and they
          weight 80 kg that gives us 1.25
        </p>
        <p>
          Once we have done the above calculation for all of a users exercise we
          add them all together and times it by 1000 for each user so in an
          example when 2 users only have a bench press and deadlift logged it
          would look lik so:
        </p>
        <ul className="list-disc pl-4">
          <li>User one bench 100kg, bodyweight 90kg: 100/90 = 1.11</li>
          <li>User one deadlift 180kg, bodyweight 90kg: 180/90 = 2</li>
          <li>User two bench 80kg bodyweight 70kg: 80/70 = 1.14</li>
          <li>User two deadlif 170kg bodyweight 70kg: 170/70 = 2.4</li>
        </ul>

        <p>
          When we add these together and multiply by 1000 we get our lifting
          score
        </p>

        <p>
          This approach is much better because we can hide away the users weight
          and still deliver an accurate result
        </p>

        <ul className="list-disc pl-4">
          <li>User one: (1.11 + 2) * 1000 = 3110</li>
          <li>User two: (1.14 + 2.4) * 1000 = 3540</li>
        </ul>

        <p>
          And now we have a score we divide the highest score by 100 and times
          it by the smaller score then take 100 from the result
        </p>

        <p>Strength difference: 100 - ((100 / 3540) * 3110) = 12.14%</p>

        <p>
          This makes for an accurate Pound for pound result as in the above
          example user 2 is stronger by 12.14% even though both of his lifts are
          lighter than the first users!
        </p>

        <p>See..... it really is that simple......</p>
      </div>
    </div>
  );
}
