import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroBusqueda'
})
export class FiltroBusquedaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' ) return value;
    console.log(arg);
    const resultteams: any []= [];
    
      value.forEach((element: any) => {
        element.title.indexOf(arg) > -1; {
          
          resultteams.push(element)
        }
      });
  
      return resultteams;
    }
}


 /*if(!value)
      return null;
      else if (!args) {
        return value;
      }
      console.log(campoBusqueda);
    return value.filter((singleItem: any) => 
      singleItem[campoBusqueda].toLowerCase().includes(args.toLocaleUpperCase())
      );       
*/