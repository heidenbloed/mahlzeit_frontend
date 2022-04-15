interface Model {
  id: number;
}

interface UpdatedableModel extends Model {
  updated_at: number;
}

interface RecipeImageShort extends UpdatedableModel {
  image: string;
}

export interface RecipeImage extends RecipeImageShort {
  order: number;
}

export interface RecipeImageEdit {
  recipe: number;
  image: Blob;
  order: number;
}

export interface RecipeImageEditResponse extends RecipeImage {
  recipe: number;
}

export interface RecipeLabel extends Model {
  name: string;
  category: string;
}

export interface IngredientShort extends UpdatedableModel {
  name: string;
}

export interface Unit extends Model {
  short_form: string;
}

export interface IngredientCategory extends Model {
  name: string;
  location_index: number;
}

export interface UnitConversion extends UpdatedableModel {
  alternative_unit: Unit;
  alternative_conversion_factor: number;
  default_conversion_factor: number;
}

export interface Ingredient extends IngredientShort {
  default_unit: Unit;
  category: IngredientCategory;
  unit_conversions: UnitConversion[];
}

export interface UnitConversionEdit {
  alternative_unit: number;
  alternative_conversion_factor: number;
  default_conversion_factor: number;
}

export interface IngredientEdit {
  name: string;
  default_unit: number;
  category: number;
  unit_conversions: UnitConversionEdit[];
}

export interface IngredientEditResponse
  extends IngredientEdit,
    UpdatedableModel {}

export interface QuantifiedIngredient extends UpdatedableModel {
  ingredient: IngredientShort;
  quantity: number;
  unit: Unit;
}

export interface QuantifiedIngredientEdit {
  ingredient: number;
  quantity: number;
  unit: number;
}

export interface RecipeShort extends UpdatedableModel {
  name: string;
  preparation_time: number;
  first_image?: RecipeImageShort;
}

export interface RecipeData extends Omit<RecipeShort, "first_image"> {
  source: string;
  num_servings: number;
  labels: RecipeLabel[];
  quantified_ingredients: QuantifiedIngredient[];
  recipe_images: RecipeImage[];
}

export interface RecipeEdit {
  name: string;
  preparation_time: number;
  source: string;
  num_servings: number;
  labels: number[];
  quantified_ingredients: QuantifiedIngredientEdit[];
}

export interface RecipeEditResponse extends RecipeEdit, UpdatedableModel {}

export interface QuantifiedIngredientEditData {
  id?: number;
  ingredientId?: number;
  ingredientName: string;
  ingredientCategory: IngredientCategory;
  quantity: number;
  unit: Unit;
  defaultUnit: Unit | null;
  currentConversionFactor: number;
  defaultConversionFactor: number;
  setAsDefaultUnit: boolean;
}

export interface RecipeImageEditData {
  id?: number;
  image: string;
  order: number;
  data?: Blob;
}

export interface RecipeEditData {
  id?: number;
  name: string;
  preparation_time: number;
  source: string;
  num_servings: number;
  labels: RecipeLabel[];
  quantified_ingredients: QuantifiedIngredientEditData[];
  recipe_images: RecipeImageEditData[];
}
