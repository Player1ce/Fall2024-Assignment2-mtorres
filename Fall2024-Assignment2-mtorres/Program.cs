using Fall2024_Assignment2_mtorres.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Configuration.AddEnvironmentVariables();


var bingApiKey = Environment.GetEnvironmentVariable("BING_API_KEY");

Console.WriteLine($"BING_API_KEY: {bingApiKey}");
Console.Out.WriteLine($"BING_API_KEY: {bingApiKey}");

builder.Services.AddSingleton(new BingApiSettings { ApiKey = bingApiKey });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();