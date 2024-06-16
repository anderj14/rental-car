
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
    public class FuelsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public FuelsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<FuelDto>>> GetFuels()
        {
            var fuels = await _unitOfWork.Repository<Fuel>().ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<FuelDto>>(fuels);

            return Ok(data);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<FuelDto>> GetFuel(int id)
        {
            var fuel = await _unitOfWork.Repository<Fuel>().GetByIdAsync(id);
            var data = _mapper.Map<FuelDto>(fuel);
            return Ok(data);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<FuelDto>> CreateFuel(CreateFuelDto CreateFuelDto)
        {
            var fuel = _mapper.Map<CreateFuelDto, Fuel>(CreateFuelDto);

            _unitOfWork.Repository<Fuel>().Add(fuel);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating fuel item"));

            return Ok(fuel);

        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<FuelDto>> UpdateFuel(int id, CreateFuelDto updateFuelDto)
        {
            var fuel = await _unitOfWork.Repository<Fuel>().GetByIdAsync(id);

            _mapper.Map(updateFuelDto, fuel);

            _unitOfWork.Repository<Fuel>().Update(fuel);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating fuel"));

            return Ok(fuel);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<FuelDto>> DeleteFuel(int id)
        {
            var fuel = await _unitOfWork.Repository<Fuel>().GetByIdAsync(id);

            _unitOfWork.Repository<Fuel>().Delete(fuel);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting fuel"));

            return Ok(fuel);
        }

    }
}