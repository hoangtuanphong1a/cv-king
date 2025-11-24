const ExpiredPostChecking = (createAt: string, duration: string) => {
  const datetime = Math.floor(new Date().getTime() / 1000);
  const start = Math.floor(new Date(createAt).getTime() / 1000);
  const last = Math.floor(new Date(duration).getTime() / 1000);

  const days = (datetime - start) / (60 * 60 * 24);
  const expired = (last - start) / (60 * 60 * 24);

  return { days, expired };
};

export default ExpiredPostChecking;
