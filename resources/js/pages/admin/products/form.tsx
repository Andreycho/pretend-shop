"use client"

import type React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface ProductFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  data: {
    title: string
    price: number
    description: string
    category: string
    image: string
  }
  setData: (field: string, value: any) => void
  processing: boolean
  errors: Record<string, string>
}

export default function Form({ onSubmit, data, setData, processing, errors }: ProductFormProps) {
  const formFields = [
    {
      name: "title",
      label: "Product Title",
      type: "text",
      description: "Enter a descriptive name for your product",
    },
    {
      name: "price",
      label: "Price ($)",
      type: "number",
      description: "Set the retail price in USD",
    },
    {
      name: "category",
      label: "Category",
      type: "text",
      description: "Choose a category that best fits your product",
    },
    {
      name: "image",
      label: "Image URL",
      type: "text",
      description: "Provide a URL to the product image",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      description: "Describe your product in detail",
    },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={onSubmit}>
        <CardContent className="pt-6 space-y-4">
          {formFields.map((field) => (
            <div key={field.name} className="space-y-1">
              <div className="space-y-1">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    value={data[field.name as keyof typeof data] as string}
                    onChange={(e) => setData(field.name, e.target.value)}
                    placeholder={`Enter ${field.name}`}
                    className="resize-y min-h-[120px]"
                  />
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    value={data[field.name as keyof typeof data]}
                    onChange={(e) =>
                      setData(field.name, field.type === "number" ? Number.parseFloat(e.target.value) : e.target.value)
                    }
                    placeholder={`Enter ${field.name}`}
                  />
                )}

                <p className="text-sm text-muted-foreground">{field.description}</p>

                {errors[field.name] && <p className="text-sm font-medium text-destructive">{errors[field.name]}</p>}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
          <Button type="submit" disabled={processing} className="min-w-[120px]">
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Product"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
