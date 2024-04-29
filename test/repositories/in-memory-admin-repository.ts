import { Admin } from '@/domain/entities/admin'
import { AdminRepository } from '@/domain/repositories/admin'

export class InMemoryAdminRepository implements AdminRepository {
  public items: Admin[] = []

  async create(admin: Admin): Promise<void> {
    this.items.push(admin)
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.items.find((admin) => admin.email === email)
  }
}
