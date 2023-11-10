
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StatusesController: BaseApiController
    {
        private readonly IGenericRepository<Status> _statusRepo;
        private readonly IMapper _mapper;


        public StatusesController(IGenericRepository<Status> statusRepo, IMapper mapper)
        {
            _statusRepo = statusRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<StatusDto>>> GetStatuses()
        {
            var statuses = await _statusRepo.ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<StatusDto>>(statuses);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StatusDto>> GetStatus(int id)
        {
            var status = await _statusRepo.GetByIdAsync(id);
            var data = _mapper.Map<StatusDto>(status);
            return Ok(data);
        }
    }
}