


const mediator = new Mediator();

const sendMailListener = new SendMailListener();

mediator.register(CustomerCreated.name, (event: CustomerCreated) => {
    sendMailListener.handle(event)
})