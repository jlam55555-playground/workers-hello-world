const primeMaxInput = document.querySelector('#prime-max');
const calculateButton = document.querySelector('#calculate-button');
const resultsDiv = document.querySelector('#results');
const statusDiv = document.querySelector('#status');

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

calculateButton.addEventListener('click', () => {
  statusDiv.innerHTML = 'Calculating...';
  resultsDiv.innerHTML = calculatePrimesUpTo(primeMaxInput.value).map(prime => `<li>${prime}</li>`).join('');
  statusDiv.innerHTML = '';
});
