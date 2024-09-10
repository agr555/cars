//import { Component } from '@angular/core';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AppService } from "./app.service";
import { getXHRResponse } from "rxjs/internal/ajax/getXHRResponse";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    service: ['car'],
    product: ['', Validators.required]
  })
  carsData: any[] = [];
  burgerMenuOpen = false;
  // serverStaticPath = environment.serverStaticPath;

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getData()
    .subscribe(
      (carsData:any) => {
        this.carsData = carsData.cars
        console.log(this.carsData)
        return this.carsData
    })
        // .subscribe((response: any) => {
        //   this.carsData = response.cars//.$values;
        //   console.log(response.cars)
        //   console.log(this.carsData)
        //   return response.cars
        // }, error => {
        //   console.log(error);
        // });
  }
  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({ behavior: "smooth" });
    if (car) {
      this.priceForm.patchValue({ product: car.name, service: 'cars' });
    }
  }
  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = { transform: 'translate3d(' + ((e.clientX * 0.5) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)' };
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = { backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px' };
  }


  onSubmit() {
    if (this.priceForm.valid) {

      this.appService.sendQuery(this.priceForm.value)
        .subscribe(
          {
            next: (response: any) => {
              alert(response.message);
            },
            error: (response) => {
              alert(response.error.message);
            }
          }
        );
      this.priceForm.reset({service: 'cars_any'});
    }
  }

  /*small-menu*/
  public scrollTo(target: HTMLElement): void {
    target.scrollIntoView({ behavior: "smooth" });
    this.burgerMenuOpen = false;

  }
  onScrollToAnchor(how: string) {
    // this.scroller.scrollToAnchor(how);
    this.burgerMenuOpen = false;
  }

  burgerMenuClose() {
    this.burgerMenuOpen = false;
  }
  toggleBurgerMenuOpen() {
    this.burgerMenuOpen = !this.burgerMenuOpen;
    console.log('1')
  }
}