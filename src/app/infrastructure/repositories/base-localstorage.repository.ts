export abstract class BaseLocalStorageRepository<T extends { id: number }> {

  constructor(private storageKey: string) {}

  async getAll(): Promise<T[]> {

    const data = localStorage.getItem(this.storageKey);

    if (!data) return [];

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async save(entity: T): Promise<void> {
    const items = await this.getAll();
    localStorage.setItem(
      this.storageKey,
      JSON.stringify([...items, entity])
    );
  }

  async delete(id: number): Promise<void> {
    const items = await this.getAll();
    const filtered = items.filter(item => item.id !== id);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(filtered)
    );
  }

  async update(entity: T): Promise<void> {
    const items = await this.getAll();

    const updated = items.map(item =>
      item.id === entity.id ? entity : item
    );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(updated)
    );
  }
}
