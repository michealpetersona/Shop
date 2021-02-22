export interface GroceryAutocomplete {
  results: GrocerySuggestion[]
}

export interface GrocerySuggestion {
  title: string;
  id: number;
}