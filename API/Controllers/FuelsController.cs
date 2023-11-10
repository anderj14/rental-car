
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FuelsController : BaseApiController
    {
        private readonly IGenericRepository<Fuel> _fuelRepo;
        private readonly IMapper _mapper;


        public FuelsController(IGenericRepository<Fuel> fuelRepo, IMapper mapper)
        {
            _fuelRepo = fuelRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<FuelDto>>> GetFuels()
        {
            var fuels = await _fuelRepo.ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<FuelDto>>(fuels);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FuelDto>> GetFuel(int id)
        {
            var fuel = await _fuelRepo.GetByIdAsync(id);
            var data = _mapper.Map<FuelDto>(fuel);
            return Ok(data);
        }
    }
}