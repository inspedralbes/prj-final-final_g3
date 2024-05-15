<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Chat;
use Illuminate\Support\Facades\Validator;
use Illuminate\Pagination\Paginator;


class ChatController extends Controller
{
    public function index()
    {
        // Lógica para mostrar la vista del chat
    }

    public function search(Request $request)
    {
        $user_id = $request->input('user_id');
        $contact_id = $request->input('contact_id');

        $chatExists = Chat::where(function ($query) use ($user_id, $contact_id) {
            $query->where('user_id', $user_id)
                ->where('contact_id', $contact_id);
        })->orWhere(function ($query) use ($user_id, $contact_id) {
            $query->where('user_id', $contact_id)
                ->where('contact_id', $user_id);
        })->first();

        if ($chatExists) {
            $messages = Message::where('chat_id', $chatExists->id)->get();
            return response()->json($messages);
        } else {
            $chat = new Chat();
            $chat->name = $user_id . ' - ' . $contact_id;
            $chat->user_id = $user_id;
            $chat->contact_id = $contact_id;
            $chat->save();

            return response()->json($chat);
        }
    }

    public function createChat(Request $request)
    {
        // Lógica para crear un chat
    }

    public function sendMessage(Request $request)
    {
        // Lógica para enviar un mensaje en el chat
    }

    public function getMessages()
    {
        // Lógica para obtener los mensajes del chat
    }
}