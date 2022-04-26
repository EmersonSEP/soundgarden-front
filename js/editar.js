const params = parseQueryString(window.location.search);

if (!params.id) {
  window.location.replace("admin.html");
}

getEventoPorId(params.id);

const formulario = document.querySelector("main div form");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const body = {};

  for (i = 0; i < formulario.elements.length - 1; i++) {
    const item = formulario.elements[i];

    body[item.name] =
      item.name === "attractions" ? item.value.split(",") : item.value;
  }

  fetch(`${BASE_URL}/events/${params.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(() => {
      alert("Evento atualizado com sucesso");
      window.location.replace("./admin.html");
    })
    .catch((error) => console.log(error.message));
});


 //const url = new URL(window.location.href);
//id = url.searchParams.get("id");

// // const botao = document.querySelector('button');
// // botao.addEventListener('click', (event) =>{
// //   event.preventDefault();

// const nome = document.querySelector('#nome');
// const banner = document.querySelector('#banner');
// const atracoes = document.querySelector('#atracoes');
// const descricao = document.querySelector('#descricao');
// const data = document.querySelector('#data');
// const lotacao = document.querySelector('#lotacao');



// fetch("https://xp41-soundgarden-api.herokuapp.com/events")
//     .then(data => data.json()) 
//     .then(eventos => { 
//         eventos.forEach(evento => { 
//             if(evento._id == id) {  
//                 const dataN = new Date(evento.scheduled);
//                 const dataFormatada = dataN.toLocaleDateString();
//                 nome.value = evento.name;
//                 banner.value = evento.poster;
//                 atracoes.value = evento.attractions.join(', ');
//                 descricao.value = evento.description;
//                 data.value = evento.scheduled.substring(0, evento.scheduled.length-1);
//                 lotacao.value = evento.number_tickets;
                
//             }
//         });
//     })
//     .catch(error => console.error(error)); 
// const button = document.querySelector('button');

// button.addEventListener('click', (e) => {
//     e.preventDefault(); 

//     if(!id) {
//         alert("Id invalido, tente novamente!");
//         window.location.href = "/admin.html";
//     }

//     const requisicao = {
//         method: 'DELETE'
//     }
//     //Faz a uma requisicao DELETE para deletar os tickets
//     fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, requisicao)
//         .then( response => {
//             if(response.status != 204){
//                 throw new Error();
//             }
//             alert("Excluido com sucesso!"); 
//             window.location.href = "/admin.html"; 
//         })
//         .catch(error => {
//             console.log(error);
//             alert("Algo saiu errado, tente novamente!");
//         })
// });










