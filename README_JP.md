# base58uuid-py

UUIDをBase58エンコードされた文字列（Bitcoinスタイルのアルファベットを使用）に変換するための、依存関係のない小さなPythonライブラリです。UUIDの一意性を保ちながら、より短くURLセーフな識別子を作成するのに最適です。

## 特徴

- 🚀 短く、URLセーフな識別子を生成（**固定22文字**）
- 🔄 UUIDとBase58の双方向変換
- 🪶 依存関係なし
- 💪 型ヒント付き
- 🔒 安全なUUID生成のために標準の`uuid`モジュールを使用
- 🛡️ 例外を投げる代わりにエラーオブジェクトを返す安全なAPIを提供

## インストール

```bash
pip install base58uuid
```

## 使用方法

```python
from base58uuid import uuid58, uuid58_encode, uuid58_decode

# 新しいBase58エンコードされたUUIDを生成（常に22文字）
id = uuid58()
# => "XDY9dmBbcMBXqcRvYw8xJ2" (22文字)

# 既存のUUIDをBase58に変換（常に22文字）
encoded = uuid58_encode("f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf")
# => "XDY9dmBbcMBXqcRvYw8xJ2" (22文字)

# Base58をUUIDに戻す
decoded = uuid58_decode("XDY9dmBbcMBXqcRvYw8xJ2")
# => "f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf"

# 安全なエンコード：例外を投げる代わりにエラーオブジェクトを返す
from base58uuid import uuid58_encode_safe, Uuid58EncodeError

encoded_safe = uuid58_encode_safe("f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf")
if isinstance(encoded_safe, Uuid58EncodeError):
    # エラー処理
    print(encoded_safe)
    return
# エンコードされた文字列を使用（22文字）
print(encoded_safe)

# 安全なデコード：例外を投げる代わりにエラーオブジェクトを返す
from base58uuid import uuid58_decode_safe, Uuid58DecodeError

decoded_safe = uuid58_decode_safe("XDY9dmBbcMBXqcRvYw8xJ2")
if isinstance(decoded_safe, Uuid58DecodeError):
    # エラー処理
    print(decoded_safe)
    return
# デコードされたUUIDを使用
print(decoded_safe)
```

## APIリファレンス

### `uuid58()`

新しいBase58エンコードされたUUIDを生成します（常に22文字）。

```python
def uuid58() -> str:  # 常に22文字の文字列を返す
```

### `uuid58_encode(uuid: str)`

標準のUUID文字列を22文字のBase58エンコード形式に変換します。

```python
def uuid58_encode(uuid: str) -> str:  # 常に22文字の文字列を返す
```

- **パラメータ:**
  - `uuid`: エンコードするUUID文字列（ハイフンありなしどちらでも可）
- **戻り値:** 22文字のBase58エンコードされた文字列
- **例外:** 入力が有効なUUIDでない場合、`Uuid58EncodeError`を発生

### `uuid58_encode_safe(uuid: str)`

標準のUUID文字列を22文字のBase58エンコード形式に変換しますが、
無効な入力に対して例外を投げる代わりに`Uuid58EncodeError`インスタンスを返します。

```python
def uuid58_encode_safe(uuid: str) -> Union[str, Uuid58EncodeError]:  # 文字列は常に22文字
```

- **パラメータ:**
  - `uuid`: エンコードするUUID文字列（ハイフンありなしどちらでも可）
- **戻り値:** 22文字のBase58エンコードされた文字列、または入力が有効なUUIDでない場合は`Uuid58EncodeError`
- **注意:** この関数は例外を発生させません。代わりにエラーオブジェクトを返します。

### `uuid58_decode(uuid58: str)`

22文字のBase58エンコードされた文字列を標準のUUID形式に戻します。

```python
def uuid58_decode(uuid58: str) -> str:
```

- **パラメータ:**
  - `uuid58`: デコードする22文字のBase58エンコードされた文字列
- **戻り値:** 標準のUUID文字列（小文字、ハイフン付き）
- **例外:** 入力が有効な22文字のBase58文字列でない場合、`Uuid58DecodeError`を発生

### `uuid58_decode_safe(uuid58: str)`

22文字のBase58エンコードされた文字列を標準のUUID形式に戻しますが、
無効な入力に対して例外を投げる代わりに`Uuid58DecodeError`インスタンスを返します。

```python
def uuid58_decode_safe(uuid58: str) -> Union[str, Uuid58DecodeError]:
```

- **パラメータ:**
  - `uuid58`: デコードする22文字のBase58エンコードされた文字列
- **戻り値:** 標準のUUID文字列（小文字、ハイフン付き）、または入力が有効な22文字のBase58文字列でない場合は`Uuid58DecodeError`
- **注意:** この関数は例外を発生させません。代わりにエラーオブジェクトを返します。

## なぜbase58uuidなのか？

標準のUUIDは36文字（ハイフンを含む）の長さがあり、URLやスペースが限られている場合に扱いにくいことがあります。Base58エンコードにより、一意性を保ちながらURLセーフな文字のみを使用して、固定22文字に短縮できます。このライブラリで使用されるBase58アルファベットはBitcoinと同じもので、視覚的な曖昧さや混乱を防ぐために似たような見た目の文字（0、O、I、l）を除外しています。

## ライセンス

MITライセンス - 詳細は[LICENSE](LICENSE)ファイルを参照してください 