namespace ppg_api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string image_url { get; set; } // Use nullable type if your database column allows nulls
        public string Description { get; set; }
    }
}
