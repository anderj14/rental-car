using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public VehiclesController(IGenericRepository<Vehicle> vehicleRepo)
        {
            _vehicleRepo = vehicleRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vehicle>>> GetVehicles()
        {
            var spec = new VehicleWithAllSpecification();
            var vehicles = await _vehicleRepo.ListAsync(spec);
            return Ok(vehicles);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {
            var spec = new VehicleWithAllSpecification(id);

            return await _vehicleRepo.GetEntityWithSpec(spec);
        }
    }
}