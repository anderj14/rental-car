
namespace API.Services
{
    public class ReservationBackgroundService : BackgroundService
    {

        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly ILogger<ReservationBackgroundService> _logger;

        public ReservationBackgroundService(IServiceScopeFactory serviceScopeFactory, ILogger<ReservationBackgroundService> logger)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceScopeFactory.CreateScope())
                {
                    var reservationService = scope.ServiceProvider.GetRequiredService<ReservationServices>();

                    try
                    {
                        await reservationService.ExpiredReservationAsync();
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"Error expiring reservations: {ex.Message}");
                    }
                }

                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken); // Check every 5 minutes
            }
        }
    }
}