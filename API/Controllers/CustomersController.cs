
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CustomersController : BaseApiController
    {
        private readonly IGenericRepository<Customer> _customerRepo;
        private readonly IMapper _mapper;

        public CustomersController(IGenericRepository<Customer> customerRepo, IMapper mapper)
        {
            _customerRepo = customerRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<CustomerDto>>> GetCustomers()
        {
            var models = await _customerRepo.ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<CustomerDto>>(models);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomer(int id)
        {
            var model = await _customerRepo.GetByIdAsync(id);
            var data = _mapper.Map<CustomerDto>(model);

            return Ok(data);

        }
    }
}