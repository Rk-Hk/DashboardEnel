import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private titleHeader: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  $titleHeader: Observable<any> = this.titleHeader.asObservable();


  public setTitleHeader = (title: string) => {
    this.titleHeader.next(title);
  }

//   private sidenav: MatSidenav;


//   public setSidenav(sidenav: MatSidenav) {
//     this.sidenav = sidenav;
//   }

//   public open() {
//     this.setIsOpenSidebar(true)
//     return this.sidenav.open();
//   }


//   public close() {
//     this.setIsOpenSidebar(false);
//     return this.sidenav.close();
//   }

//   public toggle(): void {
//     this.sidenav.toggle();
//     this.setIsOpenSidebar(!this.isOpenSidebar.value)
//  }

//  public getisOpenSidebar = () => { return this.isOpenSidebar}
//  private setIsOpenSidebar = (value:boolean) => {this.isOpenSidebar.next(value)}
}
