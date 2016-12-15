new Promise(function(resolve) {
    window.onload = resolve;
}).then(function() {
    citiesList.addEventListener('change', function(e){
      if (e.currentTarget.value == '') {
        result.innerHTML = '';
      } else {
        Router.handle(e.currentTarget.value);
      } 
    }, false);
}).catch(function(e) {
    console.error(e);
    alert('Ошибка: ' + e.message);
});
