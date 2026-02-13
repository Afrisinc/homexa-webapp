"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Check } from "lucide-react";
import { FilterOptions, Category } from "@/lib/types";
import { getBrands, getModelsByBrand, getPriceRangeByCurrency, getCurrencies } from "@/data/products";
import { formatCurrency } from "@/utils/constants";

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
  categories?: Category[];
}

export function FilterPanel({
  filters,
  onFilterChange,
  className,
  categories = [],
}: FilterPanelProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>(
    filters.currency
  );
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    filters.brand
  );
  const [selectedModel, setSelectedModel] = useState<string | undefined>(
    filters.model
  );
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    filters.categoryId
  );
  const [location, setLocation] = useState<string | undefined>(filters.location);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(
    filters.verifiedSellersOnly ?? false
  );
  const [availability, setAvailability] = useState<"all" | "in-stock" | "out-of-stock">(
    filters.availability ?? "all"
  );

  // Get dynamic price range based on selected currency
  const priceConfig = useMemo(() => {
    return getPriceRangeByCurrency(selectedCurrency);
  }, [selectedCurrency]);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.priceMin ?? priceConfig.min,
    filters.priceMax ?? priceConfig.max,
  ]);

  const brands = getBrands();
  const models = selectedBrand ? getModelsByBrand(selectedBrand) : [];
  const currencies = getCurrencies();
  const activeCategoryName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.name
    : undefined;

  // Update price range when currency changes or filters change
  useEffect(() => {
    const newMin = filters.priceMin ?? priceConfig.min;
    const newMax = filters.priceMax ?? priceConfig.max;
    setPriceRange([newMin, newMax]);
    setSelectedCurrency(filters.currency);
    setSelectedBrand(filters.brand);
    setSelectedModel(filters.model);
    setSelectedCategory(filters.categoryId);
    setLocation(filters.location);
    setVerifiedOnly(filters.verifiedSellersOnly ?? false);
    setAvailability(filters.availability ?? "all");
  }, [filters, priceConfig]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handlePriceCommit = (value: number[]) => {
    onFilterChange({
      ...filters,
      priceMin: value[0],
      priceMax: value[1],
    });
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    const newPriceConfig = getPriceRangeByCurrency(currency);
    setPriceRange([newPriceConfig.min, newPriceConfig.max]);
    onFilterChange({
      ...filters,
      currency,
      priceMin: undefined,
      priceMax: undefined,
    });
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel(undefined);
    onFilterChange({
      ...filters,
      brand,
      model: undefined,
    });
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    onFilterChange({
      ...filters,
      model,
    });
  };

  const handleClearFilters = () => {
    const defaultConfig = getPriceRangeByCurrency();
    setPriceRange([defaultConfig.min, defaultConfig.max]);
    setSelectedCurrency(undefined);
    setSelectedBrand(undefined);
    setSelectedModel(undefined);
    setSelectedCategory(undefined);
    setLocation(undefined);
    setVerifiedOnly(false);
    setAvailability("all");
    onFilterChange({});
  };

  const hasActiveFilters =
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    filters.currency ||
    filters.brand ||
    filters.model ||
    filters.categoryId ||
    filters.location ||
    filters.verifiedSellersOnly ||
    filters.availability;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Filters</CardTitle>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="gap-1 text-xs"
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Currency */}
        {currencies.length > 1 && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Currency</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  aria-label="Select currency"
                >
                  <span className="truncate">
                    {selectedCurrency || "All Currencies"}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem
                  onSelect={() => {
                    setSelectedCurrency(undefined);
                    const defaultConfig = getPriceRangeByCurrency();
                    setPriceRange([defaultConfig.min, defaultConfig.max]);
                    onFilterChange({
                      ...filters,
                      currency: undefined,
                      priceMin: undefined,
                      priceMax: undefined,
                    });
                  }}
                >
                  All Currencies
                </DropdownMenuItem>
                {currencies.map((currency) => (
                  <DropdownMenuItem
                    key={currency}
                    onSelect={() => handleCurrencyChange(currency)}
                  >
                    {currency}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Price Range */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Price Range</label>
          <div className="px-2">
            <Slider
              min={priceConfig.min}
              max={priceConfig.max}
              step={priceConfig.step}
              value={priceRange}
              onValueChange={handlePriceChange}
              onValueCommit={handlePriceCommit}
              className="w-full"
              aria-label="Price range filter"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatCurrency(priceRange[0], selectedCurrency || "USD")}</span>
            <span>{formatCurrency(priceRange[1], selectedCurrency || "USD")}</span>
          </div>
        </div>

        {/* Brand */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Brand</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
                aria-label="Select brand"
              >
                <span className="truncate">
                  {selectedBrand || "All Brands"}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItem
                onSelect={() => {
                  setSelectedBrand(undefined);
                  setSelectedModel(undefined);
                  onFilterChange({
                    ...filters,
                    brand: undefined,
                    model: undefined,
                  });
                }}
              >
                All Brands
              </DropdownMenuItem>
              {brands.map((brand) => (
                <DropdownMenuItem
                  key={brand}
                  onSelect={() => handleBrandChange(brand)}
                >
                  {brand}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Model (dependent on brand) */}
        {selectedBrand && models.length > 0 && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Model</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  aria-label="Select model"
                >
                  <span className="truncate">
                    {selectedModel || "All Models"}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem
                  onSelect={() => {
                    setSelectedModel(undefined);
                    onFilterChange({
                      ...filters,
                      model: undefined,
                    });
                  }}
                >
                  All Models
                </DropdownMenuItem>
                {models.map((model) => (
                  <DropdownMenuItem
                    key={model}
                    onSelect={() => handleModelChange(model)}
                  >
                    {model}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Category */}
        {categories.length > 0 && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Category</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  aria-label="Select category"
                >
                  <span className="truncate">
                    {activeCategoryName || "All Categories"}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem
                  onSelect={() => {
                    setSelectedCategory(undefined);
                    onFilterChange({
                      ...filters,
                      categoryId: undefined,
                    });
                  }}
                >
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onSelect={() => {
                      setSelectedCategory(category.id);
                      onFilterChange({
                        ...filters,
                        categoryId: category.id,
                      });
                    }}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Location */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Location</label>
          <Input
            placeholder="Enter location..."
            value={location || ""}
            onChange={(e) => {
              const value = e.target.value || undefined;
              setLocation(value);
              onFilterChange({
                ...filters,
                location: value,
              });
            }}
            className="text-sm"
          />
        </div>

        {/* Verified Sellers Only */}
        <div className="space-y-3">
          <button
            onClick={() => {
              const newValue = !verifiedOnly;
              setVerifiedOnly(newValue);
              onFilterChange({
                ...filters,
                verifiedSellersOnly: newValue || undefined,
              });
            }}
            className="flex items-center gap-3 w-full rounded-md border border-input px-3 py-2 hover:bg-accent transition-colors"
            aria-label="Filter by verified sellers only"
          >
            <div className={`flex h-5 w-5 items-center justify-center rounded border ${verifiedOnly ? 'bg-primary border-primary' : 'border-input'}`}>
              {verifiedOnly && <Check className="h-3 w-3 text-primary-foreground" />}
            </div>
            <span className="text-sm font-medium">Verified Sellers Only</span>
          </button>
        </div>

        {/* Availability */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Availability</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
                aria-label="Select availability"
              >
                <span className="truncate">
                  {availability === "in-stock"
                    ? "In Stock"
                    : availability === "out-of-stock"
                    ? "Out of Stock"
                    : "All Products"}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItem
                onSelect={() => {
                  setAvailability("all");
                  onFilterChange({
                    ...filters,
                    availability: undefined,
                  });
                }}
              >
                All Products
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setAvailability("in-stock");
                  onFilterChange({
                    ...filters,
                    availability: "in-stock",
                  });
                }}
              >
                In Stock
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setAvailability("out-of-stock");
                  onFilterChange({
                    ...filters,
                    availability: "out-of-stock",
                  });
                }}
              >
                Out of Stock
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
