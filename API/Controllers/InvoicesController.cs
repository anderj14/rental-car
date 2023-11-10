
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InvoicesController : BaseApiController
    {
        private readonly IGenericRepository<Invoice> _invoiceRepo;
        private readonly IMapper _mapper;

        public InvoicesController(IGenericRepository<Invoice> invoiceRepo, IMapper mapper)
        {
            _mapper = mapper;
            _invoiceRepo = invoiceRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<InvoiceDto>>> GetInvoices(
            [FromQuery] InvoiceSpecParams invoiceSpecParams
        )
        {
            var spec = new InvoiceWithDetailsSpecification(invoiceSpecParams);

            var countSpec = new InvoiceWithFiltersForCountSpecification(invoiceSpecParams);
            var totalItems = await _invoiceRepo.CountAsync(countSpec);

            var invoices = await _invoiceRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<InvoiceDto>>(invoices);

            return Ok(new Pagination<InvoiceDto>(invoiceSpecParams.PageIndex,
                invoiceSpecParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceDto>> GetInvoice(int id)
        {
            var spec = new InvoiceWithDetailsSpecification(id);

            var invoice = await _invoiceRepo.GetEntityWithSpec(spec);

            if (invoice == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Invoice, InvoiceDto>(invoice);

        }
    }
}