<script>
  import { todos } from "./store";
</script>

<div>
  
  {$todos.length} 
  {#if $todos.length==1}
    cosa
  {:else}
    cose
  {/if}
   da fare
</div>
