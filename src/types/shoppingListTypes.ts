import { IngredientCategory } from "./recipeDbTypes";

export interface CategorizedShoppingListItem {
  category: IngredientCategory;
  quantity: number;
  unitShortForm: string;
  ingredientId: number;
  ingredientName: string;
}
