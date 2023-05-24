import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuAdminService } from 'src/app/Service/menu-admin.service';
import { MenuAdmin } from 'src/app/interfaces/MenuAdmin';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css'],
})
export class NavbarAdminComponent implements OnInit {
  menu: MenuAdmin[] = [];

  constructor(private menuService: MenuAdminService, private router: Router) {}

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu() {
    this.menuService.getMenu().subscribe((data) => {
      this.menu = data;
    });
  }
  back() {
    this.router.navigateByUrl('/welcome');
  }
}
