"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Edit } from "lucide-react"
import { createMenuItem, updateMenuItem } from "@/app/actions/admin"
import { useToast } from "@/hooks/use-toast"
import { ImageUpload } from "@/components/image-upload"

interface Category {
  id: string
  name: string
}

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  category_id: string
  is_available: boolean
  image_url: string | null
  is_highlighted: boolean
  size_options: { size: string; price: number }[] | null
  badges: string[] | null
}

interface MenuItemDialogProps {
  categories: Category[]
  menuItem?: MenuItem
  mode: "create" | "edit"
}

export function MenuItemDialog({ categories, menuItem, mode }: MenuItemDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: menuItem?.name || "",
    description: menuItem?.description || "",
    price: menuItem?.price.toString() || "",
    category_id: menuItem?.category_id || categories[0]?.id || "",
    is_available: menuItem?.is_available ?? true,
    image_url: menuItem?.image_url || "",
    is_highlighted: menuItem?.is_highlighted ?? false,
    badges: menuItem?.badges?.join(", ") || "",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Parse badges from comma-separated string
    const badgesArray = formData.badges
      .split(",")
      .map((b) => b.trim().toUpperCase())
      .filter((b) => b.length > 0)

    const result =
      mode === "create"
        ? await createMenuItem({
            ...formData,
            price: Number.parseFloat(formData.price),
            badges: badgesArray,
            image_url: formData.image_url || null,
          })
        : await updateMenuItem(menuItem!.id, {
            ...formData,
            price: Number.parseFloat(formData.price),
            badges: badgesArray,
            image_url: formData.image_url || null,
          })

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Menu item ${mode === "create" ? "created" : "updated"} successfully`,
      })
      setOpen(false)
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={mode === "create" ? "default" : "sm"} variant={mode === "create" ? "default" : "outline"} className="text-xs font-semibold px-1">
          {mode === "create" ? (
            <>
              <Plus className="h-4 w-4" />
              Add Menu Item
            </>
          ) : (
            <Edit className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add New Menu Item" : "Edit Menu Item"}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Create a new item for your menu" : "Update the menu item details"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g., STEAK SANDWICH ON CIABATTA BREAD"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Describe your dish..."
            />
          </div>
          <div className="space-y-2">
            <Label>Image (Optional)</Label>
            <ImageUpload
              value={formData.image_url}
              onChange={(url) => setFormData({ ...formData, image_url: url })}
              onRemove={() => setFormData({ ...formData, image_url: "" })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="badges">Badges (Optional)</Label>
            <Input
              id="badges"
              value={formData.badges}
              onChange={(e) => setFormData({ ...formData, badges: e.target.value })}
              placeholder="e.g., CHEF RECOMMENDED, NEW, ORDER"
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple badges with commas. Examples: CHEF RECOMMENDED, NEW, ORDER
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_highlighted"
              checked={formData.is_highlighted}
              onCheckedChange={(checked) => setFormData({ ...formData, is_highlighted: checked as boolean })}
            />
            <Label htmlFor="is_highlighted" className="text-sm font-normal cursor-pointer">
              Show in Homepage Highlights
            </Label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : mode === "create" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
