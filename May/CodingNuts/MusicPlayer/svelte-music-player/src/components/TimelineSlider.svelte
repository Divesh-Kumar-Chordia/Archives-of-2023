<script>
    export let min;
    export let timeline;
    export let trackLoaded;
    export let duration;
    export let sliderValue;
    export let getPercentage;
    export let timeChange;
</script>


<div class="range-slider">
    <input type="range"
    min={min}
    max={trackLoaded && duration}
    on:input={()=>timeChange(sliderValue)}
    class="slider"
    bind:value={sliderValue}/>
    <div class="slider-thumb"
    style="left: calc({getPercentage(timeline)} - 0.5em);"></div>
    <div class="progress"
    style="width:{getPercentage(timeline)};"></div>

</div>

<style>
    .slider::-webkit-slider-thumb{
        width:0;
    }
    .slider-thumb{
        position:absolute;
        width:1em;
        height:1em;
        background: #d2d2d2;
        border-radius: 50%;
        position:absolute;
        top:50%;
        left:-0.5em;
        transform: translateY(-50%);
        z-index:2;
        pointer-events:none;
    }
</style>