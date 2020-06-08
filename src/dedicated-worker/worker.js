self.addEventListener('message', ({ data: { N } }) => {
  doCalculate(N);
});

// intentionally bad prime number generator
const calculatePrimesUpTo = N => {
  const primes = [];
  outer:
    for(let i=2; i<N; i++) {
      for(let j=2; j<i; j++)
        if(i%j==0)
          continue outer;
      primes.push(i);
    }
  return primes;
};
const doCalculate = N => {
  self.postMessage({ primes: calculatePrimesUpTo(N) });
};
