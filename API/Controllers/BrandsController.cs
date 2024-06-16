
using API.Dtos.CreateDtos;
using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BrandsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public BrandsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<BrandDto>>> GetBrands()
        {
            var brands = await _unitOfWork.Repository<Brand>().ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<BrandDto>>(brands);

            return Ok(data);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<BrandDto>> GetBrand(int id)
        {
            var brand = await _unitOfWork.Repository<Brand>().GetByIdAsync(id);
            var data = _mapper.Map<BrandDto>(brand);

            return Ok(data);

        }

        [HttpGet("{brandId}/models")]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<ModelDto>>> GetModelsByBrand(int brandId)
        {
            var spec = new ModelsByBrandSpecificacion(brandId, getByBrandId: true);
            var models = await _unitOfWork.Repository<Model>().ListAsync(spec);
            var modelDtos = _mapper.Map<IReadOnlyList<ModelDto>>(models);


            return Ok(modelDtos);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<BrandDto>> CreateBrand(CreateBrandDto createBrandDto)
        {
            var brand = _mapper.Map<CreateBrandDto, Brand>(createBrandDto);

            _unitOfWork.Repository<Brand>().Add(brand);
            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating brand item"));

            return Ok(brand);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<BrandDto>> UpdateBrand(int id, CreateBrandDto updateBrandDto)
        {

            var brand = await _unitOfWork.Repository<Brand>().GetByIdAsync(id);

            _mapper.Map(updateBrandDto, brand);

            _unitOfWork.Repository<Brand>().Update(brand);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating brand item"));

            return Ok(brand);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteBrand(int id)
        {

            var brand = await _unitOfWork.Repository<Brand>().GetByIdAsync(id);

            _unitOfWork.Repository<Brand>().Delete(brand);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating brand item"));

            return Ok();
        }
    }
}