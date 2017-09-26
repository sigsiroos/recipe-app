import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
       return this.http.put('https://recipeapp-2c0b8.firebaseio.com/recipes.json',
    this.recipeService.getRecipes());
    }

    getRecipes() {
        this.http.get('https://recipeapp-2c0b8.firebaseio.com/recipes.json')
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) { //Add en empty ingredients property if the retrieved Recipe is missing ingredients
                            recipe['ingredients'] = [];
                            console.log(recipe); //Display in console that our object has empty ingredient array
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}