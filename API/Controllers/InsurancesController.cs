
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InsurancesController : BaseApiController
    {
        private readonly IGenericRepository<Insurance> _insuranceRepo;
        private readonly IMapper _mapper;

        public InsurancesController(IGenericRepository<Insurance> insuranceRepo, IMapper mapper)
        {
            _insuranceRepo = insuranceRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<InsuranceDto>>> GetInsurances()
        {
            var insurances = await _insuranceRepo.ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<InsuranceDto>>(insurances);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InsuranceDto>> GetInsurance(int id)
        {
            var insurance = await _insuranceRepo.GetByIdAsync(id);
            var data = _mapper.Map<InsuranceDto>(insurance);

            return Ok(data);

        }
    }
}