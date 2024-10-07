using Fall2024_Assignment2_mtorres.Models;
using Microsoft.AspNetCore.Mvc;

namespace Fall2024_Assignment2_mtorres.Controllers;

// In your controller
[ApiController]
[Route("api/[controller]")]
public class ConfigController(BingApiSettings bingApiSettings) : ControllerBase
{
    [HttpGet("bingapikey")]
    public IActionResult GetBingApiKey()
    {
        return Ok(new { apiKey = bingApiSettings.ApiKey });
    }
}
