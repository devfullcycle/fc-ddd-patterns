

export class CustomerService{

    constructor(
        private customerRepo: CustomerRepository, 
        private mediator: Mediator,
        private transaction: Transaction
        ){

    }

    async create(name: string){
        const customer = Customer.create(uuid(), name);
        await this.transaction.begin();
        await this.customerRepo.save(customer);
        await this.mediator.publish(customer); 
        await this.transaction.commit()
        return customer;
    }
}
