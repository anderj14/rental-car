
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly IGenericRepository<Vehicle> _vehicleRepo;
        private readonly IMapper _mapper;

        public VehiclesController(IGenericRepository<Vehicle> vehicleRepo, IMapper mapper )
        {
            _mapper = mapper;
            _vehicleRepo = vehicleRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Vehicle>>> GetVehicles()
        {
            var spec = new VehicleWithAllSpecification();
            var vehicles = await _vehicleRepo.ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<VehicleDto>>(vehicles));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDto>> GetVehicle(int id)
        {
            var spec = new VehicleWithAllSpecification(id);

            var vehicle = await _vehicleRepo.GetEntityWithSpec(spec);

            return _mapper.Map<Vehicle, VehicleDto>(vehicle);
        }
    }
}