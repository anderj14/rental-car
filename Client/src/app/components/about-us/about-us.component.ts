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
            <h1>About Us</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, sunt a labore voluptas unde explicabo
                laudantium
                aliquam beatae velit cupiditate pariatur delectus molestiae recusandae! Repudiandae, aliquam! Magni nulla
                asperiores consequatur!
            </p>

        </header>
        <div class="container">
            <section class="about">
                <div class="about-image">
                    <img src="/assets/images/toyota-land-cruiser.png">
                </div>
                <div class="aboutContent">
                  <h2>Rental Cars</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam magni facere eaque nisi
                    dolores
                    id qui, fugit, impedit nulla cumque? Ea reiciendis nulla eaque temporibus sapiente? Sapiente,
                    maiores
                    nam!
                    </p>
                </div>
            </section>
        </div>
      </mat-card>
      
  `,
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
