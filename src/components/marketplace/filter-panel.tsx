"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { FilterOptions } from "@/lib/types";
import { getBrands, getModelsByBrand, getPriceRangeByCurrency, getCurrencies } from "@/data/products";
import { formatCurrency } from "@/utils/constants";

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

export function FilterPanel({
  filters,
  onFilterChange,
  className,
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

  // Update price range when currency changes or filters change
  useEffect(() => {
    const newMin = filters.priceMin ?? priceConfig.min;
    const newMax = filters.priceMax ?? priceConfig.max;
    setPriceRange([newMin, newMax]);
    setSelectedCurrency(filters.currency);
    setSelectedBrand(filters.brand);
    setSelectedModel(filters.model);
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
    onFilterChange({});
  };

  const hasActiveFilters =
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    filters.currency ||
    filters.brand ||
    filters.model;

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
      </CardContent>
    </Card>
  );
}
