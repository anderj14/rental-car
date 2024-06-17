import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [MaterialModule],
  template: `
    <section>
      <mat-card>
        <header class="headerAboutUs">
          <h2>About Us</h2>
          <p>Elipson Rent Car is your trusted partner for all your car rental needs. With years of experience in the industry, we provide top-notch rental services that cater to both locals and tourists. Our mission is to offer reliable, affordable, and high-quality vehicles to ensure your journey is safe and comfortable.</p>
        </header>
        <div class="container">
          <section class="about">
            <div class="about-image">
              <img src="/assets/images/toyota-land-cruiser.png" alt="Toyota Land Cruiser">
            </div>
            <div class="aboutContent">
              <h2>Rental Cars</h2>
              <p>At Elipson Rent Car, we boast a diverse fleet of vehicles to suit every need. Whether you're looking for a compact car for city driving, an SUV for a family vacation, or a luxury vehicle for a special occasion, we have got you covered. Our vehicles are well-maintained and regularly serviced to ensure optimal performance and safety.</p>
              <p>Experience the freedom of the road with Elipson Rent Car. Your journey, our commitment.</p>
            </div>
          </section>
        </div>
      </mat-card>
    </section>
  `,
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
