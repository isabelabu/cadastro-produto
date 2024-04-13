import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  formGroupProduct: FormGroup;

  isEditing: boolean = false;

  enviado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService
  ) {
    this.formGroupProduct = formBuilder.group({
      id: [''],
      nome: ['', [Validators.minLength(3), Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      preco: ['', [Validators.required]],
      qtd: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadProducts();
  }

  save() {
    this.enviado = true;
    if (this.formGroupProduct.valid) {
      if (this.isEditing) {
        this.service.update(this.formGroupProduct.value).subscribe({
          next: () => {
            this.loadProducts();
            this.isEditing = false;
            this.enviado = false;
          },
        });
      } else {
        this.service.save(this.formGroupProduct.value).subscribe({
          next: (data) => {
            this.products.push(data);
            this.enviado = false;
          }
        });
      }
      this.formGroupProduct.reset();
    }
  }

  loadProducts() {
    this.service.getProducts().subscribe({
      next: (data) => (this.products = data),
    });
  }

  delete(product: Product) {
    this.service.delete(product).subscribe({
      next: () => this.loadProducts(),
    });
  }

  edit(product: Product) {
    this.formGroupProduct.setValue(product);
    this.isEditing = true;
  }

  get nome(): any{
    return this.formGroupProduct.get("nome");
  }

  get descricao(): any{
    return this.formGroupProduct.get("descricao");
  }

  get preco(): any{
    return this.formGroupProduct.get("preco");
  }

  get qtd(): any{
    return this.formGroupProduct.get("qtd");
  }
}
