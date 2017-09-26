import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'In-N-Out Burger',
      'I prefer Shake Shack!',
      'https://upload.wikimedia.org/wikipedia/commons/f/ff/In-N-Out_Burger_cheeseburgers_and_fries.jpg',
      [
        new Ingredient('Meat', 2),
        new Ingredient('Fries', 20),
        new Ingredient('Buns', 1)
      ]),
    new Recipe('Churros',
      'Heaven on eart!',
      'https://cdn.pixabay.com/photo/2017/03/30/15/47/churros-2188871_1280.jpg',
      [
        new Ingredient('Flour', 2),
        new Ingredient('Sugar', 2),
        new Ingredient('Frying oil', 2)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateReceipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice()); 
  }
}
