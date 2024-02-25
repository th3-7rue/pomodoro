<script>
  let title = "Pomodoro";
  import Info from "./lib/Info.svelte";
  //import TaskList from './TaskList.svelte';
  import Timer from "./lib/Timer.svelte";
  import AddForm from "./lib/AddForm.svelte";
  import ListaTodo from "./lib/ListaTodo.svelte";
  import TodoCounter from "./lib/TodoCounter.svelte";
  import { todos } from "./lib/store";
</script>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
    rel="stylesheet"
  />
</head>

<main>
  <div class="bg-rosso-scuro">
    <div class="flex justify-center items-center p-3">
      <div class="text-7xl md:text-9xl text-verde-chiaro text-center">
        {title}
      </div>
    </div>
    <div
      class="flex justify-center items-center pt-5 text-verde-chiaro text-center"
    >
      <button
        on:click={() =>
          document.querySelector("#todo").classList.toggle("hidden")}
        class="neu-btn px-20 py-3 rounded-2xl text-xl">To Do</button
      >
    </div>
    <div id="todo" class="hidden">
      <TodoCounter />
      <AddForm />
      <ListaTodo todoList={$todos} />
    </div>
    <Timer />
  </div>
  <div>
    <Info />
  </div>
</main>
