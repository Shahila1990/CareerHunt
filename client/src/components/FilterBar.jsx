// src/components/FilterBar.jsx
function FilterBar({ filters, onRemove, onClear }) {
  return (
    <div className="bg-white shadow-lg rounded px-6 py-4 flex flex-wrap justify-between items-center">
      <div className="flex flex-wrap gap-4">
        {filters.map((filter) => (
          <div
            key={filter}
            className="flex items-center bg-lightGrayishCyanFilter px-3 py-1 rounded"
          >
            <span className="font-semibold text-desaturatedDarkCyan mr-2">
              {filter}
            </span>
            <button
              className="text-white bg-desaturatedDarkCyan hover:bg-veryDarkGrayishCyan rounded px-2 py-1"
              onClick={() => onRemove(filter)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={onClear}
        className="text-desaturatedDarkCyan font-semibold hover:underline mt-4 md:mt-0"
      >
        Clear
      </button>
    </div>
  );
}

export default FilterBar;
