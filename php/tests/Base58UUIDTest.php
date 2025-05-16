<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Htpboost\Base58UUID\Base58UUID;

class Base58UUIDTest extends TestCase
{
    public function testEncodeKnownUuid()
    {
        $uuid = 'f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf';
        $b58 = new Base58UUID($uuid);
        $this->assertSame('XDY9dmBbcMBXqcRvYw8xJ2', $b58->encode());
    }

    public function testEncodeHyphenlessUuid()
    {
        $uuid = 'f4b247fd1f8745d4aa061c6fc0a8dfaf';
        $b58 = new Base58UUID($uuid);
        $this->assertSame('XDY9dmBbcMBXqcRvYw8xJ2', $b58->encode());
    }

    public function testDecodeKnownBase58()
    {
        $uuid = 'f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf';
        $b58 = new Base58UUID($uuid);
        $encoded = $b58->encode();
        $this->assertSame($uuid, $b58->decode($encoded));
    }

    public function testDecodeInvalidBase58()
    {
        $b58 = new Base58UUID();
        $this->expectException(\InvalidArgumentException::class);
        $b58->decode('invalid');
    }

    public function testDecodeEmptyString()
    {
        $b58 = new Base58UUID();
        $this->expectException(\InvalidArgumentException::class);
        $b58->decode('');
    }

    public function testInvalidUuidFormat()
    {
        $this->expectException(\InvalidArgumentException::class);
        new Base58UUID('invalid-uuid');
    }

    public function testGetUuid()
    {
        $uuid = 'f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf';
        $b58 = new Base58UUID($uuid);
        $this->assertSame($uuid, $b58->getUuid());
    }

    public function testEncodeDecodeConsistency()
    {
        $uuid = 'f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf';
        $b58 = new Base58UUID($uuid);
        $encoded = $b58->encode();
        $decoded = $b58->decode($encoded);
        $this->assertSame($uuid, $decoded);
    }

    public function testEncodeIsDeterministic()
    {
        $uuid = 'f4b247fd-1f87-45d4-aa06-1c6fc0a8dfaf';
        $b58 = new Base58UUID($uuid);
        $this->assertSame($b58->encode(), $b58->encode());
    }
} 