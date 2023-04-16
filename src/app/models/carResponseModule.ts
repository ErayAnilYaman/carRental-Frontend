import { ResponseModule } from "./ResponseModule";
import { Car } from "./car";

export interface CarResponseModule extends ResponseModule{
    data:Car[]
}