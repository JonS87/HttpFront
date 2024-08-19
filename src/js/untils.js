import { fetchTicketById, fetchDeleteTicket } from "./fetch.js";
import { downLoadData } from "./render.js";

const url = "http://localhost:7070";
const subscribe = document.querySelector(".subscribe");
const deleteWindow = document.querySelector(".deleteWinow");
let deleteId;
// Функция для обновления тикета
export const updateTicket = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  const response = await fetch(
    `${url}/tickets?method=ticketById&id=${data.idCurrent}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (response.ok) {
    e.target.reset();
  } else {
    alert("Ошибка при обновлении тикета.");
  }
  subscribe.classList.add("hidden");

  downLoadData();
};

// Функция для создания тикета (добавьте её, если она отсутствует)
export const createTicket = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch(url + "/tickets?method=createTicket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    e.target.reset();
  } else {
    alert("Ошибка при создании тикета.");
  }
  subscribe.classList.add("hidden");
  downLoadData();
};

// Функция для изменения тикета по ID
export const changeTicketById = async (idCurrent) => {
  const ticket = await fetchTicketById(idCurrent);
  if (subscribe.classList.contains("hidden")) {
    subscribe.classList.remove("hidden");
  }
  const form = document.getElementById("createTicketForm");
  form.name.value = ticket.name;
  form.description.value = ticket.description.replace(/\n\n/g, "\n");

  const id = document.querySelector(".idCurrent");
  id.innerHTML = `<input type="text" id="idCurrent" name="idCurrent" required value="${idCurrent}">`;

  form.removeEventListener("submit", createTicket);
  form.addEventListener("submit", updateTicket);
};

export const confarmDeleteeCart = async () => {
  fetchDeleteTicket(deleteId);

  deleteWindow.classList.add("hidden");

  downLoadData();
};

export const deleteTicket = async (idCurrent) => {
  deleteWindow.classList.remove("hidden");
  deleteId = idCurrent;
};
