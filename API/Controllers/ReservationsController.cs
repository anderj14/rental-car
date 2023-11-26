
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReservationsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ReservationsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
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
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ReservationDto>> CreateReservation(CreateReservationDto createReservation)
        {
            var reservation = _mapper.Map<CreateReservationDto, Reservation>(createReservation);

            _unitOfWork.Repository<Reservation>().Add(reservation);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating reservation"));

            return _mapper.Map<Reservation, ReservationDto>(reservation);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ReservationDto>> UpdateReservation(int id, CreateReservationDto updateReservation)
        {
            var reservation = await _unitOfWork.Repository<Reservation>().GetByIdAsync(id);

            _mapper.Map(updateReservation, reservation);

            _unitOfWork.Repository<Reservation>().Update(reservation);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating reservation"));

            return _mapper.Map<Reservation, ReservationDto>(reservation);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteReservation(int id)
        {
            var reservation = await _unitOfWork.Repository<Reservation>().GetByIdAsync(id);

            _unitOfWork.Repository<Reservation>().Delete(reservation);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting reservation"));

            return Ok("ReservationDelete");
        }
    }
}