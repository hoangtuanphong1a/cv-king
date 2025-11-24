import { ApiProperty } from "@nestjs/swagger";
import { UpdateEmployerProfileDto } from "./employer-profile.dto";
import { UpdateCompanyDto } from "@modules/company/dtos/company.dto";

export class UpdateEmployerCompanyDto {
    @ApiProperty({ type: UpdateEmployerProfileDto })
    employerProfile: UpdateEmployerProfileDto;

    @ApiProperty({ type: UpdateCompanyDto })
    company: UpdateCompanyDto;
}