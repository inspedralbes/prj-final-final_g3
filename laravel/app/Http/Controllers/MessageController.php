<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;


class MessageController extends Controller
{
    public function saveMessage(Request $request)
    {
        $request->validate([
            'chat_id' => 'integer',
            'user_id' => 'required|integer',
            'content' => 'required|string',
            'sent_at' => 'required|date',
            'read_at' => 'date',
            'state' => 'required|string|in:enviado,recibido,leído'
        ]);

        $message = new Message($request->all());
        return $message->save();
        
    }
}
