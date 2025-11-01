import React from 'react';
import { AIRFRAME_STRESS_HEATMAP_DATA } from '../../../constants';

const getColorForValue = (value: number) => {
  // 0 (blue) -> 0.5 (green) -> 1 (red)
  const hue = (1 - value) * 120;
  return `hsl(${hue}, 80%, 45%)`;
};

const StructuralHeatmap: React.FC = () => {
  const { labels, data, yLabels } = AIRFRAME_STRESS_HEATMAP_DATA;

  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-4">
      <div className="flex w-full">
        <div className="w-24 flex-shrink-0" />
        <div className="grid flex-grow grid-cols-5 gap-1">
          {labels.map(label => (
            <div key={label} className="text-center text-xs font-bold text-gray-400 rotate-[-30deg] translate-y-2">
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-grow w-full mt-1">
        <div className="grid w-24 flex-shrink-0 grid-rows-4 gap-1">
          {yLabels.map(label => (
            <div key={label} className="flex items-center justify-end pr-2 text-xs font-bold text-gray-400">
              {label}
            </div>
          ))}
        </div>
        <div className="grid flex-grow grid-cols-5 grid-rows-4 gap-1">
          {data.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="group relative flex items-center justify-center rounded-sm"
                style={{ backgroundColor: getColorForValue(value) }}
              >
                <span className="text-white text-xs font-bold mix-blend-difference">
                  {value.toFixed(2)}
                </span>
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 pointer-events-none z-10">
                  {labels[colIndex]} / {yLabels[rowIndex]}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StructuralHeatmap;