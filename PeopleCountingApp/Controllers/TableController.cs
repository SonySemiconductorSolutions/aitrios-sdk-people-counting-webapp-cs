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

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PeopleCountingApp.Models;
using Azure.Data.Tables;
using Azure;

namespace PeopleCountingApp.Controllers
{
    public class TableController : Controller
    {

        private readonly ILogger<TableController> _logger;
        private readonly AppSettings _appSettings;
        private TableClient _tableClient;
        private static readonly string _tableName = "notifications";

        public IActionResult Index()
        {
            return View();
        }
        public TableController(IOptions<AppSettings> optionsAccessor, ILogger<TableController> logger)
        {
            _appSettings = optionsAccessor.Value;
            _logger = logger;
            _tableClient = new TableClient(_appSettings.Table.ConnectionString, _tableName);
        }

        [HttpGet]
        public async Task<ActionResult> loadData()
        {
            var responses = new List<Notification>();
            try
            {
                var query = _tableClient.QueryAsync<NotificationEntity>(filter: "", maxPerPage: 10);
                await foreach (var result in query)
                {
                    var response = new Notification();
                    response.Device = result.PartitionKey;
                    response.Id = result.RowKey;
                    response.Threshold = result.Threshold;
                    response.Title = result.Title;
                    response.Content = result.Content;
                    response.Condition = result.Condition;
                    response.Method = result.Method;
                    responses.Add(response);
                }
                return Ok(Json(JsonConvert.SerializeObject(responses)));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in {System.Reflection.MethodBase.GetCurrentMethod().Name}() {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> insertItem(Notification item, string deviceName)
        {
            try
            {
                var entity = new NotificationEntity()
                {
                    PartitionKey = item.Device,
                    Threshold = item.Threshold,
                    Title = item.Title,
                    Content = item.Content,
                    Condition = item.Condition,
                    Method = item.Method,
                };

                var query = _tableClient.Query<NotificationEntity>()
                .Where(x => x.PartitionKey == entity.PartitionKey);

                var tarRowKey = 1;
                if (query.Count() != 0)
                {
                    var latestRowKey = query.OrderByDescending(x => x.RowKey).First().RowKey;
                    tarRowKey = int.Parse(latestRowKey.TrimStart(new Char[] { '0' }));
                    tarRowKey++;
                }
                entity.RowKey = tarRowKey.ToString("D8");
                await _tableClient.AddEntityAsync(entity);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in {System.Reflection.MethodBase.GetCurrentMethod().Name}() {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> updateItem(Notification item)
        {
            try
            {
                var entity = new NotificationEntity()
                {
                    PartitionKey = item.Device,
                    RowKey = item.Id,
                    Threshold = item.Threshold,
                    Title = item.Title,
                    Content = item.Content,
                    Condition = item.Condition,
                    Method = item.Method,
                };
                var etag = _tableClient.Query<NotificationEntity>()
                .Where(x => x.PartitionKey == entity.PartitionKey)
                .Where(x => x.RowKey == entity.RowKey).First().ETag;
                await _tableClient.UpdateEntityAsync(entity, etag);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in {System.Reflection.MethodBase.GetCurrentMethod().Name}() {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> deleteItem(Notification item)
        {
            try
            {
                var entity = new NotificationEntity()
                {
                    PartitionKey = item.Device,
                    RowKey = item.Id,
                };
                var etag = _tableClient.Query<NotificationEntity>()
                .Where(x => x.PartitionKey == entity.PartitionKey)
                .Where(x => x.RowKey == entity.RowKey).First().ETag;
                await _tableClient.DeleteEntityAsync(entity.PartitionKey, entity.RowKey, etag);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception in {System.Reflection.MethodBase.GetCurrentMethod().Name}() {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }

    public class NotificationEntity : ITableEntity
    {
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public int Threshold { get; set; }
        public string Condition { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Method { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }

    }

    public class Notification
    {
        public string Device { get; set; }
        public string Id { get; set; }
        public int Threshold { get; set; }
        public string Condition { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Method { get; set; }
    }
}