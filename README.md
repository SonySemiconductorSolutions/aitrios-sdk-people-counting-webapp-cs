# aitrios-sdk-people-counting-webapp-cs

## About this Software

This is a sample of "**Vision and Sensing Application SDK**" and "**Cloud SDK**". Please note the following when using it：

- This sample is released with the assumption it will be used for development.
- This sample may contain errors or defects that obstruct regular operation of the device.

## Content <!-- omit in toc -->

- [Overview](#overview)
- [Prerequisite](#prerequisite)
- [Setup Guide](#setup-guide)
  - [1. Set up your device](#1-set-up-your-device)
  - [2. Set up and deploy AI model](#2-set-up-and-deploy-ai-model)
  - [3. Set up and deploy "**Post Vision App**"](#3-set-up-and-deploy-post-vision-app)
  - [4. Deploy Azure resources](#4-deploy-azure-resources)
  - [5. Set up and deploy Command Parameter File](#5-set-up-and-deploy-command-parameter-file)
- [Tutorials](#tutorials)
- [Restrictions](#restrictions)
- [Get support](#get-support)
- [See also](#see-also)
- [Trademark](#trademark)
- [Versioning](#versioning)
- [Branch](#branch)
- [Security](#security)

## Overview

This software provides an environment to build a people counting system using the AITRIOS&trade; platform.

## Prerequisite

The following service and edge AI device are required to run this software:

- Buy Developer Edition Basic Plan
- Buy edge AI device
- Buy Azure account and subscription

## Setup Guide

Here are the setup procedures for using this software.

### 1. Set up your device

Configure the edge AI device you purchased.

See the "[Device Setup Guide](https://developer.aitrios.sony-semicon.com/en/documents/device-setup-guide)" for details on the following procedures.

- Obtaining device certificates
- Register the edge AI device
- Connecting the edge AI device to "**Console**"
- Updating the edge AI device firmware
- Installing the edge AI device

### 2. Set up and deploy AI model

Set up an AI model to use for people counting and deploy it to edge AI device.

See the "[Console User Manual](https://developer.aitrios.sony-semicon.com/en/documents/console-user-manual
)" for details on the following procedures.

- Create model
- Train model

### 3. Set up and deploy "**Post Vision App**"

Deploy a preset "**Post Vision App**" for object detection to edge AI device.

See the "[Console User Manual](https://developer.aitrios.sony-semicon.com/en/documents/console-user-manual
)" for details on procedures.

### 4. Deploy Azure resources

Use the Azure Portal and an ARM template to deploy your Azure resources. </br>
You can also set up a connection with the "**Console**" and configure applications at the same time.

See the "[README](./deploy/README.md)" for details on procedures.

### 5. Set up and deploy Command Parameter File

Select the command parameter file, **`./deploy/HD_TEST.json`**, from the cloned WebApp repository and deploy it to the "**Console**".

See the "[Console User Manual](https://developer.aitrios.sony-semicon.com/en/documents/console-user-manual
)" for details on the following procedures.

- Settings

## Tutorials

Use the following tutorial to learn how to use "**PeopleCounting**" deployed to Azure.

See the "[README](./PeopleCountingApp/README.md)" for an overview of the application and detailed procedures on how to operate it.

## Restrictions

- None

## Get support

- [Contact us](https://developer.aitrios.sony-semicon.com/contact-us/)

## See also

- ["**Developer Site**"](https://developer.aitrios.sony-semicon.com/en)

## Trademark

- [Read This First](https://developer.aitrios.sony-semicon.com/development-guides/documents/manuals/)

## Versioning

This repository aims to adhere to Semantic Versioning 2.0.0.

## Branch

See the "**Release Note**" from [**Releases**] for this repository.

Each release is generated in the main branch. Pre-releases are generated in the develop branch. Releases will not be provided by other branches.

## Security

Before using Codespaces, please read the Site Policy of GitHub and understand the usage conditions.