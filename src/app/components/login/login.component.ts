import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  toggle(): void {
      const pInput = <HTMLInputElement>document.getElementById("password");
      pInput.type == "password"
        ? (pInput.type = "text")
        : (pInput.type = "password");
      const btn = <HTMLButtonElement>document.getElementById("btnToggle");

      btn.classList.toggle("active");

      btn.classList.contains("active")
        ? (btn.innerHTML = '<i class="bx bx-hide bx-xs"></i>')
        : (btn.innerHTML = '<i class="bx bx-show bx-xs"></i>')
  }
}
