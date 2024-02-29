export const timeDiff = (existingPb: string, newScore: string) => {
  const toSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const toHHMMSS = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return [hours, minutes, seconds].map(v => (v < 10 ? '0' + v : v)).join(':');
  };

  const existingPbSeconds = toSeconds(existingPb);
  const newScoreSeconds = toSeconds(newScore);

  if (newScoreSeconds < existingPbSeconds) {
    const difference = existingPbSeconds - newScoreSeconds;
    return {
      pb: true,
      diff: toHHMMSS(difference),
    };
  } else {
    return {
      pb: false,
      diff: null,
    };
  }
};

export const weightAndRepsDiff = (existingPb: string, newScore: string) => {
  const existingPbWeight = Number(existingPb);
  const newScoreWeight = Number(newScore);

  if (existingPbWeight < newScoreWeight) {
    const difference = newScoreWeight - existingPbWeight;

    return {
      pb: true,
      diff: difference.toString(),
    };
  } else {
    return {
      pb: false,
      diff: null,
    };
  }
};
