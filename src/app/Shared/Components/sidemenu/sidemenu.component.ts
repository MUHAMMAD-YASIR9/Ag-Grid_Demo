import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSidenav)
  sideNav!: MatSidenav;
  constructor(private readonly observer: BreakpointObserver,
    private readonly dataService:DataService) {
  }
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width :800px)']).subscribe(
      (Response) => {
       // console.log("Matches")
        if (Response.matches) {
          this.sideNav.mode = 'over';
          this.sideNav.close();
        } else {
          this.sideNav.mode = 'side';
          this.sideNav.open();
        }
      }
    )
  }
  isDarMode: boolean = false;
  toggleMode(checkFlag: boolean) {
    if (checkFlag) {
      this.isDarMode = true;
    } else {
      this.isDarMode = false;
    }
    this.dataService.castToggleMode(this.isDarMode);
  }
  ngOnDestroy(): void {
  }
}