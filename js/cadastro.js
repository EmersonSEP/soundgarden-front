
const botao = document.querySelector('button');

botao.addEventListener('click', (e) => {
    e.preventDefault();


const nome = document.querySelector('#nome');
const atracoes = document.querySelector('#atracoes');
const descricao = document.querySelector('#descricao');
const data = document.querySelector('#data');
const lotacao = document.querySelector('#lotacao');

    const body = {
        name: nome.value,
        poster: 'n/d',
        attractions: atracoes.value.split(','),
        description: descricao.value,
        scheduled:  data.value,
        number_tickets: lotacao.value
    }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body), 
        headers: {
            "Content-type": "application/json"
        }
    }
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.error) {
                throw new Error(result.details.body[0].message); }
            alert('Evento cadastrado com sucesso!'); //
            window.location.href = "./admin.html"; //
        })
        .catch(error => {
            alert('Algo saiu errado, tente novamente!');
            console.log(error);
        })
});



//Segunda maneira de criar um Evento.

// const formDados = document.querySelector('#form');

// formDados.addEventListener('submit', (event) =>{
//   event.preventDefault();

//   const formObjeto = new FormData(formDados);


// const attracionsInput =  formObjeto.get('attractionsName').split(', ');
// const nTickets = Number(formObjeto.get('number'));

// const body = {
  
//     "name": formObjeto.get('name'),
//     "poster": 'n/d',
//     "attractions": attracionsInput,
//     "description": formObjeto.get('descricao'),
//     "scheduled": formObjeto.get('data'),
//     "number_tickets": nTickets
// }
// console.log(body);

// fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
//   "method": "POST",
//   "headers": { "content-type": "application/json" },
//   "body": JSON.stringify(body)
// }).then( response => console.log(response) ).catch( error => console.error(error) );

// });