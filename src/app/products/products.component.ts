import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

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
}


