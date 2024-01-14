
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDtos
{
    public class CreateInvoiceDto
    {
        [Required]
        public decimal TotalAmount { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string PaymentType { get; set; }
        
        [Required]
        public int CustomerId { get; set; }

        [Required]
        public int ReservationId { get; set; }
    }
}