<script>
  import pomodoroHalf from "../assets/PomodoroHalf.webp";
  import pomodoroPieno from "../assets/PomodoroPieno.webp";
  import start from "../assets/start.svg";
  import pause from "../assets/pause.svg";
  import stop from "../assets/stop.svg";
  import skip from "../assets/skip.svg";
  const minutesToSeconds = (minutes) => minutes * 60;
  const secondsToMinutes = (seconds) => Math.floor(seconds / 60);
  const padWithZeroes = (number) => number.toString().padStart(2, "0");
  const State = {
    idle: "idle",
    inProgress: "in progress",
    resting: "resting",
    progressPaused: "progressPaused",
    restPaused: "restPaused",
  };

  const POMODORO_S = minutesToSeconds(25);
  const LONG_BREAK_S = minutesToSeconds(20);
  const SHORT_BREAK_S = minutesToSeconds(5);

  let currentState = State.idle;
  let pomodoroTime = POMODORO_S;
  let completedPomodoros = 0;
  let interval;

  function formatTime(timeInSeconds) {
    const minutes = secondsToMinutes(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  }

  function startPomodoro() {
    currentState = State.inProgress;
    interval = setInterval(() => {
      if (pomodoroTime === 0) {
        completePomodoro();
      }
      pomodoroTime -= 1;
    }, 1000);
  }

  function completePomodoro() {
    clearInterval(interval);
    completedPomodoros++;
    if (completedPomodoros === 4) {
      rest(LONG_BREAK_S);
      completedPomodoros = 0;
    } else {
      rest(SHORT_BREAK_S);
    }
  }
  function completeRest() {
    idle();
    startPomodoro();
  }
  function skipTime() {
    if (
      currentState === State.inProgress ||
      currentState === State.progressPaused
    ) {
      completePomodoro();
    } else if (
      currentState === State.resting ||
      currentState === State.restPaused
    ) {
      completeRest();
    }
  }
  function rest(time) {
    currentState = State.resting;
    pomodoroTime = time;
    interval = setInterval(() => {
      if (pomodoroTime === 0) {
        idle();
      }
      pomodoroTime -= 1;
    }, 1000);
  }

  function cancelPomodoro() {
    // TODO: Add some logic to prompt the user to write down
    // the cause of the interruption.
    idle();
  }
  function pauseTime() {
    clearInterval(interval);
    if (currentState === State.inProgress) {
      currentState = State.progressPaused;
    } else if (currentState === State.resting) {
      currentState = State.restPaused;
    }
  }
  function idle() {
    currentState = State.idle;
    clearInterval(interval);
    pomodoroTime = POMODORO_S;
  }
  // add skip button logic
</script>

<section>
  <div class="flex justify-center items-center">
    {#if pomodoroTime < POMODORO_S / 2}
      <img
        style="width: 50vh; height: auto;"
        src={pomodoroHalf}
        alt="Pomodoro a metà"
      />
    {:else}
      <img
        style="width: 50vh; height: auto;"
        src={pomodoroPieno}
        alt="Pomodoro pieno"
      />
    {/if}
  </div>
  <div class="flex justify-center items-center">
    <p class="text-verde-chiaro text-7xl md:text-9xl">
      {formatTime(pomodoroTime)}
    </p>
  </div>
  <div class="flex justify-center items-center md:p-3">
    <button
      aria-label="start"
      hidden={currentState !== State.idle &&
        currentState !== State.progressPaused &&
        currentState !== State.restPaused}
      class="text-verde"
      on:click={startPomodoro}
    >
      <img style="height: 80px;" src={start} alt="" />
    </button>
    <button
      aria-label="pause"
      hidden={currentState === State.idle ||
        currentState === State.progressPaused ||
        currentState === State.restPaused}
      class="text-verde"
      on:click={pauseTime}
    >
      <img style="height: 70px;" src={pause} alt="" />
    </button>
    <button
      aria-label="skip"
      hidden={currentState === State.idle}
      class="text-verde ml-5"
      on:click={skipTime}
    >
      <img style="height: 80px;" src={skip} alt="" />
    </button>
    <button
      aria-label="cancel"
      hidden={currentState === State.idle}
      class="text-verde ml-5"
      on:click={cancelPomodoro}
    >
      <img style="height: 80px;" src={stop} alt="" />
    </button>
  </div>
  <!--button on:click={completePomodoro}>complete</button-->
</section>
