namespace Core.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string DriverLicense { get; set; }
        public DateTime DOB { get; set; }
        public string Address { get; set; }
        public string SecondAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
    }
}