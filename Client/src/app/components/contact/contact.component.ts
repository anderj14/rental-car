import { Component } from '@angular/core';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
