import { Component } from '@angular/core';
import { product } from '../products';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products : product[] = [];

  formGroupProduct : FormGroup

  constructor(private formBuilder : FormBuilder){
    this.formGroupProduct = formBuilder.group({
      id : [''],
      nome : [''],
      descricao : [''],
      preco : [''],
      qtd : [''],
    })
  }

  save(){
    this.products.push(this.formGroupProduct.value);
  }
}


