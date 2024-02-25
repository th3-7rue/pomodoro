import { writable } from "svelte/store";
// add empty localstorage variable todos if not exist
if (!localStorage.getItem("todos")) {

    localStorage.setItem("todos", JSON.stringify([]));
}
/* console.log(JSON.parse(localStorage.getItem("todos")))
 */

export const todos = writable(
    // get from localstorage if available
    JSON.parse(localStorage.getItem("todos"))

);

