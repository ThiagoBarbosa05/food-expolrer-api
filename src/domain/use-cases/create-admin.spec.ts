import { FakeHasher } from 'test/cryptograph/fake-hasher'
import { InMemoryAdminRepository } from 'test/repositories/in-memory-admin-repository'
import { CreateAdminUseCase } from './create-admin'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryAdminRepository: InMemoryAdminRepository
let fakeHasher: FakeHasher
let sut: CreateAdminUseCase

describe('Create Admin Use Case', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    fakeHasher = new FakeHasher()
    sut = new CreateAdminUseCase(inMemoryAdminRepository, fakeHasher)
  })

  it('should be able to create admin', async () => {
    const result = await sut.execute({
      email: 'admin@example.com',
      password: '12345',
      name: 'Admin 1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryAdminRepository.items[0].email).toEqual('admin@example.com')
  })

  it('should be able to hash admin password', async () => {
    const result = await sut.execute({
      email: 'admin@example.com',
      password: 'admin',
      name: 'Admin 2',
    })

    const hashedPassword = await fakeHasher.hash('admin')

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryAdminRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to create a admin with the same email twice', async () => {
    await sut.execute({
      email: 'admin@example.com',
      password: '123456',
      name: 'Admin 1',
    })

    const result = await sut.execute({
      email: 'admin@example.com',
      password: '2434535',
      name: 'Admin 2',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
