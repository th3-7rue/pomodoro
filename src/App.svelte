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
  import volume_up from "./assets/volume_up.svg";
  import volume_off from "./assets/volume_off.svg";
  let volume_src = volume_off;
  let showModal = false;
  let settings = {
    // get from local storage if available
    workTime: localStorage.getItem("workTime") || 25,
    srestTime: localStorage.getItem("srestTime") || 5,
    lrestTime: localStorage.getItem("lrestTime") || 15,
    CYCLES_S: localStorage.getItem("CYCLES_S") || 4,
  };
  let timer;
  let errorMessage = "";

  function validateSettings() {
    errorMessage = "";
    const workTime = Number(settings.workTime);
    const srestTime = Number(settings.srestTime);
    const lrestTime = Number(settings.lrestTime);
    const cycles = Number(settings.CYCLES_S);

    if (workTime < 1 || workTime > 60) {
      errorMessage = "Il tempo di lavoro deve essere tra 1 e 60 minuti.";
      return false;
    }
    if (srestTime < 1 || srestTime > 60) {
      errorMessage = "Il tempo di pausa breve deve essere tra 1 e 60 minuti.";
      return false;
    }
    if (lrestTime < 1 || lrestTime > 60) {
      errorMessage = "Il tempo di pausa lunga deve essere tra 1 e 60 minuti.";
      return false;
    }
    if (cycles < 1 || cycles > 12) {
      errorMessage = "Il numero di cicli deve essere tra 1 e 12.";
      return false;
    }
    return true;
  }
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
    <div class="p-2 lg:p-6 flex flex-col md:flex-row flex-none items-center">
      <button
        on:click={timer.mute()}
        on:click={() => {
          volume_src = volume_src === volume_off ? volume_up : volume_off;
        }}
        class="neu-btn order-2 md:order-1 grow-0 sm p-2 md:p-3"
        ><img class="size-4 md:size-6" src={volume_src} alt="" /></button
      >
      <div class="text-7xl order-1 md:order-2 lg:text-9xl ml-auto mr-auto">
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
      <h2 slot="header">Personalizza</h2>
      <div>
        <ul>
          <li>
            Tempo di lavoro:
            <input
              bind:value={settings.workTime}
              min="1"
              max="60"
              step="1"
              type="number"
            />
          </li>

          <li>
            Tempo di pausa (breve): <input
              bind:value={settings.srestTime}
              min="1"
              max="60"
              step="1"
              type="number"
            />
          </li>
          <li>
            Tempo di pausa (lunga): <input
              bind:value={settings.lrestTime}
              min="1"
              max="60"
              step="1"
              type="number"
            />
          </li>

          <li>
            Numero di cicli: <input
              bind:value={settings.CYCLES_S}
              min="1"
              max="60"
              step="1"
              type="number"
            />
          </li>
        </ul>
      </div>
      <button
        class="neu-btn-chiaro mb-3 sm py-2 px-4 rounded-xl"
        on:click={() => {
          if (validateSettings()) {
            timer.updateSettings();
            showModal = false;
          }
        }}>Conferma</button
      >
      {#if errorMessage}
        <p class="text-red-500 mt-2 text-center">{errorMessage}</p>
      {/if}
    </Modal>

    <div
      class="flex justify-center items-center lg:pt-5 text-verde-chiaro text-center"
    ></div>
    <div id="todo" class="hidden text-verde-chiaro p-6">
      <TodoCounter />
      <AddForm />
      <ListaTodo todoList={$todos} />
    </div>
    <Timer bind:this={timer} {...settings} />
  </div>
  <div>
    <Info />
  </div>
</main>
