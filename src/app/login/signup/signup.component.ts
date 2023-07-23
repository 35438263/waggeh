import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Category, User } from "app/models/user";
import { ApiServicesService } from "app/network/apiService.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  showPass = false;
  showConfirmPass = false;
  password: string;
  confirmPassword: string;
  passwordIsMatch: boolean = true;
  signInFrom: FormGroup;
  userInfo = new User();
  selectedFile: any = null;
  selectedFileCategory: any = null;
  userImgUrl: any = "../../../assets/imgs/user.svg";
  categories: Category[] = [];
  categoryName:any;
  categoryDisplayName:any;
  categoryImgUrl: any = "../../../assets/imgs/user.svg";;
  constructor(private apiService: ApiServicesService) {
    this.signInFrom = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
    this.getSignUpCategories();
  }
  getSignUpCategories() {
    this.apiService.getSignUpCategories().subscribe(
      (res: any) => {
        console.log("res", res);
        this.categories = res["payload"];
      },
      (err) => {
        console.log("err", err);
      }
    );
  }
  ngOnInit(): void {
    // this.signInFrom.
  }
  onFileSelected(files: any) {
    this.selectedFile = files.target.files.item(0);
    const file = files.target.files[0];
    console.log("this.selectedFile", this.selectedFile);
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
  onCategoryFileSelected(files: any) {
    this.selectedFileCategory = files.target.files.item(0);
    const file = files.target.files[0];
    // console.log("this.selectedFile", this.selectedFile);
    // const file = event.target.files[0];
    // // let selectedFile:any = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      // this.savePhoto(event.target.result);
      this.categoryImgUrl = event.target.result;
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
  submit() {
    this.userInfo.role = "ROLE_CONSULTANT";
    console.log("userInfo", this.userInfo);
    // this.userInfo.photoUrl=this.userImgUrl;
    this.apiService.uploadImage(this.selectedFile).subscribe((res: any) => {
      console.log("uploadImage  ressss", res);
      this.userInfo.photoUrl = res["payload"];

      this.apiService.signUp(this.userInfo).subscribe(
        (res) => {
          console.log("res", res);
          let body = {
            imageFile: this.selectedFile,
          };
        },
        (err) => {
          console.log("err", err);
        }
      );
    });

    // let data={

    // }
  }
  addCategory(){

    // this.userInfo.photoUrl=this.userImgUrl;
    this.apiService.uploadImage(this.selectedFileCategory).subscribe((res: any) => {
      console.log("uploadImage  ressss", res);
      // this.userInfo.photoUrl = res["payload"];
      let data={"name": this.categoryName,
          "displayName":this.categoryDisplayName ,
          "photoURL":  res["payload"]
      }
      this.apiService.addCategory(data).subscribe(
        (res) => {
          console.log("res", res);
          let body = {
            imageFile: this.selectedFile,
          };
        },
        (err) => {
          console.log("err", err);
        }
      );
    });
  }
  passwordMatch() {
    if (this.password && this.confirmPassword) {
      if (this.password.toLowerCase() == this.confirmPassword.toLowerCase()) {
        this.passwordIsMatch = true;
      } else {
        this.passwordIsMatch = false;
      }
    }
  }
}
