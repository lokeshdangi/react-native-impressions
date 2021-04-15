# react-native-impressions
Track which components are visible to user

### Usage

```
import { Watcher } from "react-native-impressions"

<Watcher watchX watchY callback={({ direction, visible }) => {...}}>
   <YourComponent />
</Watcher>
```

### Props
| name        | type           | description  |
| ------------- |:-------------:| -----:|
| watchX      | boolean | watch only for x-axis |
| watchY      | boolean | watch only for y-axis |
| callback      | function | return the direction and visibility status of the component |
| watchInterval      | number | watch position at this time interval in milliseconds |
| visiblePercentageX      | number | valid percent component visibility for x-axis |
| visiblePercentageY      | number | valid percent component visibility for y-axis |
| extraOffsetBottom      | number | addition offet to avoid other components |
| extraOffsetTop      | number | addition offet to avoid other components |
| extraOffsetRight      | number | addition offet to avoid other components |
| extraOffsetLeft      | number | addition offet to avoid other components |
