import { Controller } from "@hotwired/stimulus";
import localforage from "localforage";
var pixel = "/1pixel.png";
export default class extends Controller {
  static targets = ["title", "description", "form"];

  connect() {
    console.log("El controlador se ha conectado");
    this.checkOnlineStatus();
  }

  async checkOnlineStatus() {
    try {
      // Asegúrate de que la imagen no esté almacenada en caché
      var assetPath = pixel + "?t=" + new Date().getTime();
      const online = await fetch(assetPath, { cache: "no-store" });
      this.onlineStatus = online.status >= 200 && online.status < 300;
      localStorage.setItem("onlineStatus", this.onlineStatus.toString());
    } catch (err) {
      this.onlineStatus = false;
      localStorage.setItem("onlineStatus", this.onlineStatus.toString());
    }
  }

  async submit(event) {
    console.log("entroooo");
    this.onlineStatus = localStorage.getItem("onlineStatus") === "true";
    console.log(this.onlineStatus, "ook");
    if (!this.onlineStatus) {
      event.preventDefault();
      const title = this.titleTarget.value;
      const description = this.descriptionTarget.value;
      await localforage.setItem("task", { title, description });
      const task = await localforage.getItem("task");
      console.log(task, "task");
    }
  }
}
