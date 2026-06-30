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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toggleMenuItemAvailability, deleteMenuItem, deleteCategory } from "@/app/actions/admin"
import { MenuItemDialog } from "@/components/menu-item-dialog"
import { CategoryDialog } from "@/components/category-dialog"
import { Trash2, Plus, UtensilsCrossed } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { MenuItem, MenuCategoryMeta } from "@/lib/menu-service"

interface MenuManagerProps {
  categories: MenuCategoryMeta[]
  regularItems: MenuItem[]
  vipItems: MenuItem[]
  foodCategories: MenuCategoryMeta[]
  foodItems: MenuItem[]
}

export function MenuManager({
  categories: initialCategories,
  regularItems: initialRegularItems,
  vipItems: initialVipItems,
  foodCategories: initialFoodCategories,
  foodItems: initialFoodItems,
}: MenuManagerProps) {
  const [activeTab, setActiveTab] = useState<"regular" | "vip" | "food">("regular")
  const [categories, setCategories] = useState(initialCategories)
  const [regularItems, setRegularItems] = useState(initialRegularItems)
  const [vipItems, setVipItems] = useState(initialVipItems)
  const [foodCategories, setFoodCategories] = useState(initialFoodCategories)
  const [foodItems, setFoodItems] = useState(initialFoodItems)
  const { toast } = useToast()

  const categoryTable = activeTab === "food" ? "food_categories" : "categories"
  const itemTable = activeTab === "food" ? "menu_items_food" : activeTab === "vip" ? "menu_items_vip" : "menu_items"

  const handleToggleAvailability = async (id: string, currentStatus: boolean, table: string) => {
    const result = await toggleMenuItemAvailability(id, !currentStatus, table as any)

    if (result.success) {
      const updater = (items: MenuItem[]) => items.map((item) => (item.id === id ? { ...item, is_available: !currentStatus } : item))

      if (table === "menu_items") setRegularItems(updater)
      if (table === "menu_items_vip") setVipItems(updater)
      if (table === "menu_items_food") setFoodItems(updater)

      toast({
        title: "Success",
        description: "Menu item availability updated",
      })
    }
  }

  const handleDeleteMenuItem = async (id: string, table: string) => {
    const result = await deleteMenuItem(id, table as any)

    if (result.success) {
      if (table === "menu_items") setRegularItems((prev) => prev.filter((item) => item.id !== id))
      if (table === "menu_items_vip") setVipItems((prev) => prev.filter((item) => item.id !== id))
      if (table === "menu_items_food") setFoodItems((prev) => prev.filter((item) => item.id !== id))

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

  const handleDeleteCategory = async (id: string, table: string) => {
    const result = await deleteCategory(id, table as any)

    if (result.success) {
      if (table === "categories") {
        setCategories((prev) => prev.filter((cat) => cat.id !== id))
        setRegularItems((prev) => prev.filter((item) => item.category_id !== id))
        setVipItems((prev) => prev.filter((item) => item.category_id !== id))
      }

      if (table === "food_categories") {
        setFoodCategories((prev) => prev.filter((cat) => cat.id !== id))
        setFoodItems((prev) => prev.filter((item) => item.category_id !== id))
      }

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

  const renderCategoryCards = (
    renderCategories: MenuCategoryMeta[],
    renderItems: MenuItem[],
    renderCategoryTable: string,
    renderItemTable: string,
  ) => {
    if (renderCategories.length === 0) {
      return (
        <Card className="text-center py-12">
          <CardContent>
            <Plus className="mx-auto h-16 w-16 mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-lg font-semibold mb-2">No categories yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Create a category to organize your menu items.</p>
            <CategoryDialog mode="create" table={renderCategoryTable as any} />
          </CardContent>
        </Card>
      )
    }

    return renderCategories.map((category) => {
      const categoryItems = renderItems.filter((item) => item.category_id === category.id)

      return (
        <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 pt-0">
          <CardHeader className="bg-linear-to-r from-primary/5 to-accent/5 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1 min-w-60">
                <CardTitle className="font-serif font-medium text-xl mb-1">{category.name}</CardTitle>
                {category.description && <p className="text-sm text-muted-foreground">{category.description}</p>}
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <CategoryDialog mode="edit" category={category} table={renderCategoryTable as any} />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/10">
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
                        onClick={() => handleDeleteCategory(category.id, renderCategoryTable)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <MenuItemDialog mode="create" categories={renderCategories} table={renderItemTable as any} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2 max-sm:px-2.5">
            {categoryItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <UtensilsCrossed className="mx-auto h-12 w-12 mb-2 opacity-20" />
                <p className="text-sm">No items in this category</p>
                <MenuItemDialog mode="create" categories={renderCategories} table={renderItemTable as any} />
              </div>
            ) : (
              <div className="space-y-4">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-start gap-3 flex-wrap">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{item.name}</h4>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          )}
                          <p className="text-primary font-semibold mt-2">₦{item.price.toLocaleString()}</p>
                        </div>
                        <Badge variant={item.is_available ? "default" : "secondary"} className="text-xs bg-green-600 ">
                          {item.is_available ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`toggle-${item.id}`} className="text-sm">
                          Available
                        </Label>
                        <Switch
                          id={`toggle-${item.id}`}
                          checked={item.is_available}
                          onCheckedChange={() => handleToggleAvailability(item.id, item.is_available, renderItemTable)}
                        />
                      </div>
                      <MenuItemDialog mode="edit" categories={renderCategories} menuItem={item} table={renderItemTable as any} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive ml-0 pl-0 hover:text-destructive">
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
                              onClick={() => handleDeleteMenuItem(item.id, renderItemTable)}
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
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* <div>
          <h2 className="text-2xl font-serif font-medium">Menu Management</h2>
          <p className="text-sm text-muted-foreground">Manage regular, VIP, and food menu entries in one place.</p>
        </div> */}
        <CategoryDialog mode="create" table={categoryTable} />
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "regular" | "vip" | "food")}>
        <TabsList>
          <TabsTrigger value="regular">Regular Menu</TabsTrigger>
          <TabsTrigger value="vip">VIP Menu</TabsTrigger>
          <TabsTrigger value="food">Food Menu</TabsTrigger>
        </TabsList>

        <TabsContent value="regular">
          {renderCategoryCards(categories, regularItems, "categories", "menu_items")}
        </TabsContent>
        <TabsContent value="vip">
          {renderCategoryCards(categories, vipItems, "categories", "menu_items_vip")}
        </TabsContent>
        <TabsContent value="food">
          {renderCategoryCards(foodCategories, foodItems, "food_categories", "menu_items_food")}
        </TabsContent>
      </Tabs>
    </div>
  )
}
