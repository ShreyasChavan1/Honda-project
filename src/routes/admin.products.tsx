import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AvailabilityBadge } from "@/components/availability-badge";
import { ImageManager } from "@/components/image-manager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { productsQuery, type Product } from "@/lib/catalogue";
import { formatPrice } from "@/lib/showroom";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

type ProductCategory = "lubes" | "accessories";

const TABS: { value: ProductCategory; label: string }[] = [
  { value: "lubes", label: "Genuine Lubes & Chemicals" },
  { value: "accessories", label: "Accessories" },
];

type Draft = {
  id?: string;
  category: ProductCategory;
  name: string;
  short_description: string;
  description: string;
  price: string;
  images: string[];
  is_available: boolean;
  is_featured: boolean;
  sort_order: string;
};

const emptyDraft = (category: ProductCategory): Draft => ({
  category,
  name: "",
  short_description: "",
  description: "",
  price: "",
  images: [],
  is_available: true,
  is_featured: false,
  sort_order: "0",
});

const toDraft = (product: Product): Draft => ({
  id: product.id,
  category: product.category,
  name: product.name,
  short_description: product.short_description,
  description: product.description,
  price: product.price == null ? "" : String(product.price),
  images: [product.image_url, ...product.gallery].filter(Boolean),
  is_available: product.is_available,
  is_featured: product.is_featured,
  sort_order: String(product.sort_order),
});

function AdminProducts() {
  const [tab, setTab] = useState<ProductCategory>("lubes");
  const { data, isLoading, isError } = useQuery(productsQuery(tab));
  const [draft, setDraft] = useState<Draft | null>(null);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const save = useMutation({
    mutationFn: async (values: Draft) => {
      const payload = {
        category: values.category,
        name: values.name,
        short_description: values.short_description,
        description: values.description,
        price: values.price ? Number(values.price) : null,
        image_url: values.images[0] ?? "",
        gallery: values.images.slice(1),
        is_available: values.is_available,
        is_featured: values.is_featured,
        sort_order: Number(values.sort_order) || 0,
      };
      const query = values.id
        ? supabase.from("products").update(payload).eq("id", values.id).select("id")
        : supabase.from("products").insert(payload).select("id");
      const { error: saveError, data: saveData } = await query;
      if (saveError) throw new Error(saveError.message);
      if (values.id && (!saveData || saveData.length === 0)) {
        throw new Error("Nothing was saved — you may have lost admin access. Please refresh and sign in again.");
      }
    },
    onSuccess: () => {
      setDraft(null);
      setError(null);
      invalidate();
    },
    onError: (e: Error) => setError(e.message),
  });

  const toggleAvailability = useMutation({
    mutationFn: async (product: Product) => {
      const { error: e, data } = await supabase
        .from("products")
        .update({ is_available: !product.is_available })
        .eq("id", product.id)
        .select("id");
      if (e) throw new Error(e.message);
      if (!data || data.length === 0) {
        throw new Error("Nothing was updated — you may have lost admin access. Please refresh and sign in again.");
      }
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error: e } = await supabase.from("products").delete().eq("id", id);
      if (e) throw new Error(e.message);
    },
    onSuccess: invalidate,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage Genuine Lubes &amp; Chemicals and Accessories shown under Products on the website.
          </p>
        </div>
        <Button
          onClick={() => {
            setDraft(emptyDraft(tab));
            setError(null);
          }}
        >
          <Plus /> Add {TABS.find((t) => t.value === tab)?.label}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product category">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={tab === t.value}
            onClick={() => {
              setTab(t.value);
              setDraft(null);
              setError(null);
            }}
            className={
              "min-h-10 rounded-full border px-4 font-display text-sm font-semibold uppercase tracking-wide transition-colors " +
              (tab === t.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary hover:text-primary")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {isLoading && <Skeleton className="h-64 w-full rounded-xl" />}
      {isError && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-muted-foreground">
          Could not load products. Please refresh the page.
        </p>
      )}

      {draft && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            save.mutate(draft);
          }}
          className="space-y-4 rounded-xl border border-primary/40 bg-card p-6"
        >
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
            {draft.id ? `Edit ${draft.name}` : `Add to ${TABS.find((t) => t.value === draft.category)?.label}`}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="p-name">Product name</Label>
              <Input
                id="p-name"
                required
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-category">Category</Label>
              <select
                id="p-category"
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value as ProductCategory })}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {TABS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-price">Price (₹, optional)</Label>
              <Input
                id="p-price"
                inputMode="numeric"
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-sort">Display order</Label>
              <Input
                id="p-sort"
                inputMode="numeric"
                value={draft.sort_order}
                onChange={(e) => setDraft({ ...draft, sort_order: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <ImageManager
                label="Product images"
                hint="The first image is used on the product card."
                images={draft.images}
                folder="products"
                onChange={(images) => setDraft({ ...draft, images })}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="p-short">Short description (shown on card)</Label>
              <Input
                id="p-short"
                value={draft.short_description}
                onChange={(e) => setDraft({ ...draft, short_description: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="p-description">Full description</Label>
              <Textarea
                id="p-description"
                rows={3}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </div>
            <div className="flex items-end gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="p-available"
                  checked={draft.is_available}
                  onCheckedChange={(checked) => setDraft({ ...draft, is_available: checked })}
                />
                <Label htmlFor="p-available">In stock</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="p-featured"
                  checked={draft.is_featured}
                  onCheckedChange={(checked) => setDraft({ ...draft, is_featured: checked })}
                />
                <Label htmlFor="p-featured">Featured</Label>
              </div>
            </div>
          </div>

          {error && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

          <div className="flex gap-3">
            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? "Saving…" : "Save product"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDraft(null);
                setError(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <ul className="space-y-3">
        {(data ?? []).map((product) => (
          <li
            key={product.id}
            className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4"
          >
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                loading="lazy"
                className="h-20 w-28 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-secondary text-xs text-muted-foreground">
                No image
              </div>
            )}
            <div className="min-w-40 flex-1">
              <p className="font-display text-xl font-bold uppercase tracking-wide">{product.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatPrice(product.price)}
                {product.is_featured ? " · Featured" : ""}
              </p>
              <div className="mt-2">
                <AvailabilityBadge available={product.is_available} />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 pr-2">
                <Switch
                  id={`p-avail-${product.id}`}
                  checked={product.is_available}
                  onCheckedChange={() => toggleAvailability.mutate(product)}
                />
                <Label htmlFor={`p-avail-${product.id}`} className="text-xs">
                  In stock
                </Label>
              </div>
              <Button size="sm" variant="outline" onClick={() => setDraft(toDraft(product))}>
                <Pencil /> Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (window.confirm(`Delete ${product.name}? This cannot be undone.`)) {
                    remove.mutate(product.id);
                  }
                }}
              >
                <Trash2 /> Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {!isLoading && (data ?? []).length === 0 && (
        <p className="rounded-xl border border-border bg-card p-8 text-sm text-muted-foreground">
          No products yet in this category. Use “Add” to list your first item.
        </p>
      )}
    </div>
  );
}
