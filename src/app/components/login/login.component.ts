import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from 'src/app/models/types';
import { LoginService } from 'src/app/services/login.service';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  public login! : Login;
  public userForm! : FormGroup;
  public email  = '';
  public pass  = '';

  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true
  }

  constructor(private loginService : LoginService, private fb : FormBuilder){
    this.userForm = this.fb.group({
      email : '',
      password : ''
    });
  }



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

  submitForm() : void {
    this.email = (this.userForm.get("email")?.value);
    this.pass = (this.userForm.get("password")?.value);
    console.log(this.email);
    console.log(this.pass);
    this.login = {
      email: this.email,
      password: this.pass
    }

    this.loginService.login(this.login);
  }
}



