import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="content-letter">
          <h1>404</h1>
          <h2>Something went <strong>WRONG!</strong></h2>
          <button routerLink="/">Back To Home</button>
      </div>
      
      <div class="content-image">
          <img src="/assets/images/thinking.png" alt="thinking">
      </div>
    </div>  
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

}
