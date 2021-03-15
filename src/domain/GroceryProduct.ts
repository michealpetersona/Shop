export default interface GroceryProduct {
  id: number;
  title: string;
  price: number;
  likes: number;
  badges: string[];
  important_badges: string[];
  nutrition_widget: Widget;
  serving_size: string;
  number_of_servings: number;
  spoomacular_score: number;
  breadcrumbs: string[];
  generated_text: Widget;
  ingredientCount: number;
  images: GroceryImage[];
  aisle: string;
}

interface GroceryImage {
  type: string;
  format: URL;
}

interface Widget {
  type: string;
  format: string;
}