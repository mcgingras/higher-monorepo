const ARROW_SIZE = 64;
const GRID_WIDTH = 7;
const GRID_HEIGHT = 7;

// 7x7

// 0-15
const a = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

// 15-30
const b = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
// 30-45
const c = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
// 45-60
const d = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
// 60-75
const e = [
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];
// 75-90
const f = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
];
const g = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0],
];

const patterns = {
  0: a,
  1: b,
  2: c,
  3: d,
  4: e,
  5: f,
  6: g,
};

const Arrow = ({ x, y, degree }: { x: number; y: number; degree: number }) => {
  return (
    <g
      style={{
        transform: `translate(${ARROW_SIZE * x}px, ${ARROW_SIZE * y + 5}px)`,
      }}
    >
      <text
        x="0"
        y="0"
        font-family="Inter"
        font-size={ARROW_SIZE}
        fill="white"
        transform={`rotate(${degree})`}
        transform-origin="32px 26px"
        lengthAdjust="spacingAndGlyphs"
        textLength={ARROW_SIZE}
        dominant-baseline="hanging"
      >
        &uarr;
      </text>
    </g>
  );
};

const DemoToken = ({
  degree,
  className,
}: {
  degree: number;
  className?: string;
}) => {
  const normalizedDegree = 90 - degree;
  const degreeIndex = Math.floor(normalizedDegree / 15);
  // @ts-ignore
  const pattern = patterns[degreeIndex];

  // map degree to value between 0 and 50
  const colorIntensity = Math.floor((normalizedDegree / 90) * 50);
  // map degree to value between 80 and 35
  const colorHue = Math.floor(60 - (normalizedDegree / 90) * 25);

  return (
    <svg
      className={className}
      width={ARROW_SIZE * GRID_WIDTH}
      height={ARROW_SIZE * GRID_HEIGHT}
      viewBox={`0 0 ${ARROW_SIZE * GRID_WIDTH} ${ARROW_SIZE * GRID_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="crispEdges"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css?family=Inter:400');
        </style>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`hsl(110, ${colorIntensity}%, ${colorHue}%)`}
        rx="8"
      />
      {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }).map((_, i) => {
        const x = i % GRID_WIDTH;
        const y = Math.floor(i / GRID_WIDTH);
        if (pattern[y][x] === 0) return null;
        return <Arrow x={x} y={y} degree={degree} />;
      })}
      <g
        style={{
          transform: `translate(${390}px, ${ARROW_SIZE * 6 + 5}px)`,
        }}
      >
        <rect width={50} height={50} fill="#ffffff50" rx="4" />
        <text
          x="25"
          y="25"
          font-family="Inter"
          font-size={24}
          fill="white"
          text-anchor="middle"
          dominant-baseline="central"
        >
          {normalizedDegree}
        </text>
      </g>
    </svg>
  );
};

export default DemoToken;
