<script>
    export let min;
    export let max;
    export let volume;
    export let changeVolume;
    export let volumeSliderValue;
</script>

<div class="range-slider">
    <input type="range"
    min={min} max={max}
    class="slider"
    bind:value={volumeSliderValue}
    on:input={() => changeVolume(volumeSliderValue)}
    />
    <div class="progress"
    style="width: {volume *100}%">

    </div>
</div>

<style>
    .slider::-webkit-slider-thumb{
        width:0;
    }
    .progress{
        width:50%;
    }

</style>