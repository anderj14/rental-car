using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class VehiclesTypeController: BaseApiController
    {
        private readonly IGenericRepository<VehicleType> _vehicleTypeRepo;

        public VehiclesTypeController(IGenericRepository<VehicleType> vehicleTypeRepo)
        {
            _vehicleTypeRepo = vehicleTypeRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<VehicleType>>> GetVehicleTypes()
        {
            var vehicleTypes = await _vehicleTypeRepo.ListAllAsync();
            return Ok(vehicleTypes);
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<VehicleType>> GetVehicleType(int id)
        // {
        //     return await _vehicleTypeRepo.GetByIdAsync(id);
        // }
    }
}