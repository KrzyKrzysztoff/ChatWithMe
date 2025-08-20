using Microsoft.AspNetCore.Mvc;

namespace ChatWithMe.Controllers
{
    public class ChatController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
