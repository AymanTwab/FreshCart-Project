import { Pipe, PipeTransform } from '@angular/core';
import { Products, product } from './products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: product[], searchTerm: string): product[] {
    let newProducts: product[] = []
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
        newProducts.push(products[i])
      }
    }
    return newProducts

    // return products.filter((product) => product.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase));
  }

}
