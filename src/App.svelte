<script>
  let title = "Pomodoro";
  import Info from "./lib/Info.svelte";
  //import TaskList from './TaskList.svelte';
  import Timer from "./lib/Timer.svelte";
  import AddForm from "./lib/AddForm.svelte";
  import ListaTodo from "./lib/ListaTodo.svelte";
  import TodoCounter from "./lib/TodoCounter.svelte";
  import { todos } from "./lib/store";
  import { fade } from "svelte/transition";
  import Modal from "./lib/Modal.svelte";

  let showModal = false;
</script>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Pomodoro timer with to do list" />
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
  <div class="bg-rosso-scuro text-verde-chiaro">
    <div class="flex justify-center items-center p-3">
      <div class="text-7xl lg:text-9xl text-center">
        {title}
      </div>
    </div>
    <div class="flex flex-row p-2 space-x-2 lg:p-6 lg:space-x-6">
      <button
        on:click={() =>
          document.querySelector("#todo").classList.toggle("hidden")}
        class="neu-btn py-3 rounded-2xl text-xl basis-1/2">To Do</button
      >
      <button
        on:click={() => (showModal = true)}
        class="neu-btn py-3 rounded-2xl text-xl basis-1/2">Personalizza</button
      >
    </div>
    <Modal bind:showModal>
      <h2 slot="header">
        modal
        <small><em>adjective</em> mod·al \ˈmō-dəl\</small>
      </h2>

      <ol class="definition-list">
        <li>of or relating to modality in logic</li>
        <li>
          containing provisions as to the mode of procedure or the manner of
          taking effect —used of a contract or legacy
        </li>
        <li>of or relating to a musical mode</li>
        <li>of or relating to structure as opposed to substance</li>
        <li>
          of, relating to, or constituting a grammatical form or category
          characteristically indicating predication
        </li>
        <li>of or relating to a statistical mode</li>
      </ol>

      <a href="https://www.merriam-webster.com/dictionary/modal"
        >merriam-webster.com</a
      >
    </Modal>

    <div
      class="flex justify-center items-center pt-5 text-verde-chiaro text-center"
    ></div>
    <div id="todo" class="hidden text-verde-chiaro p-3">
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
