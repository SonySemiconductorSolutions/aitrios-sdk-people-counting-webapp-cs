# "**PeopleCounting**" Tutorial

## Content <!-- omit in toc -->

- [Overview](#overview)
  - ["**PeopleCounting**" configurations](#peoplecounting-configurations)
- [Prerequisite](#prerequisite)
- ["**PeopleCounting**" screen elements](#peoplecounting-screen-elements)
- [How to use "**PeopleCounting**"](#how-to-use-peoplecounting)
  - [1. Display Home screen](#1-display-home-screen)
  - [2. Create notification](#2-create-notification)
  - [3. Perform inference from edge AI devices](#3-perform-inference-from-edge-ai-devices)
  - [4. Monitor the headcount counting result](#4-monitor-the-headcount-counting-result)
  - [5. Confirm the notification](#5-confirm-the-notification)
- [Restrictions](#restrictions)

## Overview

"**PeopleCounting**" is a sample head-counting system using AI objection detection.

The following features are implemented as UI for this application:

- Create notifications in regards to the headcount-counting results.
- Monitor the headcount-counting results.

### "**PeopleCounting**" configurations

"**PeopleCounting**" deployed on Azure uses "**Console for AITRIOS**" (the "**Console**") API to control edge AI devices.

Images and inference results acquired by edge AI devices are uploaded to the "**Console**" and then notified to "**PeopleCounting**".

![Network configurations](Network_diagram.png)

## Prerequisite

"**PeopleCounting**" application must be deployed on your tenant.

To deploy applications, please refer to the [README](../deploy/README.md) for details.

## "**PeopleCounting**" screen elements

This application consists of the following two screens:

  | Name of the screen | Usage |
  | ---- | ---- |
  | Home screen |  Configure the edge AI device control and notification settings. |
  | Visualization screen | Monitor the headcount status and main information using a dashboard. |

You can switch the contents with the tabs on the left of the screen.

## How to use "**PeopleCounting**"

### 1. Display Home screen

- Select [**Home**] tab on the top left of the screen to open the Home screen.

  In the Home screen, you can configure the settings by using the following two table lists: 
  
  | Name of the table | Description |
  | ---- | ---- |
  | [**Device List**] | Displays a list of edge AI devices registered to the "**Console**". You can also start and stop the inference process. |
  | [**Notification List**] | Displays a list of created notifications. You can also create, update, or delete them. |

### 2. Create notification

- Click on the [**+**] button of the [**Notification List**].
- Select the edge AI device from [**Device**] pull-down menu.
- Type the condition (a number for people) to send the notification to [**Threshold**] text box.
- Select the condition (or more/or less) to send the notification from [**Condition**] pull-down menu.
- Type the subject of the notification to [**Title**] text box.
- Type the text of the notification to [**Content**] text box.
- Select the media to send notification from [**Method**] pull-down menu.
- Click the [**+**] button of the created notification.

### 3. Perform inference from edge AI devices

- Select the edge AI device from [**Device List**].
- Click the [**▶**] button.

  The function of each button is as follows:
  | Name of the button | Description |
  | ---- | ---- |
  | [**▶**] | Start inference. |
  | [**■**] | Stop inference. |
  | [**Refresh**] | Updates the Device List. |

### 4. Monitor the headcount counting result

- Click [**Dashboard**] tab of the screen to open the Dashboard screen.
- Select the edge AI device from [**Select Device**] pull-down menu.

A chart visualizes the number of people counted by the selected devices.

### 5. Confirm the notification

- Confirm the content of the notification sent to the Azure SignalR in the notification box.

## Restrictions

- None
