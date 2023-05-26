# aitrios-sdk-people-counting-webapp-cs

## このソフトウェアについて

「**Vision and Sensing Application SDK**」 と 「**Cloud SDK**」 のサンプルです。ご利用にあたっては、下記の点に注意してください。

- 本サンプルは、開発での使用を前提として公開しております。
- このサンプルには、デバイスの正常な動作を妨げるエラーまたは欠陥が含まれている可能性があります。

## コンテンツ <!-- omit in toc -->

- [概要](#概要)
- [前提条件](#前提条件)
- [セットアップガイド](#セットアップガイド)
  - [1. デバイスのセットアップ](#1-デバイスのセットアップ)
  - [2. AIモデルのセットアップとデプロイ](#2-aiモデルのセットアップとデプロイ)
  - [3. 「**Vision and Sensing Application**」のセットアップとデプロイ](#3-Vision-and-Sensing-Applicationのセットアップとデプロイ)
  - [4. Azureリソースのデプロイ](#4-azureリソースのデプロイ)
  - [5. Command Parameter ファイルのセットアップとデプロイ](#5-command-parameter-ファイルのセットアップとデプロイ)
- [チュートリアル](#チュートリアル)
- [制限事項](#制限事項)
- [サポート](#サポート)
- [参照](#参照)
- [商標](#商標)
- [ブランチ](#ブランチ)
- [バージョニング](#バージョニング)

## 概要

このソフトウェアは、AITRIOS&trade;のプラットフォームを利用して人数カウントシステムを容易に構築する環境を提供します。

## 前提条件

このソフトウェアの実行には、下記のサービスおよびエッジAIデバイスが必要です。

- デベロッパーエディションBasicプランのご購入
- エッジAIデバイスのご購入
- Azureアカウントおよび、サブスクリプションのご購入

## セットアップガイド

このソフトウェアを利用するためのセットアップ手順について説明します。

### 1. デバイスのセットアップ

ご購入頂いたエッジAIデバイスの設定を行って下さい。

下記の手順の詳細を [「**デバイス設定ガイド**」](https://developer.aitrios.sony-semicon.com/file/download/device-setup) にてご確認ください。

- デバイス証明書の取得
- エッジAIデバイスの登録
- 「**Console**」とエッジAIデバイスの接続
- エッジAIデバイスのファームウェア更新
- エッジAIデバイスの設置確認

### 2. AIモデルのセットアップとデプロイ

人数カウントに利用するAIモデルを設定し、エッジAIデバイスにデプロイします。

下記の手順の詳細を [「**Consoleユーザーマニュアル**」](https://developer.aitrios.sony-semicon.com/file/download/console-developer-edition-ui-manual) にてご確認ください。

- Create model
- Train model

### 3. 「**Vision and Sensing Application**」のセットアップとデプロイ

プリセットで登録されている物体検知用の「**Vision and Sensing Application**」を、エッジAIデバイスにデプロイします。

手順の詳細を [「**Consoleユーザーマニュアル**」](https://developer.aitrios.sony-semicon.com/file/download/console-developer-edition-ui-manual) にてご確認ください。

### 4. Azureリソースのデプロイ

Azure PortalとARMテンプレートを使用して、Azureリソースをデプロイします。</br>
「**Console**」との接続設定やアプリケーションの設定なども同時に行うことができます。

手順の詳細を [「**README**」](./deploy/README_ja.md) にてご確認ください。

### 5. Command Parameter ファイルのセットアップとデプロイ

CloneしたWebAppのリポジトリから、Command Parameterファイル **`./deploy/HD_TEST.json`** を選択し、「**Console**」へ登録します。

下記の手順の詳細を [Consoleユーザーマニュアル](https://developer.aitrios.sony-semicon.com/file/download/console-developer-edition-ui-manual) にてご確認ください。

- Settings

## チュートリアル

次のチュートリアルを使用して、Azureにデプロイされた「**PeopleCounting**」の利用方法を確認いただけます。

アプリケーションの概要および、操作手順の詳細を [「**README**」](./PeopleCountingApp/README_ja.md) にてご確認ください。

## 制限事項

- なし

## サポート

- [Contact us](https://developer.aitrios.sony-semicon.com/contact-us/)

## 参照

- ["**Developer Site**"](https://developer.aitrios.sony-semicon.com)

## 商標

- [「**Read This First**」](https://developer.aitrios.sony-semicon.com/development-guides/documents/manuals/)

## バージョニング

このリポジトリはSemantic Versioning 2.0.0に準拠しています。

## ブランチ

このリポジトリのReleaseについては[**Releases**]から"**Release Note**"を参照してください。

各リリースはmainブランチに生成されます。プレリリースはdevelopブランチに生成されます。リリースは他のブランチからは提供されません。
