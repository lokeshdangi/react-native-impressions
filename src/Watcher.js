import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WATCH_AT_DEFAULT = 500;

const VISIBILITY_DIRECTIONS = { X: 'X', Y: 'Y' };

const isOutOfScreenX = ({ elementWidth, pageX, visiblePercentageX, extraOffsetRight, extraOffsetLeft }) => {
  const pageXEnd = pageX + elementWidth;
  const extra = elementWidth * (visiblePercentageX / 100);
  return pageXEnd - extra + extraOffsetRight > width || pageX + extra - extraOffsetLeft < 0;
};

const isOutOfScreenY = ({ elementHeight, pageY, visiblePercentageY, extraOffsetBottom, extraOffsetTop }) => {
  const pageYEnd = pageY + elementHeight;
  const extra = elementHeight * (visiblePercentageY / 100);
  return pageYEnd - extra + extraOffsetBottom > height || pageY + extra - extraOffsetTop < 0;
};

export const Watcher = ({
  children,
  watchX,
  watchY,
  callback,
  watchInterval = WATCH_AT_DEFAULT,
  visiblePercentageX = 50,
  visiblePercentageY = 50,
  extraOffsetX = 0,
  extraOffsetBottom = 80,
  extraOffsetTop = 0,
  extraOffsetRight = 0,
  extraOffsetLeft = 0,
}) => {
  const viewRef = useRef();
  const prevVisibleX = useRef(null);
  const prevVisibleY = useRef(null);
  const [visibleX, setVisibleX] = useState(false);
  const [visibleY, setVisibleY] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (viewRef.current) {
        viewRef.current.measure((...r) => {
          const [x, y, elementWidth, elementHeight, pageX, pageY] = r;
          if (watchY) {
            const isOutY = isOutOfScreenY({ elementHeight, pageY, visiblePercentageY, extraOffsetBottom, extraOffsetTop });
            if (prevVisibleY.current !== isOutY) {
              setVisibleY(!isOutY);
              callback({ direction: VISIBILITY_DIRECTIONS.Y, visible: !isOutY });
            }
            prevVisibleY.current = isOutY;
          }

          if (watchX) {
            const isOutX = isOutOfScreenX({ elementWidth, pageX, visiblePercentageX, extraOffsetX, extraOffsetRight, extraOffsetLeft });
            if (prevVisibleX.current !== isOutX) {
              setVisibleX(!isOutX);
              callback({ direction: VISIBILITY_DIRECTIONS.X, visible: !isOutX });
            }
            prevVisibleX.current = isOutX;
          }
        });
      }
    }, watchInterval);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <View ref={viewRef} style={[{ padding: 10 }, (!visibleX || !visibleY) && { backgroundColor: 'red' }]}>
      {children}
    </View>
  );
};
