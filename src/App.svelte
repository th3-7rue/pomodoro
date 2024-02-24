<script>
  let title = "Pomodoro";
  import Info from "./lib/Info.svelte";
  //import TaskList from './TaskList.svelte';
  import Timer from "./lib/Timer.svelte";
</script>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<main>
  <div class="bg-rosso-scuro">
    <div class="flex justify-center items-center p-3">
      <h1 class="text-7xl md:text-9xl text-verde text-center">{title}</h1>
    </div>
    <Timer />
    <!--   <TaskList />
 -->
  </div>
  <div>
    <Info />
  </div>
</main>
