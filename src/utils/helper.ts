export function mergeDuplicates<T extends { id: string | number }>(products:T[]):T[] {
    const map = new Map()

    for (const item of products) {
      const existing = map.get(item.id)

      if (existing) {
        existing.total = (existing.total ?? 1) + 1
      } else {
        map.set(item.id, { ...item, total: 1 })
      }
    }

    return Array.from(map.values())
  }