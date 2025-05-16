# Base58UUID

Base58UUIDは、UUIDをBase58エンコードされた文字列に変換するPythonライブラリです。

## 特徴

- UUIDをBase58エンコードされた文字列に変換
- Base58エンコードされた文字列をUUIDに戻す
- シンプルで使いやすいAPI

## インストール

```bash
pip install base58uuid
```

## 使用方法

```python
from base58uuid import Base58UUID

# UUIDをBase58エンコード
uuid_obj = Base58UUID()
encoded = uuid_obj.encode()  # 新しいUUIDを生成してBase58エンコード
print(encoded)  # 例: "2NEpo7TZRRrLZSi2U"

# Base58エンコードされた文字列をUUIDに戻す
decoded = uuid_obj.decode(encoded)
print(decoded)  # 元のUUID
```

## ライセンス

MIT License

## 開発者

Yoshitake Hatada

## 貢献

プルリクエストやイシューの報告は大歓迎です！ 