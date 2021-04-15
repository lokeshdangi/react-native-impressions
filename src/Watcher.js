import React, { useEffect, useRef } from "react";
import { View, Dimensions } from "react-native";

import { VISIBILITY_DIRECTIONS, WATCH_AT_DEFAULT } from "./constants";

const { width, height } = Dimensions.get("window");

const isOutOfScreenX = ({ elementWidth, pageX, visiblePercentageX, extraOffsetRight, extraOffsetLeft }) => {
  const allowedOverflowRight = elementWidth * (visiblePercentageX / 100);
  const allowedOverflowLeft = elementWidth * ((100 - visiblePercentageX) / 100);

  const isOverflowRight = pageX + allowedOverflowRight > width - extraOffsetRight;
  const isOverflowLeft = pageX + allowedOverflowLeft < 0 + extraOffsetLeft;

  return isOverflowRight || isOverflowLeft;
};

const isOutOfScreenY = ({ elementHeight, pageY, visiblePercentageY, extraOffsetBottom, extraOffsetTop }) => {
  const allowedOverflowBottom = elementHeight * (visiblePercentageY / 100);
  const allowedOverflowTop = elementHeight * ((100 - visiblePercentageY) / 100);

  const isOverflowBottom = pageY + allowedOverflowBottom > height - extraOffsetBottom;
  const isOverflowTop = pageY + allowedOverflowTop < 0 + extraOffsetTop;

  return isOverflowBottom || isOverflowTop;
};

export const Watcher = ({
  children = null,
  watchX = false,
  watchY = false,
  callback = null,
  watchInterval = WATCH_AT_DEFAULT,
  visiblePercentageX = 50,
  visiblePercentageY = 50,
  extraOffsetBottom = 0,
  extraOffsetTop = 0,
  extraOffsetRight = 0,
  extraOffsetLeft = 0,
}) => {
  const viewRef = useRef();
  const prevVisibleX = useRef(null);
  const prevVisibleY = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (viewRef.current) {
        viewRef.current.measure((...r) => {
          const [x, y, elementWidth, elementHeight, pageX, pageY] = r;
          if (watchY) {
            const isOutY = isOutOfScreenY({ elementHeight, pageY, visiblePercentageY, extraOffsetBottom, extraOffsetTop });
            if (prevVisibleY.current !== isOutY) {
              callback && callback({ direction: VISIBILITY_DIRECTIONS.Y, visible: !isOutY });
            }
            prevVisibleY.current = isOutY;
          }

          if (watchX) {
            const isOutX = isOutOfScreenX({ elementWidth, pageX, visiblePercentageX, extraOffsetRight, extraOffsetLeft });
            if (prevVisibleX.current !== isOutX) {
              callback && callback({ direction: VISIBILITY_DIRECTIONS.X, visible: !isOutX });
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

  return <View ref={viewRef}>{children}</View>;
};
