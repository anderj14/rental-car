
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CustomersController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CustomersController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Pagination<CustomerDto>>> GetCustomers(
            [FromQuery] CustomerSpecParams customerSpecParams)
        {
            var spec = new CustomerWithDetailsSpecification(customerSpecParams);

            var countSpec = new CustomerWithFilterForCountSpecification(customerSpecParams);

            var totalItems = await _unitOfWork.Repository<Customer>().CountAsync(countSpec);
            var models = await _unitOfWork.Repository<Customer>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<CustomerDto>>(models);

            return Ok(new Pagination<CustomerDto>(customerSpecParams.PageIndex,
            customerSpecParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CustomerDto>> GetCustomer(int id)
        {
            var model = await _unitOfWork.Repository<Customer>().GetByIdAsync(id);
            var data = _mapper.Map<Customer, CustomerDto>(model);

            return Ok(data);

        }

        [HttpPost]
        public async Task<ActionResult<CustomerDto>> CreateCustomer(CreateCustomerDto createCustomer)
        {
            var customer = _mapper.Map<CreateCustomerDto, Customer>(createCustomer);

            _unitOfWork.Repository<Customer>().Add(customer);

            var result = await _unitOfWork.Complete();
            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating customer"));

            return _mapper.Map<Customer, CustomerDto>(customer);
        }
        

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<CustomerDto>> UpdateCustomer(int id, CreateCustomerDto updateCustomer)
        {
            var customer = await _unitOfWork.Repository<Customer>().GetByIdAsync(id);

            _mapper.Map(updateCustomer, customer);

            _unitOfWork.Repository<Customer>().Update(customer);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, " Problem updating vehicle"));

            return _mapper.Map<Customer, CustomerDto>(customer);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteCustomer(int id)
        {
            var customer = await _unitOfWork.Repository<Customer>().GetByIdAsync(id);

            _unitOfWork.Repository<Customer>().Delete(customer);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting customer"));

            return Ok("Customer Delete");
        }
    }
}