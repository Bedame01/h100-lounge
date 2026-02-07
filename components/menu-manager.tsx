"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toggleMenuItemAvailability, deleteMenuItem, deleteCategory } from "@/app/actions/admin"
import { MenuItemDialog } from "@/components/menu-item-dialog"
import { CategoryDialog } from "@/components/category-dialog"
import { Trash2, Plus, UtensilsCrossed } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  display_order: number
}

interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_available: boolean
  display_order: number
}

interface MenuManagerProps {
  categories: Category[]
  menuItems: MenuItem[]
}

export function MenuManager({ categories: initialCategories, menuItems: initialMenuItems }: MenuManagerProps) {
  const [menuItems, setMenuItems] = useState(initialMenuItems)
  const [categories, setCategories] = useState(initialCategories)
  const { toast } = useToast()

  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    const result = await toggleMenuItemAvailability(id, !currentStatus)

    if (result.success) {
      setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, is_available: !currentStatus } : item)))
      toast({
        title: "Success",
        description: "Menu item availability updated",
      })
    }
  }

  const handleDeleteMenuItem = async (id: string) => {
    const result = await deleteMenuItem(id)

    if (result.success) {
      setMenuItems((prev) => prev.filter((item) => item.id !== id))
      toast({
        title: "Success",
        description: "Menu item deleted successfully",
      })
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (id: string) => {
    const result = await deleteCategory(id)

    if (result.success) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id))
      setMenuItems((prev) => prev.filter((item) => item.category_id !== id))
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold">Categories</h2>
          <p className="text-sm text-muted-foreground">Manage your menu categories</p>
        </div>
        <CategoryDialog mode="create" />
      </div>

      {categories.map((category) => {
        const categoryItems = menuItems.filter((item) => item.category_id === category.id)

        return (
          <Card key={category.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="font-serif text-2xl mb-1">{category.name}</CardTitle>
                  {category.description && <p className="text-sm text-muted-foreground">{category.description}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <CategoryDialog mode="edit" category={category} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{category.name}"? This will also delete all menu items in
                          this category. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteCategory(category.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <MenuItemDialog mode="create" categories={categories} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {categoryItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <UtensilsCrossed className="mx-auto h-12 w-12 mb-2 opacity-20" />
                  <p className="text-sm">No items in this category</p>
                  <MenuItemDialog mode="create" categories={categories} />
                </div>
              ) : (
                <div className="space-y-4">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{item.name}</h4>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            )}
                            <p className="text-primary font-semibold mt-2">₦{item.price.toLocaleString()}</p>
                          </div>
                          <Badge variant={item.is_available ? "default" : "secondary"}>
                            {item.is_available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`toggle-${item.id}`} className="text-sm">
                            Available
                          </Label>
                          <Switch
                            id={`toggle-${item.id}`}
                            checked={item.is_available}
                            onCheckedChange={() => handleToggleAvailability(item.id, item.is_available)}
                          />
                        </div>
                        <MenuItemDialog mode="edit" categories={categories} menuItem={item} />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{item.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteMenuItem(item.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}

      {categories.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Plus className="mx-auto h-16 w-16 mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-lg font-semibold mb-2">No categories yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Get started by creating your first category</p>
            <CategoryDialog mode="create" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
