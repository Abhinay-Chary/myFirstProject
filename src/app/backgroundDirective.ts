import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[bg]',
    standalone:true
})
export class backgroundDirective{
    constructor(private rend:Renderer2,private ele:ElementRef) {  
        console.log('abhi') 
    }

    @HostListener('mouseenter')
    onClick(){
       this.rend.setStyle(this.ele.nativeElement,'background','grey')

    }
    @HostListener('mouseleave')
    onMoun(){
        this.rend.setStyle(this.ele.nativeElement,'background','none')

    }
}