import { ResponseModule } from "./ResponseModule";
import { Rental } from "./rental";

export interface RentalResponseModule extends ResponseModule{
    data:Rental[]
}