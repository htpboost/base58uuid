import { Base58UUID } from './index';

describe('Base58UUID', () => {
  describe('encode', () => {
    test('既知のUUIDをBase58に変換できること', () => {
      const uuid = new Base58UUID('f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf');
      const encoded = uuid.encode();
      expect(encoded).toBe('XDY9dmBbcMBXqcRvYw8xJ2');
    });

    test('ハイフンなしのUUIDも変換できること', () => {
      const uuid = new Base58UUID('f4b247fd1f8745d4aa061c6fc0a8dfaf');
      const encoded = uuid.encode();
      expect(encoded).toBe('XDY9dmBbcMBXqcRvYw8xJ2');
    });

    test('異なるUUIDで異なるBase58文字列が生成されること', () => {
      const uuid1 = new Base58UUID('f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf');
      const uuid2 = new Base58UUID('f4b247fd-1f87-45d4-aa06-1c6fc0a8dfae');
      expect(uuid1.encode()).not.toBe(uuid2.encode());
    });
  });

  describe('decode', () => {
    test('Base58文字列を元のUUIDに戻せること', () => {
      const originalUuid = 'f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf';
      const uuid = new Base58UUID(originalUuid);
      const encoded = uuid.encode();
      const decoded = uuid.decode(encoded);
      expect(decoded).toBe(originalUuid);
    });

    test('無効なBase58文字列でエラーが発生すること', () => {
      const uuid = new Base58UUID();
      expect(() => uuid.decode('invalid')).toThrow('Invalid Base58 character');
    });

    test('空文字列でエラーが発生すること', () => {
      const uuid = new Base58UUID();
      expect(() => uuid.decode('')).toThrow('Invalid Base58 character');
    });
  });

  describe('constructor', () => {
    test('UUIDを指定しない場合、新しいUUIDが生成されること', () => {
      const uuid = new Base58UUID();
      expect(uuid.getUUID()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    test('無効なUUID形式でエラーが発生すること', () => {
      expect(() => new Base58UUID('invalid-uuid')).toThrow();
    });
  });

  describe('getUUID', () => {
    test('設定されたUUIDを取得できること', () => {
      const originalUuid = 'f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf';
      const uuid = new Base58UUID(originalUuid);
      expect(uuid.getUUID()).toBe(originalUuid);
    });
  });

  describe('一貫性', () => {
    test('エンコードとデコードの往復で元のUUIDに戻ること', () => {
      const originalUuid = 'f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf';
      const uuid = new Base58UUID(originalUuid);
      const encoded = uuid.encode();
      const decoded = uuid.decode(encoded);
      expect(decoded).toBe(originalUuid);
    });

    test('複数回のエンコードで同じ結果が得られること', () => {
      const uuid = new Base58UUID('f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf');
      const firstEncode = uuid.encode();
      const secondEncode = uuid.encode();
      expect(firstEncode).toBe(secondEncode);
    });
  });
}); 