import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function SearchBox() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className=" h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input type="text" placeholder="Search..." className="pl-9" />
    </div>
  );
}
