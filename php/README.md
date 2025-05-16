# Base58UUID (PHP版)

UUIDをBase58エンコード/デコードするPHPライブラリです。短く、URLセーフな文字列としてUUIDを表現できます。

## インストール

Composerを使用してインストールできます：

```bash
composer require htpboost/base58uuid
```

## 必要条件

- PHP 7.4以上
- GMP拡張モジュール（Base58エンコード/デコードに使用）

## 使用方法

### 基本的な使い方

```php
use Htpboost\Base58UUID\Base58UUID;

// 新しいUUIDを生成
$b58 = new Base58UUID();
$uuid = $b58->getUuid(); // 例: "f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf"

// 既存のUUIDをBase58エンコード
$b58 = new Base58UUID('f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf');
$encoded = $b58->encode(); // 例: "XDY9dmBbcMBXqcRvYw8xJ2"

// Base58文字列をUUIDにデコード
$decoded = $b58->decode('XDY9dmBbcMBXqcRvYw8xJ2'); // 元のUUIDに戻る
```

### エラーハンドリング

```php
try {
    // 無効なUUID形式
    $b58 = new Base58UUID('invalid-uuid');
} catch (\InvalidArgumentException $e) {
    // "Invalid UUID format" エラー
}

try {
    // 無効なBase58文字列
    $b58 = new Base58UUID();
    $b58->decode('invalid');
} catch (\InvalidArgumentException $e) {
    // "Invalid Base58 character" エラー
}
```

## 開発

### セットアップ

```bash
# 依存関係のインストール
composer install

# テストの実行
./vendor/bin/phpunit tests
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