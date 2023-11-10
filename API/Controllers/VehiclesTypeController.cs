using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class VehiclesTypeController : BaseApiController
    {
        private readonly IGenericRepository<VehicleType> _vehicleTypeRepo;
        private readonly IMapper _mapper;

        public VehiclesTypeController(IGenericRepository<VehicleType> vehicleTypeRepo, IMapper mapper)
        {
            _vehicleTypeRepo = vehicleTypeRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<VehicleTypeDto>>> GetVehicleTypes()
        {
            var vehiclesType = await _vehicleTypeRepo.ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<VehicleTypeDto>>(vehiclesType);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleTypeDto>> GetVehicleType(int id)
        {
            var vehicleType = await _vehicleTypeRepo.GetByIdAsync(id);
            var data = _mapper.Map<VehicleTypeDto>(vehicleType);

            return Ok(data);

        }
    }
}