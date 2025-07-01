
window.onload = function () {
  console.log('Scripta se učitala');

  const input = window.document.getElementById('unos');
  const ul = window.document.getElementById('taskovi');
  const dugme = window.document.getElementById('dodaj-dugme');

  function createTask() {
    // 1) Izvuci vrednost iz input elementa, odnosno tekst iskucan 
    const text = input.value;

    // text.length ako je prazan tekst ce vratiti 0 kao 0 karaktera 
    // !!(0) -> false, "" je false, 0 je false 
    // ako stavite ! on ce da obrne, ako je true vrednost, on ce vratiti false 
    // malo pro verzija je da kazemo if (!text.length) -> if (!0) -> if (!false) -> if (true) 
    if (text.length === 0) {
      return;
    }

    // 2) Kreiraj li element 
    const li = window.document.createElement('li');

    li.classList.add('task');

    // 3) Kreiraj p element, i u textContent (text p element-a), stavi ovaj iskucan tekst iz inputa
    const p = window.document.createElement('p');

    p.textContent = text;

    // 4) Kreiraj input type="checkbox" element 
    const inputCheckbox = window.document.createElement('input');

    inputCheckbox.type = 'checkbox';

    inputCheckbox.addEventListener('click', function (event) {
      if (inputCheckbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    });

    // 5) U li ubaci i p i input elemente koje smo prethodno kreirali iznad 
    li.append(inputCheckbox);
    li.append(p);

    // 6) Taj novi li element sad dodaj unutar ul elementa 
    ul.append(li);

    // 7) Obriši tekst iz inputa (clear) 
    input.value = '';
  }

  input.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
      createTask();
    }
  });

  function klikDugmenta() {
    createTask();
  }

  dugme.addEventListener('click', klikDugmenta);
}
