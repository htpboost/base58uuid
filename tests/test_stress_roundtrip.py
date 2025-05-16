import unittest
from uuid import UUID, uuid4
from base58uuid import uuid58_encode, uuid58_decode
import time

class TestUuid58StressRoundtrip(unittest.TestCase):
    def test_stress_roundtrip(self):
        """エラーが発生するまで繰り返しラウンドトリップをテスト"""
        count = 0
        start_time = time.time()
        max_iterations = 1_000_000_000  # 最大100万回まで
        
        try:
            while count < max_iterations:
                # 新しいUUIDを生成
                original_uuid = str(uuid4())
                
                # UUIDをBase58に変換
                encoded = uuid58_encode(original_uuid)
                
                # Base58をUUIDに戻す
                decoded = uuid58_decode(encoded)
                
                # 元のUUIDと一致することを確認
                self.assertEqual(decoded, original_uuid, 
                    f"不一致が発生: 元のUUID={original_uuid}, デコード後={decoded}")
                
                # 長さが22文字であることを確認
                self.assertEqual(len(encoded), 22,
                    f"長さが22文字ではありません: {len(encoded)}文字")
                
                count += 1
                
                # 10万回ごとに進捗を表示
                if count % 100_000 == 0:
                    elapsed = time.time() - start_time
                    print(f"進捗: {count:,}回完了 (経過時間: {elapsed:.2f}秒)")
                
        except Exception as e:
            print(f"\nエラーが発生しました:")
            print(f"実行回数: {count:,}回")
            print(f"経過時間: {time.time() - start_time:.2f}秒")
            print(f"エラー内容: {str(e)}")
            raise
        
        print(f"\nテスト完了:")
        print(f"実行回数: {count:,}回")
        print(f"経過時間: {time.time() - start_time:.2f}秒")
        print(f"1回あたりの平均時間: {(time.time() - start_time) / count * 1000:.3f}ミリ秒")

    def test_stress_specific_uuid(self):
        """特定のUUIDでエラーが発生するまで繰り返しラウンドトリップをテスト"""
        test_cases = [
            "00000000-0000-0000-0000-000000000000",  # 最小値
            "ffffffff-ffff-ffff-ffff-ffffffffffff",  # 最大値
            "f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf",  # ランダムな値
            "123e4567-e89b-12d3-a456-426614174000",  # 別のランダムな値
        ]
        
        count = 0
        start_time = time.time()
        max_iterations = 1_000_000  # 最大100万回まで
        
        try:
            while count < max_iterations:
                for uuid in test_cases:
                    # UUIDをBase58に変換
                    encoded = uuid58_encode(uuid)
                    
                    # Base58をUUIDに戻す
                    decoded = uuid58_decode(encoded)
                    
                    # 元のUUIDと一致することを確認
                    self.assertEqual(decoded, uuid,
                        f"不一致が発生: 元のUUID={uuid}, デコード後={decoded}")
                    
                    # 長さが22文字であることを確認
                    self.assertEqual(len(encoded), 22,
                        f"長さが22文字ではありません: {len(encoded)}文字")
                    
                    count += 1
                    
                    # 10万回ごとに進捗を表示
                    if count % 100_000 == 0:
                        elapsed = time.time() - start_time
                        print(f"進捗: {count:,}回完了 (経過時間: {elapsed:.2f}秒)")
                
        except Exception as e:
            print(f"\nエラーが発生しました:")
            print(f"実行回数: {count:,}回")
            print(f"経過時間: {time.time() - start_time:.2f}秒")
            print(f"エラー内容: {str(e)}")
            raise
        
        print(f"\nテスト完了:")
        print(f"実行回数: {count:,}回")
        print(f"経過時間: {time.time() - start_time:.2f}秒")
        print(f"1回あたりの平均時間: {(time.time() - start_time) / count * 1000:.3f}ミリ秒")

if __name__ == "__main__":
    unittest.main() 