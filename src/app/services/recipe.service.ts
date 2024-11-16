import { Injectable } from '@angular/core';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];
  private idCounter = 1;

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(id: number): Recipe | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): void {
    this.recipes.unshift({ ...recipe, id: this.idCounter++ });
  }

  updateRecipe(updatedRecipe: Recipe): void {
    const index = this.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
    if (index > -1) {
      this.recipes[index] = updatedRecipe;
    }
  }

  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
  }
}
