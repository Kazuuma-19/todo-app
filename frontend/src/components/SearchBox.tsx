import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type SearchBoxProps = {
  onSearch: (keyword: string) => void;
};

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [keyword, setKeyword] = useState("");

  /**
   * 300ms遅延でキーワードを検索
   */
  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch(value.trim());
  }, 300);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative w-full max-w-sm">
      <Search className=" h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search..."
        className="pl-9"
        value={keyword}
        onChange={handleSearch}
      />
    </div>
  );
}
