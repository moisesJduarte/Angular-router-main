import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{

  products: Product[] = [];
  limit = 10;
  offset = 0;
  isLoading!: boolean;
  productId: string | null = null;

    constructor(  
       private productsService : ProductsService, 
       private route : ActivatedRoute
       
  ) {}

    ngOnInit(): void {
      this.isLoading = true;
      this.productsService.getAll(10, 0).subscribe(
        {
          next: (data) => {
              this.isLoading = false;
              this.products = data;
              this.offset += this.limit;
          },
          error: () => {
            this.isLoading = false;
          },
        })
        this.route.queryParamMap.subscribe(params => {
        this.productId = params.get('product');
          
        })
      }

    onLoadMore() {
        this.productsService.getAll(this.limit, this.offset)
        .subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
