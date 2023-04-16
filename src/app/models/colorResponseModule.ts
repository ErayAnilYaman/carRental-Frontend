import { ResponseModule } from "./ResponseModule";
import { Color } from "./color";

export interface ColorResponseModule extends ResponseModule{
    data:Color[]
}