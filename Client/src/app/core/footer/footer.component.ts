import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
  	  <div class="container">
        <div class="row">
          <div class="footer-col">
            <h4>company</h4>
            <ul>
              <li><a routerLink="/about-us" target="_blank">about us</a></li>
              <li><a routerLink="/vehicles" target="_blank">our services</a></li>
              <li><a routerLink="/vehicles" target="_blank">privacy policy</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>get help</h4>
            <ul>
              <li><a href="#" target="_blank">FAQ</a></li>
              <li><a href="#" target="_blank">returns</a></li>
              <li><a href="#" target="_blank">order status</a></li>
              <li><a href="#" target="_blank">payment options</a></li>
            </ul>
          </div>
          
          <div class="footer-col">
            <h4>follow us</h4>
            <div class="social-links">
              <a href="https://www.facebook.com" target="_blank"><i class="bi bi-facebook"></i></a>
              <a href="https://twitter.com/" target="_blank"><i class="bi bi-twitter-x"></i></a>
              <a href="https://instagram.com/" target="_blank"><i class="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
  	  </div>
    </footer>

  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
