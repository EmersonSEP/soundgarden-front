const main = async () => {
  const params = parseQueryString(window.location.search);

  if (!params.id) {
    window.location.replace("admin.html");
  }

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  const trLoading = document.createElement("tr");
  const tdLoading = document.createElement("td");
  tdLoading.setAttribute("colspan", 5);
  tdLoading.setAttribute("align", "center");
  tdLoading.append("Carregando reservas...");

  trLoading.appendChild(tdLoading);
  tbody.appendChild(trLoading);

  const [dataEvent, dataBookings] = await Promise.all([
    fetch(`${BASE_URL}/events/${params.id}`).then((response) =>
      response.json()
    ),
    fetch(`${BASE_URL}/bookings/event/${params.id}`).then((response) =>
      response.json()
    ),
  ]);

  tbody.innerHTML = "";

  document.querySelector("#eventoNome").innerHTML = dataEvent?.name;

  if (dataBookings.length === 0) {
    const trNenhumaReserva = document.createElement("tr");
    const tdNenhumaReserva = document.createElement("td");
    tdNenhumaReserva.setAttribute("colspan", 5);
    tdNenhumaReserva.setAttribute("align", "center");
    tdNenhumaReserva.append("Nenhuma reserva encontrada");

    trNenhumaReserva.appendChild(tdNenhumaReserva);
    tbody.appendChild(trNenhumaReserva);
  }

  // document.querySelector("#eventoNome").innerHTML = data[0]?.event.name;

  dataBookings.forEach((row, index) => {
    // if (index === 0) {
    //   document.querySelector("#eventoNome").innerHTML = row.event.name;
    // }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row" width="20px">${index + 1}</th>
      <td>${new Date(row.created_at).toLocaleString("pt-br")}</td>
      <td>${row.owner_name}</td>
      <td>${row.owner_email}</td>
      <td>${row.number_tickets}</td>`;

    tbody.appendChild(tr);
  });
};

main();

