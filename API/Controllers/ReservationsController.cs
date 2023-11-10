
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReservationsController : BaseApiController
    {
        private readonly IGenericRepository<Reservation> _reservationRepo;
        private readonly IMapper _mapper;

        public ReservationsController(IGenericRepository<Reservation> reservationRepo, IMapper mapper)
        {
            _mapper = mapper;
            _reservationRepo = reservationRepo;
        }

        [HttpGet]

        public async Task<ActionResult<Pagination<ReservationDto>>> GetReservations(
            [FromQuery] ReservationSpecParams reservationSpecParams
        )
        {
            var spec = new ReservationWithDetailsSpecification(reservationSpecParams);

            var countSpec = new ReservationWithFiltersForCountSpecification(reservationSpecParams);
            var totalItems = await _reservationRepo.CountAsync(countSpec);

            var reservations = await _reservationRepo.ListAsync(spec);

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
            var reservation = await _reservationRepo.GetEntityWithSpec(spec);

            if (reservation == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Reservation, ReservationDto>(reservation);

        }

    }
}