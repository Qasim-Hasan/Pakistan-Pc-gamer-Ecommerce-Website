using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ppg_api.Models;
using System.Data;
using System.Data.SqlClient;
using Dapper; // Ensure you have Dapper installed

namespace ppg_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CartController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("cartpage")]
        public JsonResult AddToCart([FromBody] Product product)
        {
            if (product == null)
            {
                return new JsonResult("Product cannot be null.") { StatusCode = StatusCodes.Status400BadRequest };
            }

            string sqlDataSource = _configuration.GetConnectionString("ppg");
            using (IDbConnection dbConnection = new SqlConnection(sqlDataSource))
            {
                dbConnection.Open();

                // Check if the product exists in the Product table
                var existingProduct = dbConnection.QuerySingleOrDefault<Product>(
                    "SELECT * FROM Product WHERE id = @ProductId",
                    new { ProductId = product.Id }
                );

                if (existingProduct == null)
                {
                    return new JsonResult("Product not found.") { StatusCode = StatusCodes.Status404NotFound };
                }

                // Check if the product already exists in the cart
                var existingCartItem = dbConnection.QuerySingleOrDefault<CartItem>(
                    "SELECT * FROM CartItem WHERE product_id = @ProductId",
                    new { ProductId = product.Id }
                );

                if (existingCartItem != null)
                {
                    // Update quantity
                    dbConnection.Execute(
                        "UPDATE CartItem SET quantity = quantity + 1 WHERE product_id = @ProductId",
                        new { ProductId = product.Id }
                    );
                }
                else
                {
                    // Insert new cart item
                    dbConnection.Execute(
                        "INSERT INTO CartItem (product_id, quantity) VALUES (@ProductId, 1)",
                        new { ProductId = product.Id }
                    );
                }
            }

            // Return a success response or updated cart items
            return new JsonResult(new { Message = "Product added to cart successfully." });
        }




        [HttpGet("cartpage")]
        public IActionResult GetCartItems()
        {
            string sqlDataSource = _configuration.GetConnectionString("ppg");
            using (IDbConnection dbConnection = new SqlConnection(sqlDataSource))
            {
                dbConnection.Open();

                // SQL query to get cart items and associated product details
                string sqlQuery = @"
            SELECT 
                ci.id AS CartItemId, 
                ci.product_id AS ProductId, 
                ci.quantity AS Quantity, 
                p.id AS ProductId, 
                p.name AS ProductName, 
                p.price AS ProductPrice, 
                p.image_url AS ProductImageUrl, 
                p.description AS ProductDescription
            FROM 
                CartItem ci
            INNER JOIN 
                Product p ON ci.product_id = p.id
            ORDER BY 
                ci.id;
        ";

                // Execute the query and map results
                var cartItems = dbConnection.Query<dynamic>(sqlQuery).ToList();

                // Return the results as JSON
                return new JsonResult(cartItems);
            }
        }


        [HttpDelete("cartpage")]
        public IActionResult ClearCart()
        {
            string sqlDataSource = _configuration.GetConnectionString("ppg");
            using (IDbConnection dbConnection = new SqlConnection(sqlDataSource))
            {
                dbConnection.Open();

                // Delete all items in the cart
                dbConnection.Execute("DELETE FROM CartItem");
            }

            return NoContent(); // Return 204 No Content
        }



        // PUT api/cart/cartpage/{id}
        [HttpPut("cartpage/{id}")]
        public IActionResult UpdateCartItemQuantity(int id, [FromBody] CartItem updateModel)
        {
            if (updateModel == null || updateModel.Quantity < 1)
            {
                return BadRequest("Invalid quantity.");
            }

            string sqlDataSource = _configuration.GetConnectionString("ppg");
            using (IDbConnection dbConnection = new SqlConnection(sqlDataSource))
            {
                dbConnection.Open();

                // Update quantity
                var affectedRows = dbConnection.Execute(
                    "UPDATE CartItem SET quantity = @Quantity WHERE id = @Id",
                    new { Quantity = updateModel.Quantity, Id = id }
                );

                if (affectedRows == 0)
                {
                    return NotFound("Cart item not found.");
                }
            }

            return Ok();
        }

        [HttpDelete("cartpage/{id}")]
        public IActionResult RemoveFromCart(int id)
        {
            string sqlDataSource = _configuration.GetConnectionString("ppg");
            using (IDbConnection dbConnection = new SqlConnection(sqlDataSource))
            {
                dbConnection.Open();

                // Delete the specific cart item
                var affectedRows = dbConnection.Execute(
                    "DELETE FROM CartItem WHERE id = @Id",
                    new { Id = id }
                );

                if (affectedRows == 0)
                {
                    return NotFound("Cart item not found.");
                }
            }

            return NoContent(); // Return 204 No Content
        }

    }
}
