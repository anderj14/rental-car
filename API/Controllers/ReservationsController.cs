
using System.Linq.Expressions;
using API.Errors;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDtos;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReservationsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public ReservationsController(IMapper mapper, IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        protected async Task<AppUser> GetAuthenticatedUserAsync()
        {
            return await _userManager.FindUserByEmailFromClaimPrincipal(User);
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ReservationDto>>> GetReservations(
            [FromQuery] ReservationSpecParams reservationSpecParams
        )
        {
            var spec = new ReservationWithDetailsSpecification(reservationSpecParams);

            var countSpec = new ReservationWithFiltersForCountSpecification(reservationSpecParams);
            var totalItems = await _unitOfWork.Repository<Reservation>().CountAsync(countSpec);

            var reservations = await _unitOfWork.Repository<Reservation>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<ReservationDto>>(reservations);

            return Ok(new Pagination<ReservationDto>(reservationSpecParams.PageIndex,
                reservationSpecParams.PageSize, totalItems, data));
        }
        [HttpGet("byuser")]
        public async Task<ActionResult<Pagination<ReservationDto>>> GetReservationsByUser(
           [FromQuery] ReservationSpecParams reservationSpecParams
       )
        {
            var user = await GetAuthenticatedUserAsync();
            if (user == null) return Unauthorized(new ApiResponse(401, "Unauthorized are you not."));

            Expression<Func<Reservation, bool>> filter = (reservation) => reservation.AppUserId == user.Id;

            var spec = new ReservationWithDetailsSpecification(reservationSpecParams);
            var countSpec = new ReservationWithFiltersForCountSpecification(reservationSpecParams);

            var totalItems = await _unitOfWork.Repository<Reservation>().CountByUserAsync(filter, countSpec);

            if (totalItems == 0)
            {
                return Ok(new Pagination<ReservationDto>(
                    reservationSpecParams.PageIndex,
                    reservationSpecParams.PageSize,
                    totalItems,
                    new List<ReservationDto>()
                ));
            }
            var reservations = await _unitOfWork.Repository<Reservation>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<ReservationDto>>(reservations);

            return Ok(new Pagination<ReservationDto>(reservationSpecParams.PageIndex,
                reservationSpecParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ReservationDto>> GetReservation(int id)
        {
            var spec = new ReservationWithDetailsSpecification(id);
            var reservation = await _unitOfWork.Repository<Reservation>().GetEntityWithSpec(spec);

            if (reservation == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Reservation, ReservationDto>(reservation);
        }

        [HttpPost]
        public async Task<ActionResult<ReservationDto>> CreateReservation(CreateReservationDto createReservationDto)
        {

            if (!ModelState.IsValid) return BadRequest(new ApiResponse(400, "Invalid data"));

            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null) return Unauthorized(new ApiResponse(401, "Authorized are you not."));

                var createReservation = _mapper.Map<CreateReservationDto, Reservation>(createReservationDto);
                createReservation.AppUserId = user.Id;

                createReservation.ValidateDates();
                createReservation.CalculateDays();

                var vehicle = await _unitOfWork.Repository<Vehicle>().GetByIdAsync(createReservationDto.VehicleId);
                var insurance = await _unitOfWork.Repository<Insurance>().GetByIdAsync(createReservationDto.InsuranceId);

                if (vehicle == null) return NotFound(new ApiResponse(404, "Vehicle not found"));
                if (insurance == null) return NotFound(new ApiResponse(404, "Insurance not found"));

                createReservation.Vehicle = vehicle;
                createReservation.Insurance = insurance;
                createReservation.CalculateRentalCost();

                _unitOfWork.Repository<Reservation>().Add(createReservation);

                var result = await _unitOfWork.Complete();
                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating reservation"));

                var reservationDto = _mapper.Map<Reservation, ReservationDto>(createReservation);
                reservationDto.RentalCost = decimal.Round(reservationDto.RentalCost, 2);

                return Ok(reservationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}, Inner exception: {ex.InnerException?.Message}");
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<ReservationDto>> UpdateReservation(int id, CreateReservationDto updateReservationDto)
        {
            if (!ModelState.IsValid) return BadRequest(new ApiResponse(400, "Invalid data"));

            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null) return Unauthorized(new ApiResponse(401, "Authorized are you not."));

                var reservation = await _unitOfWork.Repository<Reservation>().GetByIdAsync(id);

                if (reservation == null || reservation.AppUserId != user.Id) return NotFound(new ApiResponse(404, " Reservation not found ot not Authorize"));

                _mapper.Map(updateReservationDto, reservation);
                _unitOfWork.Repository<Reservation>().Update(reservation);

                var result = await _unitOfWork.Complete();
                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating reservation"));

                return Ok(_mapper.Map<ReservationDto>(reservation));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}, Inner exception: {ex.InnerException?.Message}");
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteReservation(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null) return Unauthorized(new ApiResponse(401, "Authorized are you not."));

                var reservation = await _unitOfWork.Repository<Reservation>().GetByIdAsync(id);
                
                if (reservation == null || reservation.AppUserId != user.Id) return NotFound(new ApiResponse(404, " Reservation not found ot not Authorize"));

                _unitOfWork.Repository<Reservation>().Delete(reservation);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting reservation"));

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}, Inner exception: {ex.InnerException?.Message}");
            }
        }
    }
}