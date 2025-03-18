import { Directive, HostListener } from "@angular/core";

@Directive({
    selector:'[bg3]',
    standalone:true
})
export class bg3{
    constructor(){  }
    @HostListener('document:click')
    ons(event:Event){
        console.log('click');
    event.stopPropagation()

    }
}