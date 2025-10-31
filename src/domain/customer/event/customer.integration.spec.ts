import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import EnviaConsoleLog1Handler from "../event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../event/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../event/handler/envia-console-log.handler";

describe("Customer events integration test", () => {
  it("should demonstrate all customer events working together", () => {
    // Arrange - Setup event dispatcher and handlers
    const eventDispatcher = new EventDispatcher();
    
    // Register CustomerCreated handlers
    const consoleLog1Handler = new EnviaConsoleLog1Handler();
    const consoleLog2Handler = new EnviaConsoleLog2Handler();
    eventDispatcher.register("CustomerCreatedEvent", consoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", consoleLog2Handler);
    
    // Register CustomerAddressChanged handler
    const consoleLogHandler = new EnviaConsoleLogHandler();
    eventDispatcher.register("CustomerAddressChangedEvent", consoleLogHandler);

    // Act & Assert - Create customer and observe CustomerCreated events
    console.log("=== Creating Customer ===");
    const customer = new Customer("123", "João Silva", eventDispatcher);
    
    expect(customer.id).toBe("123");
    expect(customer.name).toBe("João Silva");
    
    // Act & Assert - Change address and observe CustomerAddressChanged event
    console.log("=== Changing Customer Address ===");
    const address = new Address("Rua das Flores", 100, "01234-567", "São Paulo");
    customer.changeAddress(address);
    
    expect(customer.Address).toBe(address);
    expect(customer.Address.toString()).toBe("Rua das Flores, 100, 01234-567 São Paulo");
  });
});