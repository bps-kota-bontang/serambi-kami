# Changelog

## [0.1.6](https://github.com/bps-kota-bontang/serambi-kami/compare/v0.1.5...v0.1.6) (2024-08-27)


### Bug Fixes

* correct current page if query is exist ([e7ddd29](https://github.com/bps-kota-bontang/serambi-kami/commit/e7ddd299bd2a541aa8e1e2e5b8e5e4b994cc9031))
* correct services fallback when page size in odd ([c9ed294](https://github.com/bps-kota-bontang/serambi-kami/commit/c9ed294f4fb70eb325c23a5f4a5d829748c5b953))
* use default for limit or page if not valid ([42b8cae](https://github.com/bps-kota-bontang/serambi-kami/commit/42b8cae75c7ee190ccde21cf43cec07a8df51312))

## [0.1.5](https://github.com/bps-kota-bontang/serambi-kami/compare/v0.1.4...v0.1.5) (2024-08-27)


### Performance Improvements

* configure profiling using sentry ([e228fb9](https://github.com/bps-kota-bontang/serambi-kami/commit/e228fb9cfcda6b638abc4907cabb4d3a77a7459a))

## [0.1.4](https://github.com/bps-kota-bontang/serambi-kami/compare/v0.1.3...v0.1.4) (2024-08-26)


### Bug Fixes

* correct only super user can delete team ([bf64e87](https://github.com/bps-kota-bontang/serambi-kami/commit/bf64e8702bfbc5a1ec603ff3ee233615e4e9e6a6))

## [0.1.3](https://github.com/bps-kota-bontang/serambi-kami/compare/v0.1.2...v0.1.3) (2024-08-25)


### Bug Fixes

* correct configure sentry release ([1c021d9](https://github.com/bps-kota-bontang/serambi-kami/commit/1c021d970431ef0a5de86d4dd372313178de1a91))

## [0.1.2](https://github.com/bps-kota-bontang/serambi-kami/compare/v0.1.1...v0.1.2) (2024-08-25)


### Bug Fixes

* correct handle response status 204 ([3c84ec0](https://github.com/bps-kota-bontang/serambi-kami/commit/3c84ec0ec311d0b092249961be1b2aed933d8cb8))
* handle modal delete service and team ([70999c5](https://github.com/bps-kota-bontang/serambi-kami/commit/70999c545d89cfb2fac06a2d9a1f7637acdd7c4e))

## [0.1.1](https://github.com/bps-kota-bontang/serambi-kami/compare/v0.1.0...v0.1.1) (2024-08-25)


### Bug Fixes

* correct call as async when delete service or service ([6c64e08](https://github.com/bps-kota-bontang/serambi-kami/commit/6c64e0850b5450cdb4041ef712527c81e07e30d7))
* correct type props as promise ([df78694](https://github.com/bps-kota-bontang/serambi-kami/commit/df7869453aafa4d64ec81d8c3ae780fc8cf36963))


### Performance Improvements

* implement sentry ([a03dc58](https://github.com/bps-kota-bontang/serambi-kami/commit/a03dc5866078fcca57b0a1bcda20af4d8fa3a3cc))
* implement suspense and fallback in list service ([884b7e2](https://github.com/bps-kota-bontang/serambi-kami/commit/884b7e29b0ad5511ec35f6b7f3b8d9fec282af88))
* update params based on filter ([82c8de9](https://github.com/bps-kota-bontang/serambi-kami/commit/82c8de92bb3c1253a6a9c6bed4bb8af7315094db))

## 0.1.0 (2024-08-25)


### Features

* add modal when delete service or team ([70debf3](https://github.com/bps-kota-bontang/serambi-kami/commit/70debf3e4ccab1a298016af002336bfb3bb57f08))


### Bug Fixes

* correct directory workflow ([d4fdee9](https://github.com/bps-kota-bontang/serambi-kami/commit/d4fdee9cc2e0ef4bb93f55f6efa7f50b17b4ba40))
* correct username copy to clipboard ([07806af](https://github.com/bps-kota-bontang/serambi-kami/commit/07806afd22bdfe17b4e4836165bd280e9be066cf))
* page size must be even ([184862a](https://github.com/bps-kota-bontang/serambi-kami/commit/184862a508f30b64e24924b21e4e695b00405565))
* send empty array if tag not selected ([d8b4197](https://github.com/bps-kota-bontang/serambi-kami/commit/d8b4197cde2c9c31964d8ca03f0f66318ae71e06))
* use notification from app ([6fb3813](https://github.com/bps-kota-bontang/serambi-kami/commit/6fb3813beb3310c96ceb8b48b6e2430e76030ebf))


### Performance Improvements

* use Link instead of default in breadcrumbs ([41a8541](https://github.com/bps-kota-bontang/serambi-kami/commit/41a85410d1c828aa2d691eefc89b4a47b07ba327))


### Miscellaneous Chores

* release 0.1.0 ([328af5f](https://github.com/bps-kota-bontang/serambi-kami/commit/328af5f0e77e0fe4013c1c9120a598843f9de07b))
