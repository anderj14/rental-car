
using API.Errors;
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
        public async Task<ActionResult<IReadOnlyList<VehicleDto>>> GetVehicles()
        {
            var spec = new VehicleWithAllSpecification();
            var vehicles = await _vehicleRepo.ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<VehicleDto>>(vehicles));
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