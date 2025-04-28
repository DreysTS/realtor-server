import { Controller } from '@nestjs/common';
import { PropertyRequestService } from './property-request.service';

@Controller('property-request')
export class PropertyRequestController {
  constructor(private readonly propertyRequestService: PropertyRequestService) {}
}
