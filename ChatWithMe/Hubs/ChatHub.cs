using Microsoft.AspNetCore.SignalR;

namespace ChatWithMe.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string username, string message)
            => await Clients.All.SendAsync("ReceiveMessage", username, message);
        public async Task JoinGroup(string roomName)
            => await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        public async Task LeaveGroup(string roomName)
            => await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);

        public async Task SendMessageToGroup(string username, string message, string roomName)
             => await Clients.Group(roomName).SendAsync("ReceiveGroupMessage", username, message);
    }
}
