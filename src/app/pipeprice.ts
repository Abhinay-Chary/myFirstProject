import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
   name:'price' ,
   standalone:true
})

export class pipeprice implements PipeTransform{
    transform(value: any, ...args: any[]) {
        return value+ '$$'
    }
}