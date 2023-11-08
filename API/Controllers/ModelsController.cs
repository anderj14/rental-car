
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ModelsController: BaseApiController
    {
        private readonly IGenericRepository<Model> _modelRepo;

        public ModelsController(IGenericRepository<Model> modelRepo)
        {
            _modelRepo = modelRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Model>>> GetModels()
        {
            var models = await _modelRepo.ListAllAsync();
            return Ok(models);
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<Model>> GetModel(int id)
        // {
        //     return await _modelRepo.GetByIdAsync(id);
        // }
    }
}