import { PartialType } from '@nestjs/mapped-types'

import { CreateProperty } from './create-property.dto'

export class UpdatePropertyDto extends PartialType(CreateProperty) {}
