
using System.Linq.Expressions;
using API.Errors;
using API.Extensions;
using API.Helpers;
using API.Services;
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
        private readonly ReservationServices _reservationService;

        public ReservationsController(IMapper mapper, IUnitOfWork unitOfWork, UserManager<AppUser> userManager, ReservationServices reservationService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _reservationService = reservationService;
        }

        protected async Task<AppUser> GetAuthenticatedUserAsync()
        {
            return await _userManager.FindUserByEmailFromClaimPrincipal(User);
        }

        [Authorize(Roles = "Admin")]
        [Authorize]
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

        [Authorize]
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
            var reservations = await _unitOfWork.Repository<Reservation>().ListAllByUserAsync(filter, spec, reservationSpecParams.PageIndex, reservationSpecParams.PageSize);

            var data = _mapper.Map<IReadOnlyList<ReservationDto>>(reservations);

            return Ok(new Pagination<ReservationDto>(reservationSpecParams.PageIndex,
                reservationSpecParams.PageSize, totalItems, data));
        }

        [Authorize]
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

        [Authorize]
        [HttpGet("{id}/user")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ReservationDto>> GetReservationByUser(int id)
        {
            var user = await GetAuthenticatedUserAsync();
            if (user == null) return Unauthorized(new ApiResponse(401, "Unauthorized are you not."));

            Expression<Func<Reservation, bool>> filter = (reservation) => reservation.AppUserId == user.Id;

            var spec = new ReservationWithDetailsSpecification(id);

            var reservation = await _unitOfWork.Repository<Reservation>().GetEntityWithUserSpec(filter, spec);

            if (reservation == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Reservation, ReservationDto>(reservation);
        }

        [Authorize]
        [HttpGet("vehicle/{vehicleId}/reservations")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<ReservationDto>>> GetReservationsByVehicleId(int vehicleId)
        {
            var spec = new ReservationWithDetailsSpecification(vehicleId, getByVehicleId: true);
            var reservations = await _unitOfWork.Repository<Reservation>().ListAsync(spec);
            var reservationsDtos = _mapper.Map<IReadOnlyList<ReservationDto>>(reservations);

            return Ok(reservationsDtos);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ReservationDto>> CreateReservation(CreateReservationDto createReservationDto)
        {
            if (!ModelState.IsValid) return BadRequest(new ApiResponse(400, "Invalid data"));

            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null) return Unauthorized(new ApiResponse(401, "Authorized are you not."));

                var reservation = await _reservationService.CreateReservationAsync(
                    user.Id,
                    createReservationDto.VehicleId,
                    createReservationDto.InsuranceId,
                    createReservationDto.StartDate,
                    createReservationDto.EndDate
                );
                return Ok(reservation);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}, Inner exception: {ex.InnerException.Message}");
            }
        }

        [Authorize]
        [HttpPut("{id}")]
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

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReservation(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null) return Unauthorized(new ApiResponse(401, "Authorized are you not."));

                await _reservationService.DeleteReservationAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}, Inner exception: {ex.InnerException?.Message}");
            }
        }
    }
}