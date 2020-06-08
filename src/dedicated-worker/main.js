const primeMaxInput = document.querySelector('#prime-max');
const calculateButton = document.querySelector('#calculate-button');
const resultsDiv = document.querySelector('#results');
const statusDiv = document.querySelector('#status');

const worker = new Worker('worker.js', { type: 'module' });
worker.addEventListener('message', ({ data: { primes } }) => {
  resultsDiv.innerHTML = primes.map(prime => `<li>${prime}</li>`).join('');
  statusDiv.innerHTML = '';
});

calculateButton.addEventListener('click', () => {
  statusDiv.innerHTML = 'Calculating...';
  worker.postMessage({ N: primeMaxInput.value });
});
