import { Module } from "@nestjs/common";
import { OdontogramsController } from "./odontograms.controller";
import { OdontogramsService } from "./odontograms.service";

@Module({
    controllers: [OdontogramsController],
    providers: [OdontogramsService],
    exports: [OdontogramsService]
})
export class OdontogramsModule {}