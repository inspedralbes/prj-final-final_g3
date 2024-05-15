<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Validator;
use Illuminate\Pagination\Paginator;



class MessageController extends Controller
{
    public function saveMessage(Request $request){

        $validator = Validator::make($request->all(), [
            'chat_id' => 'required|integer',
            'user_id' => 'required|integer',
            'content' => 'required|string',
            'sent_at' => 'date',
            'read_at' => 'date',
            'state' => 'string|in:enviado,recibido,leído'
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        
        $message = new Message($request->all());
        $message->save();
        return $message;
        
    }
    
    public function getMessages(Request $request){
        $request->validate([
            'chat_id' => 'integer'
        ]);

        
        $messages = Message::where('chat_id', $request->chat_id)->latest()->paginate(10)->toJson();

        return $messages;
    }

    public function getAllMessages(){
        return Message::all();
    }
}
