import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpResponse,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { BehaviorSubject, Observable } from 'rxjs';
  import { map, catchError, retry } from 'rxjs/operators';
//   import { NavController, ToastController } from '@ionic/angular';
  import { Router } from '@angular/router';
  
  @Injectable({
    providedIn: 'root',
  })
  export class ApiServicesService {

    constructor(
      protected httpClient: HttpClient,
    //   public toastController: ToastController,
    //   private navCtrl: NavController,
      public router: Router
    ) {}
    loginGoogle(body :any){
        return this.httpClient
          .post('https://waggeh-backend-pre-production-dev-team.up.railway.app/api/auth/google/authenticate',body,{} )
          .pipe(
            retry(0),
            catchError((error: HttpErrorResponse) => {
              console.error('error', error);
              throw error.error;
            })
          );
    }
    login(body:any){
        return this.httpClient
        .post('https://waggeh-backend-pre-production-dev-team.up.railway.app/api/auth/login',body,{} )
        .pipe(
          retry(0),
          catchError((error: HttpErrorResponse) => {
            console.error('error', error);
            throw error.error;
          })
        );
    }
    signUp(body:any){
      
      return this.httpClient
        .post('https://waggeh-backend-pre-production-dev-team.up.railway.app/api/auth/signup',body,{} )
        .pipe(
          retry(0),
          catchError((error: HttpErrorResponse) => {
            console.error('error', error);
            throw error.error;
          })
        );
    }
    addCategory(body:any){
      
      return this.httpClient
        .post('https://waggeh-backend-pre-production-dev-team.up.railway.app/api/dash-board/category/add',body,{} )
        .pipe(
          retry(0),
          catchError((error: HttpErrorResponse) => {
            console.error('error', error);
            throw error.error;
          })
        );
    }
    uploadImage(file: File){
      const formData: FormData = new FormData();
      formData.append('imageFile', file, file.name);      
      return this.httpClient
        .post('https://waggeh-backend-pre-production-dev-team.up.railway.app/api/images/upload',formData,{} )
        .pipe(
          retry(0),
          catchError((error: HttpErrorResponse) => {
            console.error('error', error);
            throw error.error;
          })
        );
    }
    downloadImage(photoURL: any){      
      return this.httpClient
        .get('https://waggeh-backend-pre-production-dev-team.up.railway.app/api/images/download',{
          params:{
            photoURL
          }
        } )
        .pipe(
          retry(0),
          catchError((error: HttpErrorResponse) => {
            console.error('error', error);
            throw error.error;
          })
        );
    }
    

    getSignUpCategories(){
      return this.httpClient
      .get('https://waggeh-backend-pre-production-dev-team.up.railway.app/api/fields',{} )
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          console.error('error', error);
          throw error.error;
        })
      );
    }
  }