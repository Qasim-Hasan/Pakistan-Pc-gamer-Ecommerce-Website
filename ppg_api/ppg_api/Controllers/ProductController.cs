using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ppg_api.Models;
using System.Data;
using System.Data.SqlClient;

namespace ppg_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProductController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // Get of products
        [HttpGet("homepage")]
        public JsonResult GetProduct()
        {
            string query = "SELECT * FROM Product";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ppg");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    using (SqlDataReader? myReader = myCommand.ExecuteReader())
                    {
                        if (myReader == null)
                        {
                            throw new InvalidOperationException("Failed to execute reader on SQL command.");
                        }

                        table.Load(myReader);
                        myReader.Close();
                    }

                }
                myCon.Close();
            }

            return new JsonResult(table);
        }

        // Get a single product by ID
        [HttpGet("productpage/{id}")]
        public JsonResult GetProductById(int id)
        {
            string query = "SELECT * FROM Product WHERE Id = @Id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ppg");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", id);
                    using (SqlDataReader myReader = myCommand.ExecuteReader())
                    {
                        if (myReader == null)
                        {
                            throw new InvalidOperationException("Failed to execute reader on SQL command.");
                        }

                        table.Load(myReader);
                        myReader.Close();
                    }
                }
                myCon.Close();
            }

            // Check if any rows were returned
            if (table.Rows.Count == 0)
            {
                return new JsonResult("Product not found") { StatusCode = StatusCodes.Status404NotFound };
            }

            return new JsonResult(table);
        }

    }
}
