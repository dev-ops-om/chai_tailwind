import { runEngine }     from "./engine.js"
import { startObserver } from "./observer.js"

document.addEventListener("DOMContentLoaded", function () {
  runEngine(document.body)
  startObserver()
})