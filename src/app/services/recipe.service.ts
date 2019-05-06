import { Injectable,EventEmitter} from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
// recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  recipes:Recipe[] = [
    new Recipe('A test recipe','this is a simple test','https://images.immediate.co.uk/volatile/sites/2/2016/10/creamy-lentils-with-spinach-and-thyme.jpg?quality=45&crop=0px,1761px,3594px,1527px&resize=960,413', [new Ingredient('Meat',1), new Ingredient('vegetable',5)]),
    new Recipe('A test recipe 2','this is a simple test 2','https://hips.hearstapps.com/del.h-cdn.co/assets/18/11/2048x1024/landscape-1520957481-grilled-salmon-horizontal.jpg?resize=1200:*',[new Ingredient('Meat',2), new Ingredient('vegetable',2)]),
    new Recipe('A test recipe 3','this is a simple test 3','https://hips.hearstapps.com/del.h-cdn.co/assets/18/06/1600x800/landscape-1517928338-delish-mongolian-ramen-and-meatballs-still001.jpg?resize=640:*',[new Ingredient('Meat',3), new Ingredient('vegetable',4)]),
  ];
  constructor(private slService:ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredientsto(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
