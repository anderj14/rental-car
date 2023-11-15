
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
    public class VehiclesController : BaseApiController
    {
        private readonly IGenericRepository<Vehicle> _vehicleRepo;
        private readonly IMapper _mapper;

        public VehiclesController(IGenericRepository<Vehicle> vehicleRepo, IMapper mapper)
        {
            _mapper = mapper;
            _vehicleRepo = vehicleRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<VehicleDto>>> GetVehicles(
            [FromQuery]VehicleSpecParams vehicleSpecParams
        )
        {
            var spec = new VehicleWithAllSpecification(vehicleSpecParams);

            var countSpec = new VehicleWithFiltersForCountSpecification(vehicleSpecParams);
            var totalItems = await _vehicleRepo.CountAsync(countSpec);

            var vehicles = await _vehicleRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<VehicleDto>>(vehicles);

            return Ok(new Pagination<VehicleDto>(vehicleSpecParams.PageIndex,
            vehicleSpecParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VehicleDto>> GetVehicle(int id)
        {
            var spec = new VehicleWithAllSpecification(id);

            var vehicle = await _vehicleRepo.GetEntityWithSpec(spec);

            if (vehicle == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Vehicle, VehicleDto>(vehicle);
        }
    }
}