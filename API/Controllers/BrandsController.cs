
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BrandsController : BaseApiController
    {
        private readonly IGenericRepository<Brand> _brandRepo;

        public BrandsController(IGenericRepository<Brand> brandRepo)
        {
            _brandRepo = brandRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Brand>>> GetBrands()
        {
            var brands = await _brandRepo.ListAllAsync();
            return Ok(brands);
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<Brand>> GetBrand(int id)
        // {
        //     return await _brandRepo.GetByIdAsync(id);
        // }
    }
}