using AutoMapper;
using Houser.API.Helpers;
using Houser.API.Infrastructure;
using Houser.Service.Apartment;
using Houser.Service.Helpers;
using Houser.Service.Message;
using Houser.Service.Payment;
using Houser.Service.User;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace Houser.API
{
    public class Startup
    {
        public Startup( IConfiguration configuration )
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string AllowAllHeaders = "_allowAllHeaders";
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices( IServiceCollection services )
        {

            //appsettings config
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            //JWT config
            services.AddScoped<IJwtUtils, JwtUtils>();
            //mapper configuration
            var _mappingProfile = new MapperConfiguration(mp => { mp.AddProfile(new MappingProfile()); });
            IMapper mapper = _mappingProfile.CreateMapper();
            services.AddSingleton(mapper);
            //services for user, apartment, payments
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IApartmentService, ApartmentService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IMessageService, MessageService>();
            //CORS config
            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowAllHeaders,
                                  builder =>
                                  {
                                      builder
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .AllowAnyOrigin();
                                  });
            });


            //controller config
            services.AddControllers();
            //swagger config
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Houser.API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure( IApplicationBuilder app, IWebHostEnvironment env )
        {
            if ( env.IsDevelopment() )
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Houser.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            //CORS
            app.UseCors(AllowAllHeaders);

            app.UseAuthorization();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
