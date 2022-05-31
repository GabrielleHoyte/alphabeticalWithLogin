let alphabet = document.getElementsByClassName("alpha");
let trash = document.getElementsByClassName("fa-ban");

Array.from(alphabet).forEach(function (element) {
  element.addEventListener('click', function () {
    const word = this.parentNode.parentNode.childNodes[3].innerText
    console.log(word)
    let alphabetized = sortAlphabets(word)
    console.log(alphabetized)
    fetch('messages', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'ogWord': word,
        'newWord': alphabetized,
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        console.log(name, msg)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg.trim()
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

let sortAlphabets = function (text) {
  return text.split('').sort().join('');
};