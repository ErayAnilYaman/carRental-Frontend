import { ResponseModule } from "./ResponseModule";
import { Customer } from "./customer";

export interface CustomerResponseModule extends ResponseModule{
    data:Customer[]
}