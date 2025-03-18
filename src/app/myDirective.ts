import { Directive, HostListener } from "@angular/core";

@Directive({
    selector:'[mydirective]'
})
export class mydirective{
constructor(){}
@HostListener('mouseenter')
abhi(){
    console.log('mouseenter')
}
}