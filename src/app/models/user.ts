export class User{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    photoUrl:string;
    gender:string;
    nationality:string;
    role:string;
    field:string;
    businessType:string;
    bio:string;
    title:string;
    constructor(){
        this.firstName="";
        this.lastName="";
        this.email="";
        this.password="";
        this.photoUrl="";
        this.role="ROLE_CLIENT";
        this.gender="male";
    }
}

export class Category{
    id:string;
    displayName:string;
    constructor(){
    }
}