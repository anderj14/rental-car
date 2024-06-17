import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'xng-breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, RouterModule],
  template: `
    <div class="breadcrumb">
      <xng-breadcrumb>
          <ng-container *xngBreadcrumbItem="let breadcrumb">
              {{breadcrumb | titlecase}}
          </ng-container>
      </xng-breadcrumb>
    </div>
  `,
  styles: `
    .breadcrumb {
      margin: 20px 0;
    }
  `
})
export class BreadcrumbComponent {

}
