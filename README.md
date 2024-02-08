This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technical Notes

### Authentication

Authentication is implemented using Clerk

### State Management

We use redux toolkit for state management and follow the simple pattern of using basic slices with the createAsync builder pattern.

All the slices will follow a data structure of `data, loading, err`

Hooks should be made to accompany the use of redux state, meaning there can be only one way to access the state

### Database

The tempered-strength database is implemented using the PlantetScale platform

#### Schema

Currently kept extremely simple the schema for an exercise is literally a list of exercises with an id and a logging_type

The logging type will be to tell the user how the score is going to be recorded e.g. "weight" | "time" | "distance"

- exercises

  - id int NOT NULL AUTO_INCREMENT PRIMARY KEY
  - name varchar(255) NOT NULL
  - logging_type varchar(255) NOT NULL

- userExercises

  - id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  - userId varchar(255) NOT NULL,
  - exerciseId varchar(255) NOT NULL,
  - log varchar(255) NOT NULL,
  - date Date NOT NULL,

- users
  - id varchar(255) NOT NULL PRIMARY KEY,
  - username varchar(255) UNIQUE NOT NULL,
  - onboarded TINYINT(1) NOT NULL,
