
const Index = (function() {

  function start() {
    console.log('dashboard view running');
  }

  return {
    start
  }
})()

window.addEventListener('load', Index.start)
