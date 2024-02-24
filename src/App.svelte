<script>
  let title = "Pomodoro";
  import Info from "./lib/Info.svelte";
  //import TaskList from './TaskList.svelte';
  import Timer from "./lib/Timer.svelte";
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
      <div class="text-7xl md:text-9xl text-verde text-center">{title}</div>
    </div>
    <Timer />
    <!--   <TaskList />
 -->
  </div>
  <div>
    <Info />
  </div>
</main>
