# コントリビューションガイドライン

Base58UUIDプロジェクトへの貢献に興味を持っていただき、ありがとうございます！

## 開発環境のセットアップ

1. リポジトリをフォークしてクローン
```bash
git clone https://github.com/htpboost/base58uuid.git
cd base58uuid
```

2. 仮想環境を作成して有効化
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. 開発用の依存関係をインストール
```bash
pip install -e ".[dev]"
```

## 開発の流れ

1. 新しいブランチを作成
```bash
git checkout -b feature/your-feature-name
```

2. 変更を加えてコミット
```bash
git add .
git commit -m "feat: 機能の説明"
```

3. プルリクエストを作成

## コーディング規約

- コードはPEP 8にしたがってください
- 型ヒントを使用してください
- テストを追加してください
- ドキュメントを更新してください

## テスト

```bash
pytest
```

## プルリクエストのプロセス

1. イシューを作成して変更内容を説明
2. プルリクエストを作成
3. レビューを待つ
4. フィードバックに基づいて修正

## 質問やサポート

イシューを作成するか、yhatada3@gmail.com までご連絡ください。 