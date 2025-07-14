// src/components/FilterBar.jsx
function FilterBar({ filters, onRemove, onClear }) {
  return (
    <div className="relative z-10 bg-white shadow-md -mt-8 mb-6 rounded px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
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
        className="text-desaturatedDarkCyan font-semibold hover:underline self-end md:self-auto"
      >
        Clear
      </button>
    </div>
  );
}


export default FilterBar;
