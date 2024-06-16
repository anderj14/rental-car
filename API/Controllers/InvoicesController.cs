
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
    public class InvoicesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public InvoicesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Pagination<InvoiceDto>>> GetInvoices(
            [FromQuery] InvoiceSpecParams invoiceSpecParams
        )
        {
            var spec = new InvoiceWithDetailsSpecification(invoiceSpecParams);

            var countSpec = new InvoiceWithFiltersForCountSpecification(invoiceSpecParams);
            var totalItems = await _unitOfWork.Repository<Invoice>().CountAsync(countSpec);

            var invoices = await _unitOfWork.Repository<Invoice>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<InvoiceDto>>(invoices);

            return Ok(new Pagination<InvoiceDto>(invoiceSpecParams.PageIndex,
                invoiceSpecParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<InvoiceDto>> GetInvoice(int id)
        {
            var spec = new InvoiceWithDetailsSpecification(id);

            var invoice = await _unitOfWork.Repository<Invoice>().GetEntityWithSpec(spec);

            if (invoice == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Invoice, InvoiceDto>(invoice);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<InvoiceDto>> CreateInvoice(CreateInvoiceDto createInvoice)
        {
            var invoice = _mapper.Map<CreateInvoiceDto, Invoice>(createInvoice);

            _unitOfWork.Repository<Invoice>().Add(invoice);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating invoice"));

            return _mapper.Map<Invoice, InvoiceDto>(invoice);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<InvoiceDto>> UpdateInvoice(int id, CreateInvoiceDto updateInvoice)
        {
            var invoice = await _unitOfWork.Repository<Invoice>().GetByIdAsync(id);

            _mapper.Map(updateInvoice, invoice);

            _unitOfWork.Repository<Invoice>().Update(invoice);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating invoice"));

            return _mapper.Map<Invoice, InvoiceDto>(invoice);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteInvoice(int id)
        {
            var invoice = await _unitOfWork.Repository<Invoice>().GetByIdAsync(id);

            _unitOfWork.Repository<Invoice>().Delete(invoice);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting vehicle"));
            return Ok("Invoice Delete");
        }

    }
}