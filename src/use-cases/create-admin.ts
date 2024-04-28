import { Either } from 'src/core/either'
import { Admin } from 'src/entities/admin'

interface CreateAdminUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateAdminUseCaseResponse = Either<
  null,
  {
    admin: Admin
  }
>

export class CreateAdminUseCase {}
