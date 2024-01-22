import { type Metadata } from "next"
import { auth } from "@clerk/nextjs"

import type { Database } from "@/types/supabase"
import { getRecipesByUserId } from "@/lib/supabase-queries"
import { RecipeCardPreview } from "@/components/recipe-card-preview"

type Recipe = Database["public"]["Tables"]["recipes"]["Row"]

export const metadata: Metadata = {
  metadataBase: new URL("https://chef-genie.app"),
  title: "My Recipes",
  description: "Manage your recipes history.",
}

export default async function RecipePage() {
  const { getToken, userId } = auth()
  const supabaseAccessToken = await getToken({ template: "chef-genie" })
  const recipes = await getRecipesByUserId(userId, supabaseAccessToken)

  return (
    <div className="m-4">
      <div className="grid gap-4 md:grid-cols-2">
        {recipes?.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCardPreview recipe={recipe as Recipe} />
          </div>
        ))}
      </div>
    </div>
  )
}
