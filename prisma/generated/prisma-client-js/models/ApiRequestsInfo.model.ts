import {IsDate, IsDefined, IsInt} from "class-validator";
import "./";

export class ApiRequestsInfo {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsDate()
    last_request!: Date;
}
