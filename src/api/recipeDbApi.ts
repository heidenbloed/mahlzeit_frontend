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
  baseURL: `http://192.168.178.56:8000/api`,
  timeout: 30000,
});

recipeDbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        "RecipeDB API Error:",
        "Data=",
        error.response.data,
        "Status=",
        error.response.status,
        "Headers=",
        error.response.headers
      );
    } else if (error.request) {
      console.error("RecipeDB API Error:", error.request);
    } else {
      console.error("RecipeDB API Error:", error.message);
    }
  }
);

export enum IngredientListOrdering {
  nameAscending = "name",
  nameDescending = "-name",
  updatedAtAscending = "updated_at",
  updatedAtDescending = "-updated_at",
}

export enum RecipeListOrdering {
  nameAscending = "name",
  nameDescending = "-name",
  prepTimeAscending = "preparation_time",
  prepTimeDescending = "-preparation_time",
  updatedAtAscending = "updated_at",
  updatedAtDescending = "-updated_at",
}

export async function getIngredientCategoryList(): Promise<
  IngredientCategory[]
> {
  const response = await recipeDbApi.get("/ingredient_categories/");
  return response.data;
}

export async function getRecipeLabelList(
  search?: string
): Promise<RecipeLabel[]> {
  const params = {
    search: search,
  };
  const response = await recipeDbApi.get("/labels/", { params: params });
  return response.data;
}

export async function getUnitList(): Promise<Unit[]> {
  const response = await recipeDbApi.get("/units/");
  return response.data;
}

export async function getIngredientList(
  ordering: IngredientListOrdering,
  search?: string
): Promise<IngredientShort[]> {
  const params = {
    ordering: ordering,
    search: search,
  };
  const response = await recipeDbApi.get("/ingredients/", { params: params });
  return response.data;
}

export async function getIngredientDetail(id: number): Promise<Ingredient> {
  const response = await recipeDbApi.get("/ingredients/" + id + "/");
  return response.data;
}

export async function createIngredient(
  ingredient: IngredientEdit
): Promise<IngredientEditResponse> {
  const response = await recipeDbApi.post("/ingredients/", ingredient);
  return response.data;
}

export async function updateIngredient(
  id: number,
  ingredient: Partial<IngredientEdit>
): Promise<IngredientEditResponse> {
  const response = await recipeDbApi.patch(
    "/ingredients/" + id + "/",
    ingredient
  );
  return response.data;
}

export async function deleteIngredient(id: number) {
  await recipeDbApi.delete("/ingredients/" + id + "/");
}

export async function getRecipeList(
  ordering: RecipeListOrdering,
  search?: string,
  labels?: RecipeLabel[]
): Promise<RecipeShort[]> {
  const params = {
    ordering: ordering,
    search: search,
    labels: labels?.map((label) => label.id).join(","),
  };
  const response = await recipeDbApi.get("/recipes/", { params: params });
  return response.data;
}

export async function getRecipeDetail(id: number): Promise<RecipeData> {
  const response = await recipeDbApi.get("/recipes/" + id + "/");
  return response.data;
}

export async function createRecipe(
  recipe: RecipeEdit
): Promise<RecipeEditResponse> {
  const response = await recipeDbApi.post("/recipes/", recipe);
  return response.data;
}

export async function updateRecipe(
  id: number,
  recipe: Partial<RecipeEdit>
): Promise<RecipeEditResponse> {
  const response = await recipeDbApi.patch("/recipes/" + id + "/", recipe);
  return response.data;
}

export async function deleteRecipe(id: number) {
  await recipeDbApi.delete("/recipes/" + id + "/");
}

export async function createRecipeImage(
  imageData: RecipeImageEdit
): Promise<RecipeImageEditResponse> {
  const formData = new FormData();
  formData.append(
    "image",
    imageData.image,
    `recipe_image_${imageData.recipe}.png`
  );
  formData.append("order", imageData.order.toString());
  formData.append("recipe", imageData.recipe.toString());
  const response = await recipeDbApi.post("/recipe_image/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function updateRecipeImage(
  id: number,
  imageData: Partial<RecipeImageEdit>
): Promise<RecipeImageEditResponse> {
  const formData = new FormData();
  if (imageData.order !== undefined) {
    formData.append("order", imageData.order.toString());
  }
  if (imageData.recipe !== undefined) {
    formData.append("recipe", imageData.recipe.toString());
  }
  const response = await recipeDbApi.patch(
    "/recipe_image/" + id + "/",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
}

export async function deleteRecipeImage(id: number) {
  await recipeDbApi.delete("/recipe_image/" + id + "/");
}
