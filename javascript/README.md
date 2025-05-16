# Base58UUID (JavaScript版)

UUIDをBase58エンコード/デコードするJavaScriptライブラリです。短く、URLセーフな文字列としてUUIDを表現できます。

## インストール

npmを使用してインストールできます：

```bash
npm install base58uuid
```

## 必要条件

- Node.js 14.0以上
- TypeScript 4.0以上（型定義を使用する場合）

## 使用方法

### 基本的な使い方

```typescript
import { Base58UUID } from 'base58uuid';

// 新しいUUIDを生成
const b58 = new Base58UUID();
const uuid = b58.getUUID(); // 例: "f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf"

// 既存のUUIDをBase58エンコード
const b58 = new Base58UUID('f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf');
const encoded = b58.encode(); // 例: "XDY9dmBbcMBXqcRvYw8xJ2"

// Base58文字列をUUIDにデコード
const decoded = b58.decode('XDY9dmBbcMBXqcRvYw8xJ2'); // 元のUUIDに戻る
```

### エラーハンドリング

```typescript
try {
    // 無効なUUID形式
    const b58 = new Base58UUID('invalid-uuid');
} catch (error) {
    // "Invalid UUID format" エラー
}

try {
    // 無効なBase58文字列
    const b58 = new Base58UUID();
    b58.decode('invalid');
} catch (error) {
    // "Invalid Base58 character" エラー
}
```

## 開発

### セットアップ

```bash
# 依存関係のインストール
npm install

# テストの実行
npm test

# ビルド
npm run build
```

### テスト

以下のテストケースが含まれています：

- 既知のUUIDのエンコード
- ハイフンなしUUIDのエンコード
- Base58文字列のデコード
- 無効な入力のエラーハンドリング
- エンコード/デコードの一貫性
- 複数回エンコードの結果の一貫性

## ライセンス

MITライセンスの下で公開されています。詳細は[LICENSE](../LICENSE)ファイルを参照してください。

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 作者

- Yoshitake Hatada (@htpboost) 