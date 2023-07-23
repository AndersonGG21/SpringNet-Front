import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as FilePond from 'filepond';
import { MessageService } from 'primeng/api';
import { UserWithPassword } from 'src/app/models/types';
import { MediaService } from 'src/app/services/media.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css', './register.component.css']
})
export class RegisterComponent implements OnInit {

  public newUserForm!: FormGroup;
  private fb = inject(FormBuilder);
  private mediaService = inject(MediaService);
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  imgUrl = '';
  uploadFile = true;

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      username: '',
      description: '',
      email: '',
      password: '',
    });

    FilePond.create(document.querySelector(
      'input[type=file]'
    ) as HTMLInputElement, {
      labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
      imagePreviewHeight: 170,
      imageCropAspectRatio: '1:1',
      imageResizeTargetWidth: 200,
      imageResizeTargetHeight: 200,
      stylePanelLayout: 'compact circle',
      styleLoadIndicatorPosition: 'center bottom',
      styleProgressIndicatorPosition: 'right bottom',
      styleButtonRemoveItemPosition: 'left bottom',
      styleButtonProcessItemPosition: 'right bottom',
      maxFileSize: '8MB',
      onerror : (error, file, status) => {
        this.uploadFile = false;
        alert("Error uploading file, please choose another one");
      },
      onaddfile: (error, file) => {
        const formData = new FormData();
        formData.append('file', file.file);

        if (this.uploadFile && formData.has('file')) {
          this.mediaService.uploadFile(formData).subscribe((res) => {
            this.imgUrl = res.url;
          });
        }else {
          alert('Please choose a file to upload');
        }
      },
    });
  }


  createAccount(): void {
    const username = this.newUserForm.get('username')?.value;
    const description = this.newUserForm.get('description')?.value;
    const password = this.newUserForm.get('password')?.value;
    const email = this.newUserForm.get('email')?.value;

    const newUser : UserWithPassword = {
      username: username,
      description: description,
      password: password,
      email: email,
      profileImg: this.imgUrl
    };

    this.userService.createNewUser(newUser).subscribe(() => {
      this.messageService.add({key: 'tc', severity: 'success', detail: 'User created', life: 1500});

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    });
  }
}
