var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Json serializer settings
builder.Services.AddControllersWithViews().AddNewtonsoftJson();

var app = builder.Build();

// Enable CORS
// Enable CORS
app.UseCors(builder =>
    builder.WithOrigins("http://localhost:4200") // Allow your Angular app origin
           .AllowAnyMethod()
           .AllowAnyHeader());



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
