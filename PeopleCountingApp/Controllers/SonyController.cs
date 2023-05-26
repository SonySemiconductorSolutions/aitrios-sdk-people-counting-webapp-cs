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

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using PeopleCountingApp.Models;
using System.Net;
using System.Net.Http.Headers;

namespace PeopleCountingApp.Controllers
{
    [Authorize]
    public class SonyController : Controller
    {
        private readonly ILogger<SonyController> _logger;
        private readonly AppSettings _appSettings;

        public IActionResult Index()
        {
            return View();
        }

        public SonyController(IOptions<AppSettings> optionsAccessor, ILogger<SonyController> logger)
        {
            _appSettings = optionsAccessor.Value;
            _logger = logger;
        }

        private void AddRequestHeader(HttpClient client, string token)
        {
            Uri baseUri = new Uri(_appSettings.SonyApi.BaseUrl);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Host = baseUri.Host;
        }

        private async Task<HttpResponseMessage> SendGet(string requestSegment, string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new ArgumentException("{\"status\":\"Need Token\"}");
            }
            using (HttpClient client = new HttpClient())
            {
                Uri baseUri = new Uri(_appSettings.SonyApi.BaseUrl);
                Uri requestUri = new Uri($"{baseUri.AbsoluteUri}/{requestSegment}");

                AddRequestHeader(client, token);

                return await client.GetAsync(requestUri.AbsoluteUri);
            }
        }

        private async Task<HttpResponseMessage> SendPost(string requestSegment, string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new ArgumentException(@"{'status':'Need Token'}");
            }
            using (HttpClient client = new HttpClient())
            {
                Uri baseUri = new Uri(_appSettings.SonyApi.BaseUrl);
                Uri requestUri = new Uri($"{baseUri.AbsoluteUri}/{requestSegment}");

                AddRequestHeader(client, token);

                return await client.PostAsync(requestUri.AbsoluteUri, null);
            }
        }

        #region SONYAPIGET
        [HttpGet]
        public async Task<ActionResult> GetSCSToken()
        {
            try
            {
                var parameters = new Dictionary<string, string>()
                {
                    { "client_id", _appSettings.SonyApi.ClientId },
                    { "client_secret", _appSettings.SonyApi.ClientSecret },
                    { "scope", "system" },
                    { "grant_type", "client_credentials" }
                };
                var content = new FormUrlEncodedContent(parameters);
                System.Net.Http.HttpResponseMessage response = null;
                using (HttpClient client = new HttpClient())
                {
                    Uri requestUri = new Uri(_appSettings.SonyApi.TokenUrl);// TokenUrl
                    response =  await client.PostAsync(requestUri.AbsoluteUri, content);
                }
                var jsonString = await response.Content.ReadAsStringAsync();
                if (response.IsSuccessStatusCode)
                {
                    return Ok(Json(jsonString));
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, Json(jsonString));
                }
            }
            catch (ArgumentException ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, Json(ex.Message));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in {System.Reflection.MethodBase.GetCurrentMethod().Name}() {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetDevice(string token, string device_id)
        {
            try
            {
                var response = await SendGet($"devices/{device_id}", token);
                var jsonString = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    return Ok(Json(jsonString));
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, Json(jsonString));
                }
            }
            catch (ArgumentException ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, Json(ex.Message));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in {System.Reflection.MethodBase.GetCurrentMethod().Name}() {ex.Message}");
                return BadRequest(ex.Message);
            }

        }

        [HttpGet]
        public async Task<ActionResult> GetDevices(string token)
        {
            try
            {
                var response = await SendGet("devices", token);
                var jsonString = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    return Ok(Json(jsonString));
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, Json(jsonString));
                }
            }
            catch (ArgumentException ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, Json(ex.Message));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in {System.Reflection.MethodBase.GetCurrentMethod().Name}() {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> StartUploadInferenceResult(string token, string device_id)
        {
            try
            {
                string urlSegment = $"devices/{device_id}/inferenceresults/collectstart";
                var response = await SendPost(urlSegment, token);
                var jsonString = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    return Ok(Json(jsonString));
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, Json(jsonString));
                }
            }
            catch (ArgumentException ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, Json(ex.Message));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in {System.Reflection.MethodBase.GetCurrentMethod().Name}() {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> StopUploadInferenceResult(string token, string device_id)
        {
            try
            {
                string urlSegment = $"devices/{device_id}/inferenceresults/collectstop";
                var response = await SendPost(urlSegment, token);
                var jsonString = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    return Ok(Json(jsonString));
                }
                else
                {
                    var jsonData = JObject.Parse(jsonString);

                    if (jsonData["message"].ToString().Contains("AlreadyStopped"))
                    {
                        response.StatusCode = HttpStatusCode.Accepted;
                        return Accepted(Json(jsonString));
                    }
                    return StatusCode(StatusCodes.Status500InternalServerError, Json(jsonString));
                }
            }
            catch (ArgumentException ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, Json(ex.Message));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in {System.Reflection.MethodBase.GetCurrentMethod().Name}() {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}

