
using API.Helpers;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
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
        public async Task<ActionResult<Pagination<CustomerDto>>> GetCustomers(
            [FromQuery]CustomerSpecParams customerSpecParams)
        {
            var countSpec = new CustomerWithFilterForCountSpecification(customerSpecParams);

            var totalItems = await _customerRepo.CountAsync(countSpec);
            var models = await _customerRepo.ListAllAsync();

            var data = _mapper.Map<IReadOnlyList<CustomerDto>>(models);

            return Ok(new Pagination<CustomerDto>(customerSpecParams.PageIndex,
            customerSpecParams.PageSize, totalItems, data));
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