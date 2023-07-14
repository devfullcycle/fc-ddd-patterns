import { CustomerCreated } from "../entity/customer-created.event";


export class SendMailListener{

    handle(event: CustomerCreated){
        //envio do email
    }
}