import axios from "axios";
import {
  IngredientCategory,
  RecipeLabel,
  Unit,
  IngredientShort,
  Ingredient,
  IngredientEdit,
  IngredientEditResponse,
  RecipeShort,
  RecipeData,
  RecipeEdit,
  RecipeEditResponse,
  RecipeImageEdit,
  RecipeImageEditResponse,
} from "../types/recipeDbTypes";

const recipeDbApi = axios.create({
  baseURL: `http://192.168.178.53:8000/api`,
  timeout: 30000,
});

recipeDbApi.interceptors.response.use((response) => response, (error) => {
  console.error("RecipeDbApi error: " + error);
});

enum IngredientListOrdering {
  nameAscending = "name",
  nameDescending = "-name",
  updatedAtAscending = "updated_at",
  updatedAtDescending = "-updated_at",
}

enum RecipeListOrdering {
  nameAscending = "name",
  nameDescending = "-name",
  prepTimeAscending = "preparation_time",
  prepTimeDescending = "-preparation_time",
  updatedAtAscending = "updated_at",
  updatedAtDescending = "-updated_at",
}

async function getIngredientCategoryList(): Promise<IngredientCategory[]> {
  const response = await recipeDbApi.get("/ingredient_categories/");
  return response.data;
}

async function getRecipeLabelList(search?: string): Promise<RecipeLabel[]> {
  const params = {
    search: search,
  };
  const response = await recipeDbApi.get("/labels/", {params: params});
  return response.data;
}

async function getUnitList(): Promise<Unit[]> {
  const response = await recipeDbApi.get("/units/");
  return response.data;
}

async function getIngredientList(ordering: IngredientListOrdering, search?: string): Promise<IngredientShort[]>{
  const params = {
    ordering: ordering,
    search: search,
  };
  const response = await recipeDbApi.get("/ingredients/", {params: params});
  return response.data;
}

async function getIngredientDetail(id: number): Promise<Ingredient> {
  const response = await recipeDbApi.get("/ingredients/" + id + "/");
  return response.data;
}

async function createIngredient(ingredient: IngredientEdit): Promise<IngredientEditResponse> {
  const response = await recipeDbApi.post("/ingredients/", ingredient);
  return response.data;
}

async function updateIngredient(id: number, ingredient: Partial<IngredientEdit>): Promise<IngredientEditResponse> {
  const response = await recipeDbApi.patch("/ingredients/" + id + "/", ingredient);
  return response.data;
}

async function deleteIngredient(id: number) {
  await recipeDbApi.delete("/ingredients/" + id + "/");
}

async function getRecipeList(ordering: RecipeListOrdering, search?: string, labels?: RecipeLabel[]): Promise<RecipeShort[]> {
  const params = {
    ordering: ordering,
    search: search,
    labels: labels?.map(label => label.id).join(","),
  };
  const response = await recipeDbApi.get("/recipes/", {params: params});
  return response.data;
}

async function getRecipeDetail(id: number): Promise<RecipeData> {
  const response = await recipeDbApi.get("/recipes/" + id + "/");
  return response.data;
}

async function createRecipe(recipe: RecipeEdit): Promise<RecipeEditResponse> {
  const response = await recipeDbApi.post("/recipes/", recipe);
  return response.data;
}

async function updateRecipe(id: number, recipe: Partial<RecipeEdit>): Promise<RecipeEditResponse> {
  const response = await recipeDbApi.patch("/recipes/" + id + "/", recipe);
  return response.data;
}

async function deleteRecipe(id: number) {
  await recipeDbApi.delete("/recipes/" + id + "/");
}

async function createRecipeImage(imageData: RecipeImageEdit): Promise<RecipeImageEditResponse> {
  const formData = new FormData();
  formData.append('image', imageData.image, `recipe_image_${imageData.recipe}.png`);
  formData.append('order', imageData.order.toString());
  formData.append('recipe', imageData.recipe.toString());
  const response = await recipeDbApi.post("/recipe_image/", formData, {headers: {'Content-Type': 'multipart/form-data'}});
  return response.data;
}

async function updateRecipeImage(id: number, imageData: Partial<RecipeImageEdit>): Promise<RecipeImageEditResponse> {
  const formData = new FormData();
  if (imageData.order) {
    formData.append('order', imageData.order.toString());
  }
  if (imageData.recipe) {
    formData.append('recipe', imageData.recipe.toString());
  }
  const response = await recipeDbApi.patch("/recipe_image/" + id + "/", formData, {headers: {'Content-Type': 'multipart/form-data'}});
  return response.data;
}

async function deleteRecipeImage(id: number) {
  await recipeDbApi.delete("/recipe_image/" + id + "/");
}

export {
  getIngredientCategoryList,
  getRecipeLabelList,
  getUnitList,
  getIngredientList,
  getIngredientDetail,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getRecipeList,
  getRecipeDetail,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  createRecipeImage,
  updateRecipeImage,
  deleteRecipeImage,
  RecipeListOrdering,
  IngredientListOrdering,
}