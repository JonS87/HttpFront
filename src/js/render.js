import { fetchTickets, updateTicketStatus, fetchTicketById } from "./fetch.js";
import { changeTicketById, deleteTicket } from "./untils.js";

const ticketList = document.querySelector(".ticket-list");

// Функция для загрузки данных
export const downLoadData = async () => {
  const tickets = await fetchTickets();
  renderTickets(tickets);
};

// Функция для рендеринга тикетов
const renderTickets = (tickets) => {
  ticketList.innerHTML = "";
  const table = document.createElement("table");
  table.className = "ticketList";

  tickets.forEach((ticket) => {
    const row = createTicketRow(ticket);
    table.append(row);
  });

  ticketList.append(table);
};

// Функция для создания строки тикета
const createTicketRow = (ticket) => {
  const row = document.createElement("tr");
  const rowChild = document.createElement("div");
  rowChild.className = "row";

  rowChild.addEventListener("click", () => loadTicketById(ticket.id, rowChild));

  // Статус
  const statusCell = createStatusCell(ticket);
  rowChild.append(statusCell);

  // Имя
  const nameCell = createNameCell(ticket.name);
  rowChild.append(nameCell);

  // Дата создания
  const createdCell = createCreatedCell(ticket.created);
  rowChild.append(createdCell);

  // Действия
  const actionsCell = createActionsCell(ticket);
  rowChild.append(actionsCell);

  // ID
  const idCell = createIdCell(ticket.id);
  rowChild.append(idCell);

  row.append(rowChild);
  return row;
};

// Функция для создания ячейки статуса
const createStatusCell = (ticket) => {
  const cell = document.createElement("td");
  const statusCheckBox = document.createElement("input");
  statusCheckBox.type = "checkbox";
  statusCheckBox.checked = ticket.status;
  statusCheckBox.addEventListener("click", (e) => {
    e.stopPropagation();
    updateTicketStatus(ticket.id, statusCheckBox.checked);
  });
  cell.append(statusCheckBox);
  return cell;
};

// Функция для создания ячейки имени
const createNameCell = (name) => {
  const cell = document.createElement("td");
  const nameBlock = document.createElement("div");
  nameBlock.className = "nameBlock";
  nameBlock.insertAdjacentHTML("beforeend", name);
  cell.append(nameBlock);
  return cell;
};

// Функция для создания ячейки даты
const createCreatedCell = (created) => {
  const cell = document.createElement("td");
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  cell.textContent = new Date(created)
    .toLocaleString("ru-RU", options)
    .replace(",", "");
  return cell;
};

// Функция для создания ячейки действий
const createActionsCell = (ticket) => {
  const cell = document.createElement("td");
  const actionsBlock = document.createElement("div");
  actionsBlock.className = "buttons";

  const editButton = createEditButton(ticket);
  actionsBlock.append(editButton);

  const deleteButton = createDeleteButton(ticket);
  actionsBlock.append(deleteButton);

  cell.append(actionsBlock);
  return cell;
};

