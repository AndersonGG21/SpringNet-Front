import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from 'src/app/models/login.model';
// import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public login! : Login;
  public userForm! : FormGroup;
  public email : string = '';
  public pass : string = '';
  constructor(private loginService : LoginService, private fb : FormBuilder){
    this.userForm = this.fb.group({
      email : '',
      password : ''
    });
  };

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



