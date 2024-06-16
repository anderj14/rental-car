
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
    public class InsurancesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public InsurancesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<InsuranceDto>>> GetInsurances()
        {
            var insurances = await _unitOfWork.Repository<Insurance>().ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<InsuranceDto>>(insurances);

            return Ok(data);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<InsuranceDto>> GetInsurance(int id)
        {
            var insurance = await _unitOfWork.Repository<Insurance>().GetByIdAsync(id);
            var data = _mapper.Map<InsuranceDto>(insurance);

            return Ok(data);

        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<InsuranceDto>> CreateInsurance(CreateInsuranceDto CreateInsuranceDto)
        {
            var insurance = _mapper.Map<CreateInsuranceDto, Insurance>(CreateInsuranceDto);

            _unitOfWork.Repository<Insurance>().Add(insurance);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating insurance item"));

            return Ok(insurance);

        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<InsuranceDto>> UpdateInsurance(int id, CreateInsuranceDto updateInsuranceDto)
        {
            var insurance = await _unitOfWork.Repository<Insurance>().GetByIdAsync(id);

            _mapper.Map(updateInsuranceDto, insurance);

            _unitOfWork.Repository<Insurance>().Update(insurance);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating insurance"));

            return Ok(insurance);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<InsuranceDto>> DeleteInsurance(int id)
        {
            var insurance = await _unitOfWork.Repository<Insurance>().GetByIdAsync(id);

            _unitOfWork.Repository<Insurance>().Delete(insurance);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting insurance"));

            return Ok(insurance);
        }
    }
}