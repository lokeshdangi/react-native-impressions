# react-native-impressions

Track which components are visible to user

### Installation

```
npm install react-native-impressions
```

### Usage

```
import { Watcher } from "react-native-impressions"

<Watcher watchX watchY callback={({ direction, visible }) => {...}}>
   <YourComponent />
</Watcher>
```

### Props

| name               |   type   |                                                 description |
| ------------------ | :------: | ----------------------------------------------------------: |
| watchX             | boolean  |                                       watch only for x-axis |
| watchY             | boolean  |                                       watch only for y-axis |
| callback           | function | return the direction and visibility status of the component |
| watchInterval      |  number  |        watch position at this time interval in milliseconds |
| visiblePercentageX |  number  |               valid percent component visibility for x-axis |
| visiblePercentageY |  number  |               valid percent component visibility for y-axis |
| extraOffsetBottom  |  number  |                   addition offset to avoid other components |
| extraOffsetTop     |  number  |                   addition offset to avoid other components |
| extraOffsetRight   |  number  |                   addition offset to avoid other components |
| extraOffsetLeft    |  number  |                   addition offset to avoid other components |
