using API.Dtos.CreateDtos;
using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class VehiclesTypeController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public VehiclesTypeController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<VehicleTypeDto>>> GetVehicleTypes()
        {
            var vehiclesType = await _unitOfWork.Repository<VehicleType>().ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<VehicleTypeDto>>(vehiclesType);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleTypeDto>> GetVehicleType(int id)
        {
            var vehicleType = await _unitOfWork.Repository<VehicleType>().GetByIdAsync(id);
            var data = _mapper.Map<VehicleTypeDto>(vehicleType);

            return Ok(data);
        }
        
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<VehicleTypeDto>> CreateVehicleType(CreateVehicleTypeDto CreateVehicleTypeDto)
        {
            var vehicleType = _mapper.Map<CreateVehicleTypeDto, VehicleType>(CreateVehicleTypeDto);

            _unitOfWork.Repository<VehicleType>().Add(vehicleType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating vehicle type item"));

            return Ok(vehicleType);

        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<VehicleTypeDto>> UpdateVehicleType(int id, CreateVehicleTypeDto updateVehicleTypeDto)
        {
            var vehicleType = await _unitOfWork.Repository<VehicleType>().GetByIdAsync(id);

            _mapper.Map(updateVehicleTypeDto, vehicleType);

            _unitOfWork.Repository<VehicleType>().Update(vehicleType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating vehicle type"));

            return Ok(vehicleType);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<VehicleTypeDto>> DeleteVehicleType(int id)
        {
            var vehicleType = await _unitOfWork.Repository<VehicleType>().GetByIdAsync(id);

            _unitOfWork.Repository<VehicleType>().Delete(vehicleType);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting vehicle type"));

            return Ok(vehicleType);
        }
    }
}