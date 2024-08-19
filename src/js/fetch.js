const url = "http://localhost:7070";

// Функция для получения тикетов
export const fetchTickets = async () => {
  const response = await fetch(`${url}/tickets?method=allTickets`);
  return await response.json();
};

// Функция для обновления статуса тикета
export const updateTicketStatus = async (idCurrent, status) => {
  const response = await fetch(
    `${url}/tickets?method=ticketById&id=${idCurrent}&status=${status}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    alert("Ошибка при обновлении тикета.");
  }
};

// Функция для удаления тикета
export const fetchDeleteTicket = async (idCurrent) => {
  const response = await fetch(
    `${url}/tickets?method=ticketById&id=${idCurrent}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    alert("Ошибка при удалении тикета.");
  }
};

// Функция для получения тикета по ID
export const fetchTicketById = async (idCurrent) => {
  const response = await fetch(
    `${url}/tickets?method=ticketById&id=${idCurrent}`,
  );
  return await response.json();
};
