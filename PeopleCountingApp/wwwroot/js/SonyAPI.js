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
 *
 * -----------------
 *
 * Copyright (c) 2022 Daisuke Nakahara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the  * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

// Utility functions

function setSelectOption(selectElementId, selectValue) {
    console.log("Setting " + selectElementId + " to " + selectValue);

    document.getElementById(selectElementId).value = selectValue;
    document.getElementById(selectElementId).dispatchEvent(new Event("change"));
}

function toggleLoader(bForceClear) {
    var loader = document.getElementById("loader");

    if (bForceClear) {
        loader.style.display = "none";
    } else {
        if (loader.style.display == "none") {
            loader.style.display = "block";
        } else {
            loader.style.display = "none";
        }
    }
}

function setResultElement(resultElement, msg) {

    if (resultElement == undefined || resultElement == null) {
        return;
    }

    if (msg) {
        try {
            var json = JSON.parse(msg);

            if (json.result && json.result == "ERROR") {
                if (json.message) {
                    resultElement.innerHTML = json.message;
                }
                else {
                    resultElement.innerHTML = json.stringify();
                }
            }
            else {
                resultElement.innerHTML = msg;
            }
        } catch (err) {
            resultElement.innerHTML = msg;
        } finally {
        }        
    }
}

function processError(funcName, err, bShowAlert) {

    var msg;

    try {
        if (err.responseJSON) {
            msg = err.responseJSON.value;
        }
        else {
            msg = err.statusText;
        }
        if (bShowAlert) {
            alert(funcName + " : " + err.statusText + "(" + err.status + ") : " + msg);
        }
    } catch (err) {
        //debugger;
    }


    return msg;
}

function AddApiOutput(apiName, result) {

    var json;
    if (typeof (result) == 'string') {
        json = JSON.parse(result);
    }
    else {
        json = result;
    }

    document.getElementById('apiOutputLabel').innerHTML = apiName;
    document.getElementById('tabApiOutput').value = null;
    document.getElementById('tabApiOutput').value = JSON.stringify(json, null, 2);
}

var pendingImagePath = '';
const COMMAND_PARAM_FILE_NAME = "ST_PC_COMMAND_PARAM.json"


async function GetDevices(listElementId, isOption, placeHolderText, placeHolderValue, resultElementId) {
    var funcName = `${arguments.callee.name}()`;
    console.debug("=>", funcName)
    var ret = true;
    var resultElement = null;
    var msg = null;

    try {
        if (resultElementId != null) {
            resultElement = document.getElementById(resultElementId);
        }

        setResultElement(resultElement, 'Retrieving Device ID List');

        if(checkTokenExp(token)) await getToken();
        await $.ajax({
            async: true,
            type: "GET",
            url: window.location.origin + '/' + 'sony/GetDevices',
            data: {
                token: token
            },
        }).done(function (response) {

            if (listElementId) {
                var json = JSON.parse(response.value);

                var list = document.getElementById(listElementId);

                list.innerText = null;
                var option = new Option(placeHolderText, placeHolderValue);

                if (isOption) {
                    option.disabled = false;
                }
                else {
                    option.disabled = true;
                }
                list.append(option);
                for (var device in json.devices) {
                    var option = new Option(`${json.devices[device].device_id} (${json.devices[device].connectionState})`, json.devices[device].device_id);

                    if (json.devices[device].connectionState == 'Connected') {
                        option.classList.add("connectedDevice");
                    }
                    else {
                        option.classList.add("disConnectedDevice");
                    }
                    list.append(option);
                }
                list.options[0].selected = true;
            }

            setResultElement(resultElement, '&nbsp;');
        });

    } catch (err) {
        msg = processError(funcName, err, true);
        ret = false;
    } finally {
        if (msg) {
            setResultElement(resultElement, msg);
        }
    }
    return ret;
}

async function GetModelForDevice(listElementId, device_id, resultElementId) {
    var funcName = `${arguments.callee.name}()`;
    console.debug(`=> ${funcName}`);

    var resultElement = null;
    var ret = true; // assume disconnected  true = disconnected.

    try {
        if (listElementId) {
            document.getElementById(listElementId).disabled = true;
        }

        if (resultElementId != null) {
            resultElement = document.getElementById(resultElementId);
        }

        setResultElement(resultElement, `Retrieving Model List for ${device_id}`);

        if(checkTokenExp(token)) await getToken();
        await $.ajax({
            async: true,
            type: "GET",
            url: window.location.origin + '/' + 'sony/GetDevice',
            data: {
                token: token,
                device_id: device_id
            },
        }).done(function (response) {
            var json = JSON.parse(response.value);

            if (listElementId) {

                var list = document.getElementById(listElementId);

                list.innerText = null;

                var option = new Option("Select from list", "");
                list.append(option);

                for (var model in json.models) {
                    var modelId = json.models[model].model_version_id.split(":");
                    list.append(new Option(modelId[0], modelId[0]));
                }
                list.options[0].selected = true;
                list.disabled = false;
            }

            if (json.connectionState == 'Connected') {
                ret = false;
            }

            setResultElement(resultElement, '&nbsp;');
        });

    } catch (err) {
        setResultElement(resultElement, err.responseJSON.value);
    } finally {
    }

    return ret;
}

// A wrapper to start inference.  Used to test parameters.
async function StartInference(device_id, resultElementId) {
    var funcName = `${arguments.callee.name}()`;
    console.debug("=>", funcName)
    var resultElement = document.getElementById(resultElementId);

    try {
        setResultElement(resultElement, `Starting Inference, Device: ${device_id}`);

        if(checkTokenExp(token)) await getToken();
        await $.ajax({
            async: true,
            type: "POST",
            url: window.location.origin + '/' + 'sony/StartUploadInferenceResult',
            data: {
                token: token,
                device_id: device_id
            },
        }).done(function (response) {
            var result = JSON.parse(response.value);

            if (result.result == "SUCCESS") {
                pendingImagePath = result.outputSubDirectory;
                setResultElement(resultElement, `Processing`);
            }
            else {
                setResultElement(resultElement, `Failed to start : ${result.result}`);
            }
        });

    } catch (err) {
        console.error(`${funcName}: ${err.statusText}`)

        // call stop just to be certain.
        await $.ajax({
            async: true,
            type: "POST",
            url: window.location.origin + '/' + 'sony/StopUploadInferenceResult',
            data: {
                token: token,
                device_id: device_id
            }
        });
    }
    return;
}

// A wrapper function to stop inference
async function StopInference(device_id, resultElementId) {
    var funcName = `${arguments.callee.name}()`;
    console.debug(`=> ${funcName}`)
    var bStopped = false;
    pendingImagePath = '';
    
    var resultElement = document.getElementById(resultElementId);

    try {
        setResultElement(resultElement, `Stopping Inference, Device: ${device_id}`);

        var url;
        url = window.location.origin + '/' + 'sony/StopUploadInferenceResult';

        if(checkTokenExp(token)) await getToken();
        await $.ajax({
            async: true,
            type: "POST",
            url: url,
            data: {
                token: token,
                device_id: device_id
            },
            statusCode: {
                200: function (data) {
                    setResultElement(resultElement, `Stopped`);
                }
            }
        }).then(function (response, textStatus, jqXHR) {
            setResultElement(resultElement, `Stopped (Status = ${jqXHR.status})`);
        });
    } catch (err) {
        console.error(`${funcName}: ${err.statusText}`)
        setResultElement(resultElement, err.statusText);
    } finally {
    }
}
