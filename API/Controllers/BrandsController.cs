
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BrandsController : BaseApiController
    {
        private readonly IGenericRepository<Brand> _brandRepo;
        private readonly IMapper _mapper;

        public BrandsController(IGenericRepository<Brand> brandRepo, IMapper mapper)
        {
            _brandRepo = brandRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<BrandDto>>> GetBrands()
        {
            var brands = await _brandRepo.ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<BrandDto>>(brands);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BrandDto>> GetBrand(int id)
        {
            var brand = await _brandRepo.GetByIdAsync(id);
            var data = _mapper.Map<BrandDto>(brand);

            return Ok(data);

        }
    }
}