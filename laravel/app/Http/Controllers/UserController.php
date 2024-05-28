<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Illuminate\Http\JsonResponse;
use GuzzleHttp\Exception\ClientException;
use Laravel\Socialite\Facades\Socialite;



class UserController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Iniciar sesión de usuario",
     *     description="Inicia sesión de un usuario con correo electrónico y contraseña.",
     *     tags={"Autenticació"},
     *     @OA\Parameter(
     *         name="email",
     *         in="query",
     *         required=true,
     *         description="Correo electrónico del usuario",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="password",
     *         in="query",
     *         required=true,
     *         description="Contraseña del usuario",
     *         @OA\Schema(
     *             type="string",
     *             format="password"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Inicio de sesión exitoso",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="success",
     *                 type="string",
     *                 example="Has iniciado sesión"
     *             ),
     *             @OA\Property(
     *                 property="token",
     *                 type="string",
     *                 example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la solicitud",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="message",
     *                 type="string"
     *             )
     *         )
     *     )
     * )
     */

    public function login(Request $request)
    {
        $credentials = Validator::make(
            $request->all(),
            [
                'email' => 'required|string',
                'password' => 'required|string',
            ],
            [
                'required' => 'El :attribute es obligatorio.',
            ]
        );

        if ($credentials->fails()) {
            return response()->json(['errors' => $credentials->errors()->all()], 400);
        } else {
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
    /**
     * @OA\Post(
     *     path="/api/register",
     *     summary="Registro de usuario",
     *     description="Registra un nuevo usuario con los datos proporcionados.",
     *     tags={"Autenticació"},
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         required=true,
     *         description="Nombre del usuario",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="surnames",
     *         in="query",
     *         required=true,
     *         description="Apellidos del usuario",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="nickname",
     *         in="query",
     *         required=true,
     *         description="Alias o nombre de usuario",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="email",
     *         in="query",
     *         required=true,
     *         description="Correo electrónico del usuario",
     *         @OA\Schema(
     *             type="string",
     *             format="email"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="birthdate",
     *         in="query",
     *         required=true,
     *         description="Fecha de nacimiento del usuario (formato: YYYY-MM-DD)",
     *         @OA\Schema(
     *             type="date",
     *             format="date"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="password",
     *         in="query",
     *         required=true,
     *         description="Contraseña del usuario",
     *         @OA\Schema(
     *             type="string",
     *             format="password"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Registro exitoso",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="success",
     *                 type="string",
     *                 example="Usuario creado correctamente"
     *             ),
     *             @OA\Property(
     *                 property="token",
     *                 type="string",
     *                 example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la solicitud",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="errors",
     *                 type="array",
     *                 @OA\Items(type="string"),
     *             )
     *         )
     *     )
     * )
     */

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            // 'surnames' => 'required|string',
            'nickname' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'birthdate' => 'required|date',
            'password' => 'required|string|confirmed',
        ], [
            'required' => 'El :attribute és obligatori',
            'email' => 'El :attribute ha de ser una adreça de correu vàlida',
            'unique' => 'El :attribute ja està en ús',
            'date' => 'El :attribute ha de ser una data vàlida',
            'confirmed' => 'Les contrasenyes no coincideixen',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->all()], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'surnames' => $request->surnames,
            'nickname' => $request->nickname,
            'email' => $request->email,
            'birthdate' => $request->birthdate,
            'password' => bcrypt($request->password),
            'loginWith' => 'email',
            // 'private' => $request->private ? true : false,
        ]);

        $user->makeHidden(['created_at', 'updated_at']);

        $token = $user->createToken('Spottunes')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json(['success' => 'Usuari creat correctament', 'data' => $response], 200);
    }
    /**
     * @OA\Post(
     *      path="/api/logout",
     *      operationId="logout",
     *      tags={"Autenticació"},
     *      summary="Cerrar sesión",
     *      description="Cierra la sesión del usuario actual y revoca todos los tokens de acceso asociados.",
     *      security={{"bearer_token":{}}},
     *      @OA\Response(
     *          response=200,
     *          description="Sesión cerrada exitosamente",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="string", example="Has cerrado sesión"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="No autorizado",
     *      ),
     * )
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Token eliminado']);
    }

    

    /**
     * @OA\Put(
     *      path="/api/completeInfo",
     *      operationId="completeInfo",
     *      tags={"Autenticació"},
     *      summary="Completar información de usuario",
     *      description="Completa la información de un usuario, como su fecha de nacimiento y apodo.",
     *      security={{"bearer_token":{}}},
     *      @OA\RequestBody(
     *          required=true,
     *          description="Datos de usuario para completar",
     *          @OA\MediaType(
     *              mediaType="application/x-www-form-urlencoded",
     *              @OA\Schema(
     *                  required={"birthdate", "nickname"},
     *                  type="object",
     *                  @OA\Property(property="birthdate", type="string", format="date", example="1990-01-01"),
     *                  @OA\Property(property="nickname", type="string", example="usuario123"),
     *              ),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Información de usuario completada exitosamente",
     *          @OA\JsonContent(
     *              type="boolean",
     *              example=true,
     *          ),
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Error de validación",
     *          @OA\JsonContent(
     *              @OA\Property(property="errors", type="array", @OA\Items(type="string")),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="No autorizado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Token no proporcionado en los encabezados.")
     *          )
     *      ),
     * )
     */
    public function completeInfo(Request $request)
    {
        $token = $request->header('Authorization');
        $user = User::where('id', $request->user()->id)->first();

        $validator = Validator::make($request->all(), [
            'birthdate' => 'required|date',
            'nickname' => 'required|string',
            'password' => 'required|string|confirmed',
        ], [
            'required' => 'El :attribute es obligatorio.',
            'date' => 'El :attribute debe ser una fecha válida.',
            'confirmed' => 'Les contrasenyes no coincideixen.',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->all()], 400);
        }
        $user->birthdate = $request->birthdate;
        $user->nickname = $request->nickname;
        $user->password = bcrypt($request->password);
        // $user->private = $request->private ? true : false;

        return response()->json($user->save());
    }


    /**
 * @OA\Put(
 *      path="/api/updateInfo",
 *      operationId="updateInfo",
 *      tags={"Autenticació"},
 *      summary="Actualizar información del usuario",
 *      description="Actualiza la información del usuario, incluyendo nombre, apellidos, apodo, correo electrónico, fecha de nacimiento y avatar.",
 *      security={{"bearer_token":{}}},
 *      @OA\RequestBody(
 *          required=true,
 *          description="Datos del usuario para actualizar",
 *          @OA\MediaType(
 *              mediaType="application/x-www-form-urlencoded",
 *              @OA\Schema(
 *                  required={"name", "nickname", "email"},
 *                  type="object",
 *                  @OA\Property(property="name", type="string", example="Juan"),
 *                  @OA\Property(property="surnames", type="string", example="Pérez Gómez"),
 *                  @OA\Property(property="nickname", type="string", example="usuario123"),
 *                  @OA\Property(property="email", type="string", format="email", example="usuario@example.com"),
 *                  @OA\Property(property="birthdate", type="string", format="date", example="1990-01-01"),
 *                  @OA\Property(property="avatar", type="string", format="base64", example="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."),
 *              ),
 *          ),
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Información de usuario actualizada exitosamente",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="id", type="integer", example=1),
 *              @OA\Property(property="name", type="string", example="Juan"),
 *              @OA\Property(property="surnames", type="string", example="Pérez Gómez"),
 *              @OA\Property(property="nickname", type="string", example="usuario123"),
 *              @OA\Property(property="email", type="string", format="email", example="usuario@example.com"),
 *              @OA\Property(property="birthdate", type="string", format="date", example="1990-01-01"),
 *              @OA\Property(property="avatar", type="string", example="images/unique_image_name.png"),
 *          ),
 *      ),
 *      @OA\Response(
 *          response=400,
 *          description="Error de validación",
 *          @OA\JsonContent(
 *              @OA\Property(property="errors", type="array", @OA\Items(type="string")),
 *          ),
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="No autorizado",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Token no proporcionado en los encabezados.")
 *          )
 *      ),
 * )
 */


    public function updateInfo(Request $request)
    {
        $token = $request->header('Authorization');
        $user = User::where('id', $request->user()->id)->first();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'nickname' => 'required|string',
            'email' => 'required|email',
        ], [
            'required' => 'El :attribute es obligatorio.',
            'string' => 'El :attribute debe ser una cadena de texto.',
            'email' => 'El :attribute debe ser un correo electrónico válido.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 400);
        }

        $user->name = $request->name;
        $user->surnames = $request->surnames;
        $user->nickname = $request->nickname;
        $userWithSameNickname = User::where('nickname', $request->nickname)->first();
        if ($userWithSameNickname && $userWithSameNickname->id != $user->id) {
            return response()->json(['errors' => ['El nickname ya está en uso.']], 400);
        }
        $user->email = $request->email;
        $userWithSameEmail = User::where('email', $request->email)->first();
        if ($userWithSameEmail && $userWithSameEmail->id != $user->id) {
            return response()->json(['errors' => ['El email ya está en uso.']], 400);
        }
        $user->birthdate = $request->birthdate;


        if ($request->has('avatar')) {
            // Obtener los datos de la imagen base64
            $imageData = $request->avatar;

            // Comprobar si la cadena base64 tiene el prefijo esperado
            if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
                $imageData = substr($imageData, strpos($imageData, ',') + 1);
                $type = strtolower($type[1]); // jpg, png, gif, etc.

                // Decodificar la imagen base64
                $imageData = base64_decode($imageData);

                // Comprobar si la decodificación fue exitosa
                if ($imageData === false) {
                    return response()->json(['errors' => ['La imagen base64 no es válida.']], 400);
                }

                // Crear un nombre único para la imagen
                $imageName = uniqid() . '.' . $type;

                // Guardar la imagen en el sistema de archivos
                $path = public_path('images') . '/' . $imageName;
                file_put_contents($path, $imageData);

                // Guardar la ruta de la imagen en la base de datos
                $user->avatar = 'images/' . $imageName;
            } else {
                return response()->json(['errors' => ['El formato de la imagen base64 no es válido.']], 400);
            }
        }

        // $user->private = $request->private ? true : false;

        $user->save();

        return response()->json($user, 200);
    }
    
    /**
 * @OA\Post(
 *      path="/api/apps/searchUsers",
 *      operationId="searchUsers",
 *      tags={"Usuaris"},
 *      summary="Buscar usuarios",
 *      description="Busca usuarios por su apodo.",
 *      security={{"bearer_token":{}}},
 *      @OA\Parameter(
 *          name="param",
 *          in="query",
 *          required=true,
 *          description="Parámetro de búsqueda para el apodo del usuario",
 *          @OA\Schema(
 *              type="string",
 *              example="usuario123"
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Resultados de la búsqueda",
 *          @OA\JsonContent(
 *              type="array",
 *              @OA\Items(
 *                  type="object",
 *                  @OA\Property(property="id", type="integer", example=1),
 *                  @OA\Property(property="name", type="string", example="Juan"),
 *                  @OA\Property(property="surnames", type="string", example="Pérez Gómez"),
 *                  @OA\Property(property="nickname", type="string", example="usuario123"),
 *                  @OA\Property(property="email", type="string", format="email", example="usuario@example.com"),
 *                  @OA\Property(property="birthdate", type="string", format="date", example="1990-01-01"),
 *                  @OA\Property(property="avatar", type="string", example="images/unique_image_name.png"),
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=201,
 *          description="No hay resultados en tu búsqueda",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="No hay resultados en tu búsqueda")
 *          )
 *      ),
 *      @OA\Response(
 *          response=202,
 *          description="No hay resultados en tu búsqueda",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="No hay resultados en tu búsqueda")
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="No autorizado",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Token no proporcionado en los encabezados.")
 *          )
 *      ),
 * )
 */

    public function searchUsers(Request $request)
    {
        $param = $request->input('param');
        if (empty($param)) {
            return response()->json(['message' => 'No hay resultados en tu búsqueda'], 201);
        }
        $users = User::where('nickname', 'like', "%{$param}%")->get();
        if ($users->isEmpty()) {
            return response()->json(['message' => 'No hay resultados en tu búsqueda'], 202);
        }
        return response()->json($users, 200);
    }

    /**
 * @OA\Get(
 *      path="/api/apps/checkEmail",
 *      operationId="checkEmail",
 *      tags={"Usuaris"},
 *      summary="Verificar disponibilidad de correo electrónico",
 *      description="Verifica si un correo electrónico ya está en uso. Si el correo está en uso, devuelve los detalles del usuario y un token de acceso. Si no está en uso, indica que el correo está disponible.",
 *      security={{"bearer_token":{}}},
 *      @OA\RequestBody(
 *          required=true,
 *          description="Correo electrónico a verificar",
 *          @OA\MediaType(
 *              mediaType="application/x-www-form-urlencoded",
 *              @OA\Schema(
 *                  required={"email"},
 *                  type="object",
 *                  @OA\Property(property="email", type="string", format="email", example="usuario@example.com"),
 *              ),
 *          ),
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="El email ya está en uso, haciendo Login",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="success", type="string", example="El email ya está en uso, haciendo Login"),
 *              @OA\Property(property="data", type="object",
 *                  @OA\Property(property="user", type="object",
 *                      @OA\Property(property="id", type="integer", example=1),
 *                      @OA\Property(property="name", type="string", example="Juan"),
 *                      @OA\Property(property="surnames", type="string", example="Pérez Gómez"),
 *                      @OA\Property(property="nickname", type="string", example="usuario123"),
 *                      @OA\Property(property="email", type="string", format="email", example="usuario@example.com"),
 *                      @OA\Property(property="birthdate", type="string", format="date", example="1990-01-01"),
 *                      @OA\Property(property="avatar", type="string", example="images/unique_image_name.png"),
 *                  ),
 *                  @OA\Property(property="token", type="string", example="abc123token")
 *              ),
 *          ),
 *      ),
 *      @OA\Response(
 *          response=202,
 *          description="El email está disponible",
 *          @OA\JsonContent(
 *              @OA\Property(property="success", type="string", example="El email está disponible")
 *          )
 *      ),
 *      @OA\Response(
 *          response=400,
 *          description="Solicitud incorrecta",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Solicitud incorrecta")
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="No autorizado",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Token no proporcionado en los encabezados.")
 *          )
 *      ),
 * )
 */



    public function checkEmail(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($user) {
            $user = User::where('email', $request['email'])->first();
            $token = $user->createToken('Spottunes')->plainTextToken;
            $response = [
                'user' => $user,
                'token' => $token,
            ];
            return response()->json(['success' => 'El email ya está en uso, haciendo Login', 'data' => $response], 200);
        } else {
            return response()->json(['success' => 'El email está disponible'], 202);
        }
    }

    /**
 * @OA\Get(
 *      path="/api/getUser",
 *      operationId="getUser",
 *      tags={"Usuaris"},
 *      summary="Obtener información del usuario",
 *      description="Obtiene la información de un usuario por su ID.",
 *      security={{"bearer_token":{}}},
 *      @OA\Parameter(
 *          name="user_id",
 *          in="query",
 *          required=true,
 *          description="ID del usuario a obtener",
 *          @OA\Schema(
 *              type="integer",
 *              example=1
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Información del usuario obtenida exitosamente",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="id", type="integer", example=1),
 *              @OA\Property(property="name", type="string", example="Juan"),
 *              @OA\Property(property="surnames", type="string", example="Pérez Gómez"),
 *              @OA\Property(property="nickname", type="string", example="usuario123"),
 *              @OA\Property(property="email", type="string", format="email", example="usuario@example.com"),
 *              @OA\Property(property="birthdate", type="string", format="date", example="1990-01-01"),
 *              @OA\Property(property="avatar", type="string", example="images/unique_image_name.png"),
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="No se pudo encontrar el usuario",
 *          @OA\JsonContent(
 *              @OA\Property(property="error", type="string", example="No se pudo encontrar el usuario")
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="No autorizado",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Token no proporcionado en los encabezados.")
 *          )
 *      ),
 * )
 */

    public function getUser(Request $request)
    {
        try {
            $user = User::where('id', $request->user_id)->firstOrFail();
            return response()->json($user, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo encontrar el usuario'], 404);
        }
    }

    public function userById(Request $request)
    {
        $user = User::select('id', 'name', 'nickname', 'avatar')->where('id', $request->id)->first();

        if ($user) {
            return response()->json($user, 200);
        } else {
            return response()->json(['message' => 'No se ha encontrado el usuario'], 404);
        }
    }

    /**
 * @OA\Get(
 *      path="/api/users/search/{username}",
 *      operationId="searchByUsername",
 *      tags={"Usuaris"},
 *      summary="Buscar usuario por nombre de usuario",
 *      description="Busca un usuario por su nombre de usuario.",
 *      security={{"bearer_token":{}}},
 *      @OA\Parameter(
 *          name="username",
 *          in="path",
 *          required=true,
 *          description="Nombre de usuario a buscar",
 *          @OA\Schema(
 *              type="string"
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Usuario encontrado exitosamente",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="id", type="integer", example=1),
 *              @OA\Property(property="name", type="string", example="Juan"),
 *              @OA\Property(property="nickname", type="string", example="usuario123"),
 *              @OA\Property(property="avatar", type="string", example="images/unique_image_name.png"),
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="No se ha encontrado el usuario",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="No se ha encontrado el usuario")
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="No autorizado",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Token no proporcionado en los encabezados.")
 *          )
 *      ),
 * )
 */


    public function getUserByNickname(Request $request)
    {
        $user = User::select('id', 'nickname', 'avatar')->where('nickname', $request->nickname)->first();

        if ($user) {
            return response()->json($user, 200);
        } else {
            return response()->json(['message' => 'No se ha encontrado el usuario'], 404);
        }
    }
    
}
