import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilePondFile, FilePondOptions } from 'filepond';
import { Login, User } from 'src/app/models/types';
import { LoginService } from 'src/app/services/login.service';
import { MediaService } from 'src/app/services/media.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


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

  constructor(private loginService: LoginService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: '',
      password: '',
    });
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
