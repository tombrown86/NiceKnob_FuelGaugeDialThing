# NiceKnob_FuelGaugeDialThing

JS Canvas multi value fuel gauge / dial / knob thing


E.g.
```
<div id="knob"></div>
<script>
// E.g. width & height = 200px.. Value range from 0 to 100
// 3 values passed in with 3 different colours
const knob = (new NiceKnob()).build(200, {minimum_value: 0, maximum_value: 100});
knob.setValues([100, 60, 50], ['green', 'orange', 'maroon']);

const node = knob.get();
const elem = document.getElementById('knob');
elem.appendChild(node);
</script>
```

<img width="215" alt="Screenshot 2024-02-06 at 13 30 22" src="https://github.com/tombrown86/NiceKnob_FuelGaugeDialThing/assets/15341007/2a9df738-c444-4d11-8f8a-82c678551786">



With needle

```
<script>
// with needle at value 70
knob.setValues([100, 60, 50], ['green', 'orange', 'maroon'], 70);
</script>
```
  

<img width="215" alt="Screenshot 2024-02-06 at 16 09 19" src="https://github.com/tombrown86/NiceKnob_FuelGaugeDialThing/assets/15341007/12caa9de-5178-4273-9c3d-0204500ae8c9">
