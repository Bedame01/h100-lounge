"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, RefreshCw } from "lucide-react"
import { updateSetting } from "@/app/actions/admin"
import { useToast } from "@/hooks/use-toast"

interface SettingsManagerProps {
  settings: Record<string, string>
}

export function SettingsManager({ settings: initialSettings }: SettingsManagerProps) {
  const [currency, setCurrency] = useState(initialSettings.currency || "NGN")
  const [exchangeRate, setExchangeRate] = useState(initialSettings.exchange_rate_usd_to_ngn || "1650")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setLoading(true)

    const currencyResult = await updateSetting("currency", currency)
    const rateResult = await updateSetting("exchange_rate_usd_to_ngn", exchangeRate)

    if (currencyResult.error || rateResult.error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Settings updated successfully",
      })
    }

    setLoading(false)
  }

  return (
    <div className="grid gap-6 max-w-3xl">
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <CardTitle>Currency Management</CardTitle>
          </div>
          <CardDescription>Configure the default currency for menu prices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                <SelectItem value="USD">US Dollar ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="exchange-rate">Exchange Rate (USD to NGN)</Label>
            <Input
              id="exchange-rate"
              type="number"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              placeholder="1650"
            />
            <p className="text-sm text-muted-foreground">Current rate: $1 = ₦{exchangeRate}</p>
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full py-5.5">
            {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
