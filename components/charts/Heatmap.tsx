import React from 'react';
import { HEATMAP_DATA } from '../../constants';

const getColorForValue = (value: number) => {
  // -1 (red) -> 0 (yellow) -> 1 (green)
  const r = value > 0 ? 250 - 216 * value : 239 + 11 * value;
  const g = value < 0 ? 204 + 136 * value : 197 - 7 * value;
  const b = value < 0 ? 21 - 47 * value : 68 - 47 * value;
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

const Heatmap: React.FC = () => {
  const { labels, data } = HEATMAP_DATA;

  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-4">
      <div className="flex w-full">
        <div className="w-20 flex-shrink-0" />
        <div className="grid flex-grow grid-cols-4 gap-1">
          {labels.map(label => (
            <div key={label} className="text-center text-xs font-bold text-gray-400">
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-grow w-full mt-1">
        <div className="grid w-20 flex-shrink-0 grid-rows-4 gap-1">
          {labels.map(label => (
            <div key={label} className="flex items-center justify-end pr-2 text-xs font-bold text-gray-400">
              {label}
            </div>
          ))}
        </div>
        <div className="grid flex-grow grid-cols-4 grid-rows-4 gap-1">
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
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 pointer-events-none">
                  {labels[rowIndex]} / {labels[colIndex]}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Heatmap;