
namespace Core.Dtos
{
    public class InvoiceDto
    {
        public int Id { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime Date { get; set; }
        public string PaymentType { get; set; }

        public string Customer { get; set; }

        public string Reservation { get; set; }
    }
}