import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Recipe, RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipe: Recipe = { id: 0, title: '', description: '', ingredients: [], instructions: '' };
  ingredientsString = '';
  isEditMode = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existingRecipe = this.recipeService.getRecipe(+id);
      if (existingRecipe) {
        this.recipe = { ...existingRecipe };
        this.ingredientsString = this.recipe.ingredients.join(', ');
        this.isEditMode = true;
      }
    }
  }

  updateIngredients(value: string): void {
    this.recipe.ingredients = value.split(',').map(ingredient => ingredient.trim());
  }

  saveRecipe(): void {
    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.recipe);
    } else {
      this.recipeService.addRecipe(this.recipe);
    }
    this.router.navigate(['/recipes']);
  }
}
