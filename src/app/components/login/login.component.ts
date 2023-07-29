import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Login } from 'src/app/models/types';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent{
  public login!: Login;
  public userForm!: FormGroup;
  public email = '';
  public pass = '';
  private title = inject(Title);

  constructor(private loginService: LoginService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: '',
      password: '',
    });

    this.title.setTitle('Login | SpringNet');
  }

  submitForm(): void {
    this.email = this.userForm.get('email')?.value;
    this.pass = this.userForm.get('password')?.value;

    this.login = {
      email: this.email,
      password: this.pass,
    };

    this.loginService.login(this.login);
  }
}
