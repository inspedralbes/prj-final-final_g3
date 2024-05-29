<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\followers;

class FollowersController extends Controller
{
    /**
     * @OA\Post(
     *      path="/api/users/follow/{userId}",
     *      operationId="followUser",
     *      tags={"Seguidors"},
     *      summary="Seguir a un usuario",
     *      description="Permite a un usuario seguir a otro usuario por su ID.",
     *      security={{"bearer_token":{}}},
     *      @OA\Parameter(
     *          name="userId",
     *          in="path",
     *          required=true,
     *          description="ID del usuario a seguir",
     *          @OA\Schema(
     *              type="integer",
     *              example=1
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Ahora estás siguiendo a este usuario",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Ahora estás siguiendo a este usuario")
     *          )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Ya estás siguiendo a este usuario",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Ya estás siguiendo a este usuario")
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Usuario no encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Usuario no encontrado")
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
    public function followUser(Request $request, $userId)
    {
        $followerId = $request->user()->id;
        $followedUser = User::findOrFail($userId);

        if ($followedUser->followers()->where('follower_id', $followerId)->exists()) {
            return response()->json(['message' => 'You are already following this user.'], 400);
        }

        $follower = new followers();
        $follower->follower_id = $followerId;
        $follower->followed_id = $userId;
        $follower->save();

        return response()->json(['message' => 'You are now following this user.'], 200);
    }

    /**
 * @OA\Delete(
 *      path="/api/users/unfollow/{userId}",
 *      operationId="unfollowUser",
 *      tags={"Seguidors"},
 *      summary="Dejar de seguir a un usuario",
 *      description="Permite a un usuario dejar de seguir a otro usuario por su ID.",
 *      security={{"bearer_token":{}}},
 *      @OA\Parameter(
 *          name="userId",
 *          in="path",
 *          required=true,
 *          description="ID del usuario a dejar de seguir",
 *          @OA\Schema(
 *              type="integer",
 *              example=1
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Ya no estás siguiendo a este usuario",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Ya no estás siguiendo a este usuario")
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="Usuario no encontrado",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Usuario no encontrado")
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

    public function unfollowUser(Request $request, $userId)
    {
        $followerId = $request->user()->id;
        $followedUser = User::findOrFail($userId);

        $followedUser->followers()->where('follower_id', $followerId)->delete();

        return response()->json(['message' => 'You have stopped following this user.'], 200);
    }

    /**
 * @OA\Get(
 *      path="/api/users/followers/{userId}",
 *      operationId="getUserFollowers",
 *      tags={"Seguidors"},
 *      summary="Obtener seguidores de un usuario",
 *      description="Obtiene la lista de seguidores de un usuario por su ID, incluyendo la cuenta total de seguidores.",
 *      security={{"bearer_token":{}}},
 *      @OA\Parameter(
 *          name="userId",
 *          in="path",
 *          required=true,
 *          description="ID del usuario cuyos seguidores se desea obtener",
 *          @OA\Schema(
 *              type="integer",
 *              example=1
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Lista de seguidores obtenida exitosamente",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="count", type="integer", example=10),
 *              @OA\Property(property="followers", type="array",
 *                  @OA\Items(
 *                      type="object",
 *                      @OA\Property(property="id", type="integer", example=1),
 *                      @OA\Property(property="nickname", type="string", example="follower123"),
 *                      @OA\Property(property="avatar", type="string", example="images/follower_image.png"),
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="Usuario no encontrado",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Usuario no encontrado")
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
    public function getUserFollowers($userId)
    {
        $user = User::findOrFail($userId);
        $followers = $user->followers()->with('follower')->get();
        $count = $followers->count();

        return response()->json(['followers' => $followers, 'count' => $count], 200);
    }
/**
 * @OA\Get(
 *      path="/api/users/followed/{userId}",
 *      operationId="getUserFollowed",
 *      tags={"Seguidors"},
 *      summary="Obtener usuarios seguidos por un usuario",
 *      description="Obtiene la lista de usuarios seguidos por un usuario por su ID, incluyendo la cuenta total de usuarios seguidos.",
 *      security={{"bearer_token":{}}},
 *      @OA\Parameter(
 *          name="userId",
 *          in="path",
 *          required=true,
 *          description="ID del usuario cuyos usuarios seguidos se desea obtener",
 *          @OA\Schema(
 *              type="integer",
 *              example=1
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Lista de usuarios seguidos obtenida exitosamente",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="count", type="integer", example=10),
 *              @OA\Property(property="followed", type="array",
 *                  @OA\Items(
 *                      type="object",
 *                      @OA\Property(property="id", type="integer", example=2),
 *                      @OA\Property(property="nickname", type="string", example="followedUser123"),
 *                      @OA\Property(property="avatar", type="string", example="images/followed_user_image.png"),
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="Usuario no encontrado",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Usuario no encontrado")
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

    public function getUserFollowed($userId)
    {
        $user = User::findOrFail($userId);
        $followed = $user->followed()->with('followed')->get();
        $count = $followed->count();

        return response()->json(['followed' => $followed, 'count' => $count], 200);
    }
/**
 * @OA\Get(
 *      path="/api/users/followers",
 *      operationId="getFollowers",
 *      tags={"Seguidors"},
 *      summary="Obtener seguidores del usuario autenticado",
 *      description="Obtiene la lista de IDs de los usuarios que siguen al usuario autenticado.",
 *      security={{"bearer_token":{}}},
 *      @OA\Response(
 *          response=200,
 *          description="Lista de seguidores obtenida exitosamente",
 *          @OA\JsonContent(
 *              type="array",
 *              @OA\Items(
 *                  type="integer",
 *                  example=2
 *              )
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

    public function getFollowers(Request $request)
    {
        $userId = $request->user()->id;
        $followers = Followers::where('follower_id', $userId)->pluck('followed_id');
        return response()->json($followers);
    }
}
