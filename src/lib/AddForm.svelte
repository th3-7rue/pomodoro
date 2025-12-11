<script>
  import { todos } from "./store";
  let nuovoTodo;
  function AddTodo() {
    todos.update((old) => {
      // if empty string
      if (!nuovoTodo) return old;
      // update localstorage
      old.push({ title: nuovoTodo, done: false });
      localStorage.setItem("todos", JSON.stringify(old));

      // reset input
      nuovoTodo = "";

      return old;
    });
  }
</script>

<form class="flex w-full items-center mt-2" on:submit|preventDefault={AddTodo}>
  <input
    type="text"
    placeholder="Scrivi qui"
    class="placeholder:text-verde-chiaro neu-btn sm active p-2 rounded-sm w-full mr-1 text-verde-chiaro"
    bind:value={nuovoTodo}
  />
  <button type="submit" class="neu-btn sm rounded-sm p-2 ml-3">Aggiungi</button>
</form>
