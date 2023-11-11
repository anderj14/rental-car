
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ModelsController : BaseApiController
    {
        private readonly IGenericRepository<Model> _modelRepo;

        private readonly IMapper _mapper;

        public ModelsController(IGenericRepository<Model> modelRepo, IMapper mapper)
        {
            _modelRepo = modelRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ModelDto>>> GetModels()
        {
            var spec = new ModelWithBrandSpecification();
            var models = await _modelRepo.ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<ModelDto>>(models);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ModelDto>> GetModel(int id)
        {
            var spec = new ModelWithBrandSpecification(id);
            var model = await _modelRepo.GetEntityWithSpec(spec);
            var data = _mapper.Map<ModelDto>(model);

            return Ok(data);

        }
    }
}