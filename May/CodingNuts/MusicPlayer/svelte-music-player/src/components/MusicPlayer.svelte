<script>
    import {onMount} from "svelte";
    import TimelineSlider from "./TimelineSlider.svelte";
    import VolumeSlider from "./VolumeSlider.svelte";
    import Controls from "./Controls.svelte";

    //Images 
    import cover1 from "../assets/covers/cover1.jpg";
    import cover2 from "../assets/covers/cover2.jpg";
    import cover3 from "../assets/covers/cover3.jpg";
    import cover4 from "../assets/covers/cover4.jpg";
    import cover5 from "../assets/covers/cover5.jpg";
    import cover6 from "../assets/covers/cover6.jpg";
    import cover7 from "../assets/covers/cover7.jpg";

    //Tracks
    import track1 from "../assets/tracks/Immortal.mp3";
    import track2 from "../assets/tracks/No Talk.mp3";
    import track3 from "../assets/tracks/Enough.mp3";
    import track4 from "../assets/tracks/Skylines.mp3";
    import track5 from "../assets/tracks/Get Through.mp3";
    import track6 from "../assets/tracks/Lofi_Mallet.mp3";
    import track7 from "../assets/tracks/Winning.mp3";

    // Is the Track playing 

    let trackPlaying  = false;
    let volumeMuted = false;
    let volume = 0.5;
    let volumeSliderValue = 0;
    let maxVolume = 100;


    let trackId = 0;
    let audioPlayer;

    let timeline= 0;
    let sliderValue=0;
    let duration; 
    let trackLoaded = false;
    let audioSrc;

    const tracks = [
        track1,
        track2,
        track3,
        track4,
        track5,
        track6,
        track7,
    ];

    const trackNames = [
        "Immortal",
        "No Talk",
        "Enough",
        "Skylines",
        "Get Through",
        "Lofi Mallet",
        "Winning"
    ];

    const artists = [
        "NEFFEX",
        "VYEN",
        "NEFFEX",
        "Anno Domini Beats",
        "NEFFEX",
        "Kwon",
        "NEFFEX"
    ];

    const covers =[
        cover1,
        cover2,
        cover3,
        cover4,
        cover5,
        cover6,
        cover7
    ];


    function playPause(){
        if(trackPlaying ==false){
            audioPlayer.play();
            trackPlaying = true;
        }
        else{
            audioPlayer.pause();
            trackPlaying = false;
        }
    }
    
    function loadTrack(){
        audioSrc = tracks[trackId];
        audioPlayer.load();
        timeline= 0;
        handleLoadedAudio();
    }
    onMount(() => {
        loadTrack();
    });
    function handleLoadedAudio(){
        trackLoaded = true;
    }

    function format(seconds){
        const minutes = Math.floor(seconds/60);
        seconds = Math.floor(seconds %60);
        if(seconds<10){
            seconds='0' +seconds;
        }
        return `${minutes}:${seconds}`;
    }

    function getPercentage(currentTime){
        const percentage = (Math.floor(currentTime)/duration)*100 +"%";
        return percentage;
    }
    function timeChange(sliderValue){
        timeline= sliderValue;
    }
    function switchTrack(){
        if(trackPlaying== true){
            audioPlayer.play();
        }
    }
    function  prevTrack(){
        if(trackId >0) {
            trackId--
        }
        else {
            trackId = tracks.length -1
        }
        loadTrack();
        switchTrack();
    }
    function  nextTrack(){
        if(trackId <tracks.length -1) {
            trackId++
        }
        else {
            trackId = 0
        }
        loadTrack();
        switchTrack();
    }

    function changeVolume(volumeSliderValue){
        volume = volumeSliderValue /100;
        if(volume ===0){
            volumeMuted =true;
        }
        else {
            volumeMuted =false;
        }
    }
    function muteUnmute(){
        if(volumeMuted == true){
            volumeMuted = false;
            volume =0.5;
        }
        else {
            volumeMuted =false;
            volume=0;
        }
    }












</script>

<div class="player">
    <img src={covers[trackId]} alt="cover" class="cover"/>
    <h1 class="track-title">{trackNames[trackId]}</h1>
    <span class="artist-name">{artists[trackId]}</span>
    <div class="timeline-slider">
        <div class="timeline">
            <small class="time"> {format(timeline)}</small>
            <small class="fulltime">{format(duration)}</small>
        </div>
        <TimelineSlider min={0} {timeline} {trackLoaded} 
        {duration}{timeChange} {sliderValue}{getPercentage}/>
    </div>
    <div class="volume-slider">
        <div class="volume-icon" on:click={muteUnmute} on:keydown={muteUnmute}>
            {#if volume >0.5}
            <span class="material-symbols-outlined">
                volume_up
            </span>
            {:else if  volume === 0 }
            <span class="material-symbols-outlined">
                volume_off
            </span>
            {:else}
            <span class="material-symbols-outlined">
                volume_down
            </span>
            {/if}
        </div>
        
        <VolumeSlider
            min={0} max={maxVolume}
            {volume} {volumeSliderValue}
            {changeVolume}
            />

    </div>
    <Controls {trackPlaying} {playPause} {prevTrack} {nextTrack}/>
</div>


<audio  hidden id="audio"
bind:this = {audioPlayer} 
on:loadeddata={handleLoadedAudio}
bind:duration
bind:currentTime={timeline} on:ended={nextTrack}
bind:volume >
    <source src={audioSrc}/>
</audio>

<style>
    .player{
        max-width: 900px;
        margin:0 auto;
        text-align: center;
        padding: 2.5rem;
        color: #eee;
    }
    .cover{
        width:90%;
        max-width: 16em;
        border: 0.8em #171a1d solid;
        border-radius: 50%;
        box-shadow: var(--neu);
    }
    h1{
        margin:1em 0 0.3em 0;
    }
    :global(.range-slider){
        margin-top: 0.4em;
        position:relative;
        display:flex;
        user-select: none;
    }
    :global(.slider){
        -webkit-appearance: none;
        appearance:none;
        width: 100%;
        height: 0.4em;
        outline:none;
        border-radius: 3px;
        background:#1f1f1f;
        box-shadow:
            inset 3px 3px 6px #000,
            1px 1px 1px #909090;
        cursor:pointer;
    }

    :global(.slider::-webkit-slider-thumb){
        -webkit-appearance: none;
        width:1.7em;
        height:1.7em;
        z-index:3;
        position:relative;
    }
    :global(.progress){
        width:0;
        height:0.4em;
        border-radius:3px;
        background:linear-gradient(
            90deg,
            #c72611,
            #e75709
        );
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        left:0;
        pointer-events:none;
    }

    .timeline-slider{
        margin:2em auto;
        max-width:30em;
    }
    .timeline{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .volume-slider{
        max-width: 16em;
        margin:1em auto;
        display:flex;
        justify-content: center;
        align-items:center;
    }
    .volume-icon{
        margin:0 0.5em;
        cursor:pointer;
    }
    .volume-icon span{
        font-size:2em;
        padding-top:0.2em;
    }

</style>