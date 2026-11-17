import { CartItemRow, WishlistItemRow, OrderRow, ProfileRow, RfqSubmissionRow } from "./types";

interface MockDatabase {
  profiles: Map<string, ProfileRow>;
  cart_items: Map<string, CartItemRow>;
  wishlist_items: Map<string, WishlistItemRow>;
  orders: Map<string, OrderRow>;
  rfq_submissions: Map<string, RfqSubmissionRow>;
}

declare global {
  // eslint-disable-next-line no-var
  var __fc_mock_db: MockDatabase | undefined;
}

if (!globalThis.__fc_mock_db) {
  globalThis.__fc_mock_db = {
    profiles: new Map(),
    cart_items: new Map(),
    wishlist_items: new Map(),
    orders: new Map(),
    rfq_submissions: new Map(),
  };
}

export const mockDb = globalThis.__fc_mock_db;

export class MockQueryBuilder<T extends Record<string, any>> {
  private tableName: keyof MockDatabase;
  private operation: "select" | "insert" | "upsert" | "update" | "delete" = "select";
  private payload: any = null;
  private filters: Array<(row: T) => boolean> = [];
  private orderFn?: (a: T, b: T) => number;
  private isSingle = false;

  constructor(tableName: keyof MockDatabase) {
    this.tableName = tableName;
  }

  select(_columns = "*") {
    this.operation = "select";
    return this;
  }

  insert(data: any | any[]) {
    this.operation = "insert";
    this.payload = data;
    return this;
  }

  upsert(data: any | any[]) {
    this.operation = "upsert";
    this.payload = data;
    return this;
  }

  update(updateData: any) {
    this.operation = "update";
    this.payload = updateData;
    return this;
  }

  delete() {
    this.operation = "delete";
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push((row: any) => row[column] === value);
    return this;
  }

  or(filterString: string) {
    const parts = filterString.split(",").map((p) => p.trim());
    this.filters.push((row: any) => {
      return parts.some((part) => {
        const [col, op, val] = part.split(".");
        if (op === "eq") {
          return String(row[col]) === String(val);
        }
        return false;
      });
    });
    return this;
  }

  order(column: string, { ascending = true }: { ascending?: boolean } = {}) {
    this.orderFn = (a: any, b: any) => {
      if (a[column] < b[column]) return ascending ? -1 : 1;
      if (a[column] > b[column]) return ascending ? 1 : -1;
      return 0;
    };
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  private executeOperation(): { data: any; error: any } {
    const table = mockDb[this.tableName] as unknown as Map<string, any>;
    const now = new Date().toISOString();

    if (this.operation === "insert") {
      const items = Array.isArray(this.payload) ? this.payload : [this.payload];
      const inserted: any[] = [];

      for (const item of items) {
        const id = item.id || `mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const record = {
          ...item,
          id,
          created_at: item.created_at || now,
          updated_at: item.updated_at || now,
        };
        table.set(id, record);
        inserted.push(record);
      }

      return {
        data: Array.isArray(this.payload) ? inserted : inserted[0],
        error: null,
      };
    }

    if (this.operation === "upsert") {
      const items = Array.isArray(this.payload) ? this.payload : [this.payload];
      const upserted: any[] = [];

      for (const item of items) {
        const id = item.id;
        const existing = table.get(id) || {};
        const updated = {
          ...existing,
          ...item,
          updated_at: now,
        };
        table.set(id, updated);
        upserted.push(updated);
      }

      return {
        data: Array.isArray(this.payload) ? upserted : upserted[0],
        error: null,
      };
    }

    // For select, update, and delete, filter rows first
    let rows = Array.from(table.values());
    for (const filter of this.filters) {
      rows = rows.filter(filter);
    }

    if (this.operation === "update") {
      for (const row of rows) {
        const updated = {
          ...row,
          ...this.payload,
          updated_at: now,
        };
        table.set(row.id, updated);
      }
      return { data: rows, error: null };
    }

    if (this.operation === "delete") {
      for (const row of rows) {
        table.delete(row.id);
      }
      return { data: rows, error: null };
    }

    // Select
    if (this.orderFn) {
      rows.sort(this.orderFn);
    }

    if (this.isSingle) {
      return {
        data: rows.length > 0 ? rows[0] : null,
        error: rows.length > 0 ? null : { message: "Row not found", code: "PGRST116" },
      };
    }

    return {
      data: rows,
      error: null,
    };
  }

  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    const result = this.executeOperation();
    return Promise.resolve(result).then(onfulfilled, onrejected);
  }
}

export function createMockSupabaseClient() {
  return {
    from: (table: keyof MockDatabase) => new MockQueryBuilder(table),
  };
}
