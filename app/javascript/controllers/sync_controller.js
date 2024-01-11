import { Controller } from "@hotwired/stimulus";
import localforage from "localforage";

export default class extends Controller {
  async connect() {
    console.log("conectado a sync");
    this.onlineStatus = localStorage.getItem("onlineStatus") === "true";
  }

  async sync(event) {
    event.preventDefault();
    console.log(this.onlineStatus);
    if (this.onlineStatus) return;

    const task = await localforage.getItem("task");
    console.log(task, "task");
    if (task) {
      try {
        const csrfToken = document.querySelector(
          'meta[name="csrf-token"]'
        ).content;
        console.log(task, "tasks");
        const response = await fetch("https://93db-181-129-181-147.ngrok-free.app/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          body: JSON.stringify({ task: task }),
        });

        if (response.ok) {
          console.log("finalizo");
          await localforage.removeItem("task");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.warn("No hay datos para sincronizar en IndexedDB");
    }
  }
}
