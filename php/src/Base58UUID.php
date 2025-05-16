<?php

namespace Htpboost\Base58UUID;

class Base58UUID
{
    private const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    private string $uuid;

    public function __construct(?string $uuid = null)
    {
        if ($uuid === null) {
            $this->uuid = $this->generateUuidV4();
        } else {
            $normalized = str_replace('-', '', $uuid);
            if (!preg_match('/^[0-9a-fA-F]{32}$/', $normalized)) {
                throw new \InvalidArgumentException('Invalid UUID format');
            }
            $this->uuid = $this->formatUuid($normalized);
        }
    }

    public function encode(): string
    {
        $hex = str_replace('-', '', $this->uuid);
        $decimal = gmp_init($hex, 16);
        $result = '';
        while (gmp_cmp($decimal, 0) > 0) {
            $rem = gmp_intval(gmp_mod($decimal, 58));
            $result = self::BASE58_ALPHABET[$rem] . $result;
            $decimal = gmp_div_q($decimal, 58);
        }
        return $result;
    }

    public function decode(string $encoded): string
    {
        if ($encoded === '') {
            throw new \InvalidArgumentException('Invalid Base58 character');
        }
        $decimal = gmp_init(0, 10);
        $len = strlen($encoded);
        for ($i = 0; $i < $len; $i++) {
            $char = $encoded[$i];
            $pos = strpos(self::BASE58_ALPHABET, $char);
            if ($pos === false) {
                throw new \InvalidArgumentException('Invalid Base58 character');
            }
            $decimal = gmp_add(gmp_mul($decimal, 58), $pos);
        }
        $hex = gmp_strval($decimal, 16);
        $hex = str_pad($hex, 32, '0', STR_PAD_LEFT);
        return $this->formatUuid($hex);
    }

    public function getUuid(): string
    {
        return $this->uuid;
    }

    private function formatUuid(string $hex): string
    {
        return sprintf(
            '%08s-%04s-%04s-%04s-%012s',
            substr($hex, 0, 8),
            substr($hex, 8, 4),
            substr($hex, 12, 4),
            substr($hex, 16, 4),
            substr($hex, 20, 12)
        );
    }

    private function generateUuidV4(): string
    {
        $data = random_bytes(16);
        $data[6] = chr((ord($data[6]) & 0x0f) | 0x40); // version 4
        $data[8] = chr((ord($data[8]) & 0x3f) | 0x80); // variant
        return vsprintf('%02x%02x%02x%02x-%02x%02x-%02x%02x-%02x%02x-%02x%02x%02x%02x%02x%02x', str_split(bin2hex($data), 2));
    }
} 