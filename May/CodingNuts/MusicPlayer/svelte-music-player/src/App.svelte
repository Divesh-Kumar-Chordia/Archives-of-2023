<script>
 import MusicPlayer from "./components/MusicPlayer.svelte";
</script>

<MusicPlayer/>

<style>
  :root {
  --neu: 0.8em 0.8em 1.8em #151618, -0.8em -0.8em 1em #33353b;
  --btn-neu: 0.3em 0.3em 0.8em #151618, -0.3em -0.3em 0.5em #33353b;
}

  :global(body){
    font-family: Helvetica, sans-serif;
    background-color: #26282c;
  }
  :global(*){
    box-sizing: border-box;
    margin:0;
    padding:0;
  }
  :global(span),
  :global(small){
    color:#8c8f90;
  }

</style>