// Функция для создания кнопки редактирования
const createEditButton = (ticket) => {
  const button = document.createElement("button");
  button.insertAdjacentHTML(
    "beforeend",
    `
    <svg xml:space="preserve" viewBox="0 0 100 100" y="0" x="0" xmlns="http://www.w3.org/2000/svg" id="圖層_1" version="1.1" preserveAspectRatio="xMidYMid" width="100" height="100" monica-translate-exclude-el="m" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;display:block;shape-rendering:auto;background-position-x:0%;background-position-y:0%;background-size:auto;background-origin:padding-box;background-clip:border-box;background:scroll none none  repeat;width:30px;height:30px;animation:none"><g class="ldl-scale" monica-translate-exclude-el="m" style="transform-origin:50px 50px;transform:matrix(0.8, 0, 0, 0.8, 0, 0);;animation:none"><g class="ldl-ani" monica-translate-exclude-el="m"><g class="ldl-layer" monica-translate-exclude-el="m"><g class="ldl-ani" monica-translate-exclude-el="m" style="transform-origin:50px 50px;transform:matrix(1.03, 0, 0, 1.03, 0, 0);animation-duration:1s;animation-timing-function:linear;animation-delay:-0.571429s;animation-iteration-count:infinite;animation-direction:normal;animation-fill-mode:forwards;animation-play-state:paused;animation-name:animate;animation-timeline:auto;animation-range-start:normal;animation-range-end:normal;transform-box:view-box;;animation:none"><path d="M58.23 19.238l14.294 8.253-5.13 8.887-14.295-8.253z" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.49993" stroke="#333" fill="#e0e0e0" style="stroke-width:3.49993px;fill:rgb(236, 236, 229);stroke:rgb(51, 51, 51);;animation:none"></path></g></g>
<g class="ldl-layer" monica-translate-exclude-el="m"><g class="ldl-ani" monica-translate-exclude-el="m" style="transform-origin:50px 50px;transform:matrix(1.00929, 0, 0, 1.00929, 0, 0);animation-duration:1s;animation-timing-function:linear;animation-delay:-0.642857s;animation-iteration-count:infinite;animation-direction:normal;animation-fill-mode:forwards;animation-play-state:paused;animation-name:animate;animation-timeline:auto;animation-range-start:normal;animation-range-end:normal;transform-box:view-box;;animation:none"><path stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333" fill="#e15b64" d="M72.525 27.491l-14.294-8.253 4.747-8.223a4.507 4.507 0 0 1 6.157-1.65l6.487 3.745a4.507 4.507 0 0 1 1.65 6.157l-4.747 8.224z" style="stroke-width:3.5px;fill:rgb(0, 0, 0);stroke:rgb(51, 51, 51);;animation:none"></path></g></g>
<g class="ldl-layer" monica-translate-exclude-el="m"><g class="ldl-ani" monica-translate-exclude-el="m" style="transform-origin:50px 50px;transform:matrix(0.982857, 0, 0, 0.982857, 0, 0);animation-duration:1s;animation-timing-function:linear;animation-delay:-0.714286s;animation-iteration-count:infinite;animation-direction:normal;animation-fill-mode:forwards;animation-play-state:paused;animation-name:animate;animation-timeline:auto;animation-range-start:normal;animation-range-end:normal;transform-box:view-box;;animation:none"><path d="M28.726 70.342l24.373-42.214 14.294 8.253L43.02 78.595z" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.49993" stroke="#333" fill="#abbd81" style="stroke-width:3.49993px;fill:rgb(255, 255, 255);stroke:rgb(51, 51, 51);;animation:none"></path></g></g>
<g class="ldl-layer" monica-translate-exclude-el="m"><g class="ldl-ani" monica-translate-exclude-el="m" style="transform-origin:50px 50px;transform:matrix(0.956722, 0, 0, 0.956722, 0, 0);animation-duration:1s;animation-timing-function:linear;animation-delay:-0.785714s;animation-iteration-count:infinite;animation-direction:normal;animation-fill-mode:forwards;animation-play-state:paused;animation-name:animate;animation-timeline:auto;animation-range-start:normal;animation-range-end:normal;transform-box:view-box;;animation:none"><path d="M27.621 88.761l1.106-18.42 14.294 8.252z" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333" fill="#f8b26a" style="stroke-width:3.5px;fill:rgb(0, 0, 0);stroke:rgb(51, 51, 51);;animation:none"></path></g></g>
<g class="ldl-layer" monica-translate-exclude-el="m"><g class="ldl-ani" monica-translate-exclude-el="m" style="transform-origin:50px 50px;transform:matrix(0.926886, 0, 0, 0.926886, 0, 0);animation-duration:1s;animation-timing-function:linear;animation-delay:-0.857143s;animation-iteration-count:infinite;animation-direction:normal;animation-fill-mode:forwards;animation-play-state:paused;animation-name:animate;animation-timeline:auto;animation-range-start:normal;animation-range-end:normal;transform-box:view-box;;animation:none"><path d="M35.321 83.677l-7.147-4.126-.553 9.21z" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333" fill="#333" style="stroke-width:3.5px;fill:rgb(51, 51, 51);stroke:rgb(51, 51, 51);;animation:none"></path></g></g>
<g class="ldl-layer" monica-translate-exclude-el="m"><g class="ldl-ani" monica-translate-exclude-el="m" style="transform-origin:50px 50px;transform:matrix(0.911647, 0, 0, 0.911647, 0, 0);animation-duration:1s;animation-timing-function:linear;animation-delay:-0.928571s;animation-iteration-count:infinite;animation-direction:normal;animation-fill-mode:forwards;animation-play-state:paused;animation-name:animate;animation-timeline:auto;animation-range-start:normal;animation-range-end:normal;transform-box:view-box;;animation:none"><path d="M56.433 38.858L39.546 68.107" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333" fill="none" style="stroke-width:3.5px;stroke:rgb(51, 51, 51);fill:none;;animation:none"></path></g></g>
<g class="ldl-layer" monica-translate-exclude-el="m"><g class="ldl-ani" monica-translate-exclude-el="m" style="transform-origin:50px 50px;transform:matrix(0.91, 0, 0, 0.91, 0, 0);animation-duration:1s;animation-timing-function:linear;animation-delay:-1s;animation-iteration-count:infinite;animation-direction:normal;animation-fill-mode:forwards;animation-play-state:paused;animation-name:animate;animation-timeline:auto;animation-range-start:normal;animation-range-end:normal;transform-box:view-box;;animation:none"><path stroke-miterlimit="10" stroke-width="3.5" stroke="#000" opacity=".2" d="M27.621 88.761l7.7-5.084 7.7-5.084 24.373-42.215h0l5.131-8.887 4.747-8.223a4.507 4.507 0 0 0-1.65-6.157l-3.244-1.873" style="stroke-width:3.5px;stroke:rgb(0, 0, 0);opacity:0.2;;animation:none"></path></g></g>
<metadata xmlns:d="https://loading.io/stock/"></metadata></g></g>
<STYLE type="text/css" monica-translate-exclude-el="m">@keyframes animate { 0.00% {transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.91, 0.91) skew(0deg, 0.00deg) ;opacity: 1.00;}4.00% {transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.91, 0.91) ;}8.00% {animation-timing-function: cubic-bezier(0.69,0.60,0.35,0.27);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.91, 0.91) ;}14.00% {transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.93, 0.93) ;}18.00% {transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.94, 0.94) ;}22.00% {animation-timing-function: cubic-bezier(0.67,0.66,0.34,0.33);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.96, 0.96) ;}26.00% {transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.97, 0.97) ;}30.00% {transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.99, 0.99) ;}34.00% {animation-timing-function: cubic-bezier(0.65,0.71,0.32,0.38);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(1.01, 1.01) ;}40.00% {animation-timing-function: cubic-bezier(0.64,0.74,0.31,0.41);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(1.02, 1.02) ;}46.00% {animation-timing-function: cubic-bezier(0.60,0.91,0.23,0.63);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(1.03, 1.03) ;}50.00% {transform: translate(0.00px,0.00px) rotate(0.00deg) scale(1.03, 1.03) ;}54.00% {transform: translate(0.00px,0.00px) rotate(0.00deg) scale(1.03, 1.03) ;}58.00% {animation-timing-function: cubic-bezier(0.69,0.60,0.35,0.27);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(1.03, 1.03) ;}64.00% {transform: translate(0.00px,0.00px) rotate(0.00deg) scale(1.01, 1.01) ;}68.00% {transform: translate(0.00px,0.00px) rotate(0.00deg) scale(1.00, 1.00) ;}72.00% {animation-timing-function: cubic-bezier(0.67,0.66,0.34,0.33);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.98, 0.98) ;}76.00% {animation-timing-function: cubic-bezier(0.66,0.68,0.33,0.35);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.97, 0.97) ;}82.00% {animation-timing-function: cubic-bezier(0.65,0.71,0.32,0.38);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.94, 0.94) ;}88.00% {animation-timing-function: cubic-bezier(0.65,0.73,0.31,0.40);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.92, 0.92) ;}94.00% {animation-timing-function: cubic-bezier(0.63,0.80,0.28,0.48);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.91, 0.91) ;}100.00% {animation-timing-function: cubic-bezier(0.63,0.80,0.28,0.48);transform: translate(0.00px,0.00px) rotate(0.00deg) scale(0.91, 0.91) ;} }</STYLE><!-- [ldio] generated by https://loading.io --></svg>
    `,
  );
  button.className = "edit-button";
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    changeTicketById(ticket.id);
  });
  return button;
};

// Функция для создания кнопки удаления
const createDeleteButton = (ticket) => {
  const button = document.createElement("button");
  button.textContent = "X";
  button.className = "delete-button";
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTicket(ticket.id);
  });
  return button;
};

// Функция для создания ячейки ID
const createIdCell = (id) => {
  const cell = document.createElement("td");
  const idBlock = document.createElement("div");
  idBlock.className = "idBlock hidden";
  idBlock.textContent = id;
  cell.append(idBlock);
  return cell;
};

// Функция для загрузки тикета по ID
const loadTicketById = async (idCurrent, nameCell) => {
  if (nameCell.querySelector(".Detail")) {
    nameCell.removeChild(nameCell.querySelector(".Detail"));
  } else {
    const ticket = await fetchTicketById(idCurrent);
    const description = document.createElement("div");
    description.className = "nameBlock Detail";
    description.insertAdjacentHTML(
      "beforeend",
      `${ticket.description.replace(/\n\n/g, "\n").replace(/\n/g, "<br>")}`,
    );
    nameCell.append(description);
  }
};
