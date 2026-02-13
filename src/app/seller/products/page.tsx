"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useProductsStore } from "@/store/products-store";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Pencil, Trash2, Package } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SellerProductsPage() {
  const { user } = useAuthStore();
  const { products, deleteProduct } = useProductsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Filter products for current seller
  const sellerProducts = products.filter((p) => p.sellerId === user?.sellerId);

  // Apply search filter
  const filteredProducts = sellerProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your product listings"
        actions={
          <Button asChild>
            <Link href="/seller/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        }
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Products List */}
      {filteredProducts.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No products found</CardTitle>
            <CardDescription>
              {searchQuery
                ? "Try adjusting your search query"
                : "Get started by adding your first product"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/seller/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold">
                      {product.name}
                    </h3>
                    <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="font-medium">Price:</span>{" "}
                        <span className="text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Stock:</span>{" "}
                        <span
                          className={
                            (product.stock ?? product.stockQuantity ?? 0) < 10
                              ? "text-yellow-600"
                              : "text-green-600"
                          }
                        >
                          {product.stock ?? product.stockQuantity ?? 0} units
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Category:</span>{" "}
                        {product.categoryId}
                      </div>
                      <div>
                        <span className="font-medium">Rating:</span>{" "}
                        {(product.rating ?? 0).toFixed(1)} ({product.reviewCount ?? 0}{" "}
                        reviews)
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/seller/products/${product.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
