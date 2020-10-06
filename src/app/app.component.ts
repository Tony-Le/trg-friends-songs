import { Component } from '@angular/core';
import { HostListener } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TheRunawayGuys and Friends Songs (BETA)';

  @HostListener('window:scroll', ['$event'])
  toggleScrollButtonVisibility() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  }

   topFunction() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
}
