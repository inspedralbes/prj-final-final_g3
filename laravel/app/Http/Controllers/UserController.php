<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $credentials = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ],
        [
            'required' => 'El :attribute es obligatorio.',
        ]);
        
        if ($credentials->fails()) {
            return response()->json(['errors' => $credentials->errors()->all()], 400);
        }else{
            $user = User::where('email', $request['email'])->first();
            if (!$user) {
                return response(['message' => 'L\'usuari no existeix'], 400);
            } else if (!Hash::check($request['password'], $user->password)) {
                return response(['message' => 'La contrasenya és incorrecta'], 400);
            } else {
                $token = $user->createToken('Spottunes')->plainTextToken;
                $user->makeHidden(['created_at', 'updated_at', 'email_verified_at']);
                $response = [
                    'user' => $user,
                    'token' => $token,
                ];
                return response()->json(['success' => 'Has iniciat sessió', 'data' => $response], 200);
            }
        }


    }


    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'surnames' => 'required|string',
            'nickname' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'birthdate' => 'required|date',
            'password' => 'required|string',
            'loginWith' => 'required|string',
        ], [
            'required' => 'El :attribute es obligatorio.',
            'email' => 'El :attribute debe ser una dirección de correo válida.',
            'unique' => 'El :attribute ya está en uso.',
            'date' => 'El :attribute debe ser una fecha válida.',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 400);
        }
        

        $user = User::create([
            'name' => $request->name,
            'surnames' => $request->surnames,
            'nickname' => $request->nickname,
            'email' => $request->email,
            'birthdate' => $request->birthdate,
            'password' => bcrypt($request->password),
        ]);

        $user->makeHidden(['created_at', 'updated_at']);

        $token = $user->createToken('Spottunes')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json(['success' => 'Usuari creat correctament', 'data' => $response], 200);

    }

}
