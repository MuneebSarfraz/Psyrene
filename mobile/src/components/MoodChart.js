import React from 'react';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGrad, Stop, Text as SvgText } from 'react-native-svg';

// Reusable mood sparkline used on Home and Analytics
export default function MoodChart({ width = 310, height = 58, labelledToday = true }) {
  const areaPath = 'M10,50 C44,40 58,28 88,20 S124,8 158,12 S206,26 268,5 L268,58 L10,58Z';
  const linePath = 'M10,50 C44,40 58,28 88,20 S124,8 158,12 S206,26 268,5';
  return (
    <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <Defs>
        <SvgGrad id="mg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#5C9B74" stopOpacity="0.22" />
          <Stop offset="100%" stopColor="#5C9B74" stopOpacity="0" />
        </SvgGrad>
      </Defs>
      <Path d={areaPath} fill="url(#mg)" />
      <Path d={linePath} fill="none" stroke="#5C9B74" strokeWidth={2.2} strokeLinecap="round" />
      <Circle cx={268} cy={5} r={10} fill="#5C9B74" opacity={0.15} />
      <Circle cx={268} cy={5} r={5} fill="#5C9B74" />
      <SvgText x={8} y={55} fontSize={8} fill="#A0AEBB">Mon</SvgText>
      <SvgText x={92} y={55} fontSize={8} fill="#A0AEBB">Wed</SvgText>
      <SvgText x={180} y={55} fontSize={8} fill="#A0AEBB">Fri</SvgText>
      {labelledToday && (
        <SvgText x={244} y={55} fontSize={8} fill="#5C9B74" fontWeight="600">Today</SvgText>
      )}
    </Svg>
  );
}
