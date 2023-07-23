import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { countries } from "../../../assets/countries";
import {  MatStepper} from '@angular/material/stepper';
import { Category, User } from 'app/models/user';
import { ApiServicesService } from 'app/network/apiService.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialAuthService } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-continue-sign-up',
  templateUrl: './continue-sign-up.component.html',
  styleUrls: ['./continue-sign-up.component.scss']
  
})

export class ContinueSignUpComponent {
  @ViewChild('stepper') stepper:MatStepper;
  userInfo=new User();
  showPass=false;
  submitted=false;
  FormGroup = this._formBuilder.group({
    gender: ['', Validators.required],
    country: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required,Validators.pattern],
    password: ['', Validators.required],
  });
  isLinear = true;
  progressBarWidth=25;
  countries=countries;
  userImgUrl:any="../../../assets/imgs/user.svg";
  categories:Category[]=[];
  constructor(private authService: SocialAuthService ,private _sanitizer: DomSanitizer,private _formBuilder: FormBuilder,private apiService:ApiServicesService) {
    this.getSignUpCategories();
    // this.downloadImage();
  }
  get FormGroupControls(){
    return this.FormGroup.controls;
  }
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      // let socialUser = user;
      // this.isLoggedin = user != null;
      // console.log("socialUser",user);
      this.loginWithGoogle(user);
    });
  }
  changeStep(){
    this.progressBarWidth=((this.stepper.selectedIndex+1)/4)*100;
    console.log("stepper",this.stepper.selectedIndex)
  }
  goLogin(){
    
  }
  get firstStepDisabled(){
    if(this.FormGroupControls.firstName.errors ||this.FormGroupControls.lastName.errors ||
      this.FormGroupControls.email.errors ||this.FormGroupControls.password.errors ){
        return true;
      }else{
        return false;
      } 
  }
  get secondStepDisabled(){
    if(this.FormGroupControls.gender.errors ||this.FormGroupControls.country.errors){
        return true;
      }else{
        return false;
      } 
  }
  loginWithGoogle(profileData:any){
    console.log("profileData",profileData);
    let data={
      "email": profileData.email,
      "firstName": profileData.firstName,
      "role": "ROLE_CLIENT",
      "photoUrl":profileData.photoUrl
  };
  this.apiService.loginGoogle(data).subscribe(
    (result)=>{
      console.log("result",result);
    },(err)=>{
      console.log("err",err);
    }
  )

  }
  selectedFile:any = null;
  // downloadImage(){
  //   this.apiService.downloadImage("64b8591733d7000bafe9ceb7").subscribe(
  //     (res:any)=>{
  //       console.log(res);
  //       this.userImgUrl=this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
  //       + res["payload"]);
  //     }
  //   )
  // }
  onFileSelected(files:any) {

    this.selectedFile = files.target.files.item(0);
    const file = files.target.files[0];
    console.log("this.selectedFile",this.selectedFile);
    // const file = event.target.files[0];
    // // let selectedFile:any = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      // this.savePhoto(event.target.result);
      this.userImgUrl = event.target.result;
    };
    reader.readAsDataURL(file);
    // this.selectedFileSize = false;
    // this.selectedFileType = false;
    // if (this.selectedFile.size / 1000 > 1000) {
    //   this.selectedFileSize = true;
    // }
    // if (
    //   this.selectedFile.type != "image/png" &&
    //   this.selectedFile.type != "image/jpg" &&
    //   this.selectedFile.type != "image/jpeg"
    // ) {
    //   this.selectedFileType = true;
    // }
  }
  getSignUpCategories(){
    this.apiService.getSignUpCategories().subscribe(
      (res:any)=>{
        console.log("res",res);
        this.categories=res["payload"];
      },(err)=>{
        console.log("err",err);
        
      }
    )
  }
  submit(){
    console.log("userInfo",this.userInfo);
    // this.userInfo.photoUrl=this.userImgUrl;
    this.apiService.uploadImage(this.selectedFile).subscribe(
      (res:any)=>{

        console.log("uploadImage  ressss",res);
    this.userInfo.photoUrl=res['payload'];

        this.apiService.signUp(this.userInfo).subscribe(
          (res)=>{
            console.log("res",res);
            let body={
              imageFile:this.selectedFile
            }
        
          },(err)=>{
            console.log("err",err)
    
          }
        )
      }
    )
 
    // let data={

    // }
  }
}
