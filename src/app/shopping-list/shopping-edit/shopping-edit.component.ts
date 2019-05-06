import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef:ElementRef;
  // @ViewChild('amountInput') amountInputRef:ElementRef;
  // @Output() ingredientAdded = new EventEmitter<{name:string, amount:number}>();
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode = false;
  editItemIndex:number;
  editedItem: Ingredient;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.stratedEditing.subscribe(
      (index:number) =>{
        this.editItemIndex=index;
        this.editMode = true;
        this.editedItem=this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onSubmit(form: NgForm){
    // const ingName= this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex, newIngredient);
    }else{
      this.slService.addIngredients(newIngredient);
    }
    this.editMode = false;
    form.reset();
    // this.ingredientAdded.emit(newIngredient);
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
