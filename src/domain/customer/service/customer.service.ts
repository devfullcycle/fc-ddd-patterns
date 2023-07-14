import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { TransactionInterface } from "../../@shared/domain/transaction.interface";
import { Mediator } from "../../@shared/service/mediator";
import Customer from "../entity/customer";
import {v4 as uuid} from 'uuid'


export class CustomerService{

    constructor(
        private customerRepo: CustomerRepository, 
        private mediator: Mediator,
        private transaction: TransactionInterface
        ){}

    async create(name: string){
        const customer = Customer.create(uuid(), name);
        this.transaction.do(async (transaction) => {
            this.customerRepo.setTransaction(transaction)
            await this.customerRepo.create(customer);
            await this.mediator.publish(customer); 
        })
        return customer;
    }
}
