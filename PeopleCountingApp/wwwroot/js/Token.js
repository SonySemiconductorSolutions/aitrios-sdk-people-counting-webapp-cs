﻿/*
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

let interval = null;
let date = null;

async function getToken() {

    var funcName = `${arguments.callee.name}()`;
    console.debug(`=> ${funcName}`);

    if (interval) {
        clearInterval(interval);
        interval = null;
    }
    await $.ajax({
        type: "GET",
        url: window.location.origin + '/' + 'sony/GetSCSToken'
    }).done(function (response) {
        var tokenResp = JSON.parse(response.value);
        date = new Date();
        token = tokenResp.access_token;
        if (interval == null) {
            interval = setInterval(function () { getToken(); }, 30 * 60 * 1000);
        }
    }).fail(function (response, status, err) {
        alert("GetSCSToken Error " + status);
    });
}

function checkTokenExp(token){
    const tokenArr = token.split('.')[1];                             
    const replaceToken = tokenArr.replace(/-/g, '+').replace(/_/g, '/');
    const tokenObj = JSON.parse(decodeURIComponent(encodeURI(window.atob(replaceToken))));
    // ms, multiply by 1000.
    const expTime = new Date(tokenObj.exp * 1000);
    const now = new Date()
    if((now - expTime) / 60000 >= -3 ){
        return true;
    }else{
        return false;
    }
}