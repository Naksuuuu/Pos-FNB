import { Loader2, Search, X } from "lucide-react";

import useCustomOptionAsyncSelect from "@/Features/Dashboard/Menu/Hooks/useCustomOptionAsyncSelect";

import { Input } from "@/Components/Elements/Inputs/Input";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Checkbox } from "@/Components/Elements/Shadcn/checkbox";
import { rupiah } from "@/Utils/rupiahHelper";

const CustomOptionAsyncSelect = ({ field, selectedMenu = null }) => {
  const {
    searchQuery,
    hasSearchInput,
    isOpen,
    setIsOpen,
    isLoading,
    fetchedItems,
    selectedValues,
    optionsMap,
    handleSearchChange,
    handleClearSearch,
    handleToggle,
  } = useCustomOptionAsyncSelect({ field, selectedMenu });

  return (
    <div className="relative w-full space-y-3">
      {/* Search Input */}
      <Input
        id="custom-option-search-input"
        autoComplete="off"
        placeholder="Cari & pilih opsi kustom (misal: Extra Cheese)..."
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={() => setIsOpen(true)}
        firstAddon={<Search className="size-4 text-muted-foreground" />}
        lastAddon={
          searchQuery ? (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              className="text-destructive hover:text-destructive! hover:bg-destructive/10!"
              onClick={handleClearSearch}
            >
              <X className="size-4" />
            </Button>
          ) : null
        }
      />

      {/* Dropdown Options List */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 top-11 p-2 border rounded-lg shadow-lg bg-popover text-popover-foreground max-h-60 overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between px-2 pb-2 border-b mb-1">
            <span className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">
              {hasSearchInput ? "Hasil Pencarian (max 10 data tampil)" : "Pencarian Opsi Kustom"}
            </span>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Tutup
            </Button>
          </div>

          {!hasSearchInput ? (
            <p className="p-3 text-xs text-center text-muted-foreground">
              Ketik nama opsi kustom untuk mulai mencari...
            </p>
          ) : isLoading ? (
            <div className="flex items-center justify-center p-3 text-xs text-muted-foreground gap-2">
              <Loader2 className="size-4 animate-spin" /> Memuat opsi kustom...
            </div>
          ) : fetchedItems.length === 0 ? (
            <p className="p-3 text-xs text-center text-muted-foreground">Tidak ada opsi kustom ditemukan.</p>
          ) : (
            <div className="space-y-1">
              {fetchedItems.map((opt) => {
                const isSelected = selectedValues.includes(opt.id);
                const label = opt.name || opt.custom_name || opt.title || "";
                const price = Number(opt.price) || 0;

                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => handleToggle(opt)}
                    className={`w-full flex items-center justify-between p-2 rounded-md text-xs text-left cursor-pointer transition ${
                      isSelected ? "bg-primary/10 font-medium text-primary" : "hover:bg-input/20 text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox checked={isSelected} onCheckedChange={() => handleToggle(opt)} />
                      <span>{label}</span>
                    </div>
                    {price ? <span className="font-semibold">{rupiah(price)}</span> : null}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Selected Items Badges/Chips */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {selectedValues.map((id) => {
            const info = optionsMap[id];
            const label = info?.label || id;
            const price = info?.price;

            return (
              <Button
                type="button"
                key={id}
                onClick={() => handleToggle(id)}
                variant="outline"
                size="sm"
                className="bg-primary/15 hover:bg-primary/25 border-primary text-xs h-8 cursor-pointer gap-1.5"
              >
                <Checkbox checked onCheckedChange={() => handleToggle(id)} />
                <span>{label}</span>
                {price ? <span className="font-semibold">({rupiah(price)})</span> : null}
                <X className="size-3 ml-1 text-muted-foreground hover:text-destructive" />
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomOptionAsyncSelect;
