import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  FilterGroup,
  FilterOption,
  FilterValues,
} from "@/config/navigation";

interface SidebarFiltersProps {
  title: string;
  groups: FilterGroup[];
  values: FilterValues;
  onChange: (groupId: string, optionValue: string, checked: boolean) => void;
  sortLabel: string;
  sortOptions: FilterOption[];
  sortValue: string;
  onSortChange: (value: string) => void;
}

export function SidebarFilters(p: SidebarFiltersProps) {
  const uid = useId();
  return (
    <div className="space-y-6 px-4 py-4">
      <h3 className="text-sm font-medium text-muted-foreground">{p.title}</h3>

      {p.groups.map((group) => (
        <fieldset key={group.id} className="space-y-3">
          <legend className="mb-3 text-sm font-medium">{group.label}</legend>
          {group.options.map((opt) => {
            const id = `${uid}-${group.id}-${opt.value}`;
            return (
              <div key={id} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={p.values[group.id]?.includes(opt.value) ?? false}
                  onCheckedChange={(v) =>
                    p.onChange(group.id, opt.value, v === true)
                  }
                />
                <label htmlFor={id} className="text-sm">
                  {opt.label}
                </label>
              </div>
            );
          })}
        </fieldset>
      ))}

      <div className="space-y-2">
        <span className="text-sm font-medium">{p.sortLabel}</span>
        <Select value={p.sortValue} onValueChange={p.onSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {p.sortOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
