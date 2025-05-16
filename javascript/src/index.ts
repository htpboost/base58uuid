import { v4 as uuidv4 } from 'uuid';

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export class Base58UUID {
  private uuid: string;

  constructor(uuid?: string) {
    if (uuid) {
      // ハイフンを除去して検証
      const normalizedUuid = uuid.replace(/-/g, '');
      if (normalizedUuid.length !== 32 || !/^[0-9a-f]{32}$/i.test(normalizedUuid)) {
        throw new Error('Invalid UUID format');
      }
      this.uuid = uuid;
    } else {
      this.uuid = uuidv4();
    }
  }

  /**
   * UUIDをBase58エンコードされた文字列に変換します
   * @returns Base58エンコードされた文字列
   */
  public encode(): string {
    // UUIDからハイフンを除去
    const hex = this.uuid.replace(/-/g, '');
    
    // 16進数を10進数に変換
    let decimal = BigInt('0x' + hex);
    
    // Base58エンコード
    let result = '';
    while (decimal > 0) {
      const remainder = Number(decimal % BigInt(58));
      result = BASE58_ALPHABET[remainder] + result;
      decimal = decimal / BigInt(58);
    }
    
    return result;
  }

  /**
   * Base58エンコードされた文字列をUUIDに戻します
   * @param encoded Base58エンコードされた文字列
   * @returns UUID
   */
  public decode(encoded: string): string {
    if (!encoded) {
      throw new Error('Invalid Base58 character');
    }

    // Base58デコード
    let decimal = BigInt(0);
    for (let i = 0; i < encoded.length; i++) {
      const char = encoded[i];
      const value = BASE58_ALPHABET.indexOf(char);
      if (value === -1) {
        throw new Error('Invalid Base58 character');
      }
      decimal = decimal * BigInt(58) + BigInt(value);
    }
    
    // 10進数を16進数に変換
    let hex = decimal.toString(16).padStart(32, '0');
    
    // UUID形式に整形
    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20, 32)
    ].join('-');
  }

  /**
   * 現在のUUIDを取得します
   * @returns UUID
   */
  public getUUID(): string {
    return this.uuid;
  }
} 