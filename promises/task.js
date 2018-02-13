function move(steps) {
  console.log('start');
  const stepsPromises = steps.reduce((promises, step, i) => {
    let promiseResolve;
    const promise = new Promise(resolve => promiseResolve = resolve);
    Promise.all([promises[i - 1]]).then(() => {
      promiseTimeout(step.delay).then(() => {
        console.log('move');
        step.elem.style[step.direction] = `${parseInt(step.elem.style[step.direction] || 0) + step.px}px`;
        promiseResolve();
      });
    });

    promises.push(promise);
    return promises;
  }, []);

  return Promise.all(stepsPromises);
}

function promiseTimeout(timeout) {
  const promise = new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
  return promise;
}

const elem = document.querySelector('div');
move([{
  direction: 'top',
  elem: elem,
  px: 100,
  delay: 1000
}, {
  direction: 'left',
  elem: elem,
  px: 200,
  delay: 2000
}, {
  direction: 'left',
  elem: elem,
  px: -200,
  delay: 500
}, {
  direction: 'top',
  elem: elem,
  px: -100,
  delay: 1200
}]).then(() => {
  elem.style.background = 'rgb(70, 117, 69)';
  console.log('Done');
});