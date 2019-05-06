import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // IngredientsChanged = new EventEmitter<Ingredient[]>();
  IngredientsChanged = new Subject<Ingredient[]>();
  stratedEditing = new Subject<number>();
  private ingredients: Ingredient[]=[
    new Ingredient('Aplles', 5),
    new Ingredient('Orange', 10)
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredients(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    // this.IngredientsChanged.emit(this.ingredients.slice());
    this.IngredientsChanged.next(this.ingredients.slice());
  }
  addIngredientsto(ingredients:Ingredient[]){
    // for(let ingredient of ingredients){
    //   this.addIngredients(ingredient);
    // }
    this.ingredients.push(...ingredients);
    // this.IngredientsChanged.emit(this.ingredients.slice());
    this.IngredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number, newIngredient:Ingredient){
    this.ingredients[index]=newIngredient;
    this.IngredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index, 1);
    this.IngredientsChanged.next(this.ingredients.slice());
  }
}
