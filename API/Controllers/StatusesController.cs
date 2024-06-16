
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
    public class StatusesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public StatusesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<StatusDto>>> GetStatuses()
        {
            var statuses = await _unitOfWork.Repository<Status>().ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<StatusDto>>(statuses);

            return Ok(data);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<StatusDto>> GetStatus(int id)
        {
            var status = await _unitOfWork.Repository<Status>().GetByIdAsync(id);
            var data = _mapper.Map<StatusDto>(status);
            return Ok(data);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<StatusDto>> CreateStatus(CreateStatusDto CreateStatusDto)
        {
            var status = _mapper.Map<CreateStatusDto, Status>(CreateStatusDto);

            _unitOfWork.Repository<Status>().Add(status);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating status item"));

            return Ok(status);

        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<StatusDto>> UpdateStatus(int id, CreateStatusDto updateStatusDto)
        {
            var status = await _unitOfWork.Repository<Status>().GetByIdAsync(id);

            _mapper.Map(updateStatusDto, status);

            _unitOfWork.Repository<Status>().Update(status);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating status"));

            return Ok(status);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<StatusDto>> DeleteStatus(int id)
        {
            var status = await _unitOfWork.Repository<Status>().GetByIdAsync(id);

            _unitOfWork.Repository<Status>().Delete(status);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting status"));

            return Ok(status);
        }
    }
}