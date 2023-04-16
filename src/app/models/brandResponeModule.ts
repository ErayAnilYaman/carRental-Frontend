import { ResponseModule } from "./ResponseModule";
import { Brand } from "./brand";

export interface BrandResponseModule extends ResponseModule{
    data:Brand[]
}