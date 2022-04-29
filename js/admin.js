
const appGetEvents = async () => {
  try {
    const response = await fetch(
      "https://xp41-soundgarden-api.herokuapp.com/events"
    );
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
};

const renderElement = (eventsArray) => {
  eventsArray.forEach((event, index) =>{
    const tableBodySelector = document.querySelector('.table tbody');
    
    const criarTr = document.createElement('tr');
    const CriarTh = document.createElement('th');
    CriarTh.innerText = index + 1;
    //CriarTh.setAttribute("scope", "row");



    const firstTdElement = document.createElement('td')
    const date = event.scheduled.substring(0, 10).replaceAll('-', '/')
    const time = event.scheduled.substring(11, 16);
    firstTdElement.innerText = date + '' + ' ' + time;

    const secondTdElement = document.createElement('td')
    secondTdElement.innerText = event.name;

    const thirdTdElement = document.createElement('td')
    thirdTdElement.innerText = event.attractions.join(', ');
    console.log(thirdTdElement)

    const forthElement = document.createElement('td');

    const firstButton = document.createElement('a');
    firstButton.innerText = 'Ver reservas';
    firstButton.classList.add("btn");
    firstButton.classList.add("btn-dark");
    firstButton.setAttribute('href','resersa-evento.html?id='+ event._id);

    const SecButton = document.createElement('a');
    SecButton.innerText = 'Editar';
    SecButton.classList.add('btn');
    SecButton.classList.add('btn-secondary');
    SecButton.setAttribute('href','editar-evento.html?id='+ event._id);
    
    const thirdButton = document.createElement('a');
    thirdButton.innerText = 'Excluir';
    thirdButton.classList.add('btn');
    thirdButton.classList.add('btn-danger');
    thirdButton.setAttribute('href','excluir-evento.html?id='+ event._id);

    forthElement.append(firstButton, SecButton, thirdButton);

    criarTr.append(CriarTh, firstTdElement, secondTdElement, thirdTdElement, forthElement);
    tableBodySelector.appendChild(criarTr);

  })
}

async function main(){
  try {
    const eventsArray = await appGetEvents();
    renderElement(eventsArray);
    
  } catch (error) {
    console.log(error);
  }
}

main();

