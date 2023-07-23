import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { SocialAuthService } from "@abacritt/angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from "@abacritt/angularx-social-login";
import { ApiServicesService } from "app/network/apiService.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
declare const gapi: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  showPass = false;
  email: any;
  password: any;
  loginForm = this._formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });
  submitted = false;
  constructor(
    private toast: ToastrService,
    private _formBuilder: FormBuilder,
    private authService: SocialAuthService,
    private apiService: ApiServicesService
  ) {}
  get loginFormControl() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      // let socialUser = user;
      // this.isLoggedin = user != null;
      // console.log("socialUser",user);
      this.loginWithGoogle(user);
    });
  }

  loginWithGoogle(profileData: any) {
    console.log("profileData", profileData);
    let data = {
      email: profileData.email,
      firstName: profileData.firstName,
      role: "ROLE_CLIENT",
      photoUrl: profileData.photoUrl,
    };
    this.apiService.loginGoogle(data).subscribe(
      (result) => {
        console.log("result", result);
        this.toast.success("logged in successfully ...");
      },
      (err) => {
        console.log("err", err);
      }
    );
  }
  login() {
    this.submitted = true;
    let data = {
      email: this.email,
      password: this.password,
    };
    // this.toastr.error("cccddd");
    console.log("this.loginForm", this.loginForm);
    if (this.loginForm.valid) {
      this.apiService.login(data).subscribe((res: any) => {
        console.log("res", res);
        if (res["success"]) {
          this.toast.success("logged in successfully ...");
        } else {
          this.toast.error("Ivalid email or  password !");
        }
      });
    }
  }
}
