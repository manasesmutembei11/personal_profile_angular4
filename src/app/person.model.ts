export class Person{
    id: number;
   firstName: string;
   lastName: string;
   email: string;
   phone: string;
   country: string;
   dateOfBirth: Date;
   status: number;
   paymentNumber: string;

   constructor( id: number,
    firstName: string, 
    lastName: string, 
    email: string, 
    phone: string, 
    country: string,
    dateOfBirth: Date,
    status: number,
    paymentNumber: string ){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.country = country;
        this. dateOfBirth = dateOfBirth;
        this.status = status;
        this.paymentNumber = paymentNumber;


    }
}
