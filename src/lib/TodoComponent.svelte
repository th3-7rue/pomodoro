<script>
  import { todos } from "./store";

  export let todo;
  export let pos;
  function deleteTodo() {
    todos.update((old) => {
      // update localstorage
      old.splice(pos, 1);
      localStorage.setItem("todos", JSON.stringify(old));

      return old;
    });
  }
</script>

<div class="p-1 mt-1">
  {todo.title}
  <button class="neu-btn sm rounded" on:click={deleteTodo}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      /></svg
    >
  </button>
</div>
