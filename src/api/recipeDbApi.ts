import axios from "axios";
import {
  PaginationResult,
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
  PushSubscriptionInfo,
  PushSubscriptionInfoFull,
} from "../types/recipeDbTypes";

const recipeDbApi = axios.create({
  baseURL: import.meta.env.VITE_RECIPE_DB_API_URL,
  timeout: 30000,
});

export function setErrorInterceptor(interceptor: (err: any) => any) {
  recipeDbApi.interceptors.response.use(
    (res) => res,
    (err) => interceptor(err)
  );
}

export function setAuthToken(token: string) {
  recipeDbApi.defaults.headers.common["Authorization"] = `Token ${token}`;
}

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

interface TokenInfo {
  expiry: string;
  token: string;
}

export async function loginUser(
  username: string,
  password: string
): Promise<TokenInfo> {
  const response = await recipeDbApi.post("/auth/login/", null, {
    auth: { username, password },
  });
  return response.data;
}

export async function logoutUser(): Promise<void> {
  await recipeDbApi.post("/auth/logout/");
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
  search?: string,
  limit?: number,
  offset?: number
): Promise<PaginationResult<IngredientShort[]>> {
  const params = {
    ordering: ordering,
    search: search,
    limit: limit,
    offset: offset,
  };
  const response = await recipeDbApi.get("/ingredients/", { params: params });
  return response.data;
}

export async function getIngredientDetail(id: number): Promise<Ingredient> {
  const response = await recipeDbApi.get(`/ingredients/${id}/`);
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
  const response = await recipeDbApi.patch(`/ingredients/${id}/`, ingredient);
  return response.data;
}

export async function deleteIngredient(id: number) {
  await recipeDbApi.delete(`/ingredients/${id}/`);
}

export async function getRecipeList(
  ordering: RecipeListOrdering,
  search?: string,
  labels?: RecipeLabel[],
  limit?: number,
  offset?: number
): Promise<PaginationResult<RecipeShort[]>> {
  const params = {
    ordering: ordering,
    search: search,
    labels: labels?.map((label) => label.id).join(","),
    limit: limit,
    offset: offset,
  };
  const response = await recipeDbApi.get("/recipes/", { params: params });
  return response.data;
}

export async function getRecipeDetail(id: number): Promise<RecipeData> {
  const response = await recipeDbApi.get(`/recipes/${id}/`);
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
  const response = await recipeDbApi.patch(`/recipes/${id}/`, recipe);
  return response.data;
}

export async function deleteRecipe(id: number) {
  await recipeDbApi.delete(`/recipes/${id}/`);
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
  const response = await recipeDbApi.patch(`/recipe_image/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function deleteRecipeImage(id: number) {
  await recipeDbApi.delete(`/recipe_image/${id}/`);
}

export async function createPushSubscription(
  pushSubscriptionInfo: PushSubscriptionInfoFull
): Promise<PushSubscriptionInfoFull> {
  const response = await recipeDbApi.post(
    "/push_subscriptions/",
    pushSubscriptionInfo
  );
  return response.data;
}

export async function updatePushSubscription(
  endpoint: string,
  pushSubscriptionInfo: Partial<PushSubscriptionInfo>
): Promise<PushSubscriptionInfoFull> {
  const doubleEncodedEndpoint = encodeURIComponent(
    encodeURIComponent(endpoint)
  );
  const response = await recipeDbApi.patch(
    `/push_subscriptions/${doubleEncodedEndpoint}/`,
    pushSubscriptionInfo
  );
  return response.data;
}

export async function deletePushSubscription(endpoint: string) {
  const doubleEncodedEndpoint = encodeURIComponent(
    encodeURIComponent(endpoint)
  );
  await recipeDbApi.delete(`/push_subscription/${doubleEncodedEndpoint}/`);
}
