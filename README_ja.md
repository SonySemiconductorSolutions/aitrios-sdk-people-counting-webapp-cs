# aitrios-sdk-people-counting-webapp-cs

## このソフトウェアについて

「**Edge Application SDK**」 と 「**Cloud SDK**」 のサンプルです。ご利用にあたっては、下記の点に注意してください。

- 本サンプルは、開発での使用を前提として公開しております。
- このサンプルには、エッジデバイスの正常な動作を妨げるエラーまたは欠陥が含まれている可能性があります。

## コンテンツ <!-- omit in toc -->

- [概要](#概要)
- [前提条件](#前提条件)
- [セットアップガイド](#セットアップガイド)
  - [1. エッジデバイスのセットアップ](#1-エッジデバイスのセットアップ)
  - [2. AIモデルのセットアップとデプロイ](#2-aiモデルのセットアップとデプロイ)
  - [3. 「**Edge Application**」のセットアップとデプロイ](#3-edge-applicationのセットアップとデプロイ)
  - [4. Azureリソースのデプロイ](#4-azureリソースのデプロイ)
  - [5. Command Parameter ファイルのセットアップとデプロイ](#5-command-parameter-ファイルのセットアップとデプロイ)
- [チュートリアル](#チュートリアル)
- [制限事項](#制限事項)
- [サポート](#サポート)
- [参照](#参照)
- [商標](#商標)
- [バージョニング](#バージョニング)
- [ブランチ](#ブランチ)
- [セキュリティ](#セキュリティ)

## 概要

このソフトウェアは、AITRIOS&trade;のプラットフォームを利用して人数カウントシステムを容易に構築する環境を提供します。

## 前提条件

このソフトウェアの実行には、下記のサービスおよびエッジデバイスが必要です。

- デベロッパーエディションBasicプランのご購入
- エッジデバイスのご購入
- Azureアカウントおよび、サブスクリプションのご購入

## セットアップガイド

このソフトウェアを利用するためのセットアップ手順について説明します。

### 1. エッジデバイスのセットアップ

ご購入頂いたエッジデバイスの設定を行って下さい。

下記の手順の詳細を [デバイス設定ガイド](https://developer.aitrios.sony-semicon.com/edge-ai-sensing/documents/device-setup-guide/) にてご確認ください。

- エッジデバイス証明書の取得
- エッジデバイスの登録
- 「**Console**」とエッジデバイスの接続
- エッジデバイスのファームウェア更新
- エッジデバイスの設置確認

### 2. AIモデルのセットアップとデプロイ

人数カウントに利用するAIモデルを設定し、エッジデバイスにデプロイします。

下記の手順の詳細を [Consoleユーザーマニュアル](https://developer.aitrios.sony-semicon.com/edge-ai-sensing/documents/console-user-manual/) にてご確認ください。

- Create model
- Train model

### 3. 「**Edge Application**」のセットアップとデプロイ

プリセットで登録されている物体検知用の「**Edge Application**」を、エッジデバイスにデプロイします。

手順の詳細を [Consoleユーザーマニュアル](https://developer.aitrios.sony-semicon.com/edge-ai-sensing/documents/console-user-manual/) にてご確認ください。

### 4. Azureリソースのデプロイ

Azure PortalとARMテンプレートを使用して、Azureリソースをデプロイします。</br>
「**Console**」との接続設定やアプリケーションの設定なども同時に行うことができます。

手順の詳細を [README](./deploy/README_ja.md) にてご確認ください。

### 5. Command Parameter ファイルのセットアップとデプロイ

CloneしたWebAppのリポジトリから、Command Parameterファイル **`./deploy/HD_TEST.json`** を選択し、「**Console**」へ登録します。

下記の手順の詳細を [Consoleユーザーマニュアル](https://developer.aitrios.sony-semicon.com/edge-ai-sensing/documents/console-user-manual/) にてご確認ください。

- Settings

## チュートリアル

次のチュートリアルを使用して、Azureにデプロイされた「**PeopleCounting**」の利用方法を確認いただけます。

アプリケーションの概要および、操作手順の詳細を [README](./PeopleCountingApp/README_ja.md) にてご確認ください。

## 制限事項

- なし

## サポート

- [Contact us](https://developer.aitrios.sony-semicon.com/edge-ai-sensing/contact-us/)

## 参照

- ["**Developer Site**"](https://developer.aitrios.sony-semicon.com/edge-ai-sensing/)

## 商標

- [Read This First](https://developer.aitrios.sony-semicon.com/edge-ai-sensing/documents/read-this-first/)

## バージョニング

このリポジトリはSemantic Versioning 2.0.0に準拠しています。

## ブランチ

このリポジトリのReleaseについては[**Releases**]から"**Release Note**"を参照してください。

各リリースはmainブランチに生成されます。プレリリースはdevelopブランチに生成されます。リリースは他のブランチからは提供されません。

## セキュリティ

CodeSpacesのご利用の前に、Githubのサイトポリシーをお読みいただき、利用条件をご理解の上でご利用ください。