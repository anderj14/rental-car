
using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.ModelsDtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ModelsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ModelsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ModelDto>>> GetModels()
        {
            var spec = new ModelWithBrandSpecification();
            var models = await _unitOfWork.Repository<Model>().ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<ModelDto>>(models);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ModelDto>> GetModel(int id)
        {
            var spec = new ModelWithBrandSpecification(id);
            var model = await _unitOfWork.Repository<Model>().GetEntityWithSpec(spec);
            var data = _mapper.Map<ModelDto>(model);

            return Ok(data);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ModelDto>> CreateModel(CreateModelDto createModelDto)
        {
            var model = _mapper.Map<CreateModelDto, Model>(createModelDto);

            _unitOfWork.Repository<Model>().Add(model);
            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating model item"));

            return Ok(model);
        }

        [HttpPut("{id}")]
        [Authorize]

        public async Task<ActionResult<ModelDto>> UpdateModel(int id, CreateModelDto updateModelDto)
        {

            var model = await _unitOfWork.Repository<Model>().GetByIdAsync(id);

            _mapper.Map(updateModelDto, model);

            _unitOfWork.Repository<Model>().Update(model);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating model item"));

            return Ok(model);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteModel(int id)
        {

            var model = await _unitOfWork.Repository<Model>().GetByIdAsync(id);

            _unitOfWork.Repository<Model>().Delete(model);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating model item"));

            return Ok();
        }
    }
}