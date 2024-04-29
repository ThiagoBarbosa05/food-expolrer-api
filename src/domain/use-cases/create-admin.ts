import { Either, left, right } from '@/core/either'
import { Admin } from '@/domain/entities/admin'
import { AdminRepository } from '../repositories/admin'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Email } from '../entities/value-objects/email'
import { HashGenerator } from '../cryptography/hash-generator'

interface CreateAdminUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateAdminUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    admin: Admin
  }
>

export class CreateAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateAdminUseCaseRequest): Promise<CreateAdminUseCaseResponse> {
    const adminAlreadyExists = await this.adminRepository.findByEmail(email)

    if (adminAlreadyExists) {
      return left(new UserAlreadyExistsError(email))
    }

    const passwordHashed = await this.hashGenerator.hash(password)

    const admin = Admin.create({
      name,
      password: passwordHashed,
      email: new Email(email),
    })

    await this.adminRepository.create(admin)

    return right({
      admin,
    })
  }
}
