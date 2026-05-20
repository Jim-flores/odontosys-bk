import { Module } from "@nestjs/common";
import { AntecedentsController } from "./antecedents.controller";
import { AntecedentsService } from "./antecedents.service";

@Module({
  controllers: [AntecedentsController],
  providers: [AntecedentsService],
  exports: [AntecedentsService]
})
export class AntecedentsModule {}