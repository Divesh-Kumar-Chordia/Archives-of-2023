<script>
    export let trackPlaying;
    export let playPause;
    export let prevTrack;
    export let nextTrack;
</script>

<div class="controls">
    <button class="btn" on:click={prevTrack}>
        <span class="material-symbols-outlined">
            fast_rewind
        </span>
    </button>
    <button class="btn-main btn" on:click={playPause}>
        <span class="material-symbols-outlined">
            {trackPlaying ? "pause" : "play_arrow" }
        </span>
    </button>

    <button class="btn" on:click={nextTrack}>
        <span class="material-symbols-outlined">
            fast_forward
        </span>
    </button>
</div>


<style>
    .btn{
        margin:1em;
        background: linear-gradient(
            -60deg,
            #1e1f23,
            #233137
        );
        border:none;
        box-shadow: var(--btn-neu);
        width:4em;
        height:4em;
        border:0.2em #1c2023 solid;
        border-radius: 50%;
        cursor:pointer;
    }

    .btn:hover{
        background:linear-gradient(
            60deg,
            #1e1f23,
            #2e3137
        );
    }
    .btn-main{
        background:linear-gradient(
            -60deg,
            #c72611,
            #e75709
        );
        width:4.5em;
        height:4.5em;
    }

    .btn-main:hover{
        background:linear-gradient(
            60deg,
            #c72611,
            #e75709
        );

    }

    .btn-main span{
        color:#fff;
    }

    @media screen and (max-width: 500px){
        .btn{
            font-size:0.8em;
        }
    }


</style>
