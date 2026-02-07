import type { FilterType } from "../types";

interface Props {
  current: FilterType;
  onChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export function Filter({ current, onChange, activeCount, completedCount, onClearCompleted }: Props) {
  return (
    <div className="filter-bar">
      <span className="todo-count">
        {activeCount} item{activeCount !== 1 ? "s" : ""} left
      </span>
      <div className="filter-buttons">
        {filters.map((f) => (
          <button
            key={f.value}
            className={current === f.value ? "active" : ""}
            onClick={() => onChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
}
