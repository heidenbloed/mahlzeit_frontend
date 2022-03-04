import axios from 'axios';

const recipeDbApi = axios.create({
  baseURL: `http://0.0.0.0:8000/api`,
  timeout: 30000,
});

recipeDbApi.interceptors.response.use((response) => response, (error) => {
  console.error("RecipeDbApi error: " + error);
});

interface Model {
  id: number;
}

interface UpdatedableModel extends Model {
  updated_at: number;
}

interface RecipeImageShort extends UpdatedableModel {
  image: string;
}

interface RecipeImage extends RecipeImageShort {
  order: number;
}

interface RecipeLabel extends Model {
  name: string;
  category: string;
}

interface IngredientShort extends UpdatedableModel {
  name: string;
}

interface Unit extends Model {
  short_form: string;
}

interface QuantifiedIngredient extends UpdatedableModel {
  ingredient: IngredientShort;
  quantity: number;
  unit: Unit;
}

interface RecipeShort extends UpdatedableModel {
  name: string;
  preparation_time: number;
  first_image?: RecipeImageShort;
}

interface Recipe extends RecipeShort {
  source: string;
  num_servings: number;
  labels: RecipeLabel[];
  quantified_ingredients: QuantifiedIngredient[];
  recipe_images: RecipeImage[];
}

async function getRecipeList(): Promise<RecipeShort[]> {
  return (await recipeDbApi.get("recipes/")).data;
}

async function getRecipeDetail(id: number): Promise<Recipe> {
  return (await recipeDbApi.get("recipes/" + id + "/")).data;
}

export { getRecipeList, getRecipeDetail, RecipeShort, Recipe, RecipeImage }