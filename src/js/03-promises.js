import Notiflix, { Notify } from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener("submit", onFormSubmit)

let timeId;

function onFormSubmit(e){
  e.preventDefault();
  clearTimeout(timeId);

  const { delay, step, amount } = e.target.elements;
  let totalDelay = Number(delay.value) 
  
  for (let i = 1; i <= amount.value; i += 1){
    newPromise(i,totalDelay)
      .then(({ position, delay }) => 
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
      .catch(({ position, delay }) => 
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
     totalDelay += Number(step.value);
  }
  e.currentTarget.reset();
}


function newPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    timeId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  }
  )
}
