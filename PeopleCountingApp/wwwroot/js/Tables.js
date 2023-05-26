/*
 * Copyright (c) 2023 Sony Semiconductor Solutions Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

var devices = [{ Name: "" }];
var conditions = [{ Name: "or more" }, { Name: "or less" }];
var method = [{ Name: "Slack" }, { Name: "Web push" }, { Name: "Mail" }];

$("#deviceTableJsGrid").jsGrid({
  width: "100%",
  height: "400px",
  datatype: "local",
  sorting: true,
  paging: true,
  cellEdit: true,
  autoload: true,

  controller: {
    loadData: async function (filter) {
      var funcName = arguments.callee.name + "()";
      console.debug("=>", funcName);

      var d = $.Deferred();

      if (checkTokenExp(token)) await getToken();
      $.ajax({
        async: true,
        type: "GET",
        url: window.location.origin + "/" + "sony/GetDevices",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {
          token: token,
        },
      }).done(function (response) {
        var json = JSON.parse(response.value);
        var dst = [];
        for (var i in json.devices) {
          var device = json.devices[i];

          var row = {
            Device: device.device_id,
            Status: device.connectionState,
          };
          dst.push(row);
        }
        d.resolve(dst);

        // load notification table
        devices = [];
        for (var i = 0; i < dst.length; i++) {
          devices.push({ Name: dst[i].Device.toString() });
        }
        $("#notificationTableJsGrid").jsGrid(
          "fieldOption",
          "Device",
          "items",
          devices
        );
      });
      $("#notificationTableJsGrid").jsGrid("loadData");
      return d.promise();
    },
  },

  fields: [
    { name: "Device", type: "text", width: 300, align: "left" },
    {
      name: "Status",
      type: "text",
      width: 100,
      align: "left",
      sorting: true,
      sorter: "string",
    },
    {
      name: "Start/Stop",
      align: "center",
      width: 50,
      itemTemplate: function (_, item) {
        var $iconStart = $("<i>").attr({ class: "fas fa-play btn-fa" });
        var $iconStop = $("<i>").attr({ class: "fas fa-stop btn-fa" });

        var $startBtn = $("<button>")
          .attr({ class: "btn btn-success btn-xs" })
          .attr({ role: "button" })
          .attr({ id: "btn-start-" + item.Device })
          .click(function (e) {
            console.debug(e.target.id + "() " + e.type);
            toggleLoader(false);
            StartInference(item.Device, "tableInferenceResult")
              .then(() => {})
              .finally(() => {
                $("#btn-start-" + item.Device).prop("disabled", true);
                $("#btn-stop-" + item.Device).prop("disabled", false);
                toggleLoader(true);
              });
            e.stopPropagation();
          })
          .append($iconStart);

        var $stopBtn = $("<button>")
          .attr({ class: "btn btn-secondary" })
          .attr({ role: "button" })
          .attr({ id: "btn-stop-" + item.Device })
          .click(function (e) {
            console.debug(e.target.id + "() " + e.type);
            toggleLoader(false);
            StopInference(item.Device, "tableInferenceResult")
              .then(() => {})
              .finally(() => {
                $("#btn-start-" + item.Device).prop("disabled", false);
                $("#btn-stop-" + item.Device).prop("disabled", true);
                toggleLoader(true);
              });
            e.stopPropagation();
          })
          .append($iconStop);

        return $("<div>")
          .attr({ class: "btn-toolbar" })
          .append($startBtn)
          .append($stopBtn);
      },
    },
  ],
});

$("#notificationTableJsGrid").jsGrid({
  width: "100%",
  height: "400px",

  editing: true,
  sorting: true,
  paging: true,
  inserting: true,
  pageSize: 10,
  pageButtonCount: 5,
  deleteConfirm: "Do you really want to delete this notification listing?",
  controller: {
    loadData: function (filter) {
      var funcName = arguments.callee.name + "()";
      console.debug("=>", funcName);

      var d = $.Deferred();

      $.ajax({
        type: "GET",
        url: window.location.origin + "/" + "table/loadData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      }).done(function (response) {
        var array = JSON.parse(response.value);
        d.resolve(array);
      });
      return d.promise();
    },

    insertItem: function (item) {
      var funcName = arguments.callee.name + "()";
      console.debug("=>", funcName);
      return $.ajax({
        type: "POST",
        url: window.location.origin + "/" + "table/insertItem",
        data: item,
      }).then(() => {
        $("#notificationTableJsGrid").jsGrid("loadData");
      });
    },

    updateItem: function (item) {
      var funcName = arguments.callee.name + "()";
      console.debug("=>", funcName);
      return $.ajax({
        type: "PUT",
        url: window.location.origin + "/" + "table/updateItem",
        data: item,
      });
    },

    deleteItem: function (item) {
      var funcName = arguments.callee.name + "()";
      console.debug("=>", funcName);
      return $.ajax({
        type: "DELETE",
        url: window.location.origin + "/" + "table/deleteItem",
        data: item,
      });
    },
  },

  fields: [
    { name: "Id", type: "text", width: 20, editing: false, visible: false },
    {
      name: "Device",
      type: "select",
      width: 200,
      align: "left",
      items: devices,
      valueField: "Name",
      textField: "Name",
      autosearch: true,
      editing: false,
    },
    {
      name: "Threshold",
      type: "number",
      width: 80,
      align: "left",
      validate: [
        "required",
        {
          validator: "range",
          param: [0, Number.MAX_SAFE_INTEGER],
        },
      ],
    },
    {
      name: "Condition",
      type: "select",
      width: 80,
      align: "left",
      validate: "required",
      items: conditions,
      valueField: "Name",
      textField: "Name",
    },
    { name: "Title", type: "text", width: 100, align: "left" },
    { name: "Content", type: "textarea", width: 200, align: "left" },
    {
      name: "Method",
      type: "select",
      width: 100,
      align: "left",
      items: method,
      valueField: "Name",
      textField: "Name",
    },
    { type: "control" },
  ],
});
