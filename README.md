# Base58UUID

UUIDをBase58エンコード/デコードするマルチ言語ライブラリです。短く、URLセーフな文字列としてUUIDを表現できます。

## 対応言語

- [JavaScript版](javascript/README.md)
- [PHP版](php/README.md)
- [Python版](python/README.md)

## 特徴

- 🚀 短く、URLセーフな識別子を生成
- 🔄 UUIDとBase58の双方向変換
- 💪 複数の言語で実装
- 🛡️ 堅牢なエラーハンドリング
- ✅ 包括的なテストカバレッジ

## なぜBase58UUIDなのか？

標準のUUIDは36文字（ハイフンを含む）の長さがあり、URLやスペースが限られている場合に扱いにくいことがあります。Base58エンコードにより、一意性を保ちながらURLセーフな文字のみを使用して、より短い文字列に変換できます。

このライブラリで使用されるBase58アルファベットはBitcoinと同じもので、視覚的な曖昧さや混乱を防ぐために似たような見た目の文字（0、O、I、l）を除外しています。

## ライセンス

MITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 作者

- Yoshitake Hatada (@htpboost) 