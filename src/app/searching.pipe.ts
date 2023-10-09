import { Pipe, PipeTransform } from '@angular/core';
import { product } from './products';

@Pipe({
  name: 'searching'
})
export class SearchingPipe implements PipeTransform {

  transform(products: product[], id: string): product[] {
    let newProducts: product[] = []
    for (let i = 0; i < products.length; i++) {
      if (products[i].category._id == id) {
        newProducts.push(products[i])
      }
    }
    return newProducts
  }

}
