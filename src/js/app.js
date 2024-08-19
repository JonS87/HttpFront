import { downLoadData } from "./render.js";
import { createTicket, updateTicket, confarmDeleteeCart } from "./untils.js";

const subscribe = document.querySelector(".subscribe");

document.addEventListener("DOMContentLoaded", () => {
  const deleteWindow = document.querySelector(".deleteWinow");

  downLoadData();

  document.querySelector(".add").addEventListener("click", () => {
    if (subscribe.classList.contains("hidden")) {
      subscribe.classList.remove("hidden");
    }

    const form = document.getElementById("createTicketForm");
    form.removeEventListener("submit", updateTicket);
    form.addEventListener("submit", createTicket);
  });

  document
    .getElementById("createTicketForm")
    .addEventListener("reset", async () => {
      subscribe.classList.add("hidden");

      downLoadData();
    });

  deleteWindow
    .querySelector(".submit")
    .addEventListener("click", confarmDeleteeCart);

  deleteWindow.querySelector(".cancel").addEventListener("click", async () => {
    deleteWindow.classList.add("hidden");

    downLoadData();
  });
});
