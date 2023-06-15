export interface Pay{
    id:number;
    userId:number;
    userName:string;
    cardNumber:string;
    cvc:string;
    exDate:Date;
    status:boolean;
}